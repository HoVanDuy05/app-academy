import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

const StudentCourseDetailScreen = () => {
  return (
    <View style={styles.container}>
      <Text variant="titleMedium">Chi tiết khóa học - Student</Text>
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

export default StudentCourseDetailScreen;
