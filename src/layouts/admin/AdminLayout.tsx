import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Import config routes
import { ADMIN_ROUTES, SHARED_ROUTES } from '@config/routes';

// Import Admin Screens
import {
  AdminDashboardScreen,
  AdminUserManagementScreen,
  AdminCourseManagementScreen,
  AdminSystemSettingsScreen,
  AdminAuditLogsScreen,
} from '@screens/roles/admin';

// Import Shared Screens
import { NotificationsScreen, ProfileScreen, SettingsScreen } from '@screens/index';

// Admin Stack Navigator
const AdminStack = createNativeStackNavigator();

const AdminStackNavigator = () => (
  <AdminStack.Navigator screenOptions={{ headerShown: false }}>
    <AdminStack.Screen 
      name={ADMIN_ROUTES.DASHBOARD} 
      component={AdminDashboardScreen} 
    />
    <AdminStack.Screen 
      name={ADMIN_ROUTES.USER_MANAGEMENT} 
      component={AdminUserManagementScreen} 
      options={{ headerShown: true, title: 'Quản lý Users' }}
    />
    <AdminStack.Screen 
      name={ADMIN_ROUTES.COURSE_MANAGEMENT} 
      component={AdminCourseManagementScreen} 
      options={{ headerShown: true, title: 'Quản lý Khóa học' }}
    />
    <AdminStack.Screen 
      name={ADMIN_ROUTES.SYSTEM_SETTINGS} 
      component={AdminSystemSettingsScreen} 
      options={{ headerShown: true, title: 'Cài đặt Hệ thống' }}
    />
    <AdminStack.Screen 
      name={ADMIN_ROUTES.AUDIT_LOGS} 
      component={AdminAuditLogsScreen} 
      options={{ headerShown: true, title: 'Audit Logs' }}
    />
    <AdminStack.Screen 
      name={SHARED_ROUTES.NOTIFICATIONS} 
      component={NotificationsScreen} 
      options={{ headerShown: true, title: 'Thông báo' }}
    />
    <AdminStack.Screen 
      name={SHARED_ROUTES.SETTINGS} 
      component={SettingsScreen} 
      options={{ headerShown: true, title: 'Cài đặt' }}
    />
    <AdminStack.Screen 
      name={SHARED_ROUTES.PROFILE} 
      component={ProfileScreen} 
      options={{ headerShown: true, title: 'Hồ sơ' }}
    />
  </AdminStack.Navigator>
);

// Admin Tab Navigator
const AdminTab = createBottomTabNavigator();

const AdminLayout = () => {
  const theme = useTheme();
  
  return (
    <AdminTab.Navigator
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.onSurfaceDisabled,
        headerShown: false,
      }}
    >
      <AdminTab.Screen
        name={ADMIN_ROUTES.HOME}
        component={AdminStackNavigator}
        options={{
          tabBarIcon: ({ color, size }) => <Icon name="home" size={size} color={color} />,
          tabBarLabel: 'Trang chủ',
        }}
      />
      <AdminTab.Screen
        name={ADMIN_ROUTES.USERS}
        component={AdminUserManagementScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Icon name="account-group" size={size} color={color} />,
          tabBarLabel: 'Users',
          headerShown: true,
          title: 'Quản lý Users',
        }}
      />
      <AdminTab.Screen
        name={ADMIN_ROUTES.COURSES}
        component={AdminCourseManagementScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Icon name="school" size={size} color={color} />,
          tabBarLabel: 'Khóa học',
          headerShown: true,
          title: 'Quản lý Khóa học',
        }}
      />
      <AdminTab.Screen
        name={ADMIN_ROUTES.PROFILE}
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Icon name="account" size={size} color={color} />,
          tabBarLabel: 'Hồ sơ',
          headerShown: true,
          title: 'Hồ sơ',
        }}
      />
    </AdminTab.Navigator>
  );
};

export default AdminLayout;
