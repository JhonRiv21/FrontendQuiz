import { showSelectOptionAlert } from "@/constants/Alerts";
import { GlobalStyles } from "@/constants/GlobalStyles";
import { useQuizStore } from "@/store/useQuizStore";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, { FadeInRight, FadeOutLeft } from 'react-native-reanimated';
import Button from "./Button";
import ButtonQuestions from "./ButtonQuestions";
import ProgressBar from "./ProgressBar";

type Question = {
  question: string
  answers?: string[]
  options: string[]
  correctIndex?: number
};

type Props = Readonly<{
  questions: Question[]
  topicId: string
}>;

export default function Quiz ({ questions, topicId }: Props) {
  const {
    quizzes,
    loadQuiz,
    updateAnswer,
    goToNextQuestion,
    setSelectedOption,
  } = useQuizStore();

  const quiz = quizzes[topicId];
  const router = useRouter();

  useEffect(() => {
    if (questions.length > 0) {
      loadQuiz(topicId, questions.length);
    };
  }, [topicId, questions.length, loadQuiz]);

  if (!quiz) return null;

  const currentIndex = quiz.currentIndex;
  const selected = quiz.selectedOptions[currentIndex];
  const currentQuestion = questions[currentIndex];
  const answered = quiz.hasAnswered[currentIndex];

  const handleOptionSelect = (optionIndex: number) => {
    setSelectedOption(topicId, currentIndex, optionIndex);
  };

  const handleNext = () => {
    if (selected === null) {
      showSelectOptionAlert();
      return;
    };

    if (!answered) {
      updateAnswer(topicId, currentIndex, selected);
      return;
    }

    if (currentIndex < questions.length - 1) {
      goToNextQuestion(topicId);
    } else {
      router.push(`/quiz/result/${topicId}`)
    };
  }

  return (
    <Animated.View
      key={currentIndex}
      entering={FadeInRight.duration(400)}
      exiting={FadeOutLeft.duration(400)}
    >
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
              key={`${item}-${index}`}
              letter={String.fromCharCode(65 + index)} 
              label={item}
              onPress={() => handleOptionSelect(index)} 
              selected={selected === index}
              isCorrect={!answered && index === currentQuestion.correctIndex}
              isWrong={!answered && selected === index && index !== currentQuestion.correctIndex}
              disabled={!answered}
            />
          ))
        }      
      </View>
      <View style={{ marginTop: 30 }}>
        <Button label={answered ? 'Next question' : 'Submit answer'} onPress={handleNext} />
      </View>
    </Animated.View>
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
