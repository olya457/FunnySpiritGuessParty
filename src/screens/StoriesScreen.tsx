import React, {useMemo, useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {EmptyState, Segment} from '../components/Cards';
import {HeaderBar} from '../components/HeaderBar';
import {Screen} from '../components/Screen';
import {stories} from '../data/content';
import {colors} from '../styles/theme';
import {Story} from '../types';

type StoriesScreenProps = {
  likedStoryIds: string[];
  onOpenStory: (storyId: string) => void;
  onToggleLike: (storyId: string) => void;
};

type StoryFilter = 'all' | 'liked';

export function StoriesScreen({
  likedStoryIds,
  onOpenStory,
  onToggleLike,
}: StoriesScreenProps): React.JSX.Element {
  const [filter, setFilter] = useState<StoryFilter>('all');
  const likedSet = useMemo(() => new Set(likedStoryIds), [likedStoryIds]);
  const visibleStories = filter === 'all' ? stories : stories.filter(story => likedSet.has(story.id));

  return (
    <Screen scroll withNav>
      <HeaderBar title="Spirit Stories" subtitle={`${stories.length} tales from beyond`} emoji="👻" />
      <Segment
        value={filter}
        onChange={setFilter}
        options={[
          {value: 'all', label: '📖 All Stories'},
          {value: 'liked', label: `♥ Liked (${likedStoryIds.length})`},
        ]}
      />
      <View style={styles.list}>
        {visibleStories.length > 0 ? (
          visibleStories.map(story => (
            <StoryCard
              key={story.id}
              story={story}
              liked={likedSet.has(story.id)}
              onOpen={() => onOpenStory(story.id)}
              onToggleLike={() => onToggleLike(story.id)}
            />
          ))
        ) : (
          <EmptyState icon="💔" text="No liked stories yet. Tap the ♥ on any story!" />
        )}
      </View>
    </Screen>
  );
}

type StoryCardProps = {
  story: Story;
  liked: boolean;
  onOpen: () => void;
  onToggleLike: () => void;
};

function StoryCard({story, liked, onOpen, onToggleLike}: StoryCardProps): React.JSX.Element {
  return (
    <Pressable accessibilityRole="button" onPress={onOpen} style={({pressed}) => [styles.card, pressed ? styles.cardPressed : undefined]}>
      <View style={styles.emojiBox}>
        <Text style={styles.emoji}>{story.emoji}</Text>
      </View>
      <View style={styles.copy}>
        <View style={styles.metaRow}>
          <Text style={styles.badge}>{story.category.toUpperCase()}</Text>
          <Pressable accessibilityRole="button" onPress={onToggleLike} hitSlop={10}>
            <Text style={[styles.heart, liked ? styles.heartLiked : undefined]}>{liked ? '♥' : '♡'}</Text>
          </Pressable>
        </View>
        <Text style={styles.title} numberOfLines={2}>
          {story.title}
        </Text>
        <Text style={styles.teaser} numberOfLines={3}>
          {story.teaser}
        </Text>
        <Text style={styles.read}>Read ›</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  list: {
    gap: 12,
    marginTop: 14,
    flex: 1,
  },
  card: {
    minHeight: 132,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    flexDirection: 'row',
    gap: 14,
    padding: 14,
  },
  cardPressed: {
    opacity: 0.82,
  },
  emojiBox: {
    width: 50,
    height: 50,
    borderRadius: 14,
    backgroundColor: colors.surfaceStrong,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: {
    fontSize: 28,
  },
  copy: {
    flex: 1,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  badge: {
    color: colors.purpleSoft,
    backgroundColor: colors.surfaceStrong,
    borderRadius: 8,
    overflow: 'hidden',
    paddingHorizontal: 9,
    paddingVertical: 4,
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 0,
  },
  heart: {
    color: colors.textDim,
    fontSize: 26,
    lineHeight: 28,
  },
  heartLiked: {
    color: colors.red,
  },
  title: {
    color: colors.text,
    fontSize: 15,
    lineHeight: 20,
    marginTop: 8,
    fontWeight: '900',
  },
  teaser: {
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 19,
    marginTop: 6,
  },
  read: {
    color: colors.purpleSoft,
    fontSize: 12,
    fontWeight: '900',
    alignSelf: 'flex-end',
    marginTop: 8,
  },
});
