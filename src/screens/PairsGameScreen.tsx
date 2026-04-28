import React, {useEffect, useMemo, useRef, useState} from 'react';
import {Pressable, StyleSheet, Text, View, useWindowDimensions} from 'react-native';
import {AppButton} from '../components/AppButton';
import {StatCard} from '../components/Cards';
import {HeaderBar} from '../components/HeaderBar';
import {Screen} from '../components/Screen';
import {colors} from '../styles/theme';

type PairsGameScreenProps = {
  bestScore: number;
  onBestScore: (score: number) => void;
  onHome?: () => void;
  startImmediately?: boolean;
};

type Phase = 'intro' | 'play' | 'result';

type PairCard = {
  id: string;
  pairId: string;
  emoji: string;
  flipped: boolean;
  matched: boolean;
};

type ResultState = {
  score: number;
  seconds: number;
  moves: number;
  mistakes: number;
  newBest: boolean;
};

const pairEmojis = ['👻', '💀', '🧛', '🧟', '🧙', '🦇', '🎩', '🕵️'];

export function PairsGameScreen({
  bestScore,
  onBestScore,
  onHome,
  startImmediately,
}: PairsGameScreenProps): React.JSX.Element {
  const {width} = useWindowDimensions();
  const cardSize = Math.max(58, Math.min(78, (width - 70) / 4));
  const [phase, setPhase] = useState<Phase>(startImmediately ? 'play' : 'intro');
  const [cards, setCards] = useState<PairCard[]>(() => createDeck());
  const [openIds, setOpenIds] = useState<string[]>([]);
  const [moves, setMoves] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [locked, setLocked] = useState(false);
  const [result, setResult] = useState<ResultState | null>(null);
  const mismatchTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const stars = useMemo(() => resultStars(result?.score ?? 0), [result]);

  useEffect(() => {
    if (phase !== 'play') {
      return;
    }
    const timer = setInterval(() => setSeconds(value => value + 1), 1000);
    return () => clearInterval(timer);
  }, [phase]);

  useEffect(
    () => () => {
      if (mismatchTimerRef.current) {
        clearTimeout(mismatchTimerRef.current);
      }
    },
    [],
  );

  function startGame(): void {
    if (mismatchTimerRef.current) {
      clearTimeout(mismatchTimerRef.current);
      mismatchTimerRef.current = null;
    }
    setCards(createDeck());
    setOpenIds([]);
    setMoves(0);
    setMistakes(0);
    setMatchedPairs(0);
    setSeconds(0);
    setLocked(false);
    setResult(null);
    setPhase('play');
  }

  function finishGame(finalMoves: number, finalMistakes: number, finalSeconds: number): void {
    const score = calculateScore(finalMoves, finalMistakes, finalSeconds);
    setResult({
      score,
      moves: finalMoves,
      mistakes: finalMistakes,
      seconds: finalSeconds,
      newBest: score > bestScore,
    });
    onBestScore(score);
    setPhase('result');
  }

  function pressCard(card: PairCard): void {
    if (locked || card.flipped || card.matched || phase !== 'play') {
      return;
    }

    const nextCards = cards.map(item => (item.id === card.id ? {...item, flipped: true} : item));
    if (openIds.length === 0) {
      setCards(nextCards);
      setOpenIds([card.id]);
      return;
    }

    const firstCard = nextCards.find(item => item.id === openIds[0]);
    if (!firstCard) {
      setCards(nextCards);
      setOpenIds([card.id]);
      return;
    }

    const nextMoves = moves + 1;
    setMoves(nextMoves);
    setLocked(true);

    if (firstCard.pairId === card.pairId) {
      const matchedCards = nextCards.map(item =>
        item.pairId === card.pairId ? {...item, matched: true, flipped: true} : item,
      );
      const nextMatchedPairs = matchedPairs + 1;
      setCards(matchedCards);
      setOpenIds([]);
      setMatchedPairs(nextMatchedPairs);
      setLocked(false);
      if (nextMatchedPairs === pairEmojis.length) {
        finishGame(nextMoves, mistakes, seconds);
      }
      return;
    }

    const nextMistakes = mistakes + 1;
    setCards(nextCards);
    setMistakes(nextMistakes);
    mismatchTimerRef.current = setTimeout(() => {
      setCards(current =>
        current.map(item =>
          item.id === firstCard.id || item.id === card.id ? {...item, flipped: false} : item,
        ),
      );
      setOpenIds([]);
      setLocked(false);
      mismatchTimerRef.current = null;
    }, 620);
  }

  if (phase === 'intro') {
    return (
      <Screen scroll withNav={!onHome}>
        <HeaderBar title="Spirit Pairs" subtitle="Find matching spirits" emoji="🃏" onBack={onHome} />
        <View style={styles.heroCard}>
          <Text style={styles.heroEmoji}>👻</Text>
          <Text style={styles.heroTitle}>Find the Pairs</Text>
          <Text style={styles.heroText}>
            Flip cards, remember the spirits, and match every pair with fewer moves.
          </Text>
          <AppButton label="Start Matching" onPress={startGame} style={styles.heroButton} />
        </View>
        <View style={styles.statsRow}>
          <StatCard icon="🃏" value="16" label="Cards" />
          <StatCard icon="👻" value="8" label="Pairs" tone="teal" />
        </View>
        <View style={styles.statsRow}>
          <StatCard icon="🏆" value={String(bestScore)} label="Best score" tone="orange" />
          <StatCard icon="⚡" value="Memory" label="No timer limit" tone="red" />
        </View>
      </Screen>
    );
  }

  if (phase === 'result' && result) {
    return (
      <Screen scroll withNav={!onHome}>
        <HeaderBar title="Pairs Complete!" subtitle="Your spirit memory report" emoji="🎉" onBack={onHome} />
        <View style={styles.resultHero}>
          <Text style={styles.resultStars}>{stars}</Text>
          <Text style={styles.resultScore}>{result.score}</Text>
          <Text style={styles.resultText}>
            {result.newBest ? 'New best score!' : 'Try fewer moves to beat your best.'}
          </Text>
        </View>
        <View style={styles.statsRow}>
          <StatCard icon="⏱️" value={`${result.seconds}s`} label="Time" tone="teal" />
          <StatCard icon="👆" value={String(result.moves)} label="Moves" />
        </View>
        <View style={styles.statsRow}>
          <StatCard icon="💥" value={String(result.mistakes)} label="Misses" tone="red" />
          <StatCard icon="🏆" value={String(Math.max(bestScore, result.score))} label="Best" tone="orange" />
        </View>
        <View style={styles.actions}>
          <AppButton label="Play Again" onPress={startGame} style={styles.actionButton} />
          <AppButton
            label={onHome ? 'Games' : 'Start Page'}
            onPress={onHome ?? (() => setPhase('intro'))}
            tone="dark"
            style={styles.actionButton}
          />
        </View>
      </Screen>
    );
  }

  return (
    <Screen scroll withNav={!onHome}>
      <HeaderBar title="Spirit Pairs" subtitle="Flip two cards at a time" emoji="🃏" onBack={onHome} />
      <View style={styles.playStats}>
        <Text style={styles.playStat}>⏱️ {seconds}s</Text>
        <Text style={styles.playStat}>👆 {moves}</Text>
        <Text style={styles.playStat}>✅ {matchedPairs}/{pairEmojis.length}</Text>
      </View>
      <View style={styles.board}>
        {cards.map(card => {
          const visible = card.flipped || card.matched;
          return (
            <Pressable
              accessibilityRole="button"
              key={card.id}
              onPress={() => pressCard(card)}
              style={[
                styles.card,
                {
                  width: cardSize,
                  height: cardSize,
                },
                visible ? styles.cardOpen : undefined,
                card.matched ? styles.cardMatched : undefined,
              ]}>
              <Text style={[styles.cardText, visible ? styles.cardTextVisible : undefined]}>
                {visible ? card.emoji : '?'}
              </Text>
            </Pressable>
          );
        })}
      </View>
      <View style={styles.actions}>
        <AppButton label="Restart" onPress={startGame} tone="dark" style={styles.actionButton} />
        <AppButton
          label={onHome ? 'Games' : 'Start Page'}
          onPress={onHome ?? (() => setPhase('intro'))}
          tone="orange"
          style={styles.actionButton}
        />
      </View>
    </Screen>
  );
}

