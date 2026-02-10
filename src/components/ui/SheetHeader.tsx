import { useSheetStore } from '@/store/sheetStore';
import { ProgressBar } from './ProgressBar';

export function SheetHeader() {
  const { sheet } = useSheetStore();

  const allQuestions = sheet.topics.flatMap((t) => t.subTopics.flatMap((st) => st.questions));
  const completed = allQuestions.filter((q) => q.completed).length;
  const total = allQuestions.length;

  return (
    <header className="text-center space-y-3">
      <h1 className="text-3xl md:text-4xl font-bold font-mono tracking-tight text-foreground">
        {sheet.title}
      </h1>
      <p className="text-muted-foreground max-w-lg mx-auto text-sm">
        {sheet.description}
      </p>
      <div className="max-w-sm mx-auto pt-1">
        <ProgressBar completed={completed} total={total} />
      </div>
      <div className="flex justify-center gap-4 text-xs text-muted-foreground font-mono pt-1">
        <span>{sheet.topics.length} topics</span>
        <span>·</span>
        <span>{total} questions</span>
        <span>·</span>
        <span className="text-primary font-semibold">{Math.round(total ? (completed / total) * 100 : 0)}% done</span>
      </div>
    </header>
  );
}
