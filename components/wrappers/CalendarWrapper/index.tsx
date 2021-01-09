import React, { useState, FunctionComponent } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import moment, { Moment } from 'moment';
import { DATE_FORMAT } from '../../../shared/enums';
import { useBoardContext } from '../../../contexts/useBoardContext';

interface Props {
}

const CalendarWrapper: FunctionComponent<Props> = () => {

  const {
    onDateChange,
  } = useBoardContext();

  return (
    <View style={styles.container}>
      <CalendarPicker
        onDateChange={onDateChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginTop: 100,
  },
});

export default CalendarWrapper;