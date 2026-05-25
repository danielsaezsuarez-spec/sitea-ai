import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { WebsiteMiniPreview } from "@/components/WebsiteMiniPreview";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Sparkles } from "lucide-react";
import { CREATE_PLANS, PUBLISH_PLANS } from "@/lib/plans";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Precios — Sitea.ai" },
      { name: "description", content: "Planes Base, Pro y Premium para crear webs con IA." },
    ],
  }),
  component: PricingPage,
});

const plans = Object.values(CREATE_PLANS).map((plan) => ({
  ...plan,
  cta:
    plan.name === "Base" ? "Empezar con Base" : plan.name === "Pro" ? "Elegir Pro" : "Ir a Premium",
}));

const publishPlans = Object.values(PUBLISH_PLANS);

function PricingPage() {
  return (
    <div className="flex min-h-screen flex-col overflow-hidden">
      <SiteHeader />
      <main className="relative flex-1 bg-gradient-hero">
        <div className="aurora-lines" aria-hidden />
        <section className="container relative mx-auto max-w-7xl px-6 py-20 md:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto mb-7 h-24 w-24">
              <div className="orb-core animate-float-soft h-full w-full" aria-hidden />
            </div>
            <Badge variant="outline" className="purple-outline">
              Precios simples
            </Badge>
            <h1 className="mt-5 text-5xl font-black tracking-tight md:text-6xl">
              Elige créditos según la web que quieras crear
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-muted-foreground">
              Base empieza con webs simples. Pro y Premium añaden más créditos para refinar, probar
              diseños y trabajar proyectos más completos.
            </p>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {plans.map((p) => (
              <Card
                key={p.name}
                className={`relative overflow-hidden rounded-[30px] p-7 transition-smooth ${
                  p.popular
                    ? "border-primary/25 bg-white/82 shadow-glow md:scale-[1.03]"
                    : "premium-card"
                }`}
              >
                {p.popular && (
                  <Badge className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-gradient-primary text-white">
                    Más popular
                  </Badge>
                )}

                <WebsiteMiniPreview
                  title={p.previewTitle}
                  badge={p.previewBadge}
                  variant={p.previewVariant}
                  compact
                />

                <div className="mt-6 flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-bold">{p.name}</h3>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">{p.description}</p>
                  </div>
                  <Badge variant="outline" className="shrink-0 purple-outline font-bold">
                    {p.credits} cr.
                  </Badge>
                </div>

                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-5xl font-black tracking-tight">{p.price}€</span>
                  <span className="text-sm text-muted-foreground">pago único</span>
                </div>

                <div className="mt-4 rounded-2xl border border-white/70 bg-white/72 p-4">
                  <div className="flex items-start gap-2">
                    <Sparkles className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                    <div>
                      <p className="text-sm font-bold">{p.creditSummary}</p>
                      <p className="mt-1 text-xs leading-5 text-muted-foreground">{p.useCase}</p>
                    </div>
                  </div>
                </div>

                <Button
                  asChild
                  variant={p.popular ? "hero" : "outline"}
                  className="mt-6 w-full rounded-2xl"
                >
                  <Link to="/signup">{p.cta}</Link>
                </Button>

                <ul className="mt-6 space-y-3 text-sm">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                      <span className="leading-6 text-foreground/85">{f}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>

          <div className="mt-20">
            <div className="mx-auto max-w-2xl text-center">
              <Badge variant="outline" className="purple-outline">
                Publicación opcional
              </Badge>
              <h2 className="mt-5 text-4xl font-black tracking-tight md:text-5xl">
                Crear y publicar son dos cosas separadas
              </h2>
              <p className="mt-4 text-muted-foreground">
                Puedes descargar tu web sin cuota mensual o activar publicación si quieres hosting,
                subdominio y gestión desde el panel.
              </p>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-2">
              {publishPlans.map((p) => (
                <Card key={p.name} className="rounded-[30px] premium-card p-7">
                  <h3 className="text-lg font-bold">{p.name}</h3>
                  <div className="mt-5 flex items-baseline gap-1">
                    <span className="text-4xl font-black tracking-tight">{p.price}€</span>
                    <span className="text-sm text-muted-foreground">/mes</span>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{p.description}</p>

                  <ul className="mt-6 space-y-3 text-sm">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5">
                        <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                        <span className="leading-6 text-foreground/85">{f}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
