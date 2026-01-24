import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { safetyData, InspectionItem } from '../data/safetyData';
import { colors, globalStyles } from "../styles/theme";

export default function SafetyCheckScreen() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  const renderItem = ({ item }: { item: InspectionItem }) => {
    const isExpanded = expandedId === item.id;

    return (
      <View style={styles.card}>
        <TouchableOpacity onPress={() => toggleExpand(item.id)} style={styles.cardHeader} activeOpacity={0.7}>
          <Text style={[styles.partName, isExpanded && { color: colors.primary }]}>{item.part}</Text>
          <Ionicons 
            name={isExpanded ? "chevron-up" : "chevron-down"} 
            size={20} 
            color={isExpanded ? colors.primary : colors.textLight} 
          />
        </TouchableOpacity>

        {isExpanded && (
          <View style={styles.details}>
            {/* MINEURES */}
            {item.minor.length > 0 && (
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <Ionicons name="warning-outline" size={18} color="#D69E2E" />
                  <Text style={styles.minorTitle}>Mineures</Text>
                </View>
                {item.minor.map((def, idx) => (
                  <Text key={idx} style={styles.defText}>• {def}</Text>
                ))}
              </View>
            )}

            {/* MAJEURES */}
            {item.major.length > 0 && (
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <Ionicons name="hand-left-outline" size={18} color={colors.error} />
                  <Text style={styles.majorTitle}>Majeures (Interdiction)</Text>
                </View>
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
    <View style={globalStyles.container}>
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
  list: { padding: 16 },
  card: {
    backgroundColor: colors.card,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
    elevation: 1,
  },
  cardHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    padding: 18, 
    alignItems: 'center',
    backgroundColor: 'white'
  },
  partName: { fontSize: 16, fontWeight: '700', color: colors.text },
  details: { padding: 18, paddingTop: 0, backgroundColor: '#FAFAFA', borderTopWidth: 1, borderTopColor: colors.border },
  
  section: { marginTop: 16 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 6, gap: 6 },
  
  minorTitle: { fontSize: 14, fontWeight: '700', color: '#D69E2E', textTransform: 'uppercase' },
  majorTitle: { fontSize: 14, fontWeight: '700', color: colors.error, textTransform: 'uppercase' },
  
  defText: { fontSize: 15, color: colors.text, marginBottom: 4, lineHeight: 22, paddingLeft: 8 },
});