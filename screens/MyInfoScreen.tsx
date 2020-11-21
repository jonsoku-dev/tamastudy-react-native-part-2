import React, { FunctionComponent } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import GlobalStyles from '../styles/GlobalStyles';

interface Props {}

const MyInfoScreen: FunctionComponent<Props> = () => {
  return (
    <SafeAreaView style={GlobalStyles.androidSafeArea}>
      <View>
        <Text>MyInfo Screen</Text>
      </View>
    </SafeAreaView>
  );
};

export default MyInfoScreen;
