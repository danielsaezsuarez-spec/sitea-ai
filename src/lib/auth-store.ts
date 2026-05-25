import { useSyncExternalStore } from "react";
import {
  createProfile,
  createProject as createProjectInDb,
  deleteProject as deleteProjectInDb,
  getProfile,
  getProjects,
  updateProfile,
  updateProject as updateProjectInDb,
  type DbProfile,
  type DbProject,
} from "./supabase-db";
import { signInWithEmail, signOutUser, signUpWithEmail, getCurrentUser } from "./supabase-auth";
import { getPlanCredits } from "./plans";
import type { SiteContent } from "./site-template";

export type Plan = "Base" | "Pro" | "Premium";
export type PublishPlan = "none" | "publica" | "publica_plus";
export type DomainStatus = "pending" | "connected" | "error";

export interface User {
  id: string;
  name: string;
  email: string;
  plan: Plan;
  credits: number;
  createdAt: string;
  publishPlan: PublishPlan;
}

export interface Project {
  id: string;
  name: string;
  prompt: string;
  updatedAt: string;
  thumbnail?: string;
  status: "borrador" | "publicado";
  htmlContent?: string;
  zipUrl?: string;
  isPublished?: boolean;
  publishedUrl?: string;
  customDomain?: string;
  domainStatus?: DomainStatus;
  siteData?: SiteContent;
}

interface AppState {
  user: User | null;
  projects: Project[];
  loading: boolean;
}

let state: AppState = {
  user: null,
  projects: [],
  loading: true,
};

const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((l) => l());
}

function mapProfileToUser(profile: DbProfile): User {
  return {
    id: profile.id,
    name: profile.name ?? "Usuario",
    email: profile.email ?? "",
    plan: profile.plan,
    credits: profile.credits,
    createdAt: profile.created_at,
    publishPlan: profile.publish_plan ?? "none",
  };
}

function mapProject(project: DbProject): Project {
  return {
    id: project.id,
    name: project.name,
    prompt: project.prompt,
    updatedAt: new Date(project.updated_at).toLocaleString("es-ES"),
    thumbnail: project.thumbnail ?? undefined,
    status: project.status,
    htmlContent: project.html_content ?? undefined,
    zipUrl: project.zip_url ?? undefined,
    isPublished: project.status === "publicado",
    publishedUrl: project.published_url ?? undefined,
    customDomain: project.custom_domain ?? undefined,
    domainStatus: project.domain_status ?? undefined,
    siteData: project.site_data ?? undefined,
  };
}

async function loadUserData() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      state = { user: null, projects: [], loading: false };
      emit();
      return;
    }

    let profile: DbProfile | null = null;

    try {
      profile = await getProfile(currentUser.id);
    } catch {
      try {
        profile = await createProfile({
          id: currentUser.id,
          name: (currentUser.user_metadata?.name as string) || "Nuevo usuario",
          email: currentUser.email || "",
          plan: "Base",
          credits: getPlanCredits("Base"),
          publish_plan: "none",
        });
      } catch (createError) {
        console.error("Error creando profile:", createError);
      }
    }

    let projects: DbProject[] = [];
    try {
      projects = await getProjects(currentUser.id);
    } catch (projectsError) {
      console.error("Error cargando proyectos:", projectsError);
    }

    state = {
      user: profile ? mapProfileToUser(profile) : null,
      projects: projects.map(mapProject),
      loading: false,
    };

    emit();
  } catch (error) {
    console.error("Error en loadUserData:", error);
    state = { user: null, projects: [], loading: false };
    emit();
  }
}

export const authStore = {
  subscribe(listener: () => void) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },

  getSnapshot(): AppState {
    return state;
  },

  async hydrate() {
    try {
      state = { ...state, loading: true };
      emit();
      await loadUserData();
    } catch (error) {
      console.error("Error en hydrate:", error);
      state = { user: null, projects: [], loading: false };
      emit();
    }
  },

  async login(email: string, password: string) {
    await signInWithEmail(email, password);
    await loadUserData();
  },

  async signup(name: string, email: string, password: string) {
    await signUpWithEmail(name, email, password);
    await loadUserData();
  },

  async logout() {
    await signOutUser();
    state = { user: null, projects: [], loading: false };
    emit();
  },

  async consumeCredits(n: number) {
    if (!state.user) return;

    const newCredits = Math.max(0, state.user.credits - n);
    const updated = await updateProfile(state.user.id, { credits: newCredits });

    state = {
      ...state,
      user: mapProfileToUser(updated),
    };
    emit();
  },

  async addCredits(n: number) {
    if (!state.user) return;

    const newCredits = state.user.credits + n;
    const updated = await updateProfile(state.user.id, { credits: newCredits });

    state = {
      ...state,
      user: mapProfileToUser(updated),
    };
    emit();
  },

  async setPlan(plan: Plan) {
    if (!state.user) return;

    const planCredits = getPlanCredits(plan);

    const updated = await updateProfile(state.user.id, {
      plan,
      credits: planCredits,
    });

    state = {
      ...state,
      user: mapProfileToUser(updated),
    };
    emit();
  },

  async setPublishPlan(plan: PublishPlan) {
    if (!state.user) return;

    const updated = await updateProfile(state.user.id, {
      publish_plan: plan,
    });

    state = {
      ...state,
      user: mapProfileToUser(updated),
    };
    emit();
  },

  async updateAccount(values: Partial<Pick<User, "name" | "email">>) {
    if (!state.user) return null;

    const updated = await updateProfile(state.user.id, {
      name: values.name,
      email: values.email,
    });

    state = {
      ...state,
      user: mapProfileToUser(updated),
    };
    emit();

    return state.user;
  },

  async addProject(p: Omit<Project, "id" | "updatedAt">) {
    if (!state.user) return null;

    const created = await createProjectInDb({
      user_id: state.user.id,
      name: p.name,
      prompt: p.prompt,
      thumbnail: p.thumbnail,
      status: p.status,
      html_content: p.htmlContent,
      zip_url: p.zipUrl,
      published_url: p.publishedUrl,
      custom_domain: p.customDomain,
      domain_status: p.domainStatus,
      site_data: p.siteData,
    });

    const mapped = mapProject(created);

    state = {
      ...state,
      projects: [mapped, ...state.projects],
    };
    emit();

    return mapped;
  },

  async updateProject(
    projectId: string,
    values: Partial<
      Pick<
        Project,
        | "name"
        | "prompt"
        | "thumbnail"
        | "status"
        | "htmlContent"
        | "zipUrl"
        | "isPublished"
        | "publishedUrl"
        | "customDomain"
        | "domainStatus"
        | "siteData"
      >
    >,
  ) {
    const updated = await updateProjectInDb(projectId, {
      name: values.name,
      prompt: values.prompt,
      thumbnail: values.thumbnail,
      status: values.status,
      html_content: values.htmlContent,
      zip_url: values.zipUrl,
      published_url: values.publishedUrl,
      custom_domain: values.customDomain,
      domain_status: values.domainStatus,
      site_data: values.siteData,
    });

    const mapped = mapProject(updated);

    state = {
      ...state,
      projects: state.projects.map((p) => (p.id === projectId ? mapped : p)),
    };
    emit();

    return mapped;
  },

  async deleteProject(projectId: string) {
    await deleteProjectInDb(projectId);

    state = {
      ...state,
      projects: state.projects.filter((p) => p.id !== projectId),
    };
    emit();
  },
};

export function useAuth() {
  return useSyncExternalStore(authStore.subscribe, authStore.getSnapshot, () => ({
    user: null,
    projects: [],
    loading: true,
  }));
}
