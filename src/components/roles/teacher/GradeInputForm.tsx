import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text, useTheme } from 'react-native-paper';
import Slider from '@react-native-community/slider';

interface GradeInputFormProps {
  studentName: string;
  assignmentName: string;
  maxScore: number;
  currentScore?: number;
  feedback?: string;
  onSubmit: (score: number, feedback: string) => void;
  onCancel: () => void;
}

const GradeInputForm: React.FC<GradeInputFormProps> = ({
  studentName,
  assignmentName,
  maxScore,
  currentScore,
  feedback: initialFeedback = '',
  onSubmit,
  onCancel,
}) => {
  const theme = useTheme();
  const [score, setScore] = React.useState(currentScore || 0);
  const [feedback, setFeedback] = React.useState(initialFeedback);

  const handleSubmit = () => {
    onSubmit(score, feedback);
  };

  return (
    <View style={styles.container}>
      <Text variant="titleMedium" style={styles.title}>Chấm điểm</Text>
      
      <View style={styles.infoSection}>
        <Text variant="bodyMedium"><Text style={styles.label}>Học sinh:</Text> {studentName}</Text>
        <Text variant="bodyMedium"><Text style={styles.label}>Bài tập:</Text> {assignmentName}</Text>
      </View>

      <View style={styles.scoreSection}>
        <Text variant="titleLarge" style={styles.scoreDisplay}>
          {score.toFixed(1)} / {maxScore}
        </Text>
        <Slider
          value={score}
          minimumValue={0}
          maximumValue={maxScore}
          step={0.5}
          onValueChange={setScore}
          minimumTrackTintColor={theme.colors.primary}
          maximumTrackTintColor={theme.colors.surfaceVariant}
          style={styles.slider}
        />
      </View>

      <TextInput
        label="Nhận xét (tùy chọn)"
        value={feedback}
        onChangeText={setFeedback}
        mode="outlined"
        multiline
        numberOfLines={4}
        style={styles.input}
      />

      <View style={styles.buttonRow}>
        <Button mode="outlined" onPress={onCancel} style={styles.button}>
          Hủy
        </Button>
        <Button mode="contained" onPress={handleSubmit} style={styles.button}>
          Lưu điểm
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    marginBottom: 16,
    textAlign: 'center',
  },
  infoSection: {
    marginBottom: 16,
    gap: 4,
  },
  label: {
    fontWeight: '600',
  },
  scoreSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  scoreDisplay: {
    marginBottom: 12,
    fontWeight: 'bold',
  },
  slider: {
    width: '100%',
    height: 40,
  },
  input: {
    marginBottom: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  button: {
    flex: 1,
  },
});

export default GradeInputForm;
