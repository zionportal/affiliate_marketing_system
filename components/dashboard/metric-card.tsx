import type { LucideIcon } from "lucide-react";

type MetricCardProps = {
  label: string;
  value: string;
  detail: string;
  change: string;
  icon: LucideIcon;
  tone?: "olive" | "teal" | "amber" | "rose";
};

const toneMap = {
  olive: "bg-[rgba(97,122,66,0.14)] text-[var(--olive-deep)]",
  teal: "bg-[rgba(63,128,144,0.14)] text-[var(--teal)]",
  amber: "bg-[rgba(215,154,55,0.18)] text-[#8a621f]",
  rose: "bg-[rgba(169,95,73,0.14)] text-[var(--rose)]",
};

export function MetricCard({
  label,
  value,
  detail,
  change,
  icon: Icon,
  tone = "olive",
}: MetricCardProps) {
  return (
    <div className="glass-panel rounded-[30px] p-5 sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-[var(--ink-soft)]">{label}</p>
          <p className="mt-3 text-4xl font-semibold tracking-tight text-[var(--foreground)]">
            {value}
          </p>
        </div>
        <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${toneMap[tone]}`}>
          <Icon className="h-6 w-6" />
        </div>
      </div>

      <div className="mt-5 flex items-end justify-between gap-4">
        <p className="max-w-[16rem] text-sm leading-6 text-[var(--ink-soft)]">{detail}</p>
        <p className="rounded-full bg-white/85 px-3 py-2 text-sm font-semibold text-[var(--olive-deep)]">
          {change}
        </p>
      </div>
    </div>
  );
}
