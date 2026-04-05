import React from 'react';
import { View, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { Text, Button, useTheme, Chip } from 'react-native-paper';

// Import role-specific components
import { AdminStatsCard, UserManagementCard, CourseManagementCard } from '@components/roles/admin';

// Import role-specific hooks
import {
  useAdminStats,
  useAdminUsers,
  useAdminCourses,
  useToggleUserStatus,
  useArchiveCourse,
} from '@hooks/roles/admin';

// Import services
import { AdminService } from '@services/roles';

const AdminDashboardScreen = () => {
  const theme = useTheme();

  // Use role-specific hooks
  const { data: stats, refetch: refetchStats, isLoading: statsLoading } = useAdminStats();
  const { data: users, refetch: refetchUsers } = useAdminUsers({ role: 'student' });
  const { data: courses, refetch: refetchCourses } = useAdminCourses();

  const toggleUserStatus = useToggleUserStatus();
  const archiveCourse = useArchiveCourse();

  const isLoading = statsLoading;

  const onRefresh = async () => {
    await Promise.all([refetchStats(), refetchUsers(), refetchCourses()]);
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={<RefreshControl refreshing={isLoading} onRefresh={onRefresh} />}
    >
      {/* Stats Section */}
      <AdminStatsCard
        totalUsers={stats?.totalUsers || 0}
        totalCourses={stats?.totalCourses || 0}
        activeStudents={stats?.activeStudents || 0}
        activeTeachers={stats?.activeTeachers || 0}
        systemUptime={stats?.systemUptime || '99.9%'}
      />

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <Button
          mode="contained-tonal"
          icon="account-plus"
          onPress={() => {}}
          style={styles.actionButton}
        >
          Thêm user
        </Button>
        <Button
          mode="contained-tonal"
          icon="school"
          onPress={() => {}}
          style={styles.actionButton}
        >
          Thêm khóa học
        </Button>
        <Button
          mode="contained-tonal"
          icon="cog"
          onPress={() => {}}
          style={styles.actionButton}
        >
          Cài đặt
        </Button>
      </View>

      {/* Recent Users */}
      <View style={styles.section}>
        <Text variant="titleMedium" style={styles.sectionTitle}>Người dùng mới</Text>
        {users?.slice(0, 3).map((user) => (
          <UserManagementCard
            key={user.id}
            id={user.id}
            firstName={user.firstName}
            lastName={user.lastName}
            email={user.email}
            role={user.role}
            isActive={true}
            lastLogin="2024-01-15"
            onEdit={() => {}}
            onToggleStatus={() => toggleUserStatus.mutate(user.id)}
            onDelete={() => {}}
          />
        ))}
        <Button mode="text" onPress={() => {}} style={styles.viewAllButton}>
          Quản lý users
        </Button>
      </View>

      {/* Recent Courses */}
      <View style={styles.section}>
        <Text variant="titleMedium" style={styles.sectionTitle}>Khóa học gần đây</Text>
        {courses?.slice(0, 3).map((course) => (
          <CourseManagementCard
            key={course.id}
            id={course.id}
            name={course.name}
            code={course.code}
            teacherName={course.teacher ? `${course.teacher.lastName} ${course.teacher.firstName}` : 'Chưa có'}
            studentCount={50}
            maxStudents={course.maxStudents}
            status="active"
            semester="2024-1"
            onEdit={() => {}}
            onManageStudents={() => {}}
            onArchive={() => archiveCourse.mutate(course.id)}
            onDelete={() => {}}
          />
        ))}
        <Button mode="text" onPress={() => {}} style={styles.viewAllButton}>
          Quản lý khóa học
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    gap: 8,
  },
  actionButton: {
    flex: 1,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    marginBottom: 12,
  },
  viewAllButton: {
    alignSelf: 'center',
    marginTop: 8,
  },
});

export default AdminDashboardScreen;
