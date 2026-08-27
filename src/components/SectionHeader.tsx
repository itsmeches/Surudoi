interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export const SectionHeader = ({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeaderProps) => {
  const alignment =
    align === "center" ? "items-center text-center mx-auto" : "items-start";

  return (
    <div className={`flex flex-col gap-4 max-w-2xl ${alignment}`}>
      {eyebrow && (
        <div className="eyebrow flex items-center gap-3">
          <span className="h-px w-6 bg-accent" />
          {eyebrow}
        </div>
      )}
      <h2 className="display font-serif text-[2rem] leading-[1.05] sm:text-[2.5rem] md:text-[3rem] tracking-[-0.02em] text-fg">
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
