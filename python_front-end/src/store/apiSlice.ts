import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AuthResponse } from '../types/auth';
import { loginSuccess } from './authSlice';

export const authApiSlice = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000' }),
  endpoints: (builder) => ({
    googleLogin: builder.mutation<AuthResponse, { access_token: string }>({
      query: (body) => ({
        url: '/api/v1/auth/google/',
        method: 'POST',
        body: body,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(loginSuccess(data)); 
        } catch (error) {
          console.error("Échec de la synchronisation avec Django", error);
        }
      },
    }),
  }),
});

export const { useGoogleLoginMutation } = authApiSlice;