import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@services/api';
import type { User, Course } from '@/types';

// Query Keys
export const adminKeys = {
  users: ['admin', 'users'],
  courses: ['admin', 'courses'],
  stats: ['admin', 'stats'],
  auditLogs: ['admin', 'auditLogs'],
  systemSettings: ['admin', 'systemSettings'],
  userDetail: (id: string) => ['admin', 'user', id],
  courseDetail: (id: string) => ['admin', 'course', id],
};

// Get all users
export const useAdminUsers = (filters?: { role?: string; status?: string }) => {
  return useQuery({
    queryKey: [...adminKeys.users, { filters }],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (filters?.role) params.append('role', filters.role);
      if (filters?.status) params.append('status', filters.status);

      return await apiClient.get<User[]>(`/admin/users?${params.toString()}`);
    },
  });
};

// Get all courses
export const useAdminCourses = () => {
  return useQuery({
    queryKey: adminKeys.courses,
    queryFn: async () => {
      return await apiClient.get<Course[]>('/admin/courses');
    },
  });
};

// Create user
export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userData: {
      email: string;
      password: string;
      firstName: string;
      lastName: string;
      role: 'student' | 'teacher' | 'admin';
    }) => {
      return await apiClient.post<User>('/admin/users', userData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.users });
    },
  });
};

// Update user
export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ userId, userData }: {
      userId: string;
      userData: Partial<User>;
    }) => {
      return await apiClient.put<User>(`/admin/users/${userId}`, userData);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: adminKeys.users });
      queryClient.invalidateQueries({ queryKey: adminKeys.userDetail(variables.userId) });
    },
  });
};

// Toggle user status (active/inactive)
export const useToggleUserStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userId: string) => {
      return await apiClient.patch<User>(`/admin/users/${userId}/toggle-status`, {});
    },
    onSuccess: (_, userId) => {
      queryClient.invalidateQueries({ queryKey: adminKeys.users });
      queryClient.invalidateQueries({ queryKey: adminKeys.userDetail(userId) });
    },
  });
};

// Delete user
export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userId: string) => {
      await apiClient.delete(`/admin/users/${userId}`);
      return userId;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.users });
    },
  });
};

// Create course
export const useAdminCreateCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (courseData: {
      name: string;
      code: string;
      description: string;
      credits: number;
      maxStudents: number;
      teacherId: string;
      startDate: string;
      endDate: string;
    }) => {
      return await apiClient.post<Course>('/admin/courses', courseData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.courses });
    },
  });
};

// Update course
export const useAdminUpdateCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ courseId, courseData }: {
      courseId: string;
      courseData: Partial<Course>;
    }) => {
      return await apiClient.put<Course>(`/admin/courses/${courseId}`, courseData);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: adminKeys.courses });
      queryClient.invalidateQueries({ queryKey: adminKeys.courseDetail(variables.courseId) });
    },
  });
};

// Archive course
export const useArchiveCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (courseId: string) => {
      return await apiClient.patch<Course>(`/admin/courses/${courseId}/archive`, {});
    },
    onSuccess: (_, courseId) => {
      queryClient.invalidateQueries({ queryKey: adminKeys.courses });
      queryClient.invalidateQueries({ queryKey: adminKeys.courseDetail(courseId) });
    },
  });
};

// Get admin stats
export const useAdminStats = () => {
  return useQuery({
    queryKey: adminKeys.stats,
    queryFn: async () => {
      return await apiClient.get<{
        totalUsers: number;
        totalCourses: number;
        activeStudents: number;
        activeTeachers: number;
        systemUptime: string;
      }>('/admin/stats');
    },
  });
};

// Get audit logs
export const useAuditLogs = (limit: number = 50) => {
  return useQuery({
    queryKey: [...adminKeys.auditLogs, { limit }],
    queryFn: async () => {
      return await apiClient.get<Array<{
        id: string;
        userName: string;
        userRole: string;
        action: string;
        target: string;
        timestamp: string;
        ipAddress?: string;
        status: 'success' | 'failed' | 'warning';
      }>>(`/admin/audit-logs?limit=${limit}`);
    },
  });
};

// Update system settings
export const useUpdateSystemSettings = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (settings: {
      maintenanceMode?: boolean;
      allowRegistration?: boolean;
      emailNotifications?: boolean;
      autoGrading?: boolean;
    }) => {
      return await apiClient.put('/admin/settings', settings);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.systemSettings });
    },
  });
};

// Get system settings
export const useSystemSettings = () => {
  return useQuery({
    queryKey: adminKeys.systemSettings,
    queryFn: async () => {
      return await apiClient.get<{
        maintenanceMode: boolean;
        allowRegistration: boolean;
        emailNotifications: boolean;
        autoGrading: boolean;
      }>('/admin/settings');
    },
  });
};
