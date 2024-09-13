import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {NavigationProps} from '../../types/navigation';
import LocationService from '../../services/LocationService/LocationService';
import Button from '../Button';

const WeatherCurrent = () => {
  const navigation = useNavigation<NavigationProps>();
  const [loading, setLoading] = useState(false);

  const handleFetchWheather = async () => {
    setLoading(true);

    try {
      const position = await LocationService.getCurrentPosition();

      navigation.navigate('Weather', {
        position,
      });
    } catch (error) {}
    setLoading(false);
  };
  return (
    <Button
      testID="wheather-current"
      label="Weather at my position"
      onPress={handleFetchWheather}
      loading={loading}
    />
  );
};

export default WeatherCurrent;
