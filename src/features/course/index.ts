// ============================================
// COURSE FEATURE - Placeholder exports
// ============================================

// Screens - re-export from existing location
export { default as CoursesScreen } from '@/screens/courses/CoursesScreen';
export { default as CourseDetailScreen } from '@/screens/courses/CourseDetailScreen';

// Hooks placeholder
export const useCourses = () => ({ data: null, isLoading: false });
export const useCourseDetail = (id: string) => ({ data: null, isLoading: false });
export const useEnrollCourse = () => ({ mutateAsync: async () => { } });

// Components placeholder
export const CourseCard = () => null;
export const CourseList = () => null;
export const EnrollmentButton = () => null;

// Services placeholder
export const courseService = {
    getAll: async () => [],
    getById: async (id: string) => null,
    enroll: async (courseId: string) => { },
};

// Types placeholder
export type Course = { id: string; name: string; code: string };
export type CourseFilter = { status?: string; search?: string };
export type EnrollmentStatus = 'pending' | 'enrolled' | 'completed';
