import React, { FunctionComponent } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SquareIcon, CheckSquareIcon } from '../../icons';

interface Props {
  totalKcal: number;
  currentKcal: number;
}

const StatusWrapper: FunctionComponent<Props> = ({
  totalKcal,
  currentKcal,
}) => {
  return (
    <View>
      <View style={styles.top}>
        <View style={styles.topIconBox}>
          <CheckSquareIcon />
          <Text>아침</Text>
        </View>
        <View style={styles.topIconBox}>
          <SquareIcon />
          <Text>점심</Text>
        </View>
        <View style={styles.topIconBox}>
          <SquareIcon />
          <Text>저녁</Text>
        </View>
      </View>
      <View style={styles.middle}>
        <View style={styles.middleTextBox}>
          <Text style={styles.middleTextBold}>설정 된 일일 칼로리</Text>
          <Text style={styles.middleText}>{totalKcal} kcal</Text>
        </View>
        <View style={styles.middleTextBox}>
          <Text style={styles.middleTextBold}>현재까지 칼로리</Text>
          <Text style={styles.middleText}>{currentKcal} kcal</Text>
        </View>
      </View>
      <View style={styles.bottom}>
        {totalKcal - currentKcal > 0 ? (
          <View style={styles.bottomBox}>
            <Text style={styles.bottomText}>GOOD</Text>
          </View>
        ) : (
          <View style={[styles.bottomBox, styles.bottomBadBox]}>
            <Text style={styles.bottomText}>BAD</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const defaultText = {
  flex: 1,
};

const styles = StyleSheet.create({
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  middle: {},
  bottom: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  topIconBox: {
    alignItems: 'center',
  },
  middleTextBox: {
    flexDirection: 'row',
  },
  middleText: {
    ...defaultText,
  },
  middleTextBold: {
    ...defaultText,
    fontWeight: '700',
  },
  bottomBox: {
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 48,
    paddingRight: 48,
    backgroundColor: '#2ecc71',
  },
  bottomText: {
    fontWeight: '700',
    fontSize: 20,
    textAlign: 'center',
    color: '#fff',
  },
  bottomBadBox: {
    backgroundColor: '#e74c3c',
  },
});

export default StatusWrapper;
