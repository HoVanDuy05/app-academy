import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { TextInput, Button, Text, useTheme, RadioButton } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from '@react-navigation/native';
import { useRegister } from '@hooks/useQueries';
import { registerSchema, type RegisterFormData } from '@utils/validation';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { AuthStackParamList } from '@navigation/AuthNavigator';

const RegisterScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: 'student',
    },
  });

  const registerMutation = useRegister({
    onSuccess: () => {
      navigation.navigate('Login');
    },
    onError: (error) => {
      console.error('Register error:', error);
    },
  });

  const onSubmit = (data: RegisterFormData) => {
    const { confirmPassword, ...registerData } = data;
    registerMutation.mutate(registerData);
  };

  return (
    <ScrollView style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>
        Đăng ký
      </Text>
      <Text variant="bodyMedium" style={styles.subtitle}>
        Tạo tài khoản mới
      </Text>

      <Controller
        control={control}
        name="lastName"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Họ"
            mode="outlined"
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
            error={!!errors.lastName}
            style={styles.input}
          />
        )}
      />
      {errors.lastName && (
        <Text style={[styles.errorText, { color: theme.colors.error }]}>
          {errors.lastName.message}
        </Text>
      )}

      <Controller
        control={control}
        name="firstName"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Tên"
            mode="outlined"
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
            error={!!errors.firstName}
            style={styles.input}
          />
        )}
      />
      {errors.firstName && (
        <Text style={[styles.errorText, { color: theme.colors.error }]}>
          {errors.firstName.message}
        </Text>
      )}

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

      <Controller
        control={control}
        name="confirmPassword"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Xác nhận mật khẩu"
            mode="outlined"
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
            error={!!errors.confirmPassword}
            style={styles.input}
            secureTextEntry
          />
        )}
      />
      {errors.confirmPassword && (
        <Text style={[styles.errorText, { color: theme.colors.error }]}>
          {errors.confirmPassword.message}
        </Text>
      )}

      <Text variant="bodyMedium" style={styles.roleLabel}>
        Vai trò:
      </Text>
      <Controller
        control={control}
        name="role"
        render={({ field: { onChange, value } }) => (
          <RadioButton.Group onValueChange={onChange} value={value}>
            <View style={styles.radioRow}>
              <RadioButton value="student" />
              <Text>Học sinh</Text>
            </View>
            <View style={styles.radioRow}>
              <RadioButton value="teacher" />
              <Text>Giáo viên</Text>
            </View>
          </RadioButton.Group>
        )}
      />

      <Button
        mode="contained"
        onPress={handleSubmit(onSubmit)}
        loading={registerMutation.isPending}
        disabled={registerMutation.isPending}
        style={styles.button}
      >
        Đăng ký
      </Button>

      <Button
        mode="text"
        onPress={() => navigation.navigate('Login')}
        style={styles.textButton}
      >
        Đã có tài khoản? Đăng nhập
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  title: {
    textAlign: 'center',
    marginBottom: 8,
    marginTop: 24,
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
  roleLabel: {
    marginTop: 16,
    marginBottom: 8,
  },
  radioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  button: {
    marginTop: 24,
    paddingVertical: 4,
  },
  textButton: {
    marginTop: 16,
    marginBottom: 32,
  },
});

export default RegisterScreen;
