export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'student' | 'teacher' | 'admin';
  avatar?: string;
  phone?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: 'student' | 'teacher';
}

export interface Course {
  id: string;
  name: string;
  description: string;
  code: string;
  credits: number;
  teacherId: string;
  teacher?: User;
  startDate: string;
  endDate: string;
  maxStudents: number;
  createdAt: string;
  updatedAt: string;
}

export interface ClassSchedule {
  id: string;
  courseId: string;
  course?: Course;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  room: string;
  createdAt: string;
  updatedAt: string;
}

export interface Enrollment {
  id: string;
  studentId: string;
  student?: User;
  courseId: string;
  course?: Course;
  status: 'pending' | 'active' | 'completed' | 'dropped';
  enrolledAt: string;
  completedAt?: string;
}

export interface Assignment {
  id: string;
  courseId: string;
  course?: Course;
  title: string;
  description: string;
  dueDate: string;
  maxScore: number;
  type: 'homework' | 'quiz' | 'exam' | 'project';
  isSubmitted?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Submission {
  id: string;
  assignmentId: string;
  assignment?: Assignment;
  studentId: string;
  student?: User;
  content: string;
  attachments?: string[];
  score?: number;
  feedback?: string;
  submittedAt: string;
  gradedAt?: string;
}

export interface Grade {
  id: string;
  studentId: string;
  student?: User;
  courseId: string;
  course?: Course;
  assignmentId?: string;
  assignment?: Assignment;
  score: number;
  maxScore: number;
  type: 'assignment' | 'midterm' | 'final' | 'participation';
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Attendance {
  id: string;
  studentId: string;
  student?: User;
  courseId: string;
  course?: Course;
  date: string;
  status: 'present' | 'absent' | 'late' | 'excused';
  notes?: string;
  createdAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  isRead: boolean;
  data?: Record<string, unknown>;
  createdAt: string;
}

export interface ApiError {
  message: string;
  code: string;
  statusCode: number;
  details?: Record<string, string[]>;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
