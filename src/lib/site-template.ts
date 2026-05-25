export interface SiteContent {
  businessName: string;
  heroTitle: string;
  heroSubtitle: string;
  primaryCta: string;
  secondaryCta: string;
  sectionOneTitle: string;
  sectionOneText: string;
  sectionTwoTitle: string;
  sectionTwoText: string;
  contactEmail: string;
  contactPhone: string;
  primaryColor: string;
  backgroundColor: string;
}

export const DEFAULT_SITE_CONTENT: SiteContent = {
  businessName: "Tu negocio",
  heroTitle: "Aquí verás tu primera versión",
  heroSubtitle: "Escribe un prompt para generar una web simple y previsualizarla al instante",
  primaryCta: "Reservar ahora",
  secondaryCta: "Saber más",
  sectionOneTitle: "Servicios principales",
  sectionOneText:
    "Presenta tus servicios de forma clara, profesional y orientada a captar clientes.",
  sectionTwoTitle: "Por qué elegirnos",
  sectionTwoText:
    "Una propuesta sencilla, directa y pensada para generar confianza desde la primera visita.",
  contactEmail: "contacto@tunegocio.com",
  contactPhone: "+34 600 000 000",
  primaryColor: "#172033",
  backgroundColor: "#f8fafc",
};

export function slugify(value: string) {
  return (
    value
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "") || "mi-web"
  );
}

export function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function withDefaults(content?: Partial<SiteContent>): SiteContent {
  return { ...DEFAULT_SITE_CONTENT, ...content };
}

