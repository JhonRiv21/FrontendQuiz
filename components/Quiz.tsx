import { GlobalStyles } from "@/constants/GlobalStyles";
import { View, Text, StyleSheet } from "react-native";
import Button from "./Button";
import ProgressBar from "./ProgressBar";
import { useState, useEffect } from "react";
import ButtonQuestions from "./ButtonQuestions";

type Question = {
  question: string
  answers: string[]
  options: string[]
};

type Props = {
  questions: Question[]
};

export default function Quiz ({ questions }: Props) {
  const [ currentIndex, setCurrentIndex ]  = useState(1);
  const currentQuestion = questions[currentIndex];

  const lastIndex = currentIndex === questions.length - 1;

  const nextStep = () => {
    if (!lastIndex) setCurrentIndex((prev) => prev++);
  }

  useEffect(() => {
    console.log(currentQuestion.options)
  })

  return (
    <>
      <Text style={[{ paddingBottom: 15 }, GlobalStyles.textItalic]}>
        Question {currentIndex} of {questions.length}
      </Text>
      <Text style={GlobalStyles.textSemiBold}>
        {currentQuestion.question}
      </Text>
      <View style={{ paddingTop: 30, paddingBottom: 30 }}>
        <ProgressBar percent={Number(currentIndex * 10)} />
      </View>
      <View style={styles.separationButtons}>
        {
          currentQuestion.options.map((item, index) => (
            <ButtonQuestions
              key={index}
              letter={String.fromCharCode(65 + index)} 
              label={item} 
              onPress={() => alert('aaa')} 
            />
          ))
        }      
      </View>
      <View style={{ marginTop: 30 }}>
        <Button label='Submit answer' onPress={nextStep} />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  separationButtons: {
    display: 'flex',
    flexDirection: 'column',
    gap: 15
  }
});
