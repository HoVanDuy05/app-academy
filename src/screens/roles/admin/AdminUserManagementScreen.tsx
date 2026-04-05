import React from 'react';
import { View, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { Text, Searchbar, Chip, FAB, Portal, useTheme } from 'react-native-paper';

// Import role-specific components
import { UserManagementCard } from '@components/roles/admin';

// Import role-specific hooks
import { useAdminUsers, useCreateUser, useUpdateUser, useToggleUserStatus, useDeleteUser } from '@hooks/roles/admin';

const AdminUserManagementScreen = () => {
  const theme = useTheme();

  const [searchQuery, setSearchQuery] = React.useState('');
  const [roleFilter, setRoleFilter] = React.useState<string | undefined>();

  // Use role-specific hooks
  const { data: users, refetch, isLoading } = useAdminUsers({ role: roleFilter });
  const createUser = useCreateUser();
  const toggleUserStatus = useToggleUserStatus();
  const deleteUser = useDeleteUser();

  const filteredUsers = React.useMemo(() => {
    if (!searchQuery) return users;
    const query = searchQuery.toLowerCase();
    return users?.filter(
      (user) =>
        user.firstName.toLowerCase().includes(query) ||
        user.lastName.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query)
    );
  }, [users, searchQuery]);

  const roles = [
    { value: undefined, label: 'Tất cả' },
    { value: 'student', label: 'Học sinh' },
    { value: 'teacher', label: 'Giáo viên' },
    { value: 'admin', label: 'Admin' },
  ];

  return (
    <View style={styles.container}>
      {/* Filter Chips */}
      <View style={styles.filterContainer}>
        {roles.map((role) => (
          <Chip
            key={role.label}
            selected={roleFilter === role.value}
            onPress={() => setRoleFilter(role.value)}
            style={styles.filterChip}
            showSelectedOverlay
          >
            {role.label}
          </Chip>
        ))}
      </View>

      <Searchbar
        placeholder="Tìm kiếm người dùng..."
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchbar}
      />

      <Text variant="titleMedium" style={styles.title}>
        Người dùng ({filteredUsers?.length || 0})
      </Text>

      <FlatList
        data={filteredUsers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <UserManagementCard
            id={item.id}
            firstName={item.firstName}
            lastName={item.lastName}
            email={item.email}
            role={item.role}
            isActive={true}
            lastLogin="2024-01-15"
            onEdit={() => {}}
            onToggleStatus={() => toggleUserStatus.mutate(item.id)}
            onDelete={() => deleteUser.mutate(item.id)}
          />
        )}
        contentContainerStyle={styles.listContainer}
        refreshControl={<RefreshControl refreshing={isLoading} onRefresh={refetch} />}
      />

      <Portal>
        <FAB
          icon="account-plus"
          style={[styles.fab, { backgroundColor: theme.colors.primary }]}
          onPress={() => {}}
          label="Thêm user"
        />
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  filterContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  filterChip: {
    marginRight: 8,
  },
  searchbar: {
    marginBottom: 12,
  },
  title: {
    marginBottom: 12,
  },
  listContainer: {
    paddingBottom: 80,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default AdminUserManagementScreen;
