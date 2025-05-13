import { useEffect, useState } from "react";

import { Icons } from "~/lib/components/icons";
import { useTheme } from "~/lib/providers/theme-provider";
import { cn } from "~/lib/utils";

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Ensure component is mounted to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <button
        onClick={() => setTheme("light")}
        className={cn(
          theme === "light" ? "bg-primary text-primary-foreground" : "hover:bg-accent opacity-50 hover:opacity-100",
          "flex h-8 w-8 cursor-pointer items-center justify-center rounded-xs transition-all",
        )}
        aria-label="Light mode"
      >
        <Icons.Sun />
      </button>

      <button
        onClick={() => setTheme("dark")}
        className={cn(
          theme === "dark" ? "bg-primary text-primary-foreground" : "hover:bg-accent opacity-50 hover:opacity-100",
          "flex h-8 w-8 cursor-pointer items-center justify-center rounded-xs transition-all",
        )}
        aria-label="Dark mode"
      >
        <Icons.Moon />
      </button>

      <button
        onClick={() => setTheme("system")}
        className={cn(
          theme === "system" ? "bg-primary text-primary-foreground" : "hover:bg-accent opacity-50 hover:opacity-100",
          "flex h-8 w-8 cursor-pointer items-center justify-center rounded-xs transition-all",
        )}
        aria-label="System mode"
      >
        <Icons.System />
      </button>
    </>
  );
};
