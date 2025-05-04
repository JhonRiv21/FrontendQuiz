import { View, StyleSheet } from "react-native";

type Props = {
  percent: number  
}

export default function ProgressBar ({ percent }: Props) {
  return (
    <View style={styles.progressBar}>
      <View style={[styles.progressFill, { width: `${percent}%`}]}></View>
    </View>
  )
}

const styles = StyleSheet.create({
  progressBar: {
    padding: 3.5,
    width: '100%',
    backgroundColor: '#4F418B',
    borderRadius: 30
  },
  progressFill: {
    padding: 4,
    backgroundColor: '#974ACA',
    borderRadius: 30
  }
})