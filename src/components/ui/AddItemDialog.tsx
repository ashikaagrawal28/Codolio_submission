import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Difficulty } from '@/types/sheet';

interface AddItemDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type: 'topic' | 'subtopic' | 'question';
  onSubmit: (data: { title: string; difficulty?: Difficulty; link?: string }) => void;
  initialData?: { title: string; difficulty?: Difficulty; link?: string };
  editMode?: boolean;
}

export function AddItemDialog({ open, onOpenChange, type, onSubmit, initialData, editMode }: AddItemDialogProps) {
  const [title, setTitle] = useState(initialData?.title || '');
  const [difficulty, setDifficulty] = useState<Difficulty>(initialData?.difficulty || 'medium');
  const [link, setLink] = useState(initialData?.link || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSubmit({ title: title.trim(), ...(type === 'question' ? { difficulty, link } : {}) });
    if (!editMode) {
      setTitle('');
      setDifficulty('medium');
      setLink('');
    }
    onOpenChange(false);
  };

  const labels: Record<string, string> = {
    topic: 'Topic',
    subtopic: 'Sub-topic',
    question: 'Question',
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-mono text-lg">
            {editMode ? 'Edit' : 'Add'} {labels[type]}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={`Enter ${labels[type].toLowerCase()} title`}
              autoFocus
            />
          </div>
          {type === 'question' && (
            <>
              <div className="space-y-2">
                <Label>Difficulty</Label>
                <Select value={difficulty} onValueChange={(v) => setDifficulty(v as Difficulty)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="easy">Easy</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="link">Link (optional)</Label>
                <Input
                  id="link"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  placeholder="https://leetcode.com/problems/..."
                />
              </div>
            </>
          )}
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">
              {editMode ? 'Save' : 'Add'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
