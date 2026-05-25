import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { WebsiteMiniPreview } from "@/components/WebsiteMiniPreview";
import { Button } from "@/components/ui/button";
import { CREATE_PLANS } from "@/lib/plans";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ArrowRight,
  Check,
  Code2,
  Download,
  Eye,
  Globe,
  MessageSquareText,
  MonitorSmartphone,
  Rocket,
  ShieldCheck,
  Sparkles,
  Wand2,
  Zap,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sitea.ai — Crea, descarga y publica webs con IA" },
      {
        name: "description",
        content:
          "Crea tu web con IA, descárgala o publícala con subdominio incluido. Después conecta tu propio dominio cuando quieras.",
      },
      { property: "og:title", content: "Sitea.ai — Crea y publica webs con IA" },
      {
        property: "og:description",
        content: "De una idea a una web online en minutos. Sin código y sin complicaciones.",
      },
    ],
  }),
  component: LandingPage,
});

function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col overflow-hidden">
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <Logos />
        <HowItWorks />
        <Advantages />
        <Examples />
        <Pricing />
        <FAQ />
        <FinalCTA />
      </main>
      <SiteFooter />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden pt-4">
      <div className="absolute inset-0 grid-pattern opacity-40" aria-hidden />
      <div className="aurora-lines" aria-hidden />
      <div className="absolute inset-x-0 top-0 h-[760px] bg-gradient-glow" aria-hidden />
      <div className="absolute left-1/2 top-8 h-60 w-60 -translate-x-1/2 rounded-full bg-[oklch(0.72_0.22_308/0.24)] blur-3xl" />

      <div className="container relative mx-auto max-w-7xl px-6 pb-24 pt-14 md:pb-32 md:pt-20">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mx-auto mb-8 flex h-28 w-28 items-center justify-center md:h-36 md:w-36">
            <div
              className="orb-core animate-float-soft animate-pulse-orb h-full w-full"
              aria-hidden
            />
          </div>

          <Badge
            variant="outline"
            className="animate-fade-up purple-outline px-4 py-1.5 text-[0.74rem] font-bold shadow-sm backdrop-blur-sm"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Crea tu web con IA y publícala cuando quieras
          </Badge>

          <h1
            className="mt-7 animate-fade-up text-5xl font-black leading-[1.02] tracking-tight text-[oklch(0.22_0.04_286)] md:text-7xl"
            style={{ animationDelay: "70ms" }}
          >
            Crea tu web, <span className="text-gradient-primary">descárgala o publícala</span> en
            minutos
          </h1>

          <p
            className="mx-auto mt-6 max-w-2xl animate-fade-up text-base leading-7 text-muted-foreground md:text-xl md:leading-8"
            style={{ animationDelay: "130ms" }}
          >
            Genera una web simple con un prompt, ajústala en segundos y elige cómo usarla:
            descárgala para llevártela o publícala con subdominio incluido y gestión desde tu panel.
          </p>

          <div
            className="mt-10 flex animate-fade-up flex-col items-center justify-center gap-3 sm:flex-row"
            style={{ animationDelay: "190ms" }}
          >
            <Button asChild size="xl" variant="hero" className="min-w-[220px] rounded-[18px]">
              <Link to="/signup">
                Empezar ahora
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>

            <Button asChild size="xl" variant="outline" className="min-w-[190px] rounded-[18px]">
              <Link to="/pricing">Ver precios</Link>
            </Button>
          </div>

          <div
            className="mt-5 animate-fade-up text-sm font-medium text-muted-foreground"
            style={{ animationDelay: "240ms" }}
          >
            Packs para crear · Publicación opcional · Dominio propio más adelante
          </div>
        </div>

        <HeroMockup />
      </div>
    </section>
  );
}

