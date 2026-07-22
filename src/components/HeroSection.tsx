import { Download, ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import profileImg from "@/assets/profile.jpg";

export default function HeroSection() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="min-h-screen flex items-center relative overflow-hidden py-24">
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-primary/20 to-transparent animate-float" />
      <div className="absolute bottom-1/4 -right-32 w-80 h-80 rounded-full bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-accent/20 to-transparent animate-float" style={{ animationDelay: "3s" }} />

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: "linear-gradient(oklch(1 0 0 / 10%) 1px, transparent 1px), linear-gradient(90deg, oklch(1 0 0 / 10%) 1px, transparent 1px)",
        backgroundSize: "60px 60px"
      }} />

      <div className="max-w-6xl mx-auto px-6 flex flex-col-reverse md:flex-row items-center gap-12 md:gap-20 relative z-10 w-full">
        {/* Left/Bottom: Content */}
        <div className="flex-1 text-center md:text-left">


          <div className="animate-fade-up-delay-1 mb-8">
            <h1 className="text-3xl md:text-5xl font-extrabold leading-[1.1] font-outfit tracking-tight">

              <span className="text-primary text-glow">Développeur FULL STACK</span>
              <br />
              <span className="text-foreground block mt-2 hover:scale-[1.01] transition-transform duration-500 cursor-default">
                Ny Aina Fy Judah{" "}
                <span className="opacity-90 tracking-tighter">ANDRIATIANA</span>
              </span>
            </h1>
          </div>

          <p className="mt-8 text-muted-foreground text-sm md:text-base leading-relaxed animate-fade-up-delay-2 max-w-lg mx-auto md:mx-0 font-medium">
            Expert en technologies web modernes, je conçois des <span className="text-foreground font-semibold">solutions performantes</span> alliant élégance et innovation numérique pour transformer vos visions en réalité.
          </p>

          <div className="mt-10 flex flex-wrap justify-center md:justify-start gap-4 animate-fade-up-delay-3">
            <button
              onClick={() => scrollTo("projects")}
              className="px-8 py-4 rounded-xl bg-primary text-primary-foreground text-xs font-bold hover:shadow-[0_0_30px_oklch(0.55_0.18_15/40%)] transition-all duration-300 transform hover:-translate-y-1 active:scale-95"
            >
              Voir mes projets
            </button>
            <button
              onClick={() => scrollTo("contact")}
              className="px-8 py-4 rounded-xl border-2 border-primary/20 text-primary text-xs font-bold hover:bg-primary/5 transition-all duration-300 flex items-center gap-2 group transform hover:-translate-y-1 active:scale-95"
            >
              <Mail className="w-4 h-4" />
              Mes contacts
            </button>
          </div>

          {/* Social links */}
          <div className="mt-12 flex justify-center md:justify-start gap-5 animate-fade-up-delay-3">
            {[
              { icon: Github, href: "https://github.com/Judah-03", label: "GitHub" },
              { icon: Linkedin, href: "#", label: "LinkedIn" },
              { icon: Mail, href: "mailto:fyjudahandriatiana@gmail.com", label: "Email" },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                className="w-12 h-12 rounded-2xl glass flex items-center justify-center text-muted-foreground hover:text-primary hover:glow-border transition-all duration-500 scale-100 hover:scale-110"
                aria-label={label}
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>

        {/* Right/Top: Profile Image */}
        <div className="flex-1 flex justify-center animate-fade-up-delay-2 mb-12 md:mb-0">
          <div className="relative group">
            {/* Animated background shapes */}
            <div className="absolute -inset-6 rounded-[3rem] border-2 border-primary/20 animate-[spin_20s_linear_infinite] opacity-40 blur-[1px]" />
            <div className="absolute -inset-10 rounded-full border border-accent/10 animate-[spin_25s_linear_infinite_reverse] opacity-20 blur-[1px]" />

            <div className="w-72 h-72 md:w-80 md:h-80 lg:w-[400px] lg:h-[400px] rounded-[3rem] overflow-hidden glass p-3 md:p-4 block relative z-10 hover:scale-[1.02] transition-transform duration-700 shadow-2xl">
              <div className="w-full h-full rounded-[2.2rem] md:rounded-[2.8rem] overflow-hidden relative">
                <img
                  src={profileImg}
                  alt="Ny Aina Fy Judah ANDRIATIANA"
                  className="w-full h-full object-cover object-top transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent mix-blend-overlay opacity-60" />
              </div>
            </div>

            {/* Floaties */}
            <div className="absolute -top-8 -right-8 w-20 h-20 rounded-3xl bg-primary/20 animate-float backdrop-blur-3xl border border-primary/10" />
            <div className="absolute -bottom-12 left-12 w-16 h-16 rounded-full bg-accent/20 animate-float-slow backdrop-blur-3xl border border-accent/10" />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 animate-fade-up-delay-3 opacity-50">
        <div className="w-[1px] h-16 bg-gradient-to-b from-primary/60 to-transparent" />
      </div>
    </section>
  );
}
