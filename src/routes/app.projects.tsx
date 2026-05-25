import { createFileRoute, Link } from "@tanstack/react-router";
import { useAuth, authStore } from "@/lib/auth-store";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Plus,
  Search,
  Trash2,
  Download,
  Eye,
  Wand2,
  FileArchive,
  Globe,
  Rocket,
  Clock3,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/utils";

export const Route = createFileRoute("/app/projects")({
  head: () => ({ meta: [{ title: "Proyectos — Sitea.ai" }] }),
  component: ProjectsPage,
});

function ProjectsPage() {
  const { projects, user } = useAuth();
  const [q, setQ] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const filtered = projects.filter((p) => p.name.toLowerCase().includes(q.toLowerCase()));

  const getSafeFileBaseName = (name: string) => {
    return (
      name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "") || "mi-web"
    );
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

  const handleDelete = async (projectId: string, projectName: string) => {
    const confirmed = window.confirm(
      `¿Seguro que quieres eliminar "${projectName}"? Esta acción no se puede deshacer.`,
    );

    if (!confirmed) return;

    try {
      setDeletingId(projectId);
      await authStore.deleteProject(projectId);
      toast.success("Proyecto eliminado", {
        description: `"${projectName}" se ha eliminado correctamente.`,
      });
    } catch (error) {
      toast.error("No se pudo eliminar el proyecto", {
        description: getErrorMessage(error),
      });
    } finally {
      setDeletingId(null);
    }
  };

  const handleDownloadHtml = (project: (typeof projects)[number]) => {
    if (!project.htmlContent) {
      toast.error("Este proyecto no tiene HTML guardado todavía", {
        description: "Abre el proyecto y expórtalo en HTML primero.",
      });
      return;
    }

    const fileName = `${getSafeFileBaseName(project.name)}.html`;
    downloadTextFile(fileName, project.htmlContent, "text/html;charset=utf-8");

    toast.success("HTML descargado", {
      description: `Se ha descargado "${project.name}".`,
    });
  };

  const handleDownloadZip = (project: (typeof projects)[number]) => {
    if (!project.zipUrl) {
      toast.error("Este proyecto no tiene ZIP disponible todavía", {
        description: "Abre el proyecto y expórtalo en ZIP primero.",
      });
      return;
    }

    toast.error("El ZIP real debe descargarse desde el generador", {
      description: "De momento la descarga ZIP se gestiona desde la pantalla del proyecto.",
    });
  };

  const publishPlanLabel =
    user?.publishPlan === "none"
      ? "Sin publicación"
      : user?.publishPlan === "publica"
        ? "Plan Publica"
        : "Plan Publica Plus";

  const getDomainStatusBadge = (project: (typeof projects)[number]) => {
    if (!project.customDomain) return null;

    if (project.domainStatus === "connected") {
      return (
        <Badge className="border border-emerald-200 bg-emerald-50 text-[10px] text-emerald-700 hover:bg-emerald-50">
          <CheckCircle2 className="h-3 w-3" />
          Dominio conectado
        </Badge>
      );
    }

    if (project.domainStatus === "error") {
      return (
        <Badge className="border border-red-200 bg-red-50 text-[10px] text-red-700 hover:bg-red-50">
          <AlertTriangle className="h-3 w-3" />
          Error DNS
        </Badge>
      );
    }

    return (
      <Badge className="border border-amber-200 bg-amber-50 text-[10px] text-amber-700 hover:bg-amber-50">
        <Clock3 className="h-3 w-3" />
        Dominio pendiente
      </Badge>
    );
  };

  return (
    <div className="px-6 py-8 md:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Tus webs generadas</h1>
            <p className="mt-1 text-muted-foreground">
              {projects.length} webs guardadas en tu cuenta · {publishPlanLabel}
            </p>
          </div>

          <Button asChild variant="hero" size="lg">
            <Link to="/app/generator">
              <Plus className="h-4 w-4" /> Crear nueva web
            </Link>
          </Button>
        </div>

        <div className="mt-6 flex items-center gap-3">
          <div className="relative max-w-md flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Buscar webs guardadas…"
              className="pl-9"
            />
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
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

                <div className="absolute right-2 top-2 flex gap-1 opacity-0 transition-smooth group-hover:opacity-100">
                  <Button asChild size="icon" variant="secondary" className="h-7 w-7">
                    <Link to="/app/generator" search={{ projectId: p.id }}>
                      <Eye className="h-3.5 w-3.5" />
                    </Link>
                  </Button>

                  <Button
                    size="icon"
                    variant="secondary"
                    className="h-7 w-7"
                    onClick={() => handleDownloadHtml(p)}
                  >
                    <Download className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <h3 className="truncate font-medium">{p.name}</h3>
                    <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">{p.prompt}</p>
                  </div>

                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 text-muted-foreground hover:text-destructive"
                    disabled={deletingId === p.id}
                    onClick={() => handleDelete(p.id, p.name)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <Badge
                    variant={p.isPublished ? "default" : "secondary"}
                    className="text-xs capitalize"
                  >
                    {p.isPublished ? "publicada" : "borrador"}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{p.updatedAt}</span>
                </div>

                {p.publishedUrl ? (
                  <div className="mt-3 rounded-lg border border-border/60 bg-background px-3 py-2 text-[11px] text-muted-foreground">
                    {p.customDomain ? p.customDomain : p.publishedUrl.replace("https://", "")}
                  </div>
                ) : (
                  <div className="mt-3 rounded-lg border border-dashed border-border/60 bg-background px-3 py-2 text-[11px] text-muted-foreground">
                    Sin publicar todavía
                  </div>
                )}

                <div className="mt-3 flex flex-wrap gap-2">
                  {p.htmlContent ? (
                    <Badge variant="outline" className="text-[10px]">
                      HTML guardado
                    </Badge>
                  ) : null}

                  {p.zipUrl ? (
                    <Badge variant="outline" className="text-[10px]">
                      ZIP disponible
                    </Badge>
                  ) : null}

                  {p.isPublished ? (
                    <Badge variant="outline" className="text-[10px]">
                      <Rocket className="h-3 w-3" />
                      Online
                    </Badge>
                  ) : null}

                  {p.customDomain ? (
                    <Badge variant="outline" className="text-[10px]">
                      <Globe className="h-3 w-3" />
                      Dominio propio
                    </Badge>
                  ) : null}

                  {getDomainStatusBadge(p)}
                </div>

                <div className="mt-4 grid grid-cols-3 gap-2">
                  <Button asChild variant="outline" className="col-span-2">
                    <Link to="/app/generator" search={{ projectId: p.id }}>
                      Abrir proyecto
                    </Link>
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() => handleDownloadHtml(p)}
                    disabled={!p.htmlContent}
                    title={p.htmlContent ? "Descargar HTML" : "No hay HTML guardado"}
                  >
                    <Download className="h-4 w-4" />
                  </Button>

                  <Button
                    variant="outline"
                    className="col-span-2"
                    onClick={() => handleDownloadZip(p)}
                    disabled={!p.zipUrl}
                  >
                    <FileArchive className="h-4 w-4" />
                    ZIP
                  </Button>

                  <Button
                    variant="outline"
                    disabled={deletingId === p.id}
                    onClick={() => handleDelete(p.id, p.name)}
                  >
                    {deletingId === p.id ? "..." : <Trash2 className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </Card>
          ))}

          <Link
            to="/app/generator"
            className="group flex min-h-[260px] items-center justify-center rounded-xl border-2 border-dashed border-border bg-card/40 transition-smooth hover:border-primary/40 hover:bg-card"
          >
            <div className="text-center">
              <div className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-accent text-accent-foreground transition-smooth group-hover:bg-gradient-primary group-hover:text-primary-foreground">
                <Wand2 className="h-5 w-5" />
              </div>
              <p className="mt-3 text-sm font-medium">Crear una nueva web</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Genera una página simple desde cero
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