function createDeck(): PairCard[] {
  const deck = pairEmojis.flatMap((emoji, index) => [
    {id: `${index}-a`, pairId: String(index), emoji, flipped: false, matched: false},
    {id: `${index}-b`, pairId: String(index), emoji, flipped: false, matched: false},
  ]);
  return shuffle(deck);
}

function shuffle<T>(items: T[]): T[] {
  const nextItems = [...items];
  for (let index = nextItems.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    const current = nextItems[index];
    nextItems[index] = nextItems[swapIndex];
    nextItems[swapIndex] = current;
  }
  return nextItems;
}

function calculateScore(moves: number, mistakes: number, seconds: number): number {
  return Math.max(100, 1400 - moves * 22 - mistakes * 28 - seconds * 7);
}

function resultStars(score: number): string {
  if (score >= 1000) {
    return '⭐⭐⭐';
  }
  if (score >= 700) {
    return '⭐⭐';
  }
  return '⭐';
}

const styles = StyleSheet.create({
  heroCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    alignItems: 'center',
    padding: 22,
    marginTop: 14,
  },
  heroEmoji: {
    fontSize: 58,
  },
  heroTitle: {
    color: colors.text,
    fontSize: 24,
    fontWeight: '900',
    marginTop: 18,
  },
  heroText: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 21,
    textAlign: 'center',
    marginTop: 10,
  },
  heroButton: {
    minHeight: 50,
    marginTop: 20,
    paddingHorizontal: 22,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },
  playStats: {
    minHeight: 46,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 12,
    paddingHorizontal: 10,
  },
  playStat: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '900',
  },
  board: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
    marginTop: 18,
  },
  card: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceStrong,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardOpen: {
    backgroundColor: colors.purpleDeep,
    borderColor: colors.purpleSoft,
  },
  cardMatched: {
    backgroundColor: '#063f31',
    borderColor: colors.teal,
  },
  cardText: {
    color: colors.textMuted,
    fontSize: 26,
    fontWeight: '900',
  },
  cardTextVisible: {
    fontSize: 32,
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 18,
  },
  actionButton: {
    flex: 1,
    minHeight: 52,
  },
  resultHero: {
    borderRadius: 16,
    backgroundColor: colors.purpleDeep,
    alignItems: 'center',
    padding: 26,
    marginTop: 16,
  },
  resultStars: {
    fontSize: 28,
  },
  resultScore: {
    color: colors.text,
    fontSize: 42,
    fontWeight: '900',
    marginTop: 12,
  },
  resultText: {
    color: colors.textMuted,
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
  },
});
