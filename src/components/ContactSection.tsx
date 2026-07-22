import { useEffect, useRef, useState } from "react";
import { Mail, Phone, MapPin, Send, Github, Linkedin, ExternalLink, CheckCircle, AlertCircle } from "lucide-react";
import emailjs from "@emailjs/browser";

const contactInfo = [
  { icon: Mail, label: "Email", value: "fyjudahandriatiana@gmail.com", href: "mailto:fyjudahandriatiana@gmail.com" },
  { icon: Phone, label: "Téléphone", value: "+261 34 50 371 67 ", href: "tel:+261345037167" },
  { icon: MapPin, label: "Localisation", value: "Fianarantsoa, Madagascar", href: "#" },
];

const socials = [
  { icon: Github, label: "GitHub", href: "https://github.com/Judah-03" },
  { icon: Linkedin, label: "LinkedIn", href: "#" },
];

// EmailJS config — you need to set these up at https://www.emailjs.com/
const EMAILJS_SERVICE_ID = "service_portfolio";
const EMAILJS_TEMPLATE_ID = "template_contact";
const EMAILJS_PUBLIC_KEY = "iHhTv6nnu-RGJskPb"; // Replace with your EmailJS public key

export default function ContactSection() {
  const ref = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [visible, setVisible] = useState(false);
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.2 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current || sending) return;

    setSending(true);
    setStatus("idle");

    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        EMAILJS_PUBLIC_KEY
      );
      setStatus("success");
      formRef.current.reset();
    } catch {
      // Fallback: open mailto link with form data
      const formData = new FormData(formRef.current);
      const name = formData.get("from_name") as string;
      const email = formData.get("reply_to") as string;
      const subject = formData.get("subject") as string;
      const message = formData.get("message") as string;

      const mailtoBody = `Nom: ${name}\nEmail: ${email}\n\n${message}`;
      window.open(
        `mailto:fyjudahandriatiana@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(mailtoBody)}`,
        "_blank"
      );
      setStatus("success");
    } finally {
      setSending(false);
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <section id="contact" className="py-16 relative" ref={ref}>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-primary/10 to-transparent pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative">
        <div className={`text-center transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <p className="text-primary font-mono text-xs tracking-widest uppercase mb-1">Contact</p>
          <h2 className="text-2xl md:text-3xl font-bold mb-3 font-outfit">
            Travaillons ensemble<span className="text-primary">.</span>
          </h2>
          <p className="text-muted-foreground text-sm mb-10 max-w-lg mx-auto">
            Vous avez un projet en tête ? N'hésitez pas à me contacter.
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-8">
          {/* Left info panel */}
          <div className={`md:col-span-2 space-y-6 transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}>
            {contactInfo.map(({ icon: Icon, label, value, href }) => (
              <a
                key={label}
                href={href}
                className="glass rounded-xl p-5 flex items-center gap-4 group hover-lift block"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">{label}</p>
                  <p className="text-foreground font-medium text-sm">{value}</p>
                </div>
                <ExternalLink className="w-4 h-4 text-muted-foreground/30 ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </a>
            ))}

            {/* Socials */}
            <div className="flex gap-3 pt-2">
              {socials.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="w-12 h-12 rounded-xl glass flex items-center justify-center text-muted-foreground hover:text-primary hover:glow-border transition-all duration-300"
                  aria-label={label}
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Right form */}
          <div className={`md:col-span-3 transition-all duration-700 delay-300 ${visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}>
            <div className="glass rounded-2xl p-8">
              <form ref={formRef} className="space-y-5" onSubmit={handleSubmit}>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="group">
                    <label className="block text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Nom</label>
                    <input
                      type="text"
                      name="from_name"
                      required
                      placeholder="Votre nom"
                      className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Email</label>
                    <input
                      type="email"
                      name="reply_to"
                      required
                      placeholder="votre@email.com"
                      className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Sujet</label>
                  <input
                    type="text"
                    name="subject"
                    required
                    placeholder="Sujet du message"
                    className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Message</label>
                  <textarea
                    rows={4}
                    name="message"
                    required
                    placeholder="Décrivez votre projet..."
                    className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300 resize-none"
                  />
                </div>

                {/* Status messages */}
                {status === "success" && (
                  <div className="flex items-center gap-2 text-emerald-400 text-sm animate-fade-up">
                    <CheckCircle className="w-4 h-4" />
                    Message envoyé avec succès !
                  </div>
                )}
                {status === "error" && (
                  <div className="flex items-center gap-2 text-red-400 text-sm animate-fade-up">
                    <AlertCircle className="w-4 h-4" />
                    Erreur lors de l'envoi. Veuillez réessayer.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={sending}
                  className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-medium hover:opacity-90 transition-all duration-300 hover:shadow-[0_0_30px_oklch(0.55_0.18_15/30%)] flex items-center justify-center gap-2 group disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {sending ? (
                    <>
                      <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                      Envoyer le message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
