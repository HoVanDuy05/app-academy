import React from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Text, Card, Button, Avatar, TextInput, useTheme, List, Divider } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { MainTabParamList } from '@navigation/MainNavigator';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuthStore } from '@stores/index';
import { useGetMe } from '@hooks/useQueries';
import { profileSchema } from '@utils/validation';
import { getFullName, getInitials } from '@utils/helpers';
import { apiClient } from '@services/api';

interface ProfileFormData {
  firstName: string;
  lastName: string;
  phone?: string;
}

const ProfileScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<MainTabParamList>>();
  const { user, updateUser, logout } = useAuthStore();
  const [isEditing, setIsEditing] = React.useState(false);

  const { data: userData } = useGetMe();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProfileFormData>({
    resolver: yupResolver(profileSchema),
    defaultValues: {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      phone: user?.phone || '',
    },
  });

  React.useEffect(() => {
    if (user) {
      reset({
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone || '',
      });
    }
  }, [user, reset]);

  const onSubmit = async (data: ProfileFormData) => {
    try {
      const updatedUser = await apiClient.put<User>('/auth/profile', data);
      updateUser(updatedUser);
      setIsEditing(false);
      Alert.alert('Thành công', 'Cập nhật thông tin thành công');
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể cập nhật thông tin');
    }
  };

  const handleLogout = () => {
    Alert.alert('Đăng xuất', 'Bạn có chắc chắn muốn đăng xuất?', [
      { text: 'Hủy', style: 'cancel' },
      {
        text: 'Đăng xuất',
        style: 'destructive',
        onPress: () => logout(),
      },
    ]);
  };

  if (!user) {
    return (
      <View style={styles.centerContainer}>
        <Text>Không có thông tin người dùng</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Profile Header */}
      <Card style={styles.headerCard}>
        <Card.Content style={styles.headerContent}>
          <Avatar.Text
            size={80}
            label={getInitials(user.firstName, user.lastName)}
            style={{ backgroundColor: theme.colors.primary }}
          />
          <Text variant="headlineSmall" style={styles.name}>
            {getFullName(user.firstName, user.lastName)}
          </Text>
          <Text variant="bodyMedium" style={styles.email}>
            {user.email}
          </Text>
          <Chip
            style={[styles.roleChip, { backgroundColor: theme.colors.primaryContainer }]}
            textStyle={{ color: theme.colors.onPrimaryContainer }}
          >
            {user.role === 'student' ? 'Học sinh' : user.role === 'teacher' ? 'Giáo viên' : 'Admin'}
          </Chip>
        </Card.Content>
      </Card>

      {/* Profile Info */}
      <Card style={styles.infoCard}>
        <Card.Title
          title="Thông tin cá nhân"
          right={() =>
            isEditing ? (
              <View style={styles.editButtons}>
                <Button onPress={() => setIsEditing(false)} compact>
                  Hủy
                </Button>
                <Button mode="contained" onPress={handleSubmit(onSubmit)} compact>
                  Lưu
                </Button>
              </View>
            ) : (
              <Button mode="text" onPress={() => setIsEditing(true)} compact>
                Sửa
              </Button>
            )
          }
        />
        <Card.Content>
          {isEditing ? (
            <>
              <Controller
                control={control}
                name="lastName"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    label="Họ"
                    mode="outlined"
                    value={value}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    error={!!errors.lastName}
                    style={styles.input}
                  />
                )}
              />
              {errors.lastName && (
                <Text style={{ color: theme.colors.error }}>{errors.lastName.message}</Text>
              )}

              <Controller
                control={control}
                name="firstName"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    label="Tên"
                    mode="outlined"
                    value={value}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    error={!!errors.firstName}
                    style={styles.input}
                  />
                )}
              />
              {errors.firstName && (
                <Text style={{ color: theme.colors.error }}>{errors.firstName.message}</Text>
              )}

              <Controller
                control={control}
                name="phone"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    label="Số điện thoại"
                    mode="outlined"
                    value={value}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    error={!!errors.phone}
                    style={styles.input}
                    keyboardType="phone-pad"
                  />
                )}
              />
              {errors.phone && (
                <Text style={{ color: theme.colors.error }}>{errors.phone.message}</Text>
              )}
            </>
          ) : (
            <>
              <List.Item
                title="Họ và tên"
                description={getFullName(user.firstName, user.lastName)}
                left={(props) => <List.Icon {...props} icon="account" />}
              />
              <Divider />
              <List.Item
                title="Email"
                description={user.email}
                left={(props) => <List.Icon {...props} icon="email" />}
              />
              <Divider />
              <List.Item
                title="Số điện thoại"
                description={user.phone || 'Chưa cập nhật'}
                left={(props) => <List.Icon {...props} icon="phone" />}
              />
              <Divider />
              <List.Item
                title="Vai trò"
                description={
                  user.role === 'student' ? 'Học sinh' : user.role === 'teacher' ? 'Giáo viên' : 'Admin'
                }
                left={(props) => <List.Icon {...props} icon="badge-account" />}
              />
            </>
          )}
        </Card.Content>
      </Card>

      {/* Settings */}
      <Card style={styles.settingsCard}>
        <Card.Title title="Cài đặt" />
        <Card.Content>
          <List.Item
            title="Cài đặt chung"
            left={(props) => <List.Icon {...props} icon="cog" />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => navigation.navigate('Settings')}
          />
          <Divider />
          <List.Item
            title="Thông báo"
            left={(props) => <List.Icon {...props} icon="bell" />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => navigation.navigate('Notifications')}
          />
        </Card.Content>
      </Card>

      {/* Logout */}
      <Button
        mode="outlined"
        onPress={handleLogout}
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
    padding: 16,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerCard: {
    marginBottom: 16,
  },
  headerContent: {
    alignItems: 'center',
  },
  name: {
    marginTop: 16,
  },
  email: {
    opacity: 0.7,
    marginTop: 4,
  },
  roleChip: {
    marginTop: 12,
  },
  infoCard: {
    marginBottom: 16,
  },
  editButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    marginBottom: 12,
  },
  settingsCard: {
    marginBottom: 16,
  },
  logoutButton: {
    marginBottom: 32,
  },
});

// Thêm import Chip
import { Chip } from 'react-native-paper';
import { User } from '@/types';

export default ProfileScreen;
