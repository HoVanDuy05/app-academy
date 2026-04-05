import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

const TeacherCoursesScreen = () => {
  return (
    <View style={styles.container}>
      <Text variant="titleMedium">Khóa học của tôi - Teacher</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TeacherCoursesScreen;
