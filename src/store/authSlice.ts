import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  id: string;
  email: string;
  role: string;
  firstName: string;
}

interface AuthState {
  token: string | null;
  user: User | null;
}

const initialState: AuthState = {
  token: null,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthData: (state, action: PayloadAction<{ token: string; user: User | null }>) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    clearAuthData: (state) => {
      state.token = null;
      state.user = null;
    },
    updateUserData: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
  },
});

export const { setAuthData, clearAuthData, updateUserData } = authSlice.actions;
export default authSlice.reducer;
