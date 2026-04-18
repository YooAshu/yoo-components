import { ScriptOnce } from "@tanstack/react-router";

const themeScript = `(function(){try{var t=localStorage.getItem("yoo-theme")||"dark";document.documentElement.classList.remove("light","dark");document.documentElement.classList.add(t);}catch(e){document.documentElement.classList.add("dark");}})();`;

export function ThemeScript() {
  return <ScriptOnce>{themeScript}</ScriptOnce>;
}
