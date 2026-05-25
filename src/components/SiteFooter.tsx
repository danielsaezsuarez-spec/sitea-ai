import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/70 bg-white/64 backdrop-blur-2xl">
      <div className="container mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="space-y-4 md:col-span-2">
            <Logo />
            <p className="max-w-sm text-sm leading-6 text-muted-foreground">
              Crea webs simples y profesionales con inteligencia artificial. Genera, previsualiza,
              ajusta, descarga o publica desde un panel claro y rápido.
            </p>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold text-foreground">Producto</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="/#funciona" className="transition-smooth hover:text-foreground">
                  Cómo funciona
                </a>
              </li>
              <li>
                <Link to="/pricing" className="transition-smooth hover:text-foreground">
                  Precios
                </Link>
              </li>
              <li>
                <a href="/#ejemplos" className="transition-smooth hover:text-foreground">
                  Ejemplos
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold text-foreground">Cuenta</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/login" className="transition-smooth hover:text-foreground">
                  Iniciar sesión
                </Link>
              </li>
              <li>
                <Link to="/signup" className="transition-smooth hover:text-foreground">
                  Crear cuenta
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-border/60 pt-6 text-xs text-muted-foreground md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} Sitea.ai · Todos los derechos reservados</p>
          <p>Diseñado para autónomos, freelancers y pequeños negocios</p>
        </div>
      </div>
    </footer>
  );
}
