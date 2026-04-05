import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Text, Card, Button, useTheme, Chip, Searchbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { MainTabParamList } from '@navigation/MainNavigator';
import { useGetAssignments } from '@hooks/useQueries';
import { formatDate, getGradeColor } from '@utils/helpers';
import type { Assignment } from '@/types';

const AssignmentsScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<MainTabParamList>>();
  const [searchQuery, setSearchQuery] = React.useState('');

  const { data: assignmentsData, isLoading, refetch } = useGetAssignments();
  const assignments = assignmentsData?.data || [];

  const filteredAssignments = React.useMemo(() => {
    if (!searchQuery) return assignments;
    const query = searchQuery.toLowerCase();
    return assignments.filter(
      (assignment) =>
        assignment.title.toLowerCase().includes(query) ||
        assignment.description.toLowerCase().includes(query),
    );
  }, [assignments, searchQuery]);

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

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date();
  };

  const renderAssignmentItem = ({ item }: { item: Assignment }) => (
    <Card style={styles.assignmentCard}>
      <Card.Content>
        <View style={styles.headerRow}>
          <Chip icon={getTypeIcon(item.type)} style={styles.typeChip}>
            {getTypeLabel(item.type)}
          </Chip>
          <Chip compact style={styles.scoreChip}>
            {item.maxScore} điểm
          </Chip>
        </View>

        <Text variant="titleMedium" style={styles.titleStyle}>
          {item.title}
        </Text>

        <Text variant="bodyMedium" numberOfLines={2} style={styles.description}>
          {item.description}
        </Text>

        <View style={styles.footer}>
          <Text
            variant="bodySmall"
            style={[
              styles.dueDate,
              { color: isOverdue(item.dueDate) ? theme.colors.error : theme.colors.primary },
            ]}
          >
            Hạn nộp: {formatDate(item.dueDate)}
          </Text>
        </View>
      </Card.Content>
      <Card.Actions>
        <Button
          mode="text"
          onPress={() => navigation.navigate('AssignmentDetail', { assignmentId: item.id })}
        >
          Xem chi tiết
        </Button>
      </Card.Actions>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Tìm kiếm bài tập..."
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchbar}
      />

      <Text variant="titleMedium" style={styles.title}>
        Danh sách bài tập ({filteredAssignments.length})
      </Text>

      {isLoading ? (
        <Text style={styles.emptyText}>Đang tải...</Text>
      ) : filteredAssignments.length === 0 ? (
        <Text style={styles.emptyText}>
          {searchQuery ? 'Không tìm thấy bài tập' : 'Chưa có bài tập nào'}
        </Text>
      ) : (
        <FlatList
          data={filteredAssignments}
          keyExtractor={(item) => item.id}
          renderItem={renderAssignmentItem}
          contentContainerStyle={styles.listContainer}
          refreshing={isLoading}
          onRefresh={refetch}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  searchbar: {
    marginBottom: 16,
  },
  title: {
    marginBottom: 12,
  },
  listContainer: {
    paddingBottom: 80,
  },
  assignmentCard: {
    marginBottom: 12,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  typeChip: {},
  scoreChip: {
    alignSelf: 'center',
  },
  titleStyle: {
    marginBottom: 8,
  },
  description: {
    opacity: 0.8,
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dueDate: {
    fontWeight: '500',
  },
  emptyText: {
    textAlign: 'center',
    opacity: 0.6,
    marginTop: 32,
  },
});

export default AssignmentsScreen;
