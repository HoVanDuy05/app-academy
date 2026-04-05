import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Button, Avatar, useTheme, List, Divider } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { MainTabParamList } from '@navigation/MainNavigator';
import { useGetMyCourses, useGetNotifications } from '@hooks/useQueries';
import { useAuthStore } from '@stores/index';
import { formatDate, getFullName } from '@utils/helpers';

const HomeScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<MainTabParamList>>();
  const { user } = useAuthStore();

  const { data: courses, isLoading: coursesLoading } = useGetMyCourses();
  const { data: notifications } = useGetNotifications();

  const recentNotifications = notifications?.data?.slice(0, 3) || [];

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Avatar.Text
          size={60}
          label={user ? `${user.firstName[0]}${user.lastName[0]}` : 'U'}
          style={{ backgroundColor: theme.colors.primary }}
        />
        <View style={styles.headerInfo}>
          <Text variant="titleLarge" style={styles.greeting}>
            Xin chào,
          </Text>
          <Text variant="titleMedium">
            {user ? getFullName(user.firstName, user.lastName) : 'User'}
          </Text>
        </View>
      </View>

      {/* Quick Stats */}
      <View style={styles.statsContainer}>
        <Card style={styles.statCard}>
          <Card.Content>
            <Text variant="displaySmall" style={{ color: theme.colors.primary }}>
              {courses?.length || 0}
            </Text>
            <Text variant="bodyMedium">Khóa học</Text>
          </Card.Content>
        </Card>
        <Card style={styles.statCard}>
          <Card.Content>
            <Text variant="displaySmall" style={{ color: theme.colors.secondary }}>
              {recentNotifications.length}
            </Text>
            <Text variant="bodyMedium">Thông báo</Text>
          </Card.Content>
        </Card>
      </View>

      {/* Quick Actions */}
      <Text variant="titleMedium" style={styles.sectionTitle}>
        Truy cập nhanh
      </Text>
      <View style={styles.quickActions}>
        <Button
          mode="contained-tonal"
          icon="book-open-variant"
          onPress={() => navigation.navigate('CoursesTab')}
          style={styles.actionButton}
        >
          Khóa học
        </Button>
        <Button
          mode="contained-tonal"
          icon="clipboard-text"
          onPress={() => navigation.navigate('AssignmentsTab')}
          style={styles.actionButton}
        >
          Bài tập
        </Button>
        <Button
          mode="contained-tonal"
          icon="chart-line"
          onPress={() => navigation.navigate('GradesTab')}
          style={styles.actionButton}
        >
          Điểm số
        </Button>
      </View>

      {/* Recent Notifications */}
      <Text variant="titleMedium" style={styles.sectionTitle}>
        Thông báo gần đây
      </Text>
      {recentNotifications.length === 0 ? (
        <Text style={styles.emptyText}>Không có thông báo mới</Text>
      ) : (
        recentNotifications.map((notification) => (
          <List.Item
            key={notification.id}
            title={notification.title}
            description={notification.message}
            left={(props) => (
              <List.Icon
                {...props}
                icon={
                  notification.type === 'success'
                    ? 'check-circle'
                    : notification.type === 'warning'
                      ? 'alert'
                      : notification.type === 'error'
                        ? 'close-circle'
                        : 'information'
                }
                color={
                  notification.type === 'success'
                    ? theme.colors.primary
                    : notification.type === 'warning'
                      ? '#FFC107'
                      : notification.type === 'error'
                        ? theme.colors.error
                        : theme.colors.onSurface
                }
              />
            )}
            right={() => (
              <Text variant="bodySmall" style={styles.dateText}>
                {formatDate(notification.createdAt)}
              </Text>
            )}
          />
        ))
      )}

      <Divider style={styles.divider} />

      {/* Upcoming Courses */}
      <Text variant="titleMedium" style={styles.sectionTitle}>
        Khóa học của tôi
      </Text>
      {coursesLoading ? (
        <Text style={styles.emptyText}>Đang tải...</Text>
      ) : courses?.length === 0 ? (
        <Text style={styles.emptyText}>Chưa có khóa học nào</Text>
      ) : (
        courses?.slice(0, 3).map((course) => (
          <Card key={course.id} style={styles.courseCard}>
            <Card.Content>
              <Text variant="titleSmall">{course.name}</Text>
              <Text variant="bodySmall" style={styles.courseCode}>
                {course.code}
              </Text>
              <Text variant="bodySmall" numberOfLines={2}>
                {course.description}
              </Text>
            </Card.Content>
          </Card>
        ))
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  headerInfo: {
    marginLeft: 16,
  },
  greeting: {
    opacity: 0.7,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    marginHorizontal: 4,
  },
  sectionTitle: {
    marginBottom: 12,
    marginTop: 8,
  },
  quickActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  actionButton: {
    margin: 4,
    flex: 1,
    minWidth: '30%',
  },
  emptyText: {
    textAlign: 'center',
    opacity: 0.6,
    marginVertical: 16,
  },
  dateText: {
    opacity: 0.6,
    alignSelf: 'center',
  },
  divider: {
    marginVertical: 16,
  },
  courseCard: {
    marginBottom: 8,
  },
  courseCode: {
    opacity: 0.7,
    marginBottom: 4,
  },
});

export default HomeScreen;
