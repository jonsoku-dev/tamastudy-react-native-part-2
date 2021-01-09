import React, {
  createContext,
  FunctionComponent,
  useCallback,
  useContext,
  useState,
} from 'react';
import { db } from '../db/utils';
import getDate from '../utils/getDate';
import moment, { Moment } from 'moment';
import { DATE_FORMAT } from '../shared/enums';

export interface IBoard {
  id: number;
  type: 'morning' | 'lunch' | 'dinner';
  image: string;
  title: string;
  calorie: number;
  createdDate: number;
  date: string;
}

export interface ICreateBoard {
  title: IBoard['title'];
  calorie: IBoard['calorie'];
  type: IBoard['type'];
  image?: IBoard['image'];
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

export interface IDeleteBoardImage {
  date: IBoard['date'];
  type: IBoard['type'];
}

export interface IBoardContext {
  boards: IBoard[];
  findBoardsByDate: (date: string) => void;
  createBoard: ({ title, calorie, type }: ICreateBoard, cb: Function) => void;
  updateBoard: ({ title, calorie, date, type }: IUpdateBoard, cb: Function) => void;
  deleteBoard: ({ date, type }: IDeleteBoard, cb: Function) => void;
  updateBoardImage: ({ image, date, type }: IUpdateBoardImage, cb: Function) => void;
  deleteBoardImage: ({ date, type }: IDeleteBoardImage, cb: Function) => void;
  selectedStartDate: Moment
  currentDate: string
  onDateChange: (date: Moment, type: 'START_DATE' | 'END_DATE') => void;
}

const BoardContext = createContext<IBoardContext>({} as IBoardContext);

export const BoardProvider: FunctionComponent<any> = ({ children }) => {
  const [boards, setBoards] = useState<IBoard[]>([]);

  const findBoardsByDate = useCallback((date: string) => {
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
    { title, calorie, type, image }: ICreateBoard,
    cb: Function,
  ) => {
    const CREATE_BOARD =
      'INSERT INTO boards (title, calorie, created_date, date, type, image) values (?, ?, ?, ?, ?, ?)';

    const createdDate = moment().unix()
    const date = moment().format(DATE_FORMAT)
    db.transaction((tx) => {
      // 초기 board 생성
      tx.executeSql(
        CREATE_BOARD,
        [title, calorie, createdDate, date, type, image ?? null],
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

  const deleteBoardImage = (
    { date, type }: IDeleteBoardImage,
    cb: Function,
  ) => {
    const UPDATE_BOARD_IMAGE =
      'UPDATE boards SET image = ? WHERE boards.date = ? AND boards.type = ?';

    db.transaction((tx) => {
      tx.executeSql(
        UPDATE_BOARD_IMAGE,
        [null, date, type],
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

  //
  const [selectedStartDate, setSelectedStartDate] = useState<Moment>(moment());
  const [currentDate, setCurrentDate] = useState(moment().format(DATE_FORMAT))

  const onDateChange = (date: Moment, type: 'START_DATE' | 'END_DATE') => {
    setSelectedStartDate(date);
    setCurrentDate(date.format(DATE_FORMAT))
  };


  const store: IBoardContext = {
    boards,
    findBoardsByDate,
    createBoard,
    updateBoard,
    deleteBoard,
    updateBoardImage,
    deleteBoardImage,
    //
    selectedStartDate,
    currentDate,
    onDateChange
  };
  return (
    <BoardContext.Provider value={store}>{children}</BoardContext.Provider>
  );
};

export const useBoardContext = () => useContext(BoardContext);
