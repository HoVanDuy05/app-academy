import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Button, useTheme, Chip, Divider, TextInput } from 'react-native-paper';
import { useRoute, useNavigation } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { MainTabParamList } from '@navigation/MainNavigator';
import { useGetAssignment, useSubmitAssignment } from '@hooks/useQueries';
import { formatDateTime, isOverdue } from '@utils/helpers';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { submissionSchema } from '@utils/validation';

type AssignmentDetailRouteProp = RouteProp<MainTabParamList, 'AssignmentDetail'>;

const AssignmentDetailScreen = () => {
  const theme = useTheme();
  const route = useRoute<AssignmentDetailRouteProp>();
  const navigation = useNavigation<NativeStackNavigationProp<MainTabParamList>>();
  const { assignmentId } = route.params;
  const [showSubmitForm, setShowSubmitForm] = React.useState(false);

  const { data: assignment, isLoading } = useGetAssignment(assignmentId);
  const submitMutation = useSubmitAssignment();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(submissionSchema),
    defaultValues: {
      content: '',
    },
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'homework':
        return 'home';
      case 'quiz':
        return 'help-circle';
      case 'exam':
        return 'file-document';
      case 'project':
        return 'folder';
      default:
        return 'clipboard-text';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'homework':
        return 'Bài tập về nhà';
      case 'quiz':
        return 'Kiểm tra';
      case 'exam':
        return 'Thi';
      case 'project':
        return 'Dự án';
      default:
        return type;
    }
  };

  const onSubmit = async (data: { content: string }) => {
    await submitMutation.mutateAsync({
      assignmentId,
      data,
    });
    setShowSubmitForm(false);
  };

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <Text>Đang tải...</Text>
      </View>
    );
  }

  if (!assignment) {
    return (
      <View style={styles.centerContainer}>
        <Text>Không tìm thấy bài tập</Text>
        <Button mode="contained" onPress={() => navigation.goBack()} style={styles.button}>
          Quay lại
        </Button>
      </View>
    );
  }

  const overdue = isOverdue(assignment.dueDate);

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <Card style={styles.headerCard}>
        <Card.Content>
          <View style={styles.headerRow}>
            <Chip icon={getTypeIcon(assignment.type)}>{getTypeLabel(assignment.type)}</Chip>
            <Chip compact style={styles.scoreChip}>
              {assignment.maxScore} điểm
            </Chip>
          </View>
          <Text variant="headlineSmall" style={styles.title}>
            {assignment.title}
          </Text>
        </Card.Content>
      </Card>

      {/* Details */}
      <Card style={styles.detailsCard}>
        <Card.Title title="Chi tiết bài tập" />
        <Card.Content>
          <Text variant="bodyMedium" style={styles.description}>
            {assignment.description}
          </Text>

          <Divider style={styles.divider} />

          <View style={styles.infoRow}>
            <Text variant="bodySmall" style={styles.infoLabel}>
              Hạn nộp:
            </Text>
            <Text
              variant="bodyMedium"
              style={{ color: overdue ? theme.colors.error : theme.colors.primary }}
            >
              {formatDateTime(assignment.dueDate)}
              {overdue && ' (Đã quá hạn)'}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text variant="bodySmall" style={styles.infoLabel}>
              Điểm tối đa:
            </Text>
            <Text variant="bodyMedium">{assignment.maxScore} điểm</Text>
          </View>

          {assignment.course && (
            <View style={styles.infoRow}>
              <Text variant="bodySmall" style={styles.infoLabel}>
                Khóa học:
              </Text>
              <Text variant="bodyMedium">{assignment.course.name}</Text>
            </View>
          )}
        </Card.Content>
      </Card>

      {/* Submit Section */}
      {!overdue && !showSubmitForm && (
        <Button mode="contained" onPress={() => setShowSubmitForm(true)} style={styles.button}>
          Nộp bài
        </Button>
      )}

      {showSubmitForm && (
        <Card style={styles.submitCard}>
          <Card.Title title="Nộp bài tập" />
          <Card.Content>
            <Controller
              control={control}
              name="content"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  label="Nội dung bài làm"
                  mode="outlined"
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  error={!!errors.content}
                  style={styles.textInput}
                  multiline
                  numberOfLines={6}
                />
              )}
            />
            {errors.content && (
              <Text style={{ color: theme.colors.error }}>{errors.content.message}</Text>
            )}
          </Card.Content>
          <Card.Actions>
            <Button onPress={() => setShowSubmitForm(false)}>Hủy</Button>
            <Button
              mode="contained"
              onPress={handleSubmit(onSubmit)}
              loading={submitMutation.isPending}
              disabled={submitMutation.isPending}
            >
              Gửi bài
            </Button>
          </Card.Actions>
        </Card>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  headerCard: {
    marginBottom: 16,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  scoreChip: {
    alignSelf: 'center',
  },
  title: {
    marginTop: 8,
  },
  detailsCard: {
    marginBottom: 16,
  },
  description: {
    marginBottom: 16,
  },
  divider: {
    marginVertical: 12,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  infoLabel: {
    width: 100,
    opacity: 0.7,
  },
  button: {
    marginBottom: 16,
  },
  submitCard: {
    marginBottom: 16,
  },
  textInput: {
    marginBottom: 8,
  },
});

export default AssignmentDetailScreen;
