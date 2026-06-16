import { createSlice } from '@reduxjs/toolkit';

const token = localStorage.getItem('access_token');
const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

const initialState = {
  user: user,
  token: token,
  isAuthenticated: !!token,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
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