function HeroMockup() {
  return (
    <div
      className="relative mx-auto mt-16 max-w-6xl animate-fade-up"
      style={{ animationDelay: "300ms" }}
    >
      <div className="absolute -inset-8 rounded-[42px] bg-[radial-gradient(circle_at_50%_0%,oklch(0.72_0.22_310/0.18),transparent_62%)] blur-2xl" />
      <div className="relative rounded-[34px] border border-white/70 bg-white/58 p-3 shadow-[0_26px_90px_-34px_oklch(0.48_0.22_294/0.48)] backdrop-blur-2xl">
        <div className="overflow-hidden rounded-[28px] border border-white/70 bg-[oklch(0.995_0.006_296)]">
          <div className="flex items-center gap-2 border-b border-border/60 bg-white/74 px-5 py-3 backdrop-blur-sm">
            <div className="flex gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-red-300" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
            </div>
            <div className="ml-3 flex-1 rounded-xl border border-border/60 bg-white/85 px-4 py-1.5 text-xs font-medium text-muted-foreground">
              preview · estudio-yoga.sitea.ai
            </div>
          </div>

          <div className="grid min-h-[470px] md:grid-cols-[1.02fr_1fr]">
            <div className="border-b border-border/50 bg-white/46 p-6 md:border-b-0 md:border-r">
              <div className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">
                <MessageSquareText className="h-3.5 w-3.5 text-primary" />
                Chat de generación
              </div>

              <div className="space-y-3 text-sm">
                <div className="rounded-2xl bg-[oklch(0.946_0.032_296)] px-4 py-3 text-[0.95rem] leading-6 text-foreground/90">
                  Crea una landing elegante para un estudio de yoga con clases, beneficios,
                  testimonios y formulario de contacto.
                </div>

                <div className="rounded-2xl border border-primary/15 bg-white/82 px-4 py-3 text-[0.95rem] leading-6 text-foreground/85 shadow-sm">
                  ✨ Generando estructura, copy y diseño inicial...
                </div>

                <div className="rounded-2xl bg-[oklch(0.946_0.032_296)] px-4 py-3 text-[0.95rem] leading-6 text-foreground/90">
                  Hazlo más premium, añade una llamada a la acción y una sección de horarios.
                </div>
              </div>

              <div className="mt-8 rounded-3xl border border-white/70 bg-white/76 p-4 shadow-sm backdrop-blur-sm">
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground">
                    Qué puedes hacer
                  </p>
                  <Badge variant="outline" className="purple-outline">
                    Flexible
                  </Badge>
                </div>

                <div className="grid gap-3 sm:grid-cols-3">
                  <MiniStat title="Crea" value="Con prompts" />
                  <MiniStat title="Exporta" value="HTML / ZIP" />
                  <MiniStat title="Publica" value="Subdominio" />
                </div>
              </div>
            </div>

            <div className="bg-[radial-gradient(circle_at_top,oklch(0.93_0.06_306),white_68%)] p-6 md:p-8">
              <div className="glass-panel overflow-hidden rounded-[26px] shadow-[0_22px_56px_-26px_oklch(0.42_0.16_292/0.4)]">
                <div className="border-b border-border/50 px-6 py-4">
                  <p className="text-[0.7rem] font-bold uppercase tracking-[0.18em] text-primary">
                    Vista previa
                  </p>
                </div>

                <div className="bg-[radial-gradient(circle_at_top,oklch(0.88_0.08_306),white_65%)] px-6 py-10 text-center">
                  <Badge className="border border-white/50 bg-white/78 text-primary shadow-sm">
                    Bienestar & equilibrio
                  </Badge>
                  <h3 className="mt-4 text-3xl font-bold tracking-tight">Estudio de Yoga Aurora</h3>
                  <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-muted-foreground">
                    Clases para todos los niveles, en un espacio diseñado para cuidar cuerpo y
                    mente.
                  </p>

                  <div className="mt-6 flex justify-center gap-2">
                    <div className="rounded-xl bg-gradient-primary px-4 py-2 text-xs font-bold text-white shadow-sm">
                      Reservar clase
                    </div>
                    <div className="rounded-xl border border-border bg-white px-4 py-2 text-xs font-bold text-foreground/85">
                      Ver horarios
                    </div>
                  </div>
                </div>

                <div className="grid gap-3 px-6 py-6 md:grid-cols-3">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="rounded-2xl border border-border/60 bg-white p-4 shadow-sm"
                    >
                      <div className="h-8 w-8 rounded-xl bg-gradient-primary shadow-[0_12px_24px_-12px_oklch(0.52_0.22_292/0.6)]" />
                      <div className="mt-4 h-2 w-20 rounded-full bg-foreground/85" />
                      <div className="mt-2 h-1.5 w-full rounded-full bg-muted-foreground/25" />
                      <div className="mt-1.5 h-1.5 w-3/4 rounded-full bg-muted-foreground/25" />
                    </div>
                  ))}
                </div>

                <div className="border-t border-border/50 bg-[oklch(0.982_0.018_296)] px-6 py-6">
                  <div className="mx-auto max-w-sm">
                    <div className="text-center text-sm font-bold">Reserva tu primera clase</div>
                    <div className="mt-4 space-y-2">
                      <div className="h-9 rounded-xl border border-border bg-white" />
                      <div className="h-9 rounded-xl border border-border bg-white" />
                      <div className="h-20 rounded-xl border border-border bg-white" />
                      <div className="h-10 rounded-xl bg-gradient-primary" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MiniStat({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/70 bg-white/78 p-3">
      <p className="text-[0.68rem] font-bold uppercase tracking-[0.14em] text-muted-foreground">
        {title}
      </p>
      <p className="mt-1 text-sm font-bold text-foreground">{value}</p>
    </div>
  );
}

