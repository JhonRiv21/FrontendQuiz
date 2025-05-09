import { GlobalStyles } from "@/constants/GlobalStyles";
import { View, Text, StyleSheet } from "react-native";
import Button from "./Button";
import ProgressBar from "./ProgressBar";
import { useEffect, useState } from "react";
import ButtonQuestions from "./ButtonQuestions";
import { showSelectOptionAlert } from "@/constants/Alerts";
import AsyncStorage from '@react-native-async-storage/async-storage';

type Question = {
  question: string
  answers?: string[]
  options: string[]
  correctIndex?: number
};

type Props = {
  questions: Question[]
  topicId: string
};

export default function Quiz ({ questions, topicId }: Props) {
  const [questionIndexes, setQuestionIndexes] = useState<{ [topicId: string]: number }>({});
  const [selectedOptions, setSelectedOptions] = useState<{ [topicId: string]: (number | null)[] }>({});
  const [hasAnswered, setHasAnswered] = useState<{ [topicId: string]: boolean[] }>({});
  const getStorageKey = (topicId: string) =>  `quiz-progress-${topicId}`

  const currentIndex = questionIndexes[topicId] ?? 0;
  const selections = selectedOptions[topicId] ?? [];
  const selected = selections[currentIndex];
  const currentQuestion = questions[currentIndex];
  const answered = hasAnswered[topicId]?.[currentIndex] ?? false;

  useEffect(() => {
    const loadOrInitialize = async () => {
      const key = getStorageKey(topicId);
      try {
        const stored = await AsyncStorage.getItem(key);
        if (stored) {
          const parsed = JSON.parse(stored);
          setSelectedOptions(prev => ({ ...prev, [topicId]: parsed.selectedOptions }));
          setHasAnswered(prev => ({ ...prev, [topicId]: parsed.hasAnswered }));
          setQuestionIndexes(prev => ({ ...prev, [topicId]: parsed.currentIndex }));
          return;
        }
  
        setQuestionIndexes(prev => ({ ...prev, [topicId]: 0 }));
        setSelectedOptions(prev => ({
          ...prev,
          [topicId]: Array(questions.length).fill(null),
        }));
        setHasAnswered(prev => ({
          ...prev,
          [topicId]: Array(questions.length).fill(false),
        }));
      } catch (e) {
        console.error("Error loading quiz progress:", e);
      }
    };
  
    loadOrInitialize();
  }, [topicId, questions.length]);

  useEffect(() => {
    const saveProgress = async () => {
      if (
        selectedOptions[topicId] === undefined ||
        hasAnswered[topicId] === undefined ||
        questionIndexes[topicId] === undefined
      ) return;
  
      const key = getStorageKey(topicId);
      const data = {
        selectedOptions: selectedOptions[topicId],
        hasAnswered: hasAnswered[topicId],
        currentIndex: questionIndexes[topicId],
      };
  
      try {
        await AsyncStorage.setItem(key, JSON.stringify(data));
      } catch (e) {
        console.error("Error saving quiz progress:", e);
      }
    };
  
    saveProgress();
  }, [selectedOptions, hasAnswered, questionIndexes, topicId]);  
  
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
      showSelectOptionAlert();
      return;
    };

    if (!answered) {
      const updated = [...(hasAnswered[topicId] ?? [])];
      updated[currentIndex] = true;
    
      setHasAnswered(prev => ({
        ...prev,
        [topicId]: updated,
      }));
      return;
    }

    if (currentIndex < questions.length - 1) {
      setQuestionIndexes(prev => ({
        ...prev,
        [topicId]: currentIndex + 1,
      }));
    };
  }

  return (
    <>
      <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
        <Text style={[{ paddingBottom: 15 }, GlobalStyles.textItalic]}>
          Question {currentIndex + 1} of {questions.length}
        </Text>
        <Text style={[{ textTransform: 'uppercase', gap: 10 }, GlobalStyles.textItalic]}>{topicId}</Text>
      </View>
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
              isCorrect={answered && index === currentQuestion.correctIndex}
              isWrong={answered && selected === index && index !== currentQuestion.correctIndex}
            />
          ))
        }      
      </View>
      <View style={{ marginTop: 30 }}>
        <Button label={answered ? 'Next question' : 'Submit answer'} onPress={handleNext} />
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
