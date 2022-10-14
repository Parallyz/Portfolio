import { User, UserDeleteDTO, Users } from "../../models/user.model";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { URLs } from "../../models/path";

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
  // refetchOnFocus: false,
  endpoints: (build) => ({
    getUsers: build.query<Users, UserQueryParams>({
      query: ({ skip = 0, limit = 30 }) => ({
        url: `users?limit=${limit}&skip=${skip}`,
      }),
    }),

    deleteUser: build.query<UserDeleteDTO, number>({
      query: (id) => ({
        url: `users/${id}`,
        method: "DELETE",
      }),
    }),
    getUser: build.query<User, number>({
      query: (id) => ({
        url: `users/${id}`,
      }),
    }),
    searchUsers: build.query<Users, UserQueryParams & { search: string }>({
      query: ({ search, skip = 0, limit = 30 }) => ({
        url: `users/search?q=${search}&limit=${limit}&skip=${skip}`,
      }),
    }),

    updateUser: build.mutation<User, User>({
      query: (user) => ({
        url: `users/${user?.id}`,
        body: user,
        method: "PUT",
      }),
    }),
    addUser: build.mutation<User, Omit<User, "id">>({
      query: (user) => ({
        url: `users/add`,
        body: user,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useLazyGetUsersQuery,
  useLazyDeleteUserQuery,
  useLazySearchUsersQuery,
  useLazyGetUserQuery,

  useAddUserMutation,
  useUpdateUserMutation,
} = userApi;
