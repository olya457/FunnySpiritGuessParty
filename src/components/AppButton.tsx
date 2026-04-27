import React from 'react';
import {ActivityIndicator, Pressable, StyleSheet, Text, ViewStyle} from 'react-native';
import {colors, shadows} from '../styles/theme';

type AppButtonProps = {
  label: string;
  onPress: () => void;
  tone?: 'purple' | 'orange' | 'green' | 'red' | 'dark';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
};

export function AppButton({
  label,
  onPress,
  tone = 'purple',
  disabled,
  loading,
  style,
}: AppButtonProps): React.JSX.Element {
  const backgroundColor =
    tone === 'orange'
      ? colors.orange
      : tone === 'green'
        ? colors.green
        : tone === 'red'
          ? colors.redDeep
          : tone === 'dark'
            ? colors.surfaceStrong
            : colors.purple;

  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled || loading}
      onPress={onPress}
      style={({pressed}) => [
        styles.button,
        {backgroundColor, opacity: disabled ? 0.42 : pressed ? 0.82 : 1},
        tone === 'purple' ? shadows.panel : undefined,
        style,
      ]}>
      {loading ? <ActivityIndicator color={colors.white} /> : <Text style={styles.label}>{label}</Text>}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 56,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 18,
  },
  label: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '800',
    textAlign: 'center',
  },
});
