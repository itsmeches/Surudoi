import Image from "next/image";
import { SectionHeader } from "@/components/SectionHeader";
import { Reveal } from "@/components/Reveal";

type Stage = {
  order: string;
  role: string;
  company: string;
  period: string;
  points: string[];
  technologies: string[];
};

// Ordered as a progression of responsibility, not strict chronology —
// each stage shows a step up in scope: research → production code →
// independent ownership → leading people.
const stages: Stage[] = [
  {
    order: "Researcher",
    role: "Undergraduate ML Researcher",
    company: "ICMCR 2026 Tokyo · Department of Agriculture Region IV-A",
    period: "2026",
    points: [
      "Co-authored and presented NPK Deficiency Detection in Bitter Gourd Leaves using ResNet50 CNN at ICMCR 2026 (Tokyo, Japan).",
      "Designed a reproducible training pipeline with class balancing, image augmentation, and Bayesian hyperparameter optimization (95% accuracy, 96% F1).",
      "Integrated GradCAM explainability to make per-prediction decisions reviewable by agronomists in the field.",
    ],
    technologies: ["PyTorch", "ResNet50", "OpenCV", "GradCAM", "Research"],
  },
  {
    order: "Engineer",
    role: "Full-Stack Developer Intern",
    company: "CHED Regional Office IV-A · Regional Information System (CRIS)",
    period: "2026 — Present",
    points: [
      "Ship frontend and backend features for the Commission on Higher Education Regional Information System, used internally for educational workflows and reporting.",
      "Implement REST integrations and database-driven views; own debugging, usability, and deployment-adjacent tasks across the stack.",
      "Work directly with senior developers and supervisors in a production-oriented government engineering environment.",
    ],
    technologies: ["React", "Laravel", "REST APIs", "SQL"],
  },
  {
    order: "Builder",
    role: "Full-Stack & Systems Builder",
    company: "Independent Projects & Business Operations",
    period: "2022 — Present",
    points: [
      "Architected and deployed full-stack AI and web applications (NPK Vision App, Enrollment Prediction Engine, Barako Sense AI) with PyTorch, React, Django, and Flask.",
      "Managed day-to-day operations of an independent computer shop (Lipa Computer Shop) — applying hardware diagnostics, inventory management, and operational discipline to real customer demand.",
    ],
    technologies: ["Full-Stack", "PyTorch", "React", "Django", "Operations", "Hardware"],
  },
  {
    order: "Leader",
    role: "Community Founder & Collegiate Team Captain",
    company: "50K+ Learning Community & NU-Lipa Esports (Valorant)",
    period: "2022 — Present",
    points: [
      "Built and grew an educational community to 50,000+ followers publishing structured ML and programming content for Filipino undergraduates.",
      "Served as Team Captain and In-Game Leader (IGL) for NU-Lipa's collegiate Valorant roster — calling mid-round tactics under clock pressure, coordinating 5-player execution, and leading post-match strategy reviews.",
      "Translates high-pressure decision-making, clear communication, and audience building directly into engineering team collaboration and documentation.",
    ],
    technologies: ["Leadership", "Strategic Decision-Making", "Communication", "Curriculum Design", "Community"],
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
    items: ["Pandas", "NumPy", "Matplotlib", "Git", "Postman", "SQL"],
  },
];

export const ExperienceSection = () => {
  return (
    <section id="experience" className="relative isolate border-b hairline scroll-mt-20 py-20 md:py-28 min-h-[calc(100vh-4rem)] flex flex-col justify-center">
      <div className="container">
        <SectionHeader
          index="02"
          eyebrow="The record"
          title="Student, researcher, engineer, builder, leader."
          description="Each entry is a step up in ownership — from designing an experiment to owning a production feature to running a community and a team."
        />

        <ol className="relative mt-16 border-l border-line/70">
          {stages.map((s, i) => (
            <Reveal
              as="li"
              key={`${s.company}-${s.role}`}
              delay={Math.min(i * 80, 240)}
              className="relative pl-8 pb-14 last:pb-0"
            >
              <span
                aria-hidden
                className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-accent ring-4 ring-page"
              />

              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="entry-index">{String(i + 1).padStart(2, "0")}</span>
                <span className="eyebrow text-accent">{s.order}</span>
                <span className="eyebrow">· {s.period}</span>
              </div>
              <h3 className="mt-2 text-lg font-medium text-fg md:text-xl">{s.role}</h3>
              <p className="text-sm text-muted">{s.company}</p>

              <ul className="mt-5 space-y-2.5 text-[14.5px] leading-relaxed text-muted">
                {s.points.map((point) => (
                  <li key={point} className="flex gap-3">
                    <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-muted/60" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              <div className="mono mt-4 text-[12px] text-muted">
                {s.technologies.join("  ·  ")}
              </div>
            </Reveal>
          ))}
        </ol>

        {/* Education + Publications */}
        <div className="mt-20 grid gap-px overflow-hidden border border-line/70 lg:grid-cols-2">
          <Reveal as="article" className="bg-page p-6 md:p-7">
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
                <span>Magna Cum Laude · GPA 3.67 / 4.00 · Dean&apos;s Lister</span>
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

          <Reveal as="article" delay={90} className="bg-page p-6 md:p-7">
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
              International Conference on Mechatronics, Control and Robotics.
            </p>
            <div className="mt-5 relative aspect-[4/3] overflow-hidden border border-line/60">
              <Image
                src="/Achievements/Tokyo.jpg"
                alt="Chester Andaya presenting the NPK deficiency detection research at ICMCR 2026 in Tokyo, Japan"
                fill
                sizes="(min-width: 1024px) 480px, 100vw"
                className="object-cover grayscale-[10%]"
              />
            </div>
            <p className="mono mt-2 text-[11px] text-muted">
              Presenting at ICMCR 2026 · Tokyo, March 2026
            </p>
          </Reveal>
        </div>

        {/* Skills */}
        <div className="mt-6 border border-line/70 p-6 md:p-8">
          <div className="eyebrow mb-6">Technical stack</div>
          <div className="grid gap-8 md:grid-cols-2">
            {skillGroups.map((group) => (
              <div key={group.label}>
                <h3 className="text-sm font-medium text-fg">{group.label}</h3>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="mono border border-line/60 px-2.5 py-1 text-xs text-muted"
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
