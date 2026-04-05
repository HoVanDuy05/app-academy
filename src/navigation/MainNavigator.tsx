import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  HomeScreen,
  CoursesScreen,
  CourseDetailScreen,
  AssignmentsScreen,
  AssignmentDetailScreen,
  GradesScreen,
  AttendanceScreen,
  NotificationsScreen,
  ProfileScreen,
  SettingsScreen,
} from '@screens/index';

export type MainTabParamList = {
  HomeTab: undefined;
  CoursesTab: undefined;
  AssignmentsTab: undefined;
  GradesTab: undefined;
  ProfileTab: undefined;
  CourseDetail: { courseId: string };
  AssignmentDetail: { assignmentId: string };
  Notifications: undefined;
  Settings: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();
const Stack = createNativeStackNavigator<MainTabParamList>();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeTab" component={HomeScreen} options={{ title: 'Trang chủ' }} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} options={{ title: 'Thông báo' }} />
    </Stack.Navigator>
  );
};

const CoursesStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="CoursesTab" component={CoursesScreen} options={{ title: 'Khóa học' }} />
      <Stack.Screen name="CourseDetail" component={CourseDetailScreen} options={{ title: 'Chi tiết khóa học' }} />
    </Stack.Navigator>
  );
};

const AssignmentsStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="AssignmentsTab" component={AssignmentsScreen} options={{ title: 'Bài tập' }} />
      <Stack.Screen name="AssignmentDetail" component={AssignmentDetailScreen} options={{ title: 'Chi tiết bài tập' }} />
    </Stack.Navigator>
  );
};

const ProfileStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ProfileTab" component={ProfileScreen} options={{ title: 'Hồ sơ' }} />
      <Stack.Screen name="Settings" component={SettingsScreen} options={{ title: 'Cài đặt' }} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} options={{ title: 'Thông báo' }} />
    </Stack.Navigator>
  );
};

const MainNavigator = () => {
  const theme = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.onSurfaceDisabled,
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStack}
        options={{
          title: 'Trang chủ',
          tabBarIcon: ({ color, size }) => <Icon name="home" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="CoursesTab"
        component={CoursesStack}
        options={{
          title: 'Khóa học',
          tabBarIcon: ({ color, size }) => <Icon name="school" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="AssignmentsTab"
        component={AssignmentsStack}
        options={{
          title: 'Bài tập',
          tabBarIcon: ({ color, size }) => <Icon name="clipboard-text" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="GradesTab"
        component={GradesScreen}
        options={{
          title: 'Điểm số',
          tabBarIcon: ({ color, size }) => <Icon name="chart-line" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileStack}
        options={{
          title: 'Hồ sơ',
          tabBarIcon: ({ color, size }) => <Icon name="account" size={size} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default MainNavigator;
