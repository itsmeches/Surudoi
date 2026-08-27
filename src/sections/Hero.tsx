import Image from "next/image";
import Link from "next/link";
import me from "@/assets/images/me.png";

const dimensions = [
  { k: "Researcher", v: "ICMCR 2026 · Tokyo" },
  { k: "Engineer", v: "PyTorch · React · Django" },
  { k: "Builder", v: "CHED CRIS · gov. systems" },
  { k: "Leader", v: "50K+ community · IGL" },
];

export const HeroSection = () => {
  return (
    <section
      id="home"
      className="relative isolate border-b hairline pt-24 pb-12 md:pt-28 md:pb-16 scroll-mt-16"
    >
      <div className="container">
        <div className="mb-6 flex items-center gap-3 eyebrow">
          <span className="entry-index">ENTRY 00</span>
          <span className="h-px w-6 bg-line" />
          <span>Field notes — Lipa City, PH · GMT+8</span>
        </div>

        <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
          {/* LEFT — positioning */}
          <div className="flex flex-col gap-6 lg:col-span-7">
            <h1 className="display font-serif text-balance text-[2.35rem] leading-[1.08] sm:text-[3rem] md:text-[3.6rem] tracking-[-0.015em] max-w-[16ch]">
              A working record of research, engineering, and leadership.
            </h1>

            <p className="max-w-xl text-[15px] md:text-[17px] leading-relaxed text-muted">
              I&apos;m Chester Andaya — a Magna Cum Laude Computer Science
              (Machine Learning) graduate. I&apos;ve published computer-vision
              research presented in Tokyo, shipped full-stack systems inside a
              government agency, and led a 50,000-strong learning community.
              This site is the record of that work, not a pitch for it.
            </p>

            <dl className="grid grid-cols-2 gap-x-6 gap-y-4 border-y border-line/60 py-6 sm:grid-cols-4">
              {dimensions.map((d) => (
                <div key={d.k}>
                  <dt className="mono text-[11px] uppercase tracking-[0.14em] text-accent">
                    {d.k}
                  </dt>
                  <dd className="mt-1.5 text-sm text-fg/90">{d.v}</dd>
                </div>
              ))}
            </dl>

            <div className="mono inline-flex items-center gap-2 border border-line/70 bg-card px-3 py-1 text-[11px] uppercase tracking-[0.12em] text-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              <span>Open to ML / AI / SWE roles · Philippines + open to relocation</span>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-1">
              <a
                href="/cv.pdf"
                download="Chester-Andaya-CV.pdf"
                className="btn-press inline-flex h-11 items-center bg-fg px-5 text-sm font-medium text-bg hover:opacity-90"
              >
                Download Resume
                <svg
                  className="ml-2 h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 15V3m0 12l-4-4m4 4l4-4M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2" />
                </svg>
              </a>
              <Link
                href="#log"
                className="btn-press group inline-flex h-11 items-center border border-line/70 px-5 text-sm font-medium text-fg hover:border-fg/50"
              >
                Read the log
                <svg
                  className="ml-2 h-4 w-4 transition-transform duration-200 ease-out group-hover:translate-x-1"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
              <a
                href="mailto:iamchesterandaya@gmail.com?subject=Opportunity"
                className="link-underline inline-flex h-11 items-center text-sm font-medium text-muted transition-colors hover:text-fg"
              >
                iamchesterandaya@gmail.com →
              </a>
            </div>
          </div>

          {/* RIGHT — credibility ledger */}
          <aside className="lg:col-span-5 lg:sticky lg:top-24">
            <div className="surface p-6">
              <div className="flex items-center gap-3">
                <div className="relative h-11 w-11 flex-shrink-0 overflow-hidden border border-line/70">
                  <Image src={me} alt="Chester Andaya" fill sizes="44px" priority />
                </div>
                <div>
                  <div className="text-sm font-medium text-fg">Chester Andaya</div>
                  <div className="eyebrow mt-0.5">Credentials</div>
                </div>
              </div>

              <ul className="mt-5 space-y-3.5 text-sm">
                <LedgerRow k="Standing" v="Magna Cum Laude (GPA 3.67 / 4.0)" />
                <LedgerRow k="Publication" v="ICMCR 2026, Tokyo — first author" />
                <LedgerRow k="Deployed" v="CHED Regional Info System (CRIS)" />
                <LedgerRow k="Reach" v="50,000+ learners across 3 platforms" />
              </ul>

              <div className="mt-5 flex items-center gap-4 border-t border-line/60 pt-4 text-sm">
                <a
                  href="https://github.com/itsmeches"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline text-muted hover:text-fg"
                >
                  GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/chester-andaya-8bba4a1b9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline text-muted hover:text-fg"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

const LedgerRow = ({ k, v }: { k: string; v: string }) => (
  <li className="flex items-start justify-between gap-4">
    <span className="eyebrow flex-shrink-0">{k}</span>
    <span className="text-right text-fg/90">{v}</span>
  </li>
);
