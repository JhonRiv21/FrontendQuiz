import ButtonOptions from "@/components/ButtonOptions";
import ProgressBar from "@/components/ProgressBar";
import ViewTheme from "@/components/ViewTheme";
import { GlobalStyles } from "@/constants/GlobalStyles";
import { useFadeInAnimation } from "@/hooks/useFadeInAnimation";
import { useQuizStore } from "@/store/useQuizStore";
import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Animated from "react-native-reanimated";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const HTMLIcon = require('@/assets/images/html.svg');
const CSSIcon = require('@/assets/images/css.svg');
const JSIcon = require('@/assets/images/javascript.svg');
const ACCIcon = require('@/assets/images/accessibility.svg');

export default function HomeScreen() {
  const route = useRouter();
  const { quizzes } = useQuizStore();
  const fadeInStyle = useFadeInAnimation();

  const getPercent = (topic: string) => {
    const quiz = quizzes[topic];
    if (!quiz || !Array.isArray(quiz.hasAnswered)) return null;

    const total = quiz.hasAnswered.length;
    const current = quiz.currentIndex ?? 0;

    if (total === 0) return null;

    const isComplete = quiz.hasAnswered.every(Boolean);
    const percent = isComplete
      ? 100
      : Math.floor((current / total) * 100);

    return percent > 0 ? percent : null;
  };

  const getGlobalPercent = () => {
    const topics = Object.values(quizzes);

    if (topics.length === 0) return 0;

    let totalAnswered = 0;
    let totalQuestions = 0;

    for (const quiz of topics) {
      if (!quiz || !Array.isArray(quiz.hasAnswered)) continue;

      totalAnswered += quiz.hasAnswered.filter(Boolean).length;
      totalQuestions += quiz.hasAnswered.length;
    }

    if (totalQuestions === 0) return 0;
    return Math.floor((totalAnswered / totalQuestions) * 100);
  };

  const redirect = (topic: string) => {
    const quiz = quizzes[topic];
    const isCompleted = quiz?.hasAnswered?.length > 0 && quiz.hasAnswered.every(Boolean);

    if (isCompleted) {
      route.push(`/quiz/result/${topic}`)
    } else {
      route.push(`/quiz/${topic}`)
    }
  }

  return (
    <SafeAreaProvider style={GlobalStyles.screen}>
      <SafeAreaView style={styles.container} edges={['top']}>
        <ScrollView>
        <ViewTheme>
          <Animated.View style={fadeInStyle}>
            <Text style={GlobalStyles.title}>Welcome to the</Text>
            <Text style={GlobalStyles.titleBold}>Frontend Quiz!</Text>
            <Text style={[{ paddingTop: 10, paddingBottom: 20 }, GlobalStyles.textItalic]}>Pick a subject to get started</Text>
            <ProgressBar percent={getGlobalPercent()} />
            <View style={[{ paddingTop: 20 }, styles.containerButtons]}>
              <ButtonOptions 
                percent={getPercent('html')}
                onPress={() => redirect('html')}
                image={HTMLIcon} label="HTML" 
              />
              <ButtonOptions 
                percent={getPercent('css')}
                onPress={() => redirect('css')}
                image={CSSIcon} label="CSS" 
              />
              <ButtonOptions 
                percent={getPercent('javascript')}
                onPress={() => redirect('javascript')}
                image={JSIcon} label="Javascript" 
              />
              <ButtonOptions 
                percent={getPercent('accessibility')}
                onPress={() => redirect('accessibility')}
                image={ACCIcon} label="Accessibility" 
              />
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
  containerButtons: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20
  },
});
