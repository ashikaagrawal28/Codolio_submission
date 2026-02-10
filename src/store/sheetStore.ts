import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Sheet, Topic, SubTopic, Question, Difficulty } from '@/types/sheet';
import { sampleSheet } from '@/data/sampleData';

let nextId = 1000;
const genId = () => `item-${nextId++}`;

interface SheetStore {
  sheet: Sheet;
  addTopic: (title: string) => void;
  updateTopic: (topicId: string, title: string) => void;
  deleteTopic: (topicId: string) => void;
  addSubTopic: (topicId: string, title: string) => void;
  updateSubTopic: (topicId: string, subTopicId: string, title: string) => void;
  deleteSubTopic: (topicId: string, subTopicId: string) => void;
  addQuestion: (topicId: string, subTopicId: string, question: Omit<Question, 'id' | 'completed'>) => void;
  updateQuestion: (topicId: string, subTopicId: string, questionId: string, updates: Partial<Question>) => void;
  deleteQuestion: (topicId: string, subTopicId: string, questionId: string) => void;
  toggleQuestion: (topicId: string, subTopicId: string, questionId: string) => void;
  reorderTopics: (startIndex: number, endIndex: number) => void;
  reorderSubTopics: (topicId: string, startIndex: number, endIndex: number) => void;
  reorderQuestions: (topicId: string, subTopicId: string, startIndex: number, endIndex: number) => void;
  importSheet: (data: Partial<Sheet>) => void;
  resetSheet: () => void;
}

function reorder<T>(list: T[], startIndex: number, endIndex: number): T[] {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
}

export const useSheetStore = create<SheetStore>()(
  persist(
    (set) => ({
      sheet: sampleSheet,

      addTopic: (title) =>
        set((state) => ({
          sheet: { ...state.sheet, topics: [...state.sheet.topics, { id: genId(), title, subTopics: [] }] },
        })),

      updateTopic: (topicId, title) =>
        set((state) => ({
          sheet: { ...state.sheet, topics: state.sheet.topics.map((t) => (t.id === topicId ? { ...t, title } : t)) },
        })),

      deleteTopic: (topicId) =>
        set((state) => ({
          sheet: { ...state.sheet, topics: state.sheet.topics.filter((t) => t.id !== topicId) },
        })),

      addSubTopic: (topicId, title) =>
        set((state) => ({
          sheet: {
            ...state.sheet,
            topics: state.sheet.topics.map((t) =>
              t.id === topicId ? { ...t, subTopics: [...t.subTopics, { id: genId(), title, questions: [] }] } : t
            ),
          },
        })),

      updateSubTopic: (topicId, subTopicId, title) =>
        set((state) => ({
          sheet: {
            ...state.sheet,
            topics: state.sheet.topics.map((t) =>
              t.id === topicId
                ? { ...t, subTopics: t.subTopics.map((st) => (st.id === subTopicId ? { ...st, title } : st)) }
                : t
            ),
          },
        })),

      deleteSubTopic: (topicId, subTopicId) =>
        set((state) => ({
          sheet: {
            ...state.sheet,
            topics: state.sheet.topics.map((t) =>
              t.id === topicId ? { ...t, subTopics: t.subTopics.filter((st) => st.id !== subTopicId) } : t
            ),
          },
        })),

      addQuestion: (topicId, subTopicId, question) =>
        set((state) => ({
          sheet: {
            ...state.sheet,
            topics: state.sheet.topics.map((t) =>
              t.id === topicId
                ? {
                    ...t,
                    subTopics: t.subTopics.map((st) =>
                      st.id === subTopicId
                        ? { ...st, questions: [...st.questions, { ...question, id: genId(), completed: false }] }
                        : st
                    ),
                  }
                : t
            ),
          },
        })),

      updateQuestion: (topicId, subTopicId, questionId, updates) =>
        set((state) => ({
          sheet: {
            ...state.sheet,
            topics: state.sheet.topics.map((t) =>
              t.id === topicId
                ? {
                    ...t,
                    subTopics: t.subTopics.map((st) =>
                      st.id === subTopicId
                        ? { ...st, questions: st.questions.map((q) => (q.id === questionId ? { ...q, ...updates } : q)) }
                        : st
                    ),
                  }
                : t
            ),
          },
        })),

      deleteQuestion: (topicId, subTopicId, questionId) =>
        set((state) => ({
          sheet: {
            ...state.sheet,
            topics: state.sheet.topics.map((t) =>
              t.id === topicId
                ? {
                    ...t,
                    subTopics: t.subTopics.map((st) =>
                      st.id === subTopicId ? { ...st, questions: st.questions.filter((q) => q.id !== questionId) } : st
                    ),
                  }
                : t
            ),
          },
        })),

      toggleQuestion: (topicId, subTopicId, questionId) =>
        set((state) => ({
          sheet: {
            ...state.sheet,
            topics: state.sheet.topics.map((t) =>
              t.id === topicId
                ? {
                    ...t,
                    subTopics: t.subTopics.map((st) =>
                      st.id === subTopicId
                        ? { ...st, questions: st.questions.map((q) => (q.id === questionId ? { ...q, completed: !q.completed } : q)) }
                        : st
                    ),
                  }
                : t
            ),
          },
        })),

      reorderTopics: (startIndex, endIndex) =>
        set((state) => ({
          sheet: { ...state.sheet, topics: reorder(state.sheet.topics, startIndex, endIndex) },
        })),

      reorderSubTopics: (topicId, startIndex, endIndex) =>
        set((state) => ({
          sheet: {
            ...state.sheet,
            topics: state.sheet.topics.map((t) =>
              t.id === topicId ? { ...t, subTopics: reorder(t.subTopics, startIndex, endIndex) } : t
            ),
          },
        })),

      reorderQuestions: (topicId, subTopicId, startIndex, endIndex) =>
        set((state) => ({
          sheet: {
            ...state.sheet,
            topics: state.sheet.topics.map((t) =>
              t.id === topicId
                ? {
                    ...t,
                    subTopics: t.subTopics.map((st) =>
                      st.id === subTopicId ? { ...st, questions: reorder(st.questions, startIndex, endIndex) } : st
                    ),
                  }
                : t
            ),
          },
        })),

      importSheet: (data) =>
        set((state) => ({
          sheet: { ...state.sheet, ...data },
        })),

      resetSheet: () =>
        set(() => ({
          sheet: sampleSheet,
        })),
    }),
    { name: 'question-tracker-storage' }
  )
);
