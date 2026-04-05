import { apiClient } from '@services/api';
import type { User, Course, Assignment, Grade, Attendance, Enrollment } from '@/types';

export class AdminService {
  // Get admin dashboard data
  static async getDashboardData() {
    const [users, courses, stats] = await Promise.all([
      this.getAllUsers(),
      this.getAllCourses(),
      this.getStats(),
    ]);

    return {
      users,
      courses,
      stats,
    };
  }

  // Get all users
  static async getAllUsers(filters?: { role?: string; status?: string }): Promise<User[]> {
    const params = new URLSearchParams();
    if (filters?.role) params.append('role', filters.role);
    if (filters?.status) params.append('status', filters.status);

    return apiClient.get(`/admin/users?${params.toString()}`);
  }

  // Get all courses
  static async getAllCourses(): Promise<Course[]> {
    return apiClient.get('/admin/courses');
  }

  // Create user
  static async createUser(userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: 'student' | 'teacher' | 'admin';
  }): Promise<User> {
    return apiClient.post('/admin/users', userData);
  }

  // Update user
  static async updateUser(userId: string, userData: Partial<User>): Promise<User> {
    return apiClient.put(`/admin/users/${userId}`, userData);
  }

  // Toggle user status
  static async toggleUserStatus(userId: string): Promise<User> {
    return apiClient.patch(`/admin/users/${userId}/toggle-status`, {});
  }

  // Delete user
  static async deleteUser(userId: string): Promise<void> {
    return apiClient.delete(`/admin/users/${userId}`);
  }

  // Create course
  static async createCourse(courseData: {
    name: string;
    code: string;
    description: string;
    credits: number;
    maxStudents: number;
    teacherId: string;
    startDate: string;
    endDate: string;
  }): Promise<Course> {
    return apiClient.post('/admin/courses', courseData);
  }

  // Update course
  static async updateCourse(courseId: string, courseData: Partial<Course>): Promise<Course> {
    return apiClient.put(`/admin/courses/${courseId}`, courseData);
  }

  // Archive course
  static async archiveCourse(courseId: string): Promise<Course> {
    return apiClient.patch(`/admin/courses/${courseId}/archive`, {});
  }

  // Get admin stats
  static async getStats() {
    return apiClient.get('/admin/stats');
  }

  // Get audit logs
  static async getAuditLogs(limit: number = 50) {
    return apiClient.get(`/admin/audit-logs?limit=${limit}`);
  }

  // Get system settings
  static async getSystemSettings() {
    return apiClient.get('/admin/settings');
  }

  // Update system settings
  static async updateSystemSettings(settings: {
    maintenanceMode?: boolean;
    allowRegistration?: boolean;
    emailNotifications?: boolean;
    autoGrading?: boolean;
  }) {
    return apiClient.put('/admin/settings', settings);
  }

  // Get system health
  static async getSystemHealth() {
    return apiClient.get('/admin/health');
  }
}
