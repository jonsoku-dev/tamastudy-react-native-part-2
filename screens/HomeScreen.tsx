import React, { FunctionComponent } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import GlobalStyles from '../styles/GlobalStyles';
import StatusWrapper from '../components/wrappers/StatusWrapper';
import MenuWrapper from '../components/wrappers/MenuWrapper';
import RecordWrapper from '../components/wrappers/RecordWrapper';

interface Props {}

const HomeScreen: FunctionComponent<Props> = () => {
  return (
    <SafeAreaView style={GlobalStyles.androidSafeArea}>
      <StatusWrapper />
      <MenuWrapper />
      <RecordWrapper />
    </SafeAreaView>
  );
};

export default HomeScreen;
