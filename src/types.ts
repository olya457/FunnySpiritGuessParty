import {ImageSourcePropType} from 'react-native';

export type TabKey = 'stories' | 'friends' | 'quiz' | 'ghost' | 'pairs';

export type StoredState = {
  onboardingDone: boolean;
  likedStoryIds: string[];
  quizBestScore: number;
  ghostBestScore: number;
  partyBestScore: number;
  pairsBestScore: number;
};

export type Story = {
  id: string;
  emoji: string;
  title: string;
  category: string;
  teaser: string;
  body: string;
};

export type QuizQuestion = {
  id: string;
  emoji: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
};

export type PartySituation = {
  id: string;
  situation: string;
  answer: string;
};

export type Joke = {
  setup: string;
  punchline: string;
};

export type OnboardingPage = {
  id: string;
  badge: string;
  badgeColor: string;
  title: string;
  description: string;
  image: ImageSourcePropType;
};

export type Route =
  | {name: 'main'}
  | {name: 'storyDetail'; storyId: string}
  | {name: 'partyHowTo'}
  | {name: 'partySetup'}
  | {name: 'partyRound'; players: number}
  | {name: 'partyResults'; scores: number[]}
  | {name: 'quizPlay'}
  | {name: 'quizResults'; score: number; total: number}
  | {name: 'ghostPlay'}
  | {name: 'ghostResults'; score: number; rounds: number; bestCombo: number};
