import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { authStore } from "@/lib/auth-store";
import { ArrowRight, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { signInWithGoogle } from "@/lib/supabase-oauth";
import { getErrorMessage } from "@/lib/utils";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Iniciar sesión — Sitea.ai" }] }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      await authStore.login(email, password);
      navigate({ to: "/app" });
    } catch (error) {
      toast.error("No se pudo iniciar sesión", {
        description: getErrorMessage(error, "Revisa tus credenciales e inténtalo de nuevo."),
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    try {
      setGoogleLoading(true);
      await signInWithGoogle();
    } catch (error) {
      toast.error("No se pudo iniciar sesión con Google", {
        description: getErrorMessage(error),
      });
      setGoogleLoading(false);
    }
  };

  return (
    <div className="grid min-h-screen bg-[linear-gradient(180deg,oklch(0.99_0.002_260),oklch(0.975_0.006_264))] md:grid-cols-2">
      <div className="flex flex-col px-6 py-10 md:px-16">
        <Logo />

        <div className="flex flex-1 items-center">
          <div className="mx-auto w-full max-w-sm">
            <BadgeTop />
            <h1 className="mt-6 text-3xl font-semibold tracking-tight">Bienvenido de nuevo</h1>
            <p className="mt-2 text-muted-foreground">
              Inicia sesión para entrar en tu panel y seguir creando webs simples con IA.
            </p>

            <Card className="mt-8 rounded-[28px] border-white/50 bg-white/80 p-6 shadow-card backdrop-blur-sm">
              <div className="space-y-4">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  size="lg"
                  onClick={handleGoogle}
                  disabled={googleLoading || loading}
                >
                  {googleLoading ? "Conectando..." : "Continuar con Google"}
                </Button>

                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="h-px flex-1 bg-border" />
                  o entra con email
                  <span className="h-px flex-1 bg-border" />
                </div>

                <form onSubmit={onSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="h-11 rounded-xl bg-white"
                      placeholder="tu@email.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Contraseña</Label>
                      <span className="text-xs text-muted-foreground">Recuperación pendiente</span>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="h-11 rounded-xl bg-white"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="hero"
                    className="mt-2 w-full"
                    size="lg"
                    disabled={loading || googleLoading}
                  >
                    {loading ? "Entrando..." : "Entrar"}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </form>
              </div>
            </Card>

            <p className="mt-6 text-center text-sm text-muted-foreground">
              ¿No tienes cuenta?{" "}
              <Link
                to="/signup"
                className="font-medium text-[oklch(0.52_0.23_292)] hover:underline"
              >
                Regístrate gratis
              </Link>
            </p>
          </div>
        </div>
      </div>

      <div className="relative hidden overflow-hidden md:block">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,oklch(0.16_0.02_262),oklch(0.24_0.03_266),oklch(0.34_0.06_270))]" />
        <div className="absolute inset-0 grid-pattern opacity-20" aria-hidden />
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_top,oklch(1_0_0/0.08),transparent_50%)]"
          aria-hidden
        />

        <div className="relative flex h-full flex-col justify-between p-12 text-white">
          <div className="flex items-center gap-2 text-sm opacity-90">
            <Sparkles className="h-4 w-4" />
            Crea webs con IA
          </div>

          <div className="max-w-md space-y-5">
            <p className="text-3xl font-medium leading-tight">
              “En pocos minutos tenía una landing profesional lista para revisar, exportar y
              publicar.”
            </p>
            <p className="text-sm text-white/75">— Marta R., terapeuta freelance</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function BadgeTop() {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-[oklch(0.24_0.03_262/0.12)] bg-white/70 px-3 py-1 text-[0.72rem] font-medium text-[oklch(0.52_0.23_292)] shadow-sm backdrop-blur-sm">
      <Sparkles className="h-3.5 w-3.5" />
      Acceso a tu cuenta
    </div>
  );
}
