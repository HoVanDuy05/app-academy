import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PaperProvider } from 'react-native-paper';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StatusBar } from 'react-native';
import AuthNavigator from '@navigation/AuthNavigator';
import RoleBasedNavigator from '@navigation/RoleBasedNavigator';
import { useAuthStore, useThemeStore } from '@stores/index';
import { customLightTheme, customDarkTheme } from '@theme/index';

// Create a client for React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

const AppContent = () => {
  const { isAuthenticated, setIsLoading } = useAuthStore();

  useEffect(() => {
    // Check if user is authenticated on app start
    const checkAuth = async () => {
      // You can add additional auth checks here
      setIsLoading(false);
    };
    checkAuth();
  }, [setIsLoading]);

  return isAuthenticated ? <RoleBasedNavigator /> : <AuthNavigator />;
};

const App = () => {
  const { isDarkMode } = useThemeStore();
  const theme = isDarkMode ? customDarkTheme : customLightTheme;

  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <PaperProvider theme={theme}>
          <NavigationContainer>
            <StatusBar
              barStyle={isDarkMode ? 'light-content' : 'dark-content'}
              backgroundColor={theme.colors.background}
            />
            <AppContent />
          </NavigationContainer>
        </PaperProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
};

export default App;
