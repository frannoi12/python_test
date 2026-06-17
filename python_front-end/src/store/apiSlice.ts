import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AuthResponse } from '../types/auth';
import { loginSuccess } from './authSlice';

export const authApiSlice = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000' }),
  endpoints: (builder) => ({
    googleLogin: builder.mutation<AuthResponse, { code: string }>({
      query: (credentials) => ({
        url: '/api/v1/auth/google/',
        method: 'POST',
        body: credentials,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(loginSuccess(data));
        } catch (error) {
          console.error("Échec de la synchronisation de l'authentification", error);
        }
      },
    }),
  }),
});

export const { useGoogleLoginMutation } = authApiSlice;