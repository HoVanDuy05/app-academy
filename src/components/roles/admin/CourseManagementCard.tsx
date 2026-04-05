import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, Button, Chip, useTheme, ProgressBar } from 'react-native-paper';

interface CourseManagementCardProps {
  id: string;
  name: string;
  code: string;
  teacherName: string;
  studentCount: number;
  maxStudents: number;
  status: 'active' | 'inactive' | 'archived';
  semester: string;
  onEdit?: () => void;
  onManageStudents?: () => void;
  onArchive?: () => void;
  onDelete?: () => void;
}

const CourseManagementCard: React.FC<CourseManagementCardProps> = ({
  name,
  code,
  teacherName,
  studentCount,
  maxStudents,
  status,
  semester,
  onEdit,
  onManageStudents,
  onArchive,
  onDelete,
}) => {
  const theme = useTheme();
  const occupancyRate = studentCount / maxStudents;

  const statusConfig = {
    active: { label: 'Đang mở', color: '#4CAF50' },
    inactive: { label: 'Đã đóng', color: '#9E9E9E' },
    archived: { label: 'Đã lưu trữ', color: '#FF9800' },
  };

  const config = statusConfig[status];

  return (
    <Card style={styles.container}>
      <Card.Content>
        <View style={styles.header}>
          <View>
            <Text variant="titleSmall">{name}</Text>
            <Text variant="bodySmall" style={styles.code}>{code} • {semester}</Text>
          </View>
          <Chip 
            compact 
            style={{ backgroundColor: config.color + '20' }}
            textStyle={{ color: config.color }}
          >
            {config.label}
          </Chip>
        </View>

        <Text variant="bodySmall" style={styles.teacher}>Giảng viên: {teacherName}</Text>

        <View style={styles.enrollmentSection}>
          <View style={styles.enrollmentHeader}>
            <Text variant="bodySmall">Tỷ lệ đăng ký</Text>
            <Text variant="bodySmall">{studentCount}/{maxStudents}</Text>
          </View>
          <ProgressBar
            progress={occupancyRate}
            color={occupancyRate >= 0.9 ? '#F44336' : occupancyRate >= 0.7 ? '#FF9800' : '#4CAF50'}
            style={styles.progressBar}
          />
        </View>
      </Card.Content>
      <Card.Actions style={styles.actions}>
        <Button mode="text" compact onPress={onEdit} icon="pencil">
          Sửa
        </Button>
        <Button mode="text" compact onPress={onManageStudents} icon="account-group">
          Học sinh
        </Button>
        <Button mode="text" compact onPress={onArchive} icon="archive">
          Lưu trữ
        </Button>
        <Button mode="text" compact onPress={onDelete} icon="delete" textColor="#F44336">
          Xóa
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
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  code: {
    opacity: 0.7,
    marginTop: 2,
  },
  teacher: {
    opacity: 0.8,
    marginBottom: 12,
  },
  enrollmentSection: {
    marginTop: 8,
  },
  enrollmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
  },
  actions: {
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
});

export default CourseManagementCard;
