import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { CategoryIcon, PxClose, PxGrid, PxList, PxSearch } from "@/components/PixelIcons";
import { ComponentCard } from "@/components/ComponentCard";
import { CATEGORIES, COMPONENTS, type ComponentCategory, categoryCount } from "@/data/components";

export const Route = createFileRoute("/components")({
  head: () => ({
    meta: [
      { title: "Components — YooComponents" },
      { name: "description", content: "Browse 50+ mobile UI components for Jetpack Compose, Flutter, and React Native." },
      { property: "og:title", content: "All Components — YooComponents" },
      { property: "og:description", content: "Filter by framework or category. Real code, ready to copy." },
    ],
  }),
  component: BrowserPage,
});

type FW = "compose" | "flutter" | "reactNative";

function BrowserPage() {
  const [frameworks, setFrameworks] = useState<Set<FW>>(new Set());
  const [category, setCategory] = useState<ComponentCategory | null>(null);
  const [query, setQuery] = useState("");
  const [view, setView] = useState<"grid" | "list">("grid");

  const filtered = useMemo(() => {
    return COMPONENTS.filter((c) => {
      if (category && c.category !== category) return false;
      if (frameworks.size > 0) {
        const hasAny = [...frameworks].some((fw) => {
          const v = c.frameworks[fw];
          return v && !v.startsWith("// Coming soon");
        });
        if (!hasAny) return false;
      }
      if (query.trim()) {
        const q = query.toLowerCase();
        if (!c.name.toLowerCase().includes(q) && !c.description.toLowerCase().includes(q)) return false;
      }
      return true;
    });
  }, [frameworks, category, query]);

  const toggleFw = (fw: FW) => {
    setFrameworks((s) => {
      const n = new Set(s);
      n.has(fw) ? n.delete(fw) : n.add(fw);
      return n;
    });
  };

  return (
    <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-8 md:px-6 lg:grid-cols-[260px_1fr]">
      <Sidebar
        frameworks={frameworks}
        toggleFw={toggleFw}
        category={category}
        setCategory={setCategory}
        query={query}
        setQuery={setQuery}
      />
      <main>
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="font-vt text-base text-muted-foreground">
            COMPONENTS{category && <> &gt; <span className="text-foreground">{CATEGORIES.find((c) => c.key === category)?.label.toUpperCase()}</span></>}
          </div>
          <div className="flex items-center gap-2">
            <span className="font-pixel text-[8px] text-muted-foreground">{filtered.length} RESULTS</span>
            <div className="flex border-2 border-border">
              <button
                onClick={() => setView("grid")}
                className={`flex h-8 w-8 items-center justify-center ${view === "grid" ? "bg-secondary text-foreground" : "text-muted-foreground"}`}
                aria-label="Grid view"
              >
                <PxGrid size={14} />
              </button>
              <button
                onClick={() => setView("list")}
                className={`flex h-8 w-8 items-center justify-center ${view === "list" ? "bg-secondary text-foreground" : "text-muted-foreground"}`}
                aria-label="List view"
              >
                <PxList size={14} />
              </button>
            </div>
          </div>
        </div>

        {(frameworks.size > 0 || category || query) && (
          <div className="mb-4 flex flex-wrap gap-2">
            {[...frameworks].map((fw) => (
              <button key={fw} onClick={() => toggleFw(fw)} className="pixel-badge flex items-center gap-1.5 hover:bg-secondary">
                {fw.toUpperCase()} <PxClose size={10} />
              </button>
            ))}
            {category && (
              <button onClick={() => setCategory(null)} className="pixel-badge flex items-center gap-1.5 hover:bg-secondary">
                {CATEGORIES.find((c) => c.key === category)?.label.toUpperCase()} <PxClose size={10} />
              </button>
            )}
            {query && (
              <button onClick={() => setQuery("")} className="pixel-badge flex items-center gap-1.5 hover:bg-secondary">
                "{query}" <PxClose size={10} />
              </button>
            )}
          </div>
        )}

        {filtered.length === 0 ? (
          <EmptyState />
        ) : view === "grid" ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((c, i) => <ComponentCard key={c.id} component={c} index={i} />)}
          </div>
        ) : (
          <div className="glass divide-y" style={{ borderColor: "var(--glass-border)" }}>
            {filtered.map((c) => (
              <Link
                key={c.id}
                to="/components/$category/$slug"
                params={{ category: c.category, slug: c.slug }}
                className="flex items-center gap-4 p-4 hover:bg-secondary"
                style={{ borderColor: "var(--glass-border)" }}
              >
                <CategoryIcon category={c.category} size={20} />
                <div className="min-w-0 flex-1">
                  <div className="font-vt text-lg text-foreground">{c.name}</div>
                  <div className="truncate text-xs text-muted-foreground">{c.description}</div>
                </div>
                {c.isNew && <span className="blink pixel-badge" style={{ color: "var(--glow-primary)" }}>NEW</span>}
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

function Sidebar({
  frameworks, toggleFw, category, setCategory, query, setQuery,
}: {
  frameworks: Set<FW>;
  toggleFw: (fw: FW) => void;
  category: ComponentCategory | null;
  setCategory: (c: ComponentCategory | null) => void;
  query: string;
  setQuery: (q: string) => void;
}) {
  const fwBtn = (fw: FW | "all", label: string, color: string) => {
    const active = fw === "all" ? frameworks.size === 0 : frameworks.has(fw);
    return (
      <button
        onClick={() => fw === "all" ? toggleFw("compose" as FW) && false || setCategoryAllReset() : toggleFw(fw)}
        className="font-pixel text-[8px] py-2 transition-colors"
        style={{
          background: active ? color : "transparent",
          color: active ? "white" : "var(--foreground)",
          border: `2px solid ${color}`,
        }}
      >
        {label}
      </button>
    );
  };
  // tiny helper: clear frameworks
  function setCategoryAllReset() {
    // Clear by toggling each existing
    [...frameworks].forEach((f) => toggleFw(f));
  }

  return (
    <aside className="glass sticky top-20 h-fit p-4">
      <div className="mb-4">
        <h3 className="mb-3 font-pixel text-[8px] text-muted-foreground">FRAMEWORK</h3>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => [...frameworks].forEach(toggleFw)}
            className="font-pixel text-[8px] py-2"
            style={{
              background: frameworks.size === 0 ? "var(--glow-primary)" : "transparent",
              color: frameworks.size === 0 ? "white" : "var(--foreground)",
              border: "2px solid var(--glow-primary)",
            }}
          >
            ALL
          </button>
          {fwBtn("compose", "COMPOSE", "var(--glow-compose)")}
          {fwBtn("flutter", "FLUTTER", "var(--glow-flutter)")}
          {fwBtn("reactNative", "RN", "var(--glow-rn)")}
        </div>
      </div>

      <div className="mb-4">
        <div className="relative">
          <PxSearch size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="SEARCH..."
            className="w-full border-2 border-border bg-transparent py-2 pl-9 pr-12 font-vt text-base text-foreground placeholder:text-muted-foreground"
          />
          <kbd className="absolute right-2 top-1/2 -translate-y-1/2 font-pixel text-[7px] text-muted-foreground">⌘K</kbd>
        </div>
      </div>

      <div>
        <h3 className="mb-2 font-pixel text-[8px] text-muted-foreground">CATEGORIES</h3>
        <ul className="space-y-1">
          <li>
            <button
              onClick={() => setCategory(null)}
              className="flex w-full items-center justify-between gap-2 px-2 py-1.5 text-left transition-colors hover:bg-secondary"
              style={category === null ? { borderLeft: "3px solid var(--glow-primary)", background: "var(--glass-2)" } : { borderLeft: "3px solid transparent" }}
            >
              <span className="font-vt text-base text-foreground">All</span>
              <span className="font-pixel text-[7px] text-muted-foreground">{COMPONENTS.length}</span>
            </button>
          </li>
          {CATEGORIES.map((c) => (
            <li key={c.key}>
              <button
                onClick={() => setCategory(c.key)}
                className="flex w-full items-center justify-between gap-2 px-2 py-1.5 text-left transition-colors hover:bg-secondary"
                style={category === c.key ? { borderLeft: "3px solid var(--glow-primary)", background: "var(--glass-2)" } : { borderLeft: "3px solid transparent" }}
              >
                <span className="flex items-center gap-2">
                  <CategoryIcon category={c.key} size={14} />
                  <span className="font-vt text-base text-foreground">{c.label}</span>
                </span>
                <span className="font-pixel text-[7px] text-muted-foreground">{categoryCount(c.key)}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4 border-t pt-3 text-center font-vt text-sm text-muted-foreground" style={{ borderColor: "var(--glass-border)" }}>
        [ {COMPONENTS.length} COMPONENTS ]
      </div>
    </aside>
  );
}

function EmptyState() {
  return (
    <div className="glass flex flex-col items-center justify-center p-16 text-center">
      <svg width="80" height="80" viewBox="0 0 16 16" className="pixel mb-4">
        <rect x="3" y="3" width="2" height="2" fill="var(--glow-primary)" />
        <rect x="11" y="3" width="2" height="2" fill="var(--glow-primary)" />
        <rect x="5" y="9" width="6" height="2" fill="var(--glow-primary)" />
        <rect x="3" y="11" width="2" height="2" fill="var(--glow-primary)" />
        <rect x="11" y="11" width="2" height="2" fill="var(--glow-primary)" />
      </svg>
      <h3 className="font-pixel text-[10px] text-foreground">NO COMPONENTS FOUND</h3>
      <p className="mt-2 font-vt text-base text-muted-foreground">TRY A DIFFERENT FILTER</p>
    </div>
  );
}
