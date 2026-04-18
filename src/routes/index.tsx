import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ComposeLogo, FlutterLogo, RNLogo, PxArrow, PxGithub } from "@/components/PixelIcons";
import { ComponentCard } from "@/components/ComponentCard";
import { COMPONENTS, getFeatured } from "@/data/components";
import { CodeBlock } from "@/components/CodeBlock";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "YooComponents — Compose, Flutter, React Native components" },
      { name: "description", content: "50+ production-ready mobile UI components. Browse, preview, and copy code for Jetpack Compose, Flutter, and React Native." },
      { property: "og:title", content: "YooComponents" },
      { property: "og:description", content: "The component library for mobile devs. Compose · Flutter · React Native." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: LandingPage,
});

const HERO_SNIPPETS: { lang: "kotlin" | "dart" | "tsx"; title: string; code: string }[] = [
  {
    lang: "kotlin",
    title: "PrimaryButton.kt",
    code: `@Composable
fun PrimaryButton(
  text: String,
  onClick: () -> Unit,
) {
  Button(onClick = onClick) {
    Text(text)
  }
}`,
  },
  {
    lang: "dart",
    title: "primary_button.dart",
    code: `class PrimaryButton extends StatelessWidget {
  final String text;
  final VoidCallback? onPressed;
  const PrimaryButton({super.key, required this.text, this.onPressed});

  @override
  Widget build(BuildContext context) {
    return FilledButton(onPressed: onPressed, child: Text(text));
  }
}`,
  },
  {
    lang: "tsx",
    title: "PrimaryButton.tsx",
    code: `export function PrimaryButton({ title, onPress }) {
  return (
    <Pressable onPress={onPress} style={styles.btn}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}`,
  },
];

function LandingPage() {
  return (
    <>
      <Hero />
      <FrameworkStrip />
      <FeaturedGrid />
      <HowItWorks />
      <AppDownload />
      <StatsBar />
    </>
  );
}

function Hero() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % HERO_SNIPPETS.length), 3500);
    return () => clearInterval(t);
  }, []);
  const cur = HERO_SNIPPETS[idx];

  return (
    <section className="relative overflow-hidden pixel-grid-bg">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 pb-16 pt-12 md:px-6 md:pb-24 md:pt-20 lg:grid-cols-2">
        <div>
          <span className="pixel-badge blink" style={{ color: "var(--glow-primary)", borderColor: "var(--glow-primary)" }}>
            [ OPEN SOURCE ]
          </span>
          <h1 className="mt-6 font-pixel text-[14px] leading-[2.2] text-foreground sm:text-base md:text-[18px] md:leading-[2]">
            THE COMPONENT
            <br />
            <span style={{ color: "var(--glow-primary)" }} className="text-glow">LIBRARY</span> FOR
            <br />
            MOBILE DEVS
          </h1>
          <p className="mt-6 max-w-md text-base text-muted-foreground sm:text-lg">
            Jetpack Compose · Flutter · React Native.
            Browse, preview, and copy production-ready UI components.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/components" className="pixel-btn pixel-btn-filled">
              BROWSE COMPONENTS <PxArrow size={12} />
            </Link>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="pixel-btn"
            >
              GITHUB <PxGithub size={12} />
            </a>
          </div>
          <div className="mt-8 flex flex-wrap gap-x-4 gap-y-2 font-vt text-base text-muted-foreground">
            <span>[ {COMPONENTS.length}+ COMPONENTS ]</span>
            <span>·</span>
            <span>[ 3 FRAMEWORKS ]</span>
            <span>·</span>
            <span>[ 12 CATEGORIES ]</span>
            <span>·</span>
            <span style={{ color: "var(--glow-compose)" }}>[ FREE ]</span>
          </div>
        </div>

        <div className="hidden lg:block">
          <div className="relative">
            <div
              className="absolute -inset-4 -z-10 opacity-60"
              style={{
                background: "radial-gradient(circle, var(--glow-soft), transparent 70%)",
                filter: "blur(40px)",
              }}
            />
            <CodeBlock key={idx} code={cur.code} lang={cur.lang} filename={cur.title} maxHeight={300} />
          </div>
        </div>
      </div>
    </section>
  );
}

