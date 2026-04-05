// ============================================
// API CONFIGURATION
// ============================================

// Base URL for API - Change based on environment
export const API_BASE_URL = {
  DEVELOPMENT: 'http://localhost:3000/api/v1',
  STAGING: 'https://staging-api.academy-edu.com/api/v1',
  PRODUCTION: 'https://api.academy-edu.com/api/v1',
} as const;

// Current environment
export const CURRENT_ENV = 'DEVELOPMENT' as const;

// Active API URL
export const ACTIVE_API_URL = API_BASE_URL[CURRENT_ENV];

// API Endpoints
export const API_ENDPOINTS = {
  // Auth
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH_TOKEN: '/auth/refresh',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    PROFILE: '/auth/me',
    CHANGE_PASSWORD: '/auth/change-password',
  },
  
  // Student
  STUDENT: {
    COURSES: '/student/courses',
    ASSIGNMENTS: '/student/assignments',
    GRADES: '/student/grades',
    ATTENDANCE: '/student/attendance',
    ENROLL: '/student/enroll',
    SUBMIT_ASSIGNMENT: (id: string) => `/student/assignments/${id}/submit`,
    STATS: '/student/stats',
  },
  
  // Teacher
  TEACHER: {
    COURSES: '/teacher/courses',
    STUDENTS: '/teacher/students',
    ASSIGNMENTS: '/teacher/assignments',
    GRADES: '/teacher/grades',
    ATTENDANCE: '/teacher/attendance',
    STATS: '/teacher/stats',
  },
  
  // Admin
  ADMIN: {
    USERS: '/admin/users',
    COURSES: '/admin/courses',
    SETTINGS: '/admin/settings',
    STATS: '/admin/stats',
    AUDIT_LOGS: '/admin/audit-logs',
  },
  
  // Common
  COMMON: {
    NOTIFICATIONS: '/notifications',
    UPLOAD: '/upload',
  },
} as const;

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
} as const;

// Request Timeout
export const REQUEST_TIMEOUT = 30000; // 30 seconds
