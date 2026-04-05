import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface StudentStatsCardProps {
  totalCourses: number;
  completedAssignments: number;
  pendingAssignments: number;
  averageGrade: number;
}

const StudentStatsCard: React.FC<StudentStatsCardProps> = ({
  totalCourses,
  completedAssignments,
  pendingAssignments,
  averageGrade,
}) => {
  const theme = useTheme();

  const stats = [
    { icon: 'book-open-variant', label: 'Khóa học', value: totalCourses, color: theme.colors.primary },
    { icon: 'check-circle', label: 'Hoàn thành', value: completedAssignments, color: '#4CAF50' },
    { icon: 'clock-alert', label: 'Chờ xử lý', value: pendingAssignments, color: '#FF9800' },
    { icon: 'chart-line', label: 'Điểm TB', value: averageGrade.toFixed(1), color: theme.colors.secondary },
  ];

  return (
    <Card style={styles.container}>
      <Card.Content>
        <Text variant="titleMedium" style={styles.title}>Thống kê của bạn</Text>
        <View style={styles.statsGrid}>
          {stats.map((stat, index) => (
            <View key={index} style={styles.statItem}>
              <Icon name={stat.icon} size={24} color={stat.color} />
              <Text variant="titleLarge" style={[styles.statValue, { color: stat.color }]}>
                {stat.value}
              </Text>
              <Text variant="bodySmall" style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  title: {
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statItem: {
    width: '48%',
    alignItems: 'center',
    paddingVertical: 12,
    backgroundColor: 'rgba(0,0,0,0.02)',
    borderRadius: 8,
    marginBottom: 8,
  },
  statValue: {
    marginVertical: 4,
    fontWeight: 'bold',
  },
  statLabel: {
    opacity: 0.7,
  },
});

export default StudentStatsCard;
