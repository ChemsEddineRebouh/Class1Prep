import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  StyleSheet,
} from "react-native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import _ from "lodash";
import { RootStackParamList, Question } from "../types";
import allData from "../data/questions.json";
import { saveScore, saveFailedQuestions } from "../utils/storage";
import { colors, globalStyles } from "../styles/theme";

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

    if (mode === "exam" || categoryId === "exam") {
      qList = _.shuffle(qList).slice(0, 32);
    } else {
      qList = qList.filter((q) => q.categoryId === categoryId);
      qList = _.shuffle(qList).slice(0, 10);
    }

    qList = qList.map((q) => {
      const indices = _.shuffle(_.range(q.options.length));
      return {
        ...q,
        options: indices.map((i) => q.options[i]),
        correctIndex: indices.indexOf(q.correctIndex),
      };
    });

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

    if (isCorrect) setScore((s) => s + 1);
    else setErrors((prev) => [...prev, currentQuestion]);

    const delay = mode === "exam" ? 800 : 2000;
    setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex((prev) => prev + 1);
        setSelectedOption(null);
        setIsAnswered(false);
      } else {
        finishQuiz(isCorrect ? score + 1 : score, isCorrect ? errors : [...errors, currentQuestion]);
      }
    }, delay);
  };

  const finishQuiz = async (finalScore: number, finalErrors: Question[]) => {
    await saveScore(categoryId, finalScore, questions.length);
    await saveFailedQuestions(finalErrors);
    navigation.replace("Result", { score: finalScore, total: questions.length, errors: finalErrors });
  };

  if (questions.length === 0) return <View style={globalStyles.container} />;

  const currentQ = questions[currentIndex];
  const progressPercent = ((currentIndex + 1) / questions.length) * 100;

  return (
    <View style={globalStyles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.progressBarBg}>
          <View style={[styles.progressBarFill, { width: `${progressPercent}%` }]} />
        </View>
        <View style={styles.statsRow}>
          <Text style={styles.questionCounter}>
            Question {currentIndex + 1} <Text style={styles.totalCounter}>/ {questions.length}</Text>
          </Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{mode === "exam" ? "EXAMEN" : "PRATIQUE"}</Text>
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.questionText}>{currentQ.question}</Text>

        <View style={styles.optionsList}>
          {currentQ.options.map((opt, index) => {
            const cardStyle: any = [styles.optionCard];
            const textStyle: any = [styles.optionText];
            let iconName: any = "radio-button-off";
            let iconColor = colors.textLight;

            if (isAnswered) {
              if (index === currentQ.correctIndex) {
                cardStyle.push(styles.cardCorrect);
                textStyle.push(styles.textCorrect);
                iconName = "checkmark-circle";
                iconColor = colors.success;
              } else if (index === selectedOption) {
                cardStyle.push(styles.cardWrong);
                textStyle.push(styles.textWrong);
                iconName = "close-circle";
                iconColor = colors.error;
              } else {
                cardStyle.push(styles.cardDisabled);
              }
            } else if (selectedOption === index) {
              cardStyle.push(styles.cardSelected);
              iconName = "radio-button-on";
              iconColor = colors.primary;
            }

            return (
              <TouchableOpacity
                key={index}
                style={cardStyle}
                onPress={() => handleAnswer(index)}
                disabled={isAnswered}
                activeOpacity={0.7}
              >
                <View style={styles.optionRow}>
                  <Text style={textStyle}>{opt}</Text>
                  <Ionicons name={iconName} size={24} color={iconColor} style={styles.icon} />
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {isAnswered && mode !== "exam" && currentQ.explanation && (
          <View style={styles.explanationContainer}>
            <View style={styles.explanationHeader}>
              <Ionicons name="information-circle" size={20} color={colors.infoText} />
              <Text style={styles.explanationTitle}>Explication</Text>
            </View>
            <Text style={styles.explanationText}>{currentQ.explanation}</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: colors.card,
    paddingTop: 12,
    paddingBottom: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  progressBarBg: {
    height: 4,
    backgroundColor: colors.border,
    borderRadius: 2,
    marginBottom: 12,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: colors.primary,
    borderRadius: 2,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  questionCounter: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.text,
  },
  totalCounter: {
    color: colors.textLight,
    fontWeight: "500",
    fontSize: 14,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: colors.background,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.border,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: "700",
    color: colors.textLight,
    textTransform: "uppercase",
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  questionText: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 24,
    lineHeight: 26,
  },
  optionsList: {
    gap: 12,
  },
  optionCard: {
    backgroundColor: colors.card,
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: "row",
    alignItems: "center",
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  optionText: {
    fontSize: 16,
    color: colors.text,
    flex: 1,
    marginRight: 12,
  },
  icon: {
    marginLeft: 8,
  },
  cardSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.background,
  },
  cardCorrect: {
    borderColor: colors.success,
    backgroundColor: colors.successBg,
  },
  cardWrong: {
    borderColor: colors.error,
    backgroundColor: colors.errorBg,
  },
  cardDisabled: {
    opacity: 0.6,
  },
  textCorrect: {
    color: colors.success,
    fontWeight: "600",
  },
  textWrong: {
    color: colors.error,
    fontWeight: "600",
  },
  explanationContainer: {
    marginTop: 24,
    backgroundColor: colors.infoBg,
    borderRadius: 8,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: colors.infoBorder,
  },
  explanationHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    gap: 6,
  },
  explanationTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.infoText,
    textTransform: "uppercase",
  },
  explanationText: {
    fontSize: 15,
    color: colors.text,
    lineHeight: 22,
  },
});