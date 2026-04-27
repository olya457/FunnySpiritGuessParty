import React, {useMemo, useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {AppButton} from '../components/AppButton';
import {StatCard} from '../components/Cards';
import {HeaderBar} from '../components/HeaderBar';
import {PauseModal} from '../components/PauseModal';
import {Screen} from '../components/Screen';
import {partySituations} from '../data/content';
import {colors} from '../styles/theme';

type PartyHomeScreenProps = {
  bestScore: number;
  onOpenHowTo: () => void;
  onStart: () => void;
};

export function PartyHomeScreen({bestScore, onOpenHowTo, onStart}: PartyHomeScreenProps): React.JSX.Element {
  return (
    <Screen scroll withNav>
      <HeaderBar title="Spirit Party" subtitle="Guess the ghostly outcome with friends" emoji="🎭" />
      <View style={styles.heroCard}>
        <Text style={styles.heroEmoji}>🎭</Text>
        <Text style={styles.heroTitle}>Spirit Situation</Text>
        <Text style={styles.heroText}>
          A mystery situation is revealed. Everyone guesses the supernatural twist. Who earns the funniest truth?
        </Text>
        <AppButton label="▶ Start Game" onPress={onStart} tone="dark" style={styles.heroButton} />
      </View>
      <Pressable accessibilityRole="button" onPress={onOpenHowTo} style={styles.howToRow}>
        <View style={styles.howToIcon}>
          <Text>📙</Text>
        </View>
        <View style={styles.howToCopy}>
          <Text style={styles.howToTitle}>How to Play</Text>
          <Text style={styles.howToText}>Learn the rules in 30 seconds</Text>
        </View>
        <Text style={styles.chevron}>›</Text>
      </Pressable>
      <View style={styles.statsGrid}>
        <StatCard icon="🎭" value={String(partySituations.length)} label="Situations" tone="orange" />
        <StatCard icon="👥" value="2-6" label="Players" />
      </View>
      <View style={styles.statsGrid}>
        <StatCard icon="🎯" value="5" label="Per game" tone="red" />
        <StatCard icon="🏆" value={String(bestScore)} label="Best score" tone="teal" />
      </View>
    </Screen>
  );
}

type PartyHowToScreenProps = {
  onBack: () => void;
  onStart: () => void;
};

export function PartyHowToScreen({onBack, onStart}: PartyHowToScreenProps): React.JSX.Element {
  const steps = [
    ['1', 'Gather Your Crew', 'Get 2 to 6 players together. Pass the phone around, no peeking!'],
    ['2', 'Read the Situation', 'A mysterious scenario is shown to all players. Take a moment to read carefully.'],
    ['3', 'Secret Guesses', 'Everyone silently thinks of their most creative, funniest supernatural explanation.'],
    ['4', 'The Reveal', 'Tap Reveal Answer to see the actual ghostly truth. It is always weirder than expected.'],
    ['5', 'Vote', 'Decide who had the funniest or closest guess. That player earns a point.'],
  ];

  return (
    <Screen scroll>
      <HeaderBar title="How to Play" onBack={onBack} />
      <View style={styles.stepList}>
        {steps.map(step => (
          <View key={step[0]} style={styles.stepCard}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>{step[0]}</Text>
            </View>
            <View style={styles.stepCopy}>
              <Text style={styles.stepTitle}>{step[1]}</Text>
              <Text style={styles.stepText}>{step[2]}</Text>
            </View>
          </View>
        ))}
      </View>
      <AppButton label="Got It! Let's Play ✨" onPress={onStart} />
    </Screen>
  );
}

type PartySetupScreenProps = {
  onBack: () => void;
  onStart: (players: number) => void;
};

export function PartySetupScreen({onBack, onStart}: PartySetupScreenProps): React.JSX.Element {
  const [players, setPlayers] = useState(3);

  return (
    <Screen scroll>
      <HeaderBar title="Game Setup" onBack={onBack} />
      <View style={styles.setupCard}>
        <Text style={styles.setupEmoji}>👥</Text>
        <Text style={styles.setupTitle}>How many players?</Text>
        <Text style={styles.setupText}>Choose 2 to 6 players</Text>
        <View style={styles.playerGrid}>
          {[2, 3, 4, 5, 6].map(count => (
            <Pressable
              accessibilityRole="button"
              key={count}
              onPress={() => setPlayers(count)}
              style={[styles.playerButton, players === count ? styles.playerButtonActive : undefined]}>
              <Text style={[styles.playerCount, players === count ? styles.playerTextActive : undefined]}>{count}</Text>
              <Text style={[styles.playerLabel, players === count ? styles.playerTextActive : undefined]}>players</Text>
            </Pressable>
          ))}
        </View>
        <Text style={styles.setupHint}>
          ✨ You’ll play 5 rounds with {players} players. Each round, everyone secretly guesses the supernatural twist.
        </Text>
      </View>
      <AppButton label="▶ Start the Spirit Party!" onPress={() => onStart(players)} />
    </Screen>
  );
}

type PartyRoundScreenProps = {
  players: number;
  onBackHome: () => void;
  onTeach: () => void;
  onFinish: (scores: number[]) => void;
};

export function PartyRoundScreen({players, onBackHome, onTeach, onFinish}: PartyRoundScreenProps): React.JSX.Element {
  const [round, setRound] = useState(1);
  const [revealed, setRevealed] = useState(false);
  const [scores, setScores] = useState<number[]>(() => Array.from({length: players}, () => 0));
  const [pauseVisible, setPauseVisible] = useState(false);
  const situation = useMemo(() => partySituations[(round - 1) % partySituations.length], [round]);
  const totalRounds = 5;

  function vote(index: number | null): void {
    const nextScores = [...scores];
    if (index !== null) {
      nextScores[index] += 1;
    }
    if (round >= totalRounds) {
      onFinish(nextScores);
      return;
    }
    setScores(nextScores);
    setRound(value => value + 1);
    setRevealed(false);
  }

  return (
    <Screen scroll>
      <HeaderBar
        title={`Round ${round} / ${totalRounds}`}
        onBack={() => setPauseVisible(true)}
        right={
          <Pressable accessibilityRole="button" onPress={onTeach} style={styles.teachButton}>
            <Text style={styles.teachText}>Teach Humor</Text>
          </Pressable>
        }
      />
      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, {width: `${(round / totalRounds) * 100}%`}]} />
      </View>
      <View style={styles.situationCard}>
        <Text style={styles.cardLabel}>☾ THE SITUATION</Text>
        <Text style={styles.situationText}>{situation.situation}</Text>
      </View>
      <View style={styles.guessCard}>
        <Text style={styles.guessText}>
          🤫 Everyone silently thinks of their funniest supernatural explanation. When ready, reveal the answer!
        </Text>
      </View>
      {revealed ? (
        <View style={styles.answerCard}>
          <Text style={styles.answerLabel}>✦ THE REAL ANSWER</Text>
          <Text style={styles.answerText}>{situation.answer}</Text>
        </View>
      ) : null}
      <View style={styles.roundFooter}>
        {revealed ? (
          <View style={styles.votePanel}>
            <Text style={styles.voteTitle}>Who had the funniest guess? 🏆</Text>
            <View style={styles.voteGrid}>
              {scores.map((_, index) => (
                <Pressable
                  accessibilityRole="button"
                  key={index}
                  onPress={() => vote(index)}
                  style={styles.voteButton}>
                  <Text style={styles.voteText}>P{index + 1}</Text>
                </Pressable>
              ))}
            </View>
            <Pressable accessibilityRole="button" onPress={() => vote(null)} style={styles.skipVote}>
              <Text style={styles.skipVoteText}>Skip voting → Next Round</Text>
            </Pressable>
          </View>
        ) : (
          <AppButton label="♥ Reveal the Truth!" tone="orange" onPress={() => setRevealed(true)} />
        )}
      </View>
      <PauseModal
        visible={pauseVisible}
        title="Spirit Break"
        message="The spirits are floating in place. Leave this round or return to the mystery."
        onLeave={onBackHome}
        onResume={() => setPauseVisible(false)}
      />
    </Screen>
  );
}

