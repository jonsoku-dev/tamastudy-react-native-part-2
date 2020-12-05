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
  type?: 'm' | 'l' | 'd' | null;
  image?: string | null;
  title?: string | null;
  calorie?: number | null;
  createdAt?: number | null;
  date?: number | null;
}

export interface IBoardContext {
  boards: IBoard[];
  fetchBoards: () => void;
  insertDummyData: () => void;
}

const BoardContext = createContext<IBoardContext>({} as IBoardContext);

export const BoardProvider: FunctionComponent<any> = ({ children }) => {
  const [boards, setBoards] = useState<IBoard[]>([]);

  const fetchBoards = useCallback(() => {
    db.transaction((tx) => {
      tx.executeSql(SELECT_BOARDS, [], (_: any, { rows }: any) => {
        setBoards(rows._array);
      });
    });
  }, []);

  const insertDummyData = useCallback(() => {
    const INSERT_DUMMY_DATA =
      'INSERT INTO boards (type, image, title, calorie, createdAt, date) values (?, ?, ?, ?, ?, ?)';
    db.transaction((tx) => {
      tx.executeSql(INSERT_DUMMY_DATA, [
        'd',
        'https://images.unsplash.com/photo-1607034071833-18a5b64047ac?ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyOHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        'dummy dinner title',
        '1200',
        +new Date().getTime(),
        20201205,
      ]);
      tx.executeSql(SELECT_BOARDS, [], (_: any, { rows }: any) => {
        setBoards(rows._array);
      });
    });
  }, []);

  const store: IBoardContext = {
    boards,
    fetchBoards,
    insertDummyData,
  };
  return (
    <BoardContext.Provider value={store}>{children}</BoardContext.Provider>
  );
};

export const useBoardContext = () => useContext(BoardContext);
