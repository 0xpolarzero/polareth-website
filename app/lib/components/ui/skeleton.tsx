import { cn } from "~/lib/utils";

export const Skeleton = ({ className }: { className?: string }) => {
  return <div className={cn("bg-foreground/10 h-4 w-full animate-pulse rounded-xs", className)} />;
};
