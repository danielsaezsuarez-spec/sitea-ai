import { isSupabaseConfigured, supabase } from "./supabase-client";

function assertSupabaseConfigured() {
  if (!isSupabaseConfigured) {
    throw new Error(
      "Supabase no está configurado. Crea .env.local con VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY.",
    );
  }
}

export async function signUpWithEmail(name: string, email: string, password: string) {
  assertSupabaseConfigured();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
      },
    },
  });

  if (error) throw error;
  return data;
}

export async function signInWithEmail(email: string, password: string) {
  assertSupabaseConfigured();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  return data;
}

export async function signOutUser() {
  if (!isSupabaseConfigured) return;

  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function getCurrentSession() {
  if (!isSupabaseConfigured) return null;

  const { data, error } = await supabase.auth.getSession();
  if (error) throw error;
  return data.session;
}

export async function getCurrentUser() {
  if (!isSupabaseConfigured) return null;

  const { data, error } = await supabase.auth.getUser();
  if (error) throw error;
  return data.user;
}
