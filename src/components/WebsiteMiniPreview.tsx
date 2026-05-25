import { Badge } from "@/components/ui/badge";

export type WebsiteMiniPreviewVariant =
  | "simple"
  | "business"
  | "premium"
  | "legal"
  | "service"
  | "booking"
  | "corporate"
  | "personal"
  | "restaurant";

interface WebsiteMiniPreviewProps {
  variant?: WebsiteMiniPreviewVariant;
  title: string;
  badge?: string;
  compact?: boolean;
}

type PreviewTone = {
  browser: string;
  page: string;
  hero: string;
  image: string;
  imageGlow: string;
  accent: string;
  accentSoft: string;
  chip: string;
  shadow: string;
};

type PreviewContent = {
  brand: string;
  domain: string;
  nav: string[];
  eyebrow: string;
  headline: string;
  subline: string;
  cta: string;
  secondary: string;
  cards: string[];
  stat: string;
  layout: "service" | "booking" | "editorial" | "menu" | "portfolio" | "corporate";
  tone: PreviewTone;
};

const purpleTone: PreviewTone = {
  browser:
    "bg-[linear-gradient(135deg,oklch(0.32_0.15_286),oklch(0.56_0.25_302),oklch(0.78_0.18_326))]",
  page: "bg-[radial-gradient(circle_at_50%_0%,oklch(0.96_0.045_304),white_42%,oklch(0.98_0.015_286)_100%)]",
  hero: "bg-[linear-gradient(135deg,white,oklch(0.96_0.035_304))]",
  image:
    "bg-[radial-gradient(circle_at_35%_28%,white_0_8%,oklch(0.86_0.13_310)_9%_23%,oklch(0.6_0.25_296)_24%_52%,oklch(0.38_0.18_282)_53%_100%)]",
  imageGlow: "bg-[oklch(0.7_0.22_308/0.42)]",
  accent: "bg-[oklch(0.52_0.23_292)]",
  accentSoft: "bg-[oklch(0.93_0.055_304)]",
  chip: "border-[oklch(0.7_0.14_302/0.45)] bg-white/78 text-[oklch(0.42_0.17_292)]",
  shadow: "shadow-[0_24px_60px_-28px_oklch(0.5_0.22_296/0.72)]",
};

const slatePurpleTone: PreviewTone = {
  browser:
    "bg-[linear-gradient(135deg,oklch(0.24_0.06_276),oklch(0.42_0.15_288),oklch(0.66_0.16_312))]",
  page: "bg-[linear-gradient(180deg,oklch(0.99_0.01_292),white)]",
  hero: "bg-[linear-gradient(135deg,white,oklch(0.95_0.025_292))]",
  image:
    "bg-[linear-gradient(135deg,oklch(0.28_0.08_276),oklch(0.47_0.16_292),oklch(0.76_0.14_318))]",
  imageGlow: "bg-[oklch(0.56_0.18_292/0.38)]",
  accent: "bg-[oklch(0.36_0.12_286)]",
  accentSoft: "bg-[oklch(0.94_0.035_292)]",
  chip: "border-[oklch(0.55_0.12_292/0.32)] bg-white/82 text-[oklch(0.34_0.11_286)]",
  shadow: "shadow-[0_24px_60px_-30px_oklch(0.28_0.1_286/0.58)]",
};

const rosePurpleTone: PreviewTone = {
  browser:
    "bg-[linear-gradient(135deg,oklch(0.38_0.17_306),oklch(0.58_0.24_322),oklch(0.78_0.13_20))]",
  page: "bg-[radial-gradient(circle_at_top,oklch(0.96_0.04_328),white_48%,oklch(0.985_0.014_310)_100%)]",
  hero: "bg-[linear-gradient(135deg,white,oklch(0.96_0.038_328))]",
  image:
    "bg-[radial-gradient(circle_at_38%_30%,white_0_7%,oklch(0.9_0.09_330)_8%_24%,oklch(0.66_0.22_324)_25%_56%,oklch(0.46_0.18_306)_57%_100%)]",
  imageGlow: "bg-[oklch(0.72_0.18_326/0.4)]",
  accent: "bg-[oklch(0.58_0.22_320)]",
  accentSoft: "bg-[oklch(0.95_0.04_326)]",
  chip: "border-[oklch(0.74_0.12_326/0.42)] bg-white/82 text-[oklch(0.46_0.16_316)]",
  shadow: "shadow-[0_24px_60px_-28px_oklch(0.54_0.2_318/0.62)]",
};

