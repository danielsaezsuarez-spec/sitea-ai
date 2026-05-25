import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { authStore } from "@/lib/auth-store";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { signInWithGoogle } from "@/lib/supabase-oauth";
import { getErrorMessage } from "@/lib/utils";

export const Route = createFileRoute("/signup")({
  head: () => ({ meta: [{ title: "Crear cuenta — Sitea.ai" }] }),
  component: SignupPage,
});

function SignupPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password.length < 8) {
      toast.error("La contraseña debe tener al menos 8 caracteres");
      return;
    }

    try {
      setLoading(true);
      await authStore.signup(name || "Nuevo usuario", email, password);
      toast.success("Cuenta creada", {
        description: "Revisa tu email si Supabase te pide confirmación.",
      });
      navigate({ to: "/app" });
    } catch (error) {
      toast.error("No se pudo crear la cuenta", {
        description: getErrorMessage(error, "Revisa los datos e inténtalo de nuevo."),
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
      toast.error("No se pudo continuar con Google", {
        description: getErrorMessage(error),
      });
      setGoogleLoading(false);
    }
  };

  const benefits = [
    "50 créditos gratis al registrarte",
    "Sin tarjeta de crédito",
    "Exportación HTML incluida",
    "Empieza en menos de un minuto",
  ];

  return (
    <div className="grid min-h-screen bg-[linear-gradient(180deg,oklch(0.99_0.002_260),oklch(0.975_0.006_264))] md:grid-cols-2">
      <div className="flex flex-col px-6 py-10 md:px-16">
        <Logo />

        <div className="flex flex-1 items-center">
          <div className="mx-auto w-full max-w-sm">
            <BadgeTop />
            <h1 className="mt-6 text-3xl font-semibold tracking-tight">Crea tu cuenta</h1>
            <p className="mt-2 text-muted-foreground">
              Empieza a generar webs simples con IA en menos de un minuto.
            </p>

            <Card className="mt-8 rounded-[28px] border-white/50 bg-white/80 p-6 shadow-card backdrop-blur-sm">
              <div className="space-y-4">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  size="lg"
                  onClick={handleGoogle}
                  disabled={loading || googleLoading}
                >
                  {googleLoading ? "Conectando..." : "Continuar con Google"}
                </Button>

                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="h-px flex-1 bg-border" />
                  o crea tu cuenta con email
                  <span className="h-px flex-1 bg-border" />
                </div>

                <form onSubmit={onSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nombre</Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Tu nombre"
                      required
                      className="h-11 rounded-xl bg-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="tu@email.com"
                      required
                      className="h-11 rounded-xl bg-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Contraseña</Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Mínimo 8 caracteres"
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
                    {loading ? "Creando cuenta..." : "Crear cuenta gratis"}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </form>
              </div>
            </Card>

            <p className="mt-6 text-center text-sm text-muted-foreground">
              ¿Ya tienes cuenta?{" "}
              <Link to="/login" className="font-medium text-[oklch(0.52_0.23_292)] hover:underline">
                Inicia sesión
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

        <div className="relative flex h-full flex-col justify-center p-12 text-white">
          <h2 className="text-3xl font-semibold tracking-tight">Empieza gratis hoy</h2>

          <ul className="mt-8 space-y-4">
            {benefits.map((b) => (
              <li key={b} className="flex items-center gap-3 text-base">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-white/15">
                  <Check className="h-3.5 w-3.5" />
                </span>
                {b}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function BadgeTop() {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-[oklch(0.24_0.03_262/0.12)] bg-white/70 px-3 py-1 text-[0.72rem] font-medium text-[oklch(0.52_0.23_292)] shadow-sm backdrop-blur-sm">
      <Sparkles className="h-3.5 w-3.5" />
      Empieza gratis
    </div>
  );
}
