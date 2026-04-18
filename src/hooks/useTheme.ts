import { useEffect, useState } from "react";

export type Theme = "dark" | "light";

export function useTheme() {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const stored = (localStorage.getItem("yoo-theme") as Theme | null) ?? "dark";
    setTheme(stored);
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(stored);
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("yoo-theme", next);
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(next);
  };

  return { theme, toggle };
}
