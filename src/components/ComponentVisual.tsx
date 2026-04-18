import type { Component } from "@/data/components";

/* Pixel-art SVG mockup that varies by category */
export function ComponentVisual({ component, height = 160 }: { component: Component; height?: number }) {
  const c = component.category;
  return (
    <div
      className="relative flex w-full items-center justify-center overflow-hidden"
      style={{
        height,
        background:
          "linear-gradient(135deg, oklch(0.12 0.07 295) 0%, oklch(0.08 0.05 290) 100%)",
        borderBottom: "1px solid var(--glass-border)",
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle, oklch(0.6 0.28 305 / 0.2) 1px, transparent 1px)",
          backgroundSize: "12px 12px",
        }}
      />
      {c === "buttons" && <ButtonVisual />}
      {c === "navigation" && <NavVisual />}
      {c === "cards" && <CardVisual />}
      {c === "inputs" && <InputVisual />}
      {c === "dialogs" && <DialogVisual />}
      {c === "feedback" && <FeedbackVisual />}
      {c === "chips" && <ChipVisual />}
      {c === "appbars" && <AppBarVisual />}
      {c === "lists" && <ListVisual />}
      {c === "typography" && <TypoVisual />}
      {c === "layout" && <LayoutVisual />}
      {c === "icons" && <IconsVisual />}
    </div>
  );
}

const PURPLE = "var(--glow-primary)";

