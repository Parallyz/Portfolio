import { ReactElement } from "react";

export interface IProductItem {
  id: number;
  title: string;
  price: string;
  category: string;
  description: string;
  image: string;
}

export interface ServerResponse<T> {
  total_count: number;
  incomplete_results: boolean;
  items: T[];
}

export interface adminPath {
  path: string;
  element: ReactElement;
  icon?: string;
  name?: string;
}
