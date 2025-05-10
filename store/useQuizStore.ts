import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

type QuizProgress  = {
  selectedOptions: (number | null)[]
  hasAnswered: boolean[]
  currentIndex: number
};

type QuizStore = {
  quizzes: Record<string, QuizProgress>;
  loadQuiz: (topicId: string, totalQuestions: number) => Promise<void>;
  updateAnswer: (topicId: string, index: number, selected: number) => void;
  goToNextQuestion: (topicId: string) => void;
  resetQuiz: (topicId: string) => Promise<void>;
};

const getStorageKey = (topicId: string) => `quiz-progress-${topicId}`;

export const useQuizStore = create<QuizStore>((set, get) => ({
  quizzes: {},

  loadQuiz: async (topicId, totalQuestions) => {
    const key = getStorageKey(topicId);
    try {
      const stored = await AsyncStorage.getItem(key);
      if (stored) {
        const parsed = JSON.parse(stored);
        set(state => ({
          quizzes: {
            ...state.quizzes,
            [topicId]: parsed,
          },
        }));
      } else {
        const initial: QuizProgress = {
          selectedOptions: Array(totalQuestions).fill(null),
          hasAnswered: Array(totalQuestions).fill(null),
          currentIndex: 0,
        };
        set(state => ({
          quizzes: {
            ...state.quizzes,
            [topicId]: initial,
          },
        }));
      }
    } catch (e) {
      console.error('Failed to load quiz:', e);
    }
  },

  updateAnswer: (topicId, index, selected) => {
    const quizzes = get().quizzes;
    const quiz = quizzes[topicId];
    if (!quiz) return;

    const updated: QuizProgress = {
      ...quiz,
      selectedOptions: quiz.selectedOptions.map((opt, i) => (i === index ? selected : opt)),
      hasAnswered: quiz.hasAnswered.map((ans, i) => (i === index ? true : ans)),
    };

    set(state => ({
      quizzes: {
        ...state.quizzes,
        [topicId]: updated,
      }
    }));

    AsyncStorage.setItem(getStorageKey(topicId), JSON.stringify(updated));
  },

  goToNextQuestion: (topicId) => {
    const quizzes = get().quizzes;
    const quiz = quizzes[topicId];
    if (!quiz) return;

    const updated = {
      ...quiz,
      currentIndex: quiz.currentIndex + 1,
    }

    set(state => ({
      quizzes: {
        ...state.quizzes,
        [topicId]: updated,
      }
    }));

    AsyncStorage.setItem(getStorageKey(topicId), JSON.stringify(updated));
  },

  resetQuiz: async (topicId) => {
    const quizzes = get().quizzes;
    const total = quizzes[topicId]?.selectedOptions.length ?? 0;

    const reset: QuizProgress = {
      selectedOptions: Array(total).fill(null),
      hasAnswered: Array(total).fill(null),
      currentIndex: 0
    }

    set(state => ({
      quizzes: {
        ...state.quizzes,
        [topicId]: reset,
      }
    }));
  
    AsyncStorage.removeItem(getStorageKey(topicId));
  }
}));