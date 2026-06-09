"use client";

import React from "react";

type Theme = "light" | "dark";

const STORAGE_KEY = "portfolio-theme";
const DARK_MODE_DISABLED = true;

type ThemeContextValue = {
  theme: Theme;
  mounted: boolean;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
};

const ThemeContext = React.createContext<ThemeContextValue | null>(null);

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  const resolvedTheme = DARK_MODE_DISABLED ? "light" : theme;

  root.classList.toggle("dark", resolvedTheme === "dark");
  root.dataset.theme = resolvedTheme;
  root.style.colorScheme = resolvedTheme;
}

function getInitialTheme(): Theme {
  if (DARK_MODE_DISABLED) {
    return "light";
  }

  if (typeof window === "undefined") {
    return "light";
  }

  try {
    const storedTheme = window.localStorage.getItem(STORAGE_KEY);
    if (storedTheme === "dark" || storedTheme === "light") {
      return storedTheme;
    }
  } catch {
    // Ignore storage access failures and fall back to system preference.
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = React.useState<Theme>("light");
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    const nextTheme = getInitialTheme();
    setThemeState(nextTheme);
    applyTheme(nextTheme);
    setMounted(true);
  }, []);

  React.useEffect(() => {
    if (DARK_MODE_DISABLED) {
      setThemeState("light");
      applyTheme("light");
      setMounted(true);
      return;
    }

    const onStorage = (event: StorageEvent) => {
      if (event.key !== STORAGE_KEY) {
        return;
      }

      const nextTheme = event.newValue === "dark" ? "dark" : "light";
      setThemeState(nextTheme);
      applyTheme(nextTheme);
    };

    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const setTheme = React.useCallback((nextTheme: Theme) => {
    const resolvedTheme = DARK_MODE_DISABLED ? "light" : nextTheme;
    setThemeState(resolvedTheme);
    applyTheme(resolvedTheme);

    try {
      window.localStorage.setItem(STORAGE_KEY, resolvedTheme);
    } catch {
      // Ignore write failures so theme changes still work in memory.
    }
  }, []);

  const toggleTheme = React.useCallback(() => {
    if (DARK_MODE_DISABLED) {
      setThemeState("light");
      applyTheme("light");
      return;
    }

    setThemeState((currentTheme) => {
      const nextTheme = currentTheme === "dark" ? "light" : "dark";
      applyTheme(nextTheme);

      try {
        window.localStorage.setItem(STORAGE_KEY, nextTheme);
      } catch {
        // Ignore write failures so theme changes still work in memory.
      }

      return nextTheme;
    });
  }, []);

  const value = React.useMemo(
    () => ({ theme, mounted, setTheme, toggleTheme }),
    [mounted, setTheme, theme, toggleTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
}
