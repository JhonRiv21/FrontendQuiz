import ButtonOptions from "@/components/ButtonOptions";
import ViewTheme from "@/components/ViewTheme";
import { GlobalStyles } from "@/constants/GlobalStyles";
import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const HTMLIcon = require('@/assets/images/html.svg');
const CSSIcon = require('@/assets/images/css.svg');
const JSIcon = require('@/assets/images/javascript.svg');
const ACCIcon = require('@/assets/images/accessibility.svg');

export default function HomeScreen() {
  const route = useRouter();

  return (
    <SafeAreaProvider style={GlobalStyles.screen}>
      <SafeAreaView style={styles.container} edges={['top']}>
        <ScrollView>
        <ViewTheme>
          <Text style={GlobalStyles.title}>Welcome to the</Text>
          <Text style={GlobalStyles.titleBold}>Frontend Quiz!</Text>
          <Text style={[{ paddingTop: 10, paddingBottom: 50 }, GlobalStyles.textItalic]}>Pick a subject to get started</Text>
          <View style={styles.containerButtons}>
            <ButtonOptions onPress={() => route.push('/quiz/html')} image={HTMLIcon} label="HTML" />
            <ButtonOptions onPress={() => route.push('/quiz/css')} image={CSSIcon} label="CSS" />
            <ButtonOptions onPress={() => route.push('/quiz/javascript')} image={JSIcon} label="Javascript" />
            <ButtonOptions onPress={() => route.push('/quiz/accessibility')} image={ACCIcon} label="Accessibility" />
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
  containerButtons: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20
  },
});
