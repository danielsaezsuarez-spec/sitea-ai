import { createFileRoute, Link } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth-store";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { getPlanCredits, getPublishPlanLabel } from "@/lib/plans";
import {
  Wand2,
  Plus,
  FolderKanban,
  Sparkles,
  ArrowUpRight,
  Gem,
  Zap,
  Rocket,
  Globe,
  LayoutDashboard,
  CheckCircle2,
  Clock3,
  AlertTriangle,
} from "lucide-react";

export const Route = createFileRoute("/app/")({
  head: () => ({ meta: [{ title: "Dashboard — Sitea.ai" }] }),
  component: DashboardPage,
});

function DashboardPage() {
  const { user, projects } = useAuth();
  if (!user) return null;

  const planLimit = getPlanCredits(user.plan);
  const used = Math.max(0, planLimit - user.credits);
  const pct = Math.min(100, (used / planLimit) * 100);

  const publishedProjects = projects.filter((p) => p.isPublished);
  const draftProjects = projects.filter((p) => !p.isPublished);

  const publishPlanLabel = getPublishPlanLabel(user.publishPlan);

  return (
    <div className="px-6 py-8 md:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Hola de nuevo,</p>
            <h1 className="text-3xl font-semibold tracking-tight">{user.name.split(" ")[0]} 👋</h1>
          </div>

          <Button asChild variant="hero" size="lg">
            <Link to="/app/generator">
              <Wand2 className="h-4 w-4" /> Crear nuevo proyecto
            </Link>
          </Button>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="border-border/60 bg-gradient-card p-6 shadow-card">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Créditos disponibles</span>
              <Sparkles className="h-4 w-4 text-primary" />
            </div>
            <p className="mt-3 text-3xl font-semibold tracking-tight">{user.credits}</p>
            <Progress value={pct} className="mt-3 h-1.5" />
            <p className="mt-2 text-xs text-muted-foreground">
              {used} / {planLimit} usados
            </p>
          </Card>

          <Card className="border-border/60 bg-card p-6 shadow-card">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Pack de creación</span>
              <Gem className="h-4 w-4 text-primary" />
            </div>
            <p className="mt-3 text-3xl font-semibold tracking-tight">{user.plan}</p>
            <Button asChild variant="link" className="mt-1 h-auto p-0 text-xs">
              <Link to="/app/billing">
                Cambiar pack <ArrowUpRight className="h-3 w-3" />
              </Link>
            </Button>
          </Card>

          <Card className="border-border/60 bg-card p-6 shadow-card">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Publicación</span>
              {user.publishPlan === "none" ? (
                <LayoutDashboard className="h-4 w-4 text-primary" />
              ) : user.publishPlan === "publica" ? (
                <Rocket className="h-4 w-4 text-primary" />
              ) : (
                <Globe className="h-4 w-4 text-primary" />
              )}
            </div>
            <p className="mt-3 text-2xl font-semibold tracking-tight">{publishPlanLabel}</p>
            <Button asChild variant="link" className="mt-1 h-auto p-0 text-xs">
              <Link to="/app/billing">
                Gestionar publicación <ArrowUpRight className="h-3 w-3" />
              </Link>
            </Button>
          </Card>

          <Card className="border-border/60 bg-card p-6 shadow-card">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Proyectos</span>
              <FolderKanban className="h-4 w-4 text-primary" />
            </div>
            <p className="mt-3 text-3xl font-semibold tracking-tight">{projects.length}</p>
            <p className="mt-2 text-xs text-muted-foreground">
              {publishedProjects.length} publicados · {draftProjects.length} borradores
            </p>
          </Card>
        </div>

        <Card className="mt-6 overflow-hidden border-border/60 bg-gradient-primary p-0 shadow-elegant">
          <div className="relative grid gap-6 p-8 md:grid-cols-[1fr_auto] md:items-center md:p-10">
            <div className="absolute inset-0 grid-pattern opacity-20" aria-hidden />
            <div className="relative text-primary-foreground">
              <Badge className="mb-3 border-white/20 bg-white/15 text-primary-foreground hover:bg-white/20">
                <Zap className="h-3 w-3" /> Generador IA
              </Badge>
              <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                Crea, exporta y publica tu web desde un solo panel
              </h2>
              <p className="mt-2 max-w-md text-primary-foreground/90">
                Genera una primera versión, ajusta el contenido, descárgala o publícala con
                subdominio si tienes activado tu plan de publicación.
              </p>
            </div>

            <div className="relative">
              <Button
                asChild
                size="lg"
                className="border border-white/10 bg-[linear-gradient(135deg,oklch(0.24_0.06_286),oklch(0.28_0.04_272))] text-white shadow-[0_12px_30px_-12px_oklch(0.15_0.02_260/0.45)] hover:opacity-95"
              >
                <Link to="/app/generator">
                  <Wand2 className="h-4 w-4 text-white" />
                  <span className="text-white">Abrir generador</span>
                </Link>
              </Button>
            </div>
          </div>
        </Card>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <Card className="border-border/60 bg-card p-6 shadow-card">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Publicadas</span>
              <CheckCircle2 className="h-4 w-4 text-primary" />
            </div>
            <p className="mt-3 text-3xl font-semibold tracking-tight">{publishedProjects.length}</p>
            <p className="mt-2 text-xs text-muted-foreground">Webs online en tu panel</p>
          </Card>

          <Card className="border-border/60 bg-card p-6 shadow-card">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Borradores</span>
              <FolderKanban className="h-4 w-4 text-primary" />
            </div>
            <p className="mt-3 text-3xl font-semibold tracking-tight">{draftProjects.length}</p>
            <p className="mt-2 text-xs text-muted-foreground">Proyectos aún sin publicar</p>
          </Card>

          <Card className="border-border/60 bg-card p-6 shadow-card">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Estado de publicación</span>
              {user.publishPlan === "none" ? (
                <LayoutDashboard className="h-4 w-4 text-primary" />
              ) : (
                <Rocket className="h-4 w-4 text-primary" />
              )}
            </div>
            <p className="mt-3 text-2xl font-semibold tracking-tight">{publishPlanLabel}</p>
            <p className="mt-2 text-xs text-muted-foreground">
              {user.publishPlan === "none"
                ? "Activa un plan para publicar tus webs"
                : "Listo para publicar y actualizar proyectos"}
            </p>
          </Card>
        </div>

        <div className="mt-10">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold tracking-tight">Proyectos recientes</h2>
            <Button asChild variant="ghost" size="sm">
              <Link to="/app/projects">
                Ver todos <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {projects.slice(0, 6).map((p) => (
              <Card
                key={p.id}
                className="group overflow-hidden border-border/60 p-0 shadow-card transition-smooth hover:-translate-y-1 hover:shadow-elegant"
              >
                <div className="relative aspect-[16/10] bg-gradient-primary">
                  <div className="absolute inset-3 rounded-md bg-card/95 p-3 backdrop-blur">
                    <div className="h-1.5 w-12 rounded-full bg-foreground/80" />
                    <div className="mt-1.5 h-1 w-20 rounded-full bg-muted-foreground/40" />
                    <div className="mt-3 h-10 rounded bg-muted/60" />
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="truncate font-medium">{p.name}</h3>
                    <Badge
                      variant={p.isPublished ? "default" : "secondary"}
                      className="text-xs capitalize"
                    >
                      {p.isPublished ? "publicada" : "borrador"}
                    </Badge>
                  </div>

                  <p className="mt-1 line-clamp-1 text-xs text-muted-foreground">{p.prompt}</p>

                  {p.publishedUrl ? (
                    <div className="mt-3 rounded-md border border-border/60 bg-background px-2.5 py-1.5 text-[11px] text-muted-foreground">
                      {p.customDomain ? p.customDomain : p.publishedUrl.replace("https://", "")}
                    </div>
                  ) : (
                    <p className="mt-3 text-xs text-muted-foreground">Sin publicar todavía</p>
                  )}

                  <div className="mt-3 flex flex-wrap gap-2">
                    {p.customDomain ? (
                      <Badge variant="outline" className="text-[10px]">
                        <Globe className="h-3 w-3" />
                        Dominio propio
                      </Badge>
                    ) : null}

                    {p.customDomain && p.domainStatus === "connected" ? (
                      <Badge className="border border-emerald-200 bg-emerald-50 text-[10px] text-emerald-700 hover:bg-emerald-50">
                        <CheckCircle2 className="h-3 w-3" />
                        Conectado
                      </Badge>
                    ) : null}

                    {p.customDomain && p.domainStatus === "pending" ? (
                      <Badge className="border border-amber-200 bg-amber-50 text-[10px] text-amber-700 hover:bg-amber-50">
                        <Clock3 className="h-3 w-3" />
                        Pendiente
                      </Badge>
                    ) : null}

                    {p.customDomain && p.domainStatus === "error" ? (
                      <Badge className="border border-red-200 bg-red-50 text-[10px] text-red-700 hover:bg-red-50">
                        <AlertTriangle className="h-3 w-3" />
                        Error DNS
                      </Badge>
                    ) : null}
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <p className="text-xs text-muted-foreground">{p.updatedAt}</p>
                    <Button asChild variant="ghost" size="sm" className="h-7 px-2 text-xs">
                      <Link to="/app/generator" search={{ projectId: p.id }}>
                        Abrir
                      </Link>
                    </Button>
                  </div>
                </div>
              </Card>
            ))}

            <Link
              to="/app/generator"
              className="group flex min-h-[180px] items-center justify-center rounded-xl border-2 border-dashed border-border bg-card/40 transition-smooth hover:border-primary/40 hover:bg-card"
            >
              <div className="text-center">
                <div className="mx-auto grid h-10 w-10 place-items-center rounded-lg bg-accent text-accent-foreground transition-smooth group-hover:bg-gradient-primary group-hover:text-primary-foreground">
                  <Plus className="h-5 w-5" />
                </div>
                <p className="mt-3 text-sm font-medium">Crear nueva web</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
