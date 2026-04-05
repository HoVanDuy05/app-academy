import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Import config routes
import { TEACHER_ROUTES, SHARED_ROUTES } from '@config/routes';

// Import Teacher Screens
import {
  TeacherDashboardScreen,
  TeacherCoursesScreen,
  TeacherCourseStudentsScreen,
  TeacherAssignmentsScreen,
  TeacherGradingScreen,
  TeacherAttendanceScreen,
} from '@screens/roles/teacher';

// Import Shared Screens
import { NotificationsScreen, ProfileScreen, SettingsScreen } from '@screens/index';

// Teacher Stack Navigator
const TeacherStack = createNativeStackNavigator();

const TeacherStackNavigator = () => (
  <TeacherStack.Navigator screenOptions={{ headerShown: false }}>
    <TeacherStack.Screen 
      name={TEACHER_ROUTES.DASHBOARD} 
      component={TeacherDashboardScreen} 
    />
    <TeacherStack.Screen 
      name={TEACHER_ROUTES.COURSE_STUDENTS} 
      component={TeacherCourseStudentsScreen} 
      options={{ headerShown: true, title: 'Quản lý học sinh' }}
    />
    <TeacherStack.Screen 
      name={TEACHER_ROUTES.ASSIGNMENTS} 
      component={TeacherAssignmentsScreen} 
      options={{ headerShown: true, title: 'Bài tập' }}
    />
    <TeacherStack.Screen 
      name={TEACHER_ROUTES.ATTENDANCE} 
      component={TeacherAttendanceScreen} 
      options={{ headerShown: true, title: 'Điểm danh' }}
    />
    <TeacherStack.Screen 
      name={SHARED_ROUTES.NOTIFICATIONS} 
      component={NotificationsScreen} 
      options={{ headerShown: true, title: 'Thông báo' }}
    />
    <TeacherStack.Screen 
      name={SHARED_ROUTES.SETTINGS} 
      component={SettingsScreen} 
      options={{ headerShown: true, title: 'Cài đặt' }}
    />
    <TeacherStack.Screen 
      name={SHARED_ROUTES.PROFILE} 
      component={ProfileScreen} 
      options={{ headerShown: true, title: 'Hồ sơ' }}
    />
  </TeacherStack.Navigator>
);

// Teacher Tab Navigator
const TeacherTab = createBottomTabNavigator();

const TeacherLayout = () => {
  const theme = useTheme();
  
  return (
    <TeacherTab.Navigator
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.onSurfaceDisabled,
        headerShown: false,
      }}
    >
      <TeacherTab.Screen
        name={TEACHER_ROUTES.HOME}
        component={TeacherStackNavigator}
        options={{
          tabBarIcon: ({ color, size }) => <Icon name="home" size={size} color={color} />,
          tabBarLabel: 'Trang chủ',
        }}
      />
      <TeacherTab.Screen
        name={TEACHER_ROUTES.COURSES}
        component={TeacherCoursesScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Icon name="school" size={size} color={color} />,
          tabBarLabel: 'Khóa học',
          headerShown: true,
          title: 'Khóa học',
        }}
      />
      <TeacherTab.Screen
        name={TEACHER_ROUTES.GRADING}
        component={TeacherGradingScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Icon name="clipboard-check" size={size} color={color} />,
          tabBarLabel: 'Chấm điểm',
          headerShown: true,
          title: 'Chấm điểm',
        }}
      />
      <TeacherTab.Screen
        name={TEACHER_ROUTES.PROFILE}
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Icon name="account" size={size} color={color} />,
          tabBarLabel: 'Hồ sơ',
          headerShown: true,
          title: 'Hồ sơ',
        }}
      />
    </TeacherTab.Navigator>
  );
};

export default TeacherLayout;
