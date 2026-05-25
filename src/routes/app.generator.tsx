import { createFileRoute, useLocation } from "@tanstack/react-router";
import { useState, useRef, useEffect, useMemo } from "react";
import { useAuth, authStore, type DomainStatus } from "@/lib/auth-store";
import { generateWebsiteDraft } from "@/lib/ai-service";
import {
  DEFAULT_SITE_CONTENT,
  buildGeneratedHtml,
  inferSiteContentFromPrompt,
  slugify,
  type SiteContent,
} from "@/lib/site-template";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import JSZip from "jszip";
import { getErrorMessage } from "@/lib/utils";
import {
  Sparkles,
  Download,
  FileCode,
  FileArchive,
  Eye,
  Wand2,
  RotateCw,
  Smartphone,
  Tablet,
  Monitor,
  ArrowUp,
  Check,
  Loader2,
  Rocket,
  Globe,
  RefreshCcw,
  Link2,
  Copy,
  X,
  AlertTriangle,
  Clock3,
  CheckCircle2,
} from "lucide-react";

export const Route = createFileRoute("/app/generator")({
  head: () => ({ meta: [{ title: "Generador — Sitea.ai" }] }),
  component: GeneratorPage,
});

type Msg = { role: "user" | "ai"; content: string; cost?: number };

const examplePrompts = [
  "Crea una página simple para una abogada con servicios, presentación y formulario de contacto",
  "Haz una web para un electricista local con servicios, zonas de trabajo y botón de llamada",
  "Quiero una landing para un centro de estética con tratamientos, testimonios y reserva simple",
  "Crea una página profesional para una asesoría fiscal con secciones claras y llamada a la acción",
];

