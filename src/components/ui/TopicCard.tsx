import { useState } from 'react';
import { Draggable, Droppable } from '@hello-pangea/dnd';
import { Topic } from '@/types/sheet';
import { SubTopicSection } from './SubTopicSection';
import { ProgressBar } from './ProgressBar';
import { useSheetStore } from '@/store/sheetStore';
import { AddItemDialog } from './AddItemDialog';
import { ConfirmDialog } from './ConfirmDialog';
import { GripVertical, Pencil, Trash2, ChevronDown, ChevronRight, FolderPlus } from 'lucide-react';

interface TopicCardProps {
  topic: Topic;
  index: number;
}

export function TopicCard({ topic, index }: TopicCardProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [addSubTopicOpen, setAddSubTopicOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const { addSubTopic, updateTopic, deleteTopic } = useSheetStore();

  const allQuestions = topic.subTopics.flatMap((st) => st.questions);
  const completed = allQuestions.filter((q) => q.completed).length;
  const total = allQuestions.length;

  return (
    <>
      <Draggable draggableId={topic.id} index={index}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            className={`rounded-xl border bg-card shadow-sm transition-shadow animate-fade-in ${
              snapshot.isDragging ? 'shadow-xl' : 'hover:shadow-md'
            }`}
          >
            <div className="group flex items-center gap-3 px-4 py-3.5">
              <div {...provided.dragHandleProps} className="cursor-grab text-drag-handle opacity-0 group-hover:opacity-100 transition-opacity">
                <GripVertical className="h-5 w-5" />
              </div>
              <button onClick={() => setCollapsed(!collapsed)} className="text-muted-foreground hover:text-foreground transition-colors">
                {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
              </button>
              <div className="flex-1 min-w-0">
                <h2 className="text-base font-bold font-mono text-foreground">{topic.title}</h2>
                <div className="mt-1.5 max-w-xs">
                  <ProgressBar completed={completed} total={total} />
                </div>
              </div>
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => setAddSubTopicOpen(true)} className="p-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-primary transition-colors" title="Add sub-topic">
                  <FolderPlus className="h-4 w-4" />
                </button>
                <button onClick={() => setEditOpen(true)} className="p-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
                  <Pencil className="h-4 w-4" />
                </button>
                <button onClick={() => setDeleteOpen(true)} className="p-1.5 rounded-md hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            {!collapsed && (
              <Droppable droppableId={`subtopics-${topic.id}`} type="subtopic">
                {(dropProvided) => (
                  <div ref={dropProvided.innerRef} {...dropProvided.droppableProps} className="px-4 pb-4 space-y-3 min-h-[8px]">
                    {topic.subTopics.map((st, si) => (
                      <SubTopicSection key={st.id} subTopic={st} index={si} topicId={topic.id} />
                    ))}
                    {dropProvided.placeholder}
                  </div>
                )}
              </Droppable>
            )}
          </div>
        )}
      </Draggable>

      <AddItemDialog open={addSubTopicOpen} onOpenChange={setAddSubTopicOpen} type="subtopic" onSubmit={(data) => addSubTopic(topic.id, data.title)} />
      <AddItemDialog open={editOpen} onOpenChange={setEditOpen} type="topic" editMode initialData={{ title: topic.title }} onSubmit={(data) => updateTopic(topic.id, data.title)} />
      <ConfirmDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        title="Delete Topic?"
        description={`This will permanently delete "${topic.title}" and all its sub-topics and questions.`}
        onConfirm={() => deleteTopic(topic.id)}
      />
    </>
  );
}
