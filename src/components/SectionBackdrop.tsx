type SectionBackdropProps = {
  /** Where to anchor the soft orb. Defaults to a centred top placement. */
  orb?: "top-center" | "top-left" | "top-right";
  /** Accent color variable to use for the orb. */
  tone?: "accent" | "accent-alt";
  /** Show the masked dot grid layer. */
  dots?: boolean;
  /** Show the bottom hairline that visually links to the next section. */
  hairline?: boolean;
};

/**
 * Connecting-tissue backdrop used by Projects, Experience, About, Contact.
 * All layers are decorative, pointer-events-none, and -z-10 so they never
 * block real content. Pair with `relative isolate overflow-hidden` on the
 * section.
 */
export const SectionBackdrop = ({
  orb = "top-center",
  tone = "accent",
  dots = true,
  hairline = true,
}: SectionBackdropProps) => {
  const orbPos =
    orb === "top-left"
      ? "-top-32 -left-32"
      : orb === "top-right"
        ? "-top-32 -right-32"
        : "-top-32 left-1/2 -translate-x-1/2";

  return (
    <>
      <div
        aria-hidden
        className={`pointer-events-none absolute -z-10 h-[420px] w-[700px] rounded-full opacity-50 blur-3xl ${orbPos}`}
        style={{
          background: `radial-gradient(closest-side, rgb(var(--${tone}) / 0.09), transparent 70%)`,
        }}
      />

      {dots && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 opacity-[0.4]"
          style={{
            backgroundImage:
              "radial-gradient(rgb(var(--fg) / 0.05) 1px, transparent 1px)",
            backgroundSize: "26px 26px",
            maskImage:
              "radial-gradient(110% 55% at 50% 0%, #000 25%, transparent 75%)",
            WebkitMaskImage:
              "radial-gradient(110% 55% at 50% 0%, #000 25%, transparent 75%)",
          }}
        />
      )}

      {hairline && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-px bg-gradient-to-r from-transparent via-line/60 to-transparent"
        />
      )}
    </>
  );
};
