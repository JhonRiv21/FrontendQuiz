import { StyleSheet, ScrollView, Text, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import ViewTheme from "@/components/ViewTheme";
import Questions from '@/constants/Questions.json'
import { useEffect } from 'react';
import { GlobalStyles } from '@/constants/GlobalStyles';

type QuizKeys = 'html' | 'css' | 'javascript' | 'accessibility';
const VALID_THEMES = ['html', 'css', 'javascript', 'accessibility'] as const;

export default function ResultScreen() {
  const { result } = useLocalSearchParams();

  // const isValidTheme = (value: any): value is QuizKeys =>
  //   typeof value === 'string' && VALID_THEMES.includes(value as QuizKeys);

  // const dataTheme = isValidTheme(theme)
  //   ? Questions[0].quiz[theme]
  //   : [];

  

  return (
    <SafeAreaProvider style={GlobalStyles.screen}>
      <SafeAreaView style={styles.container} edges={['top']}>
        <ScrollView>
        <ViewTheme>
          <View style={{ gap: 20 }}>    
            <Text style={GlobalStyles.textMidSize}>Your Frontend {result} Quiz Results:</Text>
            <View style={{ gap: 20 }}>
              <Text style={GlobalStyles.text}>Score Summary:</Text>
              <Text style={GlobalStyles.textSemiBold}>You scored 9 out of 10!</Text>
              <View>
                <Text style={GlobalStyles.text}>Excellent! You&apos;re an accessibility hero! 💪 Your knowledge is spot-on.</Text>
              </View>
              <Text style={GlobalStyles.text}>List of Results:</Text>
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
    gap: 15
  }
});
