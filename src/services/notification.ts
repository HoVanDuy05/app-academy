// ============================================
// NOTIFICATION SERVICE - Google Standards
// ============================================

import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import Constants from 'expo-constants';
import { Platform } from 'react-native';
import { NOTIFICATION_CHANNELS } from '@/constants';

// Configure notification behavior
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    priority: Notifications.AndroidNotificationPriority.HIGH,
  }),
});

export interface NotificationData {
  title: string;
  body: string;
  data?: Record<string, any>;
  channelId?: string;
  priority?: 'high' | 'normal' | 'low';
}

class NotificationService {
  private isInitialized = false;
  private token: string | null = null;

  // Initialize notifications
  async initialize(): Promise<boolean> {
    if (this.isInitialized) return true;

    if (!Device.isDevice) {
      console.log('Notifications not available on simulator');
      return false;
    }

    try {
      // Request permissions
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== 'granted') {
        console.log('Notification permission denied');
        return false;
      }

      // Get push token
      const tokenData = await Notifications.getExpoPushTokenAsync({
        projectId: Constants.expoConfig?.extra?.eas?.projectId,
      });
      this.token = tokenData.data;

      // Set up Android notification channels
      if (Platform.OS === 'android') {
        await this.setupAndroidChannels();
      }

      this.isInitialized = true;
      return true;
    } catch (error) {
      console.error('Failed to initialize notifications:', error);
      return false;
    }
  }

  // Setup Android notification channels (Google standards)
  private async setupAndroidChannels(): Promise<void> {
    // General notifications channel
    await Notifications.setNotificationChannelAsync(NOTIFICATION_CHANNELS.GENERAL, {
      name: 'Thông báo chung',
      importance: Notifications.AndroidImportance.DEFAULT,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
      sound: 'default',
    });

    // Grades channel (high importance)
    await Notifications.setNotificationChannelAsync(NOTIFICATION_CHANNELS.GRADES, {
      name: 'Thông báo điểm số',
      importance: Notifications.AndroidImportance.HIGH,
      vibrationPattern: [0, 500, 200, 500],
      sound: 'default',
    });

    // Assignments channel
    await Notifications.setNotificationChannelAsync(NOTIFICATION_CHANNELS.ASSIGNMENTS, {
      name: 'Thông báo bài tập',
      importance: Notifications.AndroidImportance.HIGH,
      vibrationPattern: [0, 300, 100, 300],
      sound: 'default',
    });

    // Attendance channel
    await Notifications.setNotificationChannelAsync(NOTIFICATION_CHANNELS.ATTENDANCE, {
      name: 'Thông báo điểm danh',
      importance: Notifications.AndroidImportance.DEFAULT,
      vibrationPattern: [0, 250, 250, 250],
      sound: 'default',
    });

    // Announcements channel (urgent)
    await Notifications.setNotificationChannelAsync(NOTIFICATION_CHANNELS.ANNOUNCEMENTS, {
      name: 'Thông báo khẩn',
      importance: Notifications.AndroidImportance.HIGH,
      vibrationPattern: [0, 1000, 500, 1000],
      sound: 'default',
    });
  }

  // Get push token
  getToken(): string | null {
    return this.token;
  }

  // Check permission status
  async checkPermissionStatus(): Promise<'granted' | 'denied' | 'undetermined'> {
    const { status } = await Notifications.getPermissionsAsync();
    return status;
  }

  // Request permissions (called when user first opens app)
  async requestPermissions(): Promise<boolean> {
    const { status } = await Notifications.requestPermissionsAsync();
    return status === 'granted';
  }

  // Schedule local notification
  async scheduleNotification(
    notification: NotificationData,
    trigger?: Notifications.NotificationTriggerInput
  ): Promise<string> {
    const id = await Notifications.scheduleNotificationAsync({
      content: {
        title: notification.title,
        body: notification.body,
        data: notification.data || {},
        sound: true,
        priority: this.getPriority(notification.priority),
        channelId: notification.channelId || NOTIFICATION_CHANNELS.GENERAL,
      },
      trigger: trigger || null,
    });

    return id;
  }

  // Show immediate notification
  async showNotification(notification: NotificationData): Promise<string> {
    return this.scheduleNotification(notification, null);
  }

  // Cancel scheduled notification
  async cancelNotification(notificationId: string): Promise<void> {
    await Notifications.cancelScheduledNotificationAsync(notificationId);
  }

  // Cancel all scheduled notifications
  async cancelAllNotifications(): Promise<void> {
    await Notifications.cancelAllScheduledNotificationsAsync();
  }

  // Get all scheduled notifications
  async getScheduledNotifications(): Promise<Notifications.NotificationRequest[]> {
    return await Notifications.getAllScheduledNotificationsAsync();
  }

  // Clear badge count
  async clearBadge(): Promise<void> {
    await Notifications.setBadgeCountAsync(0);
  }

  // Set badge count
  async setBadge(count: number): Promise<void> {
    await Notifications.setBadgeCountAsync(count);
  }

  // Handle notification received
  addNotificationReceivedListener(
    callback: (notification: Notifications.Notification) => void
  ): Notifications.Subscription {
    return Notifications.addNotificationReceivedListener(callback);
  }

  // Handle notification response (user taps notification)
  addNotificationResponseReceivedListener(
    callback: (response: Notifications.NotificationResponse) => void
  ): Notifications.Subscription {
    return Notifications.addNotificationResponseReceivedListener(callback);
  }

  // Remove listener
  removeNotificationSubscription(subscription: Notifications.Subscription): void {
    Notifications.removeNotificationSubscription(subscription);
  }

  // Helper: Get Android priority
  private getPriority(priority?: string): Notifications.AndroidNotificationPriority {
    switch (priority) {
      case 'high':
        return Notifications.AndroidNotificationPriority.HIGH;
      case 'low':
        return Notifications.AndroidNotificationPriority.LOW;
      default:
        return Notifications.AndroidNotificationPriority.DEFAULT;
    }
  }

  // Predefined notification templates
  showGradeNotification(courseName: string, grade: number): Promise<string> {
    return this.showNotification({
      title: '📊 Điểm mới',
      body: `Bạn đã nhận được điểm ${grade} trong khóa học ${courseName}`,
      channelId: NOTIFICATION_CHANNELS.GRADES,
      priority: 'high',
      data: { type: 'grade', courseName, grade },
    });
  }

  showAssignmentDueNotification(assignmentTitle: string, dueDate: string): Promise<string> {
    return this.showNotification({
      title: '⏰ Bài tập sắp hết hạn',
      body: `Bài tập "${assignmentTitle}" đến hạn vào ${dueDate}`,
      channelId: NOTIFICATION_CHANNELS.ASSIGNMENTS,
      priority: 'high',
      data: { type: 'assignment', assignmentTitle, dueDate },
    });
  }

  showAttendanceNotification(courseName: string, status: string): Promise<string> {
    return this.showNotification({
      title: '📍 Điểm danh',
      body: `Bạn đã được điểm danh ${status} trong khóa học ${courseName}`,
      channelId: NOTIFICATION_CHANNELS.ATTENDANCE,
      data: { type: 'attendance', courseName, status },
    });
  }

  showAnnouncementNotification(title: string, message: string): Promise<string> {
    return this.showNotification({
      title: `📢 ${title}`,
      body: message,
      channelId: NOTIFICATION_CHANNELS.ANNOUNCEMENTS,
      priority: 'high',
      data: { type: 'announcement' },
    });
  }
}

