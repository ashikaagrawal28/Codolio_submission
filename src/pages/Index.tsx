import { useState, useMemo } from "react";
import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd";

import { useSheetStore } from "../store/sheetStore";

import { SheetHeader } from "../components/ui/SheetHeader";
import { TopicCard } from "../components/ui/TopicCard";
import { AddItemDialog } from "../components/ui/AddItemDialog";
import { SearchFilterBar } from "../components/ui/SearchFilterBar";
import { StatsPanel } from "../components/ui/StatsPanel";
import { Button } from "../components/ui/button";

import { Plus } from "lucide-react";
import { Difficulty } from "../types/sheet";

const Index = () => {
  const { sheet, addTopic, reorderTopics, reorderSubTopics, reorderQuestions } =
    useSheetStore();

  const [addTopicOpen, setAddTopicOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [difficultyFilter, setDifficultyFilter] =
    useState<Difficulty | "all">("all");
  const [statusFilter, setStatusFilter] =
    useState<"all" | "completed" | "pending">("all");

  const hasFilters =
    searchQuery || difficultyFilter !== "all" || statusFilter !== "all";

  const filteredTopics = useMemo(() => {
    if (!hasFilters) return sheet.topics;

    return sheet.topics
      .map((topic) => ({
        ...topic,
        subTopics: topic.subTopics
          .map((st) => ({
            ...st,
            questions: st.questions.filter((q) => {
              const matchSearch =
                !searchQuery ||
                q.title.toLowerCase().includes(searchQuery.toLowerCase());

              const matchDifficulty =
                difficultyFilter === "all" ||
                q.difficulty === difficultyFilter;

              const matchStatus =
                statusFilter === "all"
                  ? true
                  : statusFilter === "completed"
                  ? q.completed
                  : !q.completed;

              return matchSearch && matchDifficulty && matchStatus;
            }),
          }))
          .filter((st) => st.questions.length > 0),
      }))
      .filter((t) => t.subTopics.length > 0);
  }, [sheet.topics, searchQuery, difficultyFilter, statusFilter, hasFilters]);

  const handleDragEnd = (result: DropResult) => {
    if (hasFilters) return;

    const { source, destination, type } = result;
    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    if (type === "topic") {
      reorderTopics(source.index, destination.index);
    } else if (type === "subtopic") {
      const topicId = source.droppableId.replace("subtopics-", "");
      reorderSubTopics(topicId, source.index, destination.index);
    } else if (type === "question") {
      const key = source.droppableId.replace("questions-", "");

      for (const topic of sheet.topics) {
        for (const st of topic.subTopics) {
          if (`${topic.id}-${st.id}` === key) {
            reorderQuestions(topic.id, st.id, source.index, destination.index);
            return;
          }
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground py-10 px-6 lg:px-16">
      <div className="max-w-6xl mx-auto space-y-8 px-6 py-10">

        <SheetHeader />
        <StatsPanel />

        <SearchFilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          difficultyFilter={difficultyFilter}
          onDifficultyChange={setDifficultyFilter}
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
        />

        <div className="flex justify-end">
          <Button
            onClick={() => setAddTopicOpen(true)}
            size="sm"
            className="gap-1.5 font-mono text-xs"
          >
            <Plus className="h-4 w-4" />
            Add Topic
          </Button>
        </div>

        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="topics" type="topic">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="space-y-4"
              >
                {filteredTopics.map((topic, i) => (
                  <TopicCard key={topic.id} topic={topic} index={i} />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        {filteredTopics.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            <p className="text-lg font-mono">No topics yet</p>
            <p className="text-sm mt-1">
              Click "Add Topic" to get started
            </p>
          </div>
        )}
      </div>

      <AddItemDialog
        open={addTopicOpen}
        onOpenChange={setAddTopicOpen}
        type="topic"
        onSubmit={(data) => addTopic(data.title)}
      />
    </div>
  );
};

export default Index;

