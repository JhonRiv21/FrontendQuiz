import { useIsFocused } from '@react-navigation/native';
import { useEffect } from 'react';
import { Easing, useAnimatedStyle, useSharedValue, withDelay, withTiming } from 'react-native-reanimated';

export function useFadeInAnimation(delay = 200, duration = 400, offsetY = 20) {
  const isFocused = useIsFocused();
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(offsetY);

  useEffect(() => {
    if (isFocused) {
      opacity.value = 0;
      translateY.value = offsetY;
      opacity.value = withDelay(delay, withTiming(1, { duration }));
      translateY.value = withDelay(delay, withTiming(0, { duration, easing: Easing.out(Easing.exp) }));
    }
  }, [delay, duration, isFocused, offsetY, opacity, translateY]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  return animatedStyle;
}