// Create singleton instance
export const notificationService = new NotificationService();

// Hook for using notifications
export function useNotifications() {
  return {
    initialize: () => notificationService.initialize(),
    requestPermissions: () => notificationService.requestPermissions(),
    checkPermission: () => notificationService.checkPermissionStatus(),
    showNotification: (data: NotificationData) => notificationService.showNotification(data),
    scheduleNotification: (data: NotificationData, trigger?: Notifications.NotificationTriggerInput) =>
      notificationService.scheduleNotification(data, trigger),
    cancelNotification: (id: string) => notificationService.cancelNotification(id),
    addListener: (callback: (notification: Notifications.Notification) => void) =>
      notificationService.addNotificationReceivedListener(callback),
    addResponseListener: (callback: (response: Notifications.NotificationResponse) => void) =>
      notificationService.addNotificationResponseReceivedListener(callback),
    removeListener: (subscription: Notifications.Subscription) =>
      notificationService.removeNotificationSubscription(subscription),
    showGradeNotification: (courseName: string, grade: number) =>
      notificationService.showGradeNotification(courseName, grade),
    showAssignmentDueNotification: (title: string, dueDate: string) =>
      notificationService.showAssignmentDueNotification(title, dueDate),
    showAttendanceNotification: (courseName: string, status: string) =>
      notificationService.showAttendanceNotification(courseName, status),
    showAnnouncementNotification: (title: string, message: string) =>
      notificationService.showAnnouncementNotification(title, message),
  };
}

export default notificationService;
