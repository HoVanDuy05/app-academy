import React from 'react';
import { View, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { Text, Button, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Import role-specific components
import {
  StudentStatsCard,
  StudentCourseCard,
  StudentAssignmentCard,
  StudentGradeCard,
} from '@components/roles/student';

// Import role-specific hooks
import {
  useStudentStats,
  useStudentCourses,
  useStudentAssignments,
  useStudentGrades,
} from '@hooks/roles/student';

// Import services
import { StudentService } from '@services/roles';

type StudentStackParamList = {
  StudentCourses: undefined;
  StudentAssignments: undefined;
  StudentGrades: undefined;
  StudentAttendance: undefined;
  StudentCourseDetail: { courseId: string };
};

const StudentDashboardScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<StudentStackParamList>>();

  // Use role-specific hooks
  const { data: stats, refetch: refetchStats, isLoading: statsLoading } = useStudentStats();
  const { data: courses, refetch: refetchCourses, isLoading: coursesLoading } = useStudentCourses();
  const { data: assignments, refetch: refetchAssignments, isLoading: assignmentsLoading } = useStudentAssignments('pending');
  const { data: grades, refetch: refetchGrades, isLoading: gradesLoading } = useStudentGrades();

  const isLoading = statsLoading || coursesLoading || assignmentsLoading || gradesLoading;

  const onRefresh = async () => {
    await Promise.all([
      refetchStats(),
      refetchCourses(),
      refetchAssignments(),
      refetchGrades(),
    ]);
  };

  const handleViewAllCourses = () => {
    navigation.navigate('StudentCourses');
  };

  const handleViewAllAssignments = () => {
    navigation.navigate('StudentAssignments');
  };

  const handleViewAllGrades = () => {
    navigation.navigate('StudentGrades');
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={<RefreshControl refreshing={isLoading} onRefresh={onRefresh} />}
    >
      {/* Stats Section */}
      <StudentStatsCard
        totalCourses={stats?.totalCourses || 0}
        completedAssignments={stats?.completedAssignments || 0}
        pendingAssignments={stats?.pendingAssignments || 0}
        averageGrade={stats?.averageGrade || 0}
      />

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <Button
          mode="contained-tonal"
          icon="book-open-variant"
          onPress={handleViewAllCourses}
          style={styles.actionButton}
        >
          Khóa học
        </Button>
        <Button
          mode="contained-tonal"
          icon="clipboard-text"
          onPress={handleViewAllAssignments}
          style={styles.actionButton}
        >
          Bài tập
        </Button>
        <Button
          mode="contained-tonal"
          icon="chart-line"
          onPress={handleViewAllGrades}
          style={styles.actionButton}
        >
          Điểm số
        </Button>
      </View>

      {/* Recent Courses */}
      <View style={styles.section}>
        <Text variant="titleMedium" style={styles.sectionTitle}>Khóa học gần đây</Text>
        {courses?.slice(0, 3).map((course) => (
          <StudentCourseCard
            key={course.id}
            id={course.id}
            name={course.name}
            code={course.code}
            teacherName={course.teacher ? `${course.teacher.lastName} ${course.teacher.firstName}` : 'Chưa có'}
            progress={75}
            onPress={() => navigation.navigate('StudentCourseDetail', { courseId: course.id })}
          />
        ))}
        <Button mode="text" onPress={handleViewAllCourses} style={styles.viewAllButton}>
          Xem tất cả
        </Button>
      </View>

      {/* Pending Assignments */}
      <View style={styles.section}>
        <Text variant="titleMedium" style={styles.sectionTitle}>Bài tập cần làm</Text>
        {assignments?.slice(0, 3).map((assignment) => (
          <StudentAssignmentCard
            key={assignment.id}
            id={assignment.id}
            title={assignment.title}
            courseName={assignment.course?.name || 'Khóa học'}
            dueDate={assignment.dueDate}
            type={assignment.type}
            maxScore={assignment.maxScore}
            isSubmitted={false}
            onPress={() => navigation.navigate('StudentAssignments')}
          />
        ))}
        <Button mode="text" onPress={handleViewAllAssignments} style={styles.viewAllButton}>
          Xem tất cả
        </Button>
      </View>

      {/* Recent Grades */}
      <View style={styles.section}>
        <Text variant="titleMedium" style={styles.sectionTitle}>Điểm mới nhất</Text>
        {grades?.slice(0, 3).map((grade) => (
          <StudentGradeCard
            key={grade.id}
            courseName={grade.course?.name || 'Khóa học'}
            assignmentName={grade.assignment?.title}
            score={grade.score}
            maxScore={grade.maxScore}
            type={grade.type}
            date={grade.createdAt}
          />
        ))}
        <Button mode="text" onPress={handleViewAllGrades} style={styles.viewAllButton}>
          Xem tất cả
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    gap: 8,
  },
  actionButton: {
    flex: 1,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    marginBottom: 12,
  },
  viewAllButton: {
    alignSelf: 'center',
    marginTop: 8,
  },
});

export default StudentDashboardScreen;
