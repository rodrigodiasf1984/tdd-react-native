import React from 'react';
import {View} from 'react-native';
import HomeScreen from '../../screens/HomeScreen';
import {render, screen, waitFor} from '@testing-library/react-native';
import AppNavigatior from '..';

jest.mock('../../screens/HomeScreen', () => jest.fn());

describe('Routes', () => {
  it('should render HomeScreen by default', async () => {
    (HomeScreen as jest.Mock).mockReturnValueOnce(
      <View testID="mock-home-screen" />,
    );
    render(<AppNavigatior />);
    await waitFor(() => {
      const homeScreen = screen.getByTestId('mock-home-screen');
      expect(homeScreen).toBeDefined();
    });
  });
});
