import React, { useCallback, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { RootStackParamList, QuizCategory } from "../types";
import data from "../data/questions.json";
import { getScores, ScoreData } from "../utils/storage";
import { colors, globalStyles } from "../styles/theme";

type TopicNavProp = NativeStackNavigationProp<RootStackParamList, "TopicSelection">;

export default function TopicSelectionScreen() {
  const navigation = useNavigation<TopicNavProp>();
  const categories = data.categories as QuizCategory[];
  const [scores, setScores] = useState<Record<string, ScoreData>>({});

  useFocusEffect(
    useCallback(() => {
      getScores().then(setScores);
    }, [])
  );

  const renderItem = ({ item }: { item: QuizCategory }) => {
    const userScore = scores[item.id];
    const percentage = userScore ? Math.round((userScore.score / userScore.total) * 100) : 0;
    const hasScore = !!userScore;

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate("Quiz", { categoryId: item.id, mode: "practice" })}
        activeOpacity={0.8}
      >
        <View style={styles.row}>
          <View style={styles.textContainer}>
            <Text style={styles.cardTitle}>{item.label}</Text>
            <Text style={styles.cardDesc}>{item.description}</Text>
          </View>

          {hasScore ? (
            <View style={[styles.badge, percentage >= 75 ? styles.badgeSuccess : styles.badgeNeutral]}>
              <Text style={[styles.badgeText, percentage >= 75 ? styles.textSuccess : styles.textNeutral]}>
                {percentage}%
              </Text>
            </View>
          ) : (
            <Ionicons name="chevron-forward" size={20} color={colors.textLight} />
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={globalStyles.container}>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  list: { padding: 20 },
  card: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 20,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  row: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  textContainer: { flex: 1, marginRight: 12 },
  cardTitle: { fontSize: 17, fontWeight: "700", color: colors.text, marginBottom: 4 },
  cardDesc: { fontSize: 14, color: colors.textLight },
  
  badge: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  badgeSuccess: { backgroundColor: colors.successBg },
  badgeNeutral: { backgroundColor: colors.border },
  
  badgeText: { fontSize: 14, fontWeight: "700" },
  textSuccess: { color: colors.success },
  textNeutral: { color: colors.textLight },
});