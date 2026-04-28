import React, {useMemo, useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {AppButton} from '../components/AppButton';
import {StatCard} from '../components/Cards';
import {HeaderBar} from '../components/HeaderBar';
import {Screen} from '../components/Screen';
import {jokes, quizLevels} from '../data/content';
import {colors} from '../styles/theme';
import {QuizQuestion} from '../types';

const quizLevelsCount = quizLevels.length;
const questionsPerLevel = quizLevels[0]?.length ?? 5;
const passingScore = 4;

type QuizHomeScreenProps = {
  bestScore: number;
  currentLevel: number;
  onStart: () => void;
};

export function QuizHomeScreen({bestScore, currentLevel, onStart}: QuizHomeScreenProps): React.JSX.Element {
  const level = clampLevel(currentLevel);

  return (
    <Screen scroll withNav>
      <HeaderBar title="Spirit Quiz" subtitle="5 questions · 4 correct to pass" emoji="🎯" />
      <View style={styles.heroCard}>
        <Text style={styles.heroEmoji}>🎯</Text>
        <Text style={styles.heroTitle}>Level {level}</Text>
        <Text style={styles.heroText}>
          Answer a short paranormal quiz. Score 4 or 5 to move forward.
        </Text>
        <AppButton label={`Start Level ${level}`} onPress={onStart} tone="dark" style={styles.heroButton} />
      </View>
      <View style={styles.statsRow}>
        <StatCard icon="🧩" value={`Level ${level}`} label="Saved stage" tone="teal" />
        <StatCard icon="❓" value="5" label="Questions" tone="red" />
        <StatCard icon="✅" value="4+" label="To pass" tone="orange" />
      </View>
      <View style={styles.bestCard}>
        <Text style={styles.bestTitle}>Best Level Result</Text>
        <Text style={styles.bestScore}>{bestScore} / {questionsPerLevel}</Text>
      </View>
    </Screen>
  );
}

type QuizPlayScreenProps = {
  level: number;
  onBack: () => void;
  onFinish: (score: number, total: number, level: number) => void;
};

export function QuizPlayScreen({level, onBack, onFinish}: QuizPlayScreenProps): React.JSX.Element {
  const safeLevel = clampLevel(level);
  const questions = useMemo(() => getLevelQuestions(safeLevel), [safeLevel]);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [score, setScore] = useState(0);
  const question = questions[index];
  const correct = selected === question.correctIndex;
  const total = questions.length;
  const visibleScore = score + (confirmed && correct ? 1 : 0);

  function confirm(): void {
    if (selected === null || confirmed) {
      return;
    }
    setConfirmed(true);
  }

  function next(): void {
    const nextScore = correct ? score + 1 : score;
    if (index >= total - 1) {
      onFinish(nextScore, total, safeLevel);
      return;
    }
    setScore(nextScore);
    setIndex(value => value + 1);
    setSelected(null);
    setConfirmed(false);
  }

  return (
    <Screen scroll>
      <HeaderBar
        title={`Level ${safeLevel}`}
        onBack={onBack}
        right={<Text style={styles.counter}>{index + 1} / {total}</Text>}
      />
      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, {width: `${((index + 1) / total) * 100}%`}]} />
      </View>
      <View style={styles.scoreLine}>
        <Text style={styles.scoreLineText}>Score {visibleScore} / {questionsPerLevel}</Text>
        <Text style={styles.scoreLineText}>Pass {passingScore}+</Text>
      </View>
      <QuestionCard question={question} selected={selected} confirmed={confirmed} onSelect={setSelected} />
      {confirmed ? (
        <View style={[styles.explanation, correct ? styles.explanationCorrect : styles.explanationWrong]}>
          <Text style={styles.explanationText}>
            {correct ? 'Correct. ' : 'Not this time. '}
            {question.explanation}
          </Text>
        </View>
      ) : null}
      <View style={styles.footer}>
        {confirmed ? (
          <AppButton
            label={index >= total - 1 ? 'Finish Level' : 'Next Question'}
            onPress={next}
            tone={index >= total - 1 ? 'purple' : 'dark'}
          />
        ) : (
          <AppButton label="Confirm Answer" onPress={confirm} tone="green" disabled={selected === null} />
        )}
      </View>
    </Screen>
  );
}