function Logos() {
  return (
    <section className="border-y border-white/70 bg-white/58 py-10 backdrop-blur-xl">
      <div className="container mx-auto max-w-7xl px-6">
        <p className="text-center text-[0.72rem] font-bold uppercase tracking-[0.18em] text-muted-foreground">
          Pensado para profesionales, autónomos y pequeños negocios
        </p>

        <div className="mt-7 grid grid-cols-2 items-center gap-6 opacity-70 md:grid-cols-6">
          {["Estudio Norte", "Bricolet", "Café Lumen", "Mara Legal", "Studio K", "Vetcare"].map(
            (n) => (
              <div
                key={n}
                className="text-center text-sm font-bold tracking-tight text-muted-foreground"
              >
                {n}
              </div>
            ),
          )}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    {
      icon: MessageSquareText,
      title: "Describe tu web",
      desc: "Escribe qué negocio tienes, el tono, las secciones y el objetivo principal.",
    },
    {
      icon: Wand2,
      title: "Genera con IA",
      desc: "Sitea prepara estructura, copy y una primera versión visual lista para revisar.",
    },
    {
      icon: Eye,
      title: "Refina y previsualiza",
      desc: "Pide cambios con nuevas instrucciones y revisa el resultado antes de exportar.",
    },
    {
      icon: Rocket,
      title: "Descarga o publica",
      desc: "Llévate HTML/ZIP o publica con subdominio y gestión desde tu panel.",
    },
  ];

  return (
    <section id="funciona" className="py-28">
      <div className="container mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="outline" className="purple-outline">
            Cómo funciona
          </Badge>
          <h2 className="mt-5 text-4xl font-black tracking-tight md:text-5xl">
            Crea hoy. Publica cuando quieras.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Un flujo simple para quien quiere una web útil sin meterse en código.
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-4">
          {steps.map((s, i) => (
            <Card
              key={s.title}
              className="group rounded-[28px] premium-card p-6 transition-smooth hover:-translate-y-1 hover:shadow-elegant"
            >
              <div className="text-[0.72rem] font-mono text-muted-foreground">0{i + 1}</div>
              <div className="mt-4 grid h-12 w-12 place-items-center rounded-2xl bg-gradient-primary text-white shadow-[0_14px_28px_-14px_oklch(0.52_0.22_292/0.64)]">
                <s.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-lg font-bold">{s.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{s.desc}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function Advantages() {
  const items = [
    {
      icon: Zap,
      title: "Empieza barato",
      desc: "Puedes entrar con packs pequeños para crear webs sin comprometerte con una cuota mensual.",
    },
    {
      icon: Code2,
      title: "Tu web es tuya",
      desc: "Descarga el HTML o ZIP cuando quieras y úsalo fuera de Sitea si lo prefieres.",
    },
    {
      icon: MonitorSmartphone,
      title: "Publicación opcional",
      desc: "Si quieres comodidad, publícala con subdominio y gestión desde tu panel.",
    },
    {
      icon: Globe,
      title: "Dominio propio después",
      desc: "Primero puedes salir online con subdominio y luego conectar tu propio dominio.",
    },
    {
      icon: Eye,
      title: "Previsualización inmediata",
      desc: "Ve el resultado antes de descargar o publicar y sigue mejorándolo con prompts.",
    },
    {
      icon: ShieldCheck,
      title: "Sin complicarte",
      desc: "Pensado para no técnicos que quieren una web simple, clara y funcional.",
    },
  ];

  return (
    <section id="ventajas" className="relative overflow-hidden bg-gradient-subtle py-28">
      <div className="absolute inset-0 grid-pattern opacity-30" aria-hidden />
      <div className="container relative mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="outline" className="purple-outline">
            Ventajas
          </Badge>
          <h2 className="mt-5 text-4xl font-black tracking-tight md:text-5xl">
            Flexible, simple y con apariencia premium
          </h2>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {items.map((it) => (
            <Card
              key={it.title}
              className="rounded-[28px] premium-card p-6 transition-smooth hover:-translate-y-1 hover:shadow-elegant"
            >
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[oklch(0.93_0.05_296)] text-primary">
                <it.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-lg font-bold">{it.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{it.desc}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function Examples() {
  const examples = [
    {
      tag: "Landing",
      title: "Abogada independiente",
      desc: "Servicios, especialidades, prueba social y formulario de contacto.",
      variant: "legal" as const,
    },
    {
      tag: "Servicios",
      title: "Electricista local",
      desc: "Zonas de trabajo, servicios urgentes y botón de llamada.",
      variant: "service" as const,
    },
    {
      tag: "Reservas",
      title: "Centro de estética",
      desc: "Tratamientos, horarios, bonos y reserva sencilla.",
      variant: "booking" as const,
    },
    {
      tag: "Corporativa",
      title: "Asesoría fiscal",
      desc: "Página clara con servicios, confianza y captación de clientes.",
      variant: "corporate" as const,
    },
    {
      tag: "Personal",
      title: "Entrenador personal",
      desc: "Bio, planes, testimonios y llamada a la acción directa.",
      variant: "personal" as const,
    },
    {
      tag: "Contacto",
      title: "Restaurante de barrio",
      desc: "Carta breve, ubicación, horarios y formulario de contacto.",
      variant: "restaurant" as const,
    },
  ];

  return (
    <section id="ejemplos" className="py-28">
      <div className="container mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="outline" className="purple-outline">
            Ejemplos de uso
          </Badge>
          <h2 className="mt-5 text-4xl font-black tracking-tight md:text-5xl">
            Previsualiza estilos antes de crear
          </h2>
          <p className="mt-4 text-muted-foreground">
            No es un constructor complejo: son webs simples y útiles para negocios que necesitan
            verse profesionales rápido.
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {examples.map((e) => (
            <Card
              key={e.title}
              className="group overflow-hidden rounded-[28px] premium-card p-0 transition-smooth hover:-translate-y-1 hover:shadow-elegant"
            >
              <div className="p-4 pb-0">
                <WebsiteMiniPreview title={e.title} badge={e.tag} variant={e.variant} />
              </div>

              <div className="p-5">
                <Badge variant="outline" className="mb-3 purple-outline text-xs">
                  {e.tag}
                </Badge>
                <h3 className="text-lg font-bold">{e.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{e.desc}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const createPlans = Object.values(CREATE_PLANS).map((plan) => ({
    ...plan,
    cta:
      plan.name === "Base" ? "Elegir Base" : plan.name === "Pro" ? "Elegir Pro" : "Elegir Premium",
  }));

  const publishPlans = [
    {
      name: "Publica",
      price: "6,90",
      description: "Para tener tu web online con nosotros.",
      features: [
        "Publicación en subdominio Sitea",
        "Hosting y SSL incluidos",
        "Actualizar cambios desde el panel",
        "1 web publicada",
      ],
    },
    {
      name: "Publica Plus",
      price: "11,90",
      description: "Para publicar y usar tu propio dominio.",
      features: [
        "Todo lo de Publica",
        "Conectar dominio propio",
        "Editor básico de mantenimiento",
        "Preparado para validación DNS",
      ],
    },
  ];

  return (
    <section id="precios" className="relative overflow-hidden bg-gradient-subtle py-28">
      <div className="absolute inset-0 grid-pattern opacity-25" aria-hidden />
      <div className="container relative mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="outline" className="purple-outline">
            Planes y precios
          </Badge>
          <h2 className="mt-5 text-4xl font-black tracking-tight md:text-5xl">
            Elige créditos para crear. Publica solo si quieres.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Base está pensado para webs simples. Pro y Premium dan más margen para refinar, probar
            versiones y preparar proyectos más completos.
          </p>
        </div>

        <div className="mt-14">
          <div className="mb-6 text-center">
            <h3 className="text-2xl font-bold tracking-tight">Packs para crear</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Paga por créditos de creación y llévate tu web en HTML o ZIP.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {createPlans.map((p) => (
              <Card
                key={p.name}
                className={`relative overflow-hidden rounded-[30px] p-7 backdrop-blur-sm transition-smooth ${
                  p.popular
                    ? "border-primary/25 bg-white/82 shadow-glow md:scale-[1.02]"
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
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{p.description}</p>
                  </div>
                  <Badge variant="outline" className="shrink-0 purple-outline font-bold">
                    {p.credits} cr.
                  </Badge>
                </div>

                <div className="mt-5 flex items-baseline gap-1">
                  <span className="text-4xl font-black tracking-tight">{p.price}€</span>
                  <span className="text-sm text-muted-foreground">pago único</span>
                </div>

                <div className="mt-4 rounded-2xl border border-white/70 bg-white/74 p-4">
                  <p className="text-sm font-bold">{p.creditSummary}</p>
                  <p className="mt-1 text-xs leading-5 text-muted-foreground">{p.useCase}</p>
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
        </div>

        <div className="mt-16">
          <div className="mb-6 text-center">
            <h3 className="text-2xl font-bold tracking-tight">Publicación opcional</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Si quieres que tu web quede online con nosotros, activas un plan mensual aparte.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {publishPlans.map((p) => (
              <Card key={p.name} className="rounded-[30px] premium-card p-7">
                <h3 className="text-lg font-bold">{p.name}</h3>
                <div className="mt-5 flex items-baseline gap-1">
                  <span className="text-4xl font-black tracking-tight">{p.price}€</span>
                  <span className="text-sm text-muted-foreground">/mes</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{p.description}</p>

                <ul className="mt-6 space-y-3 text-sm">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <Check className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-primary" />
                      <span className="leading-6 text-foreground/85">{f}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const faqs = [
    {
      q: "¿Puedo pagar solo por crear la web y ya está?",
      a: "Sí. Puedes crear tu web, descargarla y no volver a pagar si no quieres que la alojemos nosotros.",
    },
    {
      q: "¿La publicación con vosotros es obligatoria?",
      a: "No. Es opcional. Solo la necesitas si quieres subdominio, hosting y gestión desde el panel.",
    },
    {
      q: "¿Qué incluye el plan de publicación?",
      a: "Incluye hosting, SSL, subdominio y la posibilidad de actualizar la web publicada desde tu panel.",
    },
    {
      q: "¿Puedo conectar mi propio dominio después?",
      a: "Sí. Primero puedes salir online con un subdominio de Sitea y más adelante conectar tu propio dominio.",
    },
    {
      q: "¿La web es mía cuando la descargo?",
      a: "Sí. La web descargada es tuya y puedes usarla fuera de Sitea en el hosting que prefieras.",
    },
    {
      q: "¿Puedo seguir modificando la web una vez creada?",
      a: "Sí. Puedes seguir refinándola y, si la tienes publicada con nosotros, actualizarla desde tu panel.",
    },
  ];

  return (
    <section id="faq" className="py-28">
      <div className="container mx-auto max-w-3xl px-6">
        <div className="text-center">
          <Badge variant="outline" className="purple-outline">
            FAQ
          </Badge>
          <h2 className="mt-5 text-4xl font-black tracking-tight md:text-5xl">
            Preguntas frecuentes
          </h2>
        </div>

        <div className="mt-12 rounded-[30px] premium-card p-4 md:p-6">
          <Accordion type="single" collapsible>
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`f-${i}`} className="border-border/60">
                <AccordionTrigger className="text-left text-base font-bold hover:no-underline">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-7 text-muted-foreground">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="px-6 pb-24 pt-6">
      <div className="container mx-auto max-w-5xl">
        <div className="relative overflow-hidden rounded-[36px] border border-white/25 bg-[linear-gradient(135deg,oklch(0.22_0.06_286),oklch(0.38_0.16_292),oklch(0.56_0.22_306))] p-12 text-center text-white shadow-[0_30px_90px_-28px_oklch(0.36_0.16_292/0.72)] md:p-16">
          <div className="absolute inset-0 grid-pattern opacity-20" aria-hidden />
          <div
            className="absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-white/16 blur-3xl"
            aria-hidden
          />
          <div className="relative">
            <div className="mx-auto mb-6 h-20 w-20">
              <div className="orb-core h-full w-full" aria-hidden />
            </div>
            <h2 className="text-4xl font-black tracking-tight md:text-5xl">
              Crea tu web hoy. Publícala cuando quieras.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-white/82 md:text-base">
              Empieza con un pack de creación y decide después si quieres descargarla o mantenerla
              online con nosotros.
            </p>

            <Button
              asChild
              size="xl"
              variant="outline"
              className="mt-8 min-w-[220px] border-white/35 bg-white/16 text-white hover:bg-white/24"
            >
              <Link to="/signup">
                <span className="text-white">Empezar ahora</span>
                <ArrowRight className="h-4 w-4 text-white" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
