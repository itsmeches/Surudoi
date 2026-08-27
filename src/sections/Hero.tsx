import Image from "next/image";
import Link from "next/link";
import me from "@/assets/images/me.png";
import { Magnetic } from "@/components/Magnetic";

export const HeroSection = () => {
  return (
    <section
      id="home"
      className="relative isolate overflow-hidden pt-36 pb-24 md:pt-44 md:pb-32"
    >
      {/* Ambient backdrop — three layers, all decorative, all -z-10. */}

      {/* 1. Soft accent orbs (the colour you actually feel) */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -left-40 -z-10 h-[560px] w-[560px] rounded-full opacity-70 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgb(var(--accent) / 0.18), transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 right-[-12rem] -z-10 h-[500px] w-[500px] rounded-full opacity-60 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgb(var(--accent-alt) / 0.14), transparent 70%)",
        }}
      />

      {/* 2. Dot grid (premium signature — Linear / Vercel style),
            masked so it fades out before reaching the copy + bottom */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.55]"
        style={{
          backgroundImage:
            "radial-gradient(rgb(var(--fg) / 0.07) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
          maskImage:
            "radial-gradient(120% 80% at 50% 0%, #000 35%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(120% 80% at 50% 0%, #000 35%, transparent 80%)",
        }}
      />

      {/* 3. Section-end hairline — ties hero to the next section */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-px bg-gradient-to-r from-transparent via-line/70 to-transparent"
      />

      <div className="container">
        <div className="grid gap-14 lg:grid-cols-12 lg:items-start">
          {/* LEFT — value prop */}
          <div className="flex flex-col gap-8 lg:col-span-8">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-line/70 bg-card/40 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-muted backdrop-blur">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-60 animate-ping" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
              </span>
              <span className="text-fg">Paper accepted</span>
              <span className="text-muted/60">·</span>
              <span>ICMCR 2026 · Tokyo</span>
            </div>

            <h1 className="display font-serif text-balance text-[2.5rem] leading-[1.02] sm:text-[3.25rem] md:text-[4rem] lg:text-[4.5rem] tracking-[-0.025em] max-w-[14ch]">
              Machine learning systems,
              <br />
              <span className="text-muted">shipped to real users.</span>
            </h1>

            <p className="max-w-xl text-[15px] md:text-[17px] leading-relaxed text-muted">
              I&apos;m Chester — a Computer Science (Machine Learning)
              undergraduate at National University&nbsp;– Lipa. I build computer
              vision and full-stack systems end-to-end with PyTorch, React, and
              Django, and recently co-authored a paper accepted at
              ICMCR&nbsp;2026 in Tokyo.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Magnetic strength={5}>
                <Link
                  href="#projects"
                  className="btn-press group inline-flex h-11 items-center rounded-full bg-fg px-5 text-sm font-medium text-bg hover:opacity-90"
                >
                  See selected work
                  <svg
                    className="ml-2 h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-1"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </Link>
              </Magnetic>
              <a
                href="/cv.pdf"
                download="Chester-Andaya-CV.pdf"
                className="btn-press inline-flex h-11 items-center rounded-full border border-line/70 px-5 text-sm font-medium text-fg hover:border-fg/50"
              >
                Download CV
              </a>
              <a
                href="mailto:iamchesterandaya@gmail.com?subject=Opportunity"
                className="link-underline inline-flex h-11 items-center text-sm font-medium text-muted transition-colors hover:text-fg"
              >
                iamchesterandaya@gmail.com →
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-3 pt-6 text-sm text-muted">
              <div className="flex items-center gap-3">
                <div className="relative h-9 w-9 overflow-hidden rounded-full border border-line/70">
                  <Image src={me} alt="Chester Andaya" fill sizes="36px" priority />
                </div>
                <span className="text-fg">Chester Andaya</span>
              </div>
              <span className="h-1 w-1 rounded-full bg-line" />
              <span>Lipa City, Philippines · GMT+8</span>
              <span className="h-1 w-1 rounded-full bg-line" />
              <a
                href="https://github.com/itsmeches"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-fg"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/chester-andaya-8bba4a1b9"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-fg"
              >
                LinkedIn
              </a>
            </div>
          </div>

          {/* RIGHT — Now card + highlights */}
          <aside className="flex flex-col gap-5 lg:col-span-4 lg:pt-2">
            <div className="surface rounded-2xl p-6">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                <div className="eyebrow">Currently</div>
              </div>

              <ul className="mt-6 space-y-5 text-sm">
                <NowRow k="Building" v="CHED CRIS features + ML research tooling" />
                <NowRow k="Studying" v="Deep Learning, Reinforcement Learning, MLOps" />
                <NowRow k="Open to" v="ML / SWE internships and entry-level roles" />
                <NowRow k="Strongest in" v="Computer Vision · PyTorch · React / Django" />
              </ul>
            </div>

            <div className="surface rounded-2xl p-6">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-alt" />
                <div className="eyebrow">By the numbers</div>
              </div>

              <dl className="mt-6 grid grid-cols-3 gap-4">
                <Stat metric="3.64" label="GPA" />
                <Stat metric="4" label="systems shipped" />
                <Stat metric="50K+" label="community reach" />
              </dl>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

const NowRow = ({ k, v }: { k: string; v: string }) => (
  <li className="grid grid-cols-[5.5rem_1fr] items-baseline gap-3">
    <span className="text-[11px] uppercase tracking-[0.16em] text-muted">{k}</span>
    <span className="text-fg/90 leading-snug">{v}</span>
  </li>
);

const Stat = ({ metric, label }: { metric: string; label: string }) => (
  <div>
    <dt className="text-[10px] uppercase tracking-[0.14em] text-muted">{label}</dt>
    <dd className="display mt-1 font-serif text-xl text-fg md:text-[1.4rem]">{metric}</dd>
  </div>
);