function GeneratorPage() {
  const { user, projects } = useAuth();
  const location = useLocation();

  const [prompt, setPrompt] = useState("");
  const [device, setDevice] = useState<"mobile" | "tablet" | "desktop">("desktop");
  const [generating, setGenerating] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [hasResult, setHasResult] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [siteContent, setSiteContent] = useState<SiteContent>(DEFAULT_SITE_CONTENT);
  const [previewTitle, setPreviewTitle] = useState(DEFAULT_SITE_CONTENT.heroTitle);
  const [previewSubtitle, setPreviewSubtitle] = useState(DEFAULT_SITE_CONTENT.heroSubtitle);
  const [currentProjectId, setCurrentProjectId] = useState<string | null>(null);
  const [domainInput, setDomainInput] = useState("");

  const scrollRef = useRef<HTMLDivElement>(null);

  const currentProject = useMemo(
    () => projects.find((p) => p.id === currentProjectId) || null,
    [projects, currentProjectId],
  );

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, generating]);

  useEffect(() => {
    const rawSearch = location.search ?? "";
    let projectId: string | null = null;

    if (typeof rawSearch === "string") {
      const params = new URLSearchParams(
        rawSearch.startsWith("?") ? rawSearch.slice(1) : rawSearch,
      );
      projectId = params.get("projectId");
    } else if (typeof rawSearch === "object" && rawSearch !== null) {
      const maybeProjectId = (rawSearch as { projectId?: unknown }).projectId;
      projectId = typeof maybeProjectId === "string" ? maybeProjectId : null;
    }
    if (!projectId) return;

    const existing = projects.find((p) => p.id === projectId);
    if (!existing) return;

    setCurrentProjectId(existing.id);
    setHasResult(true);
    setPrompt(existing.prompt);
    const loadedContent = existing.siteData ?? inferSiteContentFromPrompt(existing.prompt);
    setSiteContent(loadedContent);
    setPreviewTitle(loadedContent.heroTitle || existing.name || "Proyecto guardado");
    setPreviewSubtitle(
      loadedContent.heroSubtitle || existing.prompt || "Proyecto cargado desde tu cuenta",
    );
    setDomainInput(existing.customDomain || "");

    setMessages([
      { role: "user", content: existing.prompt },
      {
        role: "ai",
        content: "He cargado este proyecto guardado. Puedes seguir refinándolo desde aquí.",
      },
    ]);
  }, [location.search, projects]);

  if (!user) return null;

  const getProjectNameFromPrompt = (text: string) => {
    const t = text.toLowerCase();

    if (t.includes("abogada")) return "Web abogada";
    if (t.includes("electricista")) return "Web electricista";
    if (t.includes("estética") || t.includes("estetica")) return "Landing centro de estética";
    if (t.includes("asesoría") || t.includes("asesoria")) return "Web asesoría";
    if (t.includes("yoga")) return "Landing estudio yoga";
    if (t.includes("peluquer")) return "Web peluquería";
    if (t.includes("consult")) return "Web consultoría";

    return "Nuevo proyecto";
  };

  const applyMockPreview = (text: string) => {
    const nextContent = inferSiteContentFromPrompt(text, siteContent);
    setSiteContent(nextContent);
    setPreviewTitle(nextContent.heroTitle);
    setPreviewSubtitle(nextContent.heroSubtitle);
  };

  const updateSiteContent = (values: Partial<SiteContent>) => {
    setSiteContent((current) => {
      const next = { ...current, ...values };
      setPreviewTitle(next.heroTitle);
      setPreviewSubtitle(next.heroSubtitle);
      return next;
    });
  };

  const downloadTextFile = (filename: string, content: string, mimeType: string) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const downloadBlobFile = (filename: string, blob: Blob) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const getSafeFileBaseName = () => slugify(siteContent.businessName || previewTitle || "mi-web");

  const getPublishedSubdomain = () => {
    return `${getSafeFileBaseName()}.sitea.ai`;
  };

  const getDisplayDomain = () => {
    if (currentProject?.customDomain) return currentProject.customDomain;
    if (currentProject?.publishedUrl) return currentProject.publishedUrl.replace("https://", "");
    return "preview.sitea.ai";
  };

  const normalizeDomain = (value: string) => {
    return value
      .trim()
      .toLowerCase()
      .replace(/^https?:\/\//, "")
      .replace(/^www\./, "")
      .replace(/\/.*$/, "");
  };

  const isValidDomain = (value: string) => {
    const domain = normalizeDomain(value);
    return /^[a-z0-9-]+(\.[a-z0-9-]+)+$/i.test(domain);
  };

  const getDnsTarget = () => `${getPublishedSubdomain()}`;

  const getDomainStatus = (): DomainStatus | "none" => {
    if (!currentProject?.customDomain) return "none";
    return currentProject.domainStatus ?? "pending";
  };

  const domainStatus = getDomainStatus();

  const getDomainStatusBadge = () => {
    if (domainStatus === "none") {
      return {
        text: "Sin conectar",
        className: "",
        variant: "secondary" as const,
      };
    }

    if (domainStatus === "pending") {
      return {
        text: "Pendiente verificación",
        className: "border border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-50",
        variant: "outline" as const,
      };
    }

    if (domainStatus === "connected") {
      return {
        text: "Conectado",
        className: "border border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-50",
        variant: "outline" as const,
      };
    }

    return {
      text: "Error DNS",
      className: "border border-red-200 bg-red-50 text-red-700 hover:bg-red-50",
      variant: "outline" as const,
    };
  };

  const domainStatusBadge = getDomainStatusBadge();

  const buildHtmlExport = (content: SiteContent = siteContent) => {
    return buildGeneratedHtml(content);
  };

  const handleGenerate = async (text: string) => {
    if (!text.trim() || generating) return;

    if (user.credits < 1) {
      toast.error("No tienes créditos suficientes", {
        description: "Mejora tu pack para seguir generando.",
      });
      return;
    }

    const isFirst = messages.length === 0;
    const cost = 1;
    const userPrompt = text.trim();

    setMessages((m) => [...m, { role: "user", content: userPrompt }]);
    setPrompt("");
    setGenerating(true);

    try {
      const generated = await generateWebsiteDraft(userPrompt, siteContent);
      const nextContent = generated.content;
      const htmlContent = buildHtmlExport(nextContent);
      const projectName = nextContent.businessName || getProjectNameFromPrompt(userPrompt);

      setSiteContent(nextContent);
      setPreviewTitle(nextContent.heroTitle);
      setPreviewSubtitle(nextContent.heroSubtitle);

      if (isFirst && !currentProjectId) {
        const createdProject = await authStore.addProject({
          name: projectName,
          prompt: userPrompt,
          status: "borrador",
          isPublished: false,
          htmlContent,
          siteData: nextContent,
        });

        if (createdProject?.id) {
          setCurrentProjectId(createdProject.id);
        }
      } else if (currentProjectId) {
        await authStore.updateProject(currentProjectId, {
          prompt: [
            ...messages.filter((m) => m.role === "user").map((m) => m.content),
            userPrompt,
          ].join(" | "),
          name: projectName,
          status: currentProject?.isPublished ? "publicado" : "borrador",
          htmlContent,
          siteData: nextContent,
          customDomain: currentProject?.customDomain,
          domainStatus: currentProject?.domainStatus,
          publishedUrl: currentProject?.publishedUrl,
        });
      }

      await authStore.consumeCredits(cost);

      setMessages((m) => [
        ...m,
        {
          role: "ai",
          content:
            generated.source === "api"
              ? isFirst
                ? "He generado una primera versión con IA real. Puedes ajustar el contenido desde el editor básico o seguir refinando por chat."
                : "He aplicado tus cambios con IA real. La previsualización y el proyecto se han actualizado."
              : isFirst
                ? "He generado una primera versión con el motor local preparado para IA. Cuando conectes el endpoint real, este flujo usará OpenAI desde servidor."
                : "He aplicado tus cambios y he actualizado la previsualización. Puedes seguir refinando o editar textos concretos desde mantenimiento.",
          cost,
        },
      ]);

      setHasResult(true);
    } catch (error) {
      toast.error("No se pudo generar o actualizar el proyecto", {
        description: getErrorMessage(error),
      });
    } finally {
      setGenerating(false);
    }
  };

  const handleExport = async (kind: "html" | "zip") => {
    if (!hasResult) {
      toast.error("Primero genera una web");
      return;
    }

    const cost = kind === "zip" ? 1 : 0;

    if (cost > 0 && user.credits < cost) {
      toast.error("Créditos insuficientes para exportar ZIP");
      return;
    }

    try {
      const htmlContent = buildHtmlExport();
      const safeBaseName = getSafeFileBaseName();

      if (currentProjectId) {
        await authStore.updateProject(currentProjectId, {
          name: previewTitle || "Proyecto exportado",
          prompt: messages
            .filter((m) => m.role === "user")
            .map((m) => m.content)
            .join(" | "),
          status: currentProject?.isPublished ? "publicado" : "borrador",
          htmlContent,
          siteData: siteContent,
          zipUrl: kind === "zip" ? `${safeBaseName}.zip` : undefined,
          isPublished: currentProject?.isPublished ?? false,
          publishedUrl: currentProject?.publishedUrl,
          customDomain: currentProject?.customDomain,
          domainStatus: currentProject?.domainStatus,
        });
      }

      if (kind === "html") {
        downloadTextFile(`${safeBaseName}.html`, htmlContent, "text/html;charset=utf-8");

        toast.success("HTML descargado", {
          description: "Tu web se ha exportado correctamente y se ha guardado en el proyecto.",
        });
        return;
      }

      await authStore.consumeCredits(cost);

      const zip = new JSZip();
      zip.file("index.html", htmlContent);

      const readme = `Proyecto exportado desde Sitea.ai

Archivo principal:
- index.html

Proyecto:
${previewTitle || "Mi web"}

Descripción:
${previewSubtitle || "Web generada con Sitea.ai"}
`;
      zip.file("README.txt", readme);

      const zipBlob = await zip.generateAsync({ type: "blob" });
      downloadBlobFile(`${safeBaseName}.zip`, zipBlob);

      toast.success("ZIP descargado", {
        description:
          "Se ha generado un ZIP real con tu index.html y se ha actualizado el proyecto.",
      });
    } catch (error) {
      toast.error("No se pudo completar la exportación", {
        description: getErrorMessage(error),
      });
    }
  };

  const handlePublish = async () => {
    if (!currentProjectId) {
      toast.error("Primero genera una web");
      return;
    }

    if (!hasResult) {
      toast.error("Primero genera una web");
      return;
    }

    if (user.publishPlan === "none") {
      toast.error("No tienes un plan de publicación activo", {
        description: "Activa Publica o Publica Plus en Facturación para publicar esta web.",
      });
      return;
    }

    try {
      setPublishing(true);

      const htmlContent = buildHtmlExport();
      const publishedUrl = `https://${getPublishedSubdomain()}`;

      await authStore.updateProject(currentProjectId, {
        name: previewTitle || "Proyecto publicado",
        prompt: messages
          .filter((m) => m.role === "user")
          .map((m) => m.content)
          .join(" | "),
        status: "publicado",
        htmlContent,
        siteData: siteContent,
        isPublished: true,
        publishedUrl,
        customDomain: currentProject?.customDomain,
        domainStatus: currentProject?.domainStatus,
      });

      toast.success("Web publicada", {
        description: `Tu proyecto ya está publicado en ${publishedUrl}`,
      });
    } catch (error) {
      toast.error("No se pudo publicar la web", {
        description: getErrorMessage(error),
      });
    } finally {
      setPublishing(false);
    }
  };

  const handleUpdatePublish = async () => {
    if (!currentProjectId || !currentProject?.isPublished) {
      toast.error("Este proyecto todavía no está publicado");
      return;
    }

    if (user.publishPlan === "none") {
      toast.error("No tienes un plan de publicación activo");
      return;
    }

    try {
      setPublishing(true);

      const htmlContent = buildHtmlExport();

      await authStore.updateProject(currentProjectId, {
        name: previewTitle || currentProject.name,
        prompt: messages
          .filter((m) => m.role === "user")
          .map((m) => m.content)
          .join(" | "),
        status: "publicado",
        htmlContent,
        siteData: siteContent,
        isPublished: true,
        publishedUrl: currentProject.publishedUrl,
        customDomain: currentProject.customDomain,
        domainStatus: currentProject.domainStatus,
      });

      toast.success("Publicación actualizada", {
        description: "Los cambios ya están listos en tu web publicada.",
      });
    } catch (error) {
      toast.error("No se pudo actualizar la publicación", {
        description: getErrorMessage(error),
      });
    } finally {
      setPublishing(false);
    }
  };

  const handleConnectDomain = async () => {
    if (!currentProjectId || !currentProject?.isPublished) {
      toast.error("Primero publica la web");
      return;
    }

    if (user.publishPlan !== "publica_plus") {
      toast.error("Necesitas Publica Plus", {
        description: "Solo con Publica Plus puedes conectar tu propio dominio.",
      });
      return;
    }

    const normalized = normalizeDomain(domainInput);

    if (!normalized || !isValidDomain(normalized)) {
      toast.error("Dominio no válido", {
        description: "Escribe un dominio válido, por ejemplo: midespacho.com",
      });
      return;
    }

    try {
      setPublishing(true);

      await authStore.updateProject(currentProjectId, {
        customDomain: normalized,
        isPublished: true,
        status: "publicado",
        publishedUrl: currentProject.publishedUrl,
        htmlContent: buildHtmlExport(),
        siteData: siteContent,
        domainStatus: "pending",
      });

      setDomainInput(normalized);

      toast.success("Dominio conectado", {
        description: `Tu proyecto ahora usa ${normalized}`,
      });
    } catch (error) {
      toast.error("No se pudo conectar el dominio", {
        description: getErrorMessage(error),
      });
    } finally {
      setPublishing(false);
    }
  };

  const handleSetDomainStatus = async (status: DomainStatus) => {
    if (!currentProjectId || !currentProject?.customDomain) {
      toast.error("Primero conecta un dominio");
      return;
    }

    try {
      setPublishing(true);

      await authStore.updateProject(currentProjectId, {
        customDomain: currentProject.customDomain,
        isPublished: true,
        status: "publicado",
        publishedUrl: currentProject.publishedUrl,
        htmlContent: buildHtmlExport(),
        siteData: siteContent,
        domainStatus: status,
      });

      toast.success("Estado del dominio actualizado", {
        description:
          status === "pending"
            ? "Dominio marcado como pendiente."
            : status === "connected"
              ? "Dominio marcado como conectado."
              : "Dominio marcado con error DNS.",
      });
    } catch (error) {
      toast.error("No se pudo actualizar el estado del dominio", {
        description: getErrorMessage(error),
      });
    } finally {
      setPublishing(false);
    }
  };

  const handleCopyUrl = async () => {
    const url = currentProject?.customDomain
      ? `https://${currentProject.customDomain}`
      : currentProject?.publishedUrl;

    if (!url) {
      toast.error("No hay URL disponible todavía");
      return;
    }

    try {
      await navigator.clipboard.writeText(url);
      toast.success("URL copiada", {
        description: url,
      });
    } catch {
      toast.error("No se pudo copiar la URL");
    }
  };

  const handleCopyDnsTarget = async () => {
    const target = getDnsTarget();

    try {
      await navigator.clipboard.writeText(target);
      toast.success("Target copiado", {
        description: target,
      });
    } catch {
      toast.error("No se pudo copiar el target");
    }
  };

  const handleRemoveDomain = async () => {
    if (!currentProjectId || !currentProject?.isPublished) {
      toast.error("No hay ningún proyecto publicado");
      return;
    }

    if (!currentProject.customDomain) {
      toast.error("No hay dominio conectado");
      return;
    }

    try {
      setPublishing(true);

      await authStore.updateProject(currentProjectId, {
        customDomain: "",
        isPublished: true,
        status: "publicado",
        publishedUrl: currentProject.publishedUrl,
        htmlContent: buildHtmlExport(),
        siteData: siteContent,
        domainStatus: undefined,
      });

      setDomainInput("");

      toast.success("Dominio eliminado", {
        description: "La web vuelve a usar el subdominio de Sitea.",
      });
    } catch (error) {
      toast.error("No se pudo quitar el dominio", {
        description: getErrorMessage(error),
      });
    } finally {
      setPublishing(false);
    }
  };

  const previewWidth =
    device === "mobile" ? "max-w-[375px]" : device === "tablet" ? "max-w-[768px]" : "max-w-full";

  const publishPlanLabel =
    user.publishPlan === "none"
      ? "Sin publicación"
      : user.publishPlan === "publica"
        ? "Plan Publica"
        : "Plan Publica Plus";

  const publishPlanHeaderBadge =
    user.publishPlan === "none"
      ? null
      : user.publishPlan === "publica"
        ? "Publica activo"
        : "Publica Plus activo";

  const getDomainStatusInfo = () => {
    if (domainStatus === "none") {
      return {
        icon: null,
        boxClass: "border-border/60 bg-muted/30 text-muted-foreground",
        title: "Aún no has conectado un dominio propio.",
      };
    }

    if (domainStatus === "pending") {
      return {
        icon: <Clock3 className="h-4 w-4" />,
        boxClass: "border-amber-200 bg-amber-50 text-amber-700",
        title: "Estado del dominio: Pendiente verificación",
      };
    }

    if (domainStatus === "connected") {
      return {
        icon: <CheckCircle2 className="h-4 w-4" />,
        boxClass: "border-emerald-200 bg-emerald-50 text-emerald-700",
        title: "Estado del dominio: Conectado correctamente",
      };
    }

    return {
      icon: <AlertTriangle className="h-4 w-4" />,
      boxClass: "border-red-200 bg-red-50 text-red-700",
      title: "Estado del dominio: Error DNS",
    };
  };

  const domainStatusInfo = getDomainStatusInfo();

  return (
    <div className="flex h-screen flex-col">
      <div className="flex h-auto min-h-16 flex-shrink-0 flex-col justify-between gap-3 border-b border-border bg-card/50 px-6 py-3 md:h-16 md:flex-row md:items-center md:py-0">
        <div className="flex items-center gap-3">
          <div className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-primary text-primary-foreground shadow-glow">
            <Wand2 className="h-4 w-4" />
          </div>

          <div>
            <h1 className="text-sm font-semibold leading-tight">Generador IA</h1>

            <div className="mt-1 flex flex-wrap items-center gap-2">
              <p className="text-xs text-muted-foreground">
                Genera, ajusta, exporta y publica · {user.credits} créditos disponibles
              </p>

              {publishPlanHeaderBadge ? (
                <Badge
                  className={
                    user.publishPlan === "publica_plus"
                      ? "h-5 border border-emerald-200 bg-emerald-50 text-[10px] font-medium text-emerald-700 hover:bg-emerald-50"
                      : "h-5 border border-sky-200 bg-sky-50 text-[10px] font-medium text-sky-700 hover:bg-sky-50"
                  }
                >
                  {publishPlanHeaderBadge}
                </Badge>
              ) : null}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {!currentProject?.isPublished ? (
            <Button
              variant="outline"
              size="sm"
              onClick={handlePublish}
              disabled={publishing || !hasResult}
            >
              {publishing ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Rocket className="h-4 w-4" />
              )}
              Publicar
            </Button>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={handleUpdatePublish}
              disabled={publishing || !hasResult}
            >
              {publishing ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <RefreshCcw className="h-4 w-4" />
              )}
              Actualizar
            </Button>
          )}

          <Button variant="outline" size="sm" onClick={() => handleExport("html")}>
            <FileCode className="h-4 w-4" /> HTML
          </Button>
          <Button variant="hero" size="sm" onClick={() => handleExport("zip")}>
            <FileArchive className="h-4 w-4" /> Exportar ZIP
          </Button>
        </div>
      </div>

      <div className="grid flex-1 grid-cols-1 overflow-hidden lg:grid-cols-[420px_1fr]">
        <div className="flex flex-col border-r border-border bg-sidebar">
          <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto px-5 py-6">
            {currentProject && (
              <div className="rounded-2xl border border-border/60 bg-card p-4 shadow-card">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Estado del proyecto
                    </p>
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      <Badge variant={currentProject.isPublished ? "default" : "secondary"}>
                        {currentProject.isPublished ? "Publicado" : "Borrador"}
                      </Badge>
                      <Badge variant="outline">{publishPlanLabel}</Badge>
                    </div>
                  </div>
                </div>

                {currentProject.publishedUrl && (
                  <div className="mt-3 rounded-xl border border-border/60 bg-background px-3 py-3">
                    <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
                      URL actual
                    </p>
                    <p className="mt-1 text-sm font-medium text-foreground">{getDisplayDomain()}</p>
                  </div>
                )}

                {currentProject.isPublished && (
                  <div className="mt-4 rounded-2xl border border-border/60 bg-[linear-gradient(180deg,white,oklch(0.985_0.004_260))] p-4 shadow-sm">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                          <Link2 className="h-3.5 w-3.5" />
                          Dominio personalizado
                        </div>
                        <h3 className="mt-2 text-sm font-semibold text-foreground">
                          Conecta tu dominio propio
                        </h3>
                        <p className="mt-1 text-xs leading-5 text-muted-foreground">
                          Usa tu propio dominio para mostrar esta web con una imagen más
                          profesional.
                        </p>
                      </div>

                      <Badge
                        className={domainStatusBadge.className}
                        variant={domainStatusBadge.variant}
                      >
                        {domainStatusBadge.text}
                      </Badge>
                    </div>

                    <div className="mt-4 rounded-xl border border-border/60 bg-background px-3 py-3">
                      <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
                        URL activa
                      </p>
                      <p className="mt-1 text-sm font-medium text-foreground">
                        {currentProject.customDomain
                          ? `https://${currentProject.customDomain}`
                          : currentProject.publishedUrl || "Sin URL todavía"}
                      </p>

                      <div
                        className={`mt-3 rounded-lg border px-3 py-2 text-xs ${domainStatusInfo.boxClass}`}
                      >
                        <div className="flex items-center gap-2">
                          {domainStatusInfo.icon}
                          <span className="font-medium">{domainStatusInfo.title}</span>
                        </div>
                      </div>

                      <div className="mt-3 flex flex-wrap gap-2">
                        <Button type="button" variant="outline" size="sm" onClick={handleCopyUrl}>
                          <Copy className="h-4 w-4" />
                          Copiar URL
                        </Button>

                        {currentProject.customDomain ? (
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={handleRemoveDomain}
                            disabled={publishing}
                          >
                            {publishing ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <X className="h-4 w-4" />
                            )}
                            Quitar dominio
                          </Button>
                        ) : null}
                      </div>
                    </div>

                    <div className="mt-4">
                      <label className="mb-2 block text-xs font-medium text-muted-foreground">
                        Escribe tu dominio
                      </label>

                      <div className="flex flex-col gap-2 sm:flex-row">
                        <Input
                          value={domainInput}
                          onChange={(e) => setDomainInput(e.target.value)}
                          placeholder="ejemplo.com"
                          disabled={user.publishPlan !== "publica_plus" || publishing}
                          className="h-11"
                        />

                        <Button
                          type="button"
                          variant={currentProject.customDomain ? "outline" : "hero"}
                          onClick={handleConnectDomain}
                          disabled={user.publishPlan !== "publica_plus" || publishing}
                          className="h-11 sm:min-w-[140px]"
                        >
                          {publishing ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : currentProject.customDomain ? (
                            "Actualizar"
                          ) : (
                            "Conectar"
                          )}
                        </Button>
                      </div>
                    </div>

                    {currentProject.customDomain ? (
                      <div className="mt-4 rounded-xl border border-border/60 bg-background px-3 py-3">
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
                              Estado manual del dominio
                            </p>
                            <p className="mt-1 text-xs leading-5 text-muted-foreground">
                              Simula el estado visual del dominio mientras seguimos sin validación
                              real.
                            </p>
                          </div>
                        </div>

                        <div className="mt-3 flex flex-wrap gap-2">
                          <Button
                            type="button"
                            size="sm"
                            variant={domainStatus === "pending" ? "default" : "outline"}
                            onClick={() => handleSetDomainStatus("pending")}
                            disabled={publishing}
                          >
                            <Clock3 className="h-4 w-4" />
                            Pending
                          </Button>

                          <Button
                            type="button"
                            size="sm"
                            variant={domainStatus === "connected" ? "default" : "outline"}
                            onClick={() => handleSetDomainStatus("connected")}
                            disabled={publishing}
                          >
                            <CheckCircle2 className="h-4 w-4" />
                            Connected
                          </Button>

                          <Button
                            type="button"
                            size="sm"
                            variant={domainStatus === "error" ? "default" : "outline"}
                            onClick={() => handleSetDomainStatus("error")}
                            disabled={publishing}
                          >
                            <AlertTriangle className="h-4 w-4" />
                            Error
                          </Button>
                        </div>
                      </div>
                    ) : null}

                    <div className="mt-4 rounded-xl border border-border/60 bg-background px-3 py-3">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
                            DNS requerido
                          </p>
                          <p className="mt-1 text-xs leading-5 text-muted-foreground">
                            Añade este registro en tu proveedor de dominio para apuntar tu web.
                          </p>
                        </div>

                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={handleCopyDnsTarget}
                        >
                          <Copy className="h-4 w-4" />
                          Copiar target
                        </Button>
                      </div>

                      <div className="mt-3 overflow-hidden rounded-xl border border-border/60">
                        <div className="grid grid-cols-3 bg-muted/40 px-3 py-2 text-[11px] font-medium uppercase tracking-[0.08em] text-muted-foreground">
                          <div>Tipo</div>
                          <div>Host</div>
                          <div>Valor</div>
                        </div>

                        <div className="grid grid-cols-3 items-center gap-2 px-3 py-3 text-xs">
                          <div className="font-medium text-foreground">CNAME</div>
                          <div className="text-muted-foreground">www</div>
                          <div className="truncate font-medium text-foreground">
                            {getDnsTarget()}
                          </div>
                        </div>
                      </div>

                      <div className="mt-3 rounded-lg border border-dashed border-border/60 bg-background/70 px-3 py-2 text-xs text-muted-foreground">
                        Para el dominio raíz (<span className="font-medium">tudominio.com</span>)
                        normalmente necesitarás redirección a{" "}
                        <span className="font-medium">www</span> o registros adicionales según tu
                        proveedor.
                      </div>
                    </div>

                    <div className="mt-4 rounded-xl border border-dashed border-border/60 bg-background/70 px-3 py-3">
                      <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
                        Nota
                      </p>
                      <p className="mt-1 text-xs leading-5 text-muted-foreground">
                        Esta conexión sigue siendo simulada por ahora. El selector superior te
                        permite probar visualmente estados como pendiente, conectado o error DNS.
                      </p>
                    </div>

                    {user.publishPlan !== "publica_plus" && (
                      <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-3 py-3 text-xs text-amber-700">
                        Necesitas <span className="font-semibold">Publica Plus</span> para conectar
                        un dominio propio.
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {hasResult && (
              <div className="rounded-2xl border border-border/60 bg-card p-4 shadow-card">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Editor básico de mantenimiento
                    </p>
                    <p className="mt-1 text-xs leading-5 text-muted-foreground">
                      Ajusta textos, contacto y colores sin tocar código. Preparado para clientes
                      con publicación o mantenimiento activo.
                    </p>
                  </div>
                  <Badge
                    variant="outline"
                    className={
                      user.publishPlan === "none"
                        ? "text-[10px]"
                        : "border-emerald-200 bg-emerald-50 text-[10px] text-emerald-700"
                    }
                  >
                    {user.publishPlan === "none" ? "Preparado" : "Mantenimiento"}
                  </Badge>
                </div>

                <div className="mt-4 space-y-3">
                  <div className="grid gap-2">
                    <label className="text-xs font-medium text-muted-foreground">
                      Nombre del negocio
                    </label>
                    <Input
                      value={siteContent.businessName}
                      onChange={(e) => updateSiteContent({ businessName: e.target.value })}
                    />
                  </div>

                  <div className="grid gap-2">
                    <label className="text-xs font-medium text-muted-foreground">
                      Título principal
                    </label>
                    <Input
                      value={siteContent.heroTitle}
                      onChange={(e) => updateSiteContent({ heroTitle: e.target.value })}
                    />
                  </div>

                  <div className="grid gap-2">
                    <label className="text-xs font-medium text-muted-foreground">Subtítulo</label>
                    <Textarea
                      value={siteContent.heroSubtitle}
                      onChange={(e) => updateSiteContent({ heroSubtitle: e.target.value })}
                      className="min-h-[70px]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="grid gap-2">
                      <label className="text-xs font-medium text-muted-foreground">
                        Botón principal
                      </label>
                      <Input
                        value={siteContent.primaryCta}
                        onChange={(e) => updateSiteContent({ primaryCta: e.target.value })}
                      />
                    </div>
                    <div className="grid gap-2">
                      <label className="text-xs font-medium text-muted-foreground">
                        Botón secundario
                      </label>
                      <Input
                        value={siteContent.secondaryCta}
                        onChange={(e) => updateSiteContent({ secondaryCta: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <label className="text-xs font-medium text-muted-foreground">
                      Texto sección 1
                    </label>
                    <Input
                      value={siteContent.sectionOneTitle}
                      onChange={(e) => updateSiteContent({ sectionOneTitle: e.target.value })}
                    />
                    <Textarea
                      value={siteContent.sectionOneText}
                      onChange={(e) => updateSiteContent({ sectionOneText: e.target.value })}
                      className="min-h-[64px]"
                    />
                  </div>

                  <div className="grid gap-2">
                    <label className="text-xs font-medium text-muted-foreground">
                      Texto sección 2
                    </label>
                    <Input
                      value={siteContent.sectionTwoTitle}
                      onChange={(e) => updateSiteContent({ sectionTwoTitle: e.target.value })}
                    />
                    <Textarea
                      value={siteContent.sectionTwoText}
                      onChange={(e) => updateSiteContent({ sectionTwoText: e.target.value })}
                      className="min-h-[64px]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="grid gap-2">
                      <label className="text-xs font-medium text-muted-foreground">
                        Email contacto
                      </label>
                      <Input
                        value={siteContent.contactEmail}
                        onChange={(e) => updateSiteContent({ contactEmail: e.target.value })}
                      />
                    </div>
                    <div className="grid gap-2">
                      <label className="text-xs font-medium text-muted-foreground">Teléfono</label>
                      <Input
                        value={siteContent.contactPhone}
                        onChange={(e) => updateSiteContent({ contactPhone: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="grid gap-2">
                      <label className="text-xs font-medium text-muted-foreground">
                        Color principal
                      </label>
                      <Input
                        type="color"
                        value={siteContent.primaryColor}
                        onChange={(e) => updateSiteContent({ primaryColor: e.target.value })}
                        className="h-11 p-1"
                      />
                    </div>
                    <div className="grid gap-2">
                      <label className="text-xs font-medium text-muted-foreground">Fondo</label>
                      <Input
                        type="color"
                        value={siteContent.backgroundColor}
                        onChange={(e) => updateSiteContent({ backgroundColor: e.target.value })}
                        className="h-11 p-1"
                      />
                    </div>
                  </div>

                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    disabled={!currentProjectId}
                    onClick={async () => {
                      if (!currentProjectId) return;
                      try {
                        const htmlContent = buildHtmlExport();
                        await authStore.updateProject(currentProjectId, {
                          name: siteContent.businessName || previewTitle || "Proyecto editado",
                          htmlContent,
                          siteData: siteContent,
                          status: currentProject?.isPublished ? "publicado" : "borrador",
                          publishedUrl: currentProject?.publishedUrl,
                          customDomain: currentProject?.customDomain,
                          domainStatus: currentProject?.domainStatus,
                        });
                        toast.success("Cambios guardados", {
                          description: currentProject?.isPublished
                            ? "Ahora puedes pulsar Actualizar para reflejarlo en la publicación."
                            : "El borrador se ha guardado con los cambios del editor.",
                        });
                      } catch (error) {
                        toast.error("No se pudieron guardar los cambios", {
                          description: getErrorMessage(error),
                        });
                      }
                    }}
                  >
                    Guardar cambios del editor
                  </Button>
                </div>
              </div>
            )}

            {messages.length === 0 && (
              <div className="space-y-5">
                <div className="rounded-xl border border-border/60 bg-card p-5 shadow-card">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <Sparkles className="h-4 w-4 text-primary" /> Empieza escribiendo tu idea
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Describe qué negocio tienes, qué tipo de página quieres y qué secciones debería
                    incluir la web.
                  </p>
                </div>

                <div>
                  <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Sugerencias
                  </p>
                  <div className="space-y-2">
                    {examplePrompts.map((p) => (
                      <button
                        key={p}
                        onClick={() => setPrompt(p)}
                        className="block w-full rounded-lg border border-border/60 bg-card p-3 text-left text-sm transition-smooth hover:border-primary/40 hover:bg-accent/40"
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {messages.map((m, i) => (
              <div key={i} className={m.role === "user" ? "flex justify-end" : ""}>
                {m.role === "user" ? (
                  <div className="max-w-[85%] rounded-2xl rounded-br-sm bg-gradient-primary px-4 py-2.5 text-sm text-primary-foreground shadow-card">
                    {m.content}
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span className="grid h-5 w-5 place-items-center rounded-full bg-gradient-primary text-primary-foreground">
                        <Sparkles className="h-3 w-3" />
                      </span>
                      Sitea AI
                      {m.cost && (
                        <Badge variant="secondary" className="text-[10px]">
                          −{m.cost} cr
                        </Badge>
                      )}
                    </div>
                    <div className="rounded-2xl rounded-tl-sm border border-border/60 bg-card px-4 py-3 text-sm shadow-card">
                      {m.content}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {generating && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-gradient-primary text-primary-foreground">
                    <Loader2 className="h-3 w-3 animate-spin" />
                  </span>
                  Sitea AI
                </div>
                <div className="rounded-2xl rounded-tl-sm border border-border/60 bg-card px-4 py-3 text-sm shadow-card">
                  <span className="inline-flex items-center gap-2 text-muted-foreground">
                    Pensando y construyendo tu web…
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="border-t border-border bg-card p-4">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleGenerate(prompt);
              }}
              className="relative rounded-xl border border-border bg-background shadow-card focus-within:border-primary/40 focus-within:shadow-glow"
            >
              <Textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleGenerate(prompt);
                  }
                }}
                placeholder={
                  messages.length === 0 ? "Describe tu web..." : "Refina el resultado..."
                }
                className="min-h-[80px] resize-none border-0 bg-transparent shadow-none focus-visible:ring-0"
              />
              <div className="flex items-center justify-between border-t border-border/60 px-3 py-2">
                <Badge variant="outline" className="text-[10px]">
                  1 crédito por acción
                </Badge>
                <Button
                  type="submit"
                  size="icon"
                  variant="hero"
                  disabled={!prompt.trim() || generating}
                >
                  {generating ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <ArrowUp className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>

        <div className="flex flex-col overflow-hidden bg-gradient-subtle">
          <div className="flex h-12 flex-shrink-0 items-center justify-between border-b border-border bg-card/40 px-4">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Eye className="h-3.5 w-3.5" /> Previsualización en vivo
            </div>

            <Tabs value={device} onValueChange={(v) => setDevice(v as typeof device)}>
              <TabsList className="h-8">
                <TabsTrigger value="mobile" className="px-2">
                  <Smartphone className="h-3.5 w-3.5" />
                </TabsTrigger>
                <TabsTrigger value="tablet" className="px-2">
                  <Tablet className="h-3.5 w-3.5" />
                </TabsTrigger>
                <TabsTrigger value="desktop" className="px-2">
                  <Monitor className="h-3.5 w-3.5" />
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="flex items-center gap-2">
              {currentProject?.isPublished ? (
                <Badge variant="outline" className="hidden sm:inline-flex">
                  <Globe className="h-3 w-3" />
                  {getDisplayDomain()}
                </Badge>
              ) : null}

              <Button
                variant="ghost"
                size="sm"
                disabled={!hasResult || generating}
                onClick={() => {
                  const lastPrompt = [...messages]
                    .reverse()
                    .find((m) => m.role === "user")?.content;
                  handleGenerate(lastPrompt || siteContent.heroTitle || "Refina esta web");
                }}
              >
                <RotateCw className="h-3.5 w-3.5" /> Regenerar
              </Button>
            </div>
          </div>

          <div className="flex-1 overflow-auto p-6">
            <div className={`mx-auto h-full ${previewWidth} transition-all duration-300`}>
              <div className="overflow-hidden rounded-xl border border-border bg-card shadow-elegant">
                <div className="flex items-center gap-1.5 border-b border-border bg-muted/40 px-3 py-2">
                  <span className="h-2 w-2 rounded-full bg-destructive/40" />
                  <span className="h-2 w-2 rounded-full bg-warning/60" />
                  <span className="h-2 w-2 rounded-full bg-success/60" />
                  <div className="ml-2 flex-1 truncate rounded border border-border/40 bg-background px-2 py-0.5 text-[10px] text-muted-foreground">
                    {getDisplayDomain()}
                  </div>
                </div>

                <MockPreview
                  content={siteContent}
                  title={previewTitle}
                  subtitle={previewSubtitle}
                  hasResult={hasResult}
                />
              </div>

              {hasResult && (
                <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground">
                  <Check className="h-3.5 w-3.5 text-success" />
                  {currentProject?.isPublished ? "Web publicada" : "Web generada"}
                  <span className="mx-2">·</span>

                  <Button
                    size="sm"
                    variant="link"
                    className="h-auto p-0"
                    onClick={() => handleExport("html")}
                  >
                    <Download className="h-3 w-3" /> HTML
                  </Button>

                  <Button
                    size="sm"
                    variant="link"
                    className="h-auto p-0"
                    onClick={() => handleExport("zip")}
                  >
                    <Download className="h-3 w-3" /> ZIP
                  </Button>

                  {!currentProject?.isPublished ? (
                    <Button
                      size="sm"
                      variant="link"
                      className="h-auto p-0"
                      onClick={handlePublish}
                      disabled={publishing}
                    >
                      <Rocket className="h-3 w-3" /> Publicar
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      variant="link"
                      className="h-auto p-0"
                      onClick={handleUpdatePublish}
                      disabled={publishing}
                    >
                      <RefreshCcw className="h-3 w-3" /> Actualizar
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MockPreview({
  content,
  title,
  subtitle,
  hasResult,
}: {
  content: SiteContent;
  title: string;
  subtitle: string;
  hasResult: boolean;
}) {
  if (!hasResult) {
    return (
      <div className="grid min-h-[480px] place-items-center bg-gradient-hero p-12 text-center">
        <div>
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-gradient-primary text-primary-foreground shadow-glow">
            <Wand2 className="h-6 w-6" />
          </div>
          <h3 className="mt-5 text-xl font-semibold">{title}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background">
      <div
        className="px-8 py-14 text-center"
        style={{ background: `linear-gradient(180deg, ${content.backgroundColor}, white)` }}
      >
        <Badge variant="outline" className="border-primary/20 bg-primary/5 text-primary">
          Bienvenido
        </Badge>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">{title}</h1>
        <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">{subtitle}</p>
        <div className="mt-5 flex justify-center gap-2">
          <div
            className="rounded-md px-4 py-2 text-xs font-medium text-white"
            style={{ backgroundColor: content.primaryColor }}
          >
            {content.primaryCta}
          </div>
          <div className="rounded-md border border-border bg-background px-4 py-2 text-xs">
            {content.secondaryCta}
          </div>
        </div>
      </div>

      <div className="grid gap-3 px-8 py-10 md:grid-cols-2">
        <div className="rounded-lg border border-border/60 bg-card p-4">
          <div className="h-6 w-6 rounded-md" style={{ backgroundColor: content.primaryColor }} />
          <h3 className="mt-3 text-sm font-semibold">{content.sectionOneTitle}</h3>
          <p className="mt-2 text-xs leading-5 text-muted-foreground">{content.sectionOneText}</p>
        </div>
        <div className="rounded-lg border border-border/60 bg-card p-4">
          <div className="h-6 w-6 rounded-md" style={{ backgroundColor: content.primaryColor }} />
          <h3 className="mt-3 text-sm font-semibold">{content.sectionTwoTitle}</h3>
          <p className="mt-2 text-xs leading-5 text-muted-foreground">{content.sectionTwoText}</p>
        </div>
      </div>

      <div className="border-t border-border bg-muted/30 px-8 py-10">
        <div className="mx-auto max-w-sm">
          <h3 className="text-center text-base font-semibold">Contáctanos</h3>
          <div className="mt-4 space-y-2 text-center text-xs text-muted-foreground">
            <p>{content.contactEmail}</p>
            <p>{content.contactPhone}</p>
            <div
              className="mt-3 rounded-md px-4 py-2 font-medium text-white"
              style={{ backgroundColor: content.primaryColor }}
            >
              {content.primaryCta}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
