import React, { FunctionComponent } from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Props {
  title: '아침' | '점심' | '저녁';
  name: string;
  kcal: number;
  date: string;
}

const MenuCard: FunctionComponent<Props> = ({ title, name, kcal, date }) => {
  return (
    <View style={styles.cardWrapper}>
      {/* Title */}
      <View style={styles.cardTitle}>
        <Text style={styles.cardTitleText}>{title}</Text>
      </View>
      {/* Content */}
      <View style={styles.cardContent}>
        <View style={styles.cardContentImage}></View>
        <View style={styles.cardContentInfo}>
          <Text>{name}</Text>
          <Text>{kcal} kcal</Text>
          <Text>{date}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardWrapper: {},
  cardTitle: {
    paddingTop: 16,
    paddingBottom: 16,
  },
  cardTitleText: {
    fontSize: 16,
    fontWeight: '600',
  },
  cardContent: {
    flexDirection: 'row',
  },
  cardContentImage: {
    width: 160,
    height: 160,
    backgroundColor: 'skyblue',
    padding: 16,
  },
  cardContentInfo: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
});

export default MenuCard;
