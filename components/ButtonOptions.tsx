import { Image, type ImageSource } from 'expo-image';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View, ViewStyle } from "react-native";

type Props = Readonly<{
  label: string
  image: ImageSource
  onPress: () => void
  percent?: number | null
}>;

export default function ButtonOptions({ label, image, onPress, percent }: Props) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

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
            ? '#3E3570'
            : styles.containerButton.backgroundColor,
          transform: pressed ? [{ scale: 0.98 }] : [{ scale: 1 }],
        };

        return [styles.containerButton, interactionStyle];
      }}
    >
      <Image source={image} style={styles.imageStyles} />
      <View style={styles.labelContainer}>
        <Text style={styles.text}>{label}</Text>
        {percent && (
          <Text style={styles.text}>{percent}%</Text>

        )}
      </View>
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
  labelContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
