import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAuthStore } from '@stores/index';

// Import Student Screens
import {
  StudentDashboardScreen,
  StudentCoursesScreen,
  StudentCourseDetailScreen,
  StudentAssignmentsScreen,
  StudentGradesScreen,
  StudentAttendanceScreen,
} from '@screens/roles/student';

// Import Teacher Screens
import {
  TeacherDashboardScreen,
  TeacherCoursesScreen,
  TeacherCourseStudentsScreen,
  TeacherAssignmentsScreen,
  TeacherGradingScreen,
  TeacherAttendanceScreen,
} from '@screens/roles/teacher';

// Import Admin Screens
import {
  AdminDashboardScreen,
  AdminUserManagementScreen,
  AdminCourseManagementScreen,
  AdminSystemSettingsScreen,
  AdminAuditLogsScreen,
} from '@screens/roles/admin';

// Import shared screens
import { NotificationsScreen, ProfileScreen, SettingsScreen } from '@screens/index';

// ==================== STUDENT NAVIGATOR ====================
export type StudentStackParamList = {
  StudentDashboard: undefined;
  StudentCourses: undefined;
  StudentCourseDetail: { courseId: string };
  StudentAssignments: undefined;
  StudentGrades: undefined;
  StudentAttendance: undefined;
  Notifications: undefined;
  Profile: undefined;
  Settings: undefined;
};

const StudentStack = createNativeStackNavigator<StudentStackParamList>();

const StudentNavigator = () => (
  <StudentStack.Navigator screenOptions={{ headerShown: false }}>
    <StudentStack.Screen name="StudentDashboard" component={StudentDashboardScreen} />
    <StudentStack.Screen name="StudentCourses" component={StudentCoursesScreen} options={{ headerShown: true, title: 'Khóa học' }} />
    <StudentStack.Screen name="StudentCourseDetail" component={StudentCourseDetailScreen} options={{ headerShown: true, title: 'Chi tiết' }} />
    <StudentStack.Screen name="StudentAssignments" component={StudentAssignmentsScreen} options={{ headerShown: true, title: 'Bài tập' }} />
    <StudentStack.Screen name="StudentGrades" component={StudentGradesScreen} options={{ headerShown: true, title: 'Điểm số' }} />
    <StudentStack.Screen name="StudentAttendance" component={StudentAttendanceScreen} options={{ headerShown: true, title: 'Điểm danh' }} />
    <StudentStack.Screen name="Notifications" component={NotificationsScreen} options={{ headerShown: true, title: 'Thông báo' }} />
    <StudentStack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: true, title: 'Hồ sơ' }} />
    <StudentStack.Screen name="Settings" component={SettingsScreen} options={{ headerShown: true, title: 'Cài đặt' }} />
  </StudentStack.Navigator>
);

// ==================== TEACHER NAVIGATOR ====================
export type TeacherStackParamList = {
  TeacherDashboard: undefined;
  TeacherCourses: undefined;
  TeacherCourseStudents: { courseId: string };
  TeacherAssignments: undefined;
  TeacherGrading: undefined;
  TeacherAttendance: undefined;
  Notifications: undefined;
  Profile: undefined;
  Settings: undefined;
};

const TeacherStack = createNativeStackNavigator<TeacherStackParamList>();

const TeacherNavigator = () => (
  <TeacherStack.Navigator screenOptions={{ headerShown: false }}>
    <TeacherStack.Screen name="TeacherDashboard" component={TeacherDashboardScreen} />
    <TeacherStack.Screen name="TeacherCourses" component={TeacherCoursesScreen} options={{ headerShown: true, title: 'Khóa học' }} />
    <TeacherStack.Screen name="TeacherCourseStudents" component={TeacherCourseStudentsScreen} options={{ headerShown: true, title: 'Học sinh' }} />
    <TeacherStack.Screen name="TeacherAssignments" component={TeacherAssignmentsScreen} options={{ headerShown: true, title: 'Bài tập' }} />
    <TeacherStack.Screen name="TeacherGrading" component={TeacherGradingScreen} options={{ headerShown: true, title: 'Chấm điểm' }} />
    <TeacherStack.Screen name="TeacherAttendance" component={TeacherAttendanceScreen} options={{ headerShown: true, title: 'Điểm danh' }} />
    <TeacherStack.Screen name="Notifications" component={NotificationsScreen} options={{ headerShown: true, title: 'Thông báo' }} />
    <TeacherStack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: true, title: 'Hồ sơ' }} />
    <TeacherStack.Screen name="Settings" component={SettingsScreen} options={{ headerShown: true, title: 'Cài đặt' }} />
  </TeacherStack.Navigator>
);

// ==================== ADMIN NAVIGATOR ====================
export type AdminStackParamList = {
  AdminDashboard: undefined;
  AdminUserManagement: undefined;
  AdminCourseManagement: undefined;
  AdminSystemSettings: undefined;
  AdminAuditLogs: undefined;
  Notifications: undefined;
  Profile: undefined;
  Settings: undefined;
};

