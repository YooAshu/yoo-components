import { useEffect, useState } from "react";
import { codeToHtml } from "shiki";
import { PxCheck, PxCopy } from "@/components/PixelIcons";

interface Props {
  code: string;
  lang: "kotlin" | "dart" | "tsx" | "jsx" | "javascript";
  filename?: string;
  maxHeight?: number;
}

export function CodeBlock({ code, lang, filename, maxHeight = 380 }: Props) {
  const [html, setHtml] = useState<string>("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let cancelled = false;
    codeToHtml(code, { lang, theme: "tokyo-night" })
      .then((h) => { if (!cancelled) setHtml(h); })
      .catch(() => { if (!cancelled) setHtml(`<pre>${code}</pre>`); });
    return () => { cancelled = true; };
  }, [code, lang]);

  const lines = code.split("\n").length;

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {/* noop */}
  };

  return (
    <div className="glass overflow-hidden">
      <div
        className="flex items-center justify-between border-b px-3 py-2"
        style={{ borderColor: "var(--glass-border)" }}
      >
        <div className="flex items-center gap-3">
          <div className="flex gap-1">
            <span className="h-2 w-2 bg-destructive" />
            <span className="h-2 w-2" style={{ background: "var(--glow-rn)" }} />
            <span className="h-2 w-2" style={{ background: "var(--glow-compose)" }} />
          </div>
          <span className="font-vt text-sm text-muted-foreground">{filename ?? `snippet.${lang}`}</span>
        </div>
        <button
          onClick={onCopy}
          className="flex items-center gap-2 px-2 py-1 font-pixel text-[8px] text-foreground hover:bg-secondary"
          aria-label="Copy code"
        >
          {copied ? (
            <>
              <PxCheck size={12} />
              <span className="blink">COPIED!</span>
            </>
          ) : (
            <>
              <PxCopy size={12} />
              <span>COPY</span>
            </>
          )}
        </button>
      </div>
      <div
        className="overflow-auto p-4 font-mono text-[13px]"
        style={{ maxHeight, background: "oklch(0.08 0.04 290)" }}
        dangerouslySetInnerHTML={{ __html: html || `<pre>${escapeHtml(code)}</pre>` }}
      />
      <div
        className="border-t px-3 py-1 font-vt text-xs text-muted-foreground"
        style={{ borderColor: "var(--glass-border)" }}
      >
        {lines} LINES
      </div>
    </div>
  );
}

function escapeHtml(s: string) {
  return s.replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" })[c] as string);
}
