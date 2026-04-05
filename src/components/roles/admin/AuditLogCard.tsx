import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, Chip, Avatar, useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface AuditLogCardProps {
  id: string;
  userName: string;
  userRole: string;
  action: string;
  target: string;
  timestamp: string;
  ipAddress?: string;
  status: 'success' | 'failed' | 'warning';
}

const AuditLogCard: React.FC<AuditLogCardProps> = ({
  userName,
  userRole,
  action,
  target,
  timestamp,
  ipAddress,
  status,
}) => {
  const theme = useTheme();

  const statusConfig = {
    success: { icon: 'check-circle', color: '#4CAF50', label: 'Thành công' },
    failed: { icon: 'close-circle', color: '#F44336', label: 'Thất bại' },
    warning: { icon: 'alert', color: '#FF9800', label: 'Cảnh báo' },
  };

  const config = statusConfig[status];

  const actionLabels: Record<string, string> = {
    'CREATE': 'Tạo mới',
    'UPDATE': 'Cập nhật',
    'DELETE': 'Xóa',
    'LOGIN': 'Đăng nhập',
    'LOGOUT': 'Đăng xuất',
    'GRADE': 'Chấm điểm',
    'ENROLL': 'Đăng ký',
  };

  return (
    <Card style={styles.container}>
      <Card.Content>
        <View style={styles.header}>
          <View style={styles.userInfo}>
            <Avatar.Text
              size={36}
              label={userName.charAt(0).toUpperCase()}
              style={{ backgroundColor: theme.colors.primary }}
            />
            <View style={styles.nameSection}>
              <Text variant="bodyMedium" style={styles.userName}>{userName}</Text>
              <Chip compact style={styles.roleChip}>{userRole}</Chip>
            </View>
          </View>
          <Chip 
            compact 
            style={{ backgroundColor: config.color + '20' }}
            textStyle={{ color: config.color }}
            icon={() => <Icon name={config.icon} size={14} color={config.color} />}
          >
            {config.label}
          </Chip>
        </View>

        <View style={styles.actionSection}>
          <Text variant="bodyMedium">
            <Text style={styles.action}>{actionLabels[action] || action}</Text>
            {' '}→{' '}
            <Text style={styles.target}>{target}</Text>
          </Text>
        </View>

        <View style={styles.footer}>
          <Text variant="bodySmall" style={styles.timestamp}>{timestamp}</Text>
          {ipAddress && (
            <Text variant="bodySmall" style={styles.ip}>IP: {ipAddress}</Text>
          )}
        </View>
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
    marginBottom: 12,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  nameSection: {
    marginLeft: 10,
  },
  userName: {
    fontWeight: '500',
  },
  roleChip: {
    marginTop: 2,
    alignSelf: 'flex-start',
  },
  actionSection: {
    backgroundColor: 'rgba(0,0,0,0.02)',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  action: {
    fontWeight: '600',
    color: '#2196F3',
  },
  target: {
    opacity: 0.8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timestamp: {
    opacity: 0.6,
  },
  ip: {
    opacity: 0.6,
  },
});

export default AuditLogCard;
