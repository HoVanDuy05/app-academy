import React from 'react';
import { View, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { Text, Searchbar, Chip } from 'react-native-paper';
import { StudentAssignmentCard } from '@components/roles/student';
import { useStudentAssignments } from '@hooks/roles/student';

const StudentAssignmentsScreen = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState<'all' | 'pending' | 'completed' | 'overdue'>('all');

  const { data: assignments, refetch, isLoading } = useStudentAssignments(
    statusFilter === 'all' ? undefined : statusFilter
  );

  const filteredAssignments = React.useMemo(() => {
    if (!searchQuery) return assignments;
    const query = searchQuery.toLowerCase();
    return assignments?.filter(
      (assignment) =>
        assignment.title.toLowerCase().includes(query) ||
        assignment.description?.toLowerCase().includes(query)
    );
  }, [assignments, searchQuery]);

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Tìm kiếm bài tập..."
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchbar}
      />

      <View style={styles.filterContainer}>
        {(['all', 'pending', 'completed', 'overdue'] as const).map((status) => (
          <Chip
            key={status}
            selected={statusFilter === status}
            onPress={() => setStatusFilter(status)}
            style={styles.filterChip}
            showSelectedOverlay
          >
            {status === 'all' ? 'Tất cả' : 
             status === 'pending' ? 'Chưa làm' : 
             status === 'completed' ? 'Đã nộp' : 'Quá hạn'}
          </Chip>
        ))}
      </View>

      <Text variant="titleMedium" style={styles.title}>
        Bài tập ({filteredAssignments?.length || 0})
      </Text>

      <FlatList
        data={filteredAssignments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <StudentAssignmentCard
            id={item.id}
            title={item.title}
            courseName={item.course?.name || 'Khóa học'}
            dueDate={item.dueDate}
            type={item.type}
            maxScore={item.maxScore}
            isSubmitted={item.isSubmitted}
          />
        )}
        contentContainerStyle={styles.listContainer}
        refreshControl={<RefreshControl refreshing={isLoading} onRefresh={refetch} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  searchbar: {
    marginBottom: 12,
  },
  filterContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  filterChip: {},
  title: {
    marginBottom: 12,
  },
  listContainer: {
    paddingBottom: 80,
  },
});

export default StudentAssignmentsScreen;
