import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface AdminStatsCardProps {
  totalUsers: number;
  totalCourses: number;
  activeStudents: number;
  activeTeachers: number;
  systemUptime: string;
}

const AdminStatsCard: React.FC<AdminStatsCardProps> = ({
  totalUsers,
  totalCourses,
  activeStudents,
  activeTeachers,
  systemUptime,
}) => {
  const theme = useTheme();

  const stats = [
    { icon: 'account-group', label: 'Tổng users', value: totalUsers, color: theme.colors.primary },
    { icon: 'school', label: 'Khóa học', value: totalCourses, color: '#2196F3' },
    { icon: 'account-school', label: 'Học sinh', value: activeStudents, color: '#4CAF50' },
    { icon: 'teach', label: 'Giáo viên', value: activeTeachers, color: '#FF9800' },
  ];

  return (
    <Card style={styles.container}>
      <Card.Content>
        <Text variant="titleMedium" style={styles.title}>Thống kê hệ thống</Text>
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
        <Text variant="bodySmall" style={styles.uptime}>System uptime: {systemUptime}</Text>
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
  uptime: {
    textAlign: 'center',
    marginTop: 12,
    opacity: 0.6,
  },
});

export default AdminStatsCard;
