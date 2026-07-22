import { useEffect, useRef, useState } from "react";
import { ExternalLink, Github, Code2, Rocket } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

import p1 from "@/assets/PharmacieManag/1.png";
import p2 from "@/assets/PharmacieManag/2.png";
import p3 from "@/assets/PharmacieManag/3.png";
import p4 from "@/assets/PharmacieManag/4.png";
import p5 from "@/assets/PharmacieManag/5.png";
import p6 from "@/assets/PharmacieManag/6.png";
import p7 from "@/assets/PharmacieManag/7.png";

import e1 from "@/assets/ExamPlannerEmit/1.jpeg";
import e2 from "@/assets/ExamPlannerEmit/2.jpeg";
import e3 from "@/assets/ExamPlannerEmit/3.jpeg";
import e4 from "@/assets/ExamPlannerEmit/4.jpeg";
import e5 from "@/assets/ExamPlannerEmit/5.jpeg";
import e6 from "@/assets/ExamPlannerEmit/6.jpeg";
import e7 from "@/assets/ExamPlannerEmit/7.jpeg";
import e8 from "@/assets/ExamPlannerEmit/8.jpeg";
import e9 from "@/assets/ExamPlannerEmit/9.jpeg";

import pf1 from "@/assets/MyPortFolio/1.png";
import pf2 from "@/assets/MyPortFolio/2.png";
import pf3 from "@/assets/MyPortFolio/3.png";
import pf4 from "@/assets/MyPortFolio/4.png";
import pf5 from "@/assets/MyPortFolio/5.png";
import pf6 from "@/assets/MyPortFolio/6.png";

type Project = {
  title: string;
  description: string;
  tech: string[];
  color: string;
  featured: boolean;
  github?: string;
  demo?: string;
  images?: string[];
};

const projects: Project[] = [
  {
    title: "Pharmacie MANAGE",
    description: "Application pour suivre le stock de médicaments. Le pharmacien enregistre les entrées, les ventes et reçoit une alerte automatique avant la date de péremption.",
    tech: ["MySQL", "Express", "EJS"],
    color: "from-indigo-500/20 to-blue-500/10",
    featured: true,
    github: "https://github.com/Judah-03/PharmaJ",
    demo: "https://pharmaciemanage.vercel.app",
    images: [p1, p2, p3, p4, p5, p6, p7],
  },
  {
    title: "ExamPlannerEmit",
    description: "Application de planification et gestion des examens.",
    tech: ["Flutter", "PostgreSQL", "Express"],
    color: "from-pink-500/20 to-rose-500/10",
    featured: true,
    images: [e1, e2, e3, e4, e5, e6, e7, e8, e9],
  },
  {
    title: "My Port folio",
    description: "Site web personnel avec animations fluides, design premium et mode sombre optimisé.",
    tech: ["React.js", "Tailwind", "TypeScript"],
    color: "from-orange-500/20 to-amber-500/10",
    featured: true,
    images: [pf1, pf2, pf3, pf4, pf5, pf6],
  },
  {
    title: "Gestion des appartements",
    description: "Application de gestion des appartements alloués avec suivi des locataires, paiement et maintenance.",
    tech: ["React.js", "Django", "PostgreSQL"],
    color: "from-blue-500/20 to-cyan-500/10",
    featured: false,
  },
  {
    title: "Bibliothèque Musicale",
    description: "Plateforme complète de gestion et lecture de bibliothèque musicale avec gestion de playlists.",
    tech: ["Java Spring Boot", "MySQL", "React.js"],
    color: "from-emerald-500/20 to-teal-500/10",
    featured: false,
  },
  {
    title: "Rencontre entre Musiciens",
    description: "Application mobile native permettant la rencontre et la collaboration entre musiciens locaux.",
    tech: ["Flutter", "Firebase", "Node.js"],
    color: "from-purple-500/20 to-pink-500/10",
    featured: false,
  },
];

