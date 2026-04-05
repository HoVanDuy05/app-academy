// ============================================
// APP CONSTANTS - No hardcoding in components
// ============================================

// App Info
export const APP_NAME = 'Academy Edu';
export const APP_VERSION = '1.0.0';
export const APP_PACKAGE = 'com.academyedu.mobile';

// API Constants
export const API_CONFIG = {
  BASE_URL: process.env.EXPO_PUBLIC_API_URL || 'https://api.academy-edu.com/v1',
  TIMEOUT: 30000,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,
} as const;

// Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: '@auth_token',
  REFRESH_TOKEN: '@refresh_token',
  USER_DATA: '@user_data',
  THEME: '@theme',
  LANGUAGE: '@language',
  NOTIFICATIONS: '@notifications',
  LAST_SYNC: '@last_sync',
} as const;

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 20,
  MAX_LIMIT: 100,
} as const;

// Date Formats
export const DATE_FORMATS = {
  DISPLAY: 'DD/MM/YYYY',
  DISPLAY_WITH_TIME: 'DD/MM/YYYY HH:mm',
  ISO: 'YYYY-MM-DD',
  ISO_WITH_TIME: 'YYYY-MM-DDTHH:mm:ss',
} as const;

// User Roles
export const USER_ROLES = {
  STUDENT: 'student',
  TEACHER: 'teacher',
  ADMIN: 'admin',
} as const;

// Assignment Status
export const ASSIGNMENT_STATUS = {
  PENDING: 'pending',
  SUBMITTED: 'submitted',
  GRADED: 'graded',
  OVERDUE: 'overdue',
} as const;

// Attendance Status
export const ATTENDANCE_STATUS = {
  PRESENT: 'present',
  ABSENT: 'absent',
  LATE: 'late',
  EXCUSED: 'excused',
} as const;

// Colors (additional to theme)
export const COLORS = {
  SUCCESS: '#4CAF50',
  ERROR: '#F44336',
  WARNING: '#FF9800',
  INFO: '#2196F3',
  GRAY: '#9E9E9E',
  LIGHT_GRAY: '#F5F5F5',
  DARK_GRAY: '#424242',
} as const;

// Notification Channels (Android)
export const NOTIFICATION_CHANNELS = {
  GENERAL: 'general',
  GRADES: 'grades',
  ASSIGNMENTS: 'assignments',
  ATTENDANCE: 'attendance',
  ANNOUNCEMENTS: 'announcements',
} as const;

// Animation Durations
export const ANIMATION = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
} as const;

// Timeouts
export const TIMEOUTS = {
  DEBOUNCE: 300,
  THROTTLE: 1000,
  TOAST: 3000,
  SESSION: 30 * 60 * 1000, // 30 minutes
} as const;

// Route Names
export const ROUTES = {
  // Auth
  LOGIN: 'Login',
  REGISTER: 'Register',
  FORGOT_PASSWORD: 'ForgotPassword',
  
  // Main Tabs
  HOME_TAB: 'HomeTab',
  COURSES_TAB: 'CoursesTab',
  ASSIGNMENTS_TAB: 'AssignmentsTab',
  GRADES_TAB: 'GradesTab',
  PROFILE_TAB: 'ProfileTab',
  
  // Screens
  COURSE_DETAIL: 'CourseDetail',
  ASSIGNMENT_DETAIL: 'AssignmentDetail',
  NOTIFICATIONS: 'Notifications',
  SETTINGS: 'Settings',
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Không thể kết nối đến máy chủ. Vui lòng kiểm tra kết nối mạng.',
  UNAUTHORIZED: 'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.',
  FORBIDDEN: 'Bạn không có quyền truy cập tính năng này.',
  NOT_FOUND: 'Không tìm thấy dữ liệu.',
  SERVER_ERROR: 'Đã có lỗi xảy ra. Vui lòng thử lại sau.',
  UNKNOWN_ERROR: 'Đã có lỗi không xác định.',
} as const;

// Validation Rules
export const VALIDATION = {
  MIN_PASSWORD_LENGTH: 6,
  MAX_PASSWORD_LENGTH: 50,
  MIN_NAME_LENGTH: 2,
  MAX_NAME_LENGTH: 100,
  PHONE_REGEX: /^[0-9]{10,11}$/,
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
} as const;
