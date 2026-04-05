import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, List, Switch, Divider, Button, useTheme } from 'react-native-paper';
import { useThemeStore, useAuthStore } from '@stores/index';

const SettingsScreen = () => {
  const theme = useTheme();
  const { isDarkMode, toggleTheme } = useThemeStore();
  const { logout } = useAuthStore();
  const [notifications, setNotifications] = React.useState(true);
  const [emailUpdates, setEmailUpdates] = React.useState(true);

  return (
    <ScrollView style={styles.container}>
      <Text variant="titleMedium" style={styles.sectionTitle}>
        Giao diện
      </Text>
      <List.Item
        title="Chế độ tối"
        description="Bật/tắt chế độ tối cho ứng dụng"
        left={(props) => <List.Icon {...props} icon="theme-light-dark" />}
        right={() => (
          <Switch value={isDarkMode} onValueChange={toggleTheme} />
        )}
      />

      <Divider style={styles.divider} />

      <Text variant="titleMedium" style={styles.sectionTitle}>
        Thông báo
      </Text>
      <List.Item
        title="Thông báo đẩy"
        description="Nhận thông báo từ ứng dụng"
        left={(props) => <List.Icon {...props} icon="bell" />}
        right={() => (
          <Switch value={notifications} onValueChange={setNotifications} />
        )}
      />
      <List.Item
        title="Cập nhật qua email"
        description="Nhận thông báo qua email"
        left={(props) => <List.Icon {...props} icon="email" />}
        right={() => (
          <Switch value={emailUpdates} onValueChange={setEmailUpdates} />
        )}
      />

      <Divider style={styles.divider} />

      <Text variant="titleMedium" style={styles.sectionTitle}>
        Tài khoản
      </Text>
      <List.Item
        title="Đổi mật khẩu"
        left={(props) => <List.Icon {...props} icon="lock" />}
        right={(props) => <List.Icon {...props} icon="chevron-right" />}
        onPress={() => {}}
      />
      <List.Item
        title="Quyền riêng tư"
        left={(props) => <List.Icon {...props} icon="shield-account" />}
        right={(props) => <List.Icon {...props} icon="chevron-right" />}
        onPress={() => {}}
      />

      <Divider style={styles.divider} />

      <Text variant="titleMedium" style={styles.sectionTitle}>
        Hỗ trợ
      </Text>
      <List.Item
        title="Trợ giúp & Hỗ trợ"
        left={(props) => <List.Icon {...props} icon="help-circle" />}
        right={(props) => <List.Icon {...props} icon="chevron-right" />}
        onPress={() => {}}
      />
      <List.Item
        title="Về ứng dụng"
        description="Phiên bản 1.0.0"
        left={(props) => <List.Icon {...props} icon="information" />}
        right={(props) => <List.Icon {...props} icon="chevron-right" />}
        onPress={() => {}}
      />

      <Button
        mode="outlined"
        onPress={() => logout()}
        style={styles.logoutButton}
        textColor={theme.colors.error}
        icon="logout"
      >
        Đăng xuất
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sectionTitle: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  divider: {
    marginVertical: 8,
  },
  logoutButton: {
    margin: 16,
    marginTop: 32,
  },
});

export default SettingsScreen;
