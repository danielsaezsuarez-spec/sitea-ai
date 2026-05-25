import { createFileRoute } from "@tanstack/react-router";
import { useAuth, authStore, type Plan, type PublishPlan } from "@/lib/auth-store";
import { CREATE_PLANS, PUBLISH_PLANS, getPlanCredits, getPublishPlanLabel } from "@/lib/plans";
import { Button } from "@/components/ui/button";
import { WebsiteMiniPreview } from "@/components/WebsiteMiniPreview";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import {
  Check,
  CreditCard,
  Receipt,
  Zap,
  Sparkles,
  Rocket,
  Globe,
  Download,
  X,
} from "lucide-react";
import { useState } from "react";
import { getErrorMessage } from "@/lib/utils";

export const Route = createFileRoute("/app/billing")({
  head: () => ({ meta: [{ title: "Facturación — Sitea.ai" }] }),
  component: BillingPage,
});

const createPlans = Object.values(CREATE_PLANS);
const publishPlans = Object.values(PUBLISH_PLANS);

const invoices = [
  {
    id: "INV-2025-008",
    date: "01 abr 2025",
    plan: "Pro / Publica",
    amount: "19,00€",
    status: "Pagada",
  },
  { id: "INV-2025-007", date: "01 mar 2025", plan: "Publica", amount: "6,90€", status: "Pagada" },
  { id: "INV-2025-006", date: "01 feb 2025", plan: "Base", amount: "9,00€", status: "Pagada" },
];

