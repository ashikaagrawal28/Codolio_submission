import { useSheetStore } from '@/store/sheetStore';
import { BarChart3, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';

export function StatsPanel() {
  const { sheet, resetSheet } = useSheetStore();
  const [resetOpen, setResetOpen] = useState(false);

  const allQuestions = sheet.topics.flatMap((t) => t.subTopics.flatMap((st) => st.questions));
  const total = allQuestions.length;
  const completed = allQuestions.filter((q) => q.completed).length;
  const easy = allQuestions.filter((q) => q.difficulty === 'easy');
  const medium = allQuestions.filter((q) => q.difficulty === 'medium');
  const hard = allQuestions.filter((q) => q.difficulty === 'hard');

  const stats = [
    { label: 'Easy', total: easy.length, done: easy.filter((q) => q.completed).length, color: 'text-badge-easy' },
    { label: 'Medium', total: medium.length, done: medium.filter((q) => q.completed).length, color: 'text-badge-medium' },
    { label: 'Hard', total: hard.length, done: hard.filter((q) => q.completed).length, color: 'text-badge-hard' },
  ];

  return (
    <div className="rounded-xl border bg-card p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold font-mono flex items-center gap-2 text-foreground">
          <BarChart3 className="h-4 w-4 text-primary" />
          Statistics
        </h3>
        <Button variant="ghost" size="sm" onClick={() => setResetOpen(true)} className="h-7 px-2 text-xs gap-1 text-destructive hover:text-destructive">
          <RotateCcw className="h-3.5 w-3.5" /> Reset
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {stats.map((s) => (
          <div key={s.label} className="rounded-lg bg-muted/50 p-3 text-center">
            <div className={`text-lg font-bold font-mono ${s.color}`}>{s.done}/{s.total}</div>
            <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="text-center text-xs text-muted-foreground font-mono">
        Overall: {completed}/{total} ({total ? Math.round((completed / total) * 100) : 0}%)
      </div>

      {/* Reset Confirm */}
      <Dialog open={resetOpen} onOpenChange={setResetOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-mono">Reset to Default?</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">This will replace all your data with the original sample data. This action cannot be undone.</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setResetOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={() => { resetSheet(); setResetOpen(false); }}>Reset</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
