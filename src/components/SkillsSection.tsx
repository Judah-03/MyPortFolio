import { useEffect, useRef, useState } from "react";

interface Skill {
  name: string;
  category: string;
  svg: string;
  color: string;
  level: string;
}

const skills: Skill[] = [
  { name: "React.js", category: "Frontend", level: "Avancé", color: "#61DAFB", svg: `<svg viewBox="0 0 256 228"><path d="M210.5 113.9c0-14.5-17.8-28.3-45.1-36.8 6.3-27.8 3.5-50-8.4-57.9-2.7-1.8-5.9-2.7-9.5-2.7v9.5c1.9 0 3.4.4 4.7 1.1 5.7 3.3 8.2 16.4 6.3 33.2-.5 4.1-1.2 8.5-2.2 13-8.7-2.1-18.2-3.7-28.2-4.7-6-8.3-12.3-15.8-18.6-22.4 14.6-13.5 28.3-20.9 37.6-20.9V15c-12.4 0-28.7 8.8-45.4 24.1-16.7-15.2-33-23.9-45.4-23.9v9.5c9.3 0 23 7.3 37.6 20.7-6.3 6.5-12.5 14-18.5 22.3-10 1-19.5 2.7-28.2 4.7-1-4.4-1.7-8.7-2.2-12.7-1.9-16.8.5-29.9 6.2-33.3 1.2-.8 2.9-1.1 4.7-1.1v-9.5c-3.7 0-6.9.9-9.7 2.7-11.8 6.8-14.6 30-8.3 57.7C19.3 85.5 1.5 99.3 1.5 113.9c0 14.5 17.8 28.3 45.1 36.8-6.3 27.8-3.5 50 8.4 57.9 2.7 1.8 6 2.7 9.7 2.7 12.4 0 28.7-8.8 45.4-24.1 16.7 15.2 33 23.9 45.4 23.9 3.7 0 6.9-.9 9.7-2.7 11.8-6.8 14.6-30 8.3-57.7 27.1-8.5 44.8-22.3 44.8-36.8z" fill="currentColor"/><circle cx="128" cy="113.9" r="23.5" fill="currentColor"/>` },
  { name: "Flutter", category: "Mobile", level: "Maîtrisé", color: "#02569B", svg: `<svg viewBox="0 0 256 317"><path d="M157.7 0L1.6 156.2l48.8 48.9L206.5 48.8h.1L157.7 0zm0 120.3L71.7 206.4l48.8 48.8 37.2-37.2.1.1 48.8-48.8-48.9-49z" fill="currentColor"/></svg>` },
  { name: "Spring Boot", category: "Backend", level: "Maîtrisé", color: "#6DB33F", svg: `<svg viewBox="0 0 256 256"><path d="M116.3 4.7C84.8 12 58 30.8 40.2 57.3c-7 10.5-14.3 26.3-17.4 37.9-6 22.2-5.5 47.7 1.3 69 3.5 11 6.7 17.7 13.5 28.5 22.3 35.5 58 57.5 100.2 61.7 11.1 1.1 30.2.3 40.5-1.7 34.2-6.8 63-26.5 82.2-56.3 6.1-9.5 13.3-25.3 16-35.2 6.3-23.1 6-49.7-.8-72-3.3-10.7-6.2-17-12.8-27.5C240.7 32.3 204.8 9.8 163 3.7c-8.5-1.2-38.2-1-46.7 1zm55.5 60.8c.8.4.8 1.7.8 53.5v53l1.6 2c6.7 8.6-2.5 21.2-12.2 16.7-5.8-2.7-7.5-10.7-3.5-15.8l1.6-2v-46.6c0-41.7-.1-46.6-.8-46.3-.5.2-14.5 17.3-31.3 38s-31 38.2-31.5 38.8c-.8.9 2.4 5 18.8 23.8L133 151l-2.2 2.2-2.3 2.3-20-22.2c-11-12.3-20.3-22.5-20.7-22.8-.6-.5-3.1 2.5-23.2 28L42 167.3l-2.7-2-2.7-2L60.5 132c13-17.3 23.8-31.7 24-32 .2-.3-6-8.5-13.7-18.3L57 65.3l2.5-2 2.5-1.8 11.8 15.7c6.5 8.7 12 15.8 12.3 15.8.3 0 15-19 32.7-42.3l32.3-42.2H166c8.4 0 15.5.3 15.8.7v.3z" fill="currentColor"/></svg>` },
  { name: "Django", category: "Backend", level: "Avancé", color: "#092E20", svg: `<svg viewBox="0 0 256 326"><path d="M114.8 0h53.6v258.8c-27.5 5.2-47.7 7.3-69.7 7.3-65.5 0-99.7-29.6-99.7-86.3 0-54.1 37-89.4 94.5-89.4 8.3 0 14.6.7 21.3 2.5V0zm0 163.4c-5.7-1.8-10.4-2.5-16.7-2.5-27.9 0-44 17.2-44 47.4 0 29.2 15.3 45.3 43.3 45.3 5.5 0 10-0.3 17.4-1.5v-88.7zM227.5 60.2v173.1c0 36.7-2.7 54.3-10.8 69.5-7.5 14.6-17.4 23.8-37.7 34l-49.7-23.6c20.3-9.5 30.2-17.9 37-31.3 7.3-13.8 9.6-29.8 9.6-69.4V60.2h51.6zm-51.6-60h51.6v42H176V.2z" fill="currentColor"/></svg>` },
  { name: "ASP.NET", category: "Backend", level: "Fondamentaux", color: "#512BD4", svg: `<svg viewBox="0 0 256 256"><path d="M128 0C57.3 0 0 57.3 0 128s57.3 128 128 128 128-57.3 128-128S198.7 0 128 0zm-9.5 199.3c-3.4 8.3-8.1 15-14 20-6 5-12.8 8.5-20.4 10.5-7.6 2-15.8 3-24.5 3-7 0-13.2-.5-18.5-1.6v-26c5.5 2.3 12.2 3.5 20 3.5 7.8 0 13.8-2.3 17.8-7 4-4.6 6-11.4 6-20.3V85h33.5v87.7c0 10.8-1.3 20.3-4.6 26.6h4.7zm75-17.3h-30l-5.5-18h-32l-5.2 18h-29l34.5-97h32.5l35.2 97zm-41.5-38l-10.5-38.2L131 144h21z" fill="currentColor"/></svg>` },
  { name: "MongoDB", category: "Base de données", level: "Maîtrisé", color: "#47A248", svg: `<svg viewBox="0 0 256 549"><path d="M175.6 509.5l-24.1 35.7c-3-1.4-5.5-3.5-7.3-6-1.9-2.5-3.1-5.4-3.6-8.5L130 477.1c-3.9-20.8-14.4-39.6-30-53.5a180.5 180.5 0 01-56.3-108.1c-7.7-52.4 8.7-105 44.2-142.1C108.1 150.2 128 128 128 128s19.9 22.2 40.1 45.4c35.5 37.1 51.9 89.7 44.2 142.1a180.5 180.5 0 01-56.3 108.1c5.3 6.7 11.2 22.8 19.6 85.9z" fill="currentColor"/></svg>` },
  { name: "MySQL", category: "Base de données", level: "Avancé", color: "#4479A1", svg: `<svg viewBox="0 0 256 252"><path d="M236 194.2c-13.7-.1-24.3 1-33.3 4.6-2.6 1-6.7 1-7.1 4.2 1.4 1.4 1.6 3.6 2.8 5.4 2.2 3.4 6 7.9 9.4 10.3l11.5 7.9c6.3 3.4 13.4 5.4 19.5 8.8 3.6 2 7.1 4.6 10.7 6.8 1.8 1.2 3 3 5.2 3.8v-.4c-1.2-1.5-1.5-3.6-2.6-5.4L245 231c-5.4-5.8-12.1-10.8-19.5-14.6l-17.3-8.2c-2-1-5.5-1.5-6.7-3.2-3-3.8-4.7-8.7-6.9-13.1L184.7 172c-3.3-7.3-5.5-14.5-9.4-21.2-18.3-31-38.3-49.7-69-68.1-6.5-3.9-14.4-5.5-22.7-7.5l-13.4-.8c-2.7-1.2-5.6-4.6-8-6.3-10-7.9-35.6-25.1-43-2.4-4.6 14.3 6.9 28.3 10.9 35.5 2.8 5.2 6.5 11 8.6 16.6 1.4 3.6 1.6 7.3 3 11.1 3.4 9.3 6.7 19.6 11.1 28.3 2.2 4.4 4.7 8.9 7.5 12.8 1.7 2.4 4.6 3.5 5.3 7.1-3 4.2-3.2 10.6-4.9 15.9-7.5 23.5-4.7 52.7 6 69.9 3.3 5.3 11 16.6 21.4 12.3 9.1-3.8 7.1-15.5 9.7-25.8.6-2.3.2-4 1.4-5.6v.4l8.2 16.5c6.1 9.8 16.9 20 26 26.8 4.7 3.5 8.4 9.6 14.3 11.8V274h-.4c-1.2-1.8-3-2.6-4.6-4l-10.5-11.7c-9.2-12.2-17.2-25.5-24-39.1-3.3-6.6-6.2-13.9-8.9-20.7-1-2.7-1-6.7-3-8.2-2.8 4.3-6.9 7.8-9 13.2-3.4 8.6-3.8 19-5.1 29.8l-.7.2c-6.4-1.6-8.7-8.1-11.1-13.6-6.2-14-7.3-36.5-1.9-52.7 1.4-4.2 7.6-17.4 5.1-21.4-1.2-3.8-5.2-6-7.5-9-2.8-3.7-5.7-8.5-7.7-12.7-5.2-11-7.7-23.3-13.2-34.3-2.6-5.3-7-10.6-10.7-15.5-4-5.4-8.5-9.4-11.7-15.8-1.1-2.2-2.6-5.8-1.8-8.2.3-1.7.9-2.4 2.6-2.8 2.8-2.3 10.7 1 13.6 2.4 7.8 3.2 14.3 6.3 20.8 10.9 3 2.2 6.1 6.4 10 7.5h4.4c6.9 1.6 14.6.4 21.1 2.2 11.5 4 21.8 9.9 31 16.5 28 20.1 51 48.8 66.5 83 2.5 5.5 3.6 10.7 5.8 16.4 4.5 11.6 10.2 23.5 14.7 34.8 4.5 11.3 8.8 22.7 15.3 32.1 3.4 5 16.5 7.7 22.4 10.3 4.2 1.9 10.9 3.8 14.7 6.2l8.6 6.2c1.4 1 5.8 3.2 6.1 5z" fill="currentColor"/></svg>` },
  { name: "PostgreSQL", category: "Base de données", level: "Maîtrisé", color: "#336791", svg: `<svg viewBox="0 0 256 264"><path d="M255.0 158.1c-1.6-7.9-6.4-12.7-13.8-13.9-3.6-.6-7.3-.5-11.1.3 3.6-11.4 5.1-22.7 4.5-33.7-.9-16.8-6.3-30.7-16-41.2-5.4-5.9-12-10.6-19.5-14-3.3-17.3-10.8-31.5-22.2-42.4C164.5 1.2 148.1-3 128.1 1.8c-10.5-2.5-20.7-.7-30.4 5.3C89.9 2.3 80.6-.6 70.4.2 55.5 1.4 43.8 8.5 35.6 21.2c-7.1 11-10.8 24.4-11 39.8-11.3 7.4-18.7 17.3-22 29.6-4.3 15.9-2.6 33.7 4.8 52.9-2.2 9-2.2 17.5.3 25.2 2.7 8.4 8.3 14.6 16.4 18.2 5.3 2.4 10.8 3.3 16.5 2.7 5.4-.6 10.7-2.5 15.7-5.5 5.1 6.9 11.5 11.7 19.3 14.5 4.7 1.7 9.4 2.5 14.3 2.7l1.3 0c6 0 12.4-1.5 18.8-4.3 1.1 3.5 2.5 6.9 4.2 10 5.5 10 13.9 18.1 24.4 23.5 8.3 4.3 17 6.7 26 7.1.8 0 1.5 0 2.3 0 13.3 0 25.6-4.6 36.5-13.9 12.7-10.8 20.3-25.6 22.5-44 4.3 1.2 8.6 1.2 12.6.1 9.1-2.5 15-9.3 17-19.5 1.7-8.4 1.2-18.3-1.4-28.1z" fill="currentColor"/></svg>` },
  { name: "SQLite", category: "Base de données", level: "Avancé", color: "#003B57", svg: `<svg viewBox="0 0 256 256"><path d="M128 0C57.3 0 0 57.3 0 128s57.3 128 128 128 128-57.3 128-128S198.7 0 128 0zm-5 210c-6 0-12-1-17-3s-10-5-14-9-7-8-10-14c-2-5-3-11-3-17s1-12 3-17c3-6 6-10 10-14s9-7 14-9 11-3 17-3c8 0 15 2 21 6s11 10 14 17l-13 6c-2-5-5-9-9-12s-9-4-14-4c-4 0-8 1-11 2s-7 4-10 7-5 6-6 10-2 8-2 13 1 9 2 13 4 7 6 10 6 5 10 7 7 2 11 2c5 0 10-1 14-4s7-7 9-12l13 6c-3 7-8 13-14 17s-13 6-21 6z" fill="currentColor"/></svg>` },
  { name: "HTML/CSS/JS", category: "Frontend", level: "Avancé", color: "#E34F26", svg: `<svg viewBox="0 0 256 256"><path d="M128 0L23.3 25.9l16 179.7L128 256l88.7-50.4 16-179.7L128 0zm73.5 193.3l-73.5 40.8-73.5-40.8L41.8 45h172.4l-12.7 148.3z" fill="currentColor"/><path d="M128 56H80l2 24h46v-24zm0 68H96l2 24h30v-24zm0 68l-34-10-2-24H68l4 48 56 16v-30z" fill="currentColor"/><path d="M128 56v24h46l-4-24h-42zm0 68v24h30l-2-24h-28zm0 68v30l56-16 4-48h-24l-2 24-34 10z" fill="currentColor"/></svg>` },
];

