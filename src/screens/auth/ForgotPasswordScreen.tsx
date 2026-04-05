import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text, useTheme } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from '@react-navigation/native';
import { forgotPasswordSchema } from '@utils/validation';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { AuthStackParamList } from '@navigation/AuthNavigator';
import { apiClient } from '@services/api';

interface ForgotPasswordForm {
  email: string;
}

const ForgotPasswordScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordForm>({
    resolver: yupResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: ForgotPasswordForm) => {
    setIsLoading(true);
    try {
      await apiClient.post('/auth/forgot-password', data);
      setIsSubmitted(true);
    } catch (error) {
      console.error('Forgot password error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <View style={styles.container}>
        <Text variant="headlineMedium" style={styles.title}>
          Kiểm tra email
        </Text>
        <Text variant="bodyMedium" style={styles.subtitle}>
          Chúng tôi đã gửi hướng dẫn đặt lại mật khẩu đến email của bạn.
        </Text>
        <Button mode="contained" onPress={() => navigation.navigate('Login')} style={styles.button}>
          Quay lại đăng nhập
        </Button>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>
        Quên mật khẩu
      </Text>
      <Text variant="bodyMedium" style={styles.subtitle}>
        Nhập email để nhận hướng dẫn đặt lại mật khẩu
      </Text>

      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Email"
            mode="outlined"
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
            error={!!errors.email}
            style={styles.input}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        )}
      />
      {errors.email && (
        <Text style={[styles.errorText, { color: theme.colors.error }]}>
          {errors.email.message}
        </Text>
      )}

      <Button
        mode="contained"
        onPress={handleSubmit(onSubmit)}
        loading={isLoading}
        disabled={isLoading}
        style={styles.button}
      >
        Gửi yêu cầu
      </Button>

      <Button mode="text" onPress={() => navigation.navigate('Login')} style={styles.textButton}>
        Quay lại đăng nhập
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 32,
    opacity: 0.7,
  },
  input: {
    marginBottom: 4,
  },
  errorText: {
    fontSize: 12,
    marginBottom: 12,
    marginLeft: 4,
  },
  button: {
    marginTop: 16,
    paddingVertical: 4,
  },
  textButton: {
    marginTop: 8,
  },
});

export default ForgotPasswordScreen;
