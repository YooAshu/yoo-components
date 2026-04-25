import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { CATEGORIES, getBySlug, getRelated } from "@/data/components";
import type { ComponentCategory, ComponentFrameworkCode } from "@/data/types";
import { ComponentVisual } from "@/components/ComponentVisual";
import { CodeBlock } from "@/components/CodeBlock";
import { ComponentCard } from "@/components/ComponentCard";
import { FrameworkDots, isStub } from "@/components/FrameworkDots";
import {
  ComposeLogo,
  FlutterLogo,
  PxArrow,
  PxGithub,
  PxMoon,
  PxStar,
  PxSun,
  RNLogo,
} from "@/components/PixelIcons";

export const Route = createFileRoute("/components/$category/$slug")({
  loader: ({ params }) => {
    const component = getBySlug(params.slug);
    if (!component || component.category !== params.category) throw notFound();
    return { component };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.component.name} — YooComponents` },
          { name: "description", content: loaderData.component.description },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-4 py-24 text-center">
      <h1 className="font-pixel text-xs text-foreground">COMPONENT NOT FOUND</h1>
      <Link to="/components" className="pixel-btn mt-6 inline-flex">
        BACK TO BROWSER
      </Link>
    </div>
  ),
  component: DetailPage,
});

type FwKey = "compose" | "flutter" | "reactNative";
type CodeTab = "component" | "imports" | "gradle" | "resources";

const FW_TABS: {
  key: FwKey;
  label: string;
  lang: "kotlin" | "dart" | "tsx";
  ext: string;
  Logo: React.ComponentType<{ size?: number }>;
}[] = [
  { key: "compose", label: "COMPOSE", lang: "kotlin", ext: "kt", Logo: ComposeLogo },
  { key: "flutter", label: "FLUTTER", lang: "dart", ext: "dart", Logo: FlutterLogo },
  { key: "reactNative", label: "REACT NATIVE", lang: "tsx", ext: "tsx", Logo: RNLogo },
];

const CODE_TABS: { key: CodeTab; label: string }[] = [
  { key: "component", label: "COMPONENT" },
  { key: "imports", label: "IMPORTS" },
  { key: "gradle", label: "DEPS" },
  { key: "resources", label: "RESOURCES" },
];

const FW_COLOR: Record<FwKey, string> = {
  compose: "var(--glow-compose)",
  flutter: "var(--glow-flutter)",
  reactNative: "var(--glow-rn)",
};

function buildHowTo(name: string, fw: FwKey): string {
  const cls = name.replace(/\s+/g, "");
  if (fw === "compose")
    return `@Composable
fun ExampleScreen() {
    ${cls}(
        text = "Hello World",
        onClick = { /* your action here */ }
    )
}`;
  if (fw === "flutter")
    return `class ExampleScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return ${cls}(
      text: 'Hello World',
      onPressed: () {},
    );
  }
}`;
  return `export default function ExampleScreen() {
  return (
    <${cls}
      text="Hello World"
      onPress={() => {}}
    />
  );
}`;
}

// ── Framework tab bar (shared) ────────────────────────────────────────────────
function FrameworkTabs({
  active,
  onSelect,
  available,
}: {
  active: FwKey;
  onSelect: (k: FwKey) => void;
  available: Record<FwKey, boolean>;
}) {
  return (
    <div className="flex flex-wrap gap-1 mb-2">
      {FW_TABS.map((t) => {
        const isActive = active === t.key;
        const unavailable = !available[t.key];
        return (
          <button
            key={t.key}
            onClick={() => onSelect(t.key)}
            className="relative flex items-center gap-2 px-3 py-2 font-pixel text-[8px] border-2 transition-all"
            style={{
              background: isActive ? FW_COLOR[t.key] : "transparent",
              color: isActive ? "white" : unavailable ? "var(--text-muted)" : "var(--foreground)",
              borderColor: isActive ? FW_COLOR[t.key] : "var(--border)",
              opacity: unavailable && !isActive ? 0.5 : 1,
            }}
          >
            <t.Logo size={14} />
            {t.label}
            {unavailable && <span className="ml-1 opacity-60">(SOON)</span>}
            {isActive && (
              <span
                aria-hidden
                className="absolute -bottom-[2px] left-0 right-0 h-[2px]"
                style={{ background: FW_COLOR[t.key] }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}

// ── Code section tab bar ──────────────────────────────────────────────────────
function CodeSectionTabs({
  active,
  onSelect,
  fwData,
  fw,
}: {
  active: CodeTab;
  onSelect: (k: CodeTab) => void;
  fwData: ComponentFrameworkCode | null;
  fw: FwKey;
}) {
  const depsLabel: Record<FwKey, string> = {
    compose: "DEPS (gradle)",
    flutter: "DEPS (pubspec)",
    reactNative: "DEPS (npm)",
  };
  // only show tabs that have actual content
  const available: Record<CodeTab, boolean> = {
    component: !!fwData?.component,
    imports: !!fwData?.imports,
    gradle: !!fwData?.gradle,
    resources: !!(
      fwData?.resources?.colorsDay ||
      fwData?.resources?.colorsNight ||
      fwData?.resources?.fonts?.length ||
      fwData?.resources?.drawables?.length ||
      fwData?.resources?.extras
    ),
  };

  return (
    <div className="flex flex-wrap gap-1 mb-2">
      {CODE_TABS.map((t) => {
        const isActive = active === t.key;
        const unavailable = !available[t.key];
        return (
          <button
            key={t.key}
            onClick={() => available[t.key] && onSelect(t.key)}
            className="px-3 py-1 font-pixel text-[7px] border transition-all"
            style={{
              background: isActive ? "var(--glow-primary)" : "transparent",
              color: isActive ? "white" : unavailable ? "var(--text-muted)" : "var(--foreground)",
              borderColor: isActive ? "var(--glow-primary)" : "var(--border)",
              opacity: unavailable ? 0.4 : 1,
              cursor: unavailable ? "not-allowed" : "pointer",
            }}
          >
            {t.key === "gradle" ? depsLabel[fw] : t.label}
          </button>
        );
      })}
    </div>
  );
}

// ── Resources block ───────────────────────────────────────────────────────────
function ResourcesBlock({ fw, fwKey }: { fw: ComponentFrameworkCode; fwKey: FwKey }) {
  const lang = fwKey === "compose" ? "kotlin" : fwKey === "flutter" ? "dart" : "tsx";
  const r = fw.resources;
  if (!r)
    return (
      <div className="glass p-6 text-center font-vt text-base text-muted-foreground">
        No extra resources needed for this component.
      </div>
    );

  return (
    <div className="flex flex-col gap-4">
      {r.colorsDay && (
        <CodeBlock
          code={r.colorsDay}
          lang="xml"
          filename="res/values/colors.xml"
          framework={fwKey}
        />
      )}
      {r.colorsNight && (
        <CodeBlock
          code={r.colorsNight}
          lang="xml"
          filename="res/values-night/colors.xml"
          framework={fwKey}
        />
      )}
      {r.drawables?.map((d) => (
        <CodeBlock
          key={d.filename}
          code={d.code}
          lang="xml"
          filename={`res/drawable/${d.filename}`}
          framework={fwKey}
        />
      ))}
      {r.fonts?.map((f) => (
        <div key={f.filename} className="glass p-4 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="font-vt text-base text-foreground">{f.filename}</span>
            <a
              href={f.downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="pixel-btn text-[7px] px-2 py-1"
            >
              DOWNLOAD ↗
            </a>
          </div>
          {f.xmlSetup && (
            <CodeBlock code={f.xmlSetup} lang="xml" filename="font_setup" framework={fwKey} />
          )}
        </div>
      ))}

      {r.extras && <CodeBlock code={r.extras} lang="yaml" filename="extras" framework={fwKey} />}
    </div>
  );
}

// ── Main code panel (component + imports + gradle + resources) ────────────────
function CodePanel({
  fw,
  fwKey,
  codeTab,
  onCodeTab,
}: {
  fw: ComponentFrameworkCode | null;
  fwKey: FwKey;
  codeTab: CodeTab;
  onCodeTab: (t: CodeTab) => void;
}) {
  const tabMeta = FW_TABS.find((t) => t.key === fwKey)!;

  if (!fw)
    return (
      <div className="glass flex h-[280px] flex-col items-center justify-center text-center p-8">
        <span className="font-pixel text-[10px] text-muted-foreground">CODE COMING SOON</span>
      </div>
    );

  return (
    <div>
      <CodeSectionTabs active={codeTab} onSelect={onCodeTab} fwData={fw} fw={fwKey} />
      {codeTab === "component" && fw.component && (
        <CodeBlock
          code={fw.component}
          lang={tabMeta.lang}
          filename={`Component.${tabMeta.ext}`}
          framework={fwKey}
        />
      )}
      {codeTab === "imports" && fw.imports && (
        <CodeBlock code={fw.imports} lang={tabMeta.lang} filename="Imports.kt" framework={fwKey} />
      )}
      {codeTab === "gradle" && fw.gradle && (
        <CodeBlock code={fw.gradle} lang="kotlin" filename="build.gradle.kts" framework={fwKey} />
      )}
      {codeTab === "resources" && <ResourcesBlock fw={fw} fwKey={fwKey} />}
    </div>
  );
}

// ── Detail page ───────────────────────────────────────────────────────────────
function DetailPage() {
  const { component } = Route.useLoaderData();
  const params = Route.useParams();
  const cat = CATEGORIES.find((c) => c.key === (params.category as ComponentCategory));

  const available: Record<FwKey, boolean> = {
    compose: !!component.frameworks.compose,
    flutter: !!component.frameworks.flutter,
    reactNative: !!component.frameworks.reactNative,
  };

  const initial: FwKey = available.compose
    ? "compose"
    : available.flutter
      ? "flutter"
      : "reactNative";

  // SHARED state — framework tab drives EVERYTHING
  const [fw, setFw] = useState<FwKey>(initial);
  const [codeTab, setCodeTab] = useState<CodeTab>("component");
  const [previewLight, setPreviewLight] = useState(false);

  const fwData = component.frameworks[fw];
  const tabMeta = FW_TABS.find((t) => t.key === fw)!;
  const howToCode = fwData?.howToUse || buildHowTo(component.name, fw);
  const related = getRelated(component);

  // reset code tab when framework switches
  const handleFwChange = (k: FwKey) => {
    setFw(k);
    setCodeTab("component");
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 md:px-6">
      {/* Breadcrumb + header */}
      <div className="mb-8">
        <div className="font-vt text-sm text-muted-foreground">
          <Link to="/components" className="hover:text-foreground">
            COMPONENTS
          </Link>
          <span className="mx-2">&gt;</span>
          <span className="hover:text-foreground cursor-pointer">{cat?.label.toUpperCase()}</span>
          <span className="mx-2">&gt;</span>
          <span className="text-foreground">{component.name.toUpperCase()}</span>
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <h1 className="font-pixel text-xs md:text-sm text-foreground">
            {component.name.toUpperCase()}
          </h1>
          {component.isNew && (
            <span
              className="blink pixel-badge"
              style={{ color: "var(--glow-primary)", borderColor: "var(--glow-primary)" }}
            >
              NEW
            </span>
          )}
          <FrameworkDots component={component} size={10} />
        </div>
        <p className="mt-3 max-w-2xl text-base text-muted-foreground">{component.description}</p>
      </div>

      {/* Framework tabs — shared, outside both panels */}
      <FrameworkTabs active={fw} onSelect={handleFwChange} available={available} />

      {/*
        MAIN GRID
        Desktop: preview (left, 2/5) + code (right, 3/5) side by side
        Mobile:  stacked, preview on top
      */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mt-2 lg:items-start">
        {/* LEFT — Preview */}
        <div className="lg:col-span-2 glass overflow-hidden self-start">
          <div
            className="flex items-center justify-between border-b px-4 py-2"
            style={{ borderColor: "var(--glass-border)" }}
          >
            <span className="font-pixel text-[8px] text-muted-foreground">PREVIEW</span>
            <button
              onClick={() => setPreviewLight((v) => !v)}
              className="flex h-7 w-7 items-center justify-center border-2 border-border"
              aria-label="Toggle preview theme"
            >
              {previewLight ? <PxMoon size={12} /> : <PxSun size={12} />}
            </button>
          </div>

          <div
            className="flex min-h-[260px] items-center justify-center p-4"
            style={{
              background: previewLight ? "oklch(0.96 0.01 95)" : "oklch(0.08 0.05 290)",
            }}
          >
            {component.previewMedia ? (
              <img
                key={previewLight ? "day" : "night"} // forces re-render on switch
                src={previewLight ? component.previewMedia.day : component.previewMedia.night}
                alt={`${component.name} preview ${previewLight ? "light" : "dark"} mode`}
                className="max-h-[320px] w-full object-contain transition-opacity duration-200"
              />
            ) : (
              // fallback if no image provided yet
              <div className="flex flex-col items-center gap-3 opacity-40">
                <span className="font-pixel text-[8px] text-muted-foreground">NO PREVIEW YET</span>
                <ComponentVisual component={component} height={200} />
              </div>
            )}
          </div>
        </div>

        {/* RIGHT — Code with inner tabs */}
        <div className="lg:col-span-3">
          <CodePanel fw={fwData} fwKey={fw} codeTab={codeTab} onCodeTab={setCodeTab} />
        </div>
      </div>

      {/* HOW TO USE — shares same fw state, no extra tab switcher needed */}
      <section className="mt-12">
        <h2 className="font-pixel text-[10px] text-foreground">HOW TO USE</h2>
        <p className="mb-4 mt-2 font-vt text-base text-muted-foreground">
          Replace with your own values and logic
        </p>
        <CodeBlock
          code={howToCode}
          lang={tabMeta.lang}
          filename={`Example.${tabMeta.ext}`}
          framework={fw}
        />
      </section>

      {/* Props table */}
      {component.props.length > 0 && (
        <section className="mt-12">
          <h2 className="mb-4 font-pixel text-[10px] text-foreground">PARAMETERS</h2>
          <div className="glass overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr
                  className="font-pixel text-[8px] text-muted-foreground"
                  style={{ borderBottom: "1px solid var(--glass-border)" }}
                >
                  <th className="px-4 py-3 text-left">PARAMETER</th>
                  <th className="px-4 py-3 text-left">DEFAULT</th>
                  <th className="px-4 py-3 text-left">DETAILS</th>
                </tr>
              </thead>
              <tbody>
                {component.props.map((p, i) => (
                  <tr
                    key={p.name}
                    style={i > 0 ? { borderTop: "1px solid var(--glass-border)" } : {}}
                  >
                    <td className="px-4 py-3">
                      <div className="font-mono text-sm text-foreground">{p.name}</div>
                      <div className="font-vt text-sm" style={{ color: typeColor(p.type) }}>
                        {p.type}
                      </div>
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                      {p.default}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{p.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Usage notes */}
      {component.usageNotes && (
        <section className="mt-12">
          <h2 className="mb-4 font-pixel text-[10px] text-foreground">USAGE NOTES</h2>
          <div className="glass p-6">
            <p className="text-base leading-relaxed text-foreground">{component.usageNotes}</p>
          </div>
        </section>
      )}

      {/* Related */}
      {related.length > 0 && (
        <section className="mt-12">
          <h2 className="mb-4 font-pixel text-[10px] text-foreground">RELATED</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r, i) => (
              <ComponentCard key={r.id} component={r} index={i} />
            ))}
          </div>
        </section>
      )}

      {/* Bottom actions */}
      <section className="mt-12 grid gap-4 md:grid-cols-3">
        <div className="glass p-5">
          <div className="font-pixel text-[8px] text-muted-foreground">PREVIEW IN APP</div>
          <p className="mt-2 font-vt text-base text-foreground">Scan to open on Android.</p>
          <a
            href="https://play.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="pixel-btn pixel-btn-filled mt-4 inline-flex"
          >
            ▶ PLAY STORE
          </a>
        </div>
        <a href="#" className="glass flex items-center gap-3 p-5 hover:bg-secondary">
          <PxStar size={20} />
          <div>
            <div className="font-pixel text-[8px] text-muted-foreground">SHARE</div>
            <div className="font-vt text-base text-foreground">Copy link to component</div>
          </div>
          <PxArrow size={14} className="ml-auto" />
        </a>
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="glass flex items-center gap-3 p-5 hover:bg-secondary"
        >
          <PxGithub size={20} />
          <div>
            <div className="font-pixel text-[8px] text-muted-foreground">GITHUB</div>
            <div className="font-vt text-base text-foreground">Suggest an edit</div>
          </div>
          <PxArrow size={14} className="ml-auto" />
        </a>
      </section>
    </div>
  );
}

function typeColor(t: string) {
  const l = t.toLowerCase();
  if (l.includes("string")) return "var(--glow-compose)";
  if (l.includes("bool")) return "var(--glow-flutter)";
  if (l.includes("number") || l.includes("int") || l.includes("float")) return "var(--glow-rn)";
  return "var(--glow-primary)";
}
