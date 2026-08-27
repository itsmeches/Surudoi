import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { SectionHeader } from "@/components/SectionHeader";
import { Reveal } from "@/components/Reveal";
import { caseStudies } from "@/data/caseStudies";

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
  imageAlt: string;
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
    imageAlt: "NPK deficiency detection system interface",
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
      { metric: "Production", label: "deployed government system" },
      { metric: "Full Stack", label: "React + Laravel + REST APIs" },
      { metric: "Delivery", label: "feature shipping & debugging" },
    ],
    stack: ["React", "Laravel", "REST APIs", "SQL"],
    image: Inventory,
    imageAlt: "CRIS workflow and reporting module interface",
    imageBadge: "Internal product · illustrative preview",
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
    imageAlt: "Enrollment probability analytics dashboard",
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
    imageAlt: "Barako Sense model output and profiling interface",
  },
];

const findStudy = (slug: string) => caseStudies.find((c) => c.slug === slug);

export const ProjectsSection = () => {
  const flagships = projects.filter((p) => findStudy(p.slug)?.flagship);
  const minor = projects.filter((p) => !findStudy(p.slug)?.flagship);

  return (
    <section id="log" className="relative isolate border-b hairline py-24 md:py-32">
      <div className="container">
        <SectionHeader
          index="01"
          eyebrow="The log"
          title="What I've built, and how I decided to build it."
          description="Two flagship entries carry the full problem → approach → decision → result narrative. The rest are logged shorter, but the reasoning behind them is one click away."
        />

        {/* Flagship entries — full narrative weight */}
        <ol className="mt-16 space-y-24">
          {flagships.map((p, i) => {
            const study = findStudy(p.slug)!;
            return (
              <Reveal as="li" key={p.slug} delay={Math.min(i * 80, 160)}>
                <article className="border border-line/70">
                  <div className="grid gap-0 lg:grid-cols-12">
                    <Link
                      href={`/work/${p.slug}`}
                      aria-label={`Open ${p.title} case study`}
                      className={`group relative block aspect-[16/11] overflow-hidden border-line/70 lg:col-span-5 lg:aspect-auto ${
                        i % 2 === 1 ? "lg:order-2 lg:border-l" : "lg:border-r"
                      }`}
                    >
                      <Image
                        src={p.image}
                        alt={p.imageAlt}
                        fill
                        sizes="(min-width: 1024px) 480px, 100vw"
                        className="object-cover grayscale-[15%] transition-[filter] duration-300 group-hover:grayscale-0"
                      />
                      {p.imageBadge && (
                        <div className="pointer-events-none absolute right-3 top-3">
                          <span className="mono inline-flex items-center gap-1.5 border border-line/70 bg-bg/85 px-2.5 py-1 text-[10px] uppercase tracking-[0.12em] text-muted">
                            {p.imageBadge}
                          </span>
                        </div>
                      )}
                    </Link>

                    <div
                      className={`p-7 md:p-9 lg:col-span-7 ${
                        i % 2 === 1 ? "lg:order-1" : ""
                      }`}
                    >
                      <div className="mono inline-flex items-center gap-2 border border-accent/40 bg-accent/[0.08] px-2.5 py-1 text-[10.5px] uppercase tracking-[0.12em] text-accent">
                        {study.tag}
                      </div>

                      <div className="mt-4 flex flex-wrap items-center gap-x-2.5 gap-y-1 eyebrow">
                        <span className="entry-index">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="text-line">/</span>
                        <span>{p.year}</span>
                        <span className="text-line">·</span>
                        <span>{p.org}</span>
                      </div>

                      <h3 className="display mt-4 font-serif text-[1.6rem] leading-[1.15] md:text-[1.9rem]">
                        {p.title}
                      </h3>
                      <p className="eyebrow mt-2">{p.role}</p>

                      <p className="mt-5 text-[15px] leading-relaxed text-muted">
                        {p.summary}
                      </p>

                      <dl className="mt-6 grid grid-cols-3 gap-4 border-y border-line/60 py-5">
                        {p.impact.map((m) => (
                          <div key={m.label}>
                            <dt className="eyebrow">{m.label}</dt>
                            <dd className="display mt-1 font-serif text-xl text-fg md:text-2xl">
                              {m.metric}
                            </dd>
                          </div>
                        ))}
                      </dl>

                      {/* Inline reasoning — problem / decision, condensed for the homepage */}
                      <div className="mt-6 space-y-4 text-sm leading-relaxed">
                        <Row label="Problem">{study.problem}</Row>
                        <Row label="Key decision">{study.decisions[0]?.body}</Row>
                      </div>

                      <div className="mt-5 mono text-xs text-muted">
                        {p.stack.join("  ·  ")}
                      </div>

                      <Link
                        href={`/work/${p.slug}`}
                        className="group/cta mt-7 inline-flex h-10 items-center text-sm font-medium text-fg"
                      >
                        Read full case study
                        <span className="ml-2 inline-block h-px w-6 bg-fg/60 transition-all group-hover/cta:w-10 group-hover/cta:bg-fg" />
                      </Link>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </ol>

        {/* Minor entries — condensed log rows */}
        <div className="mt-20">
          <div className="eyebrow mb-6">Also logged</div>
          <ul className="divide-y divide-line/60 border-y border-line/60">
            {minor.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/work/${p.slug}`}
                  className="group grid gap-3 py-6 sm:grid-cols-12 sm:items-center sm:gap-6"
                >
                  <div className="sm:col-span-2 eyebrow">{p.year}</div>
                  <div className="sm:col-span-5">
                    <h4 className="text-fg font-medium transition-colors group-hover:text-accent">
                      {p.title}
                    </h4>
                    <p className="mt-1 text-sm text-muted">{p.role}</p>
                  </div>
                  <div className="sm:col-span-3">
                    <div className="display font-serif text-base text-fg sm:text-lg">
                      {p.impact[0]?.metric}
                    </div>
                    <div className="eyebrow mt-0.5">{p.impact[0]?.label}</div>
                  </div>
                  <div className="sm:col-span-2 sm:text-right">
                    <span className="link-underline text-sm text-muted group-hover:text-fg">
                      Read entry →
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

const Row = ({ label, children }: { label: string; children?: string }) => {
  if (!children) return null;
  return (
    <div className="grid grid-cols-[5.5rem_1fr] gap-3">
      <span className="eyebrow pt-0.5">{label}</span>
      <span className="text-fg/85">{children}</span>
    </div>
  );
};
