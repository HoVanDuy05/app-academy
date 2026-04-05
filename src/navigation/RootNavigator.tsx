import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

// Import layouts
import { StudentLayout, TeacherLayout, AdminLayout } from '@layouts/index';
import AuthNavigator from '@navigation/AuthNavigator';
import { LoadingScreen } from '@layouts/index';

// Import stores and hooks
import { useAuthStore } from '@stores/index';
import { useUserProfile } from '@hooks/useAuthWithRole';

// Root navigator that handles role-based layout switching
const RootNavigator = () => {
  const { isAuthenticated, user, isLoading: authLoading, tokens } = useAuthStore();

  // Fetch user profile when authenticated but user data is missing
  const {
    refetch: fetchProfile,
    isLoading: profileLoading,
    isError: profileError,
  } = useUserProfile();

  React.useEffect(() => {
    // If we have tokens but no user data, fetch profile
    if (isAuthenticated && tokens && !user && !authLoading) {
      fetchProfile();
    }
  }, [isAuthenticated, tokens, user, authLoading, fetchProfile]);

  // Show loading while checking auth or fetching profile
  if (authLoading || profileLoading) {
    return <LoadingScreen message="Đang kiểm tra đăng nhập..." />;
  }

  // Not authenticated - show auth flow
  if (!isAuthenticated || !tokens) {
    return (
      <NavigationContainer>
        <AuthNavigator />
      </NavigationContainer>
    );
  }

  // Authenticated - show role-based layout
  const role = user?.role;

  switch (role) {
    case 'student':
      return (
        <NavigationContainer>
          <StudentLayout />
        </NavigationContainer>
      );
    case 'teacher':
      return (
        <NavigationContainer>
          <TeacherLayout />
        </NavigationContainer>
      );
    case 'admin':
      return (
        <NavigationContainer>
          <AdminLayout />
        </NavigationContainer>
      );
    default:
      // If role is unknown, default to student or show error
      return (
        <NavigationContainer>
          <StudentLayout />
        </NavigationContainer>
      );
  }
};

export default RootNavigator;
