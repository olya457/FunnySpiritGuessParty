import {Platform} from 'react-native';

export const colors = {
  background: 'rgba(96, 31, 149, 1)',
  backgroundSoft: '#563275ff',
  surface: '#3b124fff',
  surfaceStrong: '#5633bdff',
  border: '#35205f',
  borderSoft: '#261945',
  text: '#f6efff',
  textMuted: '#a99abb',
  textDim: '#75658f',
  purple: '#843bf2',
  purpleSoft: '#9d63ff',
  purpleDeep: '#4b229b',
  teal: '#10c8b3',
  tealDeep: '#0b7c70',
  orange: '#ff7a13',
  orangeDeep: '#b94d08',
  red: '#ff4f4f',
  redDeep: '#a81d1d',
  green: '#0aa36f',
  gold: '#ffc533',
  black: '#05030c',
  white: '#ffffff',
};

export const spacing = {
  screenX: 20,
  androidEdge: 30,
  iosNavGap: 20,
  androidNavGap: 30,
  navHeight: 74,
};

export const typography = {
  h1: 30,
  h2: 24,
  h3: 18,
  body: 15,
  small: 12,
  tiny: 10,
};

export const shadows = {
  panel: Platform.select({
    ios: {
      shadowColor: colors.purpleSoft,
      shadowOpacity: 0.35,
      shadowRadius: 18,
      shadowOffset: {width: 0, height: 8},
    },
    android: {
      elevation: 12,
    },
  }),
};
