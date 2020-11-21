import React, { FunctionComponent } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MenuCard from '../../cards/MenuCard';

interface Props {}

const MenuWrapper: FunctionComponent<Props> = () => {
  return (
    <View>
      <MenuCard
        title={'아침'}
        name={'짜장면'}
        kcal={600}
        date={'2020-11-21 09:00'}
      />
      <MenuCard
        title={'점심'}
        name={'짬뽕'}
        kcal={900}
        date={'2020-11-21 13:30'}
      />
      <MenuCard
        title={'저녁'}
        name={'군만두'}
        kcal={200}
        date={'2020-11-21 19:00'}
      />
    </View>
  );
};

StyleSheet.create({});

export default MenuWrapper;
