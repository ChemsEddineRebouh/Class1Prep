import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { clearProgress } from '../utils/storage';
import { useNavigation } from '@react-navigation/native';
import { colors, globalStyles } from "../styles/theme";

export default function SettingsScreen() {
  const navigation = useNavigation();

  const handleReset = () => {
    Alert.alert(
      "Réinitialisation",
      "Cette action est irréversible. Voulez-vous vraiment tout effacer ?",
      [
        { text: "Annuler", style: "cancel" },
        { 
          text: "Confirmer", 
          style: "destructive", 
          onPress: async () => {
            await clearProgress();
            navigation.goBack();
          }
        }
      ]
    );
  };

  const renderRow = (label: string, value: string | React.ReactNode, icon?: string, isDestructive?: boolean, onPress?: () => void) => (
    <TouchableOpacity 
      style={styles.row} 
      onPress={onPress} 
      disabled={!onPress}
      activeOpacity={0.7}
    >
      <View style={styles.rowLeft}>
        {icon && <Ionicons name={icon as any} size={20} color={isDestructive ? colors.error : colors.text} style={styles.rowIcon} />}
        <Text style={[styles.rowLabel, isDestructive && { color: colors.error }]}>{label}</Text>
      </View>
      <View style={styles.rowRight}>
        {typeof value === 'string' ? <Text style={styles.rowValue}>{value}</Text> : value}
        {onPress && <Ionicons name="chevron-forward" size={16} color={colors.textLight} style={{marginLeft: 8}} />}
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={globalStyles.container}>
      <View style={styles.content}>
        
        <Text style={styles.sectionHeader}>APPLICATION</Text>
        <View style={styles.sectionBlock}>
          {renderRow("Version", "1.0.0", "information-circle-outline")}
          <View style={styles.divider} />
          {renderRow("Contact", "support@tonapp.com", "mail-outline")}
        </View>

        <Text style={styles.sectionHeader}>GESTION DES DONNÉES</Text>
        <View style={styles.sectionBlock}>
          {renderRow("Réinitialiser ma progression", "", "trash-outline", true, handleReset)}
        </View>

        <Text style={styles.footerText}>
          Développé à Montréal 🇨🇦
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: { padding: 20 },
  sectionHeader: { 
    fontSize: 13, 
    fontWeight: '700', 
    color: colors.textLight, 
    marginBottom: 8, 
    marginTop: 16,
    marginLeft: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5 
  },
  sectionBlock: {
    backgroundColor: colors.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  row: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    padding: 16,
    backgroundColor: 'white',
  },
  rowLeft: { flexDirection: 'row', alignItems: 'center' },
  rowIcon: { marginRight: 12 },
  rowLabel: { fontSize: 16, color: colors.text, fontWeight: '500' },
  rowRight: { flexDirection: 'row', alignItems: 'center' },
  rowValue: { fontSize: 16, color: colors.textLight },
  divider: { height: 1, backgroundColor: colors.border, marginLeft: 48 },
  footerText: { textAlign: 'center', marginTop: 32, color: colors.textLight, fontSize: 13 },
});