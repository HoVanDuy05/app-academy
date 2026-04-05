import React from 'react';
import { View, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { Text, Searchbar, Chip, useTheme, FAB, Portal } from 'react-native-paper';
import { useRoute } from '@react-navigation/native';

// Import role-specific components
import { TeacherStudentCard, GradeInputForm, AttendanceManager } from '@components/roles/teacher';

// Import role-specific hooks
import { useCourseStudents, useStudentGradesForCourse, useStudentAttendanceForCourse } from '@hooks/roles/teacher';

type RouteParams = {
  courseId: string;
};

const TeacherCourseStudentsScreen = () => {
  const theme = useTheme();
  const route = useRoute();
  const { courseId } = route.params as RouteParams;

  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedTab, setSelectedTab] = React.useState<'list' | 'grades' | 'attendance'>('list');
  const [selectedStudent, setSelectedStudent] = React.useState<string | null>(null);

  // Use role-specific hooks
  const { data: students, refetch, isLoading } = useCourseStudents(courseId);
  const { data: grades } = useStudentGradesForCourse(courseId, selectedStudent || '');

  const filteredStudents = React.useMemo(() => {
    if (!searchQuery) return students;
    const query = searchQuery.toLowerCase();
    return students?.filter(
      (student) =>
        student.firstName.toLowerCase().includes(query) ||
        student.lastName.toLowerCase().includes(query) ||
        student.email.toLowerCase().includes(query)
    );
  }, [students, searchQuery]);

  return (
    <View style={styles.container}>
      {/* Tab Selector */}
      <View style={styles.tabContainer}>
        <Chip
          selected={selectedTab === 'list'}
          onPress={() => setSelectedTab('list')}
          style={styles.tabChip}
          showSelectedOverlay
        >
          Danh sách
        </Chip>
        <Chip
          selected={selectedTab === 'grades'}
          onPress={() => setSelectedTab('grades')}
          style={styles.tabChip}
          showSelectedOverlay
        >
          Điểm số
        </Chip>
        <Chip
          selected={selectedTab === 'attendance'}
          onPress={() => setSelectedTab('attendance')}
          style={styles.tabChip}
          showSelectedOverlay
        >
          Điểm danh
        </Chip>
      </View>

      <Searchbar
        placeholder="Tìm kiếm học sinh..."
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchbar}
      />

      <Text variant="titleMedium" style={styles.title}>
        Học sinh ({filteredStudents?.length || 0})
      </Text>

      {selectedTab === 'list' && (
        <FlatList
          data={filteredStudents}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TeacherStudentCard
              id={item.id}
              firstName={item.firstName}
              lastName={item.lastName}
              email={item.email}
              averageGrade={85}
              attendanceRate={90}
              onViewGrades={() => {
                setSelectedStudent(item.id);
                setSelectedTab('grades');
              }}
              onViewAttendance={() => {
                setSelectedStudent(item.id);
                setSelectedTab('attendance');
              }}
              onContact={() => {}}
            />
          )}
          contentContainerStyle={styles.listContainer}
          refreshControl={<RefreshControl refreshing={isLoading} onRefresh={refetch} />}
        />
      )}

      {selectedTab === 'grades' && selectedStudent && (
        <GradeInputForm
          studentName="Nguyễn Văn A"
          assignmentName="Bài tập 1"
          maxScore={100}
          currentScore={85}
          onSubmit={(score, feedback) => {
            console.log('Submit grade:', score, feedback);
          }}
          onCancel={() => setSelectedStudent(null)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 12,
  },
  tabChip: {
    flex: 1,
  },
  searchbar: {
    marginBottom: 12,
  },
  title: {
    marginBottom: 12,
  },
  listContainer: {
    paddingBottom: 80,
  },
});

export default TeacherCourseStudentsScreen;
