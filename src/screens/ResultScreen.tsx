import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from "@expo/vector-icons";
import { RootStackParamList } from '../types';
import { colors, globalStyles } from "../styles/theme";

type ResultRouteProp = RouteProp<RootStackParamList, 'Result'>;
type ResultNavProp = NativeStackNavigationProp<RootStackParamList, 'Result'>;

export default function ResultScreen() {
  const navigation = useNavigation<ResultNavProp>();
  const route = useRoute<ResultRouteProp>();
  const { score, total } = route.params;

  const percentage = Math.round((score / total) * 100);
  const isPassed = percentage >= 75;

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Ionicons 
          name={isPassed ? "trophy" : "alert-circle"} 
          size={64} 
          color={isPassed ? colors.warning : colors.error} 
          style={{ marginBottom: 20 }}
        />
        
        <Text style={styles.title}>{isPassed ? 'Bien joué !' : 'À réviser'}</Text>
        
        <View style={[styles.scoreContainer, isPassed ? styles.bgSuccess : styles.bgError]}>
          <Text style={[styles.percentage, { color: isPassed ? colors.success : colors.error }]}>
            {percentage}%
          </Text>
        </View>

        <Text style={styles.detailText}>
          Vous avez eu <Text style={{fontWeight:'bold'}}>{score}</Text> bonnes réponses sur <Text style={{fontWeight:'bold'}}>{total}</Text>.
        </Text>
      </View>

      <TouchableOpacity 
        style={styles.primaryButton}
        onPress={() => navigation.navigate('Dashboard')}
      >
        <Text style={styles.buttonText}>Retour au Menu</Text>
        <Ionicons name="home" size={20} color="white" style={{marginLeft: 8}} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 24, justifyContent: 'center' },
  card: {
    backgroundColor: colors.card,
    borderRadius: 24,
    padding: 32,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    marginBottom: 32,
  },
  title: { fontSize: 28, fontWeight: '800', color: colors.text, marginBottom: 24 },
  scoreContainer: {
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 16,
    marginBottom: 24,
  },
  bgSuccess: { backgroundColor: colors.successBg },
  bgError: { backgroundColor: colors.errorBg },
  
  percentage: { fontSize: 48, fontWeight: '900' },
  detailText: { fontSize: 16, color: colors.textLight, textAlign: 'center' },
  
  primaryButton: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 18,
    borderRadius: 16,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonText: { color: 'white', fontSize: 18, fontWeight: 'bold' }
});