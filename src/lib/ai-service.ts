import { inferSiteContentFromPrompt, type SiteContent } from "./site-template";

export interface WebsiteGenerationResult {
  content: SiteContent;
  source: "local-fallback" | "api";
}

/**
 * Punto preparado para IA real.
 *
 * La clave de OpenAI no debe ir nunca en el cliente. Cuando se conecte el backend,
 * configura VITE_SITEA_AI_ENDPOINT con una ruta serverless propia que use OPENAI_API_KEY
 * en servidor y devuelva un SiteContent serializable.
 */
export async function generateWebsiteDraft(
  prompt: string,
  previous?: Partial<SiteContent>,
): Promise<WebsiteGenerationResult> {
  const endpoint = import.meta.env.VITE_SITEA_AI_ENDPOINT as string | undefined;

  if (endpoint) {
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, previous }),
      });

      if (response.ok) {
        const payload = await response.json();
        if (payload?.content) {
          return {
            content: { ...inferSiteContentFromPrompt(prompt, previous), ...payload.content },
            source: "api",
          };
        }
      }
    } catch (error) {
      console.warn("No se pudo usar el endpoint de IA. Se usa fallback local.", error);
    }
  }

  return {
    content: inferSiteContentFromPrompt(prompt, previous),
    source: "local-fallback",
  };
}
