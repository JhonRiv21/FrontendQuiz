import { Colors } from "@/constants/Colors";
import { Pressable, Text, StyleSheet, ViewStyle } from "react-native";
import { useState } from 'react';

type Props = {
  label: string
  onPress: () => void
};

export default function Button({ label, onPress }: Props) {
  const [isHovered, setHovered] = useState(false);
  const [isFocused, setFocused] = useState(false);

  return (
    <Pressable
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
      <Text style={styles.text}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  containerButton: {
    width: '100%',
    padding: 16,
    backgroundColor: Colors.light.purple,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 15,
    transitionDuration: '200ms',
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'OpenSansSemi',
    color: '#fff',
  },
});