import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Text, Card, Button, useTheme, Searchbar, Chip, FAB } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { MainTabParamList } from '@navigation/MainNavigator';
import { useGetCourses } from '@hooks/useQueries';
import { formatDate } from '@utils/helpers';
import type { Course } from '@/types';

const CoursesScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<MainTabParamList>>();
  const [searchQuery, setSearchQuery] = React.useState('');

  const { data: coursesData, isLoading, refetch } = useGetCourses();
  const courses = coursesData?.data || [];

  const filteredCourses = React.useMemo(() => {
    if (!searchQuery) return courses;
    const query = searchQuery.toLowerCase();
    return courses.filter(
      (course) =>
        course.name.toLowerCase().includes(query) ||
        course.code.toLowerCase().includes(query) ||
        course.description.toLowerCase().includes(query),
    );
  }, [courses, searchQuery]);

  const renderCourseItem = ({ item }: { item: Course }) => (
    <Card style={styles.courseCard}>
      <Card.Content>
        <View style={styles.headerRow}>
          <Text variant="titleMedium" style={styles.courseName}>
            {item.name}
          </Text>
          <Chip compact>{item.code}</Chip>
        </View>
        <Text variant="bodyMedium" numberOfLines={2} style={styles.description}>
          {item.description}
        </Text>
        <View style={styles.detailsRow}>
          <Text variant="bodySmall" style={styles.detailText}>
            Tín chỉ: {item.credits}
          </Text>
          <Text variant="bodySmall" style={styles.detailText}>
            Tối đa: {item.maxStudents} học sinh
          </Text>
        </View>
        <Text variant="bodySmall" style={styles.dateText}>
          {formatDate(item.startDate)} - {formatDate(item.endDate)}
        </Text>
      </Card.Content>
      <Card.Actions>
        <Button mode="text" onPress={() => navigation.navigate('CourseDetail', { courseId: item.id })}>
          Xem chi tiết
        </Button>
      </Card.Actions>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Tìm kiếm khóa học..."
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchbar}
      />

      <Text variant="titleMedium" style={styles.title}>
        Danh sách khóa học ({filteredCourses.length})
      </Text>

      {isLoading ? (
        <Text style={styles.emptyText}>Đang tải...</Text>
      ) : filteredCourses.length === 0 ? (
        <Text style={styles.emptyText}>
          {searchQuery ? 'Không tìm thấy khóa học' : 'Chưa có khóa học nào'}
        </Text>
      ) : (
        <FlatList
          data={filteredCourses}
          keyExtractor={(item) => item.id}
          renderItem={renderCourseItem}
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
  courseCard: {
    marginBottom: 12,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  courseName: {
    flex: 1,
    marginRight: 8,
  },
  description: {
    opacity: 0.8,
    marginBottom: 12,
  },
  detailsRow: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  detailText: {
    marginRight: 16,
    opacity: 0.7,
  },
  dateText: {
    opacity: 0.6,
  },
  emptyText: {
    textAlign: 'center',
    opacity: 0.6,
    marginTop: 32,
  },
});

export default CoursesScreen;
