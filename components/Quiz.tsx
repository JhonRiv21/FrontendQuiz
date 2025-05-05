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
  const [ currentQuestionIndex, setCurrentQuestionIndex ] = useState<number>(0);
  const [ selectedOptions, setSelectedOptions ] = useState<(number | null)[]>(
    Array(questions.length).fill(null)
  );

  const currentQuestion = questions[currentQuestionIndex];
  const selected = selectedOptions[currentQuestionIndex]
  
  const handleOptionSelect = (optionIndex: number) => {
    const updatedSelections = [...selectedOptions];
    updatedSelections[currentQuestionIndex] = optionIndex;
    setSelectedOptions(updatedSelections);
  };

  const handleNext = () => {
    if (selected === null) {
      alert('You must select an option');
      return;
    } 
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  }

  return (
    <>
      <Text style={[{ paddingBottom: 15 }, GlobalStyles.textItalic]}>
        Question {currentQuestionIndex + 1} of {questions.length}
      </Text>
      <Text style={GlobalStyles.textSemiBold}>
        {currentQuestion.question}
      </Text>
      <View style={{ paddingTop: 30, paddingBottom: 30 }}>
        <ProgressBar percent={Number(currentQuestionIndex * 10)} />
      </View>
      <View style={styles.separationButtons}>
        {
          currentQuestion.options.map((item, index) => (
            <ButtonQuestions
              key={index}
              letter={String.fromCharCode(65 + index)} 
              label={item}
              onPress={() => { handleOptionSelect(index); console.log(index)}} 
            />
          ))
        }      
      </View>
      <View style={{ marginTop: 30 }}>
        <Button label='Submit answer' onPress={handleNext} />
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
