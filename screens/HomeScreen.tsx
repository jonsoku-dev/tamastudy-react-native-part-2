import React, { FunctionComponent } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import GlobalStyles from '../styles/GlobalStyles';
import CalendarWrapper from '../components/wrappers/CalendarWrapper';
import MenuWrapper from '../components/wrappers/MenuWrapper';
import RecordWrapper from '../components/wrappers/RecordWrapper';
import styled from '@emotion/native'

interface Props {}

const Wrapper = styled.View`
  margin: 0 40px;
`;

const HomeScreen: FunctionComponent<Props> = () => {
  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <SafeAreaView style={GlobalStyles.androidSafeArea}>
        <Wrapper>
          <CalendarWrapper />
          <MenuWrapper />
          <RecordWrapper />
        </Wrapper>
      </SafeAreaView>
    </ScrollView>
  );
};

export default HomeScreen;
