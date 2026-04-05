import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface TeacherStatsCardProps {
  totalCourses: number;
  totalStudents: number;
  pendingGrading: number;
  averageClassScore: number;
}

const TeacherStatsCard: React.FC<TeacherStatsCardProps> = ({
  totalCourses,
  totalStudents,
  pendingGrading,
  averageClassScore,
}) => {
  const theme = useTheme();

  const stats = [
    { icon: 'school', label: 'Khóa học', value: totalCourses, color: theme.colors.primary },
    { icon: 'account-group', label: 'Học sinh', value: totalStudents, color: '#2196F3' },
    { icon: 'clipboard-alert', label: 'Chấm điểm', value: pendingGrading, color: '#FF9800' },
    { icon: 'chart-line', label: 'Điểm TB lớp', value: averageClassScore.toFixed(1), color: '#4CAF50' },
  ];

  return (
    <Card style={styles.container}>
      <Card.Content>
        <Text variant="titleMedium" style={styles.title}>Thống kê giảng viên</Text>
        <View style={styles.statsGrid}>
          {stats.map((stat, index) => (
            <View key={index} style={styles.statItem}>
              <Icon name={stat.icon} size={28} color={stat.color} />
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

export default TeacherStatsCard;
