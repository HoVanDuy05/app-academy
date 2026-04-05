import React from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { useTheme } from 'react-native-paper';

interface LoadingProps {
  message?: string;
  fullscreen?: boolean;
  size?: 'small' | 'large';
  color?: string;
}

export const Loading: React.FC<LoadingProps> = ({
  message,
  fullscreen = false,
  size = 'large',
  color,
}) => {
  const theme = useTheme();
  const indicatorColor = color || theme.colors.primary;

  const Container = fullscreen ? View : React.Fragment;
  const containerProps = fullscreen ? { style: styles.fullscreen } : {};

  return (
    <Container {...containerProps}>
      <View style={styles.container}>
        <ActivityIndicator size={size} color={indicatorColor} />
        {message && (
          <Text style={[styles.message, { color: theme.colors.onSurface }]}>
            {message}
          </Text>
        )}
      </View>
    </Container>
  );
};

// Loading overlay for full screen loading states
export const LoadingOverlay: React.FC<{ visible: boolean; message?: string }> = ({
  visible,
  message,
}) => {
  const theme = useTheme();

  if (!visible) return null;

  return (
    <View style={[styles.overlay, { backgroundColor: theme.colors.background + 'CC' }]}>
      <Loading message={message} size="large" />
    </View>
  );
};

// Skeleton loading placeholder
interface SkeletonProps {
  width?: number | string;
  height?: number;
  circle?: boolean;
  style?: any;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  width = '100%',
  height = 16,
  circle = false,
  style,
}) => {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.skeleton,
        {
          width,
          height,
          backgroundColor: theme.colors.surfaceDisabled,
          borderRadius: circle ? height / 2 : 4,
        },
        circle && { width: height },
        style,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  fullscreen: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  message: {
    marginTop: 12,
    fontSize: 14,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  skeleton: {
    overflow: 'hidden',
  },
});

export default Loading;
