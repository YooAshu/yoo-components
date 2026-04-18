import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense, useState } from "react";
import { ComposeLogo, FlutterLogo, PxCopy, RNLogo } from "@/components/PixelIcons";
import { COMPONENTS } from "@/data/components";

const MonacoEditor = lazy(() =>
  import("@monaco-editor/react").then((m) => ({ default: m.default })),
);

export const Route = createFileRoute("/playground")({
  head: () => ({
    meta: [
      { title: "Playground — YooComponents" },
      { name: "description", content: "Edit and explore mobile UI component code in a Monaco-powered IDE." },
      { property: "og:title", content: "Code Playground — YooComponents" },
      { property: "og:description", content: "Tinker with real Compose, Flutter, and React Native snippets." },
    ],
  }),
  component: PlaygroundPage,
});

type FwKey = "compose" | "flutter" | "reactNative";

const samples = COMPONENTS.filter(
  (c) => c.frameworks.compose && !c.frameworks.compose.startsWith("// Coming"),
).slice(0, 12);

function PlaygroundPage() {
  const [fw, setFw] = useState<FwKey>("compose");
  const [snippet, setSnippet] = useState(samples[0]);
  const [code, setCode] = useState<string>(samples[0].frameworks.compose ?? "");

  const langMap: Record<FwKey, "kotlin" | "dart" | "typescript"> = {
    compose: "kotlin",
    flutter: "dart",
    reactNative: "typescript",
  };

  const switchFw = (f: FwKey) => {
    setFw(f);
    setCode(snippet.frameworks[f] ?? "// Not available\n");
  };

  const loadSnippet = (slug: string) => {
    const s = samples.find((s) => s.slug === slug) ?? samples[0];
    setSnippet(s);
    setCode(s.frameworks[fw] ?? "// Not available\n");
  };

  const reset = () => setCode(snippet.frameworks[fw] ?? "");
  const copy = () => navigator.clipboard.writeText(code).catch(() => {});

  const tabs: { key: FwKey; label: string; Logo: React.ComponentType<{ size?: number }> }[] = [
    { key: "compose", label: "COMPOSE", Logo: ComposeLogo },
    { key: "flutter", label: "FLUTTER", Logo: FlutterLogo },
    { key: "reactNative", label: "RN", Logo: RNLogo },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 md:px-6">
      <div className="mb-6">
        <span className="pixel-badge text-muted-foreground">[ PLAYGROUND ]</span>
        <h1 className="mt-3 font-pixel text-xs text-foreground md:text-sm">CODE PLAYGROUND</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Browse component code in a real editor. Live previews are available in the Android app.
        </p>
      </div>

      {/* Toolbar */}
      <div className="glass mb-2 flex flex-wrap items-center gap-2 p-3">
        <div className="flex gap-1">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => switchFw(t.key)}
              className="flex items-center gap-2 px-3 py-2 font-pixel text-[8px] border-2"
              style={{
                background: fw === t.key ? "var(--glow-primary)" : "transparent",
                color: fw === t.key ? "white" : "var(--foreground)",
                borderColor: fw === t.key ? "var(--glow-primary)" : "var(--border)",
              }}
            >
              <t.Logo size={14} />
              {t.label}
            </button>
          ))}
        </div>
        <select
          value={snippet.slug}
          onChange={(e) => loadSnippet(e.target.value)}
          className="ml-auto border-2 border-border bg-transparent px-3 py-2 font-vt text-base text-foreground"
        >
          {samples.map((s) => (
            <option key={s.slug} value={s.slug} style={{ background: "var(--background)" }}>
              {s.name}
            </option>
          ))}
        </select>
        <button onClick={copy} className="pixel-btn"><PxCopy size={12} /> COPY</button>
        <button onClick={reset} className="pixel-btn">RESET</button>
      </div>

      <div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
        <div className="glass overflow-hidden" style={{ height: 520 }}>
          <Suspense fallback={<div className="flex h-full items-center justify-center font-pixel text-[10px] text-muted-foreground">LOADING EDITOR...</div>}>
            <MonacoEditor
              height="520px"
              language={langMap[fw]}
              theme="vs-dark"
              value={code}
              onChange={(v) => setCode(v ?? "")}
              options={{
                fontFamily: "DM Mono, monospace",
                fontSize: 13,
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                padding: { top: 12 },
                renderLineHighlight: "none",
              }}
            />
          </Suspense>
        </div>

        <aside className="glass p-5">
          <h3 className="font-pixel text-[10px] text-foreground">{snippet.name.toUpperCase()}</h3>
          <p className="mt-3 text-sm text-muted-foreground">{snippet.description}</p>
          {snippet.props.length > 0 && (
            <>
              <div className="mt-5 font-pixel text-[8px] text-muted-foreground">PROPS</div>
              <ul className="mt-2 space-y-2 text-sm">
                {snippet.props.map((p) => (
                  <li key={p.name} className="border-l-2 pl-2" style={{ borderColor: "var(--glow-primary)" }}>
                    <div className="font-mono text-foreground">{p.name}</div>
                    <div className="font-vt text-xs text-muted-foreground">{p.type} · default {p.default}</div>
                  </li>
                ))}
              </ul>
            </>
          )}
          <div className="mt-5 border-t pt-4" style={{ borderColor: "var(--glass-border)" }}>
            <div className="font-pixel text-[8px] text-muted-foreground">TIP</div>
            <p className="mt-2 font-vt text-base text-foreground">
              Live preview is available in the YooComponents Android app.
            </p>
            <a href="https://play.google.com" target="_blank" rel="noopener noreferrer" className="pixel-btn pixel-btn-filled mt-3 inline-flex w-full justify-center">
              ▶ PLAY STORE
            </a>
          </div>
        </aside>
      </div>
    </div>
  );
}
