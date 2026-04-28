import React, {useEffect, useMemo, useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {AppButton} from '../components/AppButton';
import {StatCard} from '../components/Cards';
import {HeaderBar} from '../components/HeaderBar';
import {PauseModal} from '../components/PauseModal';
import {Screen} from '../components/Screen';
import {theaterRoles, theaterScenes} from '../data/content';
import {colors} from '../styles/theme';
import {PartyResultRole, TheaterRole, TheaterScene} from '../types';

type PartyHomeScreenProps = {
  bestScore: number;
  onOpenHowTo: () => void;
  onStart: () => void;
};

type PartyPhase = 'casting' | 'briefing' | 'performing' | 'awards';

const performanceSeconds = 45;

const awardTypes = [
  {id: 'spotlight', icon: '⭐', label: 'Spotlight', points: 2},
  {id: 'laugh', icon: '😂', label: 'Big Laugh', points: 1},
  {id: 'twist', icon: '🌀', label: 'Best Twist', points: 1},
] as const;

type AwardId = (typeof awardTypes)[number]['id'];

export function PartyHomeScreen({bestScore, onOpenHowTo, onStart}: PartyHomeScreenProps): React.JSX.Element {
  const previewRoles = theaterRoles.slice(0, 4);

  return (
    <Screen scroll withNav>
      <HeaderBar title="Halloween Theatre" subtitle="Secret roles, live scenes, chaotic awards" emoji="🎭" />
      <View style={styles.heroCard}>
        <Text style={styles.heroKicker}>TONIGHT'S FORMAT</Text>
        <Text style={styles.heroTitle}>Draw a monster role. Step on stage. Survive the director twist.</Text>
        <Text style={styles.heroText}>
          Each player gets a hidden Halloween character, then performs short improv acts with props, secret goals,
          applause cues, and audience awards.
        </Text>
        <View style={styles.previewCast}>
          {previewRoles.map(role => (
            <View key={role.id} style={styles.previewRole}>
              <Text style={styles.previewEmoji}>{role.emoji}</Text>
              <Text style={styles.previewName} numberOfLines={1}>
                {role.name}
              </Text>
            </View>
          ))}
        </View>
        <AppButton label="Open the Stage" onPress={onStart} tone="orange" style={styles.heroButton} />
      </View>
      <Pressable accessibilityRole="button" onPress={onOpenHowTo} style={styles.howToRow}>
        <View style={styles.howToIcon}>
          <Text style={styles.howToIconText}>🎬</Text>
        </View>
        <View style={styles.howToCopy}>
          <Text style={styles.howToTitle}>Director Notes</Text>
          <Text style={styles.howToText}>Casting, acting, voting, and scoring rules</Text>
        </View>
        <Text style={styles.chevron}>›</Text>
      </Pressable>
      <View style={styles.statsGrid}>
        <StatCard icon="🎭" value={String(theaterRoles.length)} label="Secret roles" tone="orange" />
        <StatCard icon="🎬" value={String(theaterScenes.length)} label="Stage prompts" tone="teal" />
      </View>
      <View style={styles.statsGrid}>
        <StatCard icon="👥" value="2-6" label="Players" />
        <StatCard icon="🏆" value={String(bestScore)} label="Best score" tone="red" />
      </View>
      <View style={styles.featureList}>
        <FeatureRow icon="🧛" title="Role cards" text="Dracula, witches, ghosts, oracles, and other Halloween performers." />
        <FeatureRow icon="🔮" title="Secret goals" text="Every role has a private objective that changes how players perform." />
        <FeatureRow icon="🎲" title="Live twists" text="Drop a director twist during the act to force a funny pivot." />
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
    ['1', 'Secret Casting', 'Pass the phone around. Each player privately reveals one Halloween theatre role.'],
    ['2', 'Read the Act', 'The spotlight player gets a scene, prop, direction, applause cue, and secret goal.'],
    ['3', 'Perform for 45 Seconds', 'Act in character. Other players can join as side characters, witnesses, or props.'],
    ['4', 'Drop the Twist', 'Tap the director twist during the performance to change the scene mid-act.'],
    ['5', 'Award the Cast', 'Vote for Spotlight, Big Laugh, and Best Twist. Points create the final curtain call.'],
  ];

  return (
    <Screen scroll>
      <HeaderBar title="Director Notes" onBack={onBack} />
      <View style={styles.directorCard}>
        <Text style={styles.directorEmoji}>🎭</Text>
        <Text style={styles.directorTitle}>Halloween Theatre Night</Text>
        <Text style={styles.directorText}>
          This mode is built for real group play: hidden characters, timed acting, improvised plot turns, and multiple
          awards per act.
        </Text>
      </View>
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
      <AppButton label="Cast the Players" onPress={onStart} />
    </Screen>
  );
}

type PartySetupScreenProps = {
  onBack: () => void;
  onStart: (players: number, acts: number) => void;
};

export function PartySetupScreen({onBack, onStart}: PartySetupScreenProps): React.JSX.Element {
  const [players, setPlayers] = useState(3);
  const [acts, setActs] = useState(4);

  return (
    <Screen scroll>
      <HeaderBar title="Stage Setup" onBack={onBack} />
      <View style={styles.setupCard}>
        <Text style={styles.setupEmoji}>🎭</Text>
        <Text style={styles.setupTitle}>Build tonight's cast</Text>
        <Text style={styles.setupText}>Choose players and number of acts for one show.</Text>
        <Text style={styles.setupLabel}>Players</Text>
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
        <Text style={styles.setupLabel}>Acts</Text>
        <View style={styles.actGrid}>
          {[3, 4, 5].map(count => (
            <Pressable
              accessibilityRole="button"
              key={count}
              onPress={() => setActs(count)}
              style={[styles.actButton, acts === count ? styles.actButtonActive : undefined]}>
              <Text style={[styles.actCount, acts === count ? styles.playerTextActive : undefined]}>{count}</Text>
              <Text style={[styles.actLabel, acts === count ? styles.playerTextActive : undefined]}>acts</Text>
            </Pressable>
          ))}
        </View>
        <View style={styles.setupHint}>
          <Text style={styles.setupHintTitle}>Tonight's show</Text>
          <Text style={styles.setupHintText}>
            {players} players, {acts} timed acts, {awardTypes.length} awards per act, and a secret role for everyone.
          </Text>
        </View>
      </View>
      <AppButton label="Reveal Secret Roles" onPress={() => onStart(players, acts)} tone="orange" />
    </Screen>
  );
}

type PartyRoundScreenProps = {
  players: number;
  acts: number;
  onBackHome: () => void;
  onTeach: () => void;
  onFinish: (scores: number[], cast: PartyResultRole[]) => void;
};

export function PartyRoundScreen({
  players,
  acts,
  onBackHome,
  onTeach,
  onFinish,
}: PartyRoundScreenProps): React.JSX.Element {
  const [phase, setPhase] = useState<PartyPhase>('casting');
  const [castIndex, setCastIndex] = useState(0);
  const [castRevealed, setCastRevealed] = useState(false);
  const [act, setAct] = useState(1);
  const [timeLeft, setTimeLeft] = useState(performanceSeconds);
  const [twistVisible, setTwistVisible] = useState(false);
  const [selectedAward, setSelectedAward] = useState<AwardId>('spotlight');
  const [roundAwards, setRoundAwards] = useState<Partial<Record<AwardId, number>>>({});
  const [awardHistory, setAwardHistory] = useState<string[]>([]);
  const [scores, setScores] = useState<number[]>(() => Array.from({length: players}, () => 0));
  const [pauseVisible, setPauseVisible] = useState(false);
  const roles = useMemo(() => takeShuffled(theaterRoles, players), [players]);
  const scenes = useMemo(() => takeShuffled(theaterScenes, acts), [acts]);
  const scene = scenes[act - 1] ?? theaterScenes[0];
  const spotlightIndex = (act - 1) % players;
  const spotlightRole = roles[spotlightIndex] ?? theaterRoles[0];
  const castRole = roles[castIndex] ?? theaterRoles[0];
  const progress = phase === 'casting' ? (castIndex + (castRevealed ? 1 : 0)) / players : act / acts;
  const hasAward = awardTypes.some(award => typeof roundAwards[award.id] === 'number');
  const cast = roles.map((role, index) => ({
    player: index + 1,
    roleName: role.name,
    roleEmoji: role.emoji,
  }));

  useEffect(() => {
    if (phase !== 'performing' || pauseVisible) {
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft(value => Math.max(0, value - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [pauseVisible, phase]);

  useEffect(() => {
    if (phase === 'performing' && timeLeft === 0) {
      setPhase('awards');
    }
  }, [phase, timeLeft]);

  function continueCasting(): void {
    if (!castRevealed) {
      setCastRevealed(true);
      return;
    }
    if (castIndex >= players - 1) {
      setPhase('briefing');
      return;
    }
    setCastIndex(index => index + 1);
    setCastRevealed(false);
  }

  function startPerformance(): void {
    setTimeLeft(performanceSeconds);
    setTwistVisible(false);
    setPhase('performing');
  }

  function selectAwardWinner(playerIndex: number): void {
    setRoundAwards(current => ({...current, [selectedAward]: playerIndex}));
  }

  function continueAfterAwards(): void {
    const nextScores = [...scores];
    const nextHistory: string[] = [];
    awardTypes.forEach(award => {
      const winnerIndex = roundAwards[award.id];
      if (typeof winnerIndex === 'number') {
        nextScores[winnerIndex] += award.points;
        nextHistory.push(`${award.icon} Act ${act}: Player ${winnerIndex + 1} won ${award.label}`);
      }
    });
    if (act >= acts) {
      onFinish(nextScores, cast);
      return;
    }
    setScores(nextScores);
    setAwardHistory(history => [...nextHistory, ...history].slice(0, 5));
    setRoundAwards({});
    setSelectedAward('spotlight');
    setAct(value => value + 1);
    setPhase('briefing');
  }

  if (phase === 'casting') {
    return (
      <Screen scroll>
        <HeaderBar title="Secret Casting" onBack={() => setPauseVisible(true)} right={<MiniTeach onPress={onTeach} />} />
        <ProgressBar progress={progress} />
        <View style={styles.castEnvelope}>
          <Text style={styles.castPlayer}>Player {castIndex + 1}</Text>
          <Text style={styles.castInstruction}>
            {castRevealed ? 'Memorize your role, voice, movement, and secret goal.' : 'Hold the phone alone and reveal your role.'}
          </Text>
          {castRevealed ? (
            <RoleCard role={castRole} />
          ) : (
            <View style={styles.hiddenRole}>
              <Text style={styles.hiddenIcon}>🎭</Text>
              <Text style={styles.hiddenTitle}>Hidden Halloween Role</Text>
              <Text style={styles.hiddenText}>No peeking from the audience.</Text>
            </View>
          )}
        </View>
        <AppButton
          label={castRevealed ? (castIndex >= players - 1 ? 'Open Act 1' : 'Lock Role and Pass') : 'Reveal My Role'}
          onPress={continueCasting}
          tone={castRevealed ? 'green' : 'orange'}
        />
        <PauseModal
          visible={pauseVisible}
          title="Leave Casting?"
          message="The curtain is still closed. Leave the show or return to secret roles."
          onLeave={onBackHome}
          onResume={() => setPauseVisible(false)}
        />
      </Screen>
    );
  }

  return (
    <Screen scroll>
      <HeaderBar
        title={`Act ${act} / ${acts}`}
        subtitle={phase === 'awards' ? 'Award the cast' : scene.actTitle}
        onBack={() => setPauseVisible(true)}
        right={<MiniTeach onPress={onTeach} />}
      />
      <ProgressBar progress={progress} />
      <View style={styles.scoreStrip}>
        {scores.map((score, index) => (
          <View key={index} style={[styles.scoreChip, index === spotlightIndex ? styles.scoreChipActive : undefined]}>
            <Text style={styles.scoreChipName}>P{index + 1}</Text>
            <Text style={styles.scoreChipValue}>{score}</Text>
          </View>
        ))}
      </View>
      {phase === 'briefing' ? (
        <ActBriefing scene={scene} role={spotlightRole} spotlightIndex={spotlightIndex} onStart={startPerformance} />
      ) : null}
      {phase === 'performing' ? (
        <PerformanceStage
          scene={scene}
          role={spotlightRole}
          spotlightIndex={spotlightIndex}
          timeLeft={timeLeft}
          twistVisible={twistVisible}
          onRevealTwist={() => setTwistVisible(true)}
          onEnd={() => setPhase('awards')}
        />
      ) : null}
      {phase === 'awards' ? (
        <AwardsPanel
          roundAwards={roundAwards}
          scores={scores}
          selectedAward={selectedAward}
          onSelectAward={setSelectedAward}
          onSelectWinner={selectAwardWinner}
          onContinue={continueAfterAwards}
          hasAward={hasAward}
          finalAct={act >= acts}
        />
      ) : null}
      {awardHistory.length > 0 ? (
        <View style={styles.historyCard}>
          <Text style={styles.historyTitle}>Recent awards</Text>
          {awardHistory.map(item => (
            <Text key={item} style={styles.historyText}>
              {item}
            </Text>
          ))}
        </View>
      ) : null}
      <PauseModal
        visible={pauseVisible}
        title="Intermission"
        message="The stage lights are paused. Leave the show or return to the act."
        onLeave={onBackHome}
        onResume={() => setPauseVisible(false)}
      />
    </Screen>
  );
}

type PartyResultsScreenProps = {
  scores: number[];
  cast: PartyResultRole[];
  onHome: () => void;
  onPlayAgain: () => void;
};

export function PartyResultsScreen({scores, cast, onHome, onPlayAgain}: PartyResultsScreenProps): React.JSX.Element {
  const max = Math.max(...scores);
  const winners = scores
    .map((score, index) => ({score, index}))
    .filter(item => item.score === max)
    .map(item => item.index + 1);
  const tie = winners.length > 1;
  const title = tie ? 'Shared Curtain Call' : finalTitle(max);

  return (
    <Screen scroll>
      <HeaderBar title="Curtain Call" emoji="🏆" />
      <View style={styles.winnerCard}>
        <Text style={styles.winnerEmoji}>🎭</Text>
        <Text style={styles.winnerTitle}>{tie ? "It's an Ensemble Win!" : `Player ${winners[0]} Wins!`}</Text>
        <Text style={styles.winnerText}>
          {title} with {max} points
        </Text>
      </View>
      <View style={styles.scoreList}>
        {scores
          .map((score, index) => ({score, index}))
          .sort((a, b) => b.score - a.score)
          .map(item => {
            const role = cast[item.index];
            return (
              <View key={item.index} style={[styles.scoreRow, item.score === max ? styles.scoreRowWinner : undefined]}>
                <View style={styles.scorePlayerWrap}>
                  <Text style={styles.scorePlayer}>Player {item.index + 1}</Text>
                  <Text style={styles.scoreRole} numberOfLines={1}>
                    {role?.roleEmoji ?? '🎭'} {role?.roleName ?? 'Mystery Role'}
                  </Text>
                </View>
                <Text style={styles.scorePill}>{item.score} pts</Text>
              </View>
            );
          })}
      </View>
      <View style={styles.castCard}>
        <Text style={styles.castListTitle}>Tonight's cast</Text>
        {cast.map(member => (
          <Text key={`${member.player}-${member.roleName}`} style={styles.castListText}>
            Player {member.player}: {member.roleEmoji} {member.roleName}
          </Text>
        ))}
      </View>
      <View style={styles.resultActions}>
        <AppButton label="Stage Another Show" onPress={onPlayAgain} style={styles.resultButton} />
        <Pressable accessibilityRole="button" onPress={onHome} style={styles.homeMini}>
          <Text style={styles.homeMiniText}>⌂</Text>
        </Pressable>
      </View>
    </Screen>
  );
}

function FeatureRow({icon, title, text}: {icon: string; title: string; text: string}): React.JSX.Element {
  return (
    <View style={styles.featureRow}>
      <Text style={styles.featureIcon}>{icon}</Text>
      <View style={styles.featureCopy}>
        <Text style={styles.featureTitle}>{title}</Text>
        <Text style={styles.featureText}>{text}</Text>
      </View>
    </View>
  );
}

function MiniTeach({onPress}: {onPress: () => void}): React.JSX.Element {
  return (
    <Pressable accessibilityRole="button" onPress={onPress} style={styles.teachButton}>
      <Text style={styles.teachText}>Rules</Text>
    </Pressable>
  );
}

function ProgressBar({progress}: {progress: number}): React.JSX.Element {
  return (
    <View style={styles.progressTrack}>
      <View style={[styles.progressFill, {width: `${Math.max(6, Math.min(100, progress * 100))}%`}]} />
    </View>
  );
}

function RoleCard({role}: {role: TheaterRole}): React.JSX.Element {
  return (
    <View style={styles.roleCard}>
      <Text style={styles.roleEmoji}>{role.emoji}</Text>
      <Text style={styles.roleName}>{role.name}</Text>
      <Text style={styles.roleTroupe}>{role.troupe}</Text>
      <Text style={styles.roleIntro}>{role.intro}</Text>
      <InfoBlock label="Voice" text={role.voice} />
      <InfoBlock label="Move" text={role.movement} />
      <InfoBlock label="Signature line" text={role.signatureLine} />
      <View style={styles.secretBlock}>
        <Text style={styles.secretLabel}>Secret goal</Text>
        <Text style={styles.secretText}>{role.secretGoal}</Text>
      </View>
    </View>
  );
}

function ActBriefing({
  scene,
  role,
  spotlightIndex,
  onStart,
}: {
  scene: TheaterScene;
  role: TheaterRole;
  spotlightIndex: number;
  onStart: () => void;
}): React.JSX.Element {
  return (
    <View>
      <View style={styles.sceneCard}>
        <Text style={styles.cardLabel}>SPOTLIGHT</Text>
        <Text style={styles.spotlightTitle}>
          Player {spotlightIndex + 1} as {role.emoji} {role.name}
        </Text>
        <Text style={styles.sceneTitle}>{scene.actTitle}</Text>
        <Text style={styles.sceneText}>{scene.scene}</Text>
      </View>
      <View style={styles.briefGrid}>
        <PromptCard label="Prop" text={scene.prop} />
        <PromptCard label="Direction" text={scene.direction} />
      </View>
      <View style={styles.sceneCardSecondary}>
        <Text style={styles.cardLabel}>PRIVATE ROLE TOOL</Text>
        <Text style={styles.sceneText}>{role.secretGoal}</Text>
      </View>
      <AppButton label="Start 45 Second Performance" onPress={onStart} tone="green" style={styles.startActButton} />
    </View>
  );
}

function PerformanceStage({
  scene,
  role,
  spotlightIndex,
  timeLeft,
  twistVisible,
  onRevealTwist,
  onEnd,
}: {
  scene: TheaterScene;
  role: TheaterRole;
  spotlightIndex: number;
  timeLeft: number;
  twistVisible: boolean;
  onRevealTwist: () => void;
  onEnd: () => void;
}): React.JSX.Element {
  return (
    <View>
      <View style={styles.stageCard}>
        <Text style={styles.timer}>{timeLeft}s</Text>
        <Text style={styles.stageTitle}>
          Player {spotlightIndex + 1}: {role.emoji} {role.name}
        </Text>
        <Text style={styles.stageLine}>{role.signatureLine}</Text>
        <Text style={styles.applauseCue}>{scene.applauseCue}</Text>
      </View>
      <View style={styles.challengeCard}>
        <Text style={styles.cardLabel}>ACTING CHALLENGE</Text>
        <Text style={styles.challengeText}>{scene.challenge}</Text>
      </View>
      {twistVisible ? (
        <View style={styles.twistCard}>
          <Text style={styles.twistLabel}>DIRECTOR TWIST</Text>
          <Text style={styles.twistText}>{scene.twist}</Text>
        </View>
      ) : (
        <AppButton label="Drop Director Twist" onPress={onRevealTwist} tone="orange" style={styles.twistButton} />
      )}
      <Pressable accessibilityRole="button" onPress={onEnd} style={styles.endSceneButton}>
        <Text style={styles.endSceneText}>End scene and award the cast</Text>
      </Pressable>
    </View>
  );
}

function AwardsPanel({
  scores,
  roundAwards,
  selectedAward,
  onSelectAward,
  onSelectWinner,
  onContinue,
  hasAward,
  finalAct,
}: {
  scores: number[];
  roundAwards: Partial<Record<AwardId, number>>;
  selectedAward: AwardId;
  onSelectAward: (award: AwardId) => void;
  onSelectWinner: (playerIndex: number) => void;
  onContinue: () => void;
  hasAward: boolean;
  finalAct: boolean;
}): React.JSX.Element {
  const currentAward = awardTypes.find(award => award.id === selectedAward) ?? awardTypes[0];

  return (
    <View style={styles.votePanel}>
      <Text style={styles.voteTitle}>Choose an award, then tap the player who won it.</Text>
      <View style={styles.awardTabs}>
        {awardTypes.map(award => {
          const assigned = roundAwards[award.id];
          const active = selectedAward === award.id;
          return (
            <Pressable
              accessibilityRole="button"
              key={award.id}
              onPress={() => onSelectAward(award.id)}
              style={[styles.awardTab, active ? styles.awardTabActive : undefined]}>
              <Text style={styles.awardIcon}>{award.icon}</Text>
              <Text style={[styles.awardLabel, active ? styles.awardLabelActive : undefined]}>{award.label}</Text>
              <Text style={[styles.awardPoints, active ? styles.awardLabelActive : undefined]}>
                {typeof assigned === 'number' ? `P${assigned + 1}` : `+${award.points}`}
              </Text>
            </Pressable>
          );
        })}
      </View>
      <Text style={styles.selectedAward}>
        Awarding {currentAward.icon} {currentAward.label} for +{currentAward.points}
      </Text>
      <View style={styles.voteGrid}>
        {scores.map((score, index) => {
          const selected = roundAwards[selectedAward] === index;
          return (
            <Pressable
              accessibilityRole="button"
              key={index}
              onPress={() => onSelectWinner(index)}
              style={[styles.voteButton, selected ? styles.voteButtonActive : undefined]}>
              <Text style={[styles.voteText, selected ? styles.voteTextActive : undefined]}>Player {index + 1}</Text>
              <Text style={[styles.voteScore, selected ? styles.voteTextActive : undefined]}>{score} pts</Text>
            </Pressable>
          );
        })}
      </View>
      <AppButton
        label={finalAct ? 'Finish the Show' : 'Next Act'}
        onPress={onContinue}
        disabled={!hasAward}
        style={styles.awardContinue}
      />
    </View>
  );
}

function PromptCard({label, text}: {label: string; text: string}): React.JSX.Element {
  return (
    <View style={styles.promptCard}>
      <Text style={styles.promptLabel}>{label}</Text>
      <Text style={styles.promptText}>{text}</Text>
    </View>
  );
}

function InfoBlock({label, text}: {label: string; text: string}): React.JSX.Element {
  return (
    <View style={styles.infoBlock}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoText}>{text}</Text>
    </View>
  );
}

function takeShuffled<T>(items: T[], count: number): T[] {
  return [...items].sort(() => Math.random() - 0.5).slice(0, count);
}

function finalTitle(score: number): string {
  if (score >= 9) {
    return 'Legend of the Haunted Stage';
  }
  if (score >= 6) {
    return 'Midnight Headliner';
  }
  return 'Spooky Scene Stealer';
}

const styles = StyleSheet.create({
  heroCard: {
    borderRadius: 16,
    backgroundColor: colors.purpleDeep,
    padding: 20,
    minHeight: 330,
    justifyContent: 'center',
    marginTop: 12,
  },
  heroKicker: {
    color: colors.gold,
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 0,
    marginBottom: 12,
  },
  heroTitle: {
    color: colors.text,
    fontSize: 23,
    lineHeight: 29,
    fontWeight: '900',
  },
  heroText: {
    color: colors.text,
    opacity: 0.84,
    fontSize: 14,
    lineHeight: 21,
    marginTop: 12,
  },
  previewCast: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 18,
  },
  previewRole: {
    flex: 1,
    minHeight: 76,
    borderRadius: 12,
    backgroundColor: 'rgba(9, 6, 23, 0.36)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  previewEmoji: {
    fontSize: 22,
  },
  previewName: {
    color: colors.textMuted,
    fontSize: 10,
    fontWeight: '800',
    marginTop: 7,
    textAlign: 'center',
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
  howToIconText: {
    fontSize: 18,
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
  featureList: {
    gap: 10,
    marginTop: 14,
  },
  featureRow: {
    minHeight: 72,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.borderSoft,
    backgroundColor: colors.surface,
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
    padding: 13,
  },
  featureIcon: {
    fontSize: 23,
  },
  featureCopy: {
    flex: 1,
  },
  featureTitle: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '900',
  },
  featureText: {
    color: colors.textMuted,
    fontSize: 12,
    lineHeight: 18,
    marginTop: 4,
  },
  directorCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: 18,
    marginTop: 12,
    alignItems: 'center',
  },
  directorEmoji: {
    fontSize: 40,
  },
  directorTitle: {
    color: colors.text,
    fontSize: 19,
    fontWeight: '900',
    marginTop: 12,
  },
  directorText: {
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 20,
    textAlign: 'center',
    marginTop: 8,
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
    marginVertical: 10,
  },
  setupTitle: {
    color: colors.text,
    fontSize: 19,
    fontWeight: '900',
    textAlign: 'center',
  },
  setupText: {
    color: colors.textMuted,
    fontSize: 12,
    marginTop: 6,
    textAlign: 'center',
  },
  setupLabel: {
    alignSelf: 'flex-start',
    color: colors.gold,
    fontSize: 11,
    fontWeight: '900',
    marginTop: 22,
    textTransform: 'uppercase',
  },
  playerGrid: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'center',
    marginTop: 10,
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
  actGrid: {
    width: '100%',
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },
  actButton: {
    flex: 1,
    height: 58,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.borderSoft,
    backgroundColor: colors.backgroundSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actButtonActive: {
    backgroundColor: colors.orangeDeep,
    borderColor: colors.orange,
  },
  actCount: {
    color: colors.textMuted,
    fontSize: 18,
    fontWeight: '900',
  },
  actLabel: {
    color: colors.textDim,
    fontSize: 10,
    marginTop: 4,
  },
  setupHint: {
    width: '100%',
    backgroundColor: colors.backgroundSoft,
    borderRadius: 12,
    marginTop: 20,
    padding: 13,
  },
  setupHintTitle: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '900',
    textAlign: 'center',
  },
  setupHintText: {
    color: colors.textMuted,
    fontSize: 12,
    lineHeight: 18,
    marginTop: 5,
    textAlign: 'center',
  },
  teachButton: {
    minHeight: 32,
    borderRadius: 9,
    backgroundColor: colors.surfaceStrong,
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  teachText: {
    color: colors.purpleSoft,
    fontSize: 11,
    fontWeight: '900',
  },
  progressTrack: {
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.surfaceStrong,
    marginBottom: 16,
  },
  progressFill: {
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.orange,
  },
  castEnvelope: {
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: 16,
    marginBottom: 18,
  },
  castPlayer: {
    color: colors.gold,
    fontSize: 12,
    fontWeight: '900',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  castInstruction: {
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 19,
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 14,
  },
  hiddenRole: {
    minHeight: 330,
    borderRadius: 16,
    backgroundColor: colors.purpleDeep,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  hiddenIcon: {
    fontSize: 58,
  },
  hiddenTitle: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '900',
    marginTop: 18,
    textAlign: 'center',
  },
  hiddenText: {
    color: colors.textMuted,
    fontSize: 13,
    marginTop: 8,
    textAlign: 'center',
  },
  roleCard: {
    borderRadius: 16,
    backgroundColor: colors.backgroundSoft,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.borderSoft,
  },
  roleEmoji: {
    fontSize: 48,
    textAlign: 'center',
  },
  roleName: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '900',
    textAlign: 'center',
    marginTop: 12,
  },
  roleTroupe: {
    color: colors.gold,
    fontSize: 11,
    fontWeight: '900',
    textAlign: 'center',
    marginTop: 5,
    textTransform: 'uppercase',
  },
  roleIntro: {
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 20,
    textAlign: 'center',
    marginTop: 12,
    marginBottom: 10,
  },
  infoBlock: {
    borderRadius: 11,
    backgroundColor: colors.surface,
    padding: 12,
    marginTop: 8,
  },
  infoLabel: {
    color: colors.purpleSoft,
    fontSize: 10,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  infoText: {
    color: colors.textMuted,
    fontSize: 12,
    lineHeight: 18,
    marginTop: 4,
  },
  secretBlock: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.orange,
    backgroundColor: '#301904',
    padding: 12,
    marginTop: 10,
  },
  secretLabel: {
    color: colors.orange,
    fontSize: 10,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  secretText: {
    color: colors.text,
    fontSize: 12,
    lineHeight: 18,
    marginTop: 5,
  },
  scoreStrip: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 14,
  },
  scoreChip: {
    minWidth: 54,
    flexGrow: 1,
    minHeight: 42,
    borderRadius: 11,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.borderSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreChipActive: {
    borderColor: colors.orange,
  },
  scoreChipName: {
    color: colors.textMuted,
    fontSize: 10,
    fontWeight: '900',
  },
  scoreChipValue: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '900',
    marginTop: 2,
  },
  sceneCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.purpleDeep,
    padding: 16,
  },
  sceneCardSecondary: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: 15,
    marginTop: 12,
  },
  cardLabel: {
    color: colors.gold,
    fontSize: 10,
    letterSpacing: 0,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  spotlightTitle: {
    color: colors.text,
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '900',
    marginTop: 10,
  },
  sceneTitle: {
    color: colors.text,
    fontSize: 22,
    lineHeight: 27,
    fontWeight: '900',
    marginTop: 14,
  },
  sceneText: {
    color: colors.text,
    opacity: 0.86,
    fontSize: 14,
    lineHeight: 21,
    marginTop: 10,
  },
  briefGrid: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 12,
  },
  promptCard: {
    flex: 1,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: colors.borderSoft,
    backgroundColor: colors.surface,
    padding: 13,
    minHeight: 124,
  },
  promptLabel: {
    color: colors.purpleSoft,
    fontSize: 10,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  promptText: {
    color: colors.textMuted,
    fontSize: 12,
    lineHeight: 18,
    marginTop: 8,
  },
  startActButton: {
    marginTop: 16,
  },
  stageCard: {
    minHeight: 220,
    borderRadius: 18,
    backgroundColor: colors.orangeDeep,
    padding: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timer: {
    overflow: 'hidden',
    borderRadius: 18,
    backgroundColor: colors.black,
    color: colors.gold,
    fontSize: 24,
    fontWeight: '900',
    paddingHorizontal: 18,
    paddingVertical: 7,
  },
  stageTitle: {
    color: colors.text,
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '900',
    textAlign: 'center',
    marginTop: 18,
  },
  stageLine: {
    color: colors.text,
    opacity: 0.92,
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
    marginTop: 14,
  },
  applauseCue: {
    color: colors.gold,
    fontSize: 12,
    fontWeight: '900',
    lineHeight: 18,
    textAlign: 'center',
    marginTop: 16,
  },
  challengeCard: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: 15,
    marginTop: 12,
  },
  challengeText: {
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 20,
    marginTop: 8,
  },
  twistButton: {
    marginTop: 14,
  },
  twistCard: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#0fb783',
    backgroundColor: '#063f31',
    padding: 16,
    marginTop: 12,
  },
  twistLabel: {
    color: '#36e3a6',
    fontSize: 10,
    letterSpacing: 0,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  twistText: {
    color: colors.text,
    fontSize: 14,
    lineHeight: 21,
    marginTop: 10,
  },
  endSceneButton: {
    minHeight: 48,
    borderRadius: 13,
    backgroundColor: colors.surfaceStrong,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
    paddingHorizontal: 14,
  },
  endSceneText: {
    color: colors.textMuted,
    fontSize: 13,
    fontWeight: '900',
    textAlign: 'center',
  },
  votePanel: {
    borderRadius: 16,
    backgroundColor: colors.surface,
    padding: 14,
  },
  voteTitle: {
    color: colors.textMuted,
    textAlign: 'center',
    fontSize: 13,
    lineHeight: 19,
    marginBottom: 12,
    fontWeight: '800',
  },
  awardTabs: {
    flexDirection: 'row',
    gap: 8,
  },
  awardTab: {
    flex: 1,
    minHeight: 88,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.borderSoft,
    backgroundColor: colors.backgroundSoft,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  awardTabActive: {
    backgroundColor: colors.purple,
    borderColor: colors.purpleSoft,
  },
  awardIcon: {
    fontSize: 20,
  },
  awardLabel: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '900',
    marginTop: 6,
    textAlign: 'center',
  },
  awardPoints: {
    color: colors.textDim,
    fontSize: 10,
    fontWeight: '900',
    marginTop: 5,
  },
  awardLabelActive: {
    color: colors.white,
  },
  selectedAward: {
    color: colors.gold,
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '900',
    marginTop: 13,
  },
  voteGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 12,
  },
  voteButton: {
    flexGrow: 1,
    minWidth: 112,
    minHeight: 56,
    borderRadius: 11,
    borderWidth: 1,
    borderColor: colors.borderSoft,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surfaceStrong,
    paddingHorizontal: 10,
  },
  voteButtonActive: {
    backgroundColor: colors.orange,
    borderColor: colors.gold,
  },
  voteText: {
    color: colors.text,
    fontWeight: '900',
    fontSize: 13,
  },
  voteScore: {
    color: colors.textMuted,
    fontSize: 11,
    marginTop: 4,
    fontWeight: '800',
  },
  voteTextActive: {
    color: colors.white,
  },
  awardContinue: {
    marginTop: 14,
  },
  historyCard: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.borderSoft,
    backgroundColor: colors.backgroundSoft,
    padding: 13,
    marginTop: 12,
  },
  historyTitle: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '900',
    marginBottom: 6,
  },
  historyText: {
    color: colors.textMuted,
    fontSize: 12,
    lineHeight: 18,
    marginTop: 3,
  },
  winnerCard: {
    borderRadius: 16,
    backgroundColor: colors.orangeDeep,
    minHeight: 170,
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
    textAlign: 'center',
  },
  winnerText: {
    color: colors.text,
    fontSize: 13,
    lineHeight: 19,
    marginTop: 7,
    textAlign: 'center',
  },
  scoreList: {
    gap: 10,
    marginTop: 18,
  },
  scoreRow: {
    minHeight: 64,
    borderRadius: 12,
    backgroundColor: colors.surface,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    gap: 12,
  },
  scoreRowWinner: {
    backgroundColor: '#8d3b0b',
  },
  scorePlayerWrap: {
    flex: 1,
  },
  scorePlayer: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '900',
  },
  scoreRole: {
    color: colors.textMuted,
    fontSize: 12,
    marginTop: 4,
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
  castCard: {
    borderRadius: 14,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.borderSoft,
    padding: 14,
    marginTop: 14,
  },
  castListTitle: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '900',
    marginBottom: 6,
  },
  castListText: {
    color: colors.textMuted,
    fontSize: 12,
    lineHeight: 20,
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
