import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@services/api';
import type { Course, User, Assignment, Grade, Attendance, Enrollment } from '@/types';

// Query Keys
export const studentKeys = {
  myCourses: ['student', 'courses'],
  myEnrollments: ['student', 'enrollments'],
  myAssignments: ['student', 'assignments'],
  myGrades: ['student', 'grades'],
  myAttendance: ['student', 'attendance'],
  courseDetail: (id: string) => ['student', 'course', id],
  assignmentDetail: (id: string) => ['student', 'assignment', id],
};

// Get student's enrolled courses
export const useStudentCourses = () => {
  return useQuery({
    queryKey: studentKeys.myCourses,
    queryFn: async () => {
      return await apiClient.get<Course[]>('/student/courses');
    },
  });
};

// Get student's assignments
export const useStudentAssignments = (status?: 'pending' | 'completed' | 'overdue') => {
  return useQuery({
    queryKey: [...studentKeys.myAssignments, { status }],
    queryFn: async () => {
      const params = status ? `?status=${status}` : '';
      return await apiClient.get<Assignment[]>(`/student/assignments${params}`);
    },
  });
};

// Get student's grades
export const useStudentGrades = () => {
  return useQuery({
    queryKey: studentKeys.myGrades,
    queryFn: async () => {
      return await apiClient.get<Grade[]>('/student/grades');
    },
  });
};

// Get student's attendance
export const useStudentAttendance = () => {
  return useQuery({
    queryKey: studentKeys.myAttendance,
    queryFn: async () => {
      return await apiClient.get<Attendance[]>('/student/attendance');
    },
  });
};

// Enroll in a course
export const useEnrollCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (courseId: string) => {
      return await apiClient.post<Enrollment>('/student/enroll', { courseId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: studentKeys.myCourses });
      queryClient.invalidateQueries({ queryKey: studentKeys.myEnrollments });
    },
  });
};

// Submit assignment
export const useSubmitAssignment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ assignmentId, content, attachments }: {
      assignmentId: string;
      content: string;
      attachments?: string[];
    }) => {
      return await apiClient.post(`/student/assignments/${assignmentId}/submit`, {
        content,
        attachments,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: studentKeys.myAssignments });
    },
  });
};

// Get dashboard stats
export const useStudentStats = () => {
  return useQuery({
    queryKey: ['student', 'stats'],
    queryFn: async () => {
      return await apiClient.get<{
        totalCourses: number;
        completedAssignments: number;
        pendingAssignments: number;
        averageGrade: number;
        attendanceRate: number;
      }>('/student/stats');
    },
  });
};
