// ============================================
// ROUTE CONFIGURATION - Centralized route constants
// ============================================

// Auth Routes
export const AUTH_ROUTES = {
  LOGIN: 'Login',
  REGISTER: 'Register',
  FORGOT_PASSWORD: 'ForgotPassword',
  RESET_PASSWORD: 'ResetPassword',
} as const;

// Student Routes
export const STUDENT_ROUTES = {
  // Main tabs
  HOME: 'StudentHome',
  COURSES: 'StudentCourses',
  ASSIGNMENTS: 'StudentAssignments',
  PROFILE: 'StudentProfile',
  
  // Stack screens
  DASHBOARD: 'StudentDashboard',
  COURSE_DETAIL: 'StudentCourseDetail',
  GRADES: 'StudentGrades',
  ATTENDANCE: 'StudentAttendance',
  ASSIGNMENT_DETAIL: 'StudentAssignmentDetail',
  NOTIFICATIONS: 'StudentNotifications',
  SETTINGS: 'StudentSettings',
} as const;

// Teacher Routes
export const TEACHER_ROUTES = {
  // Main tabs
  HOME: 'TeacherHome',
  COURSES: 'TeacherCourses',
  GRADING: 'TeacherGrading',
  PROFILE: 'TeacherProfile',
  
  // Stack screens
  DASHBOARD: 'TeacherDashboard',
  COURSE_STUDENTS: 'TeacherCourseStudents',
  CREATE_ASSIGNMENT: 'CreateAssignment',
  ASSIGNMENTS: 'TeacherAssignments',
  ATTENDANCE: 'TeacherAttendance',
  NOTIFICATIONS: 'TeacherNotifications',
  SETTINGS: 'TeacherSettings',
} as const;

// Admin Routes
export const ADMIN_ROUTES = {
  // Main tabs
  HOME: 'AdminHome',
  USERS: 'AdminUsers',
  COURSES: 'AdminCourses',
  PROFILE: 'AdminProfile',
  
  // Stack screens
  DASHBOARD: 'AdminDashboard',
  USER_MANAGEMENT: 'AdminUserManagement',
  COURSE_MANAGEMENT: 'AdminCourseManagement',
  SYSTEM_SETTINGS: 'AdminSystemSettings',
  AUDIT_LOGS: 'AdminAuditLogs',
  NOTIFICATIONS: 'AdminNotifications',
  SETTINGS: 'AdminSettings',
} as const;

// Shared Routes (available to all roles)
export const SHARED_ROUTES = {
  NOTIFICATIONS: 'Notifications',
  SETTINGS: 'Settings',
  PROFILE: 'Profile',
  CHANGE_PASSWORD: 'ChangePassword',
  EDIT_PROFILE: 'EditProfile',
} as const;

// Layout types
export const LAYOUT_TYPES = {
  AUTH: 'AuthLayout',
  STUDENT: 'StudentLayout',
  TEACHER: 'TeacherLayout',
  ADMIN: 'AdminLayout',
} as const;

// Route groups by role
export const ROLE_ROUTES = {
  STUDENT: STUDENT_ROUTES,
  TEACHER: TEACHER_ROUTES,
  ADMIN: ADMIN_ROUTES,
} as const;

// Type definitions
export type AuthRoute = typeof AUTH_ROUTES[keyof typeof AUTH_ROUTES];
export type StudentRoute = typeof STUDENT_ROUTES[keyof typeof STUDENT_ROUTES];
export type TeacherRoute = typeof TEACHER_ROUTES[keyof typeof TEACHER_ROUTES];
export type AdminRoute = typeof ADMIN_ROUTES[keyof typeof ADMIN_ROUTES];
export type SharedRoute = typeof SHARED_ROUTES[keyof typeof SHARED_ROUTES];
export type LayoutType = typeof LAYOUT_TYPES[keyof typeof LAYOUT_TYPES];
