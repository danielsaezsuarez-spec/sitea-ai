import type { Plan, PublishPlan } from "./auth-store";

export type PlanPreviewVariant = "simple" | "business" | "premium";

export const CREATE_PLANS: Record<
  Plan,
  {
    name: Plan;
    price: string;
    credits: number;
    label: string;
    description: string;
    creditSummary: string;
    useCase: string;
    previewVariant: PlanPreviewVariant;
    previewTitle: string;
    previewBadge: string;
    popular?: boolean;
    features: string[];
  }
> = {
  Base: {
    name: "Base",
    price: "9",
    credits: 50,
    label: "Pack Base",
    description: "Para empezar con una web simple, clara y rápida de lanzar.",
    creditSummary: "50 créditos para crear una primera web simple",
    useCase: "Ideal para landings, páginas de contacto o webs de una sola página.",
    previewVariant: "simple",
    previewTitle: "Web simple de servicios",
    previewBadge: "Web simple",
    features: [
      "50 créditos incluidos",
      "Pensado para 1 web simple de una página",
      "Generación inicial y pequeños refinamientos",
      "Exportación HTML",
    ],
  },
  Pro: {
    name: "Pro",
    price: "29",
    credits: 300,
    label: "Pack Pro",
    description: "Para crear una web más completa y refinarla con más margen.",
    creditSummary: "300 créditos para una web profesional con más ajustes",
    useCase: "Ideal para negocios locales, freelancers y servicios con varias secciones.",
    previewVariant: "business",
    previewTitle: "Web profesional para negocio",
    previewBadge: "Negocio local",
    popular: true,
    features: [
      "300 créditos incluidos",
      "Web con más secciones y más pruebas de diseño",
      "Exportación HTML y ZIP",
      "Más refinamientos por proyecto",
    ],
  },
  Premium: {
    name: "Premium",
    price: "79",
    credits: 1000,
    label: "Pack Premium",
    description: "Para crear varios proyectos o trabajar con una web más exigente.",
    creditSummary: "1000 créditos para varios proyectos o uso intensivo",
    useCase: "Ideal para agencias pequeñas, pruebas avanzadas o varios clientes.",
    previewVariant: "premium",
    previewTitle: "Web premium multipágina",
    previewBadge: "Uso avanzado",
    features: [
      "1000 créditos incluidos",
      "Mayor capacidad de generación y refinamiento",
      "Exportación HTML y ZIP",
      "Pensado para varios proyectos o una web más trabajada",
    ],
  },
};

export const PUBLISH_PLANS: Record<
  Exclude<PublishPlan, "none">,
  {
    key: Exclude<PublishPlan, "none">;
    name: string;
    price: string;
    description: string;
    features: string[];
  }
> = {
  publica: {
    key: "publica",
    name: "Publica",
    price: "6,90",
    description: "Publica tu web en un subdominio de Sitea con hosting y SSL incluidos.",
    features: [
      "Publicación en subdominio Sitea",
      "Hosting y SSL incluidos",
      "Actualizar cambios desde el panel",
      "1 web publicada en la fase inicial",
    ],
  },
  publica_plus: {
    key: "publica_plus",
    name: "Publica Plus",
    price: "11,90",
    description: "Publica tu web y prepara la conexión de dominio propio.",
    features: [
      "Todo lo de Publica",
      "Conectar dominio propio",
      "Estado de dominio preparado para validación DNS",
      "Editor básico de mantenimiento preparado",
    ],
  },
};

export function getPlanCredits(plan: Plan) {
  return CREATE_PLANS[plan].credits;
}

export function getPublishPlanLabel(plan: PublishPlan) {
  if (plan === "none") return "Sin publicación";
  return PUBLISH_PLANS[plan].name;
}
