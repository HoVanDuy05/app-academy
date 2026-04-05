// ============================================
// GRADES FEATURE - Placeholder exports
// ============================================

// Screens - re-export from existing location
export { default as GradesScreen } from '@/screens/grades/GradesScreen';

// Hooks placeholder
export const useGrades = () => ({ data: null, isLoading: false });
export const useGradeDetail = (id: string) => ({ data: null, isLoading: false });
export const useGradeStatistics = () => ({ data: null, isLoading: false });

// Components placeholder
export const GradeCard = () => null;
export const GradeChart = () => null;
export const GradeStatistics = () => null;

// Services placeholder
export const gradeService = {
    getAll: async () => [],
    getById: async (id: string) => null,
};

// Types placeholder
export type Grade = { id: string; score: number; courseId: string };
export type GradeFilter = { courseId?: string };
export type GradeStatistics = { average: number; highest: number; lowest: number };
