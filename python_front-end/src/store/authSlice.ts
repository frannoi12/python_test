import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, AuthResponse, User } from '../types/auth';

const token = localStorage.getItem('access_token');
const storedUser = localStorage.getItem('user');
const user: User | null = storedUser ? JSON.parse(storedUser) : null;

const initialState: AuthState = {
  user,
  token,
  isAuthenticated: !!token,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<AuthResponse>) => {
      state.token = action.payload.access;
      state.user = action.payload.user;
      state.isAuthenticated = true;

      localStorage.setItem('access_token', action.payload.access);
      if (action.payload.refresh) {
        localStorage.setItem('refresh_token', action.payload.refresh);
      }
      if (action.payload.user) {
        localStorage.setItem('user', JSON.stringify(action.payload.user));
      }
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      localStorage.clear();
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;