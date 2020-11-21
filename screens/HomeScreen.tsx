import React, { FunctionComponent } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import GlobalStyles from '../styles/GlobalStyles';

interface Props {}

const HomeScreen: FunctionComponent<Props> = () => {
  return (
    <SafeAreaView style={GlobalStyles.androidSafeArea}>
      <View>
        <Text>Home Screen</Text>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
