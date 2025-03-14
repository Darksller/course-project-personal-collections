import { Item } from '@/schemas/dbSchemas'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const itemsApi = createApi({
  reducerPath: 'itemsApi',
  tagTypes: ['Items'],
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    credentials: 'include',
  }),
  endpoints: (build) => ({
    getItems: build.query<Item[], void>({
      query: () => 'items',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({
                type: 'Items' as const,
                _id,
              })),
              { type: 'Items', id: 'LIST' },
            ]
          : [{ type: 'Items', id: 'LIST' }],
    }),

    getItemById: build.query<Item, string>({
      query: (_id) => `items/${_id}`,
    }),

    getItemsByCollectionId: build.query<Item[], void>({
      query: () => 'items',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({
                type: 'Items' as const,
                _id,
              })),
              { type: 'Items', id: 'LIST' },
            ]
          : [{ type: 'Items', id: 'LIST' }],
    }),

    getFiveLatestItems: build.query<Item[], void>({
      query: () => '/items/latest',
    }),

    addItem: build.mutation({
      query: (body) => ({
        url: '/collections/items/add',
        method: 'POST',
        body,
      }),
    }),
  }),
})

export const {
  useGetItemsQuery,
  useAddItemMutation,
  useGetFiveLatestItemsQuery,
  useGetItemByIdQuery,
} = itemsApi
