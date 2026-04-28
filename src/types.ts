import {ImageSourcePropType} from 'react-native';

export type TabKey = 'stories' | 'friends' | 'quiz' | 'games' | 'stats';

export type StoredState = {
  onboardingDone: boolean;
  likedStoryIds: string[];
  quizBestScore: number;
  quizLevel: number;
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

export type TheaterRole = {
  id: string;
  emoji: string;
  name: string;
  troupe: string;
  intro: string;
  voice: string;
  movement: string;
  signatureLine: string;
  secretGoal: string;
};

export type TheaterScene = {
  id: string;
  actTitle: string;
  scene: string;
  prop: string;
  direction: string;
  twist: string;
  challenge: string;
  applauseCue: string;
};

export type PartyResultRole = {
  player: number;
  roleName: string;
  roleEmoji: string;
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
  | {name: 'partyRound'; players: number; acts: number}
  | {name: 'partyResults'; scores: number[]; cast: PartyResultRole[]}
  | {name: 'quizPlay'; level: number}
  | {name: 'quizResults'; score: number; total: number; level: number; passed: boolean; nextLevel: number}
  | {name: 'ghostPlay'}
  | {name: 'ghostResults'; score: number; rounds: number; bestCombo: number}
  | {name: 'pairsPlay'};
