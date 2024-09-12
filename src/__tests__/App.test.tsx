import React from 'react';
import {render, screen} from '@testing-library/react-native';
import AppNavigator from '../routes';
import {View} from 'react-native';
import App from '../App';

jest.mock('../routes', () => jest.fn());

describe('App', () => {
  it('should render routes', () => {
    (AppNavigator as jest.Mock).mockReturnValueOnce(
      <View testID="mock-routes" />,
    );
    render(<App />);
    screen.getByTestId('mock-routes');
  });
});
