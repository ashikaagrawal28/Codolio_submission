import { Difficulty } from '@/types/sheet';

const difficultyConfig: Record<Difficulty, { label: string; className: string }> = {
  easy: { label: 'Easy', className: 'bg-badge-easy-bg text-badge-easy' },
  medium: { label: 'Medium', className: 'bg-badge-medium-bg text-badge-medium' },
  hard: { label: 'Hard', className: 'bg-badge-hard-bg text-badge-hard' },
};

export function DifficultyBadge({ difficulty }: { difficulty: Difficulty }) {
  const config = difficultyConfig[difficulty];
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${config.className}`}>
      {config.label}
    </span>
  );
}

