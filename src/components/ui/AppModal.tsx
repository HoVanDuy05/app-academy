import React from 'react';
import { Modal, View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Text, useTheme, IconButton } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppButton from './AppButton';

interface AppModalProps {
  visible: boolean;
  onDismiss: () => void;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  showCloseButton?: boolean;
  scrollable?: boolean;
  fullScreen?: boolean;
}

export const AppModal: React.FC<AppModalProps> = ({
  visible,
  onDismiss,
  title,
  children,
  footer,
  showCloseButton = true,
  scrollable = true,
  fullScreen = false,
}) => {
  const theme = useTheme();

  const ContentWrapper = scrollable ? ScrollView : View;

  return (
    <Modal
      visible={visible}
      onDismiss={onDismiss}
      transparent={!fullScreen}
      animationType="fade"
      statusBarTranslucent
    >
      <SafeAreaView style={styles.container}>
        <View
          style={[
            styles.overlay,
            fullScreen && styles.fullScreenOverlay,
            { backgroundColor: fullScreen ? theme.colors.background : 'rgba(0,0,0,0.5)' },
          ]}
        >
          <View
            style={[
              styles.modal,
              fullScreen && styles.fullScreenModal,
              { backgroundColor: theme.colors.surface },
            ]}
          >
            {/* Header */}
            {(title || showCloseButton) && (
              <View style={styles.header}>
                {title && (
                  <Text variant="titleMedium" style={styles.title}>
                    {title}
                  </Text>
                )}
                {showCloseButton && (
                  <IconButton
                    icon="close"
                    size={24}
                    onPress={onDismiss}
                    style={styles.closeButton}
                  />
                )}
              </View>
            )}

            {/* Content */}
            <ContentWrapper
              style={styles.content}
              contentContainerStyle={scrollable && styles.scrollContent}
            >
              {children}
            </ContentWrapper>

            {/* Footer */}
            {footer && <View style={styles.footer}>{footer}</View>}
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

// ModalConfirm component for confirmation dialogs
interface ModalConfirmProps extends Omit<AppModalProps, 'children' | 'footer'> {
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmVariant?: 'primary' | 'danger';
  loading?: boolean;
}

export const ModalConfirm: React.FC<ModalConfirmProps> = ({
  message,
  confirmText = 'Xác nhận',
  cancelText = 'Hủy',
  onConfirm,
  onCancel,
  confirmVariant = 'primary',
  loading = false,
  ...modalProps
}) => {
  return (
    <AppModal
      {...modalProps}
      footer={
        <View style={styles.confirmFooter}>
          <AppButton
            title={cancelText}
            onPress={onCancel}
            variant="outline"
            style={styles.footerButton}
          />
          <AppButton
            title={confirmText}
            onPress={onConfirm}
            variant={confirmVariant}
            loading={loading}
            style={styles.footerButton}
          />
        </View>
      }
    >
      <Text variant="bodyMedium" style={styles.message}>
        {message}
      </Text>
    </AppModal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  fullScreenOverlay: {
    padding: 0,
  },
  modal: {
    width: '100%',
    maxWidth: 400,
    borderRadius: 12,
    maxHeight: '80%',
    overflow: 'hidden',
  },
  fullScreenModal: {
    maxWidth: '100%',
    maxHeight: '100%',
    borderRadius: 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  title: {
    flex: 1,
    fontWeight: '600',
  },
  closeButton: {
    margin: -8,
  },
  content: {
    padding: 16,
  },
  scrollContent: {
    flexGrow: 1,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
  },
  confirmFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
  },
  footerButton: {
    minWidth: 100,
  },
  message: {
    textAlign: 'center',
    lineHeight: 24,
  },
});

export default AppModal;