type PartyResultsScreenProps = {
  scores: number[];
  onHome: () => void;
  onPlayAgain: () => void;
};

export function PartyResultsScreen({scores, onHome, onPlayAgain}: PartyResultsScreenProps): React.JSX.Element {
  const max = Math.max(...scores);
  const winners = scores
    .map((score, index) => ({score, index}))
    .filter(item => item.score === max)
    .map(item => item.index + 1);
  const tie = winners.length > 1;

  return (
    <Screen scroll>
      <HeaderBar title="Final Results" emoji="🏆" />
      <View style={styles.winnerCard}>
        <Text style={styles.winnerEmoji}>👑</Text>
        <Text style={styles.winnerTitle}>{tie ? "It's a Tie!" : `Player ${winners[0]} Wins!`}</Text>
        <Text style={styles.winnerText}>With {max} points!</Text>
      </View>
      <View style={styles.scoreList}>
        {scores
          .map((score, index) => ({score, index}))
          .sort((a, b) => b.score - a.score)
          .map(item => (
            <View key={item.index} style={[styles.scoreRow, item.score === max ? styles.scoreRowWinner : undefined]}>
              <Text style={styles.scorePlayer}>🏅 Player {item.index + 1}</Text>
              <Text style={styles.scorePill}>{item.score} pts</Text>
            </View>
          ))}
      </View>
      <View style={styles.resultActions}>
        <AppButton label="↻ Play Again" onPress={onPlayAgain} style={styles.resultButton} />
        <Pressable accessibilityRole="button" onPress={onHome} style={styles.homeMini}>
          <Text style={styles.homeMiniText}>⌂</Text>
        </Pressable>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  heroCard: {
    borderRadius: 16,
    backgroundColor: colors.purpleDeep,
    padding: 22,
    minHeight: 300,
    justifyContent: 'center',
    marginTop: 12,
  },
  heroEmoji: {
    fontSize: 48,
    marginBottom: 22,
  },
  heroTitle: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '900',
  },
  heroText: {
    color: colors.text,
    opacity: 0.82,
    fontSize: 14,
    lineHeight: 21,
    marginTop: 10,
  },
  heroButton: {
    alignSelf: 'flex-start',
    marginTop: 22,
    minHeight: 48,
    paddingHorizontal: 22,
  },
  howToRow: {
    minHeight: 74,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 14,
    padding: 12,
  },
  howToIcon: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: colors.orange,
    alignItems: 'center',
    justifyContent: 'center',
  },
  howToCopy: {
    flex: 1,
  },
  howToTitle: {
    color: colors.text,
    fontWeight: '900',
    fontSize: 15,
  },
  howToText: {
    color: colors.textMuted,
    fontSize: 12,
    marginTop: 4,
  },
  chevron: {
    color: colors.textDim,
    fontSize: 26,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },
  stepList: {
    gap: 10,
    marginVertical: 12,
  },
  stepCard: {
    minHeight: 80,
    flexDirection: 'row',
    gap: 12,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: 12,
  },
  stepNumber: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: colors.purple,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNumberText: {
    color: colors.white,
    fontWeight: '900',
  },
  stepCopy: {
    flex: 1,
  },
  stepTitle: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '900',
  },
  stepText: {
    color: colors.textMuted,
    fontSize: 12,
    lineHeight: 18,
    marginTop: 4,
  },
  setupCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: 18,
    alignItems: 'center',
    marginVertical: 18,
  },
  setupEmoji: {
    fontSize: 46,
    marginVertical: 14,
  },
  setupTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '900',
  },
  setupText: {
    color: colors.textMuted,
    fontSize: 12,
    marginTop: 6,
  },
  playerGrid: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'center',
    marginTop: 22,
  },
  playerButton: {
    width: '30%',
    minWidth: 78,
    height: 64,
    borderRadius: 12,
    backgroundColor: colors.backgroundSoft,
    borderWidth: 1,
    borderColor: colors.borderSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playerButtonActive: {
    backgroundColor: colors.purple,
    borderColor: colors.purpleSoft,
  },
  playerCount: {
    color: colors.textMuted,
    fontSize: 18,
    fontWeight: '900',
  },
  playerLabel: {
    color: colors.textDim,
    fontSize: 10,
    marginTop: 4,
  },
  playerTextActive: {
    color: colors.white,
  },
  setupHint: {
    color: colors.textMuted,
    backgroundColor: colors.backgroundSoft,
    overflow: 'hidden',
    borderRadius: 12,
    fontSize: 12,
    lineHeight: 18,
    marginTop: 22,
    padding: 13,
    textAlign: 'center',
  },
  teachButton: {
    minHeight: 32,
    borderRadius: 9,
    backgroundColor: colors.surfaceStrong,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  teachText: {
    color: colors.purpleSoft,
    fontSize: 11,
    fontWeight: '900',
  },
  progressTrack: {
    height: 3,
    borderRadius: 2,
    backgroundColor: colors.surfaceStrong,
    marginBottom: 18,
  },
  progressFill: {
    height: 3,
    borderRadius: 2,
    backgroundColor: colors.purpleSoft,
  },
  situationCard: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.purpleDeep,
    padding: 16,
  },
  cardLabel: {
    color: colors.gold,
    fontSize: 10,
    letterSpacing: 0,
    fontWeight: '900',
  },
  situationText: {
    color: colors.text,
    fontSize: 15,
    lineHeight: 22,
    marginTop: 12,
  },
  guessCard: {
    borderRadius: 13,
    backgroundColor: colors.surface,
    padding: 15,
    marginTop: 12,
  },
  guessText: {
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 19,
    textAlign: 'center',
  },
  answerCard: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#0fb783',
    backgroundColor: '#063f31',
    padding: 16,
    marginTop: 12,
  },
  answerLabel: {
    color: '#36e3a6',
    fontSize: 10,
    letterSpacing: 0,
    fontWeight: '900',
  },
  answerText: {
    color: colors.text,
    fontSize: 14,
    lineHeight: 21,
    marginTop: 10,
  },
  roundFooter: {
    marginTop: 18,
  },
  votePanel: {
    borderRadius: 14,
    backgroundColor: colors.surface,
    padding: 12,
  },
  voteTitle: {
    color: colors.textMuted,
    textAlign: 'center',
    fontSize: 12,
    marginBottom: 10,
    fontWeight: '800',
  },
  voteGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  voteButton: {
    flexGrow: 1,
    minWidth: 82,
    minHeight: 44,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surfaceStrong,
  },
  voteText: {
    color: colors.text,
    fontWeight: '900',
  },
  skipVote: {
    minHeight: 42,
    borderRadius: 10,
    backgroundColor: colors.backgroundSoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 9,
  },
  skipVoteText: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '800',
  },
  winnerCard: {
    borderRadius: 16,
    backgroundColor: colors.orangeDeep,
    minHeight: 160,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    padding: 20,
  },
  winnerEmoji: {
    fontSize: 42,
  },
  winnerTitle: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '900',
    marginTop: 12,
  },
  winnerText: {
    color: colors.text,
    fontSize: 13,
    marginTop: 7,
  },
  scoreList: {
    gap: 10,
    marginTop: 18,
  },
  scoreRow: {
    minHeight: 54,
    borderRadius: 12,
    backgroundColor: colors.surface,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  scoreRowWinner: {
    backgroundColor: '#8d3b0b',
  },
  scorePlayer: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '800',
  },
  scorePill: {
    overflow: 'hidden',
    borderRadius: 9,
    backgroundColor: colors.purple,
    color: colors.white,
    fontSize: 12,
    fontWeight: '900',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  resultActions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 18,
  },
  resultButton: {
    flex: 1,
  },
  homeMini: {
    width: 56,
    minHeight: 56,
    borderRadius: 14,
    backgroundColor: colors.surfaceStrong,
    alignItems: 'center',
    justifyContent: 'center',
  },
  homeMiniText: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '900',
  },
});
