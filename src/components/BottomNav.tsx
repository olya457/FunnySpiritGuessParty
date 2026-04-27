import React, {useEffect, useRef} from 'react';
import {Animated, Platform, Pressable, StyleSheet, Text, View} from 'react-native';
import {colors, shadows, spacing} from '../styles/theme';
import {TabKey} from '../types';

const tabs: Array<{key: TabKey; label: string; icon: string}> = [
  {key: 'stories', label: 'Stories', icon: '📖'},
  {key: 'friends', label: 'Friends', icon: '👥'},
  {key: 'quiz', label: 'Quiz', icon: '❔'},
  {key: 'ghost', label: 'Ghost', icon: '👻'},
  {key: 'pairs', label: 'Pairs', icon: '🃏'},
];

type BottomNavProps = {
  activeTab: TabKey;
  onTabPress: (tab: TabKey) => void;
};

export function BottomNav({activeTab, onTabPress}: BottomNavProps): React.JSX.Element {
  const entrance = useRef(new Animated.Value(0)).current;
  const navAnimatedStyle = {
    opacity: entrance,
    transform: [
      {
        translateY: entrance.interpolate({
          inputRange: [0, 1],
          outputRange: [18, 0],
        }),
      },
    ],
  };

  useEffect(() => {
    Animated.timing(entrance, {
      toValue: 1,
      duration: 360,
      useNativeDriver: true,
    }).start();
  }, [entrance]);

  return (
    <Animated.View
      style={[
        styles.nav,
        {
          bottom: Platform.OS === 'android' ? spacing.androidNavGap : spacing.iosNavGap,
        },
        shadows.panel,
        navAnimatedStyle,
      ]}>
      {tabs.map(tab => {
        const active = activeTab === tab.key;
        return (
          <Pressable
            accessibilityRole="tab"
            key={tab.key}
            onPress={() => onTabPress(tab.key)}
            style={styles.item}>
            <View style={[styles.iconWrap, active ? styles.iconWrapActive : undefined]}>
              <Text style={[styles.icon, active ? styles.activeText : undefined]}>{tab.icon}</Text>
            </View>
            <Text numberOfLines={1} style={[styles.label, active ? styles.activeText : undefined]}>
              {tab.label}
            </Text>
          </Pressable>
        );
      })}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  nav: {
    position: 'absolute',
    left: 12,
    right: 12,
    height: spacing.navHeight,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: 'rgba(18, 13, 39, 0.96)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 8,
  },
  item: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  iconWrap: {
    minWidth: 36,
    height: 34,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapActive: {
    backgroundColor: colors.purple,
  },
  icon: {
    fontSize: 18,
    color: colors.textMuted,
  },
  label: {
    color: colors.textDim,
    fontSize: 10,
    fontWeight: '700',
  },
  activeText: {
    color: colors.text,
  },
});
