import {useNavigation} from '@react-navigation/native';
import {render, waitFor} from '@testing-library/react-native';
import React, {useEffect, act} from 'react';
import {View} from 'react-native';

import AppNavigator from '..';
import HomeScreen from '../../screens/HomeScreen';
import {NavigationProps} from '../../types/navigation';
import WeatherScreen from '../../screens/WeatherScreen';

jest.mock('../../screens/HomeScreen', () => jest.fn());
jest.mock('../../screens/WeatherScreen', () => jest.fn());

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return Reanimated;
});

describe('AppNavigator', () => {
  test('Should render HomeScreen by default', async () => {
    (HomeScreen as jest.Mock).mockReturnValueOnce(
      <View testID="mock-home-screen" />,
    );
    const wrapper = render(<AppNavigator />);

    await waitFor(() => {
      wrapper.getByTestId('mock-home-screen');
    });
  });

  test('Should render WeatherScreen on "Weather" route', async () => {
    (HomeScreen as jest.Mock).mockImplementationOnce(() => {
      const navigation = useNavigation<NavigationProps>();

      useEffect(() => {
        // Wrap navigation in act() to handle the state update
        act(() => {
          navigation.navigate('Weather');
        });
      }, [navigation]);

      return null;
    });

    (WeatherScreen as jest.Mock).mockReturnValueOnce(
      <View testID="mock-weather-screen" />,
    );

    const wrapper = render(<AppNavigator />);

    await waitFor(() => {
      expect(wrapper.getByTestId('mock-weather-screen')).toBeTruthy();
    });
  });
});
