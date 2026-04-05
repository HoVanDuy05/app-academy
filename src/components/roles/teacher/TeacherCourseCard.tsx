import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, Chip, Button, useTheme, Menu } from 'react-native-paper';

interface TeacherCourseCardProps {
  id: string;
  name: string;
  code: string;
  studentCount: number;
  maxStudents: number;
  pendingAssignments: number;
  onManageStudents?: () => void;
  onCreateAssignment?: () => void;
  onViewDetails?: () => void;
}

const TeacherCourseCard: React.FC<TeacherCourseCardProps> = ({
  name,
  code,
  studentCount,
  maxStudents,
  pendingAssignments,
  onManageStudents,
  onCreateAssignment,
  onViewDetails,
}) => {
  const theme = useTheme();
  const [menuVisible, setMenuVisible] = React.useState(false);

  return (
    <Card style={styles.container}>
      <Card.Content>
        <View style={styles.header}>
          <Chip compact style={styles.codeChip}>{code}</Chip>
          <Menu
            visible={menuVisible}
            onDismiss={() => setMenuVisible(false)}
            anchor={
              <Button 
                compact 
                icon="dots-vertical" 
                onPress={() => setMenuVisible(true)}
              >
                Tùy chọn
              </Button>
            }
          >
            <Menu.Item onPress={onManageStudents} title="Quản lý học sinh" leadingIcon="account-group" />
            <Menu.Item onPress={onCreateAssignment} title="Tạo bài tập" leadingIcon="plus" />
            <Menu.Item onPress={onViewDetails} title="Xem chi tiết" leadingIcon="eye" />
          </Menu>
        </View>

        <Text variant="titleMedium" style={styles.courseName}>{name}</Text>

        <View style={styles.statsRow}>
          <View style={styles.stat}>
            <Text variant="titleSmall">{studentCount}/{maxStudents}</Text>
            <Text variant="bodySmall">Học sinh</Text>
          </View>
          <View style={styles.stat}>
            <Text variant="titleSmall" style={{ color: pendingAssignments > 0 ? '#FF9800' : '#4CAF50' }}>
              {pendingAssignments}
            </Text>
            <Text variant="bodySmall">Bài cần chấm</Text>
          </View>
        </View>
      </Card.Content>
      <Card.Actions style={styles.actions}>
        <Button mode="text" onPress={onManageStudents} icon="account-group">
          Học sinh
        </Button>
        <Button mode="contained" onPress={onCreateAssignment} icon="plus">
          Tạo bài tập
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
    alignItems: 'center',
    marginBottom: 8,
  },
  codeChip: {
    backgroundColor: 'transparent',
  },
  courseName: {
    marginBottom: 12,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(0,0,0,0.02)',
    borderRadius: 8,
    paddingVertical: 12,
  },
  stat: {
    alignItems: 'center',
  },
  actions: {
    justifyContent: 'space-between',
  },
});

export default TeacherCourseCard;
