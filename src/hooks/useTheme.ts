import { useEffect, useState } from "react";

export type Theme = "dark" | "light";

export function useTheme() {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    // Initial load
    const stored = (localStorage.getItem("yoo-theme") as Theme | null) ?? "dark";
    setTheme(stored);
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(stored);

    // Sync state across different components using this hook
    const handleThemeChange = (e: Event) => {
      const customEvent = e as CustomEvent<Theme>;
      setTheme(customEvent.detail);
    };

    window.addEventListener("yoo-theme-change", handleThemeChange);
    return () => window.removeEventListener("yoo-theme-change", handleThemeChange);
  }, []);

  const toggle = () => {
    const stored = (localStorage.getItem("yoo-theme") as Theme | null) ?? "dark";
    const next: Theme = stored === "dark" ? "light" : "dark";
    
    // Update DOM & LocalStorage
    localStorage.setItem("yoo-theme", next);
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(next);
    
    // Notify all components that use this hook to update their state
    window.dispatchEvent(new CustomEvent("yoo-theme-change", { detail: next }));
  };

  return { theme, toggle };
}
