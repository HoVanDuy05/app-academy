import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@services/api';
import type { User, Course, Assignment, Grade, Attendance } from '@/types';

// Query Keys
export const teacherKeys = {
  myCourses: ['teacher', 'courses'],
  myStudents: ['teacher', 'students'],
  courseStudents: (courseId: string) => ['teacher', 'course', courseId, 'students'],
  courseAssignments: (courseId: string) => ['teacher', 'course', courseId, 'assignments'],
  submissions: (assignmentId: string) => ['teacher', 'submissions', assignmentId],
  stats: ['teacher', 'stats'],
};

// Get teacher's courses
export const useTeacherCourses = () => {
  return useQuery({
    queryKey: teacherKeys.myCourses,
    queryFn: async () => {
      return await apiClient.get<Course[]>('/teacher/courses');
    },
  });
};

// Get students in a course
export const useCourseStudents = (courseId: string) => {
  return useQuery({
    queryKey: teacherKeys.courseStudents(courseId),
    queryFn: async () => {
      return await apiClient.get<User[]>(`/teacher/courses/${courseId}/students`);
    },
    enabled: !!courseId,
  });
};

// Create assignment
export const useCreateAssignment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (assignmentData: {
      courseId: string;
      title: string;
      description: string;
      dueDate: string;
      maxScore: number;
      type: 'homework' | 'quiz' | 'exam' | 'project';
    }) => {
      return await apiClient.post<Assignment>('/teacher/assignments', assignmentData);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: teacherKeys.courseAssignments(variables.courseId)
      });
    },
  });
};

// Get submissions for grading
export const useSubmissionsForGrading = (assignmentId: string) => {
  return useQuery({
    queryKey: teacherKeys.submissions(assignmentId),
    queryFn: async () => {
      return await apiClient.get(`/teacher/assignments/${assignmentId}/submissions`);
    },
    enabled: !!assignmentId,
  });
};

// Submit grade
export const useSubmitGrade = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (gradeData: {
      studentId: string;
      assignmentId: string;
      courseId: string;
      score: number;
      feedback?: string;
    }) => {
      return await apiClient.post<Grade>('/teacher/grades', gradeData);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: teacherKeys.submissions(variables.assignmentId)
      });
    },
  });
};

// Record attendance
export const useRecordAttendance = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (attendanceData: {
      courseId: string;
      date: string;
      records: Array<{
        studentId: string;
        status: 'present' | 'absent' | 'late' | 'excused';
        notes?: string;
      }>;
    }) => {
      return await apiClient.post<Attendance[]>('/teacher/attendance', attendanceData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teacher', 'attendance'] });
    },
  });
};

// Get teacher stats
export const useTeacherStats = () => {
  return useQuery({
    queryKey: teacherKeys.stats,
    queryFn: async () => {
      return await apiClient.get<{
        totalCourses: number;
        totalStudents: number;
        pendingGrading: number;
        averageClassScore: number;
      }>('/teacher/stats');
    },
  });
};

// Get student grades for a course
export const useStudentGradesForCourse = (courseId: string, studentId: string) => {
  return useQuery({
    queryKey: ['teacher', 'grades', courseId, studentId],
    queryFn: async () => {
      return await apiClient.get<Grade[]>(`/teacher/courses/${courseId}/students/${studentId}/grades`);
    },
    enabled: !!courseId && !!studentId,
  });
};

// Get student attendance for a course
export const useStudentAttendanceForCourse = (courseId: string, studentId: string) => {
  return useQuery({
    queryKey: ['teacher', 'attendance', courseId, studentId],
    queryFn: async () => {
      return await apiClient.get<Attendance[]>(`/teacher/courses/${courseId}/students/${studentId}/attendance`);
    },
    enabled: !!courseId && !!studentId,
  });
};
