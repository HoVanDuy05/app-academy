import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, Chip, useTheme } from 'react-native-paper';
import { getGradeColor, getGradeLetter } from '@utils/helpers';

interface StudentGradeCardProps {
  courseName: string;
  assignmentName?: string;
  score: number;
  maxScore: number;
  type: 'assignment' | 'midterm' | 'final' | 'participation';
  date: string;
}

const StudentGradeCard: React.FC<StudentGradeCardProps> = ({
  courseName,
  assignmentName,
  score,
  maxScore,
  type,
  date,
}) => {
  const theme = useTheme();
  const percentage = (score / maxScore) * 100;
  const gradeColor = getGradeColor(percentage);
  const gradeLetter = getGradeLetter(percentage);

  const typeLabels = {
    assignment: 'Bài tập',
    midterm: 'Giữa kỳ',
    final: 'Cuối kỳ',
    participation: 'Chuyên cần',
  };

  return (
    <Card style={styles.container}>
      <Card.Content>
        <View style={styles.header}>
          <View style={styles.titleSection}>
            <Text variant="titleSmall">{courseName}</Text>
            {assignmentName && (
              <Text variant="bodySmall" style={styles.assignmentName}>{assignmentName}</Text>
            )}
          </View>
          <Chip 
            style={[styles.gradeChip, { backgroundColor: gradeColor + '20' }]}
            textStyle={{ color: gradeColor, fontWeight: 'bold' }}
          >
            {gradeLetter}
          </Chip>
        </View>

        <View style={styles.scoreSection}>
          <Text variant="displaySmall" style={[styles.score, { color: gradeColor }]}>
            {score}
          </Text>
          <Text variant="bodyMedium">/{maxScore}</Text>
        </View>

        <View style={styles.footer}>
          <Chip compact style={styles.typeChip}>{typeLabels[type]}</Chip>
          <Text variant="bodySmall" style={styles.date}>{date}</Text>
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  titleSection: {
    flex: 1,
    marginRight: 8,
  },
  assignmentName: {
    opacity: 0.7,
    marginTop: 2,
  },
  gradeChip: {
    alignSelf: 'center',
  },
  scoreSection: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginVertical: 12,
  },
  score: {
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  typeChip: {},
  date: {
    opacity: 0.6,
  },
});

export default StudentGradeCard;