function FrameworkStrip() {
  const items = [
    { name: "Jetpack Compose", count: 50, color: "var(--glow-compose)", Logo: ComposeLogo },
    { name: "Flutter", count: 50, color: "var(--glow-flutter)", Logo: FlutterLogo },
    { name: "React Native", count: 50, color: "var(--glow-rn)", Logo: RNLogo },
  ];
  return (
    <section className="mx-auto max-w-7xl px-4 md:px-6">
      <div className="grid gap-4 md:grid-cols-3">
        {items.map((it) => (
          <div
            key={it.name}
            className="glass group relative flex items-center gap-4 p-5 transition-all hover:-translate-y-0.5"
            style={{ borderLeft: `4px solid ${it.color}` }}
          >
            <it.Logo size={36} />
            <div>
              <div className="font-vt text-xl text-foreground">{it.name}</div>
              <div className="font-pixel text-[8px] text-muted-foreground">[ {it.count} COMPONENTS ]</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function FeaturedGrid() {
  const featured = getFeatured().slice(0, 9);
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <span className="pixel-badge text-muted-foreground">[ FEATURED ]</span>
          <h2 className="mt-3 font-pixel text-[11px] text-foreground md:text-sm">
            POPULAR COMPONENTS
          </h2>
        </div>
        <Link to="/components" className="hidden items-center gap-2 font-pixel text-[9px] text-muted-foreground hover:text-foreground md:inline-flex">
          VIEW ALL <PxArrow size={10} />
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((c, i) => (
          <ComponentCard key={c.id} component={c} index={i} />
        ))}
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { n: "01", title: "BROWSE", desc: "Filter by category or framework. 12 categories, 50+ components." },
    { n: "02", title: "PREVIEW", desc: "See real Compose, Flutter, and React Native code side-by-side." },
    { n: "03", title: "COPY", desc: "One-click copy to clipboard or install the Android app for live previews." },
  ];
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
      <h2 className="mb-10 font-pixel text-[11px] text-foreground md:text-sm">
        HOW IT WORKS
      </h2>
      <div className="grid gap-4 md:grid-cols-3">
        {steps.map((s) => (
          <div key={s.n} className="glass p-6">
            <div
              className="font-pixel text-2xl md:text-[32px]"
              style={{ color: "var(--glow-primary)" }}
            >
              {s.n}
            </div>
            <div className="mt-4 font-pixel text-[10px] text-foreground">{s.title}</div>
            <p className="mt-3 text-sm text-muted-foreground">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function AppDownload() {
  return (
    <section className="relative mx-auto max-w-7xl px-4 py-16 md:px-6">
      <div
        className="glass-elevated relative overflow-hidden p-8 md:p-12"
        style={{
          boxShadow: "0 0 80px var(--glow-soft), inset 0 1px 0 oklch(1 0 0 / 0.08)",
        }}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-50"
          style={{
            background: "radial-gradient(circle at 80% 50%, var(--glow-soft), transparent 60%)",
          }}
        />
        <div className="relative grid items-center gap-8 md:grid-cols-2">
          <div>
            <span className="pixel-badge" style={{ color: "var(--glow-primary)", borderColor: "var(--glow-primary)" }}>
              [ ANDROID APP ]
            </span>
            <h2 className="mt-4 font-pixel text-[11px] text-foreground md:text-sm leading-[2.2]">
              PREVIEW LIVE
              <br />
              ON ANDROID
            </h2>
            <p className="mt-4 max-w-md text-muted-foreground">
              Tap any component, see it run on your phone. Tweak props live. Built-in code copy.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href="https://play.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="pixel-btn pixel-btn-filled"
              >
                ▶ PLAY STORE
              </a>
              <div className="frame-pixel hidden h-20 w-20 items-center justify-center bg-background sm:flex">
                <QRPlaceholder size={64} />
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <PhoneMockup />
          </div>
        </div>
      </div>
    </section>
  );
}

function PhoneMockup() {
  return (
    <svg width="180" height="320" viewBox="0 0 180 320" className="pixel">
      <rect x="10" y="10" width="160" height="300" fill="var(--background)" stroke="var(--glow-primary)" strokeWidth="3" />
      <rect x="60" y="14" width="60" height="6" fill="var(--glow-primary)" opacity="0.4" />
      <rect x="20" y="40" width="140" height="20" fill="var(--glow-primary)" opacity="0.3" />
      <rect x="20" y="70" width="140" height="80" fill="var(--glow-primary)" opacity="0.15" />
      <rect x="20" y="160" width="65" height="80" fill="var(--glow-primary)" opacity="0.2" />
      <rect x="95" y="160" width="65" height="80" fill="var(--glow-primary)" opacity="0.2" />
      <rect x="20" y="270" width="140" height="20" fill="var(--glow-primary)" />
      <rect x="40" y="276" width="20" height="8" fill="white" />
      <rect x="80" y="276" width="20" height="8" fill="white" opacity="0.5" />
      <rect x="120" y="276" width="20" height="8" fill="white" opacity="0.5" />
    </svg>
  );
}

function QRPlaceholder({ size = 80 }: { size?: number }) {
  // Generated pseudo-random pixel pattern
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" className="pixel">
      <rect x="0" y="0" width="16" height="16" fill="white" />
      {[
        [0,0,1,1,1,1,1,0,1,0,1,1,1,1,1,0],
        [1,0,0,0,0,0,1,0,0,1,1,0,0,0,0,1],
        [1,0,1,1,1,0,1,0,1,0,1,0,1,1,1,0],
        [1,0,1,1,1,0,1,0,1,1,0,0,1,1,1,0],
        [1,0,1,1,1,0,1,0,0,1,1,0,1,1,1,0],
        [1,0,0,0,0,0,1,0,1,0,0,0,0,0,0,1],
        [1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,0],
        [0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0],
        [1,1,0,1,0,1,1,0,0,1,0,1,1,0,1,1],
        [0,1,1,0,1,0,0,1,1,0,1,0,0,1,1,0],
        [1,0,1,1,1,1,1,0,0,1,1,1,1,1,0,1],
        [0,1,0,0,0,0,1,1,1,0,0,0,0,1,1,0],
        [1,1,1,1,1,1,1,0,0,1,0,1,1,0,1,1],
        [1,0,0,0,0,0,1,0,1,0,1,1,0,1,0,0],
        [1,0,1,1,1,0,1,0,0,1,0,0,1,1,1,1],
        [1,0,0,0,0,0,1,0,1,1,1,1,0,0,0,1],
      ].flatMap((row, y) =>
        row.map((v, x) =>
          v ? <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill="black" /> : null,
        ),
      )}
    </svg>
  );
}

function StatsBar() {
  const stats = [
    { n: "50+", label: "COMPONENTS" },
    { n: "3", label: "FRAMEWORKS" },
    { n: "12", label: "CATEGORIES" },
    { n: "100%", label: "FREE" },
  ];
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => e.isIntersecting && setVisible(true), { threshold: 0.4 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <section ref={ref} className="mx-auto max-w-7xl px-4 py-16 md:px-6">
      <div className="glass grid grid-cols-2 gap-6 p-8 md:grid-cols-4">
        {stats.map((s, i) => (
          <div key={s.label} className="text-center">
            <div
              className="font-vt text-4xl md:text-5xl"
              style={{
                color: "var(--glow-primary)",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(8px)",
                transition: `opacity 600ms ${i * 100}ms, transform 600ms ${i * 100}ms`,
              }}
            >
              {s.n}
            </div>
            <div className="mt-1 font-pixel text-[8px] text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
