import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { safetyData, InspectionItem } from '../data/safetyData';

export default function SafetyCheckScreen() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  const renderItem = ({ item }: { item: InspectionItem }) => {
    const isExpanded = expandedId === item.id;

    return (
      <View style={styles.card}>
        <TouchableOpacity onPress={() => toggleExpand(item.id)} style={styles.cardHeader}>
          <Text style={styles.partName}>{item.part}</Text>
          <Text style={styles.chevron}>{isExpanded ? '▲' : '▼'}</Text>
        </TouchableOpacity>

        {isExpanded && (
          <View style={styles.details}>
            {item.minor.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.minorTitle}>⚠️ MINEURES</Text>
                {item.minor.map((def, idx) => (
                  <Text key={idx} style={styles.defText}>• {def}</Text>
                ))}
              </View>
            )}

            {item.major.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.majorTitle}>⛔ MAJEURES (Interdiction)</Text>
                {item.major.map((def, idx) => (
                  <Text key={idx} style={styles.defText}>• {def}</Text>
                ))}
              </View>
            )}
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Guide des Défectuosités</Text>
        <Text style={styles.headerSub}>Révision Ronde de Sécurité</Text>
      </View>
      <FlatList
        data={safetyData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F7FA' },
  header: { padding: 20, backgroundColor: 'white', borderBottomWidth: 1, borderBottomColor: '#E2E8F0' },
  headerTitle: { fontSize: 22, fontWeight: 'bold', color: '#2D3748' },
  headerSub: { fontSize: 14, color: '#718096' },
  list: { padding: 16 },
  card: { backgroundColor: 'white', borderRadius: 12, marginBottom: 12, overflow: 'hidden', elevation: 2 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', padding: 20, alignItems: 'center' },
  partName: { fontSize: 18, fontWeight: '600', color: '#2D3748' },
  chevron: { fontSize: 18, color: '#CBD5E0' },
  details: { padding: 20, paddingTop: 0, backgroundColor: '#FAFAFA' },
  section: { marginTop: 15 },
  minorTitle: { fontSize: 14, fontWeight: 'bold', color: '#D69E2E', marginBottom: 6 },
  majorTitle: { fontSize: 14, fontWeight: 'bold', color: '#E53E3E', marginBottom: 6 },
  defText: { fontSize: 15, color: '#4A5568', marginBottom: 4, lineHeight: 22 },
});