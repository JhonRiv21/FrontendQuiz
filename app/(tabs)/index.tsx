import ButtonOptions from "@/components/ButtonOptions";
import { GlobalStyles } from "@/constants/GlobalStyles";
import { View, Text, StyleSheet } from "react-native";

const HTMLIcon = require('@/assets/images/html.svg');
const CSSIcon = require('@/assets/images/css.svg');
const JSIcon = require('@/assets/images/javascript.svg');
const ACCIcon = require('@/assets/images/accessibility.svg');

export default function HomeScreen() {
  return (
    <>
      <View style={GlobalStyles.screen}>
        <Text style={GlobalStyles.title}>Welcome to the</Text>
        <Text style={GlobalStyles.titleBold}>Frontend Quiz!</Text>
        <Text style={[{ paddingTop: 10, paddingBottom: 50 }, GlobalStyles.textItalic]}>Pick a subject to get started</Text>
        <View style={styles.containerButtons}>
          <ButtonOptions onPress={() => window.location.href = '/quiz/html'} image={HTMLIcon} label="HTML" />
          <ButtonOptions onPress={() => window.location.href = '/quiz/css'} image={CSSIcon} label="CSS" />
          <ButtonOptions onPress={() => window.location.href = '/quiz/javascript'} image={JSIcon} label="Javascript" />
          <ButtonOptions onPress={() => window.location.href = '/quiz/accessibility'} image={ACCIcon} label="Accessibility" />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  containerButtons: {
    display: 'flex',
    flexDirection: 'column',
    gap: 15
  },
});
