import { URLs } from "../../models/path";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User, UserDelete, Users } from "../../models/models";

export interface UserQueryParams {
  skip?: number;
  limit?: number;
}

export const userApi = createApi({
  reducerPath: "user/api",
  baseQuery: fetchBaseQuery({
    baseUrl: URLs.users,
  }),
  refetchOnFocus: true,
  endpoints: (build) => ({
    getUsers: build.query<Users, UserQueryParams>({
      query: ({ skip = 0, limit = 30 }) => ({
        url: `users?limit=${limit}&skip=${skip}`,
      }),
    }),
    deleteUser: build.query<UserDelete, number>({
      query: (id) => ({
        url: `users/${id}`,
        method: "DELETE",
      }),
    }),
    searchUsers: build.query<Users, string>({
      query: (search) => ({
        url: `users/search?q=${search}`,
      }),
    }),
  }),
});

export const { useLazyGetUsersQuery, useLazyDeleteUserQuery,useLazySearchUsersQuery } = userApi;
