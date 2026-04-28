import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {BottomNav} from './components/BottomNav';
import {stories} from './data/content';
import {loadStoredState, saveStoredState} from './services/storage';
import {colors} from './styles/theme';
import {PartyResultRole, Route, StoredState, TabKey} from './types';
import {GamesHubScreen} from './screens/GamesScreen';
import {GhostPlayScreen, GhostResultsScreen} from './screens/GhostScreens';
import {LoadingScreen} from './screens/LoadingScreen';
import {OnboardingScreen} from './screens/OnboardingScreen';
import {
  PartyHomeScreen,
  PartyHowToScreen,
  PartyResultsScreen,
  PartyRoundScreen,
  PartySetupScreen,
} from './screens/PartyScreens';
import {PairsGameScreen} from './screens/PairsGameScreen';
import {QuizHomeScreen, QuizPlayScreen, QuizResultsScreen} from './screens/QuizScreens';
import {StatsScreen} from './screens/StatsScreen';
import {StoriesScreen} from './screens/StoriesScreen';
import {StoryDetailScreen} from './screens/StoryDetailScreen';

const defaultState: StoredState = {
  onboardingDone: false,
  likedStoryIds: [],
  quizBestScore: 0,
  quizLevel: 1,
  ghostBestScore: 0,
  partyBestScore: 0,
  pairsBestScore: 0,
};

