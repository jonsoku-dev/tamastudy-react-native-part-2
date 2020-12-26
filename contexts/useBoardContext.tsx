import React, {
  createContext,
  FunctionComponent,
  useCallback,
  useContext,
  useState,
} from 'react';
import { db } from '../db/utils';

const SELECT_BOARDS = 'SELECT * FROM boards';

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
  insertDummyData: () => void;
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

  const insertDummyData = useCallback(() => {
    const INSERT_DUMMY_DATA =
      'INSERT INTO boards (title, calorie, created_date, date, type, image) values (?, ?, ?, ?, ?, ?)';
    db.transaction((tx) => {
      tx.executeSql(INSERT_DUMMY_DATA, [
        '김치찌개',
        1200,
        +new Date().getTime(),
        20201205,
        'dinner',
        'https://images.unsplash.com/photo-1607034071833-18a5b64047ac?ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyOHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      ]);
      tx.executeSql(SELECT_BOARDS, [], (_: any, { rows }: any) => {
        setBoards(rows._array);
      });
    });
  }, []);

  const createBoard = (
    { title, calorie, type }: ICreateBoard,
    cb: Function
  ) => {
    const CREATE_BOARD =
      'INSERT INTO boards (title, calorie, created_date, date, type, image) values (?, ?, ?, ?, ?, ?)';

    const createdDate = +new Date().getTime();
    const date = Number(
      `${new Date().getFullYear()}${
        new Date().getMonth() + 1
      }${new Date().getDate()}`
    );

    db.transaction((tx) => {
      // 초기 board 생성
      tx.executeSql(CREATE_BOARD, [
        title,
        calorie,
        createdDate,
        date,
        type,
        null,
      ]);

      // 생성 후 해당 date로 조회
      tx.executeSql(
        'SELECT * FROM boards where boards.date = ?',
        [date],
        (_: any, { rows }: any) => {
          setBoards(rows._array);
          cb();
        }
      );
    });
  };

  const store: IBoardContext = {
    boards,
    findBoardsByDate,
    insertDummyData,
    createBoard,
  };
  return (
    <BoardContext.Provider value={store}>{children}</BoardContext.Provider>
  );
};

export const useBoardContext = () => useContext(BoardContext);
