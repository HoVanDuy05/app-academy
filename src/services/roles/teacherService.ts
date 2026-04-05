import { apiClient } from '@services/api';
import type { Course, User, Assignment, Grade, Attendance } from '@/types';

export class TeacherService {
  // Get teacher's dashboard data
  static async getDashboardData() {
    const [courses, stats] = await Promise.all([
      this.getMyCourses(),
      this.getStats(),
    ]);

    return {
      courses,
      stats,
    };
  }

  // Get courses taught by teacher
  static async getMyCourses(): Promise<Course[]> {
    return apiClient.get('/teacher/courses');
  }

  // Get students in a course
  static async getCourseStudents(courseId: string): Promise<User[]> {
    return apiClient.get(`/teacher/courses/${courseId}/students`);
  }

  // Create assignment
  static async createAssignment(data: {
    courseId: string;
    title: string;
    description: string;
    dueDate: string;
    maxScore: number;
    type: 'homework' | 'quiz' | 'exam' | 'project';
  }): Promise<Assignment> {
    return apiClient.post('/teacher/assignments', data);
  }

  // Get submissions for grading
  static async getSubmissions(assignmentId: string) {
    return apiClient.get(`/teacher/assignments/${assignmentId}/submissions`);
  }

  // Submit grade
  static async submitGrade(data: {
    studentId: string;
    assignmentId: string;
    courseId: string;
    score: number;
    feedback?: string;
  }): Promise<Grade> {
    return apiClient.post('/teacher/grades', data);
  }

  // Record attendance
  static async recordAttendance(data: {
    courseId: string;
    date: string;
    records: Array<{
      studentId: string;
      status: 'present' | 'absent' | 'late' | 'excused';
      notes?: string;
    }>;
  }): Promise<Attendance[]> {
    return apiClient.post('/teacher/attendance', data);
  }

  // Get student grades
  static async getStudentGrades(courseId: string, studentId: string): Promise<Grade[]> {
    return apiClient.get(`/teacher/courses/${courseId}/students/${studentId}/grades`);
  }

  // Get student attendance
  static async getStudentAttendance(courseId: string, studentId: string): Promise<Attendance[]> {
    return apiClient.get(`/teacher/courses/${courseId}/students/${studentId}/attendance`);
  }

  // Get teacher stats
  static async getStats() {
    return apiClient.get('/teacher/stats');
  }

  // Get pending grading count
  static async getPendingGradingCount(): Promise<number> {
    return apiClient.get('/teacher/pending-grading-count');
  }
}
