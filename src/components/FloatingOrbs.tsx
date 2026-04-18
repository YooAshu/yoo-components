export function FloatingOrbs() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      {/* Big top radial */}
      <div
        className="absolute -top-40 left-1/2 -translate-x-1/2 h-[800px] w-[800px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, oklch(0.6 0.28 305 / 0.15), transparent 70%)",
        }}
      />
      {/* Bottom-right blob */}
      <div
        className="absolute -bottom-40 -right-40 h-[600px] w-[600px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, oklch(0.4 0.2 290 / 0.12), transparent 70%)",
        }}
      />
      {/* Drifting orbs */}
      <div
        className="orb-1 absolute top-[20%] left-[10%] h-72 w-72 rounded-full opacity-40"
        style={{
          background: "oklch(0.6 0.28 305 / 0.4)",
          filter: "blur(100px)",
        }}
      />
      <div
        className="orb-2 absolute top-[50%] right-[15%] h-80 w-80 rounded-full opacity-30"
        style={{
          background: "oklch(0.55 0.25 280 / 0.4)",
          filter: "blur(120px)",
        }}
      />
      <div
        className="orb-3 absolute bottom-[10%] left-[40%] h-64 w-64 rounded-full opacity-35"
        style={{
          background: "oklch(0.65 0.3 320 / 0.4)",
          filter: "blur(90px)",
        }}
      />
    </div>
  );
}
