import React from 'react';
import {render, screen} from '@testing-library/react-native';
import WheatherCurrent from '../';

describe('WheatherCurrent', () => {
  it('Should render correctly', () => {
    render(<WheatherCurrent />);
    expect(screen.getByTestId('wheather-current')).toBeDefined();
  });

  it('should navigate to the Weather screen with the location', () => {
    throw new Error('Test not implemented');
  });
});
