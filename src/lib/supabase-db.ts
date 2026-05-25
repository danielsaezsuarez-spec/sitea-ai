import { supabase } from "./supabase-client";
import type { SiteContent } from "./site-template";

export type DbPlan = "Base" | "Pro" | "Premium";
export type DbPublishPlan = "none" | "publica" | "publica_plus";
export type DbDomainStatus = "pending" | "connected" | "error";

export interface DbProfile {
  id: string;
  name: string | null;
  email: string | null;
  plan: DbPlan;
  credits: number;
  publish_plan: DbPublishPlan;
  created_at: string;
}

export interface DbProject {
  id: string;
  user_id: string;
  name: string;
  prompt: string;
  html_content?: string | null;
  zip_url?: string | null;
  thumbnail?: string | null;
  status: "borrador" | "publicado";
  published_url?: string | null;
  custom_domain?: string | null;
  domain_status?: DbDomainStatus | null;
  site_data?: SiteContent | null;
  updated_at: string;
  created_at: string;
}

export async function createProfile(profile: {
  id: string;
  name: string;
  email: string;
  plan?: DbPlan;
  credits?: number;
  publish_plan?: DbPublishPlan;
}) {
  const { data, error } = await supabase
    .from("profiles")
    .insert({
      id: profile.id,
      name: profile.name,
      email: profile.email,
      plan: profile.plan ?? "Base",
      credits: profile.credits ?? 50,
      publish_plan: profile.publish_plan ?? "none",
    })
    .select()
    .single();

  if (error) throw error;
  return data as DbProfile;
}

export async function getProfile(userId: string) {
  const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).single();

  if (error) throw error;
  return data as DbProfile;
}

export async function updateProfile(
  userId: string,
  values: Partial<Pick<DbProfile, "name" | "email" | "plan" | "credits" | "publish_plan">>,
) {
  const { data, error } = await supabase
    .from("profiles")
    .update(values)
    .eq("id", userId)
    .select()
    .single();

  if (error) throw error;
  return data as DbProfile;
}

export async function getProjects(userId: string) {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("user_id", userId)
    .order("updated_at", { ascending: false });

  if (error) throw error;
  return (data ?? []) as DbProject[];
}

export async function createProject(project: {
  user_id: string;
  name: string;
  prompt: string;
  html_content?: string;
  zip_url?: string;
  thumbnail?: string;
  status?: "borrador" | "publicado";
  published_url?: string;
  custom_domain?: string;
  domain_status?: DbDomainStatus | null;
  site_data?: SiteContent | null;
}) {
  const { data, error } = await supabase
    .from("projects")
    .insert({
      user_id: project.user_id,
      name: project.name,
      prompt: project.prompt,
      html_content: project.html_content ?? null,
      zip_url: project.zip_url ?? null,
      thumbnail: project.thumbnail ?? null,
      status: project.status ?? "borrador",
      published_url: project.published_url ?? null,
      custom_domain: project.custom_domain ?? null,
      domain_status: project.domain_status ?? null,
      site_data: project.site_data ?? null,
    })
    .select()
    .single();

  if (error) throw error;
  return data as DbProject;
}

export async function updateProject(
  projectId: string,
  values: Partial<
    Pick<
      DbProject,
      | "name"
      | "prompt"
      | "html_content"
      | "zip_url"
      | "thumbnail"
      | "status"
      | "published_url"
      | "custom_domain"
      | "domain_status"
      | "site_data"
    >
  >,
) {
  const { data, error } = await supabase
    .from("projects")
    .update({
      ...values,
      updated_at: new Date().toISOString(),
    })
    .eq("id", projectId)
    .select()
    .single();

  if (error) throw error;
  return data as DbProject;
}

export async function deleteProject(projectId: string) {
  const { error } = await supabase.from("projects").delete().eq("id", projectId);

  if (error) throw error;
}
