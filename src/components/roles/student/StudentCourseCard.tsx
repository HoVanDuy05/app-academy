import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, Chip, ProgressBar, useTheme } from 'react-native-paper';
import { formatDate } from '@utils/helpers';

interface StudentCourseCardProps {
  id: string;
  name: string;
  code: string;
  teacherName: string;
  progress: number;
  nextClass?: string;
  onPress?: () => void;
}

const StudentCourseCard: React.FC<StudentCourseCardProps> = ({
  name,
  code,
  teacherName,
  progress,
  nextClass,
  onPress,
}) => {
  const theme = useTheme();

  return (
    <Card style={styles.container} onPress={onPress}>
      <Card.Content>
        <View style={styles.header}>
          <Chip compact style={styles.codeChip}>{code}</Chip>
          <Chip 
            compact 
            style={[styles.progressChip, { backgroundColor: progress >= 80 ? '#E8F5E9' : '#FFF3E0' }]}
          >
            {progress}%
          </Chip>
        </View>
        
        <Text variant="titleMedium" style={styles.courseName}>{name}</Text>
        <Text variant="bodySmall" style={styles.teacher}>Giảng viên: {teacherName}</Text>
        
        <ProgressBar
          progress={progress / 100}
          color={progress >= 80 ? '#4CAF50' : progress >= 50 ? '#FF9800' : '#F44336'}
          style={styles.progressBar}
        />
        
        {nextClass && (
          <Text variant="bodySmall" style={styles.nextClass}>
            Buổi học tiếp theo: {formatDate(nextClass)}
          </Text>
        )}
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
  codeChip: {
    backgroundColor: 'transparent',
  },
  progressChip: {},
  courseName: {
    marginBottom: 4,
  },
  teacher: {
    opacity: 0.7,
    marginBottom: 12,
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
  },
  nextClass: {
    marginTop: 8,
    opacity: 0.6,
  },
});

export default StudentCourseCard;
