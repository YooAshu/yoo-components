import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { CATEGORIES, getBySlug, getRelated, type ComponentCategory } from "@/data/components";
import { ComponentVisual } from "@/components/ComponentVisual";
import { CodeBlock } from "@/components/CodeBlock";
import { ComponentCard } from "@/components/ComponentCard";
import { FrameworkDots, isStub } from "@/components/FrameworkDots";
import { ComposeLogo, FlutterLogo, PxArrow, PxGithub, PxMoon, PxStar, PxSun, RNLogo } from "@/components/PixelIcons";

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
          { property: "og:title", content: `${loaderData.component.name} — YooComponents` },
          { property: "og:description", content: loaderData.component.description },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-4 py-24 text-center">
      <h1 className="font-pixel text-xs text-foreground">COMPONENT NOT FOUND</h1>
      <Link to="/components" className="pixel-btn mt-6 inline-flex">BACK TO BROWSER</Link>
    </div>
  ),
  component: DetailPage,
});

type FwKey = "compose" | "flutter" | "reactNative";

function DetailPage() {
  const { component } = Route.useLoaderData();
  const params = Route.useParams();
  const cat = CATEGORIES.find((c) => c.key === (params.category as ComponentCategory));
  const [tab, setTab] = useState<FwKey>(
    !isStub(component.frameworks.compose) ? "compose"
    : !isStub(component.frameworks.flutter) ? "flutter"
    : "reactNative",
  );
  const [variant, setVariant] = useState(0);
  const [previewLight, setPreviewLight] = useState(false);

  const tabs: { key: FwKey; label: string; lang: "kotlin" | "dart" | "tsx"; ext: string; Logo: React.ComponentType<{ size?: number }> }[] = [
    { key: "compose", label: "COMPOSE", lang: "kotlin", ext: "kt", Logo: ComposeLogo },
    { key: "flutter", label: "FLUTTER", lang: "dart", ext: "dart", Logo: FlutterLogo },
    { key: "reactNative", label: "REACT NATIVE", lang: "tsx", ext: "tsx", Logo: RNLogo },
  ];

  const code = component.frameworks[tab];
  const stubbed = isStub(code);
  const filename = `${component.name.replace(/\s+/g, "")}.${tabs.find((t) => t.key === tab)?.ext}`;

  const related = getRelated(component);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 md:px-6">
      {/* Header */}
      <div className="mb-8">
        <div className="font-vt text-sm text-muted-foreground">
          <Link to="/components" className="hover:text-foreground">COMPONENTS</Link>
          <span className="mx-2">&gt;</span>
          <Link to="/components" className="hover:text-foreground">{cat?.label.toUpperCase()}</Link>
          <span className="mx-2">&gt;</span>
          <span className="text-foreground">{component.name.toUpperCase()}</span>
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <h1 className="font-pixel text-xs text-foreground md:text-sm">{component.name.toUpperCase()}</h1>
          {component.isNew && (
            <span className="blink pixel-badge" style={{ background: "var(--glow-primary)", color: "white", borderColor: "var(--glow-primary)" }}>
              NEW
            </span>
          )}
          <FrameworkDots component={component} size={10} />
        </div>
        <p className="mt-3 max-w-2xl text-base text-muted-foreground">{component.description}</p>
      </div>

      {/* Main grid */}
      <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        {/* Preview */}
        <div className="glass overflow-hidden">
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
            className="flex h-[280px] items-center justify-center"
            style={{
              background: previewLight ? "oklch(0.96 0.01 95)" : "oklch(0.08 0.05 290)",
            }}
          >
            <ComponentVisual component={component} height={200} />
          </div>
          {component.variants.length > 1 && (
            <div className="flex flex-wrap gap-2 border-t p-3" style={{ borderColor: "var(--glass-border)" }}>
              {component.variants.map((v: string, i: number) => (
                <button
                  key={v}
                  onClick={() => setVariant(i)}
                  className="font-pixel text-[8px] px-3 py-2 border-2 transition-colors"
                  style={{
                    background: variant === i ? "var(--glow-primary)" : "transparent",
                    color: variant === i ? "white" : "var(--foreground)",
                    borderColor: variant === i ? "var(--glow-primary)" : "var(--border)",
                  }}
                >
                  {v.toUpperCase()}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Code */}
        <div>
          <div className="mb-2 flex flex-wrap gap-1">
            {tabs.map((t) => {
              const unavailable = isStub(component.frameworks[t.key]);
              return (
                <button
                  key={t.key}
                  onClick={() => setTab(t.key)}
                  className="flex items-center gap-2 px-3 py-2 font-pixel text-[8px] border-2 transition-all"
                  style={{
                    background: tab === t.key ? "var(--glow-primary)" : "transparent",
                    color: tab === t.key ? "white" : (unavailable ? "var(--text-muted)" : "var(--foreground)"),
                    borderColor: tab === t.key ? "var(--glow-primary)" : "var(--border)",
                    opacity: unavailable && tab !== t.key ? 0.6 : 1,
                  }}
                >
                  <t.Logo size={14} />
                  {t.label}
                  {unavailable && <span className="ml-1 opacity-70">(SOON)</span>}
                </button>
              );
            })}
          </div>
          {stubbed ? (
            <div className="glass flex h-[280px] flex-col items-center justify-center p-8 text-center">
              <span className="font-pixel text-[10px] text-muted-foreground">CODE COMING SOON</span>
              <p className="mt-3 max-w-sm font-vt text-base text-muted-foreground">
                This component is on the roadmap for the selected framework. Check back soon or contribute on GitHub.
              </p>
            </div>
          ) : (
            <CodeBlock code={code!} lang={tabs.find((t) => t.key === tab)!.lang} filename={filename} />
          )}
        </div>
      </div>

      {/* Props table */}
      {component.props.length > 0 && (
        <section className="mt-12">
          <h2 className="mb-4 font-pixel text-[10px] text-foreground">PARAMETERS</h2>
          <div className="glass overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="font-pixel text-[8px] text-muted-foreground" style={{ borderBottom: "1px solid var(--glass-border)" }}>
                  <th className="px-4 py-3 text-left">NAME</th>
                  <th className="px-4 py-3 text-left">TYPE</th>
                  <th className="px-4 py-3 text-left">DEFAULT</th>
                  <th className="px-4 py-3 text-left">DESCRIPTION</th>
                </tr>
              </thead>
              <tbody>
                {component.props.map((p: { name: string; type: string; default: string; description: string }, i: number) => (
                  <tr key={p.name} style={i > 0 ? { borderTop: "1px solid var(--glass-border)" } : {}}>
                    <td className="px-4 py-3 font-mono text-sm text-foreground">{p.name}</td>
                    <td className="px-4 py-3 font-vt text-base" style={{ color: typeColor(p.type) }}>{p.type}</td>
                    <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{p.default}</td>
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
            {related.map((r, i) => <ComponentCard key={r.id} component={r} index={i} />)}
          </div>
        </section>
      )}

      {/* Bottom bar with actions */}
      <section className="mt-12 grid gap-4 md:grid-cols-3">
        <div className="glass p-5">
          <div className="font-pixel text-[8px] text-muted-foreground">PREVIEW IN APP</div>
          <p className="mt-2 font-vt text-base text-foreground">Scan to open on Android.</p>
          <a href="https://play.google.com" target="_blank" rel="noopener noreferrer" className="pixel-btn pixel-btn-filled mt-4 inline-flex">
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
        <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="glass flex items-center gap-3 p-5 hover:bg-secondary">
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
  const lower = t.toLowerCase();
  if (lower.includes("string")) return "var(--glow-compose)";
  if (lower.includes("bool")) return "var(--glow-flutter)";
  if (lower.includes("number") || lower.includes("int") || lower.includes("float")) return "var(--glow-rn)";
  return "var(--glow-primary)";
}
