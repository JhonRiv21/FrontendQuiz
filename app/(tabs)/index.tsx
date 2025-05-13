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
import { getPercent, getGlobalPercent } from "@/utils/percentages";

const HTMLIcon = require('@/assets/images/html.svg');
const CSSIcon = require('@/assets/images/css.svg');
const JSIcon = require('@/assets/images/javascript.svg');
const ACCIcon = require('@/assets/images/accessibility.svg');

export default function HomeScreen() {
  const route = useRouter();
  const { quizzes } = useQuizStore();
  const fadeInStyle = useFadeInAnimation();

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
            <ProgressBar percent={getGlobalPercent(quizzes)} />
            <View style={[{ paddingTop: 20 }, styles.containerButtons]}>
              <ButtonOptions 
                percent={getPercent(quizzes['html'])}
                onPress={() => redirect('html')}
                image={HTMLIcon} label="HTML" 
              />
              <ButtonOptions 
                percent={getPercent(quizzes['css'])}
                onPress={() => redirect('css')}
                image={CSSIcon} label="CSS" 
              />
              <ButtonOptions 
                percent={getPercent(quizzes['javascript'])}
                onPress={() => redirect('javascript')}
                image={JSIcon} label="Javascript" 
              />
              <ButtonOptions 
                percent={getPercent(quizzes['accessibility'])}
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
