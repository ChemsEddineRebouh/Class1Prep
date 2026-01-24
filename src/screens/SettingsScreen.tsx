import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { clearProgress } from '../utils/storage';
import { useNavigation } from '@react-navigation/native';

export default function SettingsScreen() {
  const navigation = useNavigation();

  const handleReset = () => {
    Alert.alert(
      "Attention",
      "Voulez-vous vraiment effacer tout votre historique et vos scores ?",
      [
        { text: "Annuler", style: "cancel" },
        { 
          text: "Effacer tout", 
          style: "destructive", 
          onPress: async () => {
            await clearProgress();
            Alert.alert("Succès", "Données effacées.");
            navigation.goBack();
          }
        }
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Données</Text>
        <TouchableOpacity style={styles.row} onPress={handleReset}>
          <Text style={[styles.rowText, { color: '#E53E3E' }]}>Réinitialiser ma progression</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Application</Text>
        <View style={styles.row}>
          <Text style={styles.rowText}>Version</Text>
          <Text style={styles.rowValue}>1.0.0 (MVP)</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.rowText}>Contact</Text>
          <Text style={styles.rowValue}>support@tonapp.com</Text>
        </View>
      </View>

      <Text style={styles.footer}>
        Fait avec ❤️ à Montréal pour les futurs camionneurs.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F7FA', padding: 20 },
  section: { marginBottom: 30 },
  sectionTitle: { fontSize: 14, fontWeight: 'bold', color: '#718096', marginBottom: 10, textTransform: 'uppercase' },
  row: { 
    backgroundColor: 'white', 
    padding: 16, 
    borderRadius: 8, 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    marginBottom: 1, 
    elevation: 1 
  },
  rowText: { fontSize: 16, color: '#2D3748' },
  rowValue: { fontSize: 16, color: '#A0AEC0' },
  footer: { textAlign: 'center', color: '#CBD5E0', marginTop: 20, fontSize: 12 }
});