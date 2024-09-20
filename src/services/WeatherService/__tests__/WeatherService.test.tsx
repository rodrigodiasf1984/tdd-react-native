import nock from 'nock';
import {WeatherType} from '../../../types/weather';
import {
  CurrentWeatherRawResponseDto,
  nullCurrentWeatherRawResponse,
} from '../../dto/weather-service.dto';
import WeatherService from '../WeatherService';

describe('WeatherService', () => {
  const mockResponse = {
    ...nullCurrentWeatherRawResponse,
    main: {
      ...nullCurrentWeatherRawResponse.main,
      temp: 10,
      humidity: 100,
      pressure: 1000,
    },
    wind: {
      ...nullCurrentWeatherRawResponse.wind,
      speed: 10,
    },
    weather: [{description: 'mock description', main: '', icon: 'mock-icon'}],
    name: 'mock city',
  };
  it('Should return formatted weather data', async () => {
    const expectedWeather: WeatherType = {
      temperature: 10,
      humidity: 100,
      pressure: 1000,
      windSpeed: 10,
      icon: 'http://openweathermap.org/img/wn/mock-icon@4x.png',
      description: 'mock description',
      city: 'mock city',
    };

    nock('https://api.openweathermap.org')
      .get('/data/2.5/weather')
      .query(true)
      .reply(200, {mockResponse});

    const weather = await WeatherService.fetchCurrentWeather(0, 0);
    expect(weather).toEqual(expectedWeather);
  });

  it('Should return formmater CurrentWeather with empty weather', async () => {
    const mockResponseEmptyweather: CurrentWeatherRawResponseDto = {
      ...mockResponse,
      weather: [],
    };

    nock('https://api.openweathermap.org')
      .get('/data/2.5/weather')
      .query(true)
      .reply(200, {mockResponseEmptyweather});

    const {icon, description} = await WeatherService.fetchCurrentWeather(0, 0);
    expect(icon).toBeNull();
    expect(description).toBeNull();
  });
});
