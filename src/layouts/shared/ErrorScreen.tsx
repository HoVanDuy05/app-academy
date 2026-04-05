import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text, useTheme } from 'react-native-paper';

interface ErrorScreenProps {
  message?: string;
  onRetry?: () => void;
}

const ErrorScreen: React.FC<ErrorScreenProps> = ({ 
  message = 'Đã có lỗi xảy ra', 
  onRetry 
}) => {
  const theme = useTheme();
  
  return (
    <View style={styles.container}>
      <Text 
        variant="headlineSmall" 
        style={[styles.title, { color: theme.colors.error }]}
      >
        Lỗi
      </Text>
      <Text style={[styles.message, { color: theme.colors.onSurface }]}>
        {message}
      </Text>
      {onRetry && (
        <Button mode="contained" onPress={onRetry} style={styles.button}>
          Thử lại
        </Button>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
  title: {
    marginBottom: 8,
  },
  message: {
    textAlign: 'center',
    marginBottom: 24,
    fontSize: 16,
  },
  button: {
    minWidth: 120,
  },
});

export default ErrorScreen;
