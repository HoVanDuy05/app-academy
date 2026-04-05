import * as yup from 'yup';

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email('Email không hợp lệ')
    .required('Vui lòng nhập email'),
  password: yup
    .string()
    .min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
    .required('Vui lòng nhập mật khẩu'),
});

export const registerSchema = yup.object().shape({
  firstName: yup
    .string()
    .min(2, 'Tên phải có ít nhất 2 ký tự')
    .max(50, 'Tên không được quá 50 ký tự')
    .required('Vui lòng nhập tên'),
  lastName: yup
    .string()
    .min(2, 'Họ phải có ít nhất 2 ký tự')
    .max(50, 'Họ không được quá 50 ký tự')
    .required('Vui lòng nhập họ'),
  email: yup
    .string()
    .email('Email không hợp lệ')
    .required('Vui lòng nhập email'),
  password: yup
    .string()
    .min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
    .matches(/[A-Z]/, 'Mật khẩu phải chứa ít nhất 1 chữ hoa')
    .matches(/[a-z]/, 'Mật khẩu phải chứa ít nhất 1 chữ thường')
    .matches(/[0-9]/, 'Mật khẩu phải chứa ít nhất 1 số')
    .required('Vui lòng nhập mật khẩu'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Mật khẩu xác nhận không khớp')
    .required('Vui lòng xác nhận mật khẩu'),
  role: yup
    .mixed<'student' | 'teacher'>()
    .oneOf(['student', 'teacher'])
    .required('Vui lòng chọn vai trò'),
});

export const courseSchema = yup.object().shape({
  name: yup
    .string()
    .min(3, 'Tên khóa học phải có ít nhất 3 ký tự')
    .max(100, 'Tên khóa học không được quá 100 ký tự')
    .required('Vui lòng nhập tên khóa học'),
  description: yup
    .string()
    .max(500, 'Mô tả không được quá 500 ký tự')
    .required('Vui lòng nhập mô tả'),
  code: yup
    .string()
    .min(3, 'Mã khóa học phải có ít nhất 3 ký tự')
    .max(20, 'Mã khóa học không được quá 20 ký tự')
    .required('Vui lòng nhập mã khóa học'),
  credits: yup
    .number()
    .min(1, 'Số tín chỉ phải lớn hơn 0')
    .max(10, 'Số tín chỉ không được quá 10')
    .required('Vui lòng nhập số tín chỉ'),
  maxStudents: yup
    .number()
    .min(1, 'Số học sinh tối đa phải lớn hơn 0')
    .max(200, 'Số học sinh không được quá 200')
    .required('Vui lòng nhập số học sinh tối đa'),
  startDate: yup.date().required('Vui lòng chọn ngày bắt đầu'),
  endDate: yup
    .date()
    .min(yup.ref('startDate'), 'Ngày kết thúc phải sau ngày bắt đầu')
    .required('Vui lòng chọn ngày kết thúc'),
});

export const assignmentSchema = yup.object().shape({
  title: yup
    .string()
    .min(3, 'Tiêu đề phải có ít nhất 3 ký tự')
    .max(100, 'Tiêu đề không được quá 100 ký tự')
    .required('Vui lòng nhập tiêu đề'),
  description: yup
    .string()
    .max(1000, 'Mô tả không được quá 1000 ký tự')
    .required('Vui lòng nhập mô tả'),
  dueDate: yup.date().required('Vui lòng chọn hạn nộp'),
  maxScore: yup
    .number()
    .min(1, 'Điểm tối đa phải lớn hơn 0')
    .max(100, 'Điểm tối đa không được quá 100')
    .required('Vui lòng nhập điểm tối đa'),
  type: yup
    .mixed<'homework' | 'quiz' | 'exam' | 'project'>()
    .oneOf(['homework', 'quiz', 'exam', 'project'])
    .required('Vui lòng chọn loại bài tập'),
});

export const submissionSchema = yup.object().shape({
  content: yup
    .string()
    .min(10, 'Nội dung phải có ít nhất 10 ký tự')
    .max(5000, 'Nội dung không được quá 5000 ký tự')
    .required('Vui lòng nhập nội dung'),
});

export const gradeSchema = yup.object().shape({
  score: yup
    .number()
    .min(0, 'Điểm không được nhỏ hơn 0')
    .required('Vui lòng nhập điểm'),
  notes: yup.string().max(200, 'Ghi chú không được quá 200 ký tự'),
});

export const profileSchema = yup.object().shape({
  firstName: yup
    .string()
    .min(2, 'Tên phải có ít nhất 2 ký tự')
    .max(50, 'Tên không được quá 50 ký tự')
    .required('Vui lòng nhập tên'),
  lastName: yup
    .string()
    .min(2, 'Họ phải có ít nhất 2 ký tự')
    .max(50, 'Họ không được quá 50 ký tự')
    .required('Vui lòng nhập họ'),
  phone: yup
    .string()
    .matches(/^[0-9]{10,11}$/, 'Số điện thoại không hợp lệ'),
});

export const forgotPasswordSchema = yup.object().shape({
  email: yup
    .string()
    .email('Email không hợp lệ')
    .required('Vui lòng nhập email'),
});

export const resetPasswordSchema = yup.object().shape({
  password: yup
    .string()
    .min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
    .matches(/[A-Z]/, 'Mật khẩu phải chứa ít nhất 1 chữ hoa')
    .matches(/[a-z]/, 'Mật khẩu phải chứa ít nhất 1 chữ thường')
    .matches(/[0-9]/, 'Mật khẩu phải chứa ít nhất 1 số')
    .required('Vui lòng nhập mật khẩu'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Mật khẩu xác nhận không khớp')
    .required('Vui lòng xác nhận mật khẩu'),
});

export type LoginFormData = yup.InferType<typeof loginSchema>;
export type RegisterFormData = yup.InferType<typeof registerSchema>;
export type CourseFormData = yup.InferType<typeof courseSchema>;
export type AssignmentFormData = yup.InferType<typeof assignmentSchema>;
export type SubmissionFormData = yup.InferType<typeof submissionSchema>;
export type GradeFormData = yup.InferType<typeof gradeSchema>;
export type ProfileFormData = yup.InferType<typeof profileSchema>;
