import { useEffect, useRef, useState } from "react";
import { Download } from "lucide-react";
import aboutImg from "@/assets/about-judah.jpg";

const stats = [
  { label: "Projets réalisés", value: "10+" },
  { label: "Technologies", value: "12+" },
  { label: "Années d'étude", value: "3" },
];

export default function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.2 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="about" className="py-24 relative overflow-hidden" ref={ref}>
      <div className="absolute top-1/2 -right-32 w-96 h-96 rounded-full bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-primary/10 to-transparent" />
      <div className="absolute bottom-1/4 -left-32 w-80 h-80 rounded-full bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-accent/10 to-transparent" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <p className="text-primary font-mono text-xs tracking-widest uppercase mb-1">À propos</p>
          <h2 className="text-2xl md:text-3xl font-bold mb-10 font-outfit">
            Qui suis-je<span className="text-primary">?</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-12 gap-12 items-center">
          {/* Left: Photo */}
          <div className={`md:col-span-4 transition-all duration-700 delay-400 ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}>
            <div className="relative group max-w-[280px] mx-auto">
              {/* Floating elements */}
              <div className="absolute -top-3 -left-3 w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 animate-float z-0" />
              <div className="absolute -bottom-4 -right-4 w-20 h-20 rounded-full border border-accent/20 animate-float-slow z-0" />
              
              <div className="relative z-10 rounded-2xl overflow-hidden glass p-1.5 hover:glow-border transition-all duration-500">
                <div className="rounded-xl overflow-hidden aspect-[4/5] relative">
                  <img 
                    src={aboutImg} 
                    alt="Judah Ny Aina Fy" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Subtle overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent mix-blend-overlay opacity-60" />
                </div>
              </div>
              
              {/* Experience Badge */}
              <div className="absolute -bottom-2 -right-4 glass px-4 py-2 rounded-xl border-primary/20 shadow-2xl z-20 animate-fade-in group-hover:scale-110 transition-transform">
                <p className="text-[9px] text-muted-foreground uppercase tracking-wider font-bold">Passion</p>
                <p className="text-sm font-bold text-primary">Innovation</p>
              </div>
            </div>
          </div>

          {/* Right: Content */}
          <div className={`md:col-span-8 transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}>
            <div className="glass rounded-3xl p-8 md:p-10 relative group overflow-hidden">
              {/* Decorative line */}
              <div className="absolute top-0 right-0 w-1 h-full bg-primary/30" />
              
              <div className="space-y-5">
                <p className="text-muted-foreground leading-relaxed text-base">
                  Développeur web <span className="text-foreground font-semibold">Full Stack Junior</span> passionné par la création d'expériences numériques de haute qualité.
                </p>
                
                <p className="text-muted-foreground leading-relaxed text-base">
                  Actuellement étudiant en <span className="text-foreground font-semibold">Licence 3 Informatique</span> à l'EMIT Fianarantsoa, j'ai développé une solide expertise dans le développement d'applications web modernes, tant au niveau du front-end que du back-end.
                </p>

                <p className="text-muted-foreground leading-relaxed text-base italic border-l-2 border-primary/20 pl-4 py-1">
                  "Mon approche combine créativité visuelle et rigueur technique pour transformer des idées complexes en solutions intuitives."
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                  {stats.map((stat, i) => (
                    <div 
                      key={stat.label} 
                      className={`glass rounded-2xl p-3 text-center transition-all duration-500 hover:glow-border`}
                      style={{ transitionDelay: `${i * 100}ms` }}
                    >
                      <p className="text-xl font-bold text-gradient">{stat.value}</p>
                      <p className="text-[9px] text-muted-foreground uppercase tracking-widest mt-0.5 font-medium">{stat.label}</p>
                    </div>
                  ))}
                </div>

                <div className="pt-6">
                  <a
                    href="/CVJudahAndriatiana.pdf"
                    download
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:opacity-90 transition-all duration-300 shadow-lg shadow-primary/20"
                  >
                    <Download className="w-4 h-4" />
                    Télécharger mon CV
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
