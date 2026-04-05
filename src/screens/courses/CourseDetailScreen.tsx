import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Button, useTheme, Chip, Divider, List } from 'react-native-paper';
import { useRoute, useNavigation } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { MainTabParamList } from '@navigation/MainNavigator';
import { useGetCourse, useGetAssignments } from '@hooks/useQueries';
import { formatDate, getFullName } from '@utils/helpers';
import type { Course } from '@/types';

type CourseDetailRouteProp = RouteProp<MainTabParamList, 'CourseDetail'>;

const CourseDetailScreen = () => {
  const theme = useTheme();
  const route = useRoute<CourseDetailRouteProp>();
  const navigation = useNavigation<NativeStackNavigationProp<MainTabParamList>>();
  const { courseId } = route.params;

  const { data: course, isLoading: courseLoading } = useGetCourse(courseId);
  const { data: assignmentsData } = useGetAssignments(courseId);
  const assignments = assignmentsData?.data || [];

  if (courseLoading) {
    return (
      <View style={styles.centerContainer}>
        <Text>Đang tải...</Text>
      </View>
    );
  }

  if (!course) {
    return (
      <View style={styles.centerContainer}>
        <Text>Không tìm thấy khóa học</Text>
        <Button mode="contained" onPress={() => navigation.goBack()} style={styles.button}>
          Quay lại
        </Button>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <Card style={styles.headerCard}>
        <Card.Content>
          <View style={styles.headerRow}>
            <Chip style={styles.codeChip}>{course.code}</Chip>
            <Text variant="bodySmall" style={styles.credits}>
              {course.credits} tín chỉ
            </Text>
          </View>
          <Text variant="headlineSmall" style={styles.title}>
            {course.name}
          </Text>
          <Text variant="bodyMedium" style={styles.description}>
            {course.description}
          </Text>
        </Card.Content>
      </Card>

      {/* Info Section */}
      <Card style={styles.infoCard}>
        <Card.Title title="Thông tin khóa học" />
        <Card.Content>
          <List.Item
            title="Giảng viên"
            description={course.teacher ? getFullName(course.teacher.firstName, course.teacher.lastName) : 'Chưa có'}
            left={(props) => <List.Icon {...props} icon="account" />}
          />
          <Divider />
          <List.Item
            title="Số học sinh tối đa"
            description={`${course.maxStudents} học sinh`}
            left={(props) => <List.Icon {...props} icon="account-group" />}
          />
          <Divider />
          <List.Item
            title="Ngày bắt đầu"
            description={formatDate(course.startDate)}
            left={(props) => <List.Icon {...props} icon="calendar-start" />}
          />
          <Divider />
          <List.Item
            title="Ngày kết thúc"
            description={formatDate(course.endDate)}
            left={(props) => <List.Icon {...props} icon="calendar-end" />}
          />
        </Card.Content>
      </Card>

      {/* Assignments Section */}
      <Card style={styles.assignmentsCard}>
        <Card.Title
          title="Bài tập"
          subtitle={`${assignments.length} bài tập`}
          right={(props) => (
            <Button {...props} mode="text" onPress={() => navigation.navigate('AssignmentsTab')}>
              Xem tất cả
            </Button>
          )}
        />
        <Card.Content>
          {assignments.length === 0 ? (
            <Text style={styles.emptyText}>Chưa có bài tập nào</Text>
          ) : (
            assignments.slice(0, 3).map((assignment) => (
              <List.Item
                key={assignment.id}
                title={assignment.title}
                description={`Hạn nộp: ${formatDate(assignment.dueDate)}`}
                right={() => (
                  <Chip compact style={styles.scoreChip}>
                    {assignment.maxScore} điểm
                  </Chip>
                )}
                onPress={() => navigation.navigate('AssignmentDetail', { assignmentId: assignment.id })}
              />
            ))
          )}
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  headerCard: {
    marginBottom: 16,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  codeChip: {
    backgroundColor: 'transparent',
  },
  credits: {
    opacity: 0.7,
  },
  title: {
    marginBottom: 8,
  },
  description: {
    opacity: 0.8,
  },
  infoCard: {
    marginBottom: 16,
  },
  assignmentsCard: {
    marginBottom: 16,
  },
  scoreChip: {
    alignSelf: 'center',
  },
  emptyText: {
    textAlign: 'center',
    opacity: 0.6,
    paddingVertical: 16,
  },
  button: {
    marginTop: 16,
  },
});

export default CourseDetailScreen;
