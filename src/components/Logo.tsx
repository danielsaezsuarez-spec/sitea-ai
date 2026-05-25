import { Link } from "@tanstack/react-router";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      to="/"
      className={`inline-flex items-center gap-3 font-semibold text-foreground transition-smooth hover:opacity-90 ${className}`}
    >
      <span className="relative grid h-11 w-11 place-items-center overflow-hidden rounded-[18px] border border-white/70 bg-[linear-gradient(135deg,oklch(0.45_0.22_286),oklch(0.58_0.26_296),oklch(0.72_0.22_316))] text-white shadow-[0_18px_38px_-16px_oklch(0.5_0.24_294/0.7)]">
        <span className="absolute inset-0 bg-[radial-gradient(circle_at_35%_20%,oklch(1_0_0/0.52),transparent_42%)]" />
        <span className="absolute inset-[5px] rounded-full border border-white/22" />
        <span className="relative text-lg font-black tracking-tight">S</span>
      </span>

      <span className="text-[1.15rem] font-extrabold tracking-tight text-[oklch(0.28_0.05_286)]">
        Sitea<span className="text-[oklch(0.55_0.24_294)]">.</span>ai
      </span>
    </Link>
  );
}