const previewContent: Record<WebsiteMiniPreviewVariant, PreviewContent> = {
  simple: {
    brand: "Luna Yoga",
    domain: "estudio-yoga.sitea.ai",
    nav: ["Clases", "Horarios", "Contacto"],
    eyebrow: "Web simple",
    headline: "Yoga y bienestar en una sola página",
    subline: "Presenta servicios, horarios y contacto directo en minutos.",
    cta: "Reservar clase",
    secondary: "Ver horarios",
    cards: ["Clases", "Bonos", "Contacto"],
    stat: "1 página",
    layout: "service",
    tone: purpleTone,
  },
  business: {
    brand: "Nova Dental",
    domain: "clinica-dental.sitea.ai",
    nav: ["Servicios", "Equipo", "Cita"],
    eyebrow: "Negocio local",
    headline: "Clínica cercana, clara y profesional",
    subline: "Una web con servicios, confianza, ubicación y llamada a cita.",
    cta: "Pedir cita",
    secondary: "Tratamientos",
    cards: ["Ortodoncia", "Limpieza", "Urgencias"],
    stat: "+ secciones",
    layout: "booking",
    tone: purpleTone,
  },
  premium: {
    brand: "Aurea Studio",
    domain: "aurea-studio.sitea.ai",
    nav: ["Portfolio", "Proceso", "Tarifas"],
    eyebrow: "Premium",
    headline: "Marca, portfolio y captación en una web",
    subline: "Diseño más trabajado con páginas y bloques listos para escalar.",
    cta: "Ver proyecto",
    secondary: "Servicios",
    cards: ["Branding", "Web", "SEO"],
    stat: "Multipágina",
    layout: "portfolio",
    tone: purpleTone,
  },
  legal: {
    brand: "Conde Legal",
    domain: "despacho-laboral.sitea.ai",
    nav: ["Áreas", "Casos", "Consulta"],
    eyebrow: "Despacho",
    headline: "Asesoría laboral con respuesta clara",
    subline: "Presentación sobria, servicios jurídicos y contacto directo.",
    cta: "Consulta inicial",
    secondary: "Áreas legales",
    cards: ["Despidos", "Contratos", "Empresas"],
    stat: "Confianza",
    layout: "editorial",
    tone: slatePurpleTone,
  },
  service: {
    brand: "Voltix",
    domain: "electricista-urgente.sitea.ai",
    nav: ["Servicios", "Zonas", "Llamar"],
    eyebrow: "Servicio local",
    headline: "Electricista rápido para hogares y negocios",
    subline: "Botón de llamada, zonas de trabajo y servicios urgentes.",
    cta: "Llamar ahora",
    secondary: "Ver servicios",
    cards: ["Urgencias", "Cuadros", "Iluminación"],
    stat: "24/7",
    layout: "service",
    tone: slatePurpleTone,
  },
  booking: {
    brand: "Glow Beauty",
    domain: "centro-estetica.sitea.ai",
    nav: ["Tratamientos", "Bonos", "Reserva"],
    eyebrow: "Reservas",
    headline: "Tratamientos, precios y reservas en una web",
    subline: "Diseño visual con cartas de servicio y llamada a reservar.",
    cta: "Reservar cita",
    secondary: "Ver bonos",
    cards: ["Facial", "Láser", "Masaje"],
    stat: "Reservas",
    layout: "booking",
    tone: rosePurpleTone,
  },
  corporate: {
    brand: "Fiscalia Pro",
    domain: "asesoria-fiscal.sitea.ai",
    nav: ["Servicios", "Clientes", "Contacto"],
    eyebrow: "Corporativa",
    headline: "Asesoría fiscal para autónomos y pymes",
    subline: "Bloques de confianza, servicios claros y captación de leads.",
    cta: "Solicitar estudio",
    secondary: "Ver servicios",
    cards: ["Fiscal", "Laboral", "Contable"],
    stat: "+120 clientes",
    layout: "corporate",
    tone: slatePurpleTone,
  },
  personal: {
    brand: "Fit Sergio",
    domain: "entrenador-personal.sitea.ai",
    nav: ["Planes", "Resultados", "Contacto"],
    eyebrow: "Marca personal",
    headline: "Entrenamientos online y presenciales",
    subline: "Una web para explicar planes, enseñar resultados y cerrar clientes.",
    cta: "Empezar plan",
    secondary: "Ver resultados",
    cards: ["Online", "Presencial", "Nutrición"],
    stat: "Planes",
    layout: "portfolio",
    tone: purpleTone,
  },
  restaurant: {
    brand: "Mesa 14",
    domain: "restaurante-barrio.sitea.ai",
    nav: ["Carta", "Horario", "Reserva"],
    eyebrow: "Restaurante",
    headline: "Carta, ubicación y reservas en segundos",
    subline: "Una web sencilla para mostrar platos, horario y contacto.",
    cta: "Reservar mesa",
    secondary: "Ver carta",
    cards: ["Menú", "Tapas", "Postres"],
    stat: "Carta online",
    layout: "menu",
    tone: rosePurpleTone,
  },
};

