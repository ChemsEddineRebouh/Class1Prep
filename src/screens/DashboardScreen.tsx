import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../types';

type DashboardNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Dashboard'>;

export default function DashboardScreen() {
  const navigation = useNavigation<DashboardNavigationProp>();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Classe 1 Québec</Text>
        <Text style={styles.subtitle}>Préparation SAAQ</Text>
      </View>

      <View style={styles.menu}>
        <TouchableOpacity 
          style={[styles.card, styles.primaryCard]}
          onPress={() => navigation.navigate('TopicSelection')}
        >
          <Text style={styles.cardTitle}>Quiz par Thème</Text>
          <Text style={styles.cardSub}>Pratique ciblée</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.card}
          onPress={() => navigation.navigate('SafetyCheck')}
        >
          <Text style={styles.cardTitle}>Ronde de Sécurité</Text>
          <Text style={styles.cardSub}>Module spécial</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.card}
          onPress={() => navigation.navigate('Quiz', { categoryId: 'exam', mode: 'exam' })}
        >
          <Text style={styles.cardTitle}>Simulation Examen</Text>
          <Text style={styles.cardSub}>32 questions • Chronométré</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F7FA' },
  header: { padding: 24, paddingTop: 40, alignItems: 'center' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#2D3748' },
  subtitle: { fontSize: 16, color: '#718096', marginTop: 4 },
  menu: { padding: 20, gap: 16 },
  card: { backgroundColor: 'white', padding: 24, borderRadius: 16, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 10, elevation: 2 },
  primaryCard: { backgroundColor: '#3182CE' },
  cardTitle: { fontSize: 20, fontWeight: 'bold', color: '#2D3748' },
  cardSub: { fontSize: 14, color: '#718096', marginTop: 4 },
});