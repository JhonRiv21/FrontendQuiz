import { QuizProgress, QuizKeys } from '@/types/quiz';
import Questions from '@/constants/Questions.json'

type StoredQuizData = {
  [key in QuizKeys]?: {
    hasAnswered: boolean[];
  };
};

export const getPercent = (quiz: QuizProgress | undefined): number | null => {
  if (!quiz || !Array.isArray(quiz.hasAnswered)) return null;

  const total = quiz.hasAnswered.length;
  if (total === 0) return null;

  const answered = quiz.hasAnswered.filter((a) => a !== null).length;

  return Math.floor((answered / total) * 100);
};


export function getGlobalPercent(quizzes: StoredQuizData): number {
  const allQuizzes = Questions[0].quiz;
  const topics: QuizKeys[] = ['html', 'css', 'javascript', 'accessibility'];

  let totalAnswered = 0;
  let totalQuestions = 0;

  for (const topic of topics) {
    const totalInTopic = allQuizzes[topic].length;
    totalQuestions += totalInTopic;

    const userProgress = quizzes[topic];
    if (userProgress?.hasAnswered) {
      totalAnswered += userProgress.hasAnswered.filter(Boolean).length;
    }
  }

  if (totalQuestions === 0) return 0;

  return Math.floor((totalAnswered / totalQuestions) * 100);
}