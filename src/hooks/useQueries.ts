import { useQuery, useMutation, useQueryClient, type UseQueryOptions, type UseMutationOptions } from '@tanstack/react-query';
import { apiClient } from '@services/api';
import type {
  User,
  Course,
  Enrollment,
  Assignment,
  Submission,
  Grade,
  Attendance,
  Notification,
  PaginatedResponse,
  LoginCredentials,
  RegisterData,
  AuthTokens,
} from '@/types';

export const queryKeys = {
  auth: {
    me: ['auth', 'me'],
  },
  users: {
    all: ['users'],
    detail: (id: string) => ['users', id],
  },
  courses: {
    all: ['courses'],
    detail: (id: string) => ['courses', id],
    myCourses: ['courses', 'my'],
  },
  enrollments: {
    all: ['enrollments'],
    myEnrollments: ['enrollments', 'my'],
  },
  assignments: {
    all: ['assignments'],
    byCourse: (courseId: string) => ['assignments', 'course', courseId],
    detail: (id: string) => ['assignments', id],
  },
  submissions: {
    all: ['submissions'],
    byAssignment: (assignmentId: string) => ['submissions', 'assignment', assignmentId],
    mySubmissions: ['submissions', 'my'],
  },
  grades: {
    all: ['grades'],
    myGrades: ['grades', 'my'],
  },
  attendance: {
    all: ['attendance'],
    myAttendance: ['attendance', 'my'],
  },
  notifications: {
    all: ['notifications'],
    unread: ['notifications', 'unread'],
  },
};

export const useLogin = (options?: UseMutationOptions<AuthTokens, Error, LoginCredentials>) => {
  return useMutation({
    mutationFn: (credentials: LoginCredentials) => apiClient.post<AuthTokens>('/auth/login', credentials),
    ...options,
  });
};

export const useRegister = (options?: UseMutationOptions<User, Error, RegisterData>) => {
  return useMutation({
    mutationFn: (data: RegisterData) => apiClient.post<User>('/auth/register', data),
    ...options,
  });
};

export const useGetMe = (options?: UseQueryOptions<User, Error>) => {
  return useQuery({
    queryKey: queryKeys.auth.me,
    queryFn: () => apiClient.get<User>('/auth/me'),
    ...options,
  });
};

export const useGetCourses = (options?: UseQueryOptions<PaginatedResponse<Course>, Error>) => {
  return useQuery({
    queryKey: queryKeys.courses.all,
    queryFn: () => apiClient.get<PaginatedResponse<Course>>('/courses'),
    ...options,
  });
};

export const useGetCourse = (id: string, options?: UseQueryOptions<Course, Error>) => {
  return useQuery({
    queryKey: queryKeys.courses.detail(id),
    queryFn: () => apiClient.get<Course>(`/courses/${id}`),
    enabled: !!id,
    ...options,
  });
};

export const useGetMyCourses = (options?: UseQueryOptions<Course[], Error>) => {
  return useQuery({
    queryKey: queryKeys.courses.myCourses,
    queryFn: () => apiClient.get<Course[]>('/courses/my-courses'),
    ...options,
  });
};

export const useGetEnrollments = (options?: UseQueryOptions<PaginatedResponse<Enrollment>, Error>) => {
  return useQuery({
    queryKey: queryKeys.enrollments.all,
    queryFn: () => apiClient.get<PaginatedResponse<Enrollment>>('/enrollments'),
    ...options,
  });
};

export const useEnrollCourse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (courseId: string) => apiClient.post<Enrollment>('/enrollments', { courseId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.enrollments.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.courses.myCourses });
    },
  });
};

export const useGetAssignments = (courseId?: string, options?: UseQueryOptions<PaginatedResponse<Assignment>, Error>) => {
  return useQuery({
    queryKey: courseId ? queryKeys.assignments.byCourse(courseId) : queryKeys.assignments.all,
    queryFn: () => apiClient.get<PaginatedResponse<Assignment>>(courseId ? `/courses/${courseId}/assignments` : '/assignments'),
    ...options,
  });
};

export const useGetAssignment = (id: string, options?: UseQueryOptions<Assignment, Error>) => {
  return useQuery({
    queryKey: queryKeys.assignments.detail(id),
    queryFn: () => apiClient.get<Assignment>(`/assignments/${id}`),
    enabled: !!id,
    ...options,
  });
};

export const useSubmitAssignment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ assignmentId, data }: { assignmentId: string; data: Partial<Submission> }) =>
      apiClient.post<Submission>(`/assignments/${assignmentId}/submit`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.submissions.all });
    },
  });
};

export const useGetGrades = (options?: UseQueryOptions<PaginatedResponse<Grade>, Error>) => {
  return useQuery({
    queryKey: queryKeys.grades.all,
    queryFn: () => apiClient.get<PaginatedResponse<Grade>>('/grades'),
    ...options,
  });
};

export const useGetMyGrades = (options?: UseQueryOptions<Grade[], Error>) => {
  return useQuery({
    queryKey: queryKeys.grades.myGrades,
    queryFn: () => apiClient.get<Grade[]>('/grades/my-grades'),
    ...options,
  });
};

export const useGetAttendance = (options?: UseQueryOptions<PaginatedResponse<Attendance>, Error>) => {
  return useQuery({
    queryKey: queryKeys.attendance.all,
    queryFn: () => apiClient.get<PaginatedResponse<Attendance>>('/attendance'),
    ...options,
  });
};

export const useGetNotifications = (options?: UseQueryOptions<PaginatedResponse<Notification>, Error>) => {
  return useQuery({
    queryKey: queryKeys.notifications.all,
    queryFn: () => apiClient.get<PaginatedResponse<Notification>>('/notifications'),
    ...options,
  });
};

export const useMarkNotificationRead = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => apiClient.patch<Notification>(`/notifications/${id}/read`, {}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.notifications.all });
    },
  });
};
