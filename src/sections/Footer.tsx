const links = [
  { label: "GitHub", href: "https://github.com/itsmeches" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/chester-andaya/" },
  { label: "Email", href: "mailto:iamchesterandaya@gmail.com" },
];

export const Footer = () => {
  return (
    <footer className="border-t border-line/70 py-10">
      <div className="container flex flex-col gap-4 mono text-xs text-muted md:flex-row md:items-center md:justify-between">
        <p>
          © {new Date().getFullYear()} Chester Andaya · Lipa City, PH
        </p>

        <nav aria-label="Footer" className="flex flex-wrap items-center gap-5">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="transition-colors hover:text-fg"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
};
