// Type declarations for expo modules

declare module 'expo-notifications' {
  export interface Notification {
    request: NotificationRequest;
    date: number;
  }

  export interface NotificationRequest {
    identifier: string;
    content: NotificationContent;
    trigger: NotificationTrigger | null;
  }

  export interface NotificationContent {
    title: string | null;
    subtitle: string | null;
    body: string | null;
    data: { [key: string]: unknown } | null;
    sound: string | null;
    badge: number | null;
    priority?: string;
    channelId?: string;
  }

  export type NotificationTrigger =
    | { type: 'timeInterval'; seconds: number; repeats: boolean }
    | { type: 'daily'; hour: number; minute: number }
    | { type: 'weekly'; weekday: number; hour: number; minute: number }
    | { type: 'date'; date: Date }
    | null;

  export type NotificationTriggerInput = NotificationTrigger;

  export enum AndroidImportance {
    MIN = 1,
    LOW = 2,
    DEFAULT = 3,
    HIGH = 4,
    MAX = 5,
  }

  export enum AndroidNotificationPriority {
    MIN = -2,
    LOW = -1,
    DEFAULT = 0,
    HIGH = 1,
    MAX = 2,
  }

  export interface NotificationChannel {
    id: string;
    name: string;
    importance: AndroidImportance;
    vibrationPattern?: number[];
    sound?: string;
    lightColor?: string;
  }

  export interface NotificationPermissionsStatus {
    status: 'granted' | 'denied' | 'undetermined';
    android?: {
      importance: AndroidImportance;
      interruptionFilter?: number;
    };
    ios?: {
      alert: number;
      badge: number;
      sound: number;
      announcement?: number;
      carPlay?: number;
      criticalAlert?: number;
      provisional?: number;
      providesAppNotificationSettings?: number;
      lockScreen?: number;
      notificationCenter?: number;
    };
  }

  export interface NotificationResponse {
    notification: Notification;
    actionIdentifier: string;
    userText?: string;
  }

  export type Subscription = {
    remove: () => void;
  };

  export function setNotificationHandler(handler: {
    handleNotification: (notification: Notification) => Promise<{
      shouldShowAlert: boolean;
      shouldPlaySound: boolean;
      shouldSetBadge: boolean;
      priority?: AndroidNotificationPriority;
    }>;
  }): void;

  export function getPermissionsAsync(): Promise<NotificationPermissionsStatus>;
  export function requestPermissionsAsync(): Promise<NotificationPermissionsStatus>;
  export function getExpoPushTokenAsync(options?: { projectId?: string }): Promise<{ data: string }>;
  export function scheduleNotificationAsync(
    notification: {
      content: {
        title?: string;
        body?: string;
        data?: Record<string, unknown>;
        sound?: boolean | string;
        priority?: AndroidNotificationPriority;
        channelId?: string;
      };
      trigger: NotificationTriggerInput;
    }
  ): Promise<string>;
  export function cancelScheduledNotificationAsync(identifier: string): Promise<void>;
  export function cancelAllScheduledNotificationsAsync(): Promise<void>;
  export function getAllScheduledNotificationsAsync(): Promise<NotificationRequest[]>;
  export function setNotificationChannelAsync(
    channelId: string,
    channel: Partial<NotificationChannel>
  ): Promise<NotificationChannel | null>;
  export function setBadgeCountAsync(count: number): Promise<void>;
  export function addNotificationReceivedListener(
    listener: (notification: Notification) => void
  ): Subscription;
  export function addNotificationResponseReceivedListener(
    listener: (response: NotificationResponse) => void
  ): Subscription;
  export function removeNotificationSubscription(subscription: Subscription): void;
}

declare module 'expo-device' {
  export const isDevice: boolean;
  export const brand: string | null;
  export const manufacturer: string | null;
  export const modelName: string | null;
  export const deviceYearClass: number | null;
  export const totalMemory: number | null;
  export const supportedCpuArchitectures: string[] | null;
  export const osName: string | null;
  export const osVersion: string | null;
  export const osBuildId: string | null;
  export const osInternalBuildId: string | null;
  export const deviceName: string | null;
  export const designName: string | null;
  export const productName: string | null;
  export const modelId: string | null;
  export const deviceType: string | null;
  export const platformApiLevel: number | null;
}

declare module 'expo-constants' {
  export interface ExpoConfig {
    name?: string;
    description?: string;
    slug?: string;
    version?: string;
    orientation?: string;
    icon?: string;
    userInterfaceStyle?: string;
    splash?: {
      image?: string;
      resizeMode?: string;
      backgroundColor?: string;
    };
    updates?: {
      fallbackToCacheTimeout?: number;
    };
    assetBundlePatterns?: string[];
    ios?: {
      supportsTablet?: boolean;
      bundleIdentifier?: string;
      buildNumber?: string;
    };
    android?: {
      adaptiveIcon?: {
        foregroundImage?: string;
        backgroundColor?: string;
      };
      package?: string;
      versionCode?: number;
    };
    web?: {
      favicon?: string;
    };
    extra?: {
      eas?: {
        projectId?: string;
      };
      [key: string]: any;
    };
  }

  export const expoConfig: ExpoConfig | null;
  export const manifest: Record<string, any> | null;
  export const manifest2: Record<string, any> | null;
  export const systemFonts: string[];
  export const statusBarHeight: number;
  export const deviceName: string | null;
  export const deviceYearClass: number | null;
  export const osVersion: string;
  export const platform: {
    ios?: {
      buildNumber?: string;
      platform?: string;
      model?: string;
      userInterfaceIdiom?: string;
      systemVersion?: string;
    };
    android?: {
      versionCode?: number;
    };
  };
  export const isDevice: boolean;
  export const isHeadless: boolean;
  export const executionEnvironment: string;
  export const sessionId: string;
  export const releaseChannel: string;
}
