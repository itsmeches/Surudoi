import { SectionHeader } from "@/components/SectionHeader";
import { SectionBackdrop } from "@/components/SectionBackdrop";

const focus = [
  "Computer vision for agriculture and education use-cases",
  "Reproducible ML pipelines with explainable evaluation",
  "Full-stack delivery so models actually reach users",
];

const principles = [
  "Ship to non-technical users early — field feedback improves models faster than lab assumptions.",
  "Reach for interpretable evaluation (cross-validation, SHAP, GradCAM) before scaling model complexity.",
  "Treat maintainable full-stack delivery as part of the model, not an afterthought.",
];

export const AboutSection = () => {
  return (
    <section
      id="about"
      className="relative isolate overflow-hidden border-t hairline py-24 md:py-32"
    >
      <SectionBackdrop orb="top-left" tone="accent" />
      <div className="container">
        <SectionHeader
          eyebrow="About"
          title="Research-minded, product-shipping."
          description="I sit at the intersection of ML research and production engineering — the loop where a notebook becomes a model becomes a screen someone uses every Tuesday."
        />

        <div className="mt-16 grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7 space-y-6 text-[15px] md:text-base leading-[1.8] text-muted">
            <p>
              I&apos;m a B.S. Computer Science (Machine Learning) undergraduate
              at National University&nbsp;– Lipa with a 3.64 GPA, Dean&apos;s
              Lister standing, and an ICMCR&nbsp;2026 publication on computer
              vision for agriculture.
            </p>
            <p>
              My work combines model development and product delivery: training
              CNN pipelines in PyTorch and TensorFlow, then shipping them
              behind React / Django interfaces so stakeholders can actually
              use the outputs in daily workflows. The harder part is usually
              the second half.
            </p>
            <p>
              Outside formal projects, I run an educational community of
              50,000+ followers across YouTube, TikTok, and Facebook,
              publishing structured ML and programming content for Filipino
              undergraduates.
            </p>

            <ul className="pt-4 space-y-2.5">
              {focus.map((f) => (
                <li key={f} className="flex items-start gap-3 text-fg">
                  <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                  <span className="text-sm md:text-base">{f}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-5">
            <div className="surface rounded-2xl p-6 lg:sticky lg:top-24">
              <div className="eyebrow mb-5">How I work</div>
              <ul className="space-y-4 text-sm leading-relaxed">
                {principles.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-accent" />
                    <span className="text-fg/90">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-24 grid gap-px overflow-hidden rounded-2xl border border-line/60 bg-line/60 md:grid-cols-3">
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

const Highlight = ({
  metric,
  label,
  sub,
}: {
  metric: string;
  label: string;
  sub: string;
}) => (
  <div className="bg-page p-7 transition-colors hover:bg-card/40">
    <div className="display font-serif text-4xl text-fg md:text-5xl">
      {metric}
    </div>
    <div className="mt-3 text-sm font-medium text-fg">{label}</div>
    <div className="mt-1 text-xs text-muted">{sub}</div>
  </div>
);
