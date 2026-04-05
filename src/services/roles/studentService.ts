import { apiClient } from '@services/api';
import type { Course, Assignment, Grade, Attendance, Enrollment } from '@/types';

export class StudentService {
  // Get student's dashboard data
  static async getDashboardData() {
    const [courses, assignments, grades, attendance] = await Promise.all([
      this.getMyCourses(),
      this.getMyAssignments(),
      this.getMyGrades(),
      this.getMyAttendance(),
    ]);

    return {
      courses,
      assignments,
      grades,
      attendance,
      stats: {
        totalCourses: courses.length,
        completedAssignments: assignments.filter(a => a.isSubmitted).length,
        pendingAssignments: assignments.filter(a => !a.isSubmitted && !a.isOverdue).length,
        averageGrade: grades.length > 0
          ? grades.reduce((sum, g) => sum + (g.score / g.maxScore) * 100, 0) / grades.length
          : 0,
        attendanceRate: attendance.length > 0
          ? (attendance.filter(a => a.status === 'present').length / attendance.length) * 100
          : 0,
      },
    };
  }

  // Get enrolled courses
  static async getMyCourses(): Promise<Course[]> {
    return apiClient.get('/student/courses');
  }

  // Get assignments
  static async getMyAssignments(): Promise<(Assignment & { isSubmitted: boolean; isOverdue: boolean })[]> {
    return apiClient.get('/student/assignments');
  }

  // Get grades
  static async getMyGrades(): Promise<Grade[]> {
    return apiClient.get('/student/grades');
  }

  // Get attendance
  static async getMyAttendance(): Promise<Attendance[]> {
    return apiClient.get('/student/attendance');
  }

  // Enroll in a course
  static async enrollInCourse(courseId: string): Promise<Enrollment> {
    return apiClient.post('/student/enroll', { courseId });
  }

  // Submit assignment
  static async submitAssignment(
    assignmentId: string,
    data: { content: string; attachments?: string[] }
  ) {
    return apiClient.post(`/student/assignments/${assignmentId}/submit`, data);
  }

  // Get course progress
  static async getCourseProgress(courseId: string) {
    return apiClient.get(`/student/courses/${courseId}/progress`);
  }
}
