import React from 'react';
import {render, screen} from '@testing-library/react-native';
import WheatherCoordinates from '..';

describe('WheatherCoodinates', () => {
  it('Should render correctly', () => {
    render(<WheatherCoordinates />);
    expect(screen.getByTestId('wheather-coordinates')).toBeDefined();
  });
});
