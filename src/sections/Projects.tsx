import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { SectionHeader } from "@/components/SectionHeader";
import { Reveal } from "@/components/Reveal";

import Ampalaya from "@/assets/images/Ampalaya.png";
import Smart from "@/assets/images/Smart Admission.png";
import Coffee from "@/assets/images/Liberica.png";
import Inventory from "@/assets/images/Inventory system.png";

type Project = {
  slug: string;
  year: string;
  org: string;
  title: string;
  role: string;
  summary: string;
  impact: { metric: string; label: string }[];
  stack: string[];
  image: StaticImageData;
  /** Show a "Featured · …" pill above the title. */
  feature?: string;
  /** Render a corner badge on the preview image (e.g. for stock/illustrative
   *  visuals when the real product is internal / under NDA). */
  imageBadge?: string;
};

const projects: Project[] = [
  {
    slug: "npk-deficiency-detection",
    year: "2026",
    org: "ICMCR 2026 · DA Region IV-A",
    title: "NPK Deficiency Detection in Bitter Gourd Leaves",
    role: "ML Engineer · Researcher",
    summary:
      "A published computer-vision system that classifies four nutrient-deficiency states from a single leaf photo and exposes the prediction through an explainable inference UI agronomists can audit.",
    impact: [
      { metric: "95%", label: "test accuracy" },
      { metric: "96%", label: "F1-score" },
      { metric: "2,500", label: "validated images" },
    ],
    stack: ["PyTorch", "ResNet50", "OpenCV", "GradCAM", "React", "Django"],
    image: Ampalaya,
    feature: "Published research · ICMCR 2026 Tokyo",
  },
  {
    slug: "enrollment-probability-prediction",
    year: "2026",
    org: "National University — Lipa",
    title: "Enrollment Probability Prediction System",
    role: "ML Engineer · Full-Stack Developer",
    summary:
      "An admissions analytics platform that predicts per-applicant enrollment probability and surfaces cohort-level explanations so administrators can plan capacity instead of guessing it.",
    impact: [
      { metric: "92.67%", label: "prediction accuracy" },
      { metric: "+9.6pts", label: "uplift over baseline" },
      { metric: "20K+", label: "records modeled" },
    ],
    stack: ["Scikit-learn", "Random Forest", "KNN", "Flask", "React"],
    image: Smart,
  },
  {
    slug: "barako-sense",
    year: "2026",
    org: "DLSU Manila · UPLB · Batangas State University",
    title: "Barako Sense — Liberica Coffee Tree Identification",
    role: "ML Engineer · Research Collaborator",
    summary:
      "A cross-institutional AI platform that fuses leaf imagery with sensory tasting records to identify Liberica coffee trees and profile their flavour signatures from a multi-input CNN.",
    impact: [
      { metric: "95%", label: "identification accuracy" },
      { metric: "4,000+", label: "images, 5 DNA-verified trees" },
      { metric: "100+", label: "sensory records fused" },
    ],
    stack: ["MobileNetV2", "Multi-Input CNN", "OpenCV", "Django", "React"],
    image: Coffee,
  },
  {
    slug: "ched-cris",
    year: "2026",
    org: "CHED Regional Office IV-A",
    title: "CHED Regional Information System (CRIS)",
    role: "Full-Stack Developer Intern",
    summary:
      "Production internal platform used by the Commission on Higher Education to manage regional reporting workflows. I ship UI and API improvements against real institutional data, on a real release cadence.",
    impact: [
      { metric: "Live", label: "government deployment" },
      { metric: "Full stack", label: "React + Laravel + SQL" },
      { metric: "Ship", label: "review · merge · deploy" },
    ],
    stack: ["React", "Laravel", "REST APIs", "SQL"],
    image: Inventory,
    imageBadge: "Internal product · illustrative preview",
  },
];

