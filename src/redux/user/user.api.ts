import { URLs } from "../../models/path";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User, Users } from "../../models/models";

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
  }),
});

export const { useLazyGetUsersQuery } = userApi;
