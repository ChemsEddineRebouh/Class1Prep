import React, { useCallback, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList, QuizCategory } from "../types";
import data from "../data/questions.json";
import { getScores, ScoreData } from "../utils/storage";

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

    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() =>
          navigation.navigate("Quiz", { categoryId: item.id, mode: "practice" })
        }
      >
        <View style={styles.row}>
          <View style={styles.info}>
            <Text style={styles.itemTitle}>{item.label}</Text>
            <Text style={styles.itemDesc}>{item.description}</Text>
          </View>

          {userScore && (
            <View style={styles.scoreBadge}>
              <Text style={styles.scoreText}>
                {Math.round((userScore.score / userScore.total) * 100)}%
              </Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
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
  container: { flex: 1, backgroundColor: "#F5F7FA" },
  list: { padding: 16, gap: 12 },
  item: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 1,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  info: { flex: 1, marginRight: 10 },
  itemTitle: { fontSize: 18, fontWeight: "600", color: "#2D3748" },
  itemDesc: { fontSize: 14, color: "#718096", marginTop: 4 },
  scoreBadge: {
    backgroundColor: "#C6F6D5",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  scoreText: { color: "#22543D", fontWeight: "bold", fontSize: 14 },
});