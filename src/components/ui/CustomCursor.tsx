import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const outerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Don't show on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const outer = outerRef.current;
    const glow = glowRef.current;
    const dot = dotRef.current;
    if (!outer || !glow || !dot) return;

    let x = 0;
    let y = 0;
    let isPointer = false;

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;

      const target = e.target as HTMLElement;
      const newIsPointer =
        window.getComputedStyle(target).cursor === "pointer" ||
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") !== null ||
        target.closest("a") !== null;

      if (newIsPointer !== isPointer) {
        isPointer = newIsPointer;
        outer.style.transform = `translate(${x - 16}px, ${y - 16}px) scale(${isPointer ? 2 : 1})`;
        outer.style.boxShadow = isPointer
          ? "0 0 20px oklch(0.55 0.18 15 / 20%)"
          : "none";
        dot.style.transform = `scale(${isPointer ? 0 : 1})`;
      } else {
        outer.style.transform = `translate(${x - 16}px, ${y - 16}px) scale(${isPointer ? 2 : 1})`;
      }
      glow.style.transform = `translate(${x - 4}px, ${y - 4}px)`;
    };

    const onEnter = () => {
      outer.style.opacity = "1";
      glow.style.opacity = "0.4";
    };
    const onLeave = () => {
      outer.style.opacity = "0";
      glow.style.opacity = "0";
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.body.addEventListener("mouseenter", onEnter);
    document.body.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.body.removeEventListener("mouseenter", onEnter);
      document.body.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <>
      <div
        ref={outerRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-primary/50 pointer-events-none z-[9999] flex items-center justify-center"
        style={{
          opacity: 0,
          transition: "transform 0.15s ease-out, opacity 0.3s, box-shadow 0.3s",
          willChange: "transform",
        }}
      >
        <div
          ref={dotRef}
          className="w-1 h-1 bg-primary rounded-full"
          style={{ transition: "transform 0.2s" }}
        />
      </div>
      <div
        ref={glowRef}
        className="fixed top-0 left-0 w-2 h-2 bg-primary rounded-full pointer-events-none z-[9999]"
        style={{
          opacity: 0,
          filter: "blur(4px)",
          willChange: "transform",
          transition: "opacity 0.3s",
        }}
      />
    </>
  );
}
