export type Difficulty = 'easy' | 'medium' | 'hard';

export interface Question {
  id: string;
  title: string;
  difficulty: Difficulty;
  link?: string;
  completed: boolean;
  notes?: string;
}

export interface SubTopic {
  id: string;
  title: string;
  questions: Question[];
}

export interface Topic {
  id: string;
  title: string;
  subTopics: SubTopic[];
}

export interface Sheet {
  id: string;
  title: string;
  description: string;
  topics: Topic[];
}
