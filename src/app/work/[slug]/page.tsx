import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CaseStudyView } from "@/components/CaseStudyView";
import { Header } from "@/sections/Header";
import { Footer } from "@/sections/Footer";
import { getCaseStudyBySlug, getCaseStudySlugs } from "@/data/caseStudies";

export const generateStaticParams = () =>
  getCaseStudySlugs().map((slug) => ({ slug }));

export const generateMetadata = ({ params }: { params: { slug: string } }): Metadata => {
  const study = getCaseStudyBySlug(params.slug);
  if (!study) return { title: "Case study not found" };
  return {
    title: `${study.title} — Chester Andaya`,
    description: study.summary,
    openGraph: {
      title: `${study.title} — Chester Andaya`,
      description: study.summary,
      type: "article",
    },
  };
};

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const study = getCaseStudyBySlug(params.slug);
  if (!study) notFound();

  return (
    <>
      <Header />
      <main>
        <CaseStudyView study={study} />
      </main>
      <Footer />
    </>
  );
}
