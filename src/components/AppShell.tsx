import { Link, Outlet, useLocation, useNavigate } from "@tanstack/react-router";
import { Logo } from "./Logo";
import { useAuth, authStore } from "@/lib/auth-store";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Sparkles,
  LayoutDashboard,
  FolderKanban,
  CreditCard,
  User,
  LogOut,
  Wand2,
  Gem,
  Rocket,
  Globe,
} from "lucide-react";
import { useEffect } from "react";

const nav = [
  { to: "/app", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/app/generator", label: "Generador", icon: Wand2 },
  { to: "/app/projects", label: "Proyectos", icon: FolderKanban },
  { to: "/app/billing", label: "Facturación", icon: CreditCard },
  { to: "/app/profile", label: "Perfil", icon: User },
];

export function AppShell() {
  const { user, loading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    authStore.hydrate();
  }, []);

  useEffect(() => {
    if (!loading && !user) {
      navigate({ to: "/login" });
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="grid min-h-screen place-items-center bg-gradient-hero">
        <div className="flex items-center gap-3 rounded-2xl border border-white/70 bg-white/72 px-5 py-3 text-sm text-muted-foreground shadow-card backdrop-blur-xl">
          <span className="h-3 w-3 animate-pulse rounded-full bg-primary" />
          Cargando panel…
        </div>
      </div>
    );
  }

  if (!user) return null;

  const initials = user.name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("");

  const publishPlanLabel =
    user.publishPlan === "none"
      ? "Sin publicación"
      : user.publishPlan === "publica"
        ? "Publica"
        : "Publica Plus";

  const publishPlanBadgeClass =
    user.publishPlan === "publica_plus"
      ? "border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-50"
      : user.publishPlan === "publica"
        ? "border-purple-200 bg-purple-50 text-purple-700 hover:bg-purple-50"
        : "border-border bg-white/55 text-muted-foreground hover:bg-white/55";

  return (
    <div className="flex min-h-screen bg-gradient-hero">
      <aside className="hidden w-72 flex-col border-r border-white/70 bg-white/72 shadow-[16px_0_44px_-36px_oklch(0.42_0.16_292/0.48)] backdrop-blur-2xl md:flex">
        <div className="flex h-20 items-center border-b border-white/70 px-6">
          <Logo />
        </div>

        <nav className="flex-1 space-y-1.5 px-4 py-6">
          {nav.map((item) => {
            const active = item.exact
              ? location.pathname === item.to
              : location.pathname.startsWith(item.to);

            const Icon = item.icon;

            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition-smooth ${
                  active
                    ? "bg-gradient-primary text-white shadow-[0_16px_34px_-18px_oklch(0.52_0.22_292/0.64)]"
                    : "text-[oklch(0.35_0.06_286)] hover:bg-[oklch(0.94_0.032_296)] hover:text-[oklch(0.28_0.09_286)]"
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="mx-4 mb-4 rounded-[28px] border border-white/70 bg-white/74 p-5 shadow-card backdrop-blur-xl">
          <div className="flex items-center gap-2 text-[0.72rem] font-bold uppercase tracking-[0.14em] text-muted-foreground">
            <Gem className="h-3.5 w-3.5 text-primary" />
            Plan {user.plan}
          </div>

          <p className="mt-3 text-3xl font-black tracking-tight text-foreground">{user.credits}</p>
          <p className="text-xs text-muted-foreground">créditos disponibles</p>

          <div className="mt-4 rounded-2xl border border-white/70 bg-[oklch(0.965_0.025_296)] p-3">
            <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
              {user.publishPlan === "publica_plus" ? (
                <Globe className="h-3.5 w-3.5" />
              ) : (
                <Rocket className="h-3.5 w-3.5" />
              )}
              Publicación
            </div>

            <div className="mt-2">
              <Badge variant="outline" className={publishPlanBadgeClass}>
                {publishPlanLabel}
              </Badge>
            </div>
          </div>

          <Button asChild size="sm" variant="hero" className="mt-4 w-full rounded-xl">
            <Link to="/app/billing">
              <Sparkles className="h-3.5 w-3.5" />
              Gestionar planes
            </Link>
          </Button>
        </div>

        <div className="border-t border-white/70 p-4">
          <div className="flex items-center gap-3 rounded-2xl bg-white/66 p-3 shadow-sm">
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-gradient-primary text-xs text-white">
                {initials}
              </AvatarFallback>
            </Avatar>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-foreground">{user.name}</p>
              <p className="truncate text-xs text-muted-foreground">{user.email}</p>
            </div>

            <Button
              size="icon"
              variant="ghost"
              onClick={async () => {
                await authStore.logout();
                navigate({ to: "/" });
              }}
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </aside>

      <main className="relative flex-1 overflow-x-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-gradient-glow opacity-80" />
        <div className="relative">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
