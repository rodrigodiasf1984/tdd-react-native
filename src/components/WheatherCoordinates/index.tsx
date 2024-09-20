import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Controller, useForm} from 'react-hook-form';
import {NavigationProps} from '../../types/navigation';
import {Colors} from '../../contants';
import Button from '../Button';
import * as Yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';

type FormValues = {
  latitude: string;
  longitude: string;
};

const defaultValues: FormValues = {
  latitude: '',
  longitude: '',
};

const validationSchema = Yup.object().shape({
  latitude: Yup.number().min(-90).max(90).required(),
  longitude: Yup.number().min(-180).max(180).required(),
});

const WheatherCoordinates = () => {
  const navigation = useNavigation<NavigationProps>();

  const form = useForm<FormValues>({
    resolver: yupResolver(validationSchema),
    defaultValues,
    mode: 'onChange',
  });

  const handleSubmit = form.handleSubmit(values => {
    navigation.navigate('Weather', values);
  });

  return (
    <View testID="wheather-coordinates">
      <View style={styles.inputs}>
        <Controller
          control={form.control}
          render={({onChange}) => (
            <TextInput
              onChangeText={onChange}
              style={styles.input}
              placeholder="Lat"
              testID="weather-coordinates-latitude"
              placeholderTextColor={Colors.GRAY}
            />
          )}
          name="latitude"
        />
        {form.errors.latitude && (
          <Text style={styles.error}>Latitude must be a valid number</Text>
        )}
        <Controller
          control={form.control}
          render={({onChange}) => (
            <TextInput
              onChangeText={onChange}
              style={styles.input}
              placeholder="Long"
              testID="weather-coordinates-longitude"
              placeholderTextColor={Colors.GRAY}
            />
          )}
          name="longitude"
        />
        {form.errors.longitude && (
          <Text style={styles.error}>Longitude must be a valid number</Text>
        )}
      </View>
      <Button
        onPress={handleSubmit}
        label="find"
        testID="weather-coordinates-submit"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputs: {
    flexDirection: 'column',
    marginBottom: 15,
  },
  input: {
    backgroundColor: Colors.TRANSPARENT,
    margin: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.GRAY,
    paddingHorizontal: 15,
    paddingVertical: 8,
    color: Colors.WHITE,
  },
  error: {
    marginHorizontal: 5,
    color: Colors.ERROR,
  },
});

export default WheatherCoordinates;
