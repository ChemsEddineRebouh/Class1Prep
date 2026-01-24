import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

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
        <Text style={styles.title}>{isPassed ? 'SUCCÈS !' : 'ÉCHEC'}</Text>
        <Text style={[styles.percentage, { color: isPassed ? '#38A169' : '#E53E3E' }]}>
          {percentage}%
        </Text>
        <Text style={styles.scoreText}>{score} sur {total}</Text>
      </View>

      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('Dashboard')}
      >
        <Text style={styles.buttonText}>Retour au Menu</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F7FA', justifyContent: 'center', padding: 20 },
  card: { backgroundColor: 'white', padding: 40, borderRadius: 20, alignItems: 'center', elevation: 4 },
  title: { fontSize: 32, fontWeight: 'bold', color: '#2D3748', marginBottom: 10 },
  percentage: { fontSize: 64, fontWeight: 'bold', marginBottom: 10 },
  scoreText: { fontSize: 20, color: '#718096' },
  button: { marginTop: 40, backgroundColor: '#3182CE', padding: 16, borderRadius: 12, alignItems: 'center' },
  buttonText: { color: 'white', fontSize: 18, fontWeight: 'bold' }
});