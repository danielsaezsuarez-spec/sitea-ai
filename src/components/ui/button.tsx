import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-[oklch(0.5_0.23_292)] text-white shadow-[0_14px_34px_-16px_oklch(0.5_0.23_292/0.52)] hover:-translate-y-0.5 hover:bg-[oklch(0.46_0.22_292)]",
        hero: "border border-white/40 bg-[linear-gradient(135deg,oklch(0.45_0.22_286),oklch(0.58_0.26_296),oklch(0.72_0.22_316))] font-semibold text-white shadow-[0_18px_48px_-17px_oklch(0.56_0.25_294/0.68),inset_0_1px_0_oklch(1_0_0/0.36)] hover:-translate-y-0.5 hover:shadow-[0_24px_60px_-18px_oklch(0.56_0.25_294/0.78),inset_0_1px_0_oklch(1_0_0/0.42)]",
        premium:
          "border border-[oklch(0.66_0.22_304/0.38)] bg-[linear-gradient(135deg,oklch(0.22_0.06_286),oklch(0.36_0.14_292),oklch(0.48_0.18_302))] text-white shadow-[0_18px_44px_-18px_oklch(0.35_0.14_292/0.55)] hover:-translate-y-0.5",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:-translate-y-0.5 hover:bg-destructive/90",
        outline:
          "border border-[oklch(0.72_0.19_300/0.28)] bg-white/74 text-[oklch(0.36_0.13_292)] shadow-[0_10px_28px_-22px_oklch(0.42_0.16_292/0.46)] backdrop-blur-sm hover:-translate-y-0.5 hover:border-[oklch(0.62_0.23_296/0.42)] hover:bg-white/92 hover:text-[oklch(0.28_0.09_286)]",
        secondary:
          "bg-[oklch(0.946_0.036_296)] text-[oklch(0.32_0.1_292)] shadow-sm hover:-translate-y-0.5 hover:bg-[oklch(0.92_0.052_296)]",
        ghost:
          "text-[oklch(0.35_0.07_286)] hover:bg-[oklch(0.94_0.032_296)] hover:text-[oklch(0.28_0.09_286)]",
        link: "text-[oklch(0.5_0.22_292)] underline-offset-4 hover:underline",
        soft: "bg-[oklch(0.93_0.05_296)] text-[oklch(0.42_0.16_292)] hover:bg-[oklch(0.9_0.062_296)]",
      },
      size: {
        default: "h-10 px-5 py-2.5",
        sm: "h-8 rounded-lg px-3 text-xs",
        lg: "h-12 rounded-xl px-7 text-base",
        xl: "h-14 rounded-2xl px-9 text-base",
        icon: "h-10 w-10 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
