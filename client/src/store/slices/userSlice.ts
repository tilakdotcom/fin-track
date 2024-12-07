import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Interface for a single user
interface User {
  _id: string;
  name: string;
  password: string;
  email: string;
  avatarUrl: string;
  createdAt: string;
  updatedAt: string;
}

// Interface for user state
interface UserState {
  currentUser: { user: User } | null;
  loading: boolean;
  error: boolean;
}

// Initial state
const initialState: UserState = {
  currentUser: null,
  loading: false,
  error: false,
};

// User slice
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Action to handle login start
    loginStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    // Action to handle successful login
    loginSuccess: (state, action: PayloadAction<{user:User}>) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = false;
    },
    // Action to handle logout
    logout: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = false;
    },
    // Action to handle login failure
    loginFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

// Export actions and reducer
export const { loginStart, loginSuccess, logout, loginFailure } =
  userSlice.actions;

export default userSlice.reducer;
