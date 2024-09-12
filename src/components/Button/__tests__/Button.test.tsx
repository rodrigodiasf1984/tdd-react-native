import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react-native';
import Button from '..';

describe('Button', () => {
  it('should render correctly', () => {
    render(<Button label="" onPress={jest.fn()} />);
    screen.getByTestId('button');
  });

  it('should render loader when loading', () => {
    render(<Button label="" onPress={jest.fn()} loading />);
    screen.getByTestId('button-loading');
  });

  it('should call given onPress function when pressed', () => {
    const mockOnPress = jest.fn();
    render(<Button label="" onPress={mockOnPress} />);
    const button = screen.getByTestId('button');

    fireEvent.press(button);
    expect(mockOnPress).toHaveBeenCalled();
  });

  it('shoul render given label', () => {
    render(<Button label="mock-label" onPress={jest.fn()} />);
    screen.getByText('mock-label');
  });

  it('should accept custom view pros  ', () => {
    render(<Button label="" onPress={jest.fn()} testID="mock-test-id" />);
    screen.getByTestId('mock-test-id');
  });
});
