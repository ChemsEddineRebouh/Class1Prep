import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function AdBanner() {
  return (
    <View style={styles.container}>
      <View style={styles.placeholder}>
        <Text style={styles.text}>Publicité AdMob</Text>
        <Text style={styles.subText}>(Visible uniquement en Build Natif)</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0F0F0',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    width: '100%',
    paddingVertical: 5
  },
  placeholder: {
    width: 320,
    height: 50,
    backgroundColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#CBD5E0',
    borderStyle: 'dashed'
  },
  text: { fontWeight: 'bold', color: '#718096', fontSize: 12 },
  subText: { fontSize: 10, color: '#A0AEC0' }
});