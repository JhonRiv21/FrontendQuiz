import { useState } from 'react';
import { Pressable, StyleSheet, Text, View, ViewStyle } from "react-native";

type Props = {
  label: string
  onPress: () => void
  letter?: string
  selected?: boolean
  isCorrect?: boolean
  isWrong?: boolean
  disabled: boolean
};

export default function ButtonQuestions({ label, onPress, letter, selected, isCorrect, isWrong, disabled }: Props) {
  const [isHovered, setHovered] = useState(false);
  const [isFocused, setFocused] = useState(false);

  const getButtonStyle = (pressed: boolean): ViewStyle[] => {
    let backgroundColor = '#4F418B';
    let borderColor = 'transparent';

    if (isCorrect) {
      backgroundColor = '#2E7D32';
      borderColor = '#A5D6A7';
    } else if (isWrong) {
      backgroundColor = '#C62828';
      borderColor = '#EF9A9A';
    } else if (selected) {
      backgroundColor = '#574ACA';
      borderColor = '#D1C4FF';
    } else if (pressed || isHovered || isFocused) {
      backgroundColor = '#3E3570';
    }

    return [
      styles.containerButton,
      {
        backgroundColor,
        transform: pressed ? [{ scale: 0.98 }] : [{ scale: 1 }],
        borderWidth: (selected || isCorrect || isWrong) ? 2 : 0,
        borderColor,
      },
    ];
  };

  return (
    <Pressable
      disabled={disabled}
      onHoverIn={() => setHovered(true)}
      onHoverOut={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      onPress={onPress}
      style={({ pressed }) => getButtonStyle(pressed)}
    >
      <View style={styles.containerLetter}>
        <Text style={styles.letter}>{letter}</Text>
      </View>
      <Text style={styles.text}>{label}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  containerButton: {
    width: '100%',
    padding: 12,
    backgroundColor: '#4F418B',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    transitionDuration: '200ms',
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'OpenSansSemi',
    color: '#fff',
    maxWidth: '85%'
  },
  containerLetter: {
    backgroundColor: '#F5F5F5',
    paddingBlock: 8,
    paddingInline: 14,
    borderRadius: 10,
  },
  letter: {
    color: '#362D60',
    fontFamily: 'OpenSansSemi',
  },
});