function ButtonVisual() {
  return (
    <svg width="120" height="40" viewBox="0 0 120 40" className="pixel">
      <rect x="0" y="0" width="120" height="40" fill={PURPLE} />
      <rect x="2" y="2" width="116" height="36" fill="var(--background)" />
      <rect x="4" y="4" width="112" height="32" fill={PURPLE} />
      <rect x="40" y="16" width="40" height="8" fill="white" />
    </svg>
  );
}
function NavVisual() {
  return (
    <svg width="160" height="60" viewBox="0 0 160 60" className="pixel">
      <rect x="0" y="40" width="160" height="20" fill={PURPLE} opacity="0.2" />
      <rect x="0" y="40" width="160" height="2" fill={PURPLE} />
      {[20, 60, 100, 140].map((x, i) => (
        <g key={i}>
          <rect x={x - 8} y="46" width="16" height="6" fill={PURPLE} opacity={i === 0 ? 1 : 0.5} />
        </g>
      ))}
    </svg>
  );
}
function CardVisual() {
  return (
    <svg width="140" height="80" viewBox="0 0 140 80" className="pixel">
      <rect x="0" y="0" width="140" height="80" fill={PURPLE} opacity="0.2" />
      <rect x="0" y="0" width="140" height="2" fill={PURPLE} />
      <rect x="0" y="78" width="140" height="2" fill={PURPLE} />
      <rect x="0" y="0" width="2" height="80" fill={PURPLE} />
      <rect x="138" y="0" width="2" height="80" fill={PURPLE} />
      <rect x="10" y="10" width="60" height="6" fill="white" />
      <rect x="10" y="22" width="100" height="3" fill="white" opacity="0.5" />
      <rect x="10" y="30" width="80" height="3" fill="white" opacity="0.5" />
      <rect x="10" y="60" width="30" height="10" fill={PURPLE} />
    </svg>
  );
}
function InputVisual() {
  return (
    <svg width="160" height="40" viewBox="0 0 160 40" className="pixel">
      <rect x="0" y="10" width="160" height="20" fill="none" stroke={PURPLE} strokeWidth="2" />
      <rect x="8" y="18" width="40" height="4" fill="white" opacity="0.7" />
      <rect x="8" y="6" width="20" height="6" fill={PURPLE} />
      <rect x="9" y="7" width="18" height="4" fill="var(--background)" />
      <rect x="11" y="8" width="14" height="2" fill="white" />
    </svg>
  );
}
function DialogVisual() {
  return (
    <svg width="120" height="100" viewBox="0 0 120 100" className="pixel">
      <rect x="0" y="0" width="120" height="100" fill="black" opacity="0.3" />
      <rect x="10" y="20" width="100" height="60" fill="var(--background)" stroke={PURPLE} strokeWidth="2" />
      <rect x="20" y="30" width="50" height="6" fill="white" />
      <rect x="20" y="42" width="80" height="3" fill="white" opacity="0.5" />
      <rect x="20" y="48" width="60" height="3" fill="white" opacity="0.5" />
      <rect x="60" y="62" width="20" height="10" fill="transparent" stroke={PURPLE} />
      <rect x="84" y="62" width="20" height="10" fill={PURPLE} />
    </svg>
  );
}
function FeedbackVisual() {
  return (
    <svg width="160" height="40" viewBox="0 0 160 40" className="pixel">
      <rect x="0" y="14" width="160" height="14" fill={PURPLE} opacity="0.85" />
      <rect x="8" y="20" width="60" height="3" fill="white" />
      <rect x="120" y="18" width="32" height="6" fill="white" opacity="0.4" />
    </svg>
  );
}
function ChipVisual() {
  return (
    <svg width="160" height="40" viewBox="0 0 160 40" className="pixel">
      {[0, 50, 100].map((x, i) => (
        <g key={i}>
          <rect x={x + 4} y="14" width="40" height="14" fill={i === 1 ? PURPLE : "transparent"} stroke={PURPLE} strokeWidth="2" />
          <rect x={x + 12} y="20" width="24" height="3" fill={i === 1 ? "white" : PURPLE} />
        </g>
      ))}
    </svg>
  );
}
function AppBarVisual() {
  return (
    <svg width="160" height="40" viewBox="0 0 160 40" className="pixel">
      <rect x="0" y="6" width="160" height="20" fill={PURPLE} opacity="0.4" />
      <rect x="0" y="6" width="160" height="2" fill={PURPLE} />
      <rect x="6" y="14" width="8" height="4" fill="white" />
      <rect x="20" y="14" width="60" height="4" fill="white" />
      <rect x="146" y="14" width="6" height="4" fill="white" />
    </svg>
  );
}
function ListVisual() {
  return (
    <svg width="160" height="80" viewBox="0 0 160 80" className="pixel">
      {[10, 30, 50, 70].map((y, i) => (
        <g key={i}>
          <rect x="6" y={y - 2} width="6" height="6" fill={PURPLE} />
          <rect x="20" y={y - 2} width="80" height="3" fill="white" />
          <rect x="20" y={y + 2} width="50" height="2" fill="white" opacity="0.5" />
          <rect x="0" y={y + 8} width="160" height="1" fill={PURPLE} opacity="0.2" />
        </g>
      ))}
    </svg>
  );
}
function TypoVisual() {
  return (
    <svg width="160" height="80" viewBox="0 0 160 80" className="pixel">
      <rect x="6" y="6" width="100" height="12" fill={PURPLE} />
      <rect x="6" y="24" width="80" height="6" fill="white" />
      <rect x="6" y="36" width="120" height="3" fill="white" opacity="0.6" />
      <rect x="6" y="44" width="100" height="3" fill="white" opacity="0.6" />
      <rect x="6" y="52" width="60" height="3" fill="white" opacity="0.6" />
    </svg>
  );
}
function LayoutVisual() {
  return (
    <svg width="160" height="80" viewBox="0 0 160 80" className="pixel">
      <rect x="6" y="6" width="148" height="10" fill={PURPLE} />
      <rect x="6" y="20" width="60" height="54" fill={PURPLE} opacity="0.3" />
      <rect x="70" y="20" width="84" height="26" fill={PURPLE} opacity="0.3" />
      <rect x="70" y="50" width="84" height="24" fill={PURPLE} opacity="0.3" />
    </svg>
  );
}
function IconsVisual() {
  return (
    <svg width="120" height="40" viewBox="0 0 120 40" className="pixel">
      {[10, 40, 70, 100].map((x, i) => (
        <g key={i}>
          <rect x={x - 8} y="12" width="16" height="16" fill={PURPLE} opacity="0.3" />
          <rect x={x - 4} y="16" width="8" height="8" fill={PURPLE} />
        </g>
      ))}
    </svg>
  );
}
