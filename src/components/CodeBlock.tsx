import { useEffect, useState } from "react";
import { codeToHtml } from "shiki";
import { PxCheck, PxCopy } from "@/components/PixelIcons";

interface Props {
  code: string;
  lang: "kotlin" | "dart" | "tsx" | "jsx" | "javascript";
  filename?: string;
  maxHeight?: number;
  framework?: "compose" | "flutter" | "reactNative";
  showLineNumbers?: boolean;
}

const FW_DOT: Record<string, string> = {
  compose: "var(--glow-compose)",
  flutter: "var(--glow-flutter)",
  reactNative: "var(--glow-rn)",
};

export function CodeBlock({
  code,
  lang,
  filename,
  maxHeight = 380,
  framework,
  showLineNumbers = true,
}: Props) {
  const [html, setHtml] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    let cancelled = false;
    codeToHtml(code, { lang, theme: "tokyo-night" })
      .then((h) => { if (!cancelled) setHtml(h); })
      .catch(() => { if (!cancelled) setHtml(`<pre>${escapeHtml(code)}</pre>`); });
    return () => { cancelled = true; };
  }, [code, lang]);

  const lines = code.split("\n");
  const lineCount = lines.length;

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setFlash(true);
      setTimeout(() => setCopied(false), 2000);
      setTimeout(() => setFlash(false), 450);
    } catch {/* noop */}
  };

  const dotColor = framework ? FW_DOT[framework] : "var(--glow-primary)";

  return (
    <div className={`glass overflow-hidden ${flash ? "flash-border" : ""}`}>
      <div
        className="flex items-center justify-between border-b px-3 py-2"
        style={{ borderColor: "var(--glass-border)" }}
      >
        <div className="flex items-center gap-3">
          <span
            className="inline-block h-2.5 w-2.5 rounded-full"
            style={{ background: dotColor, boxShadow: `0 0 8px ${dotColor}` }}
          />
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
        className="overflow-auto font-mono text-[13px]"
        style={{ maxHeight, background: "oklch(0.08 0.04 290)" }}
      >
        <div className="flex">
          {showLineNumbers && (
            <div
              className="select-none border-r px-3 py-4 text-right font-mono text-[12px] leading-[1.5]"
              style={{
                background: "oklch(0.06 0.03 290)",
                borderColor: "rgba(255,255,255,0.06)",
                color: "rgba(180,180,220,0.4)",
                minWidth: "2.5rem",
              }}
            >
              {lines.map((_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>
          )}
          <div
            className="flex-1 overflow-auto p-4 [&_pre]:!bg-transparent [&_pre]:!m-0 [&_pre]:leading-[1.5]"
            dangerouslySetInnerHTML={{ __html: html || `<pre>${escapeHtml(code)}</pre>` }}
          />
        </div>
      </div>
      <div
        className="border-t px-3 py-1 font-vt text-xs text-muted-foreground"
        style={{ borderColor: "var(--glass-border)" }}
      >
        {lineCount} LINES
      </div>
    </div>
  );
}

function escapeHtml(s: string) {
  return s.replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" })[c] as string);
}
