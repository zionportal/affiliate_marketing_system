type StatusTone = "olive" | "teal" | "amber" | "rose" | "ink";

const toneClasses: Record<StatusTone, string> = {
  olive: "bg-[rgba(97,122,66,0.14)] text-[var(--olive-deep)]",
  teal: "bg-[rgba(63,128,144,0.14)] text-[var(--teal)]",
  amber: "bg-[rgba(215,154,55,0.18)] text-[#8a621f]",
  rose: "bg-[rgba(169,95,73,0.14)] text-[var(--rose)]",
  ink: "bg-[rgba(29,48,40,0.08)] text-[var(--foreground)]",
};

type StatusPillProps = {
  label: string;
  tone?: StatusTone;
};

export function StatusPill({ label, tone = "ink" }: StatusPillProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold tracking-[0.18em] uppercase ${toneClasses[tone]}`}
    >
      {label}
    </span>
  );
}
