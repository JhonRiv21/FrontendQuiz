import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { GlobalStyles } from '@/constants/GlobalStyles';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

export default function ThemeScreen() {
  const { theme } = useLocalSearchParams();

  return (
    <SafeAreaProvider style={GlobalStyles.screen}>
      <SafeAreaView style={styles.container} edges={['top']}>
        <ScrollView>
        <View>
          <Text style={GlobalStyles.title}>Details of user {theme}</Text>
        </View>
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
