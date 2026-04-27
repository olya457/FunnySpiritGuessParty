import React, {useEffect, useRef, useState} from 'react';
import {Animated, Image, Pressable, StyleSheet, Text, View, useWindowDimensions} from 'react-native';
import {AppButton} from '../components/AppButton';
import {onboardingPages} from '../data/content';
import {colors, spacing} from '../styles/theme';

type OnboardingScreenProps = {
  onDone: () => void;
};

export function OnboardingScreen({onDone}: OnboardingScreenProps): React.JSX.Element {
  const [pageIndex, setPageIndex] = useState(0);
  const pageAnim = useRef(new Animated.Value(0)).current;
  const {height} = useWindowDimensions();
  const page = onboardingPages[pageIndex];
  const last = pageIndex === onboardingPages.length - 1;
  const compact = height < 720;
  const pageAnimatedStyle = {
    opacity: pageAnim,
    transform: [
      {
        translateY: pageAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [18, 0],
        }),
      },
      {
        scale: pageAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [0.96, 1],
        }),
      },
    ],
  };

  useEffect(() => {
    pageAnim.setValue(0);
    Animated.timing(pageAnim, {
      toValue: 1,
      duration: 340,
      useNativeDriver: true,
    }).start();
  }, [pageAnim, pageIndex]);

  function next(): void {
    if (last) {
      onDone();
      return;
    }
    setPageIndex(index => index + 1);
  }

  return (
    <View style={styles.container}>
      <View style={styles.coolGlow} />
      <View style={styles.warmGlow} />
      {!last ? (
        <Pressable accessibilityRole="button" onPress={onDone} style={styles.skip}>
          <Text style={styles.skipText}>Skip</Text>
        </Pressable>
      ) : null}
      <Animated.View style={[styles.content, compact ? styles.contentCompact : undefined, pageAnimatedStyle]}>
        <Image source={page.image} style={[styles.image, compact ? styles.imageCompact : undefined]} resizeMode="contain" />
        <View style={[styles.badge, {borderColor: page.badgeColor}]}>
          <Text style={[styles.badgeText, {color: page.badgeColor}]}>{page.badge}</Text>
        </View>
        <Text style={[styles.title, compact ? styles.titleCompact : undefined]}>{page.title}</Text>
        <Text style={[styles.description, compact ? styles.descriptionCompact : undefined]}>{page.description}</Text>
      </Animated.View>
      <View style={styles.footer}>
        <View style={styles.progressDots}>
          {onboardingPages.map((item, index) => (
            <View key={item.id} style={[styles.progressDot, index === pageIndex ? styles.progressDotActive : undefined]} />
          ))}
        </View>
        <AppButton label={last ? "Let's Go! 🚀" : 'Continue →'} onPress={next} style={styles.button} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
    paddingHorizontal: spacing.screenX + 22,
    paddingTop: 56,
    paddingBottom: 38,
    backgroundColor: '#1b1231',
  },
  coolGlow: {
    position: 'absolute',
    width: 560,
    height: 560,
    borderRadius: 280,
    top: 28,
    left: -85,
    backgroundColor: 'rgba(132, 59, 242, 0.58)',
  },
  warmGlow: {
    position: 'absolute',
    width: 520,
    height: 520,
    borderRadius: 260,
    bottom: -110,
    right: -220,
    backgroundColor: 'rgba(65, 35, 89, 0.52)',
  },
  skip: {
    alignSelf: 'flex-end',
    minHeight: 36,
    borderRadius: 18,
    paddingHorizontal: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(18, 13, 39, 0.82)',
  },
  skipText: {
    color: colors.textMuted,
    fontWeight: '800',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 28,
  },
  contentCompact: {
    paddingTop: 8,
  },
  image: {
    width: 152,
    height: 152,
    marginBottom: 18,
  },
  imageCompact: {
    width: 126,
    height: 126,
    marginBottom: 12,
  },
  badge: {
    minHeight: 28,
    borderRadius: 14,
    borderWidth: 1,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 0,
  },
  title: {
    color: colors.text,
    fontSize: 32,
    lineHeight: 39,
    marginTop: 24,
    textAlign: 'center',
    fontWeight: '900',
  },
  titleCompact: {
    fontSize: 28,
    lineHeight: 34,
    marginTop: 16,
  },
  description: {
    color: colors.textMuted,
    fontSize: 16,
    lineHeight: 24,
    marginTop: 22,
    textAlign: 'center',
  },
  descriptionCompact: {
    fontSize: 14,
    lineHeight: 21,
    marginTop: 14,
  },
  footer: {
    gap: 20,
  },
  progressDots: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  progressDot: {
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: colors.surfaceStrong,
  },
  progressDotActive: {
    width: 26,
    backgroundColor: colors.purpleSoft,
  },
  button: {
    width: '100%',
  },
});
