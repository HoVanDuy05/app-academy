import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

const AdminCourseManagementScreen = () => {
  return (
    <View style={styles.container}>
      <Text variant="titleMedium">Quản lý khóa học - Admin</Text>
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

export default AdminCourseManagementScreen;
