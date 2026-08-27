import Image from "next/image";
import Link from "next/link";
import type { CaseStudy } from "@/data/caseStudies";
import { caseStudies } from "@/data/caseStudies";

export const CaseStudyView = ({ study }: { study: CaseStudy }) => {
  const index = caseStudies.findIndex((c) => c.slug === study.slug);

  return (
    <article className="pt-28 pb-24 md:pt-32 md:pb-32">
      <div className="container">
        <Link
          href="/#log"
          className="eyebrow inline-flex items-center gap-2 hover:text-fg transition-colors"
        >
          <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M11 18l-6-6 6-6" />
          </svg>
          Back to the log
        </Link>

        <header className="mt-10 max-w-3xl">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 eyebrow">
            <span className="entry-index">{String(index + 1).padStart(2, "0")}</span>
            <span className="text-line">/</span>
            <span className="text-fg/80">{study.year}</span>
            <span className="h-1 w-1 rounded-full bg-line" />
            <span>{study.org}</span>
            <span className="h-1 w-1 rounded-full bg-line" />
            <span className="text-accent">{study.role}</span>
          </div>
          {study.tag && (
            <div className="mono mt-5 inline-flex items-center gap-2 border border-accent/40 bg-accent/[0.08] px-2.5 py-1 text-[10.5px] uppercase tracking-[0.12em] text-accent">
              {study.tag}
            </div>
          )}
          <h1 className="display font-serif mt-5 text-4xl md:text-5xl lg:text-6xl text-fg">
            {study.title}
          </h1>
          <p className="mt-5 text-lg text-muted leading-relaxed">{study.summary}</p>
        </header>

        <div className="mt-12 relative aspect-[16/9] overflow-hidden border border-line/70 bg-subtle">
          <Image
            src={study.hero.src}
            alt={study.hero.alt}
            fill
            priority
            quality={90}
            sizes="(min-width: 1024px) 960px, 100vw"
            className="object-cover object-top"
          />
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8 space-y-12 text-[15px] md:text-base leading-[1.75] text-muted">
            <Section title="Problem">
              <p>{study.problem}</p>
            </Section>

            <Section title="Approach">
              <p>{study.approach}</p>
            </Section>

            <Section title="Architecture">
              <ul className="space-y-3">
                {study.architecture.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-fg/90">
                    <span className="mono mt-0.5 text-xs text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Section>

            <Section title="Key decisions">
              <ul className="space-y-6">
                {study.decisions.map((d, i) => (
                  <li key={i}>
                    <div className="text-fg font-medium">{d.title}</div>
                    <p className="mt-2">{d.body}</p>
                  </li>
                ))}
              </ul>
            </Section>

            <Section title="What I learned">
              <p>{study.learnings}</p>
            </Section>
          </div>

          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-24 space-y-6">
              <Panel label="Results">
                <ul className="space-y-3 text-sm">
                  {study.results.map((r, i) => (
                    <li key={i} className="flex items-baseline justify-between gap-3">
                      <span className="font-serif text-lg text-fg tabular-nums">{r.metric}</span>
                      <span className="text-right text-muted">{r.label}</span>
                    </li>
                  ))}
                </ul>
              </Panel>

              <Panel label="Stack">
                <ul className="mono flex flex-wrap gap-2">
                  {study.stack.map((s) => (
                    <li
                      key={s}
                      className="inline-flex items-center border border-line/70 px-3 py-1 text-xs text-muted"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </Panel>

              {study.links.length > 0 && (
                <Panel label="Links">
                  <ul className="space-y-2 text-sm">
                    {study.links.map((l) => (
                      <li key={l.href}>
                        <a
                          href={l.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group inline-flex items-center gap-2 text-fg hover:text-accent transition-colors"
                        >
                          {l.label}
                          <svg className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M7 17L17 7M9 7h8v8" />
                          </svg>
                        </a>
                      </li>
                    ))}
                  </ul>
                </Panel>
              )}
            </div>
          </aside>
        </div>

        <div className="mt-24 border-t hairline pt-10">
          <Link
            href="/#log"
            className="eyebrow inline-flex items-center gap-2 hover:text-fg transition-colors"
          >
            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M11 18l-6-6 6-6" />
            </svg>
            All entries
          </Link>
        </div>
      </div>
    </article>
  );
};

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section>
    <div className="eyebrow mb-4">{title}</div>
    {children}
  </section>
);

const Panel = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="surface p-5">
    <div className="eyebrow mb-4">{label}</div>
    {children}
  </div>
);
