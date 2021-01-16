import { Moment } from 'moment';

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