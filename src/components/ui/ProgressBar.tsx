interface ProgressBarProps {
  completed: number;
  total: number;
}

export function ProgressBar({ completed, total }: ProgressBarProps) {
  const pct = total === 0 ? 0 : Math.round((completed / total) * 100);
  return (
    <div className="flex items-center gap-3">
      <div className="h-2 flex-1 rounded-full bg-progress-track overflow-hidden">
        <div
          className="h-full rounded-full bg-progress-fill transition-all duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-xs font-mono text-muted-foreground whitespace-nowrap">
        {completed}/{total}
      </span>
    </div>
  );
}
