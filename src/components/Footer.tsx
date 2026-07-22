export default function Footer() {
  return (
    <footer className="py-8 border-t border-border">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-muted-foreground text-sm">
          © {new Date().getFullYear()} — Conçu & développé avec passion
        </p>
        <div className="flex gap-6">
          {["GitHub", "LinkedIn", "Email"].map((label) => (
            <a
              key={label}
              href="#"
              className="text-muted-foreground text-sm hover:text-primary transition-colors duration-300"
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
