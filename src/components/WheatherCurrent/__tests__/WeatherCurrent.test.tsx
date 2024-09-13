import React, {act} from 'react';
import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react-native';
import WheatherCurrent from '..';
import {useNavigation} from '@react-navigation/native';
import LocationService from '../../../services/LocationService/LocationService';
import {Colors} from '../../../contants';

jest.mock('react-native-get-location', () => ({
  getCurrentPosition: jest.fn().mockResolvedValue({latitude: 0, longitude: 0}),
}));

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: jest.fn().mockReturnValue({navigate: jest.fn()}),
  };
});

describe('WheatherCurrent', () => {
  it('Should render correctly', () => {
    render(<WheatherCurrent />);
    expect(screen.getByTestId('wheather-current')).toBeDefined();
  });

  it('should render label', () => {
    render(<WheatherCurrent />);
    expect(screen.getByText('Weather at my position')).toBeDefined();
  });

  it('should navigate to the Weather screen with the location', async () => {
    const mockNavigate = jest.fn();
    (useNavigation as jest.Mock).mockReturnValueOnce({navigate: mockNavigate});
    render(<WheatherCurrent />);
    const button = screen.getByTestId('wheather-current');
    fireEvent.press(button);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalled();
    });
  });

  describe('Loader', () => {
    it('Loader should be rendered when position is being fetched', async () => {
      let mockResolve!: (position: {
        latitude: number;
        longitude: number;
      }) => void;

      jest.spyOn(LocationService, 'getCurrentPosition').mockImplementationOnce(
        () =>
          new Promise(resolve => {
            mockResolve = resolve;
          }),
      );
      render(<WheatherCurrent />);
      const button = screen.getByTestId('wheather-current');
      fireEvent.press(button);

      await expect(
        screen.findByTestId('button-loading'),
      ).resolves.toBeDefined();

      await act(async () => {
        mockResolve({latitude: 0, longitude: 0});
      });
    });

    it('Should not rendered the loader when position is fetched', async () => {
      render(<WheatherCurrent />);
      const button = screen.getByTestId('wheather-current');
      fireEvent.press(button);

      await waitFor(() => {
        return expect(screen.findByTestId('button-loading')).rejects.toThrow();
      });
    });

    it('should not render the loader when fetching position has failed', async () => {
      jest
        .spyOn(LocationService, 'getCurrentPosition')
        .mockRejectedValueOnce(new Error(''));

      render(<WheatherCurrent />);
      const button = screen.getByTestId('wheather-current');
      fireEvent.press(button);

      await waitFor(() => {
        return expect(screen.findByTestId('button-loading')).rejects.toThrow();
      });
    });
  });

  describe('Error', () => {
    test('Should be displayed when fetching position has failed', async () => {
      jest
        .spyOn(LocationService, 'getCurrentPosition')
        .mockRejectedValueOnce(new Error(''));

      render(<WheatherCurrent />);
      const button = screen.getByTestId('wheather-current');
      fireEvent.press(button);

      await waitFor(() => {
        expect(button).toHaveStyle({borderColor: Colors.ERROR});
      });
    });
  });
});
