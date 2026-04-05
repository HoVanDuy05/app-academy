import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Switch, Button } from 'react-native-paper';
import { SystemSettingsCard } from '@components/roles/admin';
import { useSystemSettings, useUpdateSystemSettings } from '@hooks/roles/admin';

const AdminSystemSettingsScreen = () => {
  const { data: settings } = useSystemSettings();
  const updateSettings = useUpdateSystemSettings();

  return (
    <ScrollView style={styles.container}>
      <SystemSettingsCard
        maintenanceMode={settings?.maintenanceMode || false}
        allowRegistration={settings?.allowRegistration || true}
        emailNotifications={settings?.emailNotifications || true}
        autoGrading={settings?.autoGrading || false}
        onMaintenanceChange={(value) => updateSettings.mutate({ maintenanceMode: value })}
        onRegistrationChange={(value) => updateSettings.mutate({ allowRegistration: value })}
        onEmailNotificationsChange={(value) => updateSettings.mutate({ emailNotifications: value })}
        onAutoGradingChange={(value) => updateSettings.mutate({ autoGrading: value })}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

export default AdminSystemSettingsScreen;
