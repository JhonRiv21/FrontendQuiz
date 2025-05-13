export type QuizProgress  = {
  selectedOptions: (number | null)[]
  hasAnswered: (boolean | null)[];
  currentIndex: number
};

export type QuizStore = {
  quizzes: Record<string, QuizProgress>;
  loadQuiz: (topicId: string, totalQuestions: number) => Promise<void>;
  updateAnswer: (topicId: string, index: number, selected: number) => void;
  goToNextQuestion: (topicId: string) => void;
  resetQuiz: (topicId: string) => Promise<void>;
  setSelectedOption: (topicId: string, index: number, selected: number) => void;
};

export type QuizKeys = 'html' | 'css' | 'javascript' | 'accessibility';
