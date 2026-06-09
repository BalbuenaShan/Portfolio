"use client";

import { MoonStar, SunMedium } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";

export default function ThemeToggle() {
  const { mounted, theme, toggleTheme } = useTheme();
  const isDark = mounted ? theme === "dark" : false;

  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={isDark}
      className="rounded-full border-border bg-surface/80 text-muted-foreground shadow-sm backdrop-blur-md hover:bg-surface-elevated hover:text-foreground"
    >
      {isDark ? <SunMedium className="size-4" /> : <MoonStar className="size-4" />}
    </Button>
  );
}
