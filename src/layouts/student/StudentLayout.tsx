import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Import config routes
import { STUDENT_ROUTES, SHARED_ROUTES } from '@config/routes';

// Import Student Screens
import {
  StudentDashboardScreen,
  StudentCoursesScreen,
  StudentCourseDetailScreen,
  StudentAssignmentsScreen,
  StudentGradesScreen,
  StudentAttendanceScreen,
} from '@screens/roles/student';

// Import Shared Screens
import { NotificationsScreen, ProfileScreen, SettingsScreen } from '@screens/index';

// Student Stack Navigator
const StudentStack = createNativeStackNavigator();

const StudentStackNavigator = () => (
  <StudentStack.Navigator screenOptions={{ headerShown: false }}>
    <StudentStack.Screen 
      name={STUDENT_ROUTES.DASHBOARD} 
      component={StudentDashboardScreen} 
    />
    <StudentStack.Screen 
      name={STUDENT_ROUTES.COURSE_DETAIL} 
      component={StudentCourseDetailScreen} 
      options={{ headerShown: true, title: 'Chi tiết khóa học' }}
    />
    <StudentStack.Screen 
      name={STUDENT_ROUTES.GRADES} 
      component={StudentGradesScreen} 
      options={{ headerShown: true, title: 'Điểm số' }}
    />
    <StudentStack.Screen 
      name={STUDENT_ROUTES.ATTENDANCE} 
      component={StudentAttendanceScreen} 
      options={{ headerShown: true, title: 'Điểm danh' }}
    />
    <StudentStack.Screen 
      name={SHARED_ROUTES.NOTIFICATIONS} 
      component={NotificationsScreen} 
      options={{ headerShown: true, title: 'Thông báo' }}
    />
    <StudentStack.Screen 
      name={SHARED_ROUTES.SETTINGS} 
      component={SettingsScreen} 
      options={{ headerShown: true, title: 'Cài đặt' }}
    />
    <StudentStack.Screen 
      name={SHARED_ROUTES.PROFILE} 
      component={ProfileScreen} 
      options={{ headerShown: true, title: 'Hồ sơ' }}
    />
  </StudentStack.Navigator>
);

// Student Tab Navigator
const StudentTab = createBottomTabNavigator();

const StudentLayout = () => {
  const theme = useTheme();
  
  return (
    <StudentTab.Navigator
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.onSurfaceDisabled,
        headerShown: false,
      }}
    >
      <StudentTab.Screen
        name={STUDENT_ROUTES.HOME}
        component={StudentStackNavigator}
        options={{
          tabBarIcon: ({ color, size }) => <Icon name="home" size={size} color={color} />,
          tabBarLabel: 'Trang chủ',
        }}
      />
      <StudentTab.Screen
        name={STUDENT_ROUTES.COURSES}
        component={StudentCoursesScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Icon name="school" size={size} color={color} />,
          tabBarLabel: 'Khóa học',
          headerShown: true,
          title: 'Khóa học',
        }}
      />
      <StudentTab.Screen
        name={STUDENT_ROUTES.ASSIGNMENTS}
        component={StudentAssignmentsScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Icon name="clipboard-text" size={size} color={color} />,
          tabBarLabel: 'Bài tập',
          headerShown: true,
          title: 'Bài tập',
        }}
      />
      <StudentTab.Screen
        name={STUDENT_ROUTES.PROFILE}
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Icon name="account" size={size} color={color} />,
          tabBarLabel: 'Hồ sơ',
          headerShown: true,
          title: 'Hồ sơ',
        }}
      />
    </StudentTab.Navigator>
  );
};

export default StudentLayout;
