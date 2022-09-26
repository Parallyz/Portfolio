import { URLs } from "../../models/path";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Users } from "../../models/models";

export const userApi = createApi({
  reducerPath: "user/api",
  baseQuery: fetchBaseQuery({
    baseUrl: URLs.products,
  }),
  refetchOnFocus: true,
  endpoints: (build) => ({
    getUsers: build.query<Users, void>({
      query: () => ({
        url: `products`,
        limit:10,
      }),
    }),
  }),
});

export const { useLazyGetUsersQuery } = userApi;
