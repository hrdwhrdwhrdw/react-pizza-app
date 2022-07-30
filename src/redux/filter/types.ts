export enum SortNameType {
  POPULAR_DESC = "популярности (по убыванию)",
  POPULAR_ASC = "популярности (по возрастанию)",
  PRICE_DESC = "популярности (по убыванию)",
  PRICE_ASC = "популярности (по возрастанию)",
  ALPHABET_DESC = "популярности (по убыванию)",
  ALPHABET_ASC = "популярности (по возрастанию)",
}

export enum SortType {
  POPULAR = "popular",
  PRICE = "price",
  NAME = "name",
}

export enum OrderType {
  DESC = "desc",
  ASC = "asc",
}

export type SortByType = {
  name?: SortNameType;
  type?: SortType;
  order?: OrderType;
};

export interface FilterSliceType {
  category: number;
  sortBy: SortByType;
  currentPage: number;
  searchValue?: string;
}