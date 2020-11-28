import React, { FunctionComponent } from 'react';
import { View, Text, SafeAreaView, ScrollView } from 'react-native';
import GlobalStyles from '../styles/GlobalStyles';
import StatusWrapper from '../components/wrappers/StatusWrapper';
import MenuWrapper from '../components/wrappers/MenuWrapper';
import RecordWrapper from '../components/wrappers/RecordWrapper';

interface Props {}

const HomeScreen: FunctionComponent<Props> = () => {
  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <SafeAreaView style={GlobalStyles.androidSafeArea}>
        <StatusWrapper totalKcal={2000} currentKcal={900} />
        <MenuWrapper />
        <RecordWrapper />
      </SafeAreaView>
    </ScrollView>
  );
};

export default HomeScreen;
