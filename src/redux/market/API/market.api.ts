import { IProductItem, ServerResponse } from "../../../models/models";
import { storeUrl } from "../../../models/path";

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const marketApi = createApi({
  reducerPath: "store/api",
  baseQuery: fetchBaseQuery({
    baseUrl: storeUrl.products,
  }),
  refetchOnFocus: true,
  endpoints: (build) => ({
    searchProducts: build.query<IProductItem[], string>({
      query: (search: string) => ({
        url: `search/users`,
        params: {
          q: search,
          per_page: 10,
        },
      }),

      transformResponse: (response: ServerResponse<IProductItem>) =>
        response.items,
    }),
    getProducts: build.query<IProductItem[], string>({
      query: () => ({
        url: `products`
      }),
    }),
  }),
});

export const { useLazySearchProductsQuery,useGetProductsQuery } = marketApi;
