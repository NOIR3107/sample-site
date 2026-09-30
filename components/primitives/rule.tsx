import { cn } from "@/lib/cn";

export function Rule({ className }: { className?: string }) {
  return <hr className={cn("h-px w-full border-0 bg-mc-line", className)} />;
}
