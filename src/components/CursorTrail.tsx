import { useEffect, useRef } from "react";
import { useTheme } from "@/hooks/useTheme";

export function CursorTrail() {
  const { theme } = useTheme();
  const ref = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const raf = useRef<number | null>(null);
  const fadeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (theme !== "dark") return;
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const onMove = (e: MouseEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
      el.style.opacity = "1";
      if (fadeTimer.current) clearTimeout(fadeTimer.current);
      fadeTimer.current = setTimeout(() => { el.style.opacity = "0"; }, 100);
    };

    const tick = () => {
      // 80ms lag ≈ ~0.08 lerp factor at 60fps
      current.current.x += (target.current.x - current.current.x) * 0.18;
      current.current.y += (target.current.y - current.current.y) * 0.18;
      el.style.transform = `translate(${current.current.x - 2}px, ${current.current.y - 2}px)`;
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (raf.current) cancelAnimationFrame(raf.current);
      if (fadeTimer.current) clearTimeout(fadeTimer.current);
    };
  }, [theme]);

  if (theme !== "dark") return null;
  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[100] h-1 w-1"
      style={{
        background: "var(--glow-primary)",
        boxShadow: "0 0 8px var(--glow-primary)",
        opacity: 0,
        transition: "opacity 300ms ease-out",
      }}
    />
  );
}
