import React from 'react';
import {Pressable, StyleSheet, Text, View, ViewStyle} from 'react-native';
import {colors} from '../styles/theme';

type StatCardProps = {
  icon: string;
  value: string;
  label: string;
  tone?: 'purple' | 'teal' | 'orange' | 'red';
  style?: ViewStyle;
};

export function StatCard({icon, value, label, tone = 'purple', style}: StatCardProps): React.JSX.Element {
  const accent =
    tone === 'teal' ? colors.teal : tone === 'orange' ? colors.orange : tone === 'red' ? colors.red : colors.purpleSoft;
  return (
    <View style={[styles.statCard, style]}>
      <Text style={styles.statIcon}>{icon}</Text>
      <Text style={[styles.statValue, {color: accent}]}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

type SegmentProps<T extends string> = {
  value: T;
  options: Array<{value: T; label: string}>;
  onChange: (value: T) => void;
};

export function Segment<T extends string>({value, options, onChange}: SegmentProps<T>): React.JSX.Element {
  return (
    <View style={styles.segment}>
      {options.map(option => {
        const active = value === option.value;
        return (
          <Pressable
            accessibilityRole="button"
            key={option.value}
            onPress={() => onChange(option.value)}
            style={[styles.segmentButton, active ? styles.segmentActive : undefined]}>
            <Text style={[styles.segmentLabel, active ? styles.segmentLabelActive : undefined]}>
              {option.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

type EmptyStateProps = {
  icon: string;
  text: string;
};

export function EmptyState({icon, text}: EmptyStateProps): React.JSX.Element {
  return (
    <View style={styles.empty}>
      <Text style={styles.emptyIcon}>{icon}</Text>
      <Text style={styles.emptyText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  statCard: {
    flex: 1,
    minHeight: 86,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: 12,
    justifyContent: 'center',
  },
  statIcon: {
    fontSize: 18,
    marginBottom: 8,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '900',
  },
  statLabel: {
    color: colors.textMuted,
    fontSize: 11,
    marginTop: 3,
  },
  segment: {
    minHeight: 42,
    flexDirection: 'row',
    borderRadius: 13,
    backgroundColor: colors.surface,
    padding: 4,
    gap: 4,
  },
  segmentButton: {
    flex: 1,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  segmentActive: {
    backgroundColor: colors.purple,
  },
  segmentLabel: {
    color: colors.textDim,
    fontSize: 13,
    fontWeight: '800',
    textAlign: 'center',
  },
  segmentLabelActive: {
    color: colors.white,
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 28,
  },
  emptyIcon: {
    fontSize: 42,
    marginBottom: 18,
  },
  emptyText: {
    color: colors.textMuted,
    fontSize: 15,
    lineHeight: 23,
    textAlign: 'center',
  },
});