export function inferSiteContentFromPrompt(
  prompt: string,
  previous?: Partial<SiteContent>,
): SiteContent {
  const t = prompt.toLowerCase();
  const base = withDefaults(previous);

  if (t.includes("yoga")) {
    return {
      ...base,
      businessName: "Estudio Aurora",
      heroTitle: "Estudio Aurora",
      heroSubtitle: "Clases de yoga para todos los niveles en un espacio tranquilo y cercano.",
      primaryCta: "Reservar clase",
      secondaryCta: "Ver horarios",
      sectionOneTitle: "Clases flexibles",
      sectionOneText:
        "Sesiones de iniciación, vinyasa y relajación para adaptar la práctica a cada persona.",
      sectionTwoTitle: "Bienestar real",
      sectionTwoText:
        "Cuidamos la respiración, la movilidad y el equilibrio con una experiencia profesional y humana.",
      primaryColor: "#5b4b8a",
      backgroundColor: "#faf7f2",
    };
  }

  if (t.includes("fontaner")) {
    return {
      ...base,
      businessName: "Fontanería Express",
      heroTitle: "Fontanería Express",
      heroSubtitle: "Reparaciones, instalaciones y urgencias con respuesta rápida en tu zona.",
      primaryCta: "Llamar ahora",
      secondaryCta: "Ver servicios",
      sectionOneTitle: "Urgencias e instalaciones",
      sectionOneText:
        "Atendemos averías, fugas, cambios de grifería, termos y trabajos de mantenimiento.",
      sectionTwoTitle: "Servicio cercano",
      sectionTwoText:
        "Presupuesto claro, puntualidad y atención profesional para particulares y negocios.",
      primaryColor: "#0f4c81",
      backgroundColor: "#f5f9ff",
    };
  }

  if (t.includes("peluq")) {
    return {
      ...base,
      businessName: "Studio Hair",
      heroTitle: "Studio Hair",
      heroSubtitle: "Peluquería actual con cortes, color y tratamientos adaptados a tu estilo.",
      primaryCta: "Reservar cita",
      secondaryCta: "Ver tratamientos",
      sectionOneTitle: "Corte, color y cuidado",
      sectionOneText: "Trabajamos cada servicio con diagnóstico previo y productos profesionales.",
      sectionTwoTitle: "Una experiencia cuidada",
      sectionTwoText:
        "Un espacio moderno, cercano y pensado para que salgas con una imagen que encaje contigo.",
      primaryColor: "#7a2d52",
      backgroundColor: "#fff7fb",
    };
  }

  if (t.includes("consult")) {
    return {
      ...base,
      businessName: "Lúmen Consulting",
      heroTitle: "Lúmen Consulting",
      heroSubtitle:
        "Estrategia y acompañamiento para que pequeños negocios tomen mejores decisiones.",
      primaryCta: "Pedir diagnóstico",
      secondaryCta: "Ver metodología",
      sectionOneTitle: "Consultoría práctica",
      sectionOneText:
        "Analizamos tu situación, ordenamos prioridades y definimos un plan de acción realista.",
      sectionTwoTitle: "Decisiones con datos",
      sectionTwoText:
        "Convertimos información dispersa en una hoja de ruta clara para crecer con menos incertidumbre.",
      primaryColor: "#1f2a44",
      backgroundColor: "#f7f8fb",
    };
  }

  if (t.includes("abogada") || t.includes("abogado") || t.includes("legal")) {
    return {
      ...base,
      businessName: "Despacho Legal Martínez",
      heroTitle: "Despacho Legal Martínez",
      heroSubtitle:
        "Asesoramiento jurídico claro, cercano y profesional para particulares y empresas.",
      primaryCta: "Solicitar consulta",
      secondaryCta: "Ver áreas legales",
      sectionOneTitle: "Áreas de especialidad",
      sectionOneText:
        "Derecho laboral, civil y mercantil con un enfoque práctico y orientado a soluciones.",
      sectionTwoTitle: "Atención personalizada",
      sectionTwoText:
        "Estudiamos cada caso con rigor y explicamos los pasos de forma sencilla y transparente.",
      primaryColor: "#1f2937",
      backgroundColor: "#f8fafc",
    };
  }

  if (t.includes("electricista") || t.includes("electricidad")) {
    return {
      ...base,
      businessName: "Electricidad 24H",
      heroTitle: "Electricidad 24H",
      heroSubtitle: "Instalaciones, averías y mantenimiento eléctrico para hogares y negocios.",
      primaryCta: "Pedir presupuesto",
      secondaryCta: "Ver servicios",
      sectionOneTitle: "Servicios eléctricos",
      sectionOneText:
        "Averías, cuadros eléctricos, iluminación, boletines e instalaciones completas.",
      sectionTwoTitle: "Respuesta rápida",
      sectionTwoText:
        "Trabajamos con seguridad, claridad en el presupuesto y disponibilidad flexible.",
      primaryColor: "#f59e0b",
      backgroundColor: "#fffaf0",
    };
  }

  if (t.includes("estética") || t.includes("estetica")) {
    return {
      ...base,
      businessName: "Centro Belleza Aura",
      heroTitle: "Centro Belleza Aura",
      heroSubtitle:
        "Tratamientos faciales y corporales para cuidar tu piel con resultados visibles.",
      primaryCta: "Reservar tratamiento",
      secondaryCta: "Ver servicios",
      sectionOneTitle: "Tratamientos destacados",
      sectionOneText:
        "Limpiezas faciales, aparatología, depilación y rituales corporales personalizados.",
      sectionTwoTitle: "Belleza con confianza",
      sectionTwoText:
        "Te asesoramos antes de cada tratamiento para elegir la opción más adecuada para ti.",
      primaryColor: "#c0266f",
      backgroundColor: "#fff7fb",
    };
  }

  if (t.includes("asesoría") || t.includes("asesoria") || t.includes("fiscal")) {
    return {
      ...base,
      businessName: "Asesoría Nova",
      heroTitle: "Asesoría Nova",
      heroSubtitle:
        "Soluciones fiscales, contables y laborales para autónomos y pequeñas empresas.",
      primaryCta: "Pedir asesoramiento",
      secondaryCta: "Ver servicios",
      sectionOneTitle: "Gestión integral",
      sectionOneText:
        "Llevamos impuestos, contabilidad, nóminas y trámites con una comunicación sencilla.",
      sectionTwoTitle: "Acompañamiento cercano",
      sectionTwoText: "Te ayudamos a entender tus obligaciones y a tomar decisiones con seguridad.",
      primaryColor: "#0f3d5e",
      backgroundColor: "#f5fbff",
    };
  }

  return {
    ...base,
    businessName:
      base.businessName === DEFAULT_SITE_CONTENT.businessName ? "Tu nueva web" : base.businessName,
    heroTitle: base.heroTitle === DEFAULT_SITE_CONTENT.heroTitle ? "Tu nueva web" : base.heroTitle,
    heroSubtitle:
      base.heroSubtitle === DEFAULT_SITE_CONTENT.heroSubtitle
        ? "Generada con IA en segundos y lista para ajustar desde el panel."
        : base.heroSubtitle,
  };
}

