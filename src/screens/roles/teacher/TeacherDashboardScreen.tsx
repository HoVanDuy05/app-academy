import React from 'react';
import { View, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { Text, Button, FAB, Portal, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Import role-specific components
import {
  TeacherStatsCard,
  TeacherCourseCard,
  TeacherStudentCard,
} from '@components/roles/teacher';

// Import role-specific hooks
import {
  useTeacherStats,
  useTeacherCourses,
  useCourseStudents,
} from '@hooks/roles/teacher';

type TeacherStackParamList = {
  TeacherCourses: undefined;
  TeacherCourseStudents: { courseId: string };
  CreateAssignment: { courseId: string };
  TeacherGrading: undefined;
};

const TeacherDashboardScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<TeacherStackParamList>>();

  // Use role-specific hooks
  const { data: stats, refetch: refetchStats, isLoading: statsLoading } = useTeacherStats();
  const { data: courses, refetch: refetchCourses, isLoading: coursesLoading } = useTeacherCourses();

  const isLoading = statsLoading || coursesLoading;

  const onRefresh = async () => {
    await Promise.all([refetchStats(), refetchCourses()]);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        refreshControl={<RefreshControl refreshing={isLoading} onRefresh={onRefresh} />}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Stats Section */}
        <TeacherStatsCard
          totalCourses={stats?.totalCourses || 0}
          totalStudents={stats?.totalStudents || 0}
          pendingGrading={stats?.pendingGrading || 0}
          averageClassScore={stats?.averageClassScore || 0}
        />

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <Button
            mode="contained-tonal"
            icon="clipboard-text"
            onPress={() => navigation.navigate('TeacherGrading')}
            style={[styles.actionButton, (stats?.pendingGrading ?? 0) > 0 && styles.urgentButton]}
          >
            Chấm điểm {(stats?.pendingGrading ?? 0) > 0 && `(${stats?.pendingGrading})`}
          </Button>
        </View>

        {/* My Courses */}
        <View style={styles.section}>
          <Text variant="titleMedium" style={styles.sectionTitle}>Khóa học đang dạy</Text>
          {courses?.map((course) => (
            <TeacherCourseCard
              key={course.id}
              id={course.id}
              name={course.name}
              code={course.code}
              studentCount={(course as any).studentCount || 0}
              maxStudents={(course as any).maxStudents}
              pendingAssignments={(course as any).pendingAssignments || 0}
              onManageStudents={() => navigation.navigate('TeacherCourseStudents', { courseId: course.id })}
              onCreateAssignment={() => navigation.navigate('CreateAssignment', { courseId: course.id })}
              onViewDetails={() => navigation.navigate('TeacherCourseStudents', { courseId: course.id })}
            />
          ))}
        </View>
      </ScrollView>

      <Portal>
        <FAB
          icon="plus"
          style={[styles.fab, { backgroundColor: theme.colors.primary }]}
          onPress={() => {
            // Show dialog to select course first
          }}
          label="Tạo bài tập"
        />
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 80,
  },
  quickActions: {
    marginBottom: 16,
  },
  actionButton: {
    flex: 1,
  },
  urgentButton: {
    backgroundColor: '#FFEBEE',
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    marginBottom: 12,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default TeacherDashboardScreen;
