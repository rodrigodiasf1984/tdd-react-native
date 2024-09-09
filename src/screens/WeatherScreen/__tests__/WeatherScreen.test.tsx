import React from 'react';
import {render, screen} from '@testing-library/react-native';
import WheatherScreen from '..';

describe('WheatherScreen', () => {
  it('should render WheatherScreen', () => {
    render(<WheatherScreen />);
    const wheatherScreen = screen.getByTestId('wheather-screen');
    expect(wheatherScreen).toBeDefined();
  });
});
