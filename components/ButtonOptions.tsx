import { Image, type ImageSource } from 'expo-image';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, ViewStyle } from "react-native";

type Props = {
  label: string
  image: ImageSource
  onPress: () => void
};

export default function ButtonOptions({ label, image, onPress }: Props) {
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
      <Image source={image} style={styles.imageStyles} />
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
  imageStyles: {
    width: 40,
    height: 40,
  },
});
