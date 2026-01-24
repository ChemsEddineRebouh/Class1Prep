import React from 'react';
import { View, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

import DashboardScreen from '../screens/DashboardScreen';
import TopicSelectionScreen from '../screens/TopicSelectionScreen';
import QuizScreen from '../screens/QuizScreen';
import ResultScreen from '../screens/ResultScreen';
import SafetyCheckScreen from '../screens/SafetyCheckScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const PlaceholderScreen = ({ route }: any) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Écran : {route.name} (En construction)</Text>
  </View>
);

export default function AppNavigator() {
  return (
    <Stack.Navigator 
      initialRouteName="Dashboard"
      screenOptions={{
        headerStyle: { backgroundColor: '#F5F7FA' },
        headerShadowVisible: false,
        headerBackTitleVisible: false,
        headerTintColor: '#2D3748',
      }}
    >
      <Stack.Screen 
        name="Dashboard" 
        component={DashboardScreen} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="TopicSelection" 
        component={TopicSelectionScreen} 
        options={{ title: 'Thèmes' }} 
      />
      <Stack.Screen 
        name="Quiz" 
        component={QuizScreen} 
        options={{ title: 'Quiz' }} 
      />
      <Stack.Screen 
        name="Result" 
        component={ResultScreen} 
        options={{ 
          title: 'Résultat',
          headerBackVisible: false, 
          gestureEnabled: false 
        }} 
      />
      <Stack.Screen 
        name="SafetyCheck" 
        component={SafetyCheckScreen} 
        options={{ title: 'Ronde de Sécurité' }} 
      />
      <Stack.Screen name="Settings" component={PlaceholderScreen} />
    </Stack.Navigator>
  );
}