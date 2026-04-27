import React, {useEffect, useRef} from 'react';
import {Animated, Platform, SafeAreaView, ScrollView, StyleSheet, ViewStyle} from 'react-native';
import {colors, spacing} from '../styles/theme';

type ScreenProps = {
  children: React.ReactNode;
  scroll?: boolean;
  withNav?: boolean;
  style?: ViewStyle;
};

export function Screen({children, scroll, withNav, style}: ScreenProps): React.JSX.Element {
  const entrance = useRef(new Animated.Value(0)).current;
  const bottomSpace = withNav
    ? spacing.navHeight + (Platform.OS === 'android' ? spacing.androidNavGap : spacing.iosNavGap) + 20
    : Platform.OS === 'android'
      ? spacing.androidEdge
      : 12;

  const contentStyle = [
    styles.content,
    {
      paddingTop: Platform.OS === 'android' ? spacing.androidEdge : 8,
      paddingBottom: bottomSpace,
    },
    style,
  ];
  const animatedStyle = {
    opacity: entrance,
    transform: [
      {
        translateY: entrance.interpolate({
          inputRange: [0, 1],
          outputRange: [12, 0],
        }),
      },
    ],
  };

  useEffect(() => {
    Animated.timing(entrance, {
      toValue: 1,
      duration: 320,
      useNativeDriver: true,
    }).start();
  }, [entrance]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <Animated.View style={[styles.animatedWrap, animatedStyle]}>
        {scroll ? (
          <ScrollView
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={contentStyle}>
            {children}
          </ScrollView>
        ) : (
          <Animated.View style={contentStyle}>{children}</Animated.View>
        )}
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  animatedWrap: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: spacing.screenX,
  },
});
