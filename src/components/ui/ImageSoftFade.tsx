import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Wraps imagery with a soft radial fade so edges blend into the layout. */
export function ImageSoftFade({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("img-soft-fade relative overflow-hidden rounded-[inherit]", className)}>{children}</div>;
}
