import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { SafeAreaView as RNSafeAreaView, SafeAreaViewProps } from 'react-native-safe-area-context';
import { useTheme } from 'react-native-paper';

interface ScreenWrapperProps extends SafeAreaViewProps {
  children: React.ReactNode;
  style?: ViewStyle;
  edges?: Array<'top' | 'right' | 'bottom' | 'left'>;
  usePadding?: boolean;
  backgroundColor?: string;
}

export const SafeScreen: React.FC<ScreenWrapperProps> = ({
  children,
  style,
  edges = ['top', 'right', 'bottom', 'left'],
  usePadding = true,
  backgroundColor,
  ...props
}) => {
  const theme = useTheme();

  return (
    <RNSafeAreaView
      edges={edges}
      style={[
        styles.container,
        { backgroundColor: backgroundColor || theme.colors.background },
        usePadding && styles.padding,
        style,
      ]}
      {...props}
    >
      {children}
    </RNSafeAreaView>
  );
};

// SafeAreaView specifically for bottom navigation areas
export const SafeBottomView: React.FC<ScreenWrapperProps> = ({
  children,
  style,
  ...props
}) => {
  return (
    <SafeScreen edges={['bottom', 'left', 'right']} style={style} {...props}>
      {children}
    </SafeScreen>
  );
};

// SafeAreaView specifically for top header areas
export const SafeTopView: React.FC<ScreenWrapperProps> = ({
  children,
  style,
  ...props
}) => {
  return (
    <SafeScreen edges={['top', 'left', 'right']} style={style} {...props}>
      {children}
    </SafeScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  padding: {
    paddingHorizontal: 16,
  },
});

export default SafeScreen;
