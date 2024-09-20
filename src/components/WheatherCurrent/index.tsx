import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {NavigationProps} from '../../types/navigation';
import LocationService from '../../services/LocationService/LocationService';
import Button from '../Button';
import {StyleSheet} from 'react-native';
import {Colors} from '../../contants';

const WeatherCurrent = () => {
  const navigation = useNavigation<NavigationProps>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<boolean>(false);

  const handleFetchWheather = async () => {
    setError(false);
    setLoading(true);

    try {
      const position = await LocationService.getCurrentPosition();

      navigation.navigate('Weather', {
        position,
      });
    } catch (err) {
      setError(true);
    }
    setLoading(false);
  };
  return (
    <Button
      testID="wheather-current"
      label="Weather at my position"
      onPress={handleFetchWheather}
      loading={loading}
      style={error && styles.error}
    />
  );
};

export default WeatherCurrent;

const styles = StyleSheet.create({
  error: {
    borderColor: Colors.ERROR,
    borderWidth: 1,
    borderRadius: 10,
  },
});
