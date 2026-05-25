import { isSupabaseConfigured, supabase } from "./supabase-client";

export async function signInWithGoogle() {
  if (!isSupabaseConfigured) {
    throw new Error("Supabase no está configurado todavía.");
  }

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${window.location.origin}/app`,
    },
  });

  if (error) throw error;
  return data;
}
