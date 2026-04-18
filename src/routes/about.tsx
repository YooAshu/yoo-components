import { createFileRoute } from "@tanstack/react-router";
import { ComposeLogo, FlutterLogo, PxCheck, PxCode, PxComponent, PxStar, RNLogo, YooLogo } from "@/components/PixelIcons";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — YooComponents" },
      { name: "description", content: "YooComponents is built by Genix Apps. Get the Android app for live previews." },
      { property: "og:title", content: "About YooComponents" },
      { property: "og:description", content: "Built by indie devs. Free, open-source mobile UI component reference." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 md:px-6">
      <div className="text-center">
        <YooLogo size={48} />
        <h1 className="mt-6 font-pixel text-xs text-foreground md:text-sm">ABOUT YOOCOMPONENTS</h1>
        <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
          The definitive cross-platform mobile UI component reference for Jetpack Compose, Flutter,
          and React Native. Free, open-source, and built by one indie dev shop.
        </p>
        <p className="mt-2 font-pixel text-[8px]" style={{ color: "var(--glow-primary)" }}>
          BUILT BY GENIX APPS
        </p>
      </div>

      <section className="mt-16">
        <h2 className="mb-6 text-center font-pixel text-[10px] text-foreground">FEATURES</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { icon: PxComponent, title: "50+ COMPONENTS", desc: "Across 12 categories. Buttons, nav, cards, inputs, and more." },
            { icon: PxCode, title: "REAL CODE", desc: "Production-ready snippets you can copy directly into your project." },
            { icon: PxStar, title: "3 FRAMEWORKS", desc: "Same component, three implementations. Compare side-by-side." },
            { icon: PxCheck, title: "ALWAYS FREE", desc: "Open source. MIT licensed. No paywalls, no ads." },
            { icon: ComposeLogo, title: "MATERIAL 3", desc: "Compose & Flutter snippets target the latest Material 3 APIs." },
            { icon: RNLogo, title: "MOBILE FIRST", desc: "Every component designed for touch and small screens." },
          ].map((f) => (
            <div key={f.title} className="glass p-5">
              <f.icon size={24} />
              <div className="mt-3 font-pixel text-[9px] text-foreground">{f.title}</div>
              <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16 grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <h2 className="font-pixel text-[10px] text-foreground">GET THE ANDROID APP</h2>
          <p className="mt-3 max-w-md text-base text-muted-foreground">
            Live previews on a real device. Tweak props, see changes instantly, and copy code with one tap.
          </p>
          <div className="mt-5 flex items-center gap-4">
            <a href="https://play.google.com" target="_blank" rel="noopener noreferrer" className="pixel-btn pixel-btn-filled">
              ▶ PLAY STORE
            </a>
            <div className="frame-pixel flex h-20 w-20 items-center justify-center bg-background">
              <QRMini />
            </div>
          </div>
        </div>
        <div className="flex justify-center gap-4">
          <Phone />
          <Phone tint="var(--glow-compose)" />
          <Phone tint="var(--glow-flutter)" />
        </div>
      </section>

      <section className="mt-16 text-center">
        <h2 className="font-pixel text-[10px] text-foreground">SUPPORTED FRAMEWORKS</h2>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-6">
          <FwLogo Logo={ComposeLogo} label="Jetpack Compose" />
          <FwLogo Logo={FlutterLogo} label="Flutter" />
          <FwLogo Logo={RNLogo} label="React Native" />
        </div>
      </section>
    </div>
  );
}

function Phone({ tint = "var(--glow-primary)" }: { tint?: string }) {
  return (
    <svg width="72" height="140" viewBox="0 0 72 140" className="pixel hidden sm:block">
      <rect x="2" y="2" width="68" height="136" fill="var(--background)" stroke={tint} strokeWidth="3" />
      <rect x="20" y="5" width="32" height="3" fill={tint} opacity="0.5" />
      <rect x="8" y="14" width="56" height="100" fill={tint} opacity="0.18" />
      <rect x="8" y="118" width="56" height="14" fill={tint} opacity="0.4" />
      <rect x="14" y="22" width="44" height="6" fill={tint} opacity="0.6" />
      <rect x="14" y="34" width="20" height="20" fill={tint} opacity="0.4" />
      <rect x="38" y="34" width="20" height="20" fill={tint} opacity="0.4" />
      <rect x="14" y="58" width="44" height="3" fill={tint} opacity="0.5" />
      <rect x="14" y="64" width="32" height="3" fill={tint} opacity="0.5" />
    </svg>
  );
}

function FwLogo({ Logo, label }: { Logo: React.ComponentType<{ size?: number }>; label: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <Logo size={36} />
      <div className="font-vt text-base text-muted-foreground">{label}</div>
    </div>
  );
}

function QRMini() {
  return (
    <svg width="64" height="64" viewBox="0 0 8 8" className="pixel">
      <rect x="0" y="0" width="8" height="8" fill="white" />
      {[
        [1,1,1,0,1,0,1,1],
        [1,0,1,0,0,1,1,1],
        [1,1,1,0,1,1,0,0],
        [0,0,0,1,0,1,0,1],
        [1,0,1,1,1,0,1,1],
        [1,1,0,0,1,1,0,0],
        [0,1,1,1,0,1,1,1],
        [1,1,0,1,1,0,1,0],
      ].flatMap((row, y) =>
        row.map((v, x) =>
          v ? <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill="black" /> : null,
        ),
      )}
    </svg>
  );
}
