import Button from '@/components/Button';
import { Collapsible } from '@/components/Collapsible';
import ViewTheme from "@/components/ViewTheme";
import { GlobalStyles } from '@/constants/GlobalStyles';
import Questions from '@/constants/Questions.json';
import { getFeedback } from '@/constants/Texts';
import { useQuizStore } from '@/store/useQuizStore';
import { MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useFadeInAnimation } from '@/hooks/useFadeInAnimation';
import Animated from 'react-native-reanimated';

type QuizKeys = 'html' | 'css' | 'javascript' | 'accessibility';
const VALID_THEMES = ['html', 'css', 'javascript', 'accessibility'] as const;

type StoreQuizStore = {
  currentIndex: number
  hasAnswered: boolean[]
  selectedOptions: (number | null)[]
}

export default function ResultScreen() {
  const { result } = useLocalSearchParams();
  const { quizzes, loadQuiz, resetQuiz } = useQuizStore();
  const router = useRouter();
  const fadeInStyle = useFadeInAnimation();

  const theme = typeof result === 'string' && VALID_THEMES.includes(result as QuizKeys)
  ? result as QuizKeys
  : null;

  // Data from storage
  const quiz: StoreQuizStore | null = theme ? quizzes[theme] : null;

  // Data from json questions
  const dataTheme = theme ? Questions[0].quiz[theme] : [];

  useEffect(() => {
    if (theme && !quiz) {
      loadQuiz(theme, dataTheme.length);
    };
  }, [theme, quiz, loadQuiz, dataTheme.length]);

  if (!quiz) return null;

  let correctCount: number = 0;
  let resultLines: string[] = [];

  if (quiz && theme) {
    quiz.hasAnswered.forEach((answered, index) => {
      if (!answered) return;

      const question = dataTheme[index];
      const selected = quiz.selectedOptions[index];
      const isCorrect = selected === question.correctIndex

      if (isCorrect) correctCount++;

      resultLines.push([
        `Question ${index + 1}: ${isCorrect ? 'Correct ✅' : 'Incorrect ❌'}`,
        `Q: ${question.question}`,
        `Your answer: ${question.options[selected ?? -1] ?? 'No answer'}`,
        `✔️ Correct answer: ${question.options[question.correctIndex]}`
      ].join('\n'));      
    })
  }

  const resetTheme = () => {
    if (theme) {
      resetQuiz(theme);
    }
    router.push(`/quiz/${theme}`)
  }

  return (
    <SafeAreaProvider style={GlobalStyles.screen}>
      <SafeAreaView style={styles.container} edges={['top']}>
        <ScrollView>
        <ViewTheme>
          <Animated.View style={[{ gap: 20 }, fadeInStyle]}>    
            <Text style={[{ textTransform: 'capitalize' }, GlobalStyles.subtitle]}>
              Your Frontend {theme} Quiz Results:
            </Text>
            <View style={{ gap: 20 }}>
              <Text style={GlobalStyles.textSemiLight}>Score Summary:</Text>
              <Text style={GlobalStyles.textMidSize}>
                You scored {correctCount} out of {dataTheme.length}!
              </Text>
              <View>
                <Text style={GlobalStyles.textSemiLight}>
                  {getFeedback(correctCount)}
                </Text>
              </View>
              <View style={{ paddingVertical: 16 }}>
                <Collapsible title="List of Results:">
                  {resultLines.map((line, idx) => {
                    const parts = line.split('\n').filter(Boolean);
                    const isCorrect = parts[0]?.includes('Correct');

                    return (
                      <View key={idx} style={styles.resultCard}>
                        <View style={styles.resultHeader}>
                          <MaterialIcons
                            name={isCorrect ? 'check-circle' : 'cancel'}
                            size={22}
                            color={isCorrect ? '#00E676' : '#FF5252'}
                            style={{ marginRight: 10 }}
                          />
                          <Text style={styles.resultQuestion}>{parts[0]}</Text>
                        </View>
                        <View style={styles.tipBox}>
                          {parts.slice(1).map((line, i) => (
                            <Text key={i} style={[
                              styles.tipText,
                              line.startsWith('Your answer:') && !isCorrect ? { color: '#FF5252' } : null,
                              line.startsWith('✔️ Correct answer:') ? { fontWeight: '600' } : null,
                            ]}>
                              {line}
                            </Text>
                          ))}
                        </View>
                      </View>
                    );
                  })}
                </Collapsible>
              </View>
              <View style={{ marginBlock: 10, gap: 30 }}>
                <Button label="Go to home" onPress={() => router.push("/")} />
                
                <View style={{ paddingVertical: 16 }}>
                <Collapsible title="Do you wanted reset this quiz?">
                  <View style={{ paddingTop: 25 }}>
                    {theme && (
                      <Button label="Reset this quiz" variant='danger' onPress={resetTheme} />
                    )}
                  </View>
                </Collapsible>
              </View>
                
              </View>
            </View>
          </Animated.View>
        </ViewTheme>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  separationButtons: {
    display: 'flex',
    flexDirection: 'column',
    gap: 15,
  },
  resultCard: {
    backgroundColor: '#443C6E',
    borderRadius: 10,
    padding: 14,
    marginBottom: 14,
  },
  resultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  resultQuestion: {
    fontSize: 16,
    fontWeight: '600',
    color: '#F5F5F5',
  },
  tipBox: {
    backgroundColor: '#4E447A',
    padding: 10,
    borderRadius: 6,
    marginTop: 6,
  },
  tipText: {
    color: '#F5F5F5',
    fontSize: 14,
  },
});
