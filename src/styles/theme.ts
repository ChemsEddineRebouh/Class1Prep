import { StyleSheet } from 'react-native';

export const colors = {
  primary: '#2B6CB0',
  secondary: '#2C5282',
  background: '#F7FAFC',
  card: '#FFFFFF',
  text: '#2D3748',
  textLight: '#718096',
  border: '#E2E8F0',
  
  success: '#38A169',
  successBg: '#F0FFF4',
  error: '#E53E3E',
  errorBg: '#FFF5F5',
  
  infoBg: '#EBF8FF',
  infoBorder: '#4299E1',
  infoText: '#2B6CB0',
};

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 12,
  },
  text: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 24,
  },
});