function MiniBrowserDots() {
  return (
    <div className="flex items-center gap-1.5">
      <span className="h-2 w-2 rounded-full bg-red-300" />
      <span className="h-2 w-2 rounded-full bg-amber-300" />
      <span className="h-2 w-2 rounded-full bg-emerald-300" />
    </div>
  );
}

function MockPhoto({ tone, layout }: { tone: PreviewTone; layout: PreviewContent["layout"] }) {
  return (
    <div
      className={`relative min-h-[88px] overflow-hidden rounded-2xl ${tone.image} ${tone.shadow}`}
    >
      <div
        className={`absolute -right-7 -top-7 h-20 w-20 rounded-full ${tone.imageGlow} blur-xl`}
      />
      <div className="absolute inset-x-3 top-3 flex items-center justify-between">
        <span className="h-2 w-10 rounded-full bg-white/72" />
        <span className="h-5 w-5 rounded-full bg-white/50 ring-1 ring-white/40" />
      </div>

      {layout === "menu" ? (
        <div className="absolute bottom-3 left-3 right-3 grid grid-cols-3 gap-1.5">
          {[1, 2, 3].map((item) => (
            <span
              key={item}
              className="h-9 rounded-xl bg-white/26 ring-1 ring-white/28 backdrop-blur"
            />
          ))}
        </div>
      ) : layout === "corporate" ? (
        <div className="absolute bottom-3 left-3 right-3 grid grid-cols-2 gap-1.5">
          <span className="h-8 rounded-xl bg-white/30 ring-1 ring-white/30" />
          <span className="h-8 rounded-xl bg-white/18 ring-1 ring-white/22" />
        </div>
      ) : layout === "editorial" ? (
        <div className="absolute bottom-3 left-3 right-3 rounded-xl bg-white/24 p-2 ring-1 ring-white/28 backdrop-blur">
          <span className="block h-1.5 w-2/3 rounded-full bg-white/75" />
          <span className="mt-1.5 block h-1.5 w-1/2 rounded-full bg-white/45" />
        </div>
      ) : (
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
          <div className="space-y-1.5">
            <span className="block h-2 w-16 rounded-full bg-white/80" />
            <span className="block h-2 w-10 rounded-full bg-white/50" />
          </div>
          <span className="h-9 w-9 rounded-2xl bg-white/32 ring-1 ring-white/32 backdrop-blur" />
        </div>
      )}
    </div>
  );
}

