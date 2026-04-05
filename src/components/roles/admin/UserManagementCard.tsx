import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, Avatar, Button, Chip, useTheme } from 'react-native-paper';
import { getInitials, getFullName } from '@utils/helpers';

interface UserManagementCardProps {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'student' | 'teacher' | 'admin';
  isActive: boolean;
  lastLogin?: string;
  onEdit?: () => void;
  onToggleStatus?: () => void;
  onDelete?: () => void;
}

const UserManagementCard: React.FC<UserManagementCardProps> = ({
  firstName,
  lastName,
  email,
  role,
  isActive,
  lastLogin,
  onEdit,
  onToggleStatus,
  onDelete,
}) => {
  const theme = useTheme();
  const fullName = getFullName(firstName, lastName);

  const roleConfig = {
    student: { label: 'Học sinh', color: '#2196F3', icon: 'account-school' },
    teacher: { label: 'Giáo viên', color: '#FF9800', icon: 'teach' },
    admin: { label: 'Admin', color: '#F44336', icon: 'shield-account' },
  };

  const config = roleConfig[role];

  return (
    <Card style={[styles.container, !isActive && styles.inactive]}>
      <Card.Content>
        <View style={styles.header}>
          <Avatar.Text
            size={48}
            label={getInitials(firstName, lastName)}
            style={{ backgroundColor: config.color }}
          />
          <View style={styles.info}>
            <Text variant="titleSmall">{fullName}</Text>
            <Text variant="bodySmall" style={styles.email}>{email}</Text>
          </View>
          <Chip 
            compact 
            style={{ backgroundColor: config.color + '20' }}
            textStyle={{ color: config.color }}
          >
            {config.label}
          </Chip>
        </View>

        <View style={styles.statusRow}>
          <Chip 
            compact 
            style={isActive ? styles.activeChip : styles.inactiveChip}
            textStyle={{ color: isActive ? '#4CAF50' : '#9E9E9E' }}
          >
            {isActive ? 'Đang hoạt động' : 'Đã khóa'}
          </Chip>
          {lastLogin && (
            <Text variant="bodySmall" style={styles.lastLogin}>Last login: {lastLogin}</Text>
          )}
        </View>
      </Card.Content>
      <Card.Actions style={styles.actions}>
        <Button mode="text" compact onPress={onEdit} icon="pencil">
          Sửa
        </Button>
        <Button 
          mode="text" 
          compact 
          onPress={onToggleStatus} 
          icon={isActive ? 'lock' : 'lock-open'}
          textColor={isActive ? '#F44336' : '#4CAF50'}
        >
          {isActive ? 'Khóa' : 'Mở khóa'}
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
  inactive: {
    opacity: 0.7,
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
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  activeChip: {
    backgroundColor: '#E8F5E9',
  },
  inactiveChip: {
    backgroundColor: '#F5F5F5',
  },
  lastLogin: {
    opacity: 0.6,
  },
  actions: {
    justifyContent: 'space-between',
  },
});

export default UserManagementCard;