export default function ProjectsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="projects" className="py-16 relative overflow-hidden" ref={ref}>
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/2 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <p className="text-primary font-mono text-xs tracking-widest uppercase mb-1">Portfolio</p>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <h2 className="text-2xl md:text-3xl font-bold font-outfit">
              Mes Projets<span className="text-primary">.</span>
            </h2>
            <p className="text-muted-foreground max-w-sm text-xs">
              Une sélection de mes travaux les plus récents, combinant expertise technique et design soigné.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {projects.map((project, i) => (
            <Dialog key={project.title}>
              <DialogTrigger asChild>
                <div
                  className={`group glass rounded-[1.5rem] overflow-hidden hover-lift transition-all duration-700 border-primary/5 hover:border-primary/20 cursor-pointer ${
                    visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  }`}
                  style={{ transitionDelay: visible ? `${i * 100}ms` : "0ms" }}
                >
                  <div className={`h-28 bg-gradient-to-br ${project.color} relative overflow-hidden`}>
                    {project.images && project.images.length > 0 ? (
                      <Carousel
                        className="w-full h-full absolute inset-0 opacity-70 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none mix-blend-overlay"
                        opts={{ loop: true, watchDrag: false }}
                        plugins={[Autoplay({ delay: 3000 })]}
                      >
                        <CarouselContent className="h-full ml-0">
                          {project.images.map((img, idx) => (
                            <CarouselItem key={idx} className="h-full pl-0 basis-full">
                              <img src={img} alt="" className="w-full h-full object-cover" />
                            </CarouselItem>
                          ))}
                        </CarouselContent>
                      </Carousel>
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                        <Code2 className="w-10 h-10 text-white/20 group-hover:text-white/40 group-hover:scale-110 transition-all duration-500" />
                      </div>
                    )}
                    
                    {project.featured && (
                      <div className="absolute top-3 left-3 px-2 py-0.5 rounded-full glass border border-white/10 text-[8px] font-bold uppercase tracking-wider text-white bg-primary/40 backdrop-blur-md">
                        Featured
                      </div>
                    )}
                    
                    <div className="absolute inset-0 bg-background/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center gap-3">
                      {project.demo ? (
                        <button onClick={(e) => { e.stopPropagation(); window.open(project.demo, '_blank'); }} className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:scale-110 transition-transform shadow-xl shadow-primary/20">
                          <ExternalLink className="w-4 h-4" />
                        </button>
                      ) : (
                        <button onClick={(e) => { e.stopPropagation(); }} className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:scale-110 transition-transform shadow-xl shadow-primary/20">
                          <ExternalLink className="w-4 h-4" />
                        </button>
                      )}
                      {project.github ? (
                        <button onClick={(e) => { e.stopPropagation(); window.open(project.github, '_blank'); }} className="w-8 h-8 rounded-full glass flex items-center justify-center hover:scale-110 transition-transform border-white/20">
                          <Github className="w-4 h-4" />
                        </button>
                      ) : (
                        <button onClick={(e) => { e.stopPropagation(); }} className="w-8 h-8 rounded-full glass flex items-center justify-center hover:scale-110 transition-transform border-white/20">
                          <Github className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="p-1 rounded-lg bg-primary/10 text-primary">
                        <Rocket className="w-3 h-3" />
                      </span>
                      <h3 className="text-base font-bold font-outfit text-foreground group-hover:text-primary transition-colors duration-300">
                        {project.title}
                      </h3>
                    </div>
                    <p className="text-muted-foreground text-[0.7rem] leading-relaxed mb-4 line-clamp-2">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 rounded-md bg-secondary/50 text-secondary-foreground text-[8px] font-semibold border border-primary/5 group-hover:border-primary/20 transition-all duration-500"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </DialogTrigger>
              
              {project.images && project.images.length > 0 && (
                <DialogContent className="max-w-4xl bg-background/95 backdrop-blur-xl border border-primary/20 text-foreground overflow-hidden">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-outfit text-primary">{project.title}</DialogTitle>
                    <DialogDescription className="text-muted-foreground">{project.description}</DialogDescription>
                  </DialogHeader>
                  <div className="py-4 w-full flex items-center justify-center">
                    <Carousel 
                      className="w-full max-w-2xl" 
                      opts={{ loop: true }}
                      plugins={[
                        Autoplay({
                          delay: 2500,
                        }),
                      ]}
                    >
                      <CarouselContent>
                        {project.images.map((img, idx) => (
                          <CarouselItem key={idx}>
                            <div className="p-1 flex justify-center">
                              <img src={img} alt={`${project.title} capture ${idx + 1}`} className="w-auto h-auto rounded-xl border border-primary/10 shadow-lg object-contain max-h-[60vh] max-w-full" />
                            </div>
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      <CarouselPrevious className="hidden sm:flex -left-12 bg-primary/10 border-primary/20 hover:bg-primary/20 text-primary" />
                      <CarouselNext className="hidden sm:flex -right-12 bg-primary/10 border-primary/20 hover:bg-primary/20 text-primary" />
                    </Carousel>
                  </div>
                </DialogContent>
              )}
            </Dialog>
          ))}
        </div>
      </div>
    </section>
  );
}
