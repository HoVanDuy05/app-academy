import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, Chip, Button, useTheme } from 'react-native-paper';
import { formatDate, isOverdue } from '@utils/helpers';

interface StudentAssignmentCardProps {
  id: string;
  title: string;
  courseName: string;
  dueDate: string;
  type: 'homework' | 'quiz' | 'exam' | 'project';
  maxScore: number;
  isSubmitted?: boolean;
  onPress?: () => void;
  onSubmit?: () => void;
}

const StudentAssignmentCard: React.FC<StudentAssignmentCardProps> = ({
  title,
  courseName,
  dueDate,
  type,
  maxScore,
  isSubmitted,
  onPress,
  onSubmit,
}) => {
  const theme = useTheme();
  const overdue = isOverdue(dueDate);

  const typeConfig = {
    homework: { icon: 'home', label: 'Bài tập về nhà', color: '#2196F3' },
    quiz: { icon: 'help-circle', label: 'Kiểm tra', color: '#9C27B0' },
    exam: { icon: 'file-document', label: 'Thi', color: '#F44336' },
    project: { icon: 'folder', label: 'Dự án', color: '#FF9800' },
  };

  const config = typeConfig[type];

  return (
    <Card style={styles.container} onPress={onPress}>
      <Card.Content>
        <View style={styles.header}>
          <Chip
            icon={config.icon}
            style={[styles.typeChip, { backgroundColor: config.color + '15' }]}
            textStyle={{ color: config.color }}
          >
            {config.label}
          </Chip>
          {isSubmitted ? (
            <Chip compact style={styles.submittedChip}>Đã nộp</Chip>
          ) : overdue ? (
            <Chip compact selectedColor={theme.colors.error}>Quá hạn</Chip>
          ) : null}
        </View>

        <Text variant="titleSmall" style={styles.title}>{title}</Text>
        <Text variant="bodySmall" style={styles.course}>{courseName}</Text>

        <View style={styles.footer}>
          <View>
            <Text
              variant="bodySmall"
              style={[styles.dueDate, overdue && !isSubmitted && { color: theme.colors.error }]}
            >
              Hạn nộp: {formatDate(dueDate)}
            </Text>
            <Text variant="bodySmall" style={styles.maxScore}>{maxScore} điểm</Text>
          </View>

          {!isSubmitted && !overdue && (
            <Button
              mode="contained"
              compact
              onPress={(e) => {
                e.stopPropagation();
                onSubmit?.();
              }}
            >
              Nộp bài
            </Button>
          )}
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
    marginBottom: 8,
  },
  typeChip: {},
  submittedChip: {
    backgroundColor: '#E8F5E9',
  },
  title: {
    marginBottom: 4,
  },
  course: {
    opacity: 0.7,
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  dueDate: {
    opacity: 0.8,
  },
  maxScore: {
    opacity: 0.6,
    marginTop: 2,
  },
});

export default StudentAssignmentCard;
