import { StyleSheet, ScrollView, Text, View, useColorScheme} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import ViewTheme from "@/components/ViewTheme";
import Questions from '@/constants/Questions.json'
import { useEffect, useState } from 'react';
import { GlobalStyles } from '@/constants/GlobalStyles';
import { Collapsible } from '@/components/Collapsible';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';
import { getFeedback } from '@/constants/Texts';

type QuizKeys = 'html' | 'css' | 'javascript' | 'accessibility';
const VALID_THEMES = ['html', 'css', 'javascript', 'accessibility'] as const;

type StoreQuizStore = {
  currentIndex: number
  hasAnswered: boolean[]
  selectedOptions: (number | null)[]
}

export default function ResultScreen() {
  const { result } = useLocalSearchParams();
  const getStorageKey = (topicId: string) =>  `quiz-progress-${topicId}`;
  const [storageData, setStorageData] = useState<StoreQuizStore | null>(null);

  // Data from storage
  const theme = typeof result === 'string' && VALID_THEMES.includes(result as QuizKeys)
  ? result as QuizKeys
  : null;
  
  // Data from json questions
  const dataTheme = theme ? Questions[0].quiz[theme] : [];

  let correctCount: number = 0;
  let resultLines: string[] = [];

  if (storageData && theme) {
    storageData.hasAnswered.forEach((answered, index) => {
      if (!answered) return;

      const question = dataTheme[index];
      const selected = storageData.selectedOptions[index];
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

  useEffect(() => {
    const loadDataFromStorage = async () => {
      const key = getStorageKey(`${result}`);
      try {
        const stored = await AsyncStorage.getItem(key);
        if (stored) {
          const parsed = JSON.parse(stored);
          setStorageData(parsed);
          return;
        };
      } catch (e) {
        console.error(e);
      };
    }
    loadDataFromStorage();
  }, [result]);

  return (
    <SafeAreaProvider style={GlobalStyles.screen}>
      <SafeAreaView style={styles.container} edges={['top']}>
        <ScrollView>
        <ViewTheme>
          <View style={{ gap: 20 }}>    
            <Text style={[{ textTransform: 'capitalize' }, GlobalStyles.subtitle]}>
              Your Frontend {theme} Quiz Results:
            </Text>
            <View style={{ gap: 20 }}>
              <Text style={GlobalStyles.textSemiLight}>Score Summary:</Text>
              <Text style={GlobalStyles.textMidSize}>
                You scored {correctCount} out of {storageData?.hasAnswered.length}!
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
            </View>
          </View>
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
