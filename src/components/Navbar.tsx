import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { PxClose, PxGithub, PxMenu, PxMoon, PxSearch, PxSun, YooLogo } from "@/components/PixelIcons";
import { useTheme } from "@/hooks/useTheme";
import { CommandPaletteTrigger } from "@/components/CommandPalette";

const links = [
  { to: "/components" as const, label: "COMPONENTS" },
  { to: "/playground" as const, label: "PLAYGROUND" },
  { to: "/compare" as const, label: "COMPARE" },
  { to: "/changelog" as const, label: "CHANGELOG" },
  { to: "/about" as const, label: "ABOUT" },
];

export function Navbar() {
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-40 backdrop-blur-xl"
      style={{
        background: "oklch(0.1 0.06 300 / 0.7)",
        borderBottom: "1px solid var(--glass-border)",
      }}
    >
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 md:px-6">
        <Link to="/" className="flex items-center gap-2">
          <YooLogo size={24} />
          <span className="font-vt text-xl text-foreground">YooComponents</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="font-pixel text-[9px] text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <CommandPaletteTrigger>
            <button
              className="hidden h-9 items-center gap-2 border-2 border-border px-3 text-muted-foreground hover:text-foreground md:flex"
              aria-label="Search"
            >
              <PxSearch size={14} />
              <span className="font-vt text-sm">Search</span>
              <kbd className="font-pixel text-[8px] opacity-60">⌘K</kbd>
            </button>
          </CommandPaletteTrigger>
          <button
            onClick={toggle}
            className="flex h-9 w-9 items-center justify-center border-2 border-border text-foreground hover:bg-secondary"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <PxSun size={16} /> : <PxMoon size={16} />}
          </button>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden h-9 w-9 items-center justify-center border-2 border-border text-foreground hover:bg-secondary md:flex"
            aria-label="GitHub"
          >
            <PxGithub size={16} />
          </a>
          <Link to="/about" className="pixel-btn pixel-btn-filled hidden md:inline-flex">
            GET APP
          </Link>
          <button
            className="flex h-9 w-9 items-center justify-center border-2 border-border md:hidden"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <PxMenu size={16} />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0"
            style={{ background: "oklch(0 0 0 / 0.6)", backdropFilter: "blur(8px)" }}
            onClick={() => setOpen(false)}
          />
          <div
            className="glass-elevated absolute right-0 top-0 h-full w-72 p-6"
            style={{ borderLeft: "2px solid var(--glass-border)" }}
          >
            <div className="mb-8 flex items-center justify-between">
              <YooLogo size={20} />
              <button
                onClick={() => setOpen(false)}
                className="flex h-8 w-8 items-center justify-center border-2 border-border"
                aria-label="Close menu"
              >
                <PxClose size={14} />
              </button>
            </div>
            <nav className="flex flex-col gap-4">
              {links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="font-pixel text-[10px] text-foreground"
                >
                  {l.label}
                </Link>
              ))}
              <Link
                to="/about"
                onClick={() => setOpen(false)}
                className="pixel-btn pixel-btn-filled mt-4"
              >
                GET APP
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
