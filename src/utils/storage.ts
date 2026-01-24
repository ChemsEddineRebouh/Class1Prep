import AsyncStorage from '@react-native-async-storage/async-storage';
import { Question } from '../types';

const KEYS = {
  SCORES: '@scores_v1',
  ERRORS: '@errors_v1',
};

export interface ScoreData {
  score: number;
  total: number;
  date: string;
}

export const saveScore = async (categoryId: string, score: number, total: number) => {
  try {
    const existing = await AsyncStorage.getItem(KEYS.SCORES);
    const scores = existing ? JSON.parse(existing) : {};

    const previous = scores[categoryId];

    if (!previous || score > previous.score) {
      scores[categoryId] = { score, total, date: new Date().toISOString() };
      await AsyncStorage.setItem(KEYS.SCORES, JSON.stringify(scores));
    }
  } catch (e) {
    console.error('Erreur sauvegarde score', e);
  }
};

export const getScores = async () => {
  try {
    const data = await AsyncStorage.getItem(KEYS.SCORES);
    return data ? JSON.parse(data) : {};
  } catch {
    return {};
  }
};

export const saveFailedQuestions = async (questions: Question[]) => {
  try {
    if (questions.length === 0) return;

    const existing = await AsyncStorage.getItem(KEYS.ERRORS);
    let errors = existing ? JSON.parse(existing) : [];

    const newErrors = questions.filter(q => !errors.find((e: Question) => e.id === q.id));
    errors = [...errors, ...newErrors];

    await AsyncStorage.setItem(KEYS.ERRORS, JSON.stringify(errors));
  } catch (e) {
    console.error('Erreur sauvegarde erreurs', e);
  }
};

export const clearProgress = async () => {
  await AsyncStorage.multiRemove([KEYS.SCORES, KEYS.ERRORS]);
};