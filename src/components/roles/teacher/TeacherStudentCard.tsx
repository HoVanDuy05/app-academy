import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, Avatar, Button, Chip, useTheme } from 'react-native-paper';
import { getInitials, getFullName } from '@utils/helpers';

interface TeacherStudentCardProps {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  averageGrade?: number;
  attendanceRate?: number;
  onViewGrades?: () => void;
  onViewAttendance?: () => void;
  onContact?: () => void;
}

const TeacherStudentCard: React.FC<TeacherStudentCardProps> = ({
  firstName,
  lastName,
  email,
  averageGrade,
  attendanceRate,
  onViewGrades,
  onViewAttendance,
  onContact,
}) => {
  const theme = useTheme();
  const fullName = getFullName(firstName, lastName);

  const getGradeColor = (grade: number) => {
    if (grade >= 80) return '#4CAF50';
    if (grade >= 60) return '#FF9800';
    return '#F44336';
  };

  return (
    <Card style={styles.container}>
      <Card.Content>
        <View style={styles.header}>
          <Avatar.Text
            size={48}
            label={getInitials(firstName, lastName)}
            style={{ backgroundColor: theme.colors.primary }}
          />
          <View style={styles.info}>
            <Text variant="titleSmall">{fullName}</Text>
            <Text variant="bodySmall" style={styles.email}>{email}</Text>
          </View>
        </View>

        <View style={styles.statsRow}>
          {averageGrade !== undefined && (
            <Chip 
              style={[styles.statChip, { backgroundColor: getGradeColor(averageGrade) + '15' }]}
              textStyle={{ color: getGradeColor(averageGrade) }}
            >
              Điểm TB: {averageGrade.toFixed(1)}
            </Chip>
          )}
          {attendanceRate !== undefined && (
            <Chip 
              style={[styles.statChip, { backgroundColor: attendanceRate >= 80 ? '#E8F5E9' : '#FFF3E0' }]}
              textStyle={{ color: attendanceRate >= 80 ? '#4CAF50' : '#FF9800' }}
            >
              Chuyên cần: {attendanceRate.toFixed(0)}%
            </Chip>
          )}
        </View>
      </Card.Content>
      <Card.Actions style={styles.actions}>
        <Button mode="text" compact onPress={onViewGrades} icon="chart-line">
          Điểm
        </Button>
        <Button mode="text" compact onPress={onViewAttendance} icon="calendar-check">
          Điểm danh
        </Button>
        <Button mode="text" compact onPress={onContact} icon="email">
          Liên hệ
        </Button>
      </Card.Actions>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  info: {
    marginLeft: 12,
    flex: 1,
  },
  email: {
    opacity: 0.7,
    marginTop: 2,
  },
  statsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  statChip: {},
  actions: {
    justifyContent: 'space-between',
  },
});

export default TeacherStudentCard;
