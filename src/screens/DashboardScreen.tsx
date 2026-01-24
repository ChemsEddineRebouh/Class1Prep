import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../types";
import AdBanner from "../components/ads/AdBanner";
import { Ionicons } from "@expo/vector-icons";
import { colors, globalStyles } from "../styles/theme";

type DashboardNavigationProp = NativeStackNavigationProp<RootStackParamList, "Dashboard">;

export default function DashboardScreen() {
  const navigation = useNavigation<DashboardNavigationProp>();

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* EN-TÊTE */}
        <View style={styles.header}>
          <View>
            <Text style={styles.appName}>Classe 1 Québec</Text>
            <Text style={styles.appTagline}>L'outil de révision ultime</Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate("Settings")}
            style={styles.settingsButton}
          >
            <Ionicons name="settings-sharp" size={24} color={colors.text} />
          </TouchableOpacity>
        </View>

        
        <View style={styles.menuContainer}>
          <Text style={styles.sectionTitle}>Menu Principal</Text>

          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("TopicSelection")}
            activeOpacity={0.9}
          >
            <View style={[styles.iconBox, { backgroundColor: colors.infoBg }]}>
              <Ionicons name="library" size={28} color={colors.primary} />
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>Quiz par Thème</Text>
              <Text style={styles.cardDesc}>Pratique ciblée par catégorie</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.textLight} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("SafetyCheck")}
            activeOpacity={0.9}
          >
            <View style={[styles.iconBox, { backgroundColor: '#FFF5F5' }]}>
              <Ionicons name="construct" size={28} color={colors.error} />
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>Ronde de Sécurité</Text>
              <Text style={styles.cardDesc}>Guide des défectuosités</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.textLight} />
          </TouchableOpacity>

          {/* Carte 3 : Simulation Examen */}
          <TouchableOpacity
            style={[styles.card, styles.examCard]}
            onPress={() => navigation.navigate("Quiz", { categoryId: "exam", mode: "exam" })}
            activeOpacity={0.9}
          >
            <View style={[styles.iconBox, { backgroundColor: '#F0FFF4' }]}>
              <Ionicons name="timer" size={28} color={colors.success} />
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>Simulation Examen</Text>
              <Text style={styles.cardDesc}>32 questions • Mode réel</Text>
            </View>
            <Ionicons name="play-circle" size={24} color={colors.success} />
          </TouchableOpacity>
        </View>
      </ScrollView>

      <AdBanner />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scrollContent: { paddingBottom: 20 },
  header: {
    padding: 24,
    paddingTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  appName: { fontSize: 28, fontWeight: "800", color: colors.text, letterSpacing: -0.5 },
  appTagline: { fontSize: 16, color: colors.textLight, marginTop: 4, fontWeight: "500" },
  settingsButton: {
    padding: 8,
    backgroundColor: colors.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  menuContainer: { padding: 20 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.secondary,
    marginBottom: 16,
    marginLeft: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
  examCard: {
    borderColor: colors.success,
    borderWidth: 1,
  },
  iconBox: {
    width: 50,
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  cardContent: { flex: 1 },
  cardTitle: { fontSize: 18, fontWeight: "700", color: colors.text, marginBottom: 4 },
  cardDesc: { fontSize: 14, color: colors.textLight },
});