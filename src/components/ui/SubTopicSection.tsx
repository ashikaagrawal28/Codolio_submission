import { useState } from 'react';
import { Draggable, Droppable } from '@hello-pangea/dnd';
import { SubTopic } from '@/types/sheet';
import { QuestionRow } from './QuestionRow';
import { useSheetStore } from '@/store/sheetStore';
import { AddItemDialog } from './AddItemDialog';
import { ConfirmDialog } from './ConfirmDialog';
import { GripVertical, Plus, Pencil, Trash2, ChevronDown, ChevronRight } from 'lucide-react';

interface SubTopicSectionProps {
  subTopic: SubTopic;
  index: number;
  topicId: string;
}

export function SubTopicSection({ subTopic, index, topicId }: SubTopicSectionProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [addQuestionOpen, setAddQuestionOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const { addQuestion, updateQuestion, deleteQuestion, toggleQuestion, updateSubTopic, deleteSubTopic } = useSheetStore();

  const completedCount = subTopic.questions.filter((q) => q.completed).length;

  return (
    <>
      <Draggable draggableId={subTopic.id} index={index}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            className={`rounded-lg border bg-subtopic transition-shadow ${snapshot.isDragging ? 'shadow-lg' : ''}`}
          >
            <div className="group flex items-center gap-2 px-3 py-2.5 border-b border-border/50">
              <div {...provided.dragHandleProps} className="cursor-grab text-drag-handle opacity-0 group-hover:opacity-100 transition-opacity">
                <GripVertical className="h-4 w-4" />
              </div>
              <button onClick={() => setCollapsed(!collapsed)} className="text-muted-foreground hover:text-foreground transition-colors">
                {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </button>
              <h3 className="flex-1 text-sm font-semibold text-foreground">{subTopic.title}</h3>
              <span className="text-xs font-mono text-muted-foreground">{completedCount}/{subTopic.questions.length}</span>
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => setAddQuestionOpen(true)} className="p-1 rounded hover:bg-muted text-muted-foreground hover:text-primary transition-colors" title="Add question">
                  <Plus className="h-3.5 w-3.5" />
                </button>
                <button onClick={() => setEditOpen(true)} className="p-1 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
                  <Pencil className="h-3.5 w-3.5" />
                </button>
                <button onClick={() => setDeleteOpen(true)} className="p-1 rounded hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors">
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {!collapsed && (
              <Droppable droppableId={`questions-${topicId}-${subTopic.id}`} type="question">
                {(dropProvided) => (
                  <div ref={dropProvided.innerRef} {...dropProvided.droppableProps} className="p-1.5 space-y-0.5 min-h-[8px]">
                    {subTopic.questions.map((q, qi) => (
                      <QuestionRow
                        key={q.id}
                        question={q}
                        index={qi}
                        topicId={topicId}
                        subTopicId={subTopic.id}
                        onToggle={() => toggleQuestion(topicId, subTopic.id, q.id)}
                        onUpdate={(updates) => updateQuestion(topicId, subTopic.id, q.id, updates)}
                        onDelete={() => deleteQuestion(topicId, subTopic.id, q.id)}
                      />
                    ))}
                    {dropProvided.placeholder}
                  </div>
                )}
              </Droppable>
            )}
          </div>
        )}
      </Draggable>

      <AddItemDialog open={addQuestionOpen} onOpenChange={setAddQuestionOpen} type="question" onSubmit={(data) => addQuestion(topicId, subTopic.id, { title: data.title, difficulty: data.difficulty || 'medium', link: data.link })} />
      <AddItemDialog open={editOpen} onOpenChange={setEditOpen} type="subtopic" editMode initialData={{ title: subTopic.title }} onSubmit={(data) => updateSubTopic(topicId, subTopic.id, data.title)} />
      <ConfirmDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        title="Delete Sub-topic?"
        description={`This will permanently delete "${subTopic.title}" and all its questions.`}
        onConfirm={() => deleteSubTopic(topicId, subTopic.id)}
      />
    </>
  );
}
