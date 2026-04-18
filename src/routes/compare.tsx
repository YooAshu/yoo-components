import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { COMPONENTS } from "@/data/components";
import { CodeBlock } from "@/components/CodeBlock";
import { ComposeLogo, FlutterLogo, RNLogo } from "@/components/PixelIcons";
import { isStub } from "@/components/FrameworkDots";

export const Route = createFileRoute("/compare")({
  head: () => ({
    meta: [
      { title: "Compare Frameworks — YooComponents" },
      { name: "description", content: "Side-by-side Compose, Flutter, and React Native code for any component." },
      { property: "og:title", content: "Framework Compare — YooComponents" },
      { property: "og:description", content: "See the same component implemented in three frameworks." },
    ],
  }),
  component: ComparePage,
});

const candidates = COMPONENTS.filter(
  (c) =>
    !isStub(c.frameworks.compose) &&
    !isStub(c.frameworks.flutter) &&
    !isStub(c.frameworks.reactNative),
);

function ComparePage() {
  const [slug, setSlug] = useState(candidates[0]?.slug ?? "");
  const c = candidates.find((x) => x.slug === slug) ?? candidates[0];

  if (!c) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center font-pixel text-[10px] text-muted-foreground">
        NO COMPARABLE COMPONENTS YET
      </div>
    );
  }

  const lines = (s: string) => s.split("\n").length;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 md:px-6">
      <div className="mb-6">
        <span className="pixel-badge text-muted-foreground">[ COMPARE ]</span>
        <h1 className="mt-3 font-pixel text-xs text-foreground md:text-sm">COMPARE FRAMEWORKS</h1>
      </div>

      <div className="mb-8 flex items-center gap-3">
        <span className="font-vt text-base text-muted-foreground">COMPONENT</span>
        <select
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          className="border-2 border-border bg-transparent px-3 py-2 font-vt text-base text-foreground"
        >
          {candidates.map((x) => (
            <option key={x.slug} value={x.slug} style={{ background: "var(--background)" }}>
              {x.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <FwColumn
          name="Jetpack Compose"
          color="var(--glow-compose)"
          Logo={ComposeLogo}
          code={c.frameworks.compose!}
          filename={`${c.name.replace(/\s+/g, "")}.kt`}
          lang="kotlin"
          concept="STATE: remember { mutableStateOf() }"
          loc={lines(c.frameworks.compose!)}
        />
        <FwColumn
          name="Flutter"
          color="var(--glow-flutter)"
          Logo={FlutterLogo}
          code={c.frameworks.flutter!}
          filename={`${c.slug.replace(/-/g, "_")}.dart`}
          lang="dart"
          concept="STATE: setState((){})"
          loc={lines(c.frameworks.flutter!)}
        />
        <FwColumn
          name="React Native"
          color="var(--glow-rn)"
          Logo={RNLogo}
          code={c.frameworks.reactNative!}
          filename={`${c.name.replace(/\s+/g, "")}.tsx`}
          lang="tsx"
          concept="STATE: useState()"
          loc={lines(c.frameworks.reactNative!)}
        />
      </div>

      <section className="mt-10">
        <h2 className="mb-4 font-pixel text-[10px] text-foreground">DIFFERENCES</h2>
        <div className="glass p-6">
          <ul className="space-y-3 text-base text-foreground">
            <li className="flex gap-3"><span style={{ color: "var(--glow-primary)" }}>▸</span> Compose uses declarative composables marked with <code className="font-mono text-sm">@Composable</code>; Flutter uses <code className="font-mono text-sm">Widget</code> classes; React Native uses functional components.</li>
            <li className="flex gap-3"><span style={{ color: "var(--glow-primary)" }}>▸</span> State management: Compose <code className="font-mono text-sm">remember { "{}" }</code>, Flutter <code className="font-mono text-sm">setState</code>, RN <code className="font-mono text-sm">useState</code>.</li>
            <li className="flex gap-3"><span style={{ color: "var(--glow-primary)" }}>▸</span> Styling is type-safe and inline in Compose/Flutter, while RN uses <code className="font-mono text-sm">StyleSheet.create</code>.</li>
            <li className="flex gap-3"><span style={{ color: "var(--glow-primary)" }}>▸</span> Material 3 ships natively in Compose & Flutter; RN typically pulls a UI library like <code className="font-mono text-sm">react-native-paper</code>.</li>
          </ul>
        </div>
      </section>
    </div>
  );
}

function FwColumn({
  name, color, Logo, code, filename, lang, concept, loc,
}: {
  name: string; color: string; Logo: React.ComponentType<{ size?: number }>;
  code: string; filename: string; lang: "kotlin" | "dart" | "tsx"; concept: string; loc: number;
}) {
  return (
    <div className="glass overflow-hidden" style={{ borderTop: `4px solid ${color}` }}>
      <div className="flex items-center justify-between border-b p-3" style={{ borderColor: "var(--glass-border)" }}>
        <div className="flex items-center gap-2">
          <Logo size={20} />
          <div className="font-vt text-lg text-foreground">{name}</div>
        </div>
        <span className="pixel-badge" style={{ color, borderColor: color }}>{loc} LOC</span>
      </div>
      <div className="px-3 py-2 font-vt text-sm text-muted-foreground">{concept}</div>
      <div className="p-3 pt-0">
        <CodeBlock code={code} lang={lang} filename={filename} maxHeight={420} />
      </div>
    </div>
  );
}
