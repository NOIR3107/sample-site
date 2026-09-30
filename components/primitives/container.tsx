import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** 1440px cap, 24px gutters on mobile, 48px from lg up. */
export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-page px-6 lg:px-12", className)}>
      {children}
    </div>
  );
}