const AdminStack = createNativeStackNavigator<AdminStackParamList>();

const AdminNavigator = () => (
  <AdminStack.Navigator screenOptions={{ headerShown: false }}>
    <AdminStack.Screen name="AdminDashboard" component={AdminDashboardScreen} />
    <AdminStack.Screen name="AdminUserManagement" component={AdminUserManagementScreen} options={{ headerShown: true, title: 'Quản lý Users' }} />
    <AdminStack.Screen name="AdminCourseManagement" component={AdminCourseManagementScreen} options={{ headerShown: true, title: 'Quản lý Khóa học' }} />
    <AdminStack.Screen name="AdminSystemSettings" component={AdminSystemSettingsScreen} options={{ headerShown: true, title: 'Cài đặt Hệ thống' }} />
    <AdminStack.Screen name="AdminAuditLogs" component={AdminAuditLogsScreen} options={{ headerShown: true, title: 'Audit Logs' }} />
    <AdminStack.Screen name="Notifications" component={NotificationsScreen} options={{ headerShown: true, title: 'Thông báo' }} />
    <AdminStack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: true, title: 'Hồ sơ' }} />
    <AdminStack.Screen name="Settings" component={SettingsScreen} options={{ headerShown: true, title: 'Cài đặt' }} />
  </AdminStack.Navigator>
);

// ==================== TAB NAVIGATORS ====================
type StudentTabParamList = {
  Home: undefined;
  Courses: undefined;
  Assignments: undefined;
  Profile: undefined;
};

const StudentTab = createBottomTabNavigator<StudentTabParamList>();

const StudentTabNavigator = () => {
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
        name="Home"
        component={StudentNavigator}
        options={{
          tabBarIcon: ({ color, size }) => <Icon name="home" size={size} color={color} />,
          tabBarLabel: 'Trang chủ',
        }}
      />
      <StudentTab.Screen
        name="Courses"
        component={StudentCoursesScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Icon name="school" size={size} color={color} />,
          tabBarLabel: 'Khóa học',
          headerShown: true,
          title: 'Khóa học',
        }}
      />
      <StudentTab.Screen
        name="Assignments"
        component={StudentAssignmentsScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Icon name="clipboard-text" size={size} color={color} />,
          tabBarLabel: 'Bài tập',
          headerShown: true,
          title: 'Bài tập',
        }}
      />
      <StudentTab.Screen
        name="Profile"
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

type TeacherTabParamList = {
  Home: undefined;
  Courses: undefined;
  Grading: undefined;
  Profile: undefined;
};

const TeacherTab = createBottomTabNavigator<TeacherTabParamList>();

const TeacherTabNavigator = () => {
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
        name="Home"
        component={TeacherNavigator}
        options={{
          tabBarIcon: ({ color, size }) => <Icon name="home" size={size} color={color} />,
          tabBarLabel: 'Trang chủ',
        }}
      />
      <TeacherTab.Screen
        name="Courses"
        component={TeacherCoursesScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Icon name="school" size={size} color={color} />,
          tabBarLabel: 'Khóa học',
          headerShown: true,
          title: 'Khóa học',
        }}
      />
      <TeacherTab.Screen
        name="Grading"
        component={TeacherGradingScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Icon name="clipboard-check" size={size} color={color} />,
          tabBarLabel: 'Chấm điểm',
          headerShown: true,
          title: 'Chấm điểm',
        }}
      />
      <TeacherTab.Screen
        name="Profile"
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

type AdminTabParamList = {
  Home: undefined;
  Users: undefined;
  Courses: undefined;
  Profile: undefined;
};

const AdminTab = createBottomTabNavigator<AdminTabParamList>();

const AdminTabNavigator = () => {
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
        name="Home"
        component={AdminNavigator}
        options={{
          tabBarIcon: ({ color, size }) => <Icon name="home" size={size} color={color} />,
          tabBarLabel: 'Trang chủ',
        }}
      />
      <AdminTab.Screen
        name="Users"
        component={AdminUserManagementScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Icon name="account-group" size={size} color={color} />,
          tabBarLabel: 'Users',
          headerShown: true,
          title: 'Quản lý Users',
        }}
      />
      <AdminTab.Screen
        name="Courses"
        component={AdminCourseManagementScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Icon name="school" size={size} color={color} />,
          tabBarLabel: 'Khóa học',
          headerShown: true,
          title: 'Quản lý Khóa học',
        }}
      />
      <AdminTab.Screen
        name="Profile"
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

// ==================== MAIN ROLE-BASED NAVIGATOR ====================
const RoleBasedNavigator = () => {
  const { user } = useAuthStore();
  const role = user?.role;

  // Return appropriate navigator based on user role
  switch (role) {
    case 'student':
      return <StudentTabNavigator />;
    case 'teacher':
      return <TeacherTabNavigator />;
    case 'admin':
      return <AdminTabNavigator />;
    default:
      return <StudentTabNavigator />; // Default to student view
  }
};

export default RoleBasedNavigator;