type QuestionCardProps = {
  question: QuizQuestion;
  selected: number | null;
  confirmed: boolean;
  onSelect: (index: number) => void;
};

function QuestionCard({question, selected, confirmed, onSelect}: QuestionCardProps): React.JSX.Element {
  return (
    <View>
      <View style={styles.questionCard}>
        <Text style={styles.questionEmoji}>{question.emoji}</Text>
        <Text style={styles.questionText}>{question.question}</Text>
      </View>
      <View style={styles.options}>
        {question.options.map((option, index) => {
          const isSelected = selected === index;
          const isCorrect = confirmed && index === question.correctIndex;
          const isWrong = confirmed && isSelected && index !== question.correctIndex;
          return (
            <Pressable
              accessibilityRole="button"
              disabled={confirmed}
              key={`${question.id}-${option}`}
              onPress={() => onSelect(index)}
              style={[
                styles.option,
                isSelected ? styles.optionSelected : undefined,
                isCorrect ? styles.optionCorrect : undefined,
                isWrong ? styles.optionWrong : undefined,
              ]}>
              <Text style={styles.optionBadge}>{String.fromCharCode(65 + index)}</Text>
              <Text style={styles.optionText}>{option}</Text>
              {confirmed && (isCorrect || isWrong) ? <Text style={styles.optionMark}>{isCorrect ? '◎' : '⊘'}</Text> : null}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

type QuizResultsScreenProps = {
  score: number;
  total: number;
  level: number;
  passed: boolean;
  nextLevel: number;
  onHome: () => void;
  onNextLevel: () => void;
  onTryAgain: () => void;
};

export function QuizResultsScreen({
  score,
  total,
  level,
  passed,
  nextLevel,
  onHome,
  onNextLevel,
  onTryAgain,
}: QuizResultsScreenProps): React.JSX.Element {
  const [revealed, setRevealed] = useState(false);
  const joke = jokes[(score + total + level) % jokes.length];
  const finalLevelPassed = passed && level >= quizLevelsCount;

  return (
    <Screen scroll>
      <HeaderBar title={passed ? 'Level Passed' : 'Try Again'} emoji={passed ? '🏆' : '🔁'} />
      <View style={[styles.resultHero, passed ? styles.resultHeroPassed : styles.resultHeroFailed]}>
        <Text style={styles.resultEmoji}>{passed ? '✅' : '💡'}</Text>
        <Text style={styles.resultScore}>
          {score} / {total} Correct
        </Text>
        <Text style={styles.resultText}>
          {passed
            ? finalLevelPassed
              ? 'You cleared the full quiz path.'
              : `Level ${nextLevel} is unlocked.`
            : 'Score 4 or 5 correct answers to pass this level.'}
        </Text>
      </View>
      <View style={styles.jokeCard}>
        <Text style={styles.jokeLabel}>{passed ? 'REWARD JOKE' : 'PRACTICE JOKE'}</Text>
        <Text style={styles.jokeEmoji}>😂</Text>
        <Text style={styles.jokeSetup}>{joke.setup}</Text>
        {revealed ? (
          <View style={styles.punchline}>
            <Text style={styles.punchlineText}>{joke.punchline}</Text>
          </View>
        ) : (
          <AppButton label="Reveal Punchline" onPress={() => setRevealed(true)} tone="orange" style={styles.revealButton} />
        )}
      </View>
      <View style={styles.resultButtons}>
        {passed ? (
          <AppButton label={finalLevelPassed ? 'Replay Final Level' : `Next Level ${nextLevel}`} onPress={onNextLevel} />
        ) : (
          <AppButton label="Try Again" onPress={onTryAgain} tone="orange" />
        )}
        <AppButton label="Quiz Home" onPress={onHome} tone="dark" />
      </View>
    </Screen>
  );
}

function getLevelQuestions(level: number): QuizQuestion[] {
  return quizLevels[level - 1] ?? quizLevels[0];
}

function clampLevel(level: number): number {
  return Math.min(quizLevelsCount, Math.max(1, Math.floor(level || 1)));
}

const styles = StyleSheet.create({
  heroCard: {
    borderRadius: 16,
    minHeight: 290,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 22,
    marginTop: 14,
    backgroundColor: colors.tealDeep,
  },
  heroEmoji: {
    fontSize: 50,
  },
  heroTitle: {
    color: colors.text,
    fontSize: 24,
    fontWeight: '900',
    marginTop: 22,
  },
  heroText: {
    color: colors.text,
    opacity: 0.84,
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 21,
    marginTop: 12,
  },
  heroButton: {
    minHeight: 48,
    marginTop: 22,
    paddingHorizontal: 24,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 16,
  },
  bestCard: {
    minHeight: 82,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: 15,
    marginTop: 14,
  },
  bestTitle: {
    color: colors.textMuted,
    fontSize: 13,
    fontWeight: '900',
  },
  bestScore: {
    color: colors.text,
    fontSize: 24,
    fontWeight: '900',
    marginTop: 8,
  },
  counter: {
    color: colors.textMuted,
    fontSize: 13,
    fontWeight: '800',
  },
  progressTrack: {
    height: 3,
    borderRadius: 2,
    backgroundColor: colors.surfaceStrong,
    marginBottom: 14,
  },
  progressFill: {
    height: 3,
    borderRadius: 2,
    backgroundColor: colors.purpleSoft,
  },
  scoreLine: {
    minHeight: 42,
    borderRadius: 12,
    backgroundColor: colors.surface,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    marginBottom: 14,
  },
  scoreLineText: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '900',
  },
  questionCard: {
    minHeight: 178,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  questionEmoji: {
    fontSize: 40,
    marginBottom: 20,
  },
  questionText: {
    color: colors.text,
    fontSize: 17,
    lineHeight: 24,
    textAlign: 'center',
    fontWeight: '900',
  },
  options: {
    gap: 10,
    marginTop: 18,
  },
  option: {
    minHeight: 54,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 12,
  },
  optionSelected: {
    backgroundColor: colors.purpleDeep,
    borderColor: colors.purpleSoft,
  },
  optionCorrect: {
    backgroundColor: '#065f45',
    borderColor: '#0fb783',
  },
  optionWrong: {
    backgroundColor: '#7a1017',
    borderColor: '#da2a31',
  },
  optionBadge: {
    width: 24,
    height: 24,
    borderRadius: 7,
    overflow: 'hidden',
    backgroundColor: colors.surfaceStrong,
    color: colors.text,
    textAlign: 'center',
    lineHeight: 24,
    fontSize: 12,
    fontWeight: '900',
  },
  optionText: {
    flex: 1,
    color: colors.text,
    fontSize: 13,
    lineHeight: 19,
    fontWeight: '700',
  },
  optionMark: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '900',
  },
  explanation: {
    borderRadius: 12,
    padding: 14,
    marginTop: 14,
  },
  explanationCorrect: {
    backgroundColor: '#075439',
  },
  explanationWrong: {
    backgroundColor: '#2a2118',
  },
  explanationText: {
    color: colors.text,
    fontSize: 13,
    lineHeight: 19,
  },
  footer: {
    marginTop: 18,
  },
  resultHero: {
    borderRadius: 16,
    alignItems: 'center',
    padding: 28,
    marginTop: 18,
  },
  resultHeroPassed: {
    backgroundColor: colors.purpleDeep,
  },
  resultHeroFailed: {
    backgroundColor: colors.orangeDeep,
  },
  resultEmoji: {
    fontSize: 42,
  },
  resultScore: {
    color: colors.text,
    fontSize: 25,
    fontWeight: '900',
    marginTop: 20,
  },
  resultText: {
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 19,
    textAlign: 'center',
    marginTop: 8,
  },
  jokeCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: 18,
    alignItems: 'center',
    marginVertical: 18,
  },
  jokeLabel: {
    alignSelf: 'flex-start',
    color: colors.gold,
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 0,
  },
  jokeEmoji: {
    fontSize: 42,
    marginTop: 26,
  },
  jokeSetup: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 21,
    textAlign: 'center',
    marginTop: 18,
  },
  revealButton: {
    minHeight: 46,
    marginTop: 20,
    paddingHorizontal: 18,
  },
  punchline: {
    width: '100%',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.purpleSoft,
    backgroundColor: colors.purpleDeep,
    padding: 15,
    marginTop: 20,
  },
  punchlineText: {
    color: colors.text,
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
    fontWeight: '800',
  },
  resultButtons: {
    gap: 10,
  },
});