function BillingPage() {
  const { user } = useAuth();
  const [busy, setBusy] = useState<string | null>(null);

  if (!user) return null;

  const planLimit = getPlanCredits(user.plan);
  const used = Math.max(0, planLimit - user.credits);
  const pct = Math.min(100, (used / planLimit) * 100);

  const publishPlanLabel = getPublishPlanLabel(user.publishPlan).toLowerCase();

  const choose = async (plan: Plan) => {
    try {
      setBusy(`plan-${plan}`);
      await authStore.setPlan(plan);
      toast.success(`Pack ${plan} activado`, {
        description: "El cambio se ha aplicado correctamente.",
      });
    } catch (error) {
      toast.error("No se pudo cambiar el pack", {
        description: getErrorMessage(error),
      });
    } finally {
      setBusy(null);
    }
  };

  const choosePublishPlan = async (plan: PublishPlan) => {
    try {
      setBusy(`publish-${plan}`);
      await authStore.setPublishPlan(plan);

      toast.success(plan === "publica" ? "Plan Publica activado" : "Plan Publica Plus activado", {
        description: "Ya puedes usar las funciones de publicación asociadas a este plan.",
      });
    } catch (error) {
      toast.error("No se pudo activar la publicación", {
        description: getErrorMessage(error),
      });
    } finally {
      setBusy(null);
    }
  };

  const disablePublishPlan = async () => {
    try {
      setBusy("publish-none");
      await authStore.setPublishPlan("none");

      toast.success("Publicación desactivada", {
        description: "Tu cuenta ya no tiene un plan de publicación activo.",
      });
    } catch (error) {
      toast.error("No se pudo desactivar la publicación", {
        description: getErrorMessage(error),
      });
    } finally {
      setBusy(null);
    }
  };

  const buyCredits = async (amount: number, label: string) => {
    try {
      setBusy(`credits-${amount}`);
      await authStore.addCredits(amount);
      toast.success(`Has añadido ${amount} créditos`, {
        description: `Se ha simulado la compra de ${label}.`,
      });
    } catch (error) {
      toast.error("No se pudieron añadir créditos", {
        description: getErrorMessage(error),
      });
    } finally {
      setBusy(null);
    }
  };

  return (
    <div className="px-6 py-8 md:px-10">
      <div className="mx-auto max-w-5xl space-y-8">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Facturación y planes</h1>
          <p className="mt-1 text-muted-foreground">
            Gestiona tus packs de creación, tu saldo de créditos y la publicación opcional de tus
            webs.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card className="rounded-[28px] border-white/50 bg-white/80 p-6 shadow-card backdrop-blur-sm md:col-span-2">
            <div className="flex items-start justify-between">
              <div>
                <Badge
                  variant="outline"
                  className="border-[oklch(0.24_0.03_262/0.12)] bg-white text-[oklch(0.52_0.23_292)]"
                >
                  Estado actual
                </Badge>

                <h2 className="mt-3 text-3xl font-semibold tracking-tight">{user.plan}</h2>

                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <p className="text-sm text-muted-foreground">Publicación: {publishPlanLabel}</p>

                  {user.publishPlan !== "none" ? (
                    <Badge
                      className={
                        user.publishPlan === "publica_plus"
                          ? "border border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-50"
                          : "border border-sky-200 bg-sky-50 text-sky-700 hover:bg-sky-50"
                      }
                    >
                      {user.publishPlan === "publica" ? "Publica activo" : "Publica Plus activo"}
                    </Badge>
                  ) : (
                    <Badge variant="secondary">Sin publicación</Badge>
                  )}
                </div>
              </div>

              <div className="text-right">
                <p className="text-3xl font-semibold tracking-tight">{user.credits}</p>
                <p className="text-xs text-muted-foreground">créditos</p>
              </div>
            </div>

            <div className="mt-6">
              <Progress value={pct} className="h-2" />
              <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                <span>{used} usados</span>
                <span>{planLimit} incluidos</span>
              </div>
            </div>
          </Card>

          <Card className="rounded-[28px] border-white/50 bg-white/80 p-6 shadow-card backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-[oklch(0.94_0.008_258)]">
                <CreditCard className="h-4 w-4 text-[oklch(0.52_0.23_292)]" />
              </div>
              <div>
                <p className="text-sm font-medium">Método de pago</p>
                <p className="text-xs text-muted-foreground">VISA •••• 4242</p>
              </div>
            </div>

            <Button variant="outline" size="sm" className="mt-4 w-full">
              Actualizar
            </Button>
          </Card>
        </div>

        <div>
          <h2 className="text-xl font-semibold tracking-tight">Packs para crear</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Pagas por crear tu web. Publicarla con nosotros es opcional y va aparte.
          </p>

          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {createPlans.map((p) => {
              const isCurrent = user.plan === p.name;
              const isLoading = busy === `plan-${p.name}`;

              return (
                <Card
                  key={p.name}
                  className={`relative rounded-[28px] p-6 backdrop-blur-sm transition-smooth ${
                    p.popular
                      ? "border-[oklch(0.24_0.03_262/0.14)] bg-[linear-gradient(180deg,white,oklch(0.97_0.004_260))] shadow-[0_24px_70px_-30px_oklch(0.18_0.02_262/0.22)]"
                      : "border-white/50 bg-white/78 shadow-card"
                  }`}
                >
                  {p.popular && (
                    <Badge className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-[linear-gradient(135deg,oklch(0.24_0.06_286),oklch(0.32_0.06_268),oklch(0.72_0.2_314))] text-white">
                      Más popular
                    </Badge>
                  )}

                  <WebsiteMiniPreview
                    title={p.previewTitle}
                    badge={p.previewBadge}
                    variant={p.previewVariant}
                    compact
                  />

                  <div className="mt-5 flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-semibold">{p.name}</h3>
                      <p className="mt-1 text-xs leading-5 text-muted-foreground">
                        {p.description}
                      </p>
                    </div>
                    <Badge
                      variant="outline"
                      className="shrink-0 border-[oklch(0.24_0.03_262/0.14)] bg-white text-[oklch(0.52_0.23_292)]"
                    >
                      {p.credits} cr.
                    </Badge>
                  </div>

                  <div className="mt-3 flex items-baseline gap-1">
                    <span className="text-3xl font-semibold tracking-tight">{p.price}€</span>
                    <span className="text-xs text-muted-foreground">pago único</span>
                  </div>

                  <div className="mt-4 rounded-2xl border border-border/60 bg-white/70 p-3">
                    <p className="text-xs font-semibold">{p.creditSummary}</p>
                    <p className="mt-1 text-[11px] leading-5 text-muted-foreground">{p.useCase}</p>
                  </div>

                  <Button
                    variant={isCurrent ? "outline" : p.popular ? "hero" : "default"}
                    className="mt-5 w-full"
                    disabled={isCurrent || isLoading}
                    onClick={() => choose(p.name)}
                  >
                    {isCurrent ? "Pack actual" : isLoading ? "Cambiando..." : "Elegir pack"}
                  </Button>

                  <ul className="mt-5 space-y-2.5 text-xs">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-2">
                        <Check className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-[oklch(0.52_0.23_292)]" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              );
            })}
          </div>
        </div>

        <Card className="rounded-[28px] border-white/50 bg-[linear-gradient(180deg,white,oklch(0.975_0.004_260))] p-6 shadow-card backdrop-blur-sm">
          <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-[linear-gradient(135deg,oklch(0.24_0.06_286),oklch(0.56_0.24_296),oklch(0.64_0.2_306))] text-white shadow-[0_12px_26px_-12px_oklch(0.18_0.02_262/0.45)]">
                <Zap className="h-4 w-4" />
              </div>
              <div>
                <h3 className="font-semibold">¿Necesitas créditos extra?</h3>
                <p className="text-sm text-muted-foreground">
                  Compra packs adicionales sin cambiar tu pack principal.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                disabled={busy === "credits-50"}
                onClick={() => buyCredits(50, "+50 cr · 6€")}
              >
                {busy === "credits-50" ? "Añadiendo..." : "+50 cr · 6€"}
              </Button>

              <Button
                variant="outline"
                disabled={busy === "credits-150"}
                onClick={() => buyCredits(150, "+150 cr · 14€")}
              >
                {busy === "credits-150" ? "Añadiendo..." : "+150 cr · 14€"}
              </Button>

              <Button
                variant="hero"
                disabled={busy === "credits-300"}
                onClick={() => buyCredits(300, "+300 cr · 24€")}
              >
                <Sparkles className="h-3.5 w-3.5" />
                {busy === "credits-300" ? "Añadiendo..." : "+300 cr · 24€"}
              </Button>
            </div>
          </div>
        </Card>

        <div>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold tracking-tight">Publicación opcional</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Si quieres mantener tu web con nosotros, puedes activar un plan mensual aparte.
              </p>
            </div>

            {user.publishPlan !== "none" ? (
              <Button
                variant="outline"
                size="sm"
                disabled={busy === "publish-none"}
                onClick={disablePublishPlan}
              >
                <X className="h-4 w-4" />
                {busy === "publish-none" ? "Desactivando..." : "Quitar publicación"}
              </Button>
            ) : null}
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {publishPlans.map((p) => {
              const isCurrent = user.publishPlan === p.key;
              const isLoading = busy === `publish-${p.key}`;

              return (
                <Card
                  key={p.name}
                  className="rounded-[28px] border-white/50 bg-white/78 p-6 shadow-card backdrop-blur-sm"
                >
                  <div className="flex items-center gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-2xl bg-[oklch(0.94_0.008_258)]">
                      {p.key === "publica" ? (
                        <Rocket className="h-4 w-4 text-[oklch(0.52_0.23_292)]" />
                      ) : (
                        <Globe className="h-4 w-4 text-[oklch(0.52_0.23_292)]" />
                      )}
                    </div>

                    <div>
                      <h3 className="font-semibold">{p.name}</h3>
                      <p className="text-xs text-muted-foreground">
                        {p.key === "publica"
                          ? "Publica tu web en un subdominio Sitea"
                          : "Publica y conecta tu propio dominio"}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 flex items-baseline gap-1">
                    <span className="text-3xl font-semibold tracking-tight">{p.price}€</span>
                    <span className="text-xs text-muted-foreground">/mes</span>
                  </div>

                  <Button
                    variant={isCurrent ? "outline" : "hero"}
                    className="mt-5 w-full"
                    disabled={isCurrent || isLoading}
                    onClick={() => choosePublishPlan(p.key)}
                  >
                    {isCurrent
                      ? "Plan de publicación actual"
                      : isLoading
                        ? "Activando..."
                        : "Activar publicación"}
                  </Button>

                  <ul className="mt-5 space-y-2.5 text-xs">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-2">
                        <Check className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-[oklch(0.52_0.23_292)]" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              );
            })}
          </div>
        </div>

        <Card className="rounded-[28px] border-white/50 bg-[linear-gradient(180deg,white,oklch(0.975_0.004_260))] p-6 shadow-card backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-[oklch(0.94_0.008_258)]">
              <Download className="h-4 w-4 text-[oklch(0.52_0.23_292)]" />
            </div>
            <div>
              <h3 className="font-semibold">Tu filosofía sigue igual</h3>
              <p className="text-sm text-muted-foreground">
                Puedes pagar solo por crear tu web y llevártela. La publicación con nosotros es
                opcional.
              </p>
            </div>
          </div>
        </Card>

        <div>
          <h2 className="text-xl font-semibold tracking-tight">Historial de facturas</h2>

          <Card className="mt-4 overflow-hidden rounded-[28px] border-white/50 bg-white/80 p-0 shadow-card backdrop-blur-sm">
            <div className="divide-y divide-border">
              {invoices.map((inv) => (
                <div key={inv.id} className="flex items-center gap-4 px-6 py-4">
                  <div className="grid h-10 w-10 place-items-center rounded-2xl bg-[oklch(0.94_0.008_258)]">
                    <Receipt className="h-4 w-4 text-[oklch(0.52_0.23_292)]" />
                  </div>

                  <div className="flex-1">
                    <p className="text-sm font-medium">{inv.id}</p>
                    <p className="text-xs text-muted-foreground">
                      {inv.date} · {inv.plan}
                    </p>
                  </div>

                  <Badge variant="secondary" className="bg-success/10 text-success">
                    {inv.status}
                  </Badge>

                  <p className="w-20 text-right text-sm font-medium">{inv.amount}</p>

                  <Button variant="ghost" size="sm">
                    Descargar
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
