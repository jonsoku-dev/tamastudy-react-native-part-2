import React, { FunctionComponent } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import GlobalStyles from '../styles/GlobalStyles';

interface Props {}

const MapScreen: FunctionComponent<Props> = () => {
  return (
    <SafeAreaView style={GlobalStyles.androidSafeArea}>
      <View>
        <Text>Map Screen</Text>
      </View>
    </SafeAreaView>
  );
};

export default MapScreen;
