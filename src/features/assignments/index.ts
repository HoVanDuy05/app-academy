// ============================================
// ASSIGNMENTS FEATURE - Placeholder exports
// ============================================

// Screens - re-export from existing location
export { default as AssignmentsScreen } from '@/screens/assignments/AssignmentsScreen';
export { default as AssignmentDetailScreen } from '@/screens/assignments/AssignmentDetailScreen';

// Hooks placeholder
export const useAssignments = () => ({ data: null, isLoading: false });
export const useAssignmentDetail = (id: string) => ({ data: null, isLoading: false });
export const useSubmitAssignment = () => ({ mutateAsync: async () => { } });

// Components placeholder
export const AssignmentCard = () => null;
export const AssignmentList = () => null;
export const SubmissionForm = () => null;

// Services placeholder
export const assignmentService = {
    getAll: async () => [],
    getById: async (id: string) => null,
    submit: async () => { },
};

// Types placeholder
export type Assignment = { id: string; title: string; dueDate: string };
export type Submission = { id: string; assignmentId: string; content: string };
export type AssignmentStatus = 'pending' | 'submitted' | 'graded';