export function SpiritApp(): React.JSX.Element {
  const [loadingElapsed, setLoadingElapsed] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [stored, setStored] = useState<StoredState>(defaultState);
  const [route, setRoute] = useState<Route>({name: 'main'});
  const [activeTab, setActiveTab] = useState<TabKey>('stories');

  useEffect(() => {
    const timer = setTimeout(() => setLoadingElapsed(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let mounted = true;
    loadStoredState()
      .then(saved => {
        if (!mounted) {
          return;
        }
        if (saved) {
          setStored(mergeState(saved));
        }
      })
      .finally(() => {
        if (mounted) {
          setHydrated(true);
        }
      });
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (!hydrated) {
      return;
    }
    saveStoredState(stored).catch(() => undefined);
  }, [hydrated, stored]);

  const likedSet = useMemo(() => new Set(stored.likedStoryIds), [stored.likedStoryIds]);

  const toggleLike = useCallback((storyId: string) => {
    setStored(current => {
      const exists = current.likedStoryIds.includes(storyId);
      return {
        ...current,
        likedStoryIds: exists
          ? current.likedStoryIds.filter(id => id !== storyId)
          : [...current.likedStoryIds, storyId],
      };
    });
  }, []);

  const completeOnboarding = useCallback(() => {
    setStored(current => ({...current, onboardingDone: true}));
    setRoute({name: 'main'});
  }, []);

  const goMain = useCallback((tab?: TabKey) => {
    if (tab) {
      setActiveTab(tab);
    }
    setRoute({name: 'main'});
  }, []);

  const finishParty = useCallback((scores: number[], cast: PartyResultRole[]) => {
    const best = Math.max(...scores);
    setStored(current => ({...current, partyBestScore: Math.max(current.partyBestScore, best)}));
    setRoute({name: 'partyResults', scores, cast});
  }, []);

  const finishQuiz = useCallback((score: number, total: number, level: number) => {
    const passed = score >= 4;
    const nextLevel = passed ? Math.min(30, level + 1) : level;
    setStored(current => ({
      ...current,
      quizBestScore: Math.max(current.quizBestScore, score),
      quizLevel: passed ? Math.max(current.quizLevel, nextLevel) : current.quizLevel,
    }));
    setRoute({name: 'quizResults', score, total, level, passed, nextLevel});
  }, []);

  const finishGhost = useCallback((score: number, rounds: number, bestCombo: number) => {
    setStored(current => ({...current, ghostBestScore: Math.max(current.ghostBestScore, score)}));
    setRoute({name: 'ghostResults', score, rounds, bestCombo});
  }, []);

  const finishPairs = useCallback((score: number) => {
    setStored(current => ({...current, pairsBestScore: Math.max(current.pairsBestScore, score)}));
  }, []);

  const clearStats = useCallback(() => {
    setStored(current => ({
      ...current,
      likedStoryIds: [],
      quizBestScore: 0,
      quizLevel: 1,
      ghostBestScore: 0,
      partyBestScore: 0,
      pairsBestScore: 0,
    }));
  }, []);

  if (!loadingElapsed || !hydrated) {
    return <LoadingScreen />;
  }

  if (!stored.onboardingDone) {
    return <OnboardingScreen onDone={completeOnboarding} />;
  }

  if (route.name === 'storyDetail') {
    const story = stories.find(item => item.id === route.storyId) ?? stories[0];
    return (
      <StoryDetailScreen
        story={story}
        liked={likedSet.has(story.id)}
        onBack={() => goMain('stories')}
        onToggleLike={() => toggleLike(story.id)}
      />
    );
  }

  if (route.name === 'partyHowTo') {
    return <PartyHowToScreen onBack={() => goMain('friends')} onStart={() => setRoute({name: 'partySetup'})} />;
  }

  if (route.name === 'partySetup') {
    return (
      <PartySetupScreen
        onBack={() => goMain('friends')}
        onStart={(players, acts) => setRoute({name: 'partyRound', players, acts})}
      />
    );
  }

  if (route.name === 'partyRound') {
    return (
      <PartyRoundScreen
        acts={route.acts}
        players={route.players}
        onBackHome={() => goMain('friends')}
        onTeach={() => setRoute({name: 'partyHowTo'})}
        onFinish={finishParty}
      />
    );
  }

  if (route.name === 'partyResults') {
    return (
      <PartyResultsScreen
        cast={route.cast}
        scores={route.scores}
        onHome={() => goMain('friends')}
        onPlayAgain={() => setRoute({name: 'partySetup'})}
      />
    );
  }

  if (route.name === 'quizPlay') {
    return <QuizPlayScreen level={route.level} onBack={() => goMain('quiz')} onFinish={finishQuiz} />;
  }

  if (route.name === 'quizResults') {
    return (
      <QuizResultsScreen
        score={route.score}
        total={route.total}
        level={route.level}
        passed={route.passed}
        nextLevel={route.nextLevel}
        onHome={() => goMain('quiz')}
        onNextLevel={() => setRoute({name: 'quizPlay', level: route.nextLevel})}
        onTryAgain={() => setRoute({name: 'quizPlay', level: route.level})}
      />
    );
  }

  if (route.name === 'ghostPlay') {
    return <GhostPlayScreen onHome={() => goMain('games')} onFinish={finishGhost} />;
  }

  if (route.name === 'ghostResults') {
    return (
      <GhostResultsScreen
        score={route.score}
        rounds={route.rounds}
        bestCombo={route.bestCombo}
        onHome={() => goMain('games')}
        onPlayAgain={() => setRoute({name: 'ghostPlay'})}
      />
    );
  }

  if (route.name === 'pairsPlay') {
    return (
      <PairsGameScreen
        bestScore={stored.pairsBestScore}
        onBestScore={finishPairs}
        onHome={() => goMain('games')}
        startImmediately
      />
    );
  }

  return (
    <View style={styles.app}>
      {activeTab === 'stories' ? (
        <StoriesScreen
          likedStoryIds={stored.likedStoryIds}
          onOpenStory={storyId => setRoute({name: 'storyDetail', storyId})}
          onToggleLike={toggleLike}
        />
      ) : null}
      {activeTab === 'friends' ? (
        <PartyHomeScreen
          bestScore={stored.partyBestScore}
          onOpenHowTo={() => setRoute({name: 'partyHowTo'})}
          onStart={() => setRoute({name: 'partySetup'})}
        />
      ) : null}
      {activeTab === 'quiz' ? (
        <QuizHomeScreen
          bestScore={stored.quizBestScore}
          currentLevel={stored.quizLevel}
          onStart={() => setRoute({name: 'quizPlay', level: stored.quizLevel})}
        />
      ) : null}
      {activeTab === 'games' ? (
        <GamesHubScreen
          ghostBestScore={stored.ghostBestScore}
          pairsBestScore={stored.pairsBestScore}
          onStartGhost={() => setRoute({name: 'ghostPlay'})}
          onStartPairs={() => setRoute({name: 'pairsPlay'})}
        />
      ) : null}
      {activeTab === 'stats' ? (
        <StatsScreen state={stored} onClearStats={clearStats} />
      ) : null}
      <BottomNav
        activeTab={activeTab}
        onTabPress={tab => {
          setActiveTab(tab);
          setRoute({name: 'main'});
        }}
      />
    </View>
  );
}

function mergeState(saved: Partial<StoredState>): StoredState {
  return {
    onboardingDone: saved.onboardingDone ?? defaultState.onboardingDone,
    likedStoryIds: Array.isArray(saved.likedStoryIds) ? saved.likedStoryIds : [],
    quizBestScore: typeof saved.quizBestScore === 'number' ? saved.quizBestScore : 0,
    quizLevel: typeof saved.quizLevel === 'number' ? Math.min(30, Math.max(1, saved.quizLevel)) : 1,
    ghostBestScore: typeof saved.ghostBestScore === 'number' ? saved.ghostBestScore : 0,
    partyBestScore: typeof saved.partyBestScore === 'number' ? saved.partyBestScore : 0,
    pairsBestScore: typeof saved.pairsBestScore === 'number' ? saved.pairsBestScore : 0,
  };
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
