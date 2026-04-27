import React, {useEffect, useRef} from 'react';
import {Animated, Easing, Image, StyleSheet, View} from 'react-native';
import {images} from '../assets';

export function LoadingScreen(): React.JSX.Element {
  const pulse = useRef(new Animated.Value(0)).current;
  const float = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.parallel(
      [
        Animated.loop(
          Animated.sequence([
            Animated.timing(pulse, {
              toValue: 1,
              duration: 1100,
              easing: Easing.inOut(Easing.sin),
              useNativeDriver: true,
            }),
            Animated.timing(pulse, {
              toValue: 0,
              duration: 1100,
              easing: Easing.inOut(Easing.sin),
              useNativeDriver: true,
            }),
          ]),
        ),
        Animated.loop(
          Animated.sequence([
            Animated.timing(float, {
              toValue: 1,
              duration: 1800,
              easing: Easing.inOut(Easing.sin),
              useNativeDriver: true,
            }),
            Animated.timing(float, {
              toValue: 0,
              duration: 1800,
              easing: Easing.inOut(Easing.sin),
              useNativeDriver: true,
            }),
          ]),
        ),
      ],
      {stopTogether: true},
    );
    animation.start();
    return () => animation.stop();
  }, [float, pulse]);

  const scale = pulse.interpolate({inputRange: [0, 1], outputRange: [0.96, 1.08]});
  const haloScale = pulse.interpolate({inputRange: [0, 1], outputRange: [0.84, 1.18]});
  const haloOpacity = pulse.interpolate({inputRange: [0, 1], outputRange: [0.24, 0.6]});
  const translateY = float.interpolate({inputRange: [0, 1], outputRange: [10, -16]});
  const rotate = float.interpolate({inputRange: [0, 1], outputRange: ['-7deg', '7deg']});

  return (
    <View style={styles.container}>
      <View style={styles.warmGlow} />
      <View style={styles.coolGlow} />
      <Animated.View style={[styles.halo, {opacity: haloOpacity, transform: [{scale: haloScale}]}]} />
      <Animated.View style={[styles.cardWrap, {transform: [{translateY}, {rotate}, {scale}]}]}>
        <Image source={images.loaderCard} style={styles.cardImage} resizeMode="contain" />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1b1231',
  },
  warmGlow: {
    position: 'absolute',
    width: 520,
    height: 520,
    borderRadius: 260,
    right: -250,
    bottom: 50,
    backgroundColor: 'rgba(190, 58, 30, 0.34)',
  },
  coolGlow: {
    position: 'absolute',
    width: 620,
    height: 620,
    borderRadius: 310,
    top: -170,
    left: -180,
    backgroundColor: 'rgba(132, 59, 242, 0.45)',
  },
  cardWrap: {
    width: 230,
    height: 230,
    alignItems: 'center',
    justifyContent: 'center',
  },
  halo: {
    position: 'absolute',
    width: 236,
    height: 236,
    borderRadius: 118,
    backgroundColor: 'rgba(157, 99, 255, 0.55)',
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
});