const categories = ["Tous", "Frontend", "Backend", "Base de données", "Mobile"];

export default function SkillsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState("Tous");

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const filtered = activeCategory === "Tous" ? skills : skills.filter((s) => s.category === activeCategory);

  return (
    <section id="skills" className="py-24 relative overflow-hidden" ref={ref}>
      {/* Background decorations */}
      <div className="absolute top-1/4 -left-32 w-80 h-80 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute bottom-1/4 -right-32 w-80 h-80 rounded-full bg-accent/5 blur-3xl" />
      
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <p className="text-primary font-mono text-xs tracking-widest uppercase mb-1">Compétences</p>
          <h2 className="text-2xl md:text-3xl font-bold mb-6 font-outfit">
            Technologies<span className="text-primary">.</span>
          </h2>
        </div>

        {/* Category filter */}
        <div className={`flex flex-wrap gap-2 mb-12 transition-all duration-700 delay-100 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25 scale-105"
                  : "bg-secondary/50 text-secondary-foreground hover:bg-secondary border border-transparent hover:border-primary/20"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skills grid - logo cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {filtered.map((skill, i) => (
            <div
              key={skill.name}
              className={`group glass rounded-2xl p-4 flex flex-col items-center justify-center gap-3 hover-lift cursor-default transition-all duration-500 overflow-hidden relative ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: visible ? `${i * 50}ms` : "0ms" }}
            >
              {/* Animated glow background */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                style={{ background: `radial-gradient(circle at center, ${skill.color}, transparent)` }}
              />

              <div
                className="w-12 h-12 flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:drop-shadow-[0_0_15px_var(--tw-shadow-color)] relative z-10"
                style={{ color: skill.color, ["--tw-shadow-color" as string]: skill.color + "80" }}
                dangerouslySetInnerHTML={{ __html: skill.svg }}
              />
              
              <div className="text-center relative z-10">
                <p className="text-sm font-bold text-foreground transition-colors duration-300 font-outfit">
                  {skill.name}
                </p>
                <p className="text-[10px] font-mono text-muted-foreground mt-1 uppercase tracking-tighter opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  {skill.level}
                </p>
              </div>

              {/* Decorative corner indicator */}
              <div 
                className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full opacity-40 group-hover:opacity-100 transition-opacity"
                style={{ backgroundColor: skill.color }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
