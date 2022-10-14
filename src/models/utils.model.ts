import { ReactElement } from "react";

export interface adminPath {
  path: string;
  element: ReactElement;
  icon?: string;
  name?: string;
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

export enum AlertType {
  Error,
  Warning,
  Success,
  Info,
}
