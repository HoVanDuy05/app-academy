import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Text, Card, useTheme, Chip, Avatar, List, Divider } from 'react-native-paper';
import { useGetAttendance } from '@hooks/useQueries';
import { formatDate, getDayOfWeekName } from '@utils/helpers';
import type { Attendance } from '@/types';

const AttendanceScreen = () => {
  const theme = useTheme();
  const { data: attendanceData, isLoading } = useGetAttendance();
  const attendance = attendanceData?.data || [];

  const stats = React.useMemo(() => {
    const total = attendance.length;
    const present = attendance.filter((a) => a.status === 'present').length;
    const absent = attendance.filter((a) => a.status === 'absent').length;
    const late = attendance.filter((a) => a.status === 'late').length;
    const excused = attendance.filter((a) => a.status === 'excused').length;
    const rate = total > 0 ? (present / total) * 100 : 0;
    return { total, present, absent, late, excused, rate };
  }, [attendance]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'present':
        return 'check-circle';
      case 'absent':
        return 'close-circle';
      case 'late':
        return 'clock-alert';
      case 'excused':
        return 'information';
      default:
        return 'help-circle';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present':
        return '#4CAF50';
      case 'absent':
        return '#F44336';
      case 'late':
        return '#FF9800';
      case 'excused':
        return '#9E9E9E';
      default:
        return theme.colors.onSurface;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'present':
        return 'Có mặt';
      case 'absent':
        return 'Vắng';
      case 'late':
        return 'Muộn';
      case 'excused':
        return 'Có phép';
      default:
        return status;
    }
  };

  const renderAttendanceItem = ({ item }: { item: Attendance }) => (
    <List.Item
      title={item.course?.name || 'Khóa học'}
      description={`${getDayOfWeekName(new Date(item.date).getDay())}, ${formatDate(item.date)}`}
      left={(props) => (
        <Avatar.Icon
          {...props}
          icon={getStatusIcon(item.status)}
          style={{ backgroundColor: getStatusColor(item.status) + '20' }}
          color={getStatusColor(item.status)}
        />
      )}
      right={() => (
        <Chip style={[styles.statusChip, { backgroundColor: getStatusColor(item.status) + '20' }]}>
          <Text style={{ color: getStatusColor(item.status) }}>{getStatusLabel(item.status)}</Text>
        </Chip>
      )}
    />
  );

  return (
    <View style={styles.container}>
      {/* Stats Card */}
      <Card style={styles.statsCard}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.statsTitle}>
            Tổng quan điểm danh
          </Text>

          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text variant="titleLarge" style={{ color: '#4CAF50' }}>
                {stats.present}
              </Text>
              <Text variant="bodySmall">Có mặt</Text>
            </View>
            <View style={styles.statItem}>
              <Text variant="titleLarge" style={{ color: '#F44336' }}>
                {stats.absent}
              </Text>
              <Text variant="bodySmall">Vắng</Text>
            </View>
            <View style={styles.statItem}>
              <Text variant="titleLarge" style={{ color: '#FF9800' }}>
                {stats.late}
              </Text>
              <Text variant="bodySmall">Muộn</Text>
            </View>
            <View style={styles.statItem}>
              <Text variant="titleLarge" style={{ color: '#9E9E9E' }}>
                {stats.excused}
              </Text>
              <Text variant="bodySmall">Có phép</Text>
            </View>
          </View>

          <Divider style={styles.divider} />

          <View style={styles.rateContainer}>
            <Text variant="bodyMedium">Tỷ lệ tham dự:</Text>
            <Text variant="titleMedium" style={{ color: theme.colors.primary }}>
              {stats.rate.toFixed(1)}%
            </Text>
          </View>
        </Card.Content>
      </Card>

      <Text variant="titleMedium" style={styles.listTitle}>
        Lịch sử điểm danh ({attendance.length})
      </Text>

      {isLoading ? (
        <Text style={styles.emptyText}>Đang tải...</Text>
      ) : attendance.length === 0 ? (
        <Text style={styles.emptyText}>Chưa có dữ liệu điểm danh</Text>
      ) : (
        <FlatList
          data={attendance}
          keyExtractor={(item) => item.id}
          renderItem={renderAttendanceItem}
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
  divider: {
    marginVertical: 16,
  },
  rateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  listTitle: {
    marginBottom: 12,
  },
  listContainer: {
    paddingBottom: 80,
  },
  statusChip: {
    alignSelf: 'center',
  },
  emptyText: {
    textAlign: 'center',
    opacity: 0.6,
    marginTop: 32,
  },
});

export default AttendanceScreen;
