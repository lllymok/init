import { createSlice } from '@reduxjs/toolkit';

import { User } from 'entities/user';
// import { getUser } from './api';

export interface LoginPayload extends User {
  error?: any;
}

export interface LoginState {
  user: User;
  isLoggedIn: boolean;
  isLoading: boolean;
  error?: any;
}

export const initialState: LoginState = {
  user: {
    user: { userId: '', name: '' },
  },
  isLoggedIn: false,
  isLoading: false,
  error: undefined,
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    login(state) {
      state.isLoggedIn = false;
      state.isLoading = true;
    },
    signOut(state) {
      state.isLoggedIn = false;
      state.user = initialState.user;
    },
  },
});

export const { login, signOut } = loginSlice.actions;

export default loginSlice.reducer;
