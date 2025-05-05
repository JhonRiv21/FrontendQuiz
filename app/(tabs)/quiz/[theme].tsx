import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { GlobalStyles } from '@/constants/GlobalStyles';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import ViewTheme from "@/components/ViewTheme";
import ProgressBar from '@/components/ProgressBar';
import Questions from '@/constants/Questions.json'
import { useEffect } from 'react';
import Button from '@/components/Button';

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
          <Text style={[{ paddingBottom: 15 }, GlobalStyles.textItalic]}>
            Question 6 of 10
          </Text>
          <Text style={GlobalStyles.textSemiBold}>
            Wich of these color contrast ratios defines the minimun WCAG 2.1 Level AA requirement for normal text?
          </Text>
          <View style={{ paddingTop: 30, paddingBottom: 30 }}>
            <ProgressBar percent={50} />
          </View>

          <Text style={GlobalStyles.title}>Details of user {theme}</Text>
          <View style={{ marginTop: 40 }}>
            <Button label='Submit answer' onPress={() => alert('aaaa')} />
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
});
