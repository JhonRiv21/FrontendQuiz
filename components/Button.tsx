import { Colors } from "@/constants/Colors";
import { useState } from 'react';
import { Pressable, StyleSheet, Text, ViewStyle } from "react-native";

type Props = Readonly<{
  label: string
  onPress: () => void
  variant?: 'default' | 'danger';
}>;

export default function Button({ label, onPress, variant = 'default' }: Props) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const baseColor = variant === 'danger' ? '#C92A2A' : Colors.light.purple;
  const activeColor = variant === 'danger' ? '#A51111' : '#6D36A3';

  return (
    <Pressable
      onHoverIn={() => setIsHovered(true)}
      onHoverOut={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      onPress={onPress}
      style={({ pressed }) => {
        const interactionStyle: ViewStyle = {
          backgroundColor: pressed || isHovered || isFocused
            ? activeColor
            : baseColor,
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