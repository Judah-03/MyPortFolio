import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      const target = e.target as HTMLElement;
      setIsPointer(
        window.getComputedStyle(target).cursor === "pointer" ||
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") !== null ||
        target.closest("a") !== null
      );
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", updatePosition);
    document.body.addEventListener("mouseenter", handleMouseEnter);
    document.body.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", updatePosition);
      document.body.removeEventListener("mouseenter", handleMouseEnter);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null; // Don't show on touch devices
  }

  return (
    <>
      <div 
        className={`fixed top-0 left-0 w-8 h-8 rounded-full border border-primary/50 pointer-events-none z-[9999] transition-transform duration-300 ease-out flex items-center justify-center ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        style={{ 
          transform: `translate(${position.x - 16}px, ${position.y - 16}px) scale(${isPointer ? 2 : 1})`,
          boxShadow: isPointer ? '0 0 20px oklch(0.55 0.18 15 / 20%)' : 'none'
        }}
      >
        <div className={`w-1 h-1 bg-primary rounded-full transition-transform duration-200 ${isPointer ? 'scale-0' : 'scale-100'}`} />
      </div>
      <div 
        className={`fixed top-0 left-0 w-2 h-2 bg-primary rounded-full pointer-events-none z-[9999] transition-opacity duration-300 ${isVisible ? 'opacity-40' : 'opacity-0'}`}
        style={{ 
          transform: `translate(${position.x - 4}px, ${position.y - 4}px)`,
          filter: 'blur(4px)'
        }}
      />
    </>
  );
}
