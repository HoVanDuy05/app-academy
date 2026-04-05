import React from 'react';
import { View, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { Text, useTheme, Avatar as PaperAvatar } from 'react-native-paper';
import type { Props as PaperAvatarProps } from 'react-native-paper/lib/typescript/components/Avatar/AvatarText';

interface AvatarProps extends Omit<PaperAvatarProps, 'size' | 'label'> {
  name?: string;
  size?: 'small' | 'medium' | 'large' | number;
  style?: ViewStyle;
}

export const Avatar: React.FC<AvatarProps> = ({
  name,
  size = 'medium',
  style,
  ...props
}) => {
  const theme = useTheme();

  const getSize = () => {
    switch (size) {
      case 'small':
        return 32;
      case 'medium':
        return 48;
      case 'large':
        return 64;
      default:
        return size;
    }
  };

  const avatarSize = getSize();

  // Get initials from name
  const getInitials = (fullName?: string) => {
    if (!fullName) return '?';
    return fullName
      .split(' ')
      .map((n) => n[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();
  };

  return (
    <PaperAvatar.Text
      size={avatarSize}
      label={getInitials(name)}
      style={[styles.avatar, { backgroundColor: theme.colors.primary }, style]}
      {...props}
    />
  );
};

interface AvatarWithNameProps extends AvatarProps {
  showName?: boolean;
  textStyle?: TextStyle;
  vertical?: boolean;
}

export const AvatarWithName: React.FC<AvatarWithNameProps> = ({
  name,
  showName = true,
  textStyle,
  vertical = false,
  ...props
}) => {
  return (
    <View style={[styles.container, vertical && styles.vertical]}>
      <Avatar name={name} {...props} />
      {showName && name && (
        <Text variant="bodySmall" style={[styles.name, textStyle]}>
          {name}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  vertical: {
    flexDirection: 'column',
  },
  avatar: {
    marginRight: 8,
  },
  name: {
    marginLeft: 4,
  },
});

export default Avatar;
