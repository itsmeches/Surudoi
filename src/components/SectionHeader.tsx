interface SectionHeaderProps {
  /** Log entry number, e.g. "02". Reinforces the notebook motif. */
  index?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export const SectionHeader = ({
  index,
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeaderProps) => {
  const alignment =
    align === "center" ? "items-center text-center mx-auto" : "items-start";

  return (
    <div className={`flex flex-col gap-4 max-w-2xl ${alignment}`}>
      {(index || eyebrow) && (
        <div className="eyebrow flex items-center gap-3">
          {index && <span className="entry-index">{index}</span>}
          {index && eyebrow && <span className="h-px w-6 bg-line" />}
          {eyebrow}
        </div>
      )}
      <h2 className="display font-serif text-[2rem] leading-[1.08] sm:text-[2.5rem] md:text-[2.75rem] tracking-[-0.01em] text-fg">
        {title}
      </h2>
      {description && (
        <p className="max-w-xl text-[15px] md:text-base leading-relaxed text-muted">
          {description}
        </p>
      )}
    </div>
  );
};
