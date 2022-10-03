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

export interface Users {
  users?: User[];
  total?: number;
  skip?: number;
  limit?: number;
}

export interface User {
  id?: number;
  firstName?: string;
  lastName?: string;
  maidenName?: string;
  age?: number;
  gender?: string;
  email?: string;
  phone?: string;
  username?: string;
  password?: string;
  birthDate?: string;
  image?: string;
  bloodGroup?: string;
  height?: number;
  weight?: number;
  eyeColor?: string;
  hair?: Hair;
  domain?: string;
  ip?: string;
  address?: Address;
  macAddress?: string;
  university?: string;
  bank?: Bank;
  company?: Company;
  ein?: string;
  ssn?: string;
  userAgent?: string;
  [index: string]: string | any;
}

export type UserDelete = User & { isDeleted: boolean };

export interface Address {
  address?: string;
  city?: string;
  coordinates?: Coordinates;
  postalCode?: string;
  state?: string;
}

export interface Coordinates {
  lat?: number;
  lng?: number;
}

export interface Bank {
  cardExpire?: string;
  cardNumber?: string;
  cardType?: string;
  currency?: string;
  iban?: string;
}

export interface Company {
  address?: Address;
  department?: string;
  name?: string;
  title?: string;
}

export interface Hair {
  color?: string;
  type?: string;
}

export interface SortedData {
  key: string;
  value: string;
}

export enum EUserSortedKeys {
  Username = "Username",
  Name = "Name",
  Birth = "Birth",
  Gender = "Gender",
}

export type UserSortKeys = {
  [EUserSortedKeys.Username]: string;
  [EUserSortedKeys.Name]: string;
  [EUserSortedKeys.Birth]: string;
  [EUserSortedKeys.Gender]: string;
  [index: string]: string;
};

export const userSortKeys: UserSortKeys = {
  Username: "username",
  Name: "firstName",
  Birth: "birthDate",
  Gender: "gender",
};
