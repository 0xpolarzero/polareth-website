import { SVGProps } from "react";

import { Icons } from "~/lib/components/icons";
import { cn } from "~/lib/utils";

import { Badge } from "./badge";

type IconName = keyof typeof Icons;

interface IconLinkProps {
  href: string;
  icon: IconName;
  label: string;
  className?: string;
  iconProps?: SVGProps<SVGSVGElement>;
  type?: "badge" | "button";
}

export const IconLink = ({ href, icon, label, className = "", iconProps, type = "badge" }: IconLinkProps) => {
  const Icon = Icons[icon];
  if (type === "badge") {
    return (
      <Badge
        variant="accent"
        className={cn(
          "hover:bg-accent hover:text-accent-foreground font-medium transition-colors duration-300",
          className,
        )}
      >
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="inline-flex items-center gap-2"
        >
          <Icon className="size-4" {...iconProps} />
          <span>{label}</span>
        </a>
      </Badge>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={cn(
        "hover:bg-accent flex h-8 w-8 cursor-pointer items-center justify-center rounded-xs transition-colors",
        className,
      )}
    >
      <Icon className="size-4" {...iconProps} />
    </a>
  );
};
