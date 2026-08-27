import type { StaticImageData } from "next/image";

import Ampalaya from "@/assets/images/Ampalaya.png";
import Smart from "@/assets/images/Smart Admission.png";
import Inventory from "@/assets/images/Inventory system.png";
import Coffee from "@/assets/images/Liberica.png";

export type CaseStudyLink = { label: string; href: string };
export type CaseStudyDecision = { title: string; body: string };
export type CaseStudyResult = { metric: string; label: string };

export type CaseStudy = {
  slug: string;
  title: string;
  year: string;
  org: string;
  role: string;
  summary: string;
  hero: { src: StaticImageData; alt: string };
  problem: string;
  approach: string;
  architecture: string[];
  decisions: CaseStudyDecision[];
  results: CaseStudyResult[];
  stack: string[];
  learnings: string;
  links: CaseStudyLink[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "npk-deficiency-detection",
    title: "NPK Deficiency Detection in Bitter Gourd Leaves",
    year: "2026",
    org: "ICMCR 2026 / Department of Agriculture Region IV-A",
    role: "ML Engineer · Researcher",
    summary:
      "Published computer vision research project that classifies bitter gourd leaf nutrient deficiency into Healthy, Nitrogen, Phosphorus, and Potassium classes.",
    hero: { src: Ampalaya, alt: "NPK deficiency detection system interface" },
    problem:
      "Field agriculturists rely on manual visual diagnosis and delayed laboratory feedback to identify nutrient deficiencies, which slows intervention and affects crop outcomes. The project goal was to build a reliable, accessible classifier that provides immediate guidance from leaf images.",
    approach:
      "I trained a ResNet50 model in PyTorch on a 2,500-image dataset validated by the Department of Agriculture Region IV-A. The workflow combined class balancing, image augmentation, and Bayesian hyperparameter search to improve generalization and close baseline performance gaps.",
    architecture: [
      "Data pipeline: image collection, annotation validation, normalization, and augmentation for four balanced classes.",
      "Modeling: ResNet50 fine-tuning in PyTorch with stratified validation, precision/recall tracking, and F1-centered selection.",
      "Explainability: confidence visualization and GradCAM overlays for transparent inference outputs.",
      "Product delivery: React + Django web app packaged with Docker for browser-based real-time image inference.",
    ],
    decisions: [
      {
        title: "Use ResNet50 as the primary backbone",
        body:
          "ResNet50 offered a strong transfer-learning baseline with stable convergence on limited agricultural data. It outperformed lighter baselines after tuning, while retaining manageable training time and deployment overhead.",
      },
      {
        title: "Prioritize F1-score with class-balancing",
        body:
          "Accuracy alone masked minority-class behavior in early runs. Rebalancing plus augmentation improved recall in weaker classes and produced a more trustworthy model for field decision-making.",
      },
    ],
    results: [
      { metric: "95%", label: "classification accuracy" },
      { metric: "96%", label: "F1-score" },
      { metric: "2,500", label: "validated leaf images" },
    ],
    stack: ["PyTorch", "ResNet50", "OpenCV", "React", "Django", "Docker", "GradCAM"],
    learnings:
      "High-performing models are only useful when paired with transparent outputs and a practical interface. This project reinforced the importance of balancing research rigor with real-world usability, especially when users are domain experts rather than ML practitioners.",
    links: [],
  },
  {
    slug: "enrollment-probability-prediction",
    title: "Enrollment Probability Prediction System",
    year: "2026",
    org: "National University - Lipa",
    role: "ML Engineer · Full-Stack Developer",
    summary:
      "Admissions analytics platform that predicts enrollment likelihood from historical records and supports decision-making through an interactive dashboard.",
    hero: { src: Smart, alt: "Enrollment probability analytics dashboard" },
    problem:
      "Admissions planning depended on manual trend checks and fragmented records, limiting forecasting quality and slowing decision cycles. The project aimed to produce accurate enrollment probability estimates and make results explorable for non-technical administrators.",
    approach:
      "I modeled 20,000+ historical student records using feature engineering, stratified cross-validation, and an ensemble strategy with KNN and Random Forest. I then delivered predictions through a React dashboard backed by a Flask REST API for easy cohort-level analysis.",
    architecture: [
      "Data preparation: cleaning, encoding, and feature engineering on historical admissions records.",
      "Modeling: KNN and Random Forest pipelines evaluated with stratified cross-validation and ensemble stacking.",
      "API layer: Flask REST endpoints for probability inference and analytics payloads.",
      "Frontend: React dashboard for cohort slicing, drill-down views, and admissions trend inspection.",
    ],
    decisions: [
      {
        title: "Use ensemble modeling over a single classifier",
        body:
          "Single-model runs plateaued near 83% accuracy. Combining models and engineered features improved robustness across cohorts and lifted final performance to 92.67%.",
      },
      {
        title: "Expose predictions in a dashboard, not raw tables",
        body:
          "Admissions users needed interpretable cohort signals rather than standalone probabilities. A visual dashboard made outputs easier to validate and act on.",
      },
    ],
    results: [
      { metric: "92.67%", label: "predictive accuracy" },
      { metric: "20,000+", label: "historical records processed" },
      { metric: "83% to 92.67%", label: "accuracy improvement" },
    ],
    stack: ["Scikit-learn", "KNN", "Random Forest", "React", "Flask", "Pandas"],
    learnings:
      "Admissions data quality and feature design strongly influence model reliability. The biggest gains came from engineering and validation discipline, then packaging outputs in a workflow that administrators could immediately use.",
    links: [],
  },
  {
    slug: "barako-sense",
    title: "Barako Sense - Liberica Coffee Tree Identification",
    year: "2026",
    org: "DLSU Manila · UPLB · Batangas State University",
    role: "ML Engineer · Research Collaborator",
    summary:
      "Cross-institutional system for Liberica tree identification and AI-assisted flavour profiling using a multi-input CNN approach.",
    hero: { src: Coffee, alt: "Barako Sense model output and profiling interface" },
    problem:
      "Kapeng Barako evaluation is often dependent on expert-only sensory workflows, limiting scale and consistency. The collaboration aimed to create a data-supported system for identifying Liberica trees and pairing image signals with expert flavour evaluations.",
    approach:
      "I led model development for a multi-input CNN pipeline using 4,000+ images from five DNA-verified trees, then fused visual embeddings with over 100 expert sensory records. The resulting platform supported both tree identification and AI-assisted flavour profiling.",
    architecture: [
      "Image ingestion and augmentation pipeline for DNA-verified Liberica tree samples.",
      "MobileNetV2-based visual feature extraction combined with auxiliary sensory inputs.",
      "Fusion pipeline linking CNN outputs with expert sensory evaluation records.",
      "React + Django platform for classification outputs and sensory data visualization.",
    ],
    decisions: [
      {
        title: "Adopt a multi-input architecture",
        body:
          "Single-modality visual models missed context present in sensory evaluations. Fusing visual and expert inputs improved profile quality and made outputs more aligned with domain interpretation.",
      },
      {
        title: "Constrain data to DNA-verified trees",
        body:
          "Using verified sources reduced label noise and improved trustworthiness for cross-institutional research outcomes.",
      },
    ],
    results: [
      { metric: "95%", label: "identification accuracy" },
      { metric: "4,000+", label: "images from verified trees" },
      { metric: "100+", label: "sensory records integrated" },
    ],
    stack: ["MobileNetV2", "OpenCV", "React", "Django", "Multi-Input CNN"],
    learnings:
      "Interdisciplinary projects require both technical rigor and communication clarity. Translating model outputs into language useful for researchers and domain experts was just as important as maximizing raw accuracy.",
    links: [],
  },
  {
    slug: "ched-cris",
    title: "Commission on Higher Education Regional Information System (CRIS)",
    year: "2026",
    org: "CHED Regional Office IV-A",
    role: "Full-Stack Developer Intern",
    summary:
      "Production enhancement and maintenance work on an internal regional information platform used for educational reporting and administrative operations.",
    hero: { src: Inventory, alt: "CRIS workflow and reporting module interface" },
    problem:
      "CHEDRO IV-A requires stable, maintainable software for internal reporting and operational workflows across regional education functions. The challenge was to improve existing features while preserving reliability and usability in a government production environment.",
    approach:
      "I contributed to frontend and backend improvements, supported REST API integration tasks, and assisted with debugging and database-related features. Work emphasized incremental enhancement, maintainability, and collaboration within an existing codebase.",
    architecture: [
      "Frontend enhancements for internal forms, views, and workflow usability.",
      "Backend updates for data processing and service-level behavior.",
      "REST API integration support between modules and services.",
      "Database-driven feature maintenance for reporting and admin operations.",
    ],
    decisions: [
      {
        title: "Favor incremental, low-risk improvements",
        body:
          "Because CRIS is used in active operations, reliability and continuity were prioritized over disruptive rewrites. Small, testable improvements reduced regression risk.",
      },
      {
        title: "Emphasize maintainability in implementation",
        body:
          "Readable code paths, debugging support, and operational clarity were essential for handoffs and long-term system support in a multi-developer environment.",
      },
    ],
    results: [
      { metric: "Production", label: "active government workflow support" },
      { metric: "REST + DB", label: "integration and feature contributions" },
      { metric: "Maintainability", label: "focus on debugging and operations" },
    ],
    stack: ["React", "Laravel", "REST APIs", "Database Systems", "Debugging"],
    learnings:
      "Shipping in a government context sharpened my appreciation for dependable systems, clear collaboration, and disciplined debugging. Sustainable engineering practices matter as much as feature speed when software supports essential operations.",
    links: [],
  },
];

export const getCaseStudyBySlug = (slug: string): CaseStudy | undefined =>
  caseStudies.find((c) => c.slug === slug);

export const getCaseStudySlugs = (): string[] => caseStudies.map((c) => c.slug);
