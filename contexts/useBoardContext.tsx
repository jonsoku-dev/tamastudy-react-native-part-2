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
  title: IBoard['title'];
  calorie: IBoard['calorie'];
  type: IBoard['type'];
}

export interface IUpdateBoard {
  title: IBoard['title'];
  calorie: IBoard['calorie'];
  date: IBoard['date'];
  type: IBoard['type'];
}

export interface IDeleteBoard {
  date: IBoard['date'];
  type: IBoard['type'];
}

export interface IUpdateBoardImage {
  image: IBoard['image'];
  date: IBoard['date'];
  type: IBoard['type'];
}

export interface IBoardContext {
  boards: IBoard[];
  findBoardsByDate: (date: number) => void;
  createBoard: ({ title, calorie, type }: ICreateBoard, cb: Function) => void;
  updateBoard: ({ title, calorie, date, type }: IUpdateBoard, cb: Function) => void;
  deleteBoard: ({ date, type }: IDeleteBoard, cb: Function) => void;
  updateBoardImage: ({ image, date, type }: IUpdateBoardImage, cb: Function) => void;
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
        },
      );
    });
  }, []);

  const createBoard = (
    { title, calorie, type }: ICreateBoard,
    cb: Function,
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
            },
          );
        },
      );
    });
  };

  const updateBoard = (
    { title, calorie, date, type }: IUpdateBoard,
    cb: Function,
  ) => {
    const UPDATE_BOARD =
      'UPDATE boards SET title = ?, calorie = ? WHERE boards.date = ? AND boards.type = ?';

    db.transaction((tx) => {
      // 초기 board 생성
      tx.executeSql(
        UPDATE_BOARD,
        [title, calorie, date, type],
        () => {
          tx.executeSql(
            'SELECT * FROM boards where boards.date = ?',
            [date, type],
            (_: any, { rows }: any) => {
              setBoards(rows._array);
              console.log(rows._array);
              cb();
            },
          );
        },
      );
    });
  };

  const deleteBoard = (
    { date, type }: IDeleteBoard,
    cb: Function,
  ) => {
    const DELETE_BOARD =
      'DELETE FROM boards WHERE boards.date = ? AND boards.type = ?';

    db.transaction((tx) => {
      tx.executeSql(
        DELETE_BOARD,
        [date, type],
        () => {
          tx.executeSql(
            'SELECT * FROM boards where boards.date = ?',
            [date, type],
            (_: any, { rows }: any) => {
              setBoards(rows._array);
              console.log(rows._array);
              cb();
            },
          );
        },
      );
    });
  };

  const updateBoardImage = (
    { image, date, type }: IUpdateBoardImage,
    cb: Function,
  ) => {
    const UPDATE_BOARD_IMAGE =
      'UPDATE boards SET image = ? WHERE boards.date = ? AND boards.type = ?';

    db.transaction((tx) => {
      // 초기 board 생성
      tx.executeSql(
        UPDATE_BOARD_IMAGE,
        [image, date, type],
        () => {
          tx.executeSql(
            'SELECT * FROM boards where boards.date = ?',
            [date, type],
            (_: any, { rows }: any) => {
              setBoards(rows._array);
              console.log(rows._array);
              cb();
            },
          );
        },
      );
    });
  };

  const store: IBoardContext = {
    boards,
    findBoardsByDate,
    createBoard,
    updateBoard,
    deleteBoard,
    updateBoardImage
  };
  return (
    <BoardContext.Provider value={store}>{children}</BoardContext.Provider>
  );
};

export const useBoardContext = () => useContext(BoardContext);
