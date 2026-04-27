import React from 'react';
import {Modal, Pressable, StyleSheet, Text, View} from 'react-native';
import {colors} from '../styles/theme';
import {AppButton} from './AppButton';

type PauseModalProps = {
  visible: boolean;
  title: string;
  message: string;
  onLeave: () => void;
  onResume: () => void;
};

export function PauseModal({visible, title, message, onLeave, onResume}: PauseModalProps): React.JSX.Element {
  return (
    <Modal transparent visible={visible} animationType="fade" onRequestClose={onResume}>
      <View style={styles.overlay}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onResume} />
        <View style={styles.card}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>
          <View style={styles.actions}>
            <AppButton label="Leave" onPress={onLeave} style={styles.action} />
            <AppButton label="Resume" onPress={onResume} tone="green" style={styles.action} />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(5, 3, 12, 0.72)',
    justifyContent: 'center',
    padding: 22,
  },
  card: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: 24,
  },
  title: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '900',
    textAlign: 'center',
  },
  message: {
    color: colors.text,
    fontSize: 14,
    lineHeight: 21,
    textAlign: 'center',
    marginTop: 10,
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 22,
  },
  action: {
    flex: 1,
    minHeight: 52,
  },
});
