import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "~/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-xs",
  {
    variants: {
      variant: {
        default: "border-border bg-muted text-muted-foreground hover:bg-muted/80",
        secondary: "border-border bg-secondary text-secondary-foreground hover:bg-secondary/80",
        accent: "border-accent bg-accent/10 text-accent-foreground hover:bg-accent/20",
        outline: "border-border text-foreground hover:bg-muted",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
