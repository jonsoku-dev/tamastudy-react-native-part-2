import React, { FunctionComponent } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useBoardContext } from '../../../contexts/useBoardContext';
import MenuCard from '../../cards/MenuCard';
import getDate from '../../../utils/getDate';

interface Props {}

const MenuWrapper: FunctionComponent<Props> = () => {
  const { boards, findBoardsByDate } = useBoardContext();

  React.useEffect(() => {
    findBoardsByDate(getDate());
  }, []);

  /**
   * 무시해도됨. 원래는 이렇게 안함....
   */
  const morning = boards.find((board) => board.type === 'morning');
  const lunch = boards.find((board) => board.type === 'lunch');
  const dinner = boards.find((board) => board.type === 'dinner');

  return (
    <View>
      <View>
        <MenuCard
          title={morning?.title ?? '타이틀을 입력해주세요. '}
          type={morning?.type ?? 'morning'}
          calorie={morning?.calorie ?? 0}
          image={morning?.image}
        />
      </View>
      <View>
        <MenuCard
          title={lunch?.title ?? '타이틀을 입력해주세요. '}
          type={lunch?.type ?? 'lunch'}
          calorie={lunch?.calorie ?? 0}
          image={lunch?.image}
        />
      </View>
      <View>
        <MenuCard
          title={dinner?.title ?? '타이틀을 입력해주세요. '}
          type={dinner?.type ?? 'dinner'}
          calorie={dinner?.calorie ?? 0}
          image={dinner?.image}
        />
      </View>
    </View>
  );
};

StyleSheet.create({});

export default MenuWrapper;
