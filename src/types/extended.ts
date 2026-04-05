// ============================================
// EXTENDED TYPES for Role-based features
// ============================================

import { Course, Assignment, User } from './index';

// Extended Assignment with student-specific fields
export interface StudentAssignment extends Assignment {
  isSubmitted: boolean;
  isOverdue: boolean;
  submissionDate?: string;
  score?: number;
  feedback?: string;
}

// Extended Course with teacher-specific fields
export interface TeacherCourse extends Course {
  studentCount: number;
  pendingAssignments: number;
  averageScore: number;
}

// Extended Course with admin-specific fields
export interface AdminCourse extends Course {
  enrollmentRate: number;
  isArchived: boolean;
  semester: string;
}

// Extended User with admin-specific fields
export interface AdminUser extends User {
  isActive: boolean;
  lastLogin?: string;
  createdAt: string;
  loginCount: number;
}

// Student Stats
export interface StudentStats {
  totalCourses: number;
  completedAssignments: number;
  pendingAssignments: number;
  averageGrade: number;
  attendanceRate: number;
}

// Teacher Stats
export interface TeacherStats {
  totalCourses: number;
  totalStudents: number;
  pendingGrading: number;
  averageClassScore: number;
}

// Admin Stats
export interface AdminStats {
  totalUsers: number;
  totalCourses: number;
  activeStudents: number;
  activeTeachers: number;
  systemUptime: string;
}

// Audit Log Entry
export interface AuditLogEntry {
  id: string;
  userName: string;
  userRole: string;
  action: 'CREATE' | 'UPDATE' | 'DELETE' | 'LOGIN' | 'LOGOUT' | 'GRADE' | 'ENROLL';
  target: string;
  timestamp: string;
  ipAddress?: string;
  status: 'success' | 'failed' | 'warning';
}

// System Settings
export interface SystemSettings {
  maintenanceMode: boolean;
  allowRegistration: boolean;
  emailNotifications: boolean;
  autoGrading: boolean;
}

// Attendance Record for Teacher
export interface AttendanceRecord {
  studentId: string;
  firstName: string;
  lastName: string;
  status: 'present' | 'absent' | 'late' | 'excused' | null;
  notes?: string;
}

// Grade Input Data
export interface GradeInput {
  studentId: string;
  assignmentId: string;
  courseId: string;
  score: number;
  maxScore: number;
  feedback?: string;
}
