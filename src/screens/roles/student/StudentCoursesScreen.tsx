import React from 'react';
import { View, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { Text, Searchbar, Button, useTheme, FAB, Portal } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Import role-specific components
import { StudentCourseCard } from '@components/roles/student';

// Import role-specific hooks
import { useStudentCourses, useEnrollCourse } from '@hooks/roles/student';

type StudentStackParamList = {
  StudentCourseDetail: { courseId: string };
  EnrollCourse: undefined;
};

const StudentCoursesScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<StudentStackParamList>>();
  const [searchQuery, setSearchQuery] = React.useState('');

  // Use role-specific hooks
  const { data: courses, refetch, isLoading } = useStudentCourses();
  const enrollMutation = useEnrollCourse();

  const filteredCourses = React.useMemo(() => {
    if (!searchQuery) return courses;
    const query = searchQuery.toLowerCase();
    return courses?.filter(
      (course) =>
        course.name.toLowerCase().includes(query) ||
        course.code.toLowerCase().includes(query) ||
        course.description.toLowerCase().includes(query)
    );
  }, [courses, searchQuery]);

  const handleEnrollCourse = () => {
    // Navigate to course enrollment screen
    navigation.navigate('EnrollCourse');
  };

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Tìm kiếm khóa học..."
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchbar}
      />

      <Text variant="titleMedium" style={styles.title}>
        Khóa học của tôi ({filteredCourses?.length || 0})
      </Text>

      <FlatList
        data={filteredCourses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <StudentCourseCard
            id={item.id}
            name={item.name}
            code={item.code}
            teacherName={item.teacher ? `${item.teacher.lastName} ${item.teacher.firstName}` : 'Chưa có'}
            progress={75}
            onPress={() => navigation.navigate('StudentCourseDetail', { courseId: item.id })}
          />
        )}
        contentContainerStyle={styles.listContainer}
        refreshControl={<RefreshControl refreshing={isLoading} onRefresh={refetch} />}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              {searchQuery ? 'Không tìm thấy khóa học' : 'Bạn chưa đăng ký khóa học nào'}
            </Text>
            <Button
              mode="contained"
              onPress={handleEnrollCourse}
              style={styles.enrollButton}
              icon="plus"
            >
              Đăng ký khóa học
            </Button>
          </View>
        }
      />

      <Portal>
        <FAB
          icon="plus"
          style={[styles.fab, { backgroundColor: theme.colors.primary }]}
          onPress={handleEnrollCourse}
          label="Đăng ký"
        />
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  searchbar: {
    marginBottom: 16,
  },
  title: {
    marginBottom: 12,
  },
  listContainer: {
    paddingBottom: 80,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyText: {
    textAlign: 'center',
    opacity: 0.6,
    marginBottom: 16,
  },
  enrollButton: {
    marginTop: 8,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default StudentCoursesScreen;
