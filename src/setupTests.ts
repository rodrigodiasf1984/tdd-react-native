import {Animated} from 'react-native';

global.window = {};
global.window = global;

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');

jest.mock('react-native-linear-gradient', () => 'LinearGradient');

global.__reanimatedWorkletInit = () => {};
jest.mock('react-native-reanimated', () =>
  require('react-native-reanimated/mock'),
);

Animated.timing = () => ({
  start: () => jest.fn(),
});
