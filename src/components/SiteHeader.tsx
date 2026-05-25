import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-store";

export function SiteHeader() {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/70 bg-white/72 shadow-[0_10px_36px_-28px_oklch(0.42_0.16_292/0.45)] backdrop-blur-2xl supports-[backdrop-filter]:bg-white/64">
      <div className="container mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <div className="flex items-center gap-10">
          <Logo />

          <nav className="hidden items-center gap-8 md:flex">
            <a
              href="/#funciona"
              className="text-sm font-semibold text-muted-foreground transition-smooth hover:text-foreground"
            >
              Cómo funciona
            </a>
            <a
              href="/#ventajas"
              className="text-sm font-semibold text-muted-foreground transition-smooth hover:text-foreground"
            >
              Ventajas
            </a>
            <a
              href="/#ejemplos"
              className="text-sm font-semibold text-muted-foreground transition-smooth hover:text-foreground"
            >
              Ejemplos
            </a>
            <Link
              to="/pricing"
              className="text-sm font-semibold text-muted-foreground transition-smooth hover:text-foreground"
            >
              Precios
            </Link>
            <a
              href="/#faq"
              className="text-sm font-semibold text-muted-foreground transition-smooth hover:text-foreground"
            >
              FAQ
            </a>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          {user ? (
            <Button
              asChild
              variant="outline"
              size="lg"
              className="hidden h-11 rounded-2xl px-6 font-bold sm:inline-flex"
            >
              <Link to="/app">Ir al panel</Link>
            </Button>
          ) : (
            <>
              <Button asChild variant="ghost" size="sm" className="hidden px-4 sm:inline-flex">
                <Link to="/login">Iniciar sesión</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-11 rounded-2xl px-6 font-bold shadow-glow"
              >
                <Link to="/signup">Ir al panel</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
