import { Link } from "@tanstack/react-router";
import type { Component } from "@/data/components";
import { ComponentVisual } from "@/components/ComponentVisual";
import { FrameworkDots } from "@/components/FrameworkDots";
import { CATEGORIES } from "@/data/components";
import { PixelCorners } from "@/components/PixelCorners";

function primaryFramework(c: Component): "compose" | "flutter" | "reactNative" {
  const f = c.frameworks;
  const stub = (s: string | null) => !s || s.startsWith("// Coming soon");
  if (!stub(f.compose)) return "compose";
  if (!stub(f.flutter)) return "flutter";
  return "reactNative";
}

export function ComponentCard({ component, index = 0 }: { component: Component; index?: number }) {
  const cat = CATEGORIES.find((c) => c.key === component.category);
  const fw = primaryFramework(component);
  return (
    <Link
      to="/components/$category/$slug"
      params={{ category: component.category, slug: component.slug }}
      className="glass pixel-corners group block overflow-hidden transition-all duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5"
      data-fw={fw}
      style={{ animationDelay: `${index * 40}ms` }}
    >
      <PixelCorners />
      <ComponentVisual component={component} />
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-vt text-lg leading-tight text-foreground">{component.name}</h3>
          {component.isNew && (
            <span
              className="blink shrink-0 px-1.5 py-0.5 font-pixel text-[7px]"
              style={{
                background: "transparent",
                color: "var(--glow-primary)",
                border: "1px solid var(--glow-primary)",
              }}
            >
              NEW
            </span>
          )}
        </div>
        <div className="mt-2 flex items-center justify-between">
          <span className="pixel-badge text-muted-foreground">{cat?.label}</span>
          <FrameworkDots component={component} />
        </div>
      </div>
    </Link>
  );
}