export function buildGeneratedHtml(content: Partial<SiteContent>) {
  const c = withDefaults(content);
  const title = escapeHtml(c.heroTitle || c.businessName);
  const description = escapeHtml(c.heroSubtitle);
  const business = escapeHtml(c.businessName);
  const primary = escapeHtml(c.primaryColor || DEFAULT_SITE_CONTENT.primaryColor);
  const bg = escapeHtml(c.backgroundColor || DEFAULT_SITE_CONTENT.backgroundColor);

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="${description}" />
  <title>${title}</title>
  <style>
    :root { --primary: ${primary}; --bg: ${bg}; --text: #111827; --muted: #6b7280; --card: #ffffff; --border: #e5e7eb; }
    * { box-sizing: border-box; }
    body { margin: 0; font-family: Inter, Arial, sans-serif; background: linear-gradient(180deg, var(--bg), #eef2f7); color: var(--text); }
    .container { max-width: 1120px; margin: 0 auto; padding: 0 24px; }
    header { padding: 22px 0; border-bottom: 1px solid var(--border); background: rgba(255,255,255,.78); backdrop-filter: blur(14px); position: sticky; top: 0; z-index: 10; }
    nav { display: flex; align-items: center; justify-content: space-between; gap: 20px; }
    .brand { font-weight: 800; letter-spacing: -.02em; }
    .nav-links { display: flex; gap: 18px; font-size: 14px; color: var(--muted); }
    .hero { padding: 96px 0 72px; text-align: center; }
    .badge { display: inline-block; padding: 8px 14px; border: 1px solid var(--border); border-radius: 999px; background: rgba(255,255,255,.82); font-size: 12px; color: var(--primary); }
    h1 { max-width: 860px; margin: 22px auto 14px; font-size: clamp(40px, 7vw, 72px); line-height: 1.02; letter-spacing: -.05em; }
    .subtitle { max-width: 700px; margin: 0 auto; color: var(--muted); font-size: 19px; line-height: 1.7; }
    .actions { display: flex; justify-content: center; flex-wrap: wrap; gap: 12px; margin-top: 32px; }
    .btn { display: inline-flex; align-items: center; justify-content: center; min-height: 46px; padding: 12px 18px; border-radius: 999px; text-decoration: none; font-weight: 700; }
    .btn-primary { background: var(--primary); color: #fff; box-shadow: 0 18px 42px rgba(17,24,39,.18); }
    .btn-secondary { color: var(--primary); background: #fff; border: 1px solid var(--border); }
    .grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 18px; padding: 32px 0 82px; }
    .card { border: 1px solid var(--border); background: rgba(255,255,255,.86); border-radius: 28px; padding: 28px; box-shadow: 0 18px 50px -34px rgba(17,24,39,.35); }
    .card h2 { margin: 0 0 10px; font-size: 24px; letter-spacing: -.03em; }
    .card p { margin: 0; color: var(--muted); line-height: 1.7; }
    .contact { margin: 0 0 80px; border-radius: 32px; background: var(--primary); color: #fff; padding: 40px; display: grid; gap: 14px; }
    .contact p { margin: 0; opacity: .88; }
    footer { border-top: 1px solid var(--border); padding: 28px 0; color: var(--muted); font-size: 14px; }
    @media (max-width: 760px) { .nav-links { display: none; } .grid { grid-template-columns: 1fr; } .hero { padding-top: 72px; } }
  </style>
</head>
<body>
  <header>
    <div class="container">
      <nav>
        <div class="brand">${business}</div>
        <div class="nav-links"><a href="#servicios">Servicios</a><a href="#contacto">Contacto</a></div>
      </nav>
    </div>
  </header>
  <main>
    <section class="hero">
      <div class="container">
        <span class="badge">Web generada con IA</span>
        <h1>${escapeHtml(c.heroTitle)}</h1>
        <p class="subtitle">${description}</p>
        <div class="actions">
          <a class="btn btn-primary" href="#contacto">${escapeHtml(c.primaryCta)}</a>
          <a class="btn btn-secondary" href="#servicios">${escapeHtml(c.secondaryCta)}</a>
        </div>
      </div>
    </section>
    <section id="servicios" class="container grid">
      <article class="card"><h2>${escapeHtml(c.sectionOneTitle)}</h2><p>${escapeHtml(c.sectionOneText)}</p></article>
      <article class="card"><h2>${escapeHtml(c.sectionTwoTitle)}</h2><p>${escapeHtml(c.sectionTwoText)}</p></article>
    </section>
    <section id="contacto" class="container">
      <div class="contact">
        <h2>¿Hablamos?</h2>
        <p>Email: ${escapeHtml(c.contactEmail)}</p>
        <p>Teléfono: ${escapeHtml(c.contactPhone)}</p>
      </div>
    </section>
  </main>
  <footer><div class="container">© ${new Date().getFullYear()} ${business}. Web creada con Sitea.ai.</div></footer>
</body>
</html>`;
}
