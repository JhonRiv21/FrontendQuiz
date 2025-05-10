import { Link, Stack } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import ViewTheme from '@/components/ViewTheme';

export default function NotFoundScreen() {
  return (
    <ViewTheme>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View style={styles.container}>
        <Text>This screen does not exist.</Text>
        <Link href="/" style={styles.link}>
          <Text>Go to home screen!</Text>
        </Link>
      </View>
    </ViewTheme>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
