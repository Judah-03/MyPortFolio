import { useState, useEffect } from "react";
import logo from "@/assets/logo.jpg";
import { Mail } from "lucide-react";

const navLinks = [
  { label: "Accueil", href: "#hero" },
  { label: "À propos", href: "#about" },
  { label: "Compétences", href: "#skills" },
  { label: "Projets", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 50);
          const sections = navLinks.map((l) => l.href.slice(1));
          for (const id of [...sections].reverse()) {
            const el = document.getElementById(id);
            if (el && el.getBoundingClientRect().top <= 120) {
              setActiveSection((prev) => (prev !== id ? id : prev));
              break;
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    const el = document.getElementById(href.slice(1));
    el?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "glass py-3 border-b border-white/5 shadow-xl" : "py-6 bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <button 
          onClick={() => scrollTo("#hero")} 
          className="flex items-center group relative bg-transparent border-none p-0 outline-none transition-transform hover:scale-105 active:scale-95"
        >
          {/* Logo Glow Effect */}
          <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <img 
            src={logo} 
            alt="JUDAH" 
            className="h-14 w-auto object-contain relative z-10 drop-shadow-[0_0_8px_rgba(255,255,255,0.1)]" 
            style={{ mixBlendMode: 'screen' }} 
          />
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-10">
          <ul className="flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <button
                  onClick={() => scrollTo(link.href)}
                  className={`text-sm font-semibold tracking-wide transition-all duration-300 relative py-1 font-outfit ${
                    activeSection === link.href.slice(1)
                      ? "text-primary scale-110"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.label}
                  <span 
                    className={`absolute bottom-0 left-0 h-[2px] bg-primary rounded-full transition-all duration-500 ${
                      activeSection === link.href.slice(1) ? "w-full" : "w-0 group-hover:w-full"
                    }`} 
                  />
                </button>
              </li>
            ))}
          </ul>
          
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-foreground p-2 relative z-50 transition-transform active:scale-90"
          aria-label="Menu"
        >
          <div className="w-6 flex flex-col gap-1.5">
            <span className={`block h-0.5 bg-foreground transition-all duration-500 ${mobileOpen ? "rotate-45 translate-y-2 w-6" : "w-4"}`} />
            <span className={`block h-0.5 bg-primary transition-all duration-500 ${mobileOpen ? "opacity-0" : "w-6"}`} />
            <span className={`block h-0.5 bg-foreground transition-all duration-500 ${mobileOpen ? "-rotate-45 -translate-y-2 w-6" : "ml-auto w-3"}`} />
          </div>
        </button>
      </div>

      {/* Mobile menu overlay */}
      <div 
        className={`md:hidden fixed inset-0 bg-background/96 backdrop-blur-3xl z-40 transition-all duration-500 flex flex-col items-center justify-center ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col gap-8">
          {navLinks.map((link, i) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className={`group transition-all duration-500 ${
                mobileOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="flex items-center gap-6">
                <span className="text-primary font-mono text-[10px] tracking-tighter opacity-40">0{i+1}</span>
                <span className="text-2xl font-bold font-outfit tracking-tighter group-hover:text-primary transition-all duration-300">
                  {link.label}
                </span>
                <div className="w-12 h-px bg-primary/20 group-hover:w-20 group-hover:bg-primary transition-all duration-500 rounded-full" />
              </div>
            </button>
          ))}
        </div>

        {/* Minimalist brand hint at bottom */}
        <div className="absolute bottom-12 flex flex-col items-center opacity-20 pointer-events-none">
          <div className="h-12 w-px bg-gradient-to-b from-transparent via-primary to-transparent mb-4" />
          <span className="text-[10px] font-mono tracking-[0.3em] uppercase">Architecture • Excellence</span>
        </div>
      </div>
    </nav>
  );
}
