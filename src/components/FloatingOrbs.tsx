export function FloatingOrbs() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      {/* Big top radial */}
      <div
        className="absolute -top-40 left-1/2 -translate-x-1/2 h-[900px] w-[900px] rounded-full"
        style={{ background: "var(--bg-radial-1)" }}
      />
      {/* Bottom-right blob */}
      <div
        className="absolute -bottom-40 -right-40 h-[600px] w-[600px] rounded-full"
        style={{ background: "var(--bg-radial-2)" }}
      />
      {/* Drifting orbs */}
      <div
        className="orb-1 absolute top-[20%] left-[10%] h-[400px] w-[400px] rounded-full"
        style={{
          background: "var(--orb-1-color)",
          filter: "blur(100px)",
        }}
      />
      <div
        className="orb-2 absolute top-[50%] right-[15%] h-[300px] w-[300px] rounded-full"
        style={{
          background: "var(--orb-2-color)",
          filter: "blur(80px)",
        }}
      />
      <div
        className="orb-3 absolute bottom-[10%] left-[40%] h-[500px] w-[500px] rounded-full"
        style={{
          background: "var(--orb-3-color)",
          filter: "blur(120px)",
        }}
      />
    </div>
  );
}