function MockSections({ content, compact }: { content: PreviewContent; compact: boolean }) {
  const { tone, layout, cards } = content;

  if (layout === "booking") {
    return (
      <div className="grid gap-2 p-3 md:grid-cols-3">
        {cards.map((card, index) => (
          <div
            key={card}
            className="rounded-2xl border border-[oklch(0.24_0.03_262/0.08)] bg-white/86 p-2.5 shadow-sm"
          >
            <span
              className={`block h-8 rounded-xl ${index === 1 ? tone.accent : tone.accentSoft}`}
            />
            <span className="mt-2 block h-1.5 w-16 rounded-full bg-foreground/70" />
            <span className="mt-1.5 block h-1.5 w-10 rounded-full bg-muted" />
          </div>
        ))}
        {!compact ? (
          <div className="col-span-full grid grid-cols-[1fr_auto] gap-2 rounded-2xl border border-[oklch(0.24_0.03_262/0.08)] bg-white/72 p-2.5">
            <span className="h-8 rounded-xl bg-muted/80" />
            <span className={`h-8 w-20 rounded-xl ${tone.accent}`} />
          </div>
        ) : null}
      </div>
    );
  }

  if (layout === "menu") {
    return (
      <div className="grid gap-2 p-3 md:grid-cols-3">
        {cards.map((card, index) => (
          <div
            key={card}
            className="rounded-2xl border border-[oklch(0.24_0.03_262/0.08)] bg-white/86 p-2.5 shadow-sm"
          >
            <div className={`h-7 rounded-xl ${index === 0 ? tone.accent : tone.accentSoft}`} />
            <div className="mt-2 flex items-center justify-between gap-2">
              <span className="h-1.5 w-10 rounded-full bg-foreground/65" />
              <span className="h-1.5 w-4 rounded-full bg-foreground/35" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (layout === "corporate") {
    return (
      <div className="grid gap-2 p-3 md:grid-cols-3">
        <div className="rounded-2xl border border-[oklch(0.24_0.03_262/0.08)] bg-white/86 p-2.5 shadow-sm md:col-span-2">
          <span className="block h-2 w-20 rounded-full bg-foreground/70" />
          <span className="mt-2 block h-1.5 w-full rounded-full bg-muted" />
          <span className="mt-1.5 block h-1.5 w-2/3 rounded-full bg-muted" />
          <div className="mt-2 grid grid-cols-3 gap-1.5">
            {[1, 2, 3].map((item) => (
              <span
                key={item}
                className={`h-7 rounded-xl ${item === 1 ? tone.accent : tone.accentSoft}`}
              />
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-[oklch(0.24_0.03_262/0.08)] bg-white/86 p-2.5 shadow-sm">
          <span className={`block h-8 rounded-xl ${tone.accent}`} />
          <span className="mt-2 block h-1.5 rounded-full bg-muted" />
          <span className="mt-1 block h-1.5 w-1/2 rounded-full bg-muted" />
        </div>
      </div>
    );
  }

  if (layout === "editorial") {
    return (
      <div className="grid gap-2 p-3 md:grid-cols-[0.85fr_1.15fr]">
        <div className={`rounded-2xl ${tone.accentSoft} p-2.5`}>
          <span className={`block h-16 rounded-xl ${tone.accent}`} />
        </div>
        <div className="rounded-2xl border border-[oklch(0.24_0.03_262/0.08)] bg-white/86 p-3 shadow-sm">
          <span className="block h-2 w-24 rounded-full bg-foreground/75" />
          <span className="mt-2 block h-1.5 w-full rounded-full bg-muted" />
          <span className="mt-1.5 block h-1.5 w-5/6 rounded-full bg-muted" />
          <span className="mt-1.5 block h-1.5 w-2/3 rounded-full bg-muted" />
          <div className="mt-3 flex gap-1.5">
            <span className={`h-6 w-16 rounded-xl ${tone.accent}`} />
            <span className="h-6 w-12 rounded-xl border border-border/60 bg-white" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-2 p-3 md:grid-cols-3">
      {cards.map((card, index) => (
        <div
          key={card}
          className="rounded-2xl border border-[oklch(0.24_0.03_262/0.08)] bg-white/86 p-2.5 shadow-sm"
        >
          <span className={`block h-8 rounded-xl ${index === 0 ? tone.accent : tone.accentSoft}`} />
          <span className="mt-2 block h-1.5 w-14 rounded-full bg-foreground/68" />
          {!compact ? <span className="mt-1.5 block h-1.5 w-10 rounded-full bg-muted" /> : null}
        </div>
      ))}
    </div>
  );
}

export function WebsiteMiniPreview({
  variant = "simple",
  title,
  badge = "Vista previa",
  compact = false,
}: WebsiteMiniPreviewProps) {
  const content = previewContent[variant];
  const { tone } = content;

  return (
    <div className={`relative overflow-hidden rounded-[26px] p-3 ${tone.browser} ${tone.shadow}`}>
      <div className="absolute -right-14 -top-14 h-36 w-36 rounded-full bg-white/24 blur-2xl" />
      <div className="absolute -bottom-16 left-8 h-32 w-32 rounded-full bg-white/16 blur-2xl" />

      <div
        className={`relative overflow-hidden rounded-[22px] border border-white/65 ${tone.page} shadow-[inset_0_1px_0_rgba(255,255,255,.82)] backdrop-blur`}
      >
        <div className="flex items-center gap-2 border-b border-[oklch(0.24_0.03_262/0.08)] bg-white/70 px-3 py-2.5 backdrop-blur-sm">
          <MiniBrowserDots />
          <span className="ml-2 truncate text-[0.58rem] font-semibold text-foreground/55">
            preview · {content.domain}
          </span>
        </div>

        <div className="px-4 py-3">
          <div className="flex items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-2">
              <span
                className={`grid h-7 w-7 shrink-0 place-items-center rounded-xl ${tone.accent} text-[0.58rem] font-black text-white shadow-sm`}
              >
                {content.brand.slice(0, 1)}
              </span>
              <span className="truncate text-[0.68rem] font-black tracking-tight text-foreground/86">
                {content.brand}
              </span>
            </div>

            <div className="hidden items-center gap-2 md:flex">
              {content.nav.map((item) => (
                <span key={item} className="text-[0.54rem] font-semibold text-foreground/45">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div
          className={`mx-3 overflow-hidden rounded-[22px] border border-white/70 ${tone.hero} p-3 shadow-sm`}
        >
          <div className="grid gap-3 md:grid-cols-[1.05fr_.95fr]">
            <div className="min-w-0 py-1">
              <Badge
                variant="outline"
                className={`h-5 max-w-full truncate px-2 text-[0.55rem] font-bold ${tone.chip}`}
              >
                {badge || content.eyebrow}
              </Badge>

              <p className="sr-only">Previsualización de ejemplo: {title}</p>

              <h3 className="mt-2 line-clamp-2 text-[0.9rem] font-black leading-[1.05] tracking-tight text-[oklch(0.22_0.04_286)]">
                {content.headline}
              </h3>
              <p className="mt-1.5 line-clamp-2 text-[0.62rem] leading-4 text-foreground/58">
                {content.subline}
              </p>

              <div className="mt-3 flex flex-wrap items-center gap-1.5">
                <span
                  className={`inline-flex h-7 items-center rounded-xl px-2.5 text-[0.56rem] font-black text-white ${tone.accent}`}
                >
                  {content.cta}
                </span>
                {!compact ? (
                  <span className="inline-flex h-7 items-center rounded-xl border border-[oklch(0.24_0.03_262/0.1)] bg-white/80 px-2.5 text-[0.56rem] font-bold text-foreground/65">
                    {content.secondary}
                  </span>
                ) : null}
              </div>
            </div>

            <MockPhoto tone={tone} layout={content.layout} />
          </div>
        </div>

        <MockSections content={content} compact={compact} />

        <div className="flex items-center justify-between border-t border-[oklch(0.24_0.03_262/0.07)] bg-white/62 px-4 py-2.5">
          <div className="flex items-center gap-1.5">
            <span className={`h-2 w-2 rounded-full ${tone.accent}`} />
            <span className="text-[0.56rem] font-bold text-foreground/54">Simulación realista</span>
          </div>
          <span className="text-[0.56rem] font-black text-[oklch(0.52_0.23_292)]">
            {content.stat}
          </span>
        </div>
      </div>
    </div>
  );
}
