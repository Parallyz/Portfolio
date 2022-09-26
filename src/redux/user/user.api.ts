import { URLs } from "../../models/path";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User, Users } from "../../models/models";

export const userApi = createApi({
  reducerPath: "user/api",
  baseQuery: fetchBaseQuery({
    baseUrl: URLs.users,
  }),
  refetchOnFocus: true,
  endpoints: (build) => ({
    getUsers: build.query<Users, void>({
      query: () => ({
        url: `users`,
      }),
    }),
  }),
});

export const { useLazyGetUsersQuery } = userApi;
