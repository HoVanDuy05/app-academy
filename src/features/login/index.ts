// ============================================
// LOGIN FEATURE - Placeholder exports
// ============================================

// Screens - re-export from existing location
export { default as LoginScreen } from '@/screens/auth/LoginScreen';
export { default as RegisterScreen } from '@/screens/auth/RegisterScreen';
export { default as ForgotPasswordScreen } from '@/screens/auth/ForgotPasswordScreen';

// Hooks placeholder
export const useLogin = () => ({ mutateAsync: async () => { } });
export const useRegister = () => ({ mutateAsync: async () => { } });
export const useForgotPassword = () => ({ mutateAsync: async () => { } });

// Components placeholder
export const LoginForm = () => null;
export const RegisterForm = () => null;

// Services placeholder
export const authService = {
    login: async () => { },
    register: async () => { },
    forgotPassword: async () => { },
};

// Types placeholder
export type LoginCredentials = { email: string; password: string };
export type RegisterData = { email: string; password: string; name: string };
export type AuthResponse = { token: string; user: any };
