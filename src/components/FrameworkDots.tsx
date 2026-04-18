import type { Component } from "@/data/components";

const STUB_PREFIX = "// Coming soon";

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
      {dot("var(--glow-compose)", !!f.compose && !f.compose.startsWith(STUB_PREFIX), "Compose")}
      {dot("var(--glow-flutter)", !!f.flutter && !f.flutter.startsWith(STUB_PREFIX), "Flutter")}
      {dot("var(--glow-rn)", !!f.reactNative && !f.reactNative.startsWith(STUB_PREFIX), "React Native")}
    </span>
  );
}

export function isStub(code: string | null) {
  return !code || code.startsWith(STUB_PREFIX);
}
