import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useQuizStore } from '@/store/useQuizStore';
import AsyncStorage from '@react-native-async-storage/async-storage';

vi.mock('@react-native-async-storage/async-storage', () => {
  return {
    default: {
      getItem: vi.fn().mockResolvedValue(null),
      setItem: vi.fn().mockResolvedValue(undefined),
      removeItem: vi.fn().mockResolvedValue(undefined),
    },
  };
});

describe('Quiz Store', () => {
  const topicId = 'html';
  const totalQuestions = 3;

  beforeEach(() => {
    useQuizStore.setState({ quizzes: {} });
    vi.clearAllMocks();
  });

  it('loadQuiz initializes quiz when no stored data', async () => {
    (AsyncStorage.getItem as any).mockResolvedValue(null);

    await useQuizStore.getState().loadQuiz(topicId, totalQuestions);

    const quiz = useQuizStore.getState().quizzes[topicId];
    expect(quiz).toBeDefined();
    expect(quiz?.selectedOptions).toEqual([null, null, null]);
    expect(quiz?.hasAnswered).toEqual([null, null, null]);
    expect(quiz?.currentIndex).toBe(0);
  });

  it('loadQuiz loads quiz from AsyncStorage if available', async () => {
     const saved = {
      selectedOptions: [0, null, null],
      hasAnswered: [true, null, null],
      currentIndex: 1,
    };

    (AsyncStorage.getItem as any).mockResolvedValue(JSON.stringify(saved));

    await useQuizStore.getState().loadQuiz(topicId, totalQuestions);

    const quiz = useQuizStore.getState().quizzes[topicId];
    expect(quiz).toEqual(saved);
  });


  it('setSelectedOption updates selected option correctly', async () => {
    await useQuizStore.getState().loadQuiz(topicId, totalQuestions);
    useQuizStore.getState().setSelectedOption(topicId, 1, 2);

    const quiz = useQuizStore.getState().quizzes[topicId];
    expect(quiz.selectedOptions[1]).toBe(2);
    expect(AsyncStorage.setItem).toHaveBeenCalled();
  });

  it('updateAnswer marks the question as answered', async () => {
    await useQuizStore.getState().loadQuiz(topicId, totalQuestions);
    useQuizStore.getState().updateAnswer(topicId, 0, 1);

    const quiz = useQuizStore.getState().quizzes[topicId];
    expect(quiz.hasAnswered[0]).toBe(true);
    expect(AsyncStorage.setItem).toHaveBeenCalled();
  })

  it('goToNextQuestion increments currentIndex', async () => {
    await useQuizStore.getState().loadQuiz(topicId, totalQuestions);
    useQuizStore.getState().updateAnswer(topicId, 0, 1);

    const quiz = useQuizStore.getState().quizzes[topicId];
    expect(quiz.hasAnswered[0]).toBe(true);
    expect(AsyncStorage.setItem).toHaveBeenCalled();
  })

  it('resetQuiz clears progress and removes from storage', async () => {
    await useQuizStore.getState().loadQuiz(topicId, totalQuestions);
    useQuizStore.getState().setSelectedOption(topicId, 0, 1);
    useQuizStore.getState().updateAnswer(topicId, 0, 1);
    useQuizStore.getState().goToNextQuestion(topicId);

    await useQuizStore.getState().resetQuiz(topicId);
    const quiz = useQuizStore.getState().quizzes[topicId];

    expect(quiz.selectedOptions).toEqual([null, null, null]);
    expect(quiz.hasAnswered).toEqual([null, null, null]);
    expect(quiz.currentIndex).toBe(0);
    expect(AsyncStorage.removeItem).toHaveBeenCalled();
  })
});
