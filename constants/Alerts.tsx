import { Alert, Platform } from "react-native";

export const showSelectOptionAlert = () => {
  const message = 'Please select an option before continuing';
  
  if (Platform.OS === 'web') {
    alert(message);
  } else {
    Alert.alert('Selection Required', message, [
      { text: 'OK' },
    ]);
  }
};