export const ProjectsSection = () => {
  return (
    <section
      id="projects"
      className="relative isolate overflow-hidden border-t hairline py-24 md:py-32"
    >
      {/* Ambient backdrop — softer than hero, but breaks the flat-black slab */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/2 -z-10 h-[420px] w-[760px] -translate-x-1/2 rounded-full opacity-60 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgb(var(--accent) / 0.10), transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.45]"
        style={{
          backgroundImage:
            "radial-gradient(rgb(var(--fg) / 0.05) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
          maskImage:
            "radial-gradient(120% 60% at 50% 0%, #000 25%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(120% 60% at 50% 0%, #000 25%, transparent 75%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-px bg-gradient-to-r from-transparent via-line/60 to-transparent"
      />

      <div className="container">
        <SectionHeader
          eyebrow="Selected work"
          title="Four systems, shipped end-to-end."
          description="Research, analytics, and government engineering — each with measurable outcomes, real users, and decisions I can defend."
        />

        <ul className="mt-20 space-y-24">
          {projects.map((p, i) => (
            <Reveal as="li" key={p.slug} delay={Math.min(i * 80, 240)}>
              <article className="grid gap-10 lg:grid-cols-12 lg:items-center">
                {/* Visual */}
                <Link
                  href={`/work/${p.slug}`}
                  aria-label={`Open ${p.title} case study`}
                  className={`group block lg:col-span-7 ${
                    i % 2 === 1 ? "lg:order-2" : ""
                  }`}
                >
                  <div className="lift relative aspect-[16/10] overflow-hidden rounded-2xl border border-line/70 bg-subtle">
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      sizes="(min-width: 1024px) 640px, (min-width: 640px) 80vw, 100vw"
                      className="object-cover transition-transform duration-[700ms] ease-out group-hover:scale-[1.025]"
                    />
                    <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-fg/5" />

                    {p.imageBadge && (
                      <div className="pointer-events-none absolute right-3 top-3">
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-line/70 bg-bg/80 px-2.5 py-1 text-[10px] uppercase tracking-[0.16em] text-muted backdrop-blur">
                          <span className="h-1 w-1 rounded-full bg-accent" />
                          {p.imageBadge}
                        </span>
                      </div>
                    )}
                  </div>
                </Link>

                {/* Copy */}
                <div
                  className={`lg:col-span-5 ${
                    i % 2 === 1 ? "lg:order-1" : ""
                  }`}
                >
                  {p.feature && (
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/[0.08] px-3 py-1 text-[10.5px] font-medium uppercase tracking-[0.18em] text-accent">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
                      </span>
                      Featured · {p.feature}
                    </div>
                  )}

                  <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[11px] uppercase tracking-[0.18em] text-muted">
                    <span className="tabular-nums text-fg/70">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-muted/50">/</span>
                    <span>{p.year}</span>
                    <span className="text-muted/50">·</span>
                    <span>{p.org}</span>
                  </div>

                  <h3 className="display mt-4 font-serif text-[1.75rem] leading-[1.1] md:text-[2rem]">
                    {p.title}
                  </h3>

                  <p className="mt-2 text-[11px] uppercase tracking-[0.16em] text-muted">
                    {p.role}
                  </p>

                  <p className="mt-5 text-[15px] leading-relaxed text-muted">
                    {p.summary}
                  </p>

                  <dl className="mt-6 grid grid-cols-3 gap-4 border-y border-line/60 py-5">
                    {p.impact.map((m) => (
                      <div key={m.label}>
                        <dt className="text-[10px] uppercase tracking-[0.16em] text-muted">
                          {m.label}
                        </dt>
                        <dd className="display mt-1 font-serif text-xl text-fg md:text-2xl">
                          {m.metric}
                        </dd>
                      </div>
                    ))}
                  </dl>

                  <div className="mt-5 text-xs text-muted">
                    {p.stack.join("  ·  ")}
                  </div>

                  <div className="mt-7">
                    <Link
                      href={`/work/${p.slug}`}
                      className="group/cta inline-flex h-10 items-center text-sm font-medium text-fg"
                    >
                      Read case study
                      <span className="ml-2 inline-block h-px w-6 bg-fg/60 transition-all group-hover/cta:w-10 group-hover/cta:bg-fg" />
                    </Link>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
};
