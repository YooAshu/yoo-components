import { Link } from "@tanstack/react-router";
import { ComposeLogo, FlutterLogo, RNLogo, YooLogo } from "@/components/PixelIcons";

export function Footer() {
  return (
    <footer
      className="mt-24 border-t pt-12 pb-8"
      style={{ borderColor: "var(--glass-border)" }}
    >
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 md:grid-cols-4 md:px-6">
        <div className="col-span-2">
          <div className="flex items-center gap-2">
            <YooLogo size={28} />
            <span className="font-vt text-2xl text-foreground">YooComponents</span>
          </div>
          <p className="mt-3 max-w-sm text-sm text-muted-foreground">
            The cross-platform mobile UI component reference. Browse, preview, and copy production-ready components.
          </p>
          <div className="mt-4 flex items-center gap-3">
            <ComposeLogo size={20} />
            <FlutterLogo size={20} />
            <RNLogo size={20} />
          </div>
        </div>
        <div>
          <h3 className="font-pixel text-[10px] text-foreground">EXPLORE</h3>
          <ul className="mt-4 space-y-2 font-vt text-base text-muted-foreground">
            <li><Link to="/components" className="hover:text-foreground">Components</Link></li>
            <li><Link to="/playground" className="hover:text-foreground">Playground</Link></li>
            <li><Link to="/compare" className="hover:text-foreground">Compare</Link></li>
            <li><Link to="/changelog" className="hover:text-foreground">Changelog</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-pixel text-[10px] text-foreground">PROJECT</h3>
          <ul className="mt-4 space-y-2 font-vt text-base text-muted-foreground">
            <li><Link to="/about" className="hover:text-foreground">About</Link></li>
            <li><a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-foreground">GitHub</a></li>
            <li><a href="https://play.google.com" target="_blank" rel="noopener noreferrer" className="hover:text-foreground">Play Store</a></li>
          </ul>
        </div>
      </div>
      <div
        className="mx-auto mt-10 flex max-w-7xl flex-col items-center justify-between gap-4 border-t pt-6 px-4 text-center md:flex-row md:px-6"
        style={{ borderColor: "var(--glass-border)" }}
      >
        <p className="font-pixel text-[8px] text-muted-foreground">
          BUILT BY GENIX APPS <span style={{ color: "var(--glow-primary)" }}>♥</span>
        </p>
        <p className="font-pixel text-[8px] text-muted-foreground">© 2026 YOOCOMPONENTS</p>
      </div>
    </footer>
  );
}
