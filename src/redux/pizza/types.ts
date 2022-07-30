import { SortByType } from '../filter/types';
export interface PizzaItem {
  id: number;
  imageUrl: string;
  name: string;
  types: number[];
  sizes: number[];
  price: number;
  category: number;
  rating: number;
  count?: number;
}

export enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error"
}

export interface PizzaSliceType {
  items: PizzaItem[];
  status: Status;
}

export interface FetchPizzaType {
  category: number;
  sortBy: SortByType;
  currentPage: number;
  searchValue?: string;
}

export type PizzaBlockType = {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  types: number[];
};