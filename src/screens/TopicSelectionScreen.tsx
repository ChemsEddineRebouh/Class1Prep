import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, QuizCategory } from '../types';
import data from '../data/questions.json';

type TopicNavProp = NativeStackNavigationProp<RootStackParamList, 'TopicSelection'>;

export default function TopicSelectionScreen() {
  const navigation = useNavigation<TopicNavProp>();
  const categories = data.categories as QuizCategory[];

  const renderItem = ({ item }: { item: QuizCategory }) => (
    <TouchableOpacity 
      style={styles.item}
      onPress={() => navigation.navigate('Quiz', { categoryId: item.id, mode: 'practice' })}
    >
      <Text style={styles.itemTitle}>{item.label}</Text>
      <Text style={styles.itemDesc}>{item.description}</Text>
    </TouchableOpacity>
  );

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
  container: { flex: 1, backgroundColor: '#F5F7FA' },
  list: { padding: 16, gap: 12 },
  item: { backgroundColor: 'white', padding: 20, borderRadius: 12, marginBottom: 12, elevation: 1 },
  itemTitle: { fontSize: 18, fontWeight: '600', color: '#2D3748' },
  itemDesc: { fontSize: 14, color: '#718096', marginTop: 4 },
});