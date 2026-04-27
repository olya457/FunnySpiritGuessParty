import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  Animated,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ViewStyle,
  useWindowDimensions,
} from 'react-native';
import {AppButton} from '../components/AppButton';
import {StatCard} from '../components/Cards';
import {HeaderBar} from '../components/HeaderBar';
import {PauseModal} from '../components/PauseModal';
import {Screen} from '../components/Screen';
import {colors} from '../styles/theme';

type GhostHomeScreenProps = {
  bestScore: number;
  onStart: () => void;
};

type GhostPlayScreenProps = {
  onHome: () => void;
  onFinish: (score: number, rounds: number, bestCombo: number) => void;
};

type GhostResultsScreenProps = {
  score: number;
  rounds: number;
  bestCombo: number;
  onHome: () => void;
  onPlayAgain: () => void;
};

type Point = {
  x: number;
  y: number;
};

type GhostSpawn = Point & {
  size: number;
  duration: number;
};

type ScorePopup = Point & {
  id: number;
};

const gameDurationSeconds = 30;

export function GhostHomeScreen({bestScore, onStart}: GhostHomeScreenProps): React.JSX.Element {
  return (
    <Screen scroll withNav>
      <HeaderBar title="Ghost Hunt" subtitle="Tap the spirit before it vanishes" emoji="👻" />
      <View style={styles.heroCard}>
        <Text style={styles.heroEmoji}>👻</Text>
        <Text style={styles.heroTitle}>Spirit Chase</Text>
        <Text style={styles.heroText}>
          The ghost appears in random places for 30 seconds. Catch it fast before it vanishes.
        </Text>
        <AppButton label="▶ Start Hunting!" onPress={onStart} style={styles.heroButton} />
      </View>
      <View style={styles.statsRow}>
        <StatCard icon="⏱️" value="30 sec" label="Catch as many as you can" tone="red" />
        <StatCard icon="🎯" value="Random" label="New place every time" tone="teal" />
      </View>
      <View style={styles.statsRow}>
        <StatCard icon="⚡" value="Faster" label="Speed rises each round" tone="orange" />
        <StatCard icon="🏆" value={String(bestScore)} label="Best score" />
      </View>
    </Screen>
  );
}

