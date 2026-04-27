import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {AppButton} from '../components/AppButton';
import {HeaderBar} from '../components/HeaderBar';
import {Screen} from '../components/Screen';
import {colors} from '../styles/theme';
import {Story} from '../types';

type StoryDetailScreenProps = {
  story: Story;
  liked: boolean;
  onBack: () => void;
  onToggleLike: () => void;
};

export function StoryDetailScreen({
  story,
  liked,
  onBack,
  onToggleLike,
}: StoryDetailScreenProps): React.JSX.Element {
  return (
    <Screen scroll>
      <HeaderBar
        title="Story"
        onBack={onBack}
        right={<Text style={[styles.headerHeart, liked ? styles.headerHeartLiked : undefined]}>{liked ? '♥' : '♡'}</Text>}
      />
      <View style={styles.divider} />
      <View style={styles.body}>
        <Text style={styles.badge}>{story.category.toUpperCase()}</Text>
        <Text style={styles.emoji}>{story.emoji}</Text>
        <Text style={styles.title}>{story.title}</Text>
        <Text style={styles.text}>{story.body}</Text>
      </View>
      <AppButton
        label={liked ? '♥ Remove from Liked' : '♡ Add to Liked'}
        tone={liked ? 'red' : 'purple'}
        onPress={onToggleLike}
        style={styles.button}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  divider: {
    height: 1,
    marginHorizontal: -20,
    backgroundColor: colors.borderSoft,
  },
  headerHeart: {
    color: colors.textDim,
    fontSize: 28,
  },
  headerHeartLiked: {
    color: colors.red,
  },
  body: {
    paddingTop: 24,
  },
  badge: {
    alignSelf: 'flex-start',
    color: colors.purpleSoft,
    backgroundColor: colors.surfaceStrong,
    borderRadius: 11,
    overflow: 'hidden',
    paddingHorizontal: 12,
    paddingVertical: 7,
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 0,
  },
  emoji: {
    fontSize: 52,
    marginTop: 28,
  },
  title: {
    color: colors.text,
    fontSize: 27,
    lineHeight: 35,
    marginTop: 20,
    fontWeight: '900',
  },
  text: {
    color: colors.textMuted,
    fontSize: 16,
    lineHeight: 26,
    marginTop: 18,
  },
  button: {
    marginTop: 24,
  },
});
