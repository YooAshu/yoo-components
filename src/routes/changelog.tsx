import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/changelog")({
  head: () => ({
    meta: [
      { title: "Changelog — YooComponents" },
      { name: "description", content: "What's new in YooComponents. Component additions, updates, and deprecations." },
      { property: "og:title", content: "Changelog — YooComponents" },
      { property: "og:description", content: "Latest updates to the YooComponents library." },
    ],
  }),
  component: ChangelogPage,
});

interface Entry {
  date: string;
  version: string;
  status: "NEW" | "UPDATED" | "DEPRECATED";
  items: string[];
}

const entries: Entry[] = [
  {
    date: "2026-04-12",
    version: "v1.4",
    status: "NEW",
    items: [
      "Added Switch / Toggle (all 3 frameworks)",
      "Added Filter Chip with selected state",
      "Added FAB for primary screen action",
      "Added Pull to Refresh stub",
    ],
  },
  {
    date: "2026-03-28",
    version: "v1.3",
    status: "UPDATED",
    items: [
      "Improved Outlined TextField with helper text variant",
      "Refined Snackbar action styling",
      "Updated Compose snippets to Material 3 1.2",
    ],
  },
  {
    date: "2026-03-10",
    version: "v1.2",
    status: "NEW",
    items: [
      "Added Card with Image + Actions",
      "Added Search Bar (featured)",
      "Added Modal Bottom Sheet",
    ],
  },
  {
    date: "2026-02-22",
    version: "v1.1",
    status: "DEPRECATED",
    items: [
      "Removed legacy Material 2 Button samples",
      "Marked old radio styling as deprecated",
    ],
  },
  {
    date: "2026-02-01",
    version: "v1.0",
    status: "NEW",
    items: [
      "Initial release with 50+ components",
      "Compose, Flutter, and React Native snippets",
      "Android companion app launched",
    ],
  },
];

const badgeColor = (s: Entry["status"]) =>
  s === "NEW" ? "var(--glow-compose)" : s === "UPDATED" ? "var(--glow-flutter)" : "var(--glow-rn)";

function ChangelogPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 md:px-6">
      <div className="mb-10">
        <span className="pixel-badge text-muted-foreground">[ CHANGELOG ]</span>
        <h1 className="mt-3 font-pixel text-xs text-foreground md:text-sm">RELEASE NOTES</h1>
        <p className="mt-2 text-muted-foreground">Newest first. Component additions, updates, and deprecations.</p>
      </div>

      <ol className="relative">
        <div
          className="absolute left-3 top-0 bottom-0 w-px md:left-32"
          style={{
            backgroundImage: "repeating-linear-gradient(to bottom, var(--glow-primary) 0 4px, transparent 4px 8px)",
          }}
        />
        {entries.map((e) => (
          <li key={e.version} className="relative mb-10 grid grid-cols-[40px_1fr] gap-4 md:grid-cols-[160px_1fr]">
            <div className="hidden md:block">
              <div className="font-vt text-base text-muted-foreground">{e.date}</div>
              <div className="font-pixel text-[10px]" style={{ color: "var(--glow-primary)" }}>{e.version}</div>
            </div>
            <div
              className="absolute left-1 top-2 h-4 w-4 md:left-[120px]"
              style={{ background: "var(--glow-primary)", boxShadow: "0 0 12px var(--glow-soft)" }}
            />
            <div className="glass p-5 md:col-start-2">
              <div className="mb-3 flex flex-wrap items-center gap-2 md:hidden">
                <span className="font-vt text-base text-muted-foreground">{e.date}</span>
                <span className="font-pixel text-[8px]" style={{ color: "var(--glow-primary)" }}>{e.version}</span>
              </div>
              <span
                className="pixel-badge"
                style={{ color: badgeColor(e.status), borderColor: badgeColor(e.status) }}
              >
                {e.status}
              </span>
              <ul className="mt-3 space-y-2 font-vt text-base text-foreground">
                {e.items.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span style={{ color: "var(--glow-primary)" }}>▸</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
