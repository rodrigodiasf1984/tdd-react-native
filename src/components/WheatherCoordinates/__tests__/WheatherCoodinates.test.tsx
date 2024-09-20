import React from 'react';
import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react-native';
import WheatherCoordinates from '..';
import {useNavigation} from '@react-navigation/native';

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: jest.fn().mockReturnValue({navigate: jest.fn()}),
  };
});

describe('WheatherCoodinates', () => {
  it('Should render correctly', () => {
    render(<WheatherCoordinates />);
    expect(screen.getByTestId('wheather-coordinates')).toBeDefined();
  });

  it('Should navigate to the Weather screen with the location when valid form is submit', async () => {
    const mockNavigate = jest.fn();
    (useNavigation as jest.Mock).mockReturnValueOnce({
      navigate: mockNavigate,
    });

    render(<WheatherCoordinates />);
    const formFields = {
      latitude: screen.getByTestId('weather-coordinates-latitude'),
      longitude: screen.getByTestId('weather-coordinates-longitude'),
    };

    fireEvent.changeText(formFields.latitude, '0');
    fireEvent.changeText(formFields.longitude, '0');

    const button = screen.getByTestId('weather-coordinates-submit');
    fireEvent.press(button);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('Weather', {
        latitude: 0,
        longitude: 0,
      });
    });
  });

  describe('Latitude field', () => {
    it('Should not show error when value is the lowest range value', async () => {
      render(<WheatherCoordinates />);

      const latitude = screen.getByTestId('weather-coordinates-latitude');
      fireEvent.changeText(latitude, '-90');

      return expect(
        screen.findByText('Latitude must be a valid number'),
      ).rejects.toThrow();
    });

    it('Should not show error when value is the highest range value', async () => {
      render(<WheatherCoordinates />);

      const latitude = screen.getByTestId('weather-coordinates-latitude');
      fireEvent.changeText(latitude, '90');

      return expect(
        screen.findByText('Latitude must be a valid number'),
      ).rejects.toThrow();
    });

    it('Should show error when value is lower than the lowest range value', async () => {
      render(<WheatherCoordinates />);

      const latitude = screen.getByTestId('weather-coordinates-latitude');
      fireEvent.changeText(latitude, '-91');

      await waitFor(() => {
        expect(
          screen.getByText('Latitude must be a valid number'),
        ).toBeDefined();
      });
    });

    it('Should show error when value is higher than the highest range value', async () => {
      render(<WheatherCoordinates />);

      const latitude = screen.getByTestId('weather-coordinates-latitude');
      fireEvent.changeText(latitude, '91');

      await waitFor(() => {
        expect(
          screen.getByText('Latitude must be a valid number'),
        ).toBeDefined();
      });
    });

    it('Should show error when value is not a number', async () => {
      render(<WheatherCoordinates />);

      const latitude = screen.getByTestId('weather-coordinates-latitude');
      fireEvent.changeText(latitude, 'abc');

      await waitFor(() => {
        expect(
          screen.getByText('Latitude must be a valid number'),
        ).toBeDefined();
      });
    });
  });

  describe('Longitude field', () => {
    it('Should not show error when value is the lowest range value', async () => {
      render(<WheatherCoordinates />);

      const longitude = screen.getByTestId('weather-coordinates-longitude');
      fireEvent.changeText(longitude, '-180');

      return expect(
        screen.findByText('Longitude must be a valid number'),
      ).rejects.toThrow();
    });

    it('Should not show error when value is the highest range value', async () => {
      render(<WheatherCoordinates />);

      const longitude = screen.getByTestId('weather-coordinates-longitude');
      fireEvent.changeText(longitude, '180');

      return expect(
        screen.findByText('Longitude must be a valid number'),
      ).rejects.toThrow();
    });

    it('Should show error when value is higher than the highest range value', async () => {
      render(<WheatherCoordinates />);

      const longitude = screen.getByTestId('weather-coordinates-longitude');
      fireEvent.changeText(longitude, '181');

      await waitFor(() => {
        expect(
          screen.getByText('Longitude must be a valid number'),
        ).toBeDefined();
      });
    });

    it('Should show error when value is lower than the lowest range value', async () => {
      render(<WheatherCoordinates />);

      const longitude = screen.getByTestId('weather-coordinates-longitude');
      fireEvent.changeText(longitude, '-181');

      await waitFor(() => {
        expect(
          screen.getByText('Longitude must be a valid number'),
        ).toBeDefined();
      });
    });

    it('Should show error when value is not a number', async () => {
      render(<WheatherCoordinates />);

      const longitude = screen.getByTestId('weather-coordinates-longitude');
      fireEvent.changeText(longitude, 'abc');

      await waitFor(() => {
        expect(
          screen.getByText('Longitude must be a valid number'),
        ).toBeDefined();
      });
    });
  });
});
