import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Text, Card, useTheme, Chip, ProgressBar, DataTable } from 'react-native-paper';
import { useGetMyGrades } from '@hooks/useQueries';
import { calculateAverage, getGradeLetter, getGradeColor, formatDate } from '@utils/helpers';
import type { Grade } from '@/types';

const GradesScreen = () => {
  const theme = useTheme();
  const { data: grades, isLoading } = useGetMyGrades();

  const averageScore = React.useMemo(() => {
    if (!grades || grades.length === 0) return 0;
    return calculateAverage(grades.map((g) => g.score));
  }, [grades]);

  const overallGrade = getGradeLetter(averageScore);

  const renderGradeItem = ({ item }: { item: Grade }) => (
    <Card style={styles.gradeCard}>
      <Card.Content>
        <View style={styles.headerRow}>
          <View style={styles.titleContainer}>
            <Text variant="titleSmall">{item.course?.name || 'Khóa học'}</Text>
            {item.assignment && (
              <Text variant="bodySmall" style={styles.assignmentName}>
                {item.assignment.title}
              </Text>
            )}
          </View>
          <Chip
            style={[
              styles.gradeChip,
              { backgroundColor: getGradeColor(item.score) + '20' },
            ]}
            textStyle={{ color: getGradeColor(item.score) }}
          >
            {getGradeLetter(item.score)}
          </Chip>
        </View>

        <View style={styles.scoreContainer}>
          <Text variant="displaySmall" style={{ color: getGradeColor(item.score) }}>
            {item.score}
          </Text>
          <Text variant="bodyMedium">/{item.maxScore}</Text>
        </View>

        <ProgressBar
          progress={item.score / item.maxScore}
          color={getGradeColor(item.score)}
          style={styles.progressBar}
        />

        {item.notes && (
          <Text variant="bodySmall" style={styles.notes}>
            Ghi chú: {item.notes}
          </Text>
        )}

        <Text variant="bodySmall" style={styles.date}>
          {formatDate(item.createdAt)}
        </Text>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      {/* Overall Stats */}
      <Card style={styles.statsCard}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.statsTitle}>
            Tổng quan điểm số
          </Text>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text variant="displayMedium" style={{ color: theme.colors.primary }}>
                {averageScore.toFixed(1)}
              </Text>
              <Text variant="bodyMedium">Điểm trung bình</Text>
            </View>
            <View style={styles.statItem}>
              <Text
                variant="displayMedium"
                style={{
                  color: getGradeColor(averageScore),
                }}
              >
                {overallGrade}
              </Text>
              <Text variant="bodyMedium">Xếp loại</Text>
            </View>
            <View style={styles.statItem}>
              <Text variant="displayMedium" style={{ color: theme.colors.secondary }}>
                {grades?.length || 0}
              </Text>
              <Text variant="bodyMedium">Số điểm</Text>
            </View>
          </View>
        </Card.Content>
      </Card>

      <Text variant="titleMedium" style={styles.listTitle}>
        Chi tiết điểm số
      </Text>

      {isLoading ? (
        <Text style={styles.emptyText}>Đang tải...</Text>
      ) : grades?.length === 0 ? (
        <Text style={styles.emptyText}>Chưa có điểm nào</Text>
      ) : (
        <FlatList
          data={grades}
          keyExtractor={(item) => item.id}
          renderItem={renderGradeItem}
          contentContainerStyle={styles.listContainer}
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
  statsCard: {
    marginBottom: 16,
  },
  statsTitle: {
    marginBottom: 16,
    textAlign: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  listTitle: {
    marginBottom: 12,
  },
  listContainer: {
    paddingBottom: 80,
  },
  gradeCard: {
    marginBottom: 12,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  titleContainer: {
    flex: 1,
    marginRight: 8,
  },
  assignmentName: {
    opacity: 0.7,
    marginTop: 2,
  },
  gradeChip: {},
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 8,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
  },
  notes: {
    marginTop: 12,
    opacity: 0.8,
  },
  date: {
    marginTop: 8,
    opacity: 0.6,
  },
  emptyText: {
    textAlign: 'center',
    opacity: 0.6,
    marginTop: 32,
  },
});

export default GradesScreen;
