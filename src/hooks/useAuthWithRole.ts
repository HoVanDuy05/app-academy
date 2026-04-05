import { useMutation, useQuery } from '@tanstack/react-query';
import { apiClient } from '@services/api';
import { useAuthStore } from '@stores/index';
import type { User, AuthTokens } from '@/types';

// Hook to fetch user profile and determine role
export const useUserProfile = () => {
  const { setUser } = useAuthStore();

  return useQuery({
    queryKey: ['auth', 'profile'],
    queryFn: async () => {
      const user = await apiClient.get<User>('/auth/me');
      setUser(user);
      return user;
    },
    enabled: false, // Don't run automatically, only when called
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Hook to login and then fetch profile
export const useLoginWithProfile = () => {
  const { login } = useAuthStore();

  return useMutation({
    mutationFn: async (credentials: { email: string; password: string }) => {
      // Step 1: Login
      const tokens = await apiClient.post<AuthTokens>('/auth/login', credentials);

      // Step 2: Get user profile to determine role
      const user = await apiClient.get<User>('/auth/me');

      // Step 3: Save auth state with user and tokens
      login(user, tokens);

      return { user, tokens };
    },
  });
};

// Hook to check role and return appropriate layout type
export const useRoleBasedLayout = () => {
  const { user, isAuthenticated } = useAuthStore();

  const getLayoutType = () => {
    if (!isAuthenticated || !user) return 'auth';

    switch (user.role) {
      case 'student':
        return 'student';
      case 'teacher':
        return 'teacher';
      case 'admin':
        return 'admin';
      default:
        return 'student';
    }
  };

  return {
    layoutType: getLayoutType(),
    role: user?.role,
    isAuthenticated,
    user,
  };
};
