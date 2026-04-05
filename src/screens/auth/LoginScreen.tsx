import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text, useTheme } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from '@react-navigation/native';
import { useAuthStore } from '@stores/index';
import { useLogin } from '@hooks/useQueries';
import { loginSchema, type LoginFormData } from '@utils/validation';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { AuthStackParamList } from '@navigation/AuthNavigator';

const LoginScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  const { login } = useAuthStore();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const loginMutation = useLogin({
    onSuccess: (data, variables) => {
      // Sau khi đăng nhập thành công, gọi API lấy thông tin user
      // login(user, data);
    },
    onError: (error) => {
      console.error('Login error:', error);
    },
  });

  const onSubmit = (data: LoginFormData) => {
    loginMutation.mutate(data);
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>
        Đăng nhập
      </Text>
      <Text variant="bodyMedium" style={styles.subtitle}>
        Chào mừng đến với Academy Edu
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

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Mật khẩu"
            mode="outlined"
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
            error={!!errors.password}
            style={styles.input}
            secureTextEntry
          />
        )}
      />
      {errors.password && (
        <Text style={[styles.errorText, { color: theme.colors.error }]}>
          {errors.password.message}
        </Text>
      )}

      <Button
        mode="contained"
        onPress={handleSubmit(onSubmit)}
        loading={loginMutation.isPending}
        disabled={loginMutation.isPending}
        style={styles.button}
      >
        Đăng nhập
      </Button>

      <Button
        mode="text"
        onPress={() => navigation.navigate('ForgotPassword')}
        style={styles.textButton}
      >
        Quên mật khẩu?
      </Button>

      <Button
        mode="text"
        onPress={() => navigation.navigate('Register')}
        style={styles.textButton}
      >
        Chưa có tài khoản? Đăng ký
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

export default LoginScreen;