export function GhostPlayScreen({onHome, onFinish}: GhostPlayScreenProps): React.JSX.Element {
  const {width, height} = useWindowDimensions();
  const fieldWidth = Math.max(300, width - 40);
  const fieldHeight = Math.max(360, height - (Platform.OS === 'android' ? 250 : 270));
  const [countdown, setCountdown] = useState(3);
  const [timeLeft, setTimeLeft] = useState(gameDurationSeconds);
  const [round, setRound] = useState(1);
  const [caught, setCaught] = useState(0);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [bestCombo, setBestCombo] = useState(0);
  const [ghost, setGhost] = useState<GhostSpawn | null>(null);
  const [scorePopup, setScorePopup] = useState<ScorePopup | null>(null);
  const [pauseVisible, setPauseVisible] = useState(false);
  const ghostAnim = useRef(new Animated.Value(0)).current;
  const scorePopupAnim = useRef(new Animated.Value(0)).current;
  const spawnTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const gameTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const nextSpawnTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scorePopupTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const resolvingRef = useRef(false);
  const finishedRef = useRef(false);
  const scoreRef = useRef(0);
  const caughtRef = useRef(0);
  const bestComboRef = useRef(0);
  const timeLeftRef = useRef(gameDurationSeconds);
  const gameStarted = countdown <= 0;

  const stars = useMemo(
    () =>
      Array.from({length: 46}, (_, index) => ({
        id: index,
        left: (((index * 37) % 100) / 100) * fieldWidth,
        top: (((index * 61) % 100) / 100) * fieldHeight,
        opacity: 0.22 + ((index * 17) % 48) / 100,
      })),
    [fieldHeight, fieldWidth],
  );

  const progressStyle: ViewStyle = {
    width: `${(timeLeft / gameDurationSeconds) * 100}%` as `${number}%`,
  };
  const ghostScale = ghostAnim.interpolate({inputRange: [0, 1], outputRange: [0.62, 1]});
  const ghostOpacity = ghostAnim.interpolate({inputRange: [0, 0.18, 1], outputRange: [0, 1, 1]});
  const ghostStyle = ghost
    ? {
        left: ghost.x - ghost.size / 2,
        top: ghost.y - ghost.size / 2,
        width: ghost.size,
        height: ghost.size,
        opacity: ghostOpacity,
        transform: [{scale: ghostScale}],
      }
    : undefined;
  const ghostTextStyle = ghost ? {fontSize: ghost.size * 0.62} : undefined;
  const scorePopupStyle = scorePopup
    ? {
        left: Math.max(10, Math.min(fieldWidth - 52, scorePopup.x - 18)),
        top: Math.max(10, Math.min(fieldHeight - 34, scorePopup.y - 30)),
        opacity: scorePopupAnim.interpolate({inputRange: [0, 0.25, 1], outputRange: [0, 1, 0]}),
        transform: [
          {
            translateY: scorePopupAnim.interpolate({inputRange: [0, 1], outputRange: [0, -24]}),
          },
          {
            scale: scorePopupAnim.interpolate({inputRange: [0, 0.3, 1], outputRange: [0.7, 1, 1]}),
          },
        ],
      }
    : undefined;

  const clearSpawnTimer = useCallback(() => {
    if (spawnTimerRef.current) {
      clearTimeout(spawnTimerRef.current);
      spawnTimerRef.current = null;
    }
  }, []);

  const clearGameTimer = useCallback(() => {
    if (gameTimerRef.current) {
      clearInterval(gameTimerRef.current);
      gameTimerRef.current = null;
    }
  }, []);

  const clearNextSpawnTimer = useCallback(() => {
    if (nextSpawnTimerRef.current) {
      clearTimeout(nextSpawnTimerRef.current);
      nextSpawnTimerRef.current = null;
    }
  }, []);

  const clearScorePopupTimer = useCallback(() => {
    if (scorePopupTimerRef.current) {
      clearTimeout(scorePopupTimerRef.current);
      scorePopupTimerRef.current = null;
    }
  }, []);

  const finishGame = useCallback(
    (finalScore: number, finalCaught: number, finalBestCombo: number) => {
      if (finishedRef.current) {
        return;
      }
      finishedRef.current = true;
      clearSpawnTimer();
      clearGameTimer();
      clearNextSpawnTimer();
      clearScorePopupTimer();
      setGhost(null);
      setScorePopup(null);
      onFinish(finalScore, finalCaught, finalBestCombo);
    },
    [clearGameTimer, clearNextSpawnTimer, clearScorePopupTimer, clearSpawnTimer, onFinish],
  );

  const scheduleNextSpawn = useCallback(
    (delay: number) => {
      clearNextSpawnTimer();
      nextSpawnTimerRef.current = setTimeout(() => {
        if (timeLeftRef.current <= 0 || finishedRef.current) {
          finishGame(scoreRef.current, caughtRef.current, bestComboRef.current);
          return;
        }
        resolvingRef.current = false;
        setRound(value => value + 1);
      }, delay);
    },
    [clearNextSpawnTimer, finishGame],
  );

  const missGhost = useCallback(() => {
    if (resolvingRef.current || finishedRef.current) {
      return;
    }
    resolvingRef.current = true;
    clearSpawnTimer();
    ghostAnim.stopAnimation();
    Animated.timing(ghostAnim, {
      toValue: 0,
      duration: 120,
      useNativeDriver: true,
    }).start();
    setGhost(null);
    setCombo(0);
    scheduleNextSpawn(nextSpawnDelay(round));
  }, [clearSpawnTimer, ghostAnim, round, scheduleNextSpawn]);

  const hitGhost = useCallback(() => {
    if (!ghost || resolvingRef.current || finishedRef.current) {
      return;
    }
    resolvingRef.current = true;
    clearSpawnTimer();
    ghostAnim.stopAnimation();
    Animated.timing(ghostAnim, {
      toValue: 0,
      duration: 100,
      useNativeDriver: true,
    }).start();
    const nextCombo = combo + 1;
    const nextScore = score + 1;
    const nextBestCombo = Math.max(bestCombo, nextCombo);
    const nextCaught = caught + 1;
    scoreRef.current = nextScore;
    caughtRef.current = nextCaught;
    bestComboRef.current = nextBestCombo;
    clearScorePopupTimer();
    scorePopupAnim.stopAnimation();
    scorePopupAnim.setValue(0);
    setScorePopup({id: Date.now(), x: ghost.x, y: ghost.y});
    Animated.timing(scorePopupAnim, {
      toValue: 1,
      duration: 520,
      useNativeDriver: true,
    }).start();
    scorePopupTimerRef.current = setTimeout(() => setScorePopup(null), 540);
    setGhost(null);
    setCombo(nextCombo);
    setCaught(nextCaught);
    setBestCombo(nextBestCombo);
    setScore(nextScore);
    scheduleNextSpawn(120);
  }, [
    bestCombo,
    caught,
    clearScorePopupTimer,
    clearSpawnTimer,
    combo,
    ghost,
    ghostAnim,
    scheduleNextSpawn,
    score,
    scorePopupAnim,
  ]);

  useEffect(() => {
    if (countdown <= 0) {
      return;
    }
    const id = setTimeout(() => setCountdown(value => value - 1), 850);
    return () => clearTimeout(id);
  }, [countdown]);

  useEffect(() => {
    if (!gameStarted || pauseVisible || finishedRef.current) {
      return;
    }
    clearGameTimer();
    gameTimerRef.current = setInterval(() => {
      setTimeLeft(value => {
        const nextValue = Math.max(0, value - 1);
        timeLeftRef.current = nextValue;
        return nextValue;
      });
    }, 1000);
    return clearGameTimer;
  }, [clearGameTimer, gameStarted, pauseVisible]);

  useEffect(() => {
    if (!gameStarted || timeLeft > 0 || finishedRef.current) {
      return;
    }
    finishGame(scoreRef.current, caughtRef.current, bestComboRef.current);
  }, [finishGame, gameStarted, timeLeft]);

  useEffect(() => {
    if (
      !gameStarted ||
      pauseVisible ||
      timeLeft <= 0 ||
      finishedRef.current ||
      resolvingRef.current
    ) {
      return;
    }

    resolvingRef.current = false;
    clearSpawnTimer();
    const spawn = createSpawn(fieldWidth, fieldHeight, round);
    setGhost(spawn);
    ghostAnim.setValue(0);
    Animated.sequence([
      Animated.spring(ghostAnim, {
        toValue: 1,
        friction: 5,
        tension: 130,
        useNativeDriver: true,
      }),
      Animated.delay(Math.max(80, spawn.duration - 210)),
      Animated.timing(ghostAnim, {
        toValue: 0,
        duration: 90,
        useNativeDriver: true,
      }),
    ]).start();
    spawnTimerRef.current = setTimeout(missGhost, spawn.duration);

    return () => {
      clearSpawnTimer();
      ghostAnim.stopAnimation();
    };
  }, [
    clearSpawnTimer,
    fieldHeight,
    fieldWidth,
    gameStarted,
    ghostAnim,
    missGhost,
    pauseVisible,
    round,
    timeLeft,
  ]);

  useEffect(
    () => () => {
      clearSpawnTimer();
      clearGameTimer();
      clearNextSpawnTimer();
      clearScorePopupTimer();
    },
    [clearGameTimer, clearNextSpawnTimer, clearScorePopupTimer, clearSpawnTimer],
  );

  if (!gameStarted) {
    return (
      <SafeAreaView style={styles.countdownScreen}>
        <Text style={styles.countdownNumber}>{countdown}</Text>
        <Text style={styles.countdownText}>Get ready...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.gameSafeArea}>
      <View style={styles.gameContainer}>
        <View style={styles.gameTop}>
          <Text style={styles.lives}>⏱️ {timeLeft}s</Text>
          <Text style={styles.roundInfo}>Caught {caught}</Text>
          <Text style={styles.score}>⚡ {score}</Text>
        </View>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, progressStyle]} />
        </View>
        <View style={styles.gameHintRow}>
          <Text style={styles.gameHint}>Catch ghosts for 30 seconds!</Text>
          <Pressable accessibilityRole="button" onPress={() => setPauseVisible(true)} style={styles.pauseButton}>
            <Text style={styles.pauseText}>Ⅱ</Text>
          </Pressable>
        </View>
        <View style={[styles.field, {width: fieldWidth, height: fieldHeight}]}>
          {stars.map(star => (
            <View key={star.id} style={[styles.star, {left: star.left, top: star.top, opacity: star.opacity}]} />
          ))}
          {ghost ? (
            <Animated.View style={[styles.ghostTarget, ghostStyle]}>
              <Pressable accessibilityRole="button" onPress={hitGhost} style={styles.ghostButton}>
                <Text style={[styles.ghostText, ghostTextStyle]}>👻</Text>
              </Pressable>
            </Animated.View>
          ) : null}
          {scorePopup ? (
            <Animated.View key={scorePopup.id} pointerEvents="none" style={[styles.scorePopup, scorePopupStyle]}>
              <Text style={styles.scorePopupText}>+1</Text>
            </Animated.View>
          ) : null}
        </View>
        <PauseModal
          visible={pauseVisible}
          title="Spirit Break"
          message="The hunt is paused. Resume when you are ready to keep catching ghosts."
          onLeave={onHome}
          onResume={() => setPauseVisible(false)}
        />
      </View>
    </SafeAreaView>
  );
}

