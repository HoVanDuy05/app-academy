import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, List, Switch, useTheme } from 'react-native-paper';

interface SystemSettingsCardProps {
  maintenanceMode: boolean;
  allowRegistration: boolean;
  emailNotifications: boolean;
  autoGrading: boolean;
  onMaintenanceChange: (value: boolean) => void;
  onRegistrationChange: (value: boolean) => void;
  onEmailNotificationsChange: (value: boolean) => void;
  onAutoGradingChange: (value: boolean) => void;
}

const SystemSettingsCard: React.FC<SystemSettingsCardProps> = ({
  maintenanceMode,
  allowRegistration,
  emailNotifications,
  autoGrading,
  onMaintenanceChange,
  onRegistrationChange,
  onEmailNotificationsChange,
  onAutoGradingChange,
}) => {
  const theme = useTheme();

  const settings = [
    {
      title: 'Chế độ bảo trì',
      description: 'Chỉ admin mới có thể truy cập hệ thống',
      icon: 'wrench',
      value: maintenanceMode,
      onChange: onMaintenanceChange,
    },
    {
      title: 'Cho phép đăng ký',
      description: 'Cho phép người dùng mới đăng ký tài khoản',
      icon: 'account-plus',
      value: allowRegistration,
      onChange: onRegistrationChange,
    },
    {
      title: 'Thông báo email',
      description: 'Gửi thông báo qua email cho người dùng',
      icon: 'email',
      value: emailNotifications,
      onChange: onEmailNotificationsChange,
    },
    {
      title: 'Tự động chấm điểm',
      description: 'Tự động tính điểm trung bình và xếp loại',
      icon: 'calculator',
      value: autoGrading,
      onChange: onAutoGradingChange,
    },
  ];

  return (
    <Card style={styles.container}>
      <Card.Title title="Cài đặt hệ thống" />
      <Card.Content>
        {settings.map((setting, index) => (
          <List.Item
            key={index}
            title={setting.title}
            description={setting.description}
            left={(props) => <List.Icon {...props} icon={setting.icon} />}
            right={() => (
              <Switch value={setting.value} onValueChange={setting.onChange} />
            )}
          />
        ))}
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
});

export default SystemSettingsCard;
