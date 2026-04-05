import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, Chip, Avatar, useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface StudentAttendanceCardProps {
  courseName: string;
  date: string;
  status: 'present' | 'absent' | 'late' | 'excused';
  notes?: string;
}

const StudentAttendanceCard: React.FC<StudentAttendanceCardProps> = ({
  courseName,
  date,
  status,
  notes,
}) => {
  const theme = useTheme();

  const statusConfig = {
    present: { 
      icon: 'check-circle', 
      label: 'Có mặt', 
      color: '#4CAF50',
      bgColor: '#E8F5E9'
    },
    absent: { 
      icon: 'close-circle', 
      label: 'Vắng', 
      color: '#F44336',
      bgColor: '#FFEBEE'
    },
    late: { 
      icon: 'clock-alert', 
      label: 'Muộn', 
      color: '#FF9800',
      bgColor: '#FFF3E0'
    },
    excused: { 
      icon: 'information', 
      label: 'Có phép', 
      color: '#9E9E9E',
      bgColor: '#F5F5F5'
    },
  };

  const config = statusConfig[status];

  return (
    <Card style={styles.container}>
      <Card.Content>
        <View style={styles.header}>
          <Text variant="titleSmall" style={styles.courseName}>{courseName}</Text>
          <Chip 
            style={[styles.statusChip, { backgroundColor: config.bgColor }]}
            textStyle={{ color: config.color }}
            icon={() => <Icon name={config.icon} size={16} color={config.color} />}
          >
            {config.label}
          </Chip>
        </View>
        
        <Text variant="bodySmall" style={styles.date}>{date}</Text>
        
        {notes && (
          <Text variant="bodySmall" style={styles.notes}>Ghi chú: {notes}</Text>
        )}
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  courseName: {
    flex: 1,
    marginRight: 8,
  },
  statusChip: {},
  date: {
    opacity: 0.6,
  },
  notes: {
    marginTop: 8,
    opacity: 0.8,
    fontStyle: 'italic',
  },
});

export default StudentAttendanceCard;
