import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Text, Card, Button, useTheme, IconButton, List, Divider } from 'react-native-paper';
import { useGetNotifications, useMarkNotificationRead } from '@hooks/useQueries';
import { formatDateTime } from '@utils/helpers';
import { useNotificationStore } from '@stores/index';
import type { Notification } from '@/types/index';

const NotificationsScreen = () => {
  const theme = useTheme();
  const { data: notificationsData, isLoading, refetch } = useGetNotifications();
  const notifications = notificationsData?.data || [];
  const markReadMutation = useMarkNotificationRead();
  const { setUnreadCount } = useNotificationStore();

  React.useEffect(() => {
    const unreadCount = notifications.filter((n) => !n.isRead).length;
    setUnreadCount(unreadCount);
  }, [notifications, setUnreadCount]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'success':
        return 'check-circle';
      case 'warning':
        return 'alert';
      case 'error':
        return 'close-circle';
      default:
        return 'information';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'success':
        return theme.colors.primary;
      case 'warning':
        return '#FFC107';
      case 'error':
        return theme.colors.error;
      default:
        return theme.colors.onSurface;
    }
  };

  const handleMarkRead = async (id: string) => {
    await markReadMutation.mutateAsync(id);
  };

  const renderNotificationItem = ({ item }: { item: Notification }) => (
    <Card
      style={[
        styles.notificationCard,
        !item.isRead && { backgroundColor: theme.colors.primaryContainer + '30' },
      ]}
    >
      <Card.Content>
        <View style={styles.headerRow}>
          <View style={styles.iconContainer}>
            <List.Icon icon={getTypeIcon(item.type)} color={getTypeColor(item.type)} />
          </View>
          <View style={styles.contentContainer}>
            <Text variant="titleSmall" style={!item.isRead && styles.unreadText}>
              {item.title}
            </Text>
            <Text variant="bodySmall" style={styles.message}>
              {item.message}
            </Text>
            <Text variant="bodySmall" style={styles.date}>
              {formatDateTime(item.createdAt)}
            </Text>
          </View>
          {!item.isRead && (
            <IconButton
              icon="check"
              size={20}
              onPress={() => handleMarkRead(item.id)}
              style={styles.markReadButton}
            />
          )}
        </View>
      </Card.Content>
    </Card>
  );

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text variant="titleMedium">Thông báo ({notifications.length})</Text>
        <Text variant="bodySmall" style={{ color: theme.colors.primary }}>
          {unreadCount} chưa đọc
        </Text>
      </View>

      {isLoading ? (
        <Text style={styles.emptyText}>Đang tải...</Text>
      ) : notifications.length === 0 ? (
        <View style={styles.emptyContainer}>
          <List.Icon icon="bell-off" color={theme.colors.onSurfaceDisabled} />
          <Text style={styles.emptyText}>Không có thông báo</Text>
        </View>
      ) : (
        <FlatList
          data={notifications}
          keyExtractor={(item) => item.id}
          renderItem={renderNotificationItem}
          contentContainerStyle={styles.listContainer}
          refreshing={isLoading}
          onRefresh={refetch}
          ItemSeparatorComponent={() => <Divider style={styles.divider} />}
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  listContainer: {
    paddingBottom: 80,
  },
  notificationCard: {
    marginBottom: 4,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  iconContainer: {
    marginRight: 12,
    marginTop: 4,
  },
  contentContainer: {
    flex: 1,
  },
  unreadText: {
    fontWeight: '600',
  },
  message: {
    opacity: 0.8,
    marginTop: 4,
  },
  date: {
    opacity: 0.6,
    marginTop: 8,
  },
  markReadButton: {
    margin: 0,
    marginLeft: 8,
  },
  divider: {
    marginVertical: 4,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyIcon: {
    marginBottom: 16,
  },
  emptyText: {
    textAlign: 'center',
    opacity: 0.6,
    marginTop: 16,
  },
});

export default NotificationsScreen;
