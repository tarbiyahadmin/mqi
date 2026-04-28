import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-[0.92rem] font-semibold ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "border border-primary/70 bg-gradient-to-br from-[hsl(155_56%_36%)] via-[hsl(156_52%_33%)] to-[hsl(45_55%_48%)] text-white shadow-[0_0_22px_hsl(var(--primary)/0.2)] hover:brightness-[1.04]",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-primary/70 bg-gradient-to-r from-[hsl(156_54%_34%)] via-[hsl(154_51%_31%)] to-[hsl(45_53%_49%)] text-white shadow-[0_0_20px_hsl(var(--primary)/0.18)] hover:brightness-[1.04]",
        secondary:
          "border border-primary/70 bg-gradient-to-br from-[hsl(45_56%_51%)] via-[hsl(43_60%_47%)] to-[hsl(155_52%_32%)] text-white shadow-[0_0_22px_hsl(var(--accent)/0.2)] hover:brightness-[1.04]",
        ghost:
          "border border-primary/70 bg-gradient-to-r from-[hsl(156_53%_34%)] via-[hsl(45_52%_49%)] to-[hsl(154_50%_31%)] text-white shadow-[0_0_18px_hsl(var(--accent)/0.18)] hover:brightness-[1.04]",
        link: "text-primary underline-offset-4 hover:underline hover:text-primary/85",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-lg px-3 text-sm",
        lg: "h-11 rounded-xl px-7 text-sm md:text-[0.95rem]",
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
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size }), className)} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
