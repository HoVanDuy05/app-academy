import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Card, Text, Button, Chip, useTheme, Checkbox } from 'react-native-paper';
import { formatDate, getDayOfWeekName } from '@utils/helpers';

interface StudentAttendance {
  id: string;
  firstName: string;
  lastName: string;
  status: 'present' | 'absent' | 'late' | 'excused' | null;
}

interface AttendanceManagerProps {
  courseName: string;
  date: string;
  students: StudentAttendance[];
  onStatusChange: (studentId: string, status: 'present' | 'absent' | 'late' | 'excused') => void;
  onSave: () => void;
  onCancel: () => void;
}

const AttendanceManager: React.FC<AttendanceManagerProps> = ({
  courseName,
  date,
  students,
  onStatusChange,
  onSave,
  onCancel,
}) => {
  const theme = useTheme();

  const statusConfig = {
    present: { label: 'Có mặt', color: '#4CAF50' },
    absent: { label: 'Vắng', color: '#F44336' },
    late: { label: 'Muộn', color: '#FF9800' },
    excused: { label: 'Có phép', color: '#9E9E9E' },
  };

  const renderStudentItem = ({ item }: { item: StudentAttendance }) => (
    <Card style={styles.studentCard}>
      <Card.Content>
        <View style={styles.studentHeader}>
          <Text variant="titleSmall">{item.lastName} {item.firstName}</Text>
          {item.status && (
            <Chip 
              compact 
              style={{ backgroundColor: statusConfig[item.status].color + '20' }}
              textStyle={{ color: statusConfig[item.status].color }}
            >
              {statusConfig[item.status].label}
            </Chip>
          )}
        </View>
        
        <View style={styles.statusButtons}>
          {(Object.keys(statusConfig) as Array<keyof typeof statusConfig>).map((status) => (
            <Button
              key={status}
              mode={item.status === status ? 'contained' : 'outlined'}
              compact
              onPress={() => onStatusChange(item.id, status)}
              buttonColor={item.status === status ? statusConfig[status].color : undefined}
              textColor={item.status === status ? '#fff' : statusConfig[status].color}
              style={styles.statusButton}
            >
              {statusConfig[status].label}
            </Button>
          ))}
        </View>
      </Card.Content>
    </Card>
  );

  const stats = {
    present: students.filter(s => s.status === 'present').length,
    absent: students.filter(s => s.status === 'absent').length,
    late: students.filter(s => s.status === 'late').length,
    excused: students.filter(s => s.status === 'excused').length,
    unmarked: students.filter(s => !s.status).length,
  };

  return (
    <View style={styles.container}>
      <Card style={styles.headerCard}>
        <Card.Content>
          <Text variant="titleMedium">{courseName}</Text>
          <Text variant="bodyMedium">{formatDate(date)} - {getDayOfWeekName(new Date(date).getDay())}</Text>
          
          <View style={styles.statsRow}>
            <Chip compact style={[styles.statChip, { backgroundColor: '#E8F5E9' }]} textStyle={{ color: '#4CAF50' }}>
              Có mặt: {stats.present}
            </Chip>
            <Chip compact style={[styles.statChip, { backgroundColor: '#FFEBEE' }]} textStyle={{ color: '#F44336' }}>
              Vắng: {stats.absent}
            </Chip>
            <Chip compact style={[styles.statChip, { backgroundColor: '#FFF3E0' }]} textStyle={{ color: '#FF9800' }}>
              Muộn: {stats.late}
            </Chip>
            <Chip compact style={[styles.statChip, { backgroundColor: '#F5F5F5' }]} textStyle={{ color: '#9E9E9E' }}>
              Phép: {stats.excused}
            </Chip>
          </View>
          
          {stats.unmarked > 0 && (
            <Text variant="bodySmall" style={styles.unmarkedText}>
              Còn {stats.unmarked} học sinh chưa điểm danh
            </Text>
          )}
        </Card.Content>
      </Card>

      <FlatList
        data={students}
        keyExtractor={(item) => item.id}
        renderItem={renderStudentItem}
        contentContainerStyle={styles.listContainer}
      />

      <View style={styles.bottomActions}>
        <Button mode="outlined" onPress={onCancel} style={styles.actionButton}>
          Hủy
        </Button>
        <Button 
          mode="contained" 
          onPress={onSave} 
          style={styles.actionButton}
          disabled={stats.unmarked > 0}
        >
          Lưu điểm danh
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerCard: {
    margin: 16,
    marginBottom: 8,
  },
  statsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 12,
  },
  statChip: {},
  unmarkedText: {
    marginTop: 8,
    color: '#FF9800',
  },
  listContainer: {
    padding: 16,
    paddingTop: 8,
    paddingBottom: 80,
  },
  studentCard: {
    marginBottom: 8,
  },
  studentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  statusButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  statusButton: {
    flex: 1,
    minWidth: 70,
  },
  bottomActions: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  actionButton: {
    flex: 1,
  },
});

export default AttendanceManager;
