import React from 'react';
import { View, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { Text } from 'react-native-paper';
import { StudentAttendanceCard } from '@components/roles/student';
import { useStudentAttendance } from '@hooks/roles/student';
import { formatDate } from '@utils/helpers';

const StudentAttendanceScreen = () => {
  const { data: attendance, refetch, isLoading } = useStudentAttendance();

  const stats = React.useMemo(() => {
    if (!attendance) return { present: 0, absent: 0, late: 0, rate: 0 };
    const total = attendance.length;
    const present = attendance.filter((a) => a.status === 'present').length;
    const absent = attendance.filter((a) => a.status === 'absent').length;
    const late = attendance.filter((a) => a.status === 'late').length;
    return {
      present,
      absent,
      late,
      rate: total > 0 ? (present / total) * 100 : 0,
    };
  }, [attendance]);

  return (
    <View style={styles.container}>
      <View style={styles.statsRow}>
        <Text variant="titleMedium">Tỷ lệ chuyên cần: {stats.rate.toFixed(1)}%</Text>
      </View>

      <FlatList
        data={attendance}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <StudentAttendanceCard
            courseName={item.course?.name || 'Khóa học'}
            date={formatDate(item.date)}
            status={item.status}
            notes={item.notes}
          />
        )}
        contentContainerStyle={styles.listContainer}
        refreshControl={<RefreshControl refreshing={isLoading} onRefresh={refetch} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  statsRow: {
    marginBottom: 16,
  },
  listContainer: {
    paddingBottom: 80,
  },
});

export default StudentAttendanceScreen;