export function GhostResultsScreen({
  score,
  rounds,
  bestCombo,
  onHome,
  onPlayAgain,
}: GhostResultsScreenProps): React.JSX.Element {
  return (
    <Screen scroll>
      <View style={styles.ghostResultHero}>
        <Text style={styles.skull}>👻</Text>
        <Text style={styles.resultTitle}>Time Is Up!</Text>
        <Text style={styles.resultText}>
          You caught {Math.max(rounds, 0)} ghosts in {gameDurationSeconds} seconds.
        </Text>
      </View>
      <View style={styles.resultStats}>
        <StatCard icon="⚡" value={String(score)} label="Score" tone="orange" />
        <StatCard icon="🎯" value={String(rounds)} label="Caught" tone="teal" />
        <StatCard icon="🔥" value={`x${bestCombo}`} label="Best combo" tone="red" />
      </View>
      <View style={styles.badgeCard}>
        <Text style={styles.badgeText}>Spirit Tracker. Try again to beat your score!</Text>
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

function createSpawn(width: number, height: number, round: number): GhostSpawn {
  const size = Math.max(42, 76 - Math.floor((round - 1) / 8) * 3);
  return {
    x: size / 2 + Math.random() * Math.max(1, width - size),
    y: size / 2 + Math.random() * Math.max(1, height - size),
    size,
    duration: ghostVisibleDuration(round),
  };
}

function ghostVisibleDuration(round: number): number {
  return Math.max(360, 1050 - (round - 1) * 14);
}

function nextSpawnDelay(round: number): number {
  return Math.max(70, 180 - round * 2);
}

const styles = StyleSheet.create({
  heroCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: '#18165b',
    alignItems: 'center',
    padding: 22,
    marginTop: 14,
  },
  heroEmoji: {
    fontSize: 58,
  },
  heroTitle: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '900',
    marginTop: 20,
  },
  heroText: {
    color: colors.textMuted,
    textAlign: 'center',
    fontSize: 13,
    lineHeight: 20,
    marginTop: 12,
  },
  heroButton: {
    minHeight: 48,
    marginTop: 18,
    paddingHorizontal: 20,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },
  countdownScreen: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  countdownNumber: {
    color: colors.text,
    fontSize: 58,
    fontWeight: '900',
  },
  countdownText: {
    color: colors.purpleSoft,
    fontSize: 14,
    fontWeight: '800',
    marginTop: 12,
  },
  gameSafeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  gameContainer: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: Platform.OS === 'android' ? 30 : 14,
    paddingBottom: Platform.OS === 'android' ? 30 : 20,
    paddingHorizontal: 20,
  },
  gameTop: {
    minHeight: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  lives: {
    color: colors.red,
    fontSize: 15,
    flex: 1,
  },
  roundInfo: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '800',
    flex: 1,
    textAlign: 'center',
  },
  score: {
    color: colors.gold,
    fontSize: 13,
    fontWeight: '900',
    flex: 1,
    textAlign: 'right',
  },
  progressTrack: {
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.surfaceStrong,
    marginTop: 8,
    overflow: 'hidden',
  },
  progressFill: {
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.teal,
  },
  gameHintRow: {
    minHeight: 36,
    borderRadius: 18,
    backgroundColor: colors.surfaceStrong,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 14,
    paddingRight: 4,
    marginTop: 10,
  },
  gameHint: {
    color: colors.text,
    fontSize: 11,
    fontWeight: '800',
  },
  pauseButton: {
    width: 30,
    height: 30,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.purpleDeep,
  },
  pauseText: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '900',
  },
  field: {
    marginTop: 8,
    alignSelf: 'center',
    overflow: 'hidden',
    borderRadius: 18,
    backgroundColor: '#07041a',
  },
  star: {
    position: 'absolute',
    width: 2,
    height: 2,
    borderRadius: 1,
    backgroundColor: colors.purpleSoft,
  },
  ghostTarget: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ghostButton: {
    width: '100%',
    height: '100%',
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(157, 99, 255, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(157, 99, 255, 0.5)',
  },
  ghostText: {
    textAlign: 'center',
  },
  scorePopup: {
    position: 'absolute',
    width: 46,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scorePopupText: {
    color: colors.gold,
    fontSize: 20,
    fontWeight: '900',
    textShadowColor: 'rgba(255, 190, 70, 0.55)',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 8,
  },
  ghostResultHero: {
    alignItems: 'center',
    paddingTop: 30,
  },
  skull: {
    fontSize: 62,
  },
  resultTitle: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '900',
    marginTop: 20,
  },
  resultText: {
    color: colors.textMuted,
    fontSize: 13,
    marginTop: 8,
    textAlign: 'center',
  },
  resultStats: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 30,
  },
  badgeCard: {
    borderRadius: 12,
    backgroundColor: colors.purple,
    padding: 14,
    alignItems: 'center',
    marginTop: 18,
  },
  badgeText: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '900',
    textAlign: 'center',
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
