import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from '../../contants';
import {StyleSheet, Text, View} from 'react-native';
import moment from 'moment';
import WheatherCurrent from '../../components/WheatherCurrent';
import WheatherCoordinates from '../../components/WheatherCoordinates';

export default function HomeScreen() {
  const now = moment().format('MMM DD , YYYY');

  return (
    <LinearGradient
      testID="home-screen"
      colors={[Colors.LIGHT_GRAY, Colors.DARK_GRAY]}
      style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.date}>{now}</Text>
        <Text style={styles.day}>{moment().format('dddd')}</Text>
      </View>
      <WheatherCurrent />
      <Text style={styles.divider} testID="home-screen-divider">
        Or
      </Text>
      <WheatherCoordinates />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 40,
    alignContent: 'space-between',
    justifyContent: 'space-evenly',
  },
  title: {
    justifyContent: 'flex-end',
  },
  date: {
    fontSize: 13,
    color: Colors.GRAY,
  },
  day: {
    fontSize: 21,
    color: Colors.WHITE,
  },
  divider: {
    color: Colors.WHITE,
    textAlign: 'center',
  },
});
