import { GlobalStyles } from "@/constants/GlobalStyles";
import { View, StyleSheet } from "react-native";

type Props = React.PropsWithChildren<object>

export default function ViewTheme({ children }: Props) {
  return (
    <View style={[GlobalStyles.screen]}>
      <View style={styles.box1}></View>
      <View style={styles.box2}></View>
      <View style={styles.paddings}>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  box1: {
    borderWidth: 45,
    borderColor: '#00000',
    opacity: 0.15,
    borderRadius: '100%',
    padding: 100,
    position: 'absolute',
    zIndex: 0,
    top: -80,
    left: -100
  },
  box2: {
    borderWidth: 45,
    borderColor: '#00000',
    opacity: 0.15,
    borderRadius: '100%',
    padding: 100,
    position: 'absolute',
    zIndex: 0,
    top: 230,
    right: -150
  },
  paddings: {
    paddingTop: 40,
    paddingLeft: 16,
    paddingRight: 16,
  }
});
