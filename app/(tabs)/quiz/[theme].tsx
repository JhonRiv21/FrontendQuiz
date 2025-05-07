import { StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { GlobalStyles } from '@/constants/GlobalStyles';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import ViewTheme from "@/components/ViewTheme";
import Questions from '@/constants/Questions.json'
import { useEffect } from 'react';
import Quiz from '@/components/Quiz';

type QuizKeys = 'html' | 'css' | 'javascript' | 'accessibility';
const VALID_THEMES = ['html', 'css', 'javascript', 'accessibility'] as const;

export default function ThemeScreen() {
  const { theme } = useLocalSearchParams();

  const isValidTheme = (value: any): value is QuizKeys =>
    typeof value === 'string' && VALID_THEMES.includes(value as QuizKeys);

  const dataTheme = isValidTheme(theme)
    ? Questions[0].quiz[theme]
    : [];

  useEffect(() => {
    console.log(dataTheme);
  });

  return (
    <SafeAreaProvider style={GlobalStyles.screen}>
      <SafeAreaView style={styles.container} edges={['top']}>
        <ScrollView>
        <ViewTheme>
          <Quiz questions={dataTheme} topicId={theme as string} />
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
    gap: 15
  }
});
