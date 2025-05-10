import ViewTheme from '@/components/ViewTheme';
import { GlobalStyles } from '@/constants/GlobalStyles';
import { ScrollView, StyleSheet, Text } from "react-native";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Animated from 'react-native-reanimated';
import { useFadeInAnimation } from '@/hooks/useFadeInAnimation';

export default function AboutScreen() {
  const fadeInStyle = useFadeInAnimation();

  return (
    <SafeAreaProvider style={GlobalStyles.screen}>
      <SafeAreaView style={styles.container} edges={['top']}>
        <ScrollView>
          <ViewTheme>
            <Animated.View style={[fadeInStyle, { gap: 20 }]}>
              <Text style={[GlobalStyles.title, { fontSize: 28 }]}>About the Project</Text>

              <Text style={GlobalStyles.text}>
                This project is a cross-platform quiz application developed using React Native and Expo. It is designed to help users test their knowledge on various topics in a clean, mobile-first interface.
              </Text>

              <Text style={[GlobalStyles.textSemiBold, { marginTop: 10 }]}>
                Jhon Rivero
              </Text>
              <Text style={GlobalStyles.text}>
                I’m a frontend developer focused on performance, clean architecture and user experience. I designed and implemented the entire app using a component-based approach and centralized state management with Zustand.
              </Text>

              <Text style={[GlobalStyles.textSemiBold, { marginTop: 10 }]}>
                Technologies
              </Text>
              <Text style={GlobalStyles.text}>
                • React Native + Expo{'\n'}
                • TypeScript{'\n'}
                • Zustand for state management{'\n'}
                • AsyncStorage for persistence
              </Text>

              <Text style={[GlobalStyles.textSemiBold, { marginTop: 10 }]}>
                Scalability
              </Text>
              <Text style={GlobalStyles.text}>
                The app is architected for scalability. The quiz system supports any number of questions dynamically, without hardcoded limits or UI assumptions. The state and UI react fluidly to the quiz structure, making it suitable for future expansion, including new topics, difficulty levels or user-generated content.
              </Text>

              <Text style={[GlobalStyles.textSemiBold, { marginTop: 10 }]}>
                Goals
              </Text>
              <Text style={GlobalStyles.text}>
                The main objective is to provide a smooth quiz experience with real-time feedback, consistent navigation, and persistent progress. It reflects my principles as a frontend developer: clarity, responsiveness, and long-term maintainability.
              </Text>

              <Text style={[GlobalStyles.textItalic, { marginTop: 30, marginBottom: 20 }]}>
                Designed and developed with care.
              </Text>
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
