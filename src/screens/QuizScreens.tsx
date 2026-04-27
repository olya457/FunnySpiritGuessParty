import React, {useMemo, useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {AppButton} from '../components/AppButton';
import {StatCard} from '../components/Cards';
import {HeaderBar} from '../components/HeaderBar';
import {Screen} from '../components/Screen';
import {jokes, quizQuestions} from '../data/content';
import {colors} from '../styles/theme';
import {QuizQuestion} from '../types';

type QuizHomeScreenProps = {
  bestScore: number;
  onStart: () => void;
};

export function QuizHomeScreen({bestScore, onStart}: QuizHomeScreenProps): React.JSX.Element {
  return (
    <Screen scroll withNav>
      <HeaderBar title="Spirit Quiz" subtitle="3 questions · unlock a ghost joke" emoji="🎯" />
      <View style={styles.heroCard}>
        <Text style={styles.heroEmoji}>🎯</Text>
        <Text style={styles.heroTitle}>Ghostly Trivia</Text>
        <Text style={styles.heroText}>
          Answer 3 funny paranormal questions and unlock an exclusive ghost joke!
        </Text>
        <AppButton label="Start Quiz ✨" onPress={onStart} tone="dark" style={styles.heroButton} />
      </View>
      <View style={styles.statsRow}>
        <StatCard icon="❓" value="3" label="Questions" tone="red" />
        <StatCard icon="😂" value="1" label="Joke unlock" tone="orange" />
        <StatCard icon="⚡" value="~2" label="Minutes" tone="teal" />
      </View>
      <View style={styles.bestCard}>
        <Text style={styles.bestTitle}>🏅 Best Result</Text>
        <Text style={styles.bestScore}>{bestScore} / 3</Text>
      </View>
    </Screen>
  );
}

type QuizPlayScreenProps = {
  onBack: () => void;
  onFinish: (score: number, total: number) => void;
};

export function QuizPlayScreen({onBack, onFinish}: QuizPlayScreenProps): React.JSX.Element {
  const questions = useMemo(() => quizQuestions.slice(0, 3), []);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [score, setScore] = useState(0);
  const question = questions[index];
  const correct = selected === question.correctIndex;
  const total = questions.length;

  function confirm(): void {
    if (selected === null || confirmed) {
      return;
    }
    if (selected === question.correctIndex) {
      setScore(value => value + 1);
    }
    setConfirmed(true);
  }

  function next(): void {
    if (index >= total - 1) {
      onFinish(score, total);
      return;
    }
    setIndex(value => value + 1);
    setSelected(null);
    setConfirmed(false);
  }

  return (
    <Screen scroll>
      <HeaderBar title="" onBack={onBack} right={<Text style={styles.counter}>{index + 1} / {total}</Text>} />
      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, {width: `${((index + 1) / total) * 100}%`}]} />
      </View>
      <QuestionCard question={question} selected={selected} confirmed={confirmed} onSelect={setSelected} />
      {confirmed ? (
        <View style={[styles.explanation, correct ? styles.explanationCorrect : styles.explanationWrong]}>
          <Text style={styles.explanationText}>
            {correct ? '✅ ' : '❌ '}
            {question.explanation}
          </Text>
        </View>
      ) : null}
      <View style={styles.footer}>
        {confirmed ? (
          <AppButton
            label={index >= total - 1 ? '🎉 Unlocking joke...' : '➡ Next question...'}
            onPress={next}
            tone={index >= total - 1 ? 'purple' : 'dark'}
          />
        ) : (
          <AppButton label="Confirm Answer ✓" onPress={confirm} tone="green" disabled={selected === null} />
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
  onHome: () => void;
};

export function QuizResultsScreen({score, total, onHome}: QuizResultsScreenProps): React.JSX.Element {
  const [revealed, setRevealed] = useState(false);
  const joke = jokes[(score + total) % jokes.length];

  return (
    <Screen scroll>
      <HeaderBar title="Quiz Complete!" emoji="🎉" />
      <View style={styles.resultHero}>
        <Text style={styles.resultEmoji}>🏅</Text>
        <Text style={styles.resultScore}>
          {score} / {total} Correct
        </Text>
        <Text style={styles.resultText}>Keep practicing! The ghosts believe in you 🧙</Text>
      </View>
      <View style={styles.jokeCard}>
        <Text style={styles.jokeLabel}>🔒 YOUR REWARD JOKE</Text>
        <Text style={styles.jokeEmoji}>🍩</Text>
        <Text style={styles.jokeSetup}>{joke.setup}</Text>
        {revealed ? (
          <View style={styles.punchline}>
            <Text style={styles.punchlineText}>{joke.punchline}</Text>
          </View>
        ) : (
          <AppButton label="Reveal Punchline! 😂" onPress={() => setRevealed(true)} tone="orange" style={styles.revealButton} />
        )}
      </View>
      <AppButton label="Home" onPress={onHome} />
    </Screen>
  );
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
    marginBottom: 28,
  },
  progressFill: {
    height: 3,
    borderRadius: 2,
    backgroundColor: colors.purpleSoft,
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
    backgroundColor: colors.purpleDeep,
    alignItems: 'center',
    padding: 28,
    marginTop: 18,
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
});
