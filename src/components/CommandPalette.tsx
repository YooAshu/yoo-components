import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { useNavigate } from "@tanstack/react-router";
import { CategoryIcon, PxClose, PxSearch } from "@/components/PixelIcons";
import { CATEGORIES, COMPONENTS, searchComponents } from "@/data/components";

type Ctx = { open: boolean; setOpen: (v: boolean) => void };
const CmdCtx = createContext<Ctx>({ open: false, setOpen: () => {} });

export function CommandPaletteProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <CmdCtx.Provider value={{ open, setOpen }}>
      {children}
      {open && <CommandPaletteModal onClose={() => setOpen(false)} />}
    </CmdCtx.Provider>
  );
}

export function CommandPaletteTrigger({ children }: { children: ReactNode }) {
  const { setOpen } = useContext(CmdCtx);
  return (
    <span onClick={() => setOpen(true)} className="cursor-pointer">
      {children}
    </span>
  );
}

function CommandPaletteModal({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const navigate = useNavigate();

  const results = useMemo(() => searchComponents(query).slice(0, 12), [query]);

  const go = useCallback(
    (idx: number) => {
      const item = results[idx];
      if (!item) return;
      navigate({ to: "/components/$category/$slug", params: { category: item.category, slug: item.slug } });
      onClose();
    },
    [results, navigate, onClose],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => Math.min(a + 1, results.length - 1)); }
      if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)); }
      if (e.key === "Enter") { e.preventDefault(); go(active); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, results.length, go]);

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center px-4 pt-[10vh]">
      <div
        className="absolute inset-0"
        style={{ background: "oklch(0 0 0 / 0.7)", backdropFilter: "blur(12px)" }}
        onClick={onClose}
      />
      <div
        className="glass-elevated relative w-full max-w-xl"
        style={{ boxShadow: "0 0 40px var(--glow-soft), 0 24px 64px oklch(0 0 0 / 0.5)" }}
      >
        <div className="flex items-center gap-3 border-b border-border px-4 py-3">
          <PxSearch size={16} />
          <input
            autoFocus
            value={query}
            onChange={(e) => { setQuery(e.target.value); setActive(0); }}
            placeholder="Search components..."
            className="flex-1 bg-transparent font-vt text-lg text-foreground outline-none placeholder:text-muted-foreground"
          />
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground" aria-label="Close">
            <PxClose size={14} />
          </button>
        </div>
        <div className="max-h-[400px] overflow-y-auto p-2">
          {results.length === 0 ? (
            <div className="p-8 text-center font-pixel text-[10px] text-muted-foreground">NO RESULTS</div>
          ) : (
            results.map((c, i) => {
              const cat = CATEGORIES.find((x) => x.key === c.category);
              return (
                <button
                  key={c.id}
                  onClick={() => go(i)}
                  onMouseEnter={() => setActive(i)}
                  className={`flex w-full items-center gap-3 px-3 py-2 text-left transition-colors ${
                    i === active ? "bg-secondary" : ""
                  }`}
                  style={i === active ? { borderLeft: "3px solid var(--glow-primary)" } : { borderLeft: "3px solid transparent" }}
                >
                  <CategoryIcon category={c.category} size={16} />
                  <span className="font-vt text-base text-foreground">{c.name}</span>
                  <span className="ml-auto font-pixel text-[7px] text-muted-foreground">{cat?.label.toUpperCase()}</span>
                </button>
              );
            })
          )}
        </div>
        <div className="flex items-center justify-between border-t border-border px-4 py-2 font-pixel text-[7px] text-muted-foreground">
          <span>↑↓ NAVIGATE · ENTER OPEN · ESC CLOSE</span>
          <span>{results.length} RESULTS</span>
        </div>
      </div>
    </div>
  );
}
