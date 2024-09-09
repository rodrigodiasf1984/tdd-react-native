import React from 'react';
import {render, screen} from '@testing-library/react-native';
import HomeScreen from '../';
import WheatherCurrent from '../../../components/WheatherCurrent';
import {View} from 'react-native';
import WheatherCoordinates from '../../../components/WheatherCoordinates';

jest.mock('../../../components/WheatherCoordinates', () =>
  jest.fn().mockReturnValue(null),
);
jest.mock('../../../components/WheatherCurrent', () =>
  jest.fn().mockReturnValue(null),
);

describe('HomeScreen', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(946684800000); // Saturday 1 January 2000 00:00:00 UTC
    render(<HomeScreen />);
  });

  afterEach(() => {
    jest.useRealTimers();
  });
  test('Should render correctly', () => {
    screen.getByTestId('home-screen');
  });

  test('Should contain current date', () => {
    const currentDate = screen.getByText('Jan 01 , 2000');
    expect(currentDate).toBeDefined();
  });

  test('Should contain the current day', () => {
    const currentDay = screen.getByText('Saturday');
    expect(currentDay).toBeDefined();
  });

  test('should contain a divider', () => {
    const divider = screen.getByTestId('home-screen-divider');
    expect(divider).toBeDefined();
  });

  test('Should contain a section to get current weather', () => {
    (WheatherCurrent as jest.Mock).mockReturnValue(
      <View testID="mock-weather-current" />,
    );
    render(<HomeScreen />);
    const wheatherCurrent = screen.getByTestId('mock-weather-current');
    expect(wheatherCurrent).toBeDefined();
  });

  test('Should contain a section to get coordinates', () => {
    (WheatherCoordinates as jest.Mock).mockReturnValue(
      <View testID="mock-wheather-coordinates" />,
    );
    render(<HomeScreen />);
    const wheatherCoordinates = screen.queryByTestId(
      'mock-wheather-coordinates',
    );
    expect(wheatherCoordinates).toBeDefined();
  });
});
