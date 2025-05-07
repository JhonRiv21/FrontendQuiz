import { GlobalStyles } from "@/constants/GlobalStyles";
import { View, Text, StyleSheet } from "react-native";
import Button from "./Button";
import ProgressBar from "./ProgressBar";
import { useEffect, useState } from "react";
import ButtonQuestions from "./ButtonQuestions";
import { showSelectOptionAlert } from "@/constants/Alerts";

type Question = {
  question: string
  answers?: string[]
  options: string[]
};

type Props = {
  questions: Question[]
  topicId: string
};

export default function Quiz ({ questions, topicId }: Props) {
  const [questionIndexes, setQuestionIndexes] = useState<{ [topicId: string]: number }>({});
  const [selectedOptions, setSelectedOptions] = useState<{ [topicId: string]: (number | null)[] }>({});

  useEffect(() => {
    setQuestionIndexes((prev) => {
      if (prev[topicId] !== undefined) return prev;
      return { ...prev, [topicId]: 0 };
    });

    setSelectedOptions((prev) => {
      if (prev[topicId] !== undefined) return prev;
      return {
        ...prev,
        [topicId]: Array(questions.length).fill(null),
      };
    });
  }, [topicId, questions.length]);

  const currentIndex = questionIndexes[topicId] ?? 0;
  const selections = selectedOptions[topicId] ?? [];
  const selected = selections[currentIndex];
  const currentQuestion = questions[currentIndex];
  
  const handleOptionSelect = (optionIndex: number) => {
    const updatedSelections = [...selections];
    updatedSelections[currentIndex] = optionIndex;
    
    setSelectedOptions(prev => ({
      ...prev,
      [topicId]: updatedSelections,
    }));
  };

  const handleNext = () => {
    if (selected === null) {
      showSelectOptionAlert()
      return;
    } 

    if (currentIndex < questions.length - 1) {
      setQuestionIndexes(prev => ({
        ...prev,
        [topicId]: currentIndex + 1,
      }));
    }
  }

  return (
    <>
      <Text style={[{ paddingBottom: 15 }, GlobalStyles.textItalic]}>
        Question {currentIndex + 1} of {questions.length}
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
              onPress={() => handleOptionSelect(index)} 
              selected={selected === index}
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
