import GetLocation from 'react-native-get-location';

jest.mock('react-native-get-location', () => ({
  getCurrentPosition: jest.fn().mockResolvedValue({latitude: 0, longitude: 0}),
}));

class LocationService {
  static async getCurrentPosition() {
    return GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    }).then(({latitude, longitude}) => ({latitude, longitude}));
  }
}

export default LocationService;
