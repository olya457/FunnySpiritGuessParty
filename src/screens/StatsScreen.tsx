import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {AppButton} from '../components/AppButton';
import {StatCard} from '../components/Cards';
import {HeaderBar} from '../components/HeaderBar';
import {Screen} from '../components/Screen';
import {colors} from '../styles/theme';
import {StoredState} from '../types';

type StatsScreenProps = {
  state: StoredState;
  onClearStats: () => void;
};

export function StatsScreen({state, onClearStats}: StatsScreenProps): React.JSX.Element {
  const [confirming, setConfirming] = useState(false);

  function clear(): void {
    onClearStats();
    setConfirming(false);
  }

  return (
    <Screen scroll withNav>
      <HeaderBar title="Statistics" subtitle="Progress and best results" emoji="📊" />
      <View style={styles.heroCard}>
        <Text style={styles.heroEmoji}>🏆</Text>
        <Text style={styles.heroTitle}>Your Spirit Scoreboard</Text>
        <Text style={styles.heroText}>
          Track quiz progress, theatre wins, mini-game records, and favorite stories in one place.
        </Text>
      </View>
      <View style={styles.statsRow}>
        <StatCard icon="🎯" value={`Level ${state.quizLevel}`} label="Quiz progress" tone="teal" />
        <StatCard icon="✅" value={`${state.quizBestScore}/5`} label="Quiz best" tone="orange" />
      </View>
      <View style={styles.statsRow}>
        <StatCard icon="🎭" value={String(state.partyBestScore)} label="Theatre best" />
        <StatCard icon="👻" value={String(state.ghostBestScore)} label="Ghost best" tone="red" />
      </View>
      <View style={styles.statsRow}>
        <StatCard icon="🃏" value={String(state.pairsBestScore)} label="Pairs best" tone="teal" />
        <StatCard icon="📖" value={String(state.likedStoryIds.length)} label="Favorites" tone="orange" />
      </View>
      <View style={styles.clearCard}>
        <Text style={styles.clearTitle}>Reset statistics</Text>
        <Text style={styles.clearText}>
          This clears scores, quiz progress, and favorites. Onboarding stays completed.
        </Text>
        {confirming ? (
          <View style={styles.confirmRow}>
            <AppButton label="Clear Now" onPress={clear} tone="red" style={styles.confirmButton} />
            <AppButton label="Cancel" onPress={() => setConfirming(false)} tone="dark" style={styles.confirmButton} />
          </View>
        ) : (
          <Pressable accessibilityRole="button" onPress={() => setConfirming(true)} style={styles.clearButton}>
            <Text style={styles.clearButtonText}>Clear Statistics</Text>
          </Pressable>
        )}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  heroCard: {
    borderRadius: 16,
    backgroundColor: colors.purpleDeep,
    minHeight: 210,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 22,
    marginTop: 14,
  },
  heroEmoji: {
    fontSize: 48,
  },
  heroTitle: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '900',
    textAlign: 'center',
    marginTop: 16,
  },
  heroText: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 21,
    textAlign: 'center',
    marginTop: 10,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },
  clearCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: 16,
    marginTop: 16,
  },
  clearTitle: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '900',
  },
  clearText: {
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 19,
    marginTop: 8,
  },
  clearButton: {
    minHeight: 50,
    borderRadius: 13,
    backgroundColor: colors.redDeep,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 14,
  },
  clearButtonText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '900',
  },
  confirmRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 14,
  },
  confirmButton: {
    flex: 1,
    minHeight: 50,
  },
});
