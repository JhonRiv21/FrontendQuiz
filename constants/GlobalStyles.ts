import { StyleSheet } from 'react-native';
import { Colors } from './Colors'

export const GlobalStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.light.background,
    zIndex: 10,
  },
  title: {
    fontSize: 36,
    fontFamily: 'OpenSans',
    color: '#F5F5F5'
  },
  titleBold: {
    fontSize: 42,
    fontFamily: 'OpenSansBold',
    color: Colors.light.text || Colors.dark.text
  },
  text: {
    fontSize: 16,
    fontFamily: 'OpenSans',
    color: Colors.light.text || Colors.dark.text
  },
  textSemiBold: {
    fontSize: 18,
    fontFamily: 'OpenSansSemi',
    color: Colors.light.text || Colors.dark.text
  },
  textItalic: {
    fontSize: 18,
    fontFamily: 'OpenSansSemi',
    color: Colors.light.text || Colors.dark.text,
    fontStyle: 'italic',
    opacity: 0.8
  },
});