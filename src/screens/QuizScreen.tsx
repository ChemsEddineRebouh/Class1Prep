import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import _ from "lodash";
import { RootStackParamList, Question } from "../types";
import allData from "../data/questions.json";
import { saveScore, saveFailedQuestions } from "../utils/storage";

type QuizScreenRouteProp = RouteProp<RootStackParamList, "Quiz">;
type QuizNavProp = NativeStackNavigationProp<RootStackParamList, "Quiz">;

export default function QuizScreen() {
  const navigation = useNavigation<QuizNavProp>();
  const route = useRoute<QuizScreenRouteProp>();
  const { categoryId, mode } = route.params;

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [errors, setErrors] = useState<Question[]>([]);

  useEffect(() => {
    let qList = allData.questions as Question[];

    if (categoryId !== "exam") {
      qList = qList.filter((q) => q.categoryId === categoryId);
    }

    if (mode === "exam" || categoryId === "exam") {
      qList = _.shuffle(qList).slice(0, 32);
    }

    if (qList.length === 0) {
      Alert.alert("Erreur", "Aucune question trouvée pour cette catégorie.");
      navigation.goBack();
      return;
    }

    setQuestions(qList);
  }, [categoryId, mode]);

  const handleAnswer = (index: number) => {
    if (isAnswered) return;

    setSelectedOption(index);
    setIsAnswered(true);

    const currentQuestion = questions[currentIndex];
    const isCorrect = index === currentQuestion.correctIndex;

    if (isCorrect) {
      setScore((s) => s + 1);
    } else {
      setErrors((prev) => [...prev, currentQuestion]);
    }

    const delay = mode === "exam" ? 500 : 1500;

    setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex((prev) => prev + 1);
        setSelectedOption(null);
        setIsAnswered(false);
      } else {
        finishQuiz(
          isCorrect ? score + 1 : score,
          isCorrect ? errors : [...errors, currentQuestion],
        );
      }
    }, delay);
  };

  const finishQuiz = async (finalScore: number, finalErrors: Question[]) => {
    await saveScore(categoryId, finalScore, questions.length);
    await saveFailedQuestions(finalErrors);

    navigation.replace("Result", {
      score: finalScore,
      total: questions.length,
      errors: finalErrors,
    });
  };

  if (questions.length === 0) return <View style={styles.container} />;

  const currentQ = questions[currentIndex];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.progress}>
          Question {currentIndex + 1} / {questions.length}
        </Text>
        <Text style={styles.mode}>
          {mode === "exam" ? "EXAMEN" : "PRATIQUE"}
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.questionText}>{currentQ.question}</Text>

        {currentQ.options.map((opt, index) => {
          let bgColor = "white";
          let textColor = "#2D3748";

          if (isAnswered) {
            if (index === currentQ.correctIndex) {
              bgColor = "#C6F6D5";
              textColor = "#22543D";
            } else if (index === selectedOption) {
              bgColor = "#FED7D7";
              textColor = "#822727";
            }
          }

          return (
            <TouchableOpacity
              key={index}
              style={[styles.option, { backgroundColor: bgColor }]}
              onPress={() => handleAnswer(index)}
              disabled={isAnswered}
            >
              <Text style={[styles.optionText, { color: textColor }]}>
                {opt}
              </Text>
            </TouchableOpacity>
          );
        })}

        {isAnswered && mode !== "exam" && currentQ.explanation && (
          <View style={styles.explanationBox}>
            <Text style={styles.explanationTitle}>Explication :</Text>
            <Text style={styles.explanationText}>{currentQ.explanation}</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F7FA" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    paddingTop: 10,
  },
  progress: { fontSize: 16, fontWeight: "bold", color: "#718096" },
  mode: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#3182CE",
    textTransform: "uppercase",
  },
  scroll: { padding: 20 },
  questionText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2D3748",
    marginBottom: 30,
  },
  option: {
    padding: 20,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    backgroundColor: "white",
  },
  optionText: { fontSize: 18 },
  explanationBox: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#EBF8FF",
    borderRadius: 8,
  },
  explanationTitle: { fontWeight: "bold", color: "#2C5282", marginBottom: 5 },
  explanationText: { color: "#2A4365" },
});
