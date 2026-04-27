import React from 'react';
import {StatusBar} from 'react-native';
import {SpiritApp} from './src/SpiritApp';

function App(): React.JSX.Element {
  return (
    <>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <SpiritApp />
    </>
  );
}

export default App;
