import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {StatCard} from '../components/Cards';
import {HeaderBar} from '../components/HeaderBar';
import {Screen} from '../components/Screen';
import {colors} from '../styles/theme';

type GamesHubScreenProps = {
  ghostBestScore: number;
  pairsBestScore: number;
  onStartGhost: () => void;
  onStartPairs: () => void;
};

export function GamesHubScreen({
  ghostBestScore,
  pairsBestScore,
  onStartGhost,
  onStartPairs,
}: GamesHubScreenProps): React.JSX.Element {
  return (
    <Screen scroll withNav>
      <HeaderBar title="Mini Games" subtitle="Choose one toy to play" emoji="🎮" />
      <View style={styles.choiceGrid}>
        <GameChoice
          emoji="👻"
          title="Ghost Hunt"
          text="Catch fast spirits before they vanish. A short reaction challenge."
          score={ghostBestScore}
          tone="purple"
          onPress={onStartGhost}
        />
        <GameChoice
          emoji="🃏"
          title="Spirit Pairs"
          text="Flip cards, remember positions, and match every pair with fewer mistakes."
          score={pairsBestScore}
          tone="teal"
          onPress={onStartPairs}
        />
      </View>
      <View style={styles.statsRow}>
        <StatCard icon="👻" value={String(ghostBestScore)} label="Ghost best" tone="orange" />
        <StatCard icon="🃏" value={String(pairsBestScore)} label="Pairs best" tone="teal" />
      </View>
    </Screen>
  );
}

function GameChoice({
  emoji,
  title,
  text,
  score,
  tone,
  onPress,
}: {
  emoji: string;
  title: string;
  text: string;
  score: number;
  tone: 'purple' | 'teal';
  onPress: () => void;
}): React.JSX.Element {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({pressed}) => [
        styles.gameCard,
        tone === 'teal' ? styles.gameCardTeal : styles.gameCardPurple,
        pressed ? styles.gameCardPressed : undefined,
      ]}>
      <Text style={styles.gameEmoji}>{emoji}</Text>
      <Text style={styles.gameTitle}>{title}</Text>
      <Text style={styles.gameText}>{text}</Text>
      <View style={styles.scoreBadge}>
        <Text style={styles.scoreBadgeText}>Best {score}</Text>
      </View>
      <Text style={styles.playText}>Play now</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  choiceGrid: {
    gap: 14,
    marginTop: 16,
  },
  gameCard: {
    minHeight: 220,
    borderRadius: 16,
    borderWidth: 1,
    padding: 20,
    justifyContent: 'center',
  },
  gameCardPurple: {
    backgroundColor: colors.purpleDeep,
    borderColor: colors.purpleSoft,
  },
  gameCardTeal: {
    backgroundColor: colors.tealDeep,
    borderColor: colors.teal,
  },
  gameCardPressed: {
    opacity: 0.82,
  },
  gameEmoji: {
    fontSize: 48,
  },
  gameTitle: {
    color: colors.text,
    fontSize: 24,
    fontWeight: '900',
    marginTop: 16,
  },
  gameText: {
    color: colors.text,
    opacity: 0.84,
    fontSize: 14,
    lineHeight: 21,
    marginTop: 10,
  },
  scoreBadge: {
    alignSelf: 'flex-start',
    minHeight: 30,
    borderRadius: 10,
    backgroundColor: 'rgba(5, 3, 12, 0.42)',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    paddingHorizontal: 12,
  },
  scoreBadgeText: {
    color: colors.gold,
    fontSize: 12,
    fontWeight: '900',
  },
  playText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '900',
    marginTop: 18,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 14,
  },
});
