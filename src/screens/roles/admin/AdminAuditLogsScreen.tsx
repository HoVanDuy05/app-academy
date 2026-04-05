import React from 'react';
import { View, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { Text } from 'react-native-paper';
import { AuditLogCard } from '@components/roles/admin';
import { useAuditLogs } from '@hooks/roles/admin';
import { formatDateTime } from '@utils/helpers';

const AdminAuditLogsScreen = () => {
  const { data: logs, refetch, isLoading } = useAuditLogs(100);

  return (
    <View style={styles.container}>
      <Text variant="titleMedium" style={styles.title}>Audit Logs</Text>
      <FlatList
        data={logs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <AuditLogCard
            id={item.id}
            userName={item.userName}
            userRole={item.userRole}
            action={item.action}
            target={item.target}
            timestamp={formatDateTime(item.timestamp)}
            ipAddress={item.ipAddress}
            status={item.status}
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
  title: {
    marginBottom: 12,
  },
  listContainer: {
    paddingBottom: 80,
  },
});

export default AdminAuditLogsScreen;
