import React from 'react';
import { View, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { Text, Card, Button, Chip, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Import role-specific components
import { StudentStatsCard, StudentGradeCard } from '@components/roles/student';

// Import role-specific hooks
import { useStudentGrades, useStudentStats } from '@hooks/roles/student';

// Import helpers
import { calculateAverage, getGradeLetter } from '@utils/helpers';

type StudentStackParamList = {
  StudentGrades: undefined;
};

const StudentGradesScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<StudentStackParamList>>();

  // Use role-specific hooks
  const { data: grades, refetch, isLoading } = useStudentGrades();
  const { data: stats } = useStudentStats();

  // Calculate overall stats
  const averageGrade = React.useMemo(() => {
    if (!grades || grades.length === 0) return 0;
    return calculateAverage(grades.map((g) => (g.score / g.maxScore) * 100));
  }, [grades]);

  const overallGrade = getGradeLetter(averageGrade);

  return (
    <ScrollView
      style={styles.container}
      refreshControl={<RefreshControl refreshing={isLoading} onRefresh={refetch} />}
    >
      {/* Overall Stats */}
      <Card style={styles.overallCard}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.overallTitle}>Tổng quan điểm số</Text>
          <View style={styles.overallStats}>
            <View style={styles.statItem}>
              <Text
                variant="displayMedium"
                style={[styles.statValue, { color: theme.colors.primary }]}
              >
                {averageGrade.toFixed(1)}
              </Text>
              <Text variant="bodyMedium">Điểm trung bình</Text>
            </View>
            <View style={styles.statItem}>
              <Text
                variant="displayMedium"
                style={[styles.statValue, { color: averageGrade >= 60 ? '#4CAF50' : '#F44336' }]}
              >
                {overallGrade}
              </Text>
              <Text variant="bodyMedium">Xếp loại</Text>
            </View>
            <View style={styles.statItem}>
              <Text variant="displayMedium" style={styles.statValue}>
                {grades?.length || 0}
              </Text>
              <Text variant="bodyMedium">Số điểm</Text>
            </View>
          </View>
        </Card.Content>
      </Card>

      {/* Grade Distribution */}
      <Card style={styles.distributionCard}>
        <Card.Title title="Phân bố điểm" />
        <Card.Content>
          <View style={styles.distributionRow}>
            <Chip style={[styles.gradeChip, { backgroundColor: '#E8F5E9' }]} textStyle={{ color: '#4CAF50' }}>
              A: {grades?.filter((g) => (g.score / g.maxScore) * 100 >= 90).length || 0}
            </Chip>
            <Chip style={[styles.gradeChip, { backgroundColor: '#E3F2FD' }]} textStyle={{ color: '#2196F3' }}>
              B: {grades?.filter((g) => {
                const p = (g.score / g.maxScore) * 100;
                return p >= 80 && p < 90;
              }).length || 0}
            </Chip>
            <Chip style={[styles.gradeChip, { backgroundColor: '#FFF3E0' }]} textStyle={{ color: '#FF9800' }}>
              C: {grades?.filter((g) => {
                const p = (g.score / g.maxScore) * 100;
                return p >= 70 && p < 80;
              }).length || 0}
            </Chip>
            <Chip style={[styles.gradeChip, { backgroundColor: '#FFEBEE' }]} textStyle={{ color: '#F44336' }}>
              D/F: {grades?.filter((g) => (g.score / g.maxScore) * 100 < 70).length || 0}
            </Chip>
          </View>
        </Card.Content>
      </Card>

      {/* Grade List */}
      <Text variant="titleMedium" style={styles.listTitle}>Chi tiết điểm số</Text>
      {grades?.map((grade) => (
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  overallCard: {
    marginBottom: 16,
  },
  overallTitle: {
    textAlign: 'center',
    marginBottom: 16,
  },
  overallStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontWeight: 'bold',
  },
  distributionCard: {
    marginBottom: 16,
  },
  distributionRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'center',
  },
  gradeChip: {},
  listTitle: {
    marginBottom: 12,
  },
});

export default StudentGradesScreen;
