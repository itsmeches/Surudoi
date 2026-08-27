import { SectionHeader } from "@/components/SectionHeader";

const principles = [
  "Ship to non-technical users early — field feedback improves models faster than lab assumptions.",
  "Reach for interpretable evaluation (cross-validation, SHAP, GradCAM) before scaling model complexity.",
  "Treat maintainable full-stack delivery as part of the model, not an afterthought.",
  "Treat a scoreboard the same as a production incident: review the loss, don't just react to it.",
];

export const AboutSection = () => {
  return (
    <section id="about" className="relative isolate border-b hairline py-24 md:py-32">
      <div className="container">
        <SectionHeader
          index="03"
          eyebrow="About"
          title="Why a coffee farmer, a college admissions office, and a Valorant scrim all taught me the same lesson."
          description="Different rooms, same discipline: define the problem precisely, instrument the decision, and don't ship confidence you haven't earned."
        />

        <div className="mt-16 grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7 space-y-6 text-[15px] md:text-base leading-[1.8] text-muted">
            <p>
              I graduated Magna Cum Laude in B.S. Computer Science (Machine
              Learning) from National University – Lipa. That line reads
              clean on a transcript; it was mostly built from failed model
              runs, a rejected first draft of a paper, and long nights
              debugging a government system I didn&apos;t design.
            </p>
            <p>
              My research life and my engineering life aren&apos;t separate
              tracks. I trained the ResNet50 pipeline behind our ICMCR 2026
              paper the same week I was fixing a REST integration bug in
              CHED&apos;s regional reporting system. The habit is the same in
              both places: don&apos;t trust a result until you can explain
              why it&apos;s true — an accuracy number needs a GradCAM
              overlay, a passing test needs a reproduction case.
            </p>
            <p>
              Outside formal projects, I run an educational community of
              50,000+ followers across YouTube, TikTok, and Facebook,
              teaching ML and programming to Filipino undergraduates —
              and I spent two years as team captain and in-game leader for
              my university&apos;s Valorant roster. Teaching forces you to
              find the simplest true explanation. Calling rounds under a
              round timer forces you to decide with incomplete information
              and own the outcome either way. Both show up in how I work.
            </p>

            <ul className="pt-4 space-y-3">
              {principles.map((f) => (
                <li key={f} className="flex items-start gap-3 text-fg">
                  <span className="mt-1.5 mono text-xs text-accent">→</span>
                  <span className="text-sm md:text-[15px] leading-relaxed">{f}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-5">
            <div className="surface p-6 lg:sticky lg:top-24">
              <div className="eyebrow mb-5">Currently</div>
              <ul className="space-y-4 text-sm">
                <NowRow k="Building" v="CHED CRIS features + ML research tooling" />
                <NowRow k="Studying" v="Deep Learning, Reinforcement Learning, MLOps" />
                <NowRow k="Open to" v="ML / AI / SWE opportunities (Remote / Relocation)" />
                <NowRow k="Strongest in" v="Computer Vision · PyTorch · React / Django" />
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-24 grid gap-px overflow-hidden border border-line/70 md:grid-cols-3">
          <Highlight
            metric="95%"
            label="NPK classification accuracy"
            sub="ResNet50, 2,500-image dataset"
          />
          <Highlight
            metric="92.67%"
            label="Enrollment prediction accuracy"
            sub="from 83% baseline via feature engineering"
          />
          <Highlight
            metric="50K+"
            label="Educational community reach"
            sub="across YouTube, TikTok, Facebook"
          />
        </div>
      </div>
    </section>
  );
};

const NowRow = ({ k, v }: { k: string; v: string }) => (
  <li className="grid grid-cols-[5.5rem_1fr] items-baseline gap-3">
    <span className="eyebrow">{k}</span>
    <span className="text-fg/90 leading-snug">{v}</span>
  </li>
);

const Highlight = ({
  metric,
  label,
  sub,
}: {
  metric: string;
  label: string;
  sub: string;
}) => (
  <div className="bg-page p-7">
    <div className="display font-serif text-4xl text-fg md:text-5xl">
      {metric}
    </div>
    <div className="mt-3 text-sm font-medium text-fg">{label}</div>
    <div className="mono mt-1 text-xs text-muted">{sub}</div>
  </div>
);
