import React from 'react';
import {render, screen} from '@testing-library/react-native';
import WheatherCurrent from '../';

describe('WheatherCurrent', () => {
  it('Should render correctly', () => {
    render(<WheatherCurrent />);
    expect(screen.getByTestId('wheather-current')).toBeDefined();
  });
});
