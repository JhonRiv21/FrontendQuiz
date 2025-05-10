import Quiz from '@/components/Quiz';
import ViewTheme from "@/components/ViewTheme";
import { GlobalStyles } from '@/constants/GlobalStyles';
import Questions from '@/constants/Questions.json';
import { useLocalSearchParams } from 'expo-router';
import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useFadeInAnimation } from '@/hooks/useFadeInAnimation';
import Animated from 'react-native-reanimated';

type QuizKeys = 'html' | 'css' | 'javascript' | 'accessibility';
const VALID_THEMES = ['html', 'css', 'javascript', 'accessibility'] as const;

export default function ThemeScreen() {
  const { theme } = useLocalSearchParams();
  const fadeInStyle = useFadeInAnimation();

  const isValidTheme = (value: any): value is QuizKeys =>
    typeof value === 'string' && VALID_THEMES.includes(value as QuizKeys);

  const dataTheme = isValidTheme(theme)
    ? Questions[0].quiz[theme]
    : [];

  return (
    <SafeAreaProvider style={GlobalStyles.screen}>
      <SafeAreaView style={styles.container} edges={['top']}>
        <ScrollView>
        <ViewTheme>
          <Animated.View style={fadeInStyle}>
            <Quiz questions={dataTheme} topicId={theme as string} />
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
    gap: 15
  }
});
