import React from 'react';
import AppNavigator from './routes';

import {LogBox} from 'react-native';

LogBox.ignoreAllLogs();

const App = () => {
  return <AppNavigator />;
};

export default App;
