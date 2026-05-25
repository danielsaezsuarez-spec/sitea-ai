import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useAuth, authStore } from "@/lib/auth-store";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import {
  LogOut,
  Trash2,
  Gem,
  Rocket,
  Globe,
  Sparkles,
  FolderKanban,
  ArrowUpRight,
} from "lucide-react";
import { useEffect, useState } from "react";
import { getErrorMessage } from "@/lib/utils";

export const Route = createFileRoute("/app/profile")({
  head: () => ({ meta: [{ title: "Perfil — Sitea.ai" }] }),
  component: ProfilePage,
});

function ProfilePage() {
  const { user, projects } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState(user?.name ?? "");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user?.name) setName(user.name);
  }, [user?.name]);

  if (!user) return null;

  const initials = user.name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("");

  const publishedProjects = projects.filter((p) => p.isPublished);
  const draftProjects = projects.filter((p) => !p.isPublished);

  const publishPlanLabel =
    user.publishPlan === "none"
      ? "Sin publicación"
      : user.publishPlan === "publica"
        ? "Publica"
        : "Publica Plus";

  const publishPlanBadgeClass =
    user.publishPlan === "publica_plus"
      ? "border-emerald-200 bg-emerald-50 text-emerald-700"
      : user.publishPlan === "publica"
        ? "border-sky-200 bg-sky-50 text-sky-700"
        : "border-border bg-muted/40 text-muted-foreground";

  return (
    <div className="px-6 py-8 md:px-10">
      <div className="mx-auto max-w-3xl space-y-8">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Tu cuenta</h1>
          <p className="mt-1 text-muted-foreground">
            Consulta tu plan, tus créditos, tu publicación y la configuración básica de tu cuenta.
          </p>
        </div>

        <Card className="border-border/60 bg-card p-6 shadow-card">
          <div className="flex flex-col gap-5 md:flex-row md:items-center">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="bg-gradient-primary text-lg text-primary-foreground">
                {initials}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <h2 className="text-lg font-semibold">{user.name}</h2>
              <p className="text-sm text-muted-foreground">{user.email}</p>

              <div className="mt-3 flex flex-wrap gap-2">
                <Badge variant="outline" className="border-primary/20 bg-primary/5 text-primary">
                  Plan {user.plan}
                </Badge>

                <Badge variant="outline" className={publishPlanBadgeClass}>
                  {publishPlanLabel}
                </Badge>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3 md:min-w-[320px]">
              <div className="rounded-xl border border-border/60 bg-background px-4 py-3">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Sparkles className="h-3.5 w-3.5" />
                  Créditos
                </div>
                <p className="mt-2 text-lg font-semibold">{user.credits}</p>
              </div>

              <div className="rounded-xl border border-border/60 bg-background px-4 py-3">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <FolderKanban className="h-3.5 w-3.5" />
                  Proyectos
                </div>
                <p className="mt-2 text-lg font-semibold">{projects.length}</p>
              </div>

              <div className="rounded-xl border border-border/60 bg-background px-4 py-3">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  {user.publishPlan === "publica_plus" ? (
                    <Globe className="h-3.5 w-3.5" />
                  ) : (
                    <Rocket className="h-3.5 w-3.5" />
                  )}
                  Publicadas
                </div>
                <p className="mt-2 text-lg font-semibold">{publishedProjects.length}</p>
              </div>
            </div>
          </div>
        </Card>

        <div className="grid gap-4 md:grid-cols-3">
          <Card className="border-border/60 bg-card p-5 shadow-card">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Gem className="h-4 w-4 text-primary" />
              Pack de creación
            </div>
            <p className="mt-3 text-2xl font-semibold">{user.plan}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Tu pack actual para generar y refinar webs.
            </p>
            <Button asChild variant="link" className="mt-2 h-auto p-0 text-xs">
              <Link to="/app/billing">
                Gestionar plan <ArrowUpRight className="h-3 w-3" />
              </Link>
            </Button>
          </Card>

          <Card className="border-border/60 bg-card p-5 shadow-card">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              {user.publishPlan === "publica_plus" ? (
                <Globe className="h-4 w-4 text-primary" />
              ) : (
                <Rocket className="h-4 w-4 text-primary" />
              )}
              Publicación
            </div>
            <p className="mt-3 text-2xl font-semibold">{publishPlanLabel}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              {user.publishPlan === "none"
                ? "No tienes activado ningún plan de publicación."
                : "Tu cuenta puede publicar proyectos desde el generador."}
            </p>
            <Button asChild variant="link" className="mt-2 h-auto p-0 text-xs">
              <Link to="/app/billing">
                Gestionar publicación <ArrowUpRight className="h-3 w-3" />
              </Link>
            </Button>
          </Card>

          <Card className="border-border/60 bg-card p-5 shadow-card">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <FolderKanban className="h-4 w-4 text-primary" />
              Estado de proyectos
            </div>
            <p className="mt-3 text-2xl font-semibold">{projects.length}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              {publishedProjects.length} publicados · {draftProjects.length} borradores
            </p>
            <Button asChild variant="link" className="mt-2 h-auto p-0 text-xs">
              <Link to="/app/projects">
                Ver proyectos <ArrowUpRight className="h-3 w-3" />
              </Link>
            </Button>
          </Card>
        </div>

        <Card className="border-border/60 bg-card p-6 shadow-card">
          <h3 className="font-semibold">Información de la cuenta</h3>

          <div className="mt-5 space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={user.email}
                  readOnly
                  className="bg-muted/40"
                />
                <p className="text-xs text-muted-foreground">
                  El cambio de email se hará más adelante desde Supabase Auth.
                </p>
              </div>
            </div>

            <div className="flex justify-end">
              <Button
                variant="hero"
                disabled={saving || !name.trim()}
                onClick={async () => {
                  try {
                    setSaving(true);
                    await authStore.updateAccount({ name: name.trim() });
                    toast.success("Datos actualizados", {
                      description: "El nombre se ha guardado en tu perfil.",
                    });
                  } catch (error) {
                    toast.error("No se pudo guardar el perfil", {
                      description: getErrorMessage(error),
                    });
                  } finally {
                    setSaving(false);
                  }
                }}
              >
                {saving ? "Guardando..." : "Guardar información"}
              </Button>
            </div>
          </div>
        </Card>

        <Card className="border-border/60 bg-card p-6 shadow-card">
          <h3 className="font-semibold">Notificaciones</h3>

          <div className="mt-4 space-y-4">
            <Row
              title="Avisos por email"
              desc="Recibe novedades del producto y consejos."
              defaultChecked
            />
            <Separator />
            <Row
              title="Aviso de créditos bajos"
              desc="Te avisamos cuando te queden pocos créditos disponibles."
              defaultChecked
            />
            <Separator />
            <Row title="Resumen mensual" desc="Resumen de uso al final de cada mes." />
          </div>
        </Card>

        <Card className="border-destructive/20 bg-card p-6 shadow-card">
          <h3 className="font-semibold text-destructive">Zona peligrosa</h3>

          <div className="mt-4 space-y-3">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium">Cerrar sesión</p>
                <p className="text-xs text-muted-foreground">
                  Saldrás de tu cuenta en este dispositivo.
                </p>
              </div>

              <Button
                variant="outline"
                onClick={async () => {
                  await authStore.logout();
                  navigate({ to: "/" });
                }}
              >
                <LogOut className="h-4 w-4" /> Cerrar sesión
              </Button>
            </div>

            <Separator />

            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-destructive">Eliminar cuenta</p>
                <p className="text-xs text-muted-foreground">Esta acción no se puede deshacer.</p>
              </div>

              <Button
                variant="destructive"
                onClick={() =>
                  toast.error("Función no disponible todavía", {
                    description: "Más adelante podrás eliminar la cuenta desde aquí.",
                  })
                }
              >
                <Trash2 className="h-4 w-4" /> Eliminar
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

function Row({
  title,
  desc,
  defaultChecked,
}: {
  title: string;
  desc: string;
  defaultChecked?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <p className="text-sm font-medium">{title}</p>
        <p className="text-xs text-muted-foreground">{desc}</p>
      </div>
      <Switch defaultChecked={defaultChecked} />
    </div>
  );
}
