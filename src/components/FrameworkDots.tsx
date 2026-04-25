import type { Component } from "@/data/types";

export function isStub(fw: import("@/data/types").ComponentFrameworkCode | null) {
  return !fw || !fw.component;
}

export function FrameworkDots({ component, size = 8 }: { component: Component; size?: number }) {
  const dot = (color: string, available: boolean, label: string) => (
    <span
      key={label}
      title={`${label}: ${available ? "Available" : "Coming soon"}`}
      style={{
        width: size,
        height: size,
        background: available ? color : "oklch(0.4 0.02 290)",
        boxShadow: available ? `0 0 6px ${color}` : "none",
        display: "inline-block",
      }}
    />
  );

  const f = component.frameworks;
  return (
    <span className="inline-flex items-center gap-1.5">
      {dot("var(--glow-compose)", !isStub(f.compose), "Compose")}
      {dot("var(--glow-flutter)", !isStub(f.flutter), "Flutter")}
      {dot("var(--glow-rn)", !isStub(f.reactNative), "React Native")}
    </span>
  );
}
