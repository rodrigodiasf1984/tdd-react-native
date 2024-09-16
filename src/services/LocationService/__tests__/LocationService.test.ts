import LocationService from '../LocationService';
import GetLocation from 'react-native-get-location';

jest.spyOn(GetLocation, 'getCurrentPosition').mockResolvedValue({
  latitude: 0,
  longitude: 0,
  altitude: 0,
  accuracy: 1,
  speed: 0,
  time: Date.now(),
});
describe('LocationService', () => {
  test('Should return latitude & longitude from current location', async () => {
    const position = await LocationService.getCurrentPosition();
    expect(position).toEqual({
      latitude: 0,
      longitude: 0,
    });
  });
});
