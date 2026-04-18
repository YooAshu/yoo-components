
Next.js isn't supported in this environment — the project runs on **TanStack Start v1** (React 19 + Vite, deployed to Cloudflare Workers). Other frameworks like Next.js, Angular, Vue, and Svelte cannot be used here.

The good news: TanStack Start gives us everything the YooComponents spec actually needs from "Next.js":
- File-based routing (`src/routes/` instead of `app/`)
- SSR for SEO + per-page meta tags
- Server-side Shiki highlighting (zero client bundle cost)
- Static param generation for `/components/[category]/[slug]`
- Dynamic imports for Monaco (`ssr: false` equivalent)

The only spec item that needs adapting is `@vercel/og` (Next-specific) — we'll use static OG images per route as you already approved.

**The plan from the previous message stands unchanged** — full design system, all 7 pages, command palette, Monaco playground, Shiki, ~15 fully-coded components + 44 metadata stubs, dark mode default, violet glow, pixel borders.

If you'd like to proceed on TanStack Start with the previously approved plan, approve and I'll start building. If you specifically need Next.js, you'd need to start a different project outside Lovable.
