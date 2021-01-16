import React, { FunctionComponent, useState } from 'react';
import { useBoardContext } from '../../../contexts/useBoardContext';
import MenuCard from '../../cards/MenuCard';
import styled from '@emotion/native';
import StatusCard from '../../cards/StatusCard';
import { IBoard } from '../../../interfaces/IBoard';

interface Props {
}

const Wrapper = styled.View`
`;

const MenuBlock = styled.View`
  margin: 40px 0;
`;

const MenuWrapper: FunctionComponent<Props> = () => {
  const { boards, findBoardsByDate, currentDate } = useBoardContext();

  const [currentTotalCalorie, setCurrentTotalCalorie] = useState(0)

  const getCurrentTotalCalories = (boards: IBoard[]) => {
    let ca = 0;
    boards.forEach(board => {
      ca += board.calorie ?? 0;
    });
    setCurrentTotalCalorie(ca)
  };

  React.useEffect(() => {
    findBoardsByDate(currentDate);
  }, [currentDate]);

  /**
   * 무시해도됨. 원래는 이렇게 안함....
   */
  const morning = boards.find((board) => board.type === 'morning');
  const lunch = boards.find((board) => board.type === 'lunch');
  const dinner = boards.find((board) => board.type === 'dinner');

  React.useEffect(() => {
    getCurrentTotalCalories(boards);
  }, [boards]);

  return (
    <Wrapper>
      <StatusCard
        totalKcal={3000}
        currentKcal={currentTotalCalorie}
        checkMorning={!!morning}
        checkLunch={!!lunch}
        checkDinner={!!dinner}
      />
      <MenuBlock>
        <MenuCard
          title={morning?.title ?? '타이틀을 입력해주세요.'}
          type={morning?.type ?? 'morning'}
          calorie={morning?.calorie ?? 0}
          image={morning?.image}
          date={morning?.date}
        />
      </MenuBlock>
      <MenuBlock>
        <MenuCard
          title={lunch?.title ?? '타이틀을 입력해주세요. '}
          type={lunch?.type ?? 'lunch'}
          calorie={lunch?.calorie ?? 0}
          image={lunch?.image}
          date={lunch?.date}
        />
      </MenuBlock>
      <MenuBlock>
        <MenuCard
          title={dinner?.title ?? '타이틀을 입력해주세요. '}
          type={dinner?.type ?? 'dinner'}
          calorie={dinner?.calorie ?? 0}
          image={dinner?.image}
          date={dinner?.date}
        />
      </MenuBlock>
    </Wrapper>
  );
};

export default MenuWrapper;
