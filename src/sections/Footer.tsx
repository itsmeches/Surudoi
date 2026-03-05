import ArrowUprightIcon from "@/assets/icons/arrow-up-right.svg";

const footerlinks = [
  {
    title: "GitHub",
    href: "https://github.com/itsmeches",
  },
  {
    title: "LinkedIn",
    href: "https://www.linkedin.com/in/chester-andaya-8bba4a1b9",
  },
  {
    title: "Facebook",
    href: "https://www.facebook.com/Surudoiii/",
  },
  {
    title: "Tiktok",
    href: "https://www.tiktok.com/@surudoiii",
  },
];

export const Footer = () => {
  return (
    <footer className="relative overflow-x-clip">
      {/* Background Glow */}
      <div className="absolute h-[400px] w-[1600px] bottom-0 left-1/2 -translate-x-1/2 bg-emerald-300/30 [mask-image:radial-gradient(50%_50%_at_bottom_center,black,transparent)] pointer-events-none"></div>

      <div className="container">
        <div className="border-t border-white/15 py-6 text-sm flex flex-col md:flex-row md:justify-between items-center gap-8">
          <div className="text-white/40">
            &copy; 2024, All rights reserved.
          </div>

          <nav className="flex flex-col md:flex-row items-center gap-8">
            {footerlinks.map((link) => (
              <a
                key={link.title}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-semibold hover:opacity-80 transition"
              >
                {link.title}
                <ArrowUprightIcon />
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
};