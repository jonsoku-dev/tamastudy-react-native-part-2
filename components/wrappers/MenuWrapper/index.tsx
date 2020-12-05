import React, { FunctionComponent } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import MenuCard from '../../cards/MenuCard';
import useBoard from '../../../db/useBoard';
import { useBoardContext } from '../../../contexts/useBoardContext';

interface Props {}

const MenuWrapper: FunctionComponent<Props> = () => {
  const { boards, insertDummyData, fetchBoards } = useBoardContext();

  const renderCards = () =>
    boards.map((board) => (
      <MenuCard
        key={board.id}
        type={board.type}
        title={board.title}
        calorie={board.calorie}
        createdAt={board.createdAt}
      />
    ));

  React.useEffect(() => {
    fetchBoards();
  }, []);

  return (
    <View>
      <Button onPress={insertDummyData} title={'insert dummy data'} />
      {renderCards()}
    </View>
  );
};

StyleSheet.create({});

export default MenuWrapper;
