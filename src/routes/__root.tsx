import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import appCss from "../styles.css?url";
import { ThemeScript } from "@/components/ThemeScript";
import { CommandPaletteProvider } from "@/components/CommandPalette";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingOrbs } from "@/components/FloatingOrbs";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="font-pixel text-2xl text-foreground" style={{ color: "var(--glow-primary)" }}>404</h1>
        <h2 className="mt-4 font-pixel text-xs text-foreground">PAGE NOT FOUND</h2>
        <p className="mt-2 font-vt text-base text-muted-foreground">
          The page you're looking for has wandered off the grid.
        </p>
        <div className="mt-6">
          <Link to="/" className="pixel-btn pixel-btn-filled">GO HOME</Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "YooComponents — Mobile UI components for Compose, Flutter, RN" },
      { name: "description", content: "The cross-platform mobile UI component reference. Browse, preview, and copy production-ready components for Jetpack Compose, Flutter, and React Native." },
      { name: "author", content: "Genix Apps" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@yoocomponents" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <ThemeScript />
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <CommandPaletteProvider>
      <FloatingOrbs />
      <Navbar />
      <main className="min-h-[calc(100vh-3.5rem)]">
        <Outlet />
      </main>
      <Footer />
    </CommandPaletteProvider>
  );
}
