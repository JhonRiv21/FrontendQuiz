import { Colors } from "@/constants/Colors";
import { Pressable, Text, StyleSheet, ViewStyle, View } from "react-native";
import { useState } from 'react';

type Props = {
  label: string
  onPress: () => void
  letter?: string
  key: number
};

export default function ButtonQuestions({ label, onPress, letter, key }: Props) {
  const [isHovered, setHovered] = useState(false);
  const [isFocused, setFocused] = useState(false);

  return (
    <Pressable
      key={key}
      onHoverIn={() => setHovered(true)}
      onHoverOut={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      onPress={onPress}
      style={({ pressed }) => {
        const interactionStyle: ViewStyle = {
          backgroundColor: pressed || isHovered || isFocused
            ? '#3E3570'
            : styles.containerButton.backgroundColor,
          transform: pressed ? [{ scale: 0.98 }] : [{ scale: 1 }],
        };

        return [styles.containerButton, interactionStyle];
      }}
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
  },
  containerLetter: {
    backgroundColor: '#F5F5F5',
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 14,
    paddingRight: 14,
    borderRadius: 10,
  },
  letter: {
    color: '#362D60',
    fontFamily: 'OpenSansSemi',
  },
});
