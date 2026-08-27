import { SectionHeader } from "@/components/SectionHeader";
import { Reveal } from "@/components/Reveal";
import { SectionBackdrop } from "@/components/SectionBackdrop";

type Experience = {
  role: string;
  company: string;
  period: string;
  points: string[];
  technologies: string[];
};

// Ordered by recruiter signal — research and current internship first.
const experiences: Experience[] = [
  {
    role: "Undergraduate Researcher",
    company: "ICMCR 2026 · Publication Track",
    period: "2026",
    points: [
      "Co-authored and presented NPK Deficiency Detection in Bitter Gourd Leaves using ResNet50 CNN at ICMCR 2026 (Tokyo, Japan).",
      "Designed a reproducible training pipeline with class balancing, image augmentation, and Bayesian hyperparameter optimization (95% accuracy, 96% F1).",
      "Integrated GradCAM explainability to make per-prediction decisions reviewable by agronomists in the field.",
    ],
    technologies: ["PyTorch", "ResNet50", "OpenCV", "GradCAM", "Research"],
  },
  {
    role: "Full-Stack Developer Intern",
    company: "CHED Regional Office IV-A · CRIS",
    period: "2026 — Present",
    points: [
      "Ship frontend and backend features for the Commission on Higher Education Regional Information System, used internally for educational workflows and reporting.",
      "Implement REST integrations and database-driven views; own debugging, usability, and deployment-adjacent tasks across the stack.",
      "Work directly with senior developers and supervisors in a production-oriented government engineering environment.",
    ],
    technologies: ["React", "Laravel", "REST APIs", "SQL"],
  },
  {
    role: "Founder & Lead Content Creator",
    company: "Independent · YouTube · TikTok · Facebook",
    period: "2022 — Present",
    points: [
      "Built and grew an educational community to 50,000+ followers publishing structured ML and programming content for Filipino undergraduates.",
      "Use audience analytics and curriculum-style sequencing to improve retention and learner outcomes.",
      "Treats teaching as a forcing function for clearer mental models — many of the explanations end up shaping how I document and design systems at work.",
    ],
    technologies: ["Content Strategy", "Curriculum Design", "Community"],
  },
];

const alsoRoles = [
  {
    role: "Operations Manager & Owner",
    company: "Lipa Computer Shop",
    period: "Ongoing",
  },
  {
    role: "Team Captain & In-Game Leader",
    company: "NU-Lipa Esports (Valorant)",
    period: "Collegiate",
  },
];

const skillGroups = [
  {
    label: "Machine Learning",
    items: [
      "PyTorch",
      "TensorFlow",
      "Scikit-learn",
      "CNNs",
      "Reinforcement Learning",
      "Hyperparameter Tuning",
      "Cross-Validation",
      "SHAP",
      "GradCAM",
    ],
  },
  {
    label: "Computer Vision",
    items: [
      "OpenCV",
      "ResNet50",
      "MobileNetV2",
      "Image Augmentation",
      "Multi-class Classification",
    ],
  },
  {
    label: "Engineering",
    items: [
      "Python",
      "TypeScript",
      "Java",
      "C++",
      "FastAPI",
      "Flask",
      "Django",
      "React",
      "Next.js",
      "Tailwind CSS",
      "Docker",
      "REST APIs",
    ],
  },
  {
    label: "Data & Tooling",
    items: ["Pandas", "NumPy", "Matplotlib", "Git", "Postman", "VS Code"],
  },
];

export const ExperienceSection = () => {
  return (
    <section
      id="experience"
      className="relative isolate overflow-hidden border-t hairline py-24 md:py-32"
    >
      <SectionBackdrop orb="top-right" tone="accent-alt" />
      <div className="container">
        <SectionHeader
          eyebrow="Experience"
          title="Research, product work, teaching."
          description="Selected roles where I do the actual engineering — ordered by the signal I want recruiters to leave with."
        />

        {/* Single-rail timeline (no zig-zag) */}
        <ol className="relative mt-16 ml-2 border-l border-line/60">
          {experiences.map((exp, i) => (
            <Reveal
              as="li"
              key={`${exp.company}-${exp.role}`}
              delay={Math.min(i * 90, 270)}
              className="relative pl-8 pb-14 last:pb-0"
            >
              <span
                aria-hidden
                className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full bg-fg ring-4 ring-page"
              />

              <div className="text-[11px] uppercase tracking-[0.18em] text-muted">
                {exp.period}
              </div>
              <h3 className="mt-2 text-lg font-medium text-fg md:text-xl">
                {exp.role}
              </h3>
              <p className="text-sm text-muted">{exp.company}</p>

              <ul className="mt-5 space-y-2.5 text-[14.5px] leading-relaxed text-muted">
                {exp.points.map((point) => (
                  <li key={point} className="flex gap-3">
                    <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-muted/60" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-4 text-[12px] text-muted">
                {exp.technologies.join("  ·  ")}
              </div>
            </Reveal>
          ))}
        </ol>

        {/* Also — compressed, signals leadership without diluting technical branding */}
        <div className="mt-2 ml-2 border-l border-line/60 pl-8 pb-2">
          <div className="eyebrow mb-3">Also</div>
          <ul className="space-y-1.5 text-sm text-muted">
            {alsoRoles.map((r) => (
              <li key={r.role} className="flex flex-wrap items-baseline gap-x-2">
                <span className="text-fg/90">{r.role}</span>
                <span className="text-muted/50">·</span>
                <span>{r.company}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Education + Publications */}
        <div className="mt-20 grid gap-6 lg:grid-cols-2">
          <Reveal as="article" className="surface lift rounded-2xl p-6">
            <div className="eyebrow">Education</div>
            <h3 className="mt-3 text-lg font-medium text-fg">
              B.S. Computer Science — Machine Learning
            </h3>
            <p className="text-sm text-muted">
              National University — Lipa · 2022 – Present
            </p>
            <ul className="mt-4 space-y-2 text-sm text-muted">
              <li className="flex gap-2.5">
                <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-muted/60" />
                <span>GPA 3.64 / 4.00 · Dean&apos;s Lister</span>
              </li>
              <li className="flex gap-2.5">
                <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-muted/60" />
                <span>AcadArena Gold Supreme Creator scholar</span>
              </li>
              <li className="flex gap-2.5">
                <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-muted/60" />
                <span>
                  Coursework: Machine Learning, Deep Learning, Reinforcement
                  Learning, Data Science, DSA, Software Engineering, OS,
                  Advanced DB Systems
                </span>
              </li>
            </ul>
          </Reveal>

          <Reveal as="article" delay={90} className="surface lift rounded-2xl p-6">
            <div className="eyebrow">Publication</div>
            <h3 className="mt-3 text-lg font-medium text-fg">
              ICMCR 2026 · Tokyo, Japan
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Andaya, C. J. et al. (2026).{" "}
              <span className="text-fg/90">
                NPK Deficiency Detection in Bitter Gourd Leaves Using ResNet50
                CNN.
              </span>{" "}
              International Conference on Machine Learning and Computer Research.
            </p>
          </Reveal>
        </div>

        {/* Skills */}
        <div className="mt-6 surface rounded-2xl p-6 md:p-8">
          <div className="eyebrow mb-6">Technical stack</div>
          <div className="grid gap-8 md:grid-cols-2">
            {skillGroups.map((group) => (
              <div key={group.label}>
                <h3 className="text-sm font-medium text-fg">{group.label}</h3>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-md border border-line/60 bg-subtle/60 px-2.5 py-1 text-xs text-muted"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
