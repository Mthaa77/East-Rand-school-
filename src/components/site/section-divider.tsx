type SectionDividerProps = {
  index: string;
  label: string;
  tone?: "dark" | "light" | "crimson";
};

/** A server-rendered transition marker for the homepage's major movements. */
export function SectionDivider({
  index,
  label,
  tone = "dark",
}: SectionDividerProps) {
  return (
    <div
      role="separator"
      aria-label={`${index}, ${label}`}
      className={`section-divider section-divider--${tone}`}
    >
      <span className="section-divider__line" aria-hidden="true" />
      <span className="section-divider__caption font-mono" aria-hidden="true">
        <span>{index}</span>
        <span className="section-divider__marker" />
        <span>{label}</span>
      </span>
      <span className="section-divider__line" aria-hidden="true" />
    </div>
  );
}
