import React, {
  createContext,
  FunctionComponent,
  useCallback,
  useContext,
  useState,
} from 'react';
import { db } from '../db/utils';
import getDate from '../utils/getDate';

export interface IBoard {
  id: number;
  type: 'morning' | 'lunch' | 'dinner';
  image: string;
  title: string;
  calorie: number;
  createdDate: number;
  date: number;
}

export interface ICreateBoard {
  title: string;
  calorie: number;
  type: IBoard['type'];
}

export interface IBoardContext {
  boards: IBoard[];
  findBoardsByDate: (date: number) => void;
  createBoard: ({ title, calorie, type }: ICreateBoard, cb: Function) => void;
}

const BoardContext = createContext<IBoardContext>({} as IBoardContext);

export const BoardProvider: FunctionComponent<any> = ({ children }) => {
  const [boards, setBoards] = useState<IBoard[]>([]);

  const findBoardsByDate = useCallback((date: number) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM boards where boards.date = ?',
        [date],
        (_: any, { rows }: any) => {
          setBoards(rows._array);
        }
      );
    });
  }, []);

  const createBoard = (
    { title, calorie, type }: ICreateBoard,
    cb: Function
  ) => {
    const CREATE_BOARD =
      'INSERT INTO boards (title, calorie, created_date, date, type, image) values (?, ?, ?, ?, ?, ?)';

    const createdDate = +new Date().getTime();
    const date = getDate();
    db.transaction((tx) => {
      // 초기 board 생성
      tx.executeSql(
        CREATE_BOARD,
        [title, calorie, createdDate, date, type, null],
        () => {
          // 생성 후 해당 date로 조회
          tx.executeSql(
            'SELECT * FROM boards where boards.date = ?',
            [date],
            (_: any, { rows }: any) => {
              console.log(rows);
              setBoards(rows._array);
              cb();
            }
          );
        }
      );
    });
  };

  const store: IBoardContext = {
    boards,
    findBoardsByDate,
    createBoard,
  };
  return (
    <BoardContext.Provider value={store}>{children}</BoardContext.Provider>
  );
};

export const useBoardContext = () => useContext(BoardContext);
