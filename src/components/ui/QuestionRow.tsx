import { useState } from 'react';
import { Draggable } from '@hello-pangea/dnd';
import { Question } from '@/types/sheet';
import { DifficultyBadge } from './DifficultyBadge';
import { Checkbox } from '@/components/ui/checkbox';
import { GripVertical, ExternalLink, Pencil, Trash2 } from 'lucide-react';
import { AddItemDialog } from './AddItemDialog';

interface QuestionRowProps {
  question: Question;
  index: number;
  topicId: string;
  subTopicId: string;
  onToggle: () => void;
  onUpdate: (updates: Partial<Question>) => void;
  onDelete: () => void;
}

export function QuestionRow({ question, index, onToggle, onUpdate, onDelete }: QuestionRowProps) {
  const [editOpen, setEditOpen] = useState(false);

  return (
    <>
      <Draggable draggableId={question.id} index={index}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            className={`group flex items-center gap-3 rounded-md px-3 py-2.5 transition-colors ${
              snapshot.isDragging
                ? 'bg-accent shadow-lg'
                : question.completed
                ? 'bg-completed-bg'
                : 'hover:bg-muted/50'
            }`}
          >
            <div
              {...provided.dragHandleProps}
              className="cursor-grab text-drag-handle opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <GripVertical className="h-4 w-4" />
            </div>

            <Checkbox
              checked={question.completed}
              onCheckedChange={onToggle}
              className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
            />

            <span
              className={`flex-1 text-sm ${
                question.completed ? 'line-through text-muted-foreground' : 'text-foreground'
              }`}
            >
              {question.title}
            </span>

            <DifficultyBadge difficulty={question.difficulty} />

            {question.link && (
              <a
                href={question.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            )}

            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => setEditOpen(true)}
                className="p-1 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
              >
                <Pencil className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={onDelete}
                className="p-1 rounded hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        )}
      </Draggable>

      <AddItemDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        type="question"
        editMode
        initialData={{ title: question.title, difficulty: question.difficulty, link: question.link }}
        onSubmit={(data) => onUpdate(data)}
      />
    </>
  );
}
