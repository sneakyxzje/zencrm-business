import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { User } from "./types";
import { getMe, loginRequest, logoutRequest } from "../api";

type AuthState = {
  user: User | null;
  isLoggedin: boolean;
  isLoggingin: boolean;
  isInitializing: boolean;
  error: string | null;
};

const initialState: AuthState = {
  user: null,
  isLoggedin: false,
  isLoggingin: false,
  isInitializing: true,
  error: null,
};

export const checkAuthStatus = createAsyncThunk(
  "auth/checkAuthStatus",
  async (_, thunkAPI) => {
    try {
      const me = await getMe();
      return me;
    } catch (err: any) {
      if (err?.response?.status === 401) {
        return thunkAPI.rejectWithValue("Not authenticated");
      }
      throw err;
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (
    { email, password }: { email: string; password: string },
    thunkAPI
  ) => {
    try {
      await loginRequest(email, password);
      const me = await getMe();
      return me;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err?.message ?? "Login failed");
    }
  }
);

export const logoutUser = createAsyncThunk("auth/logout", async () => {
  await logoutRequest();
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoggedIn(state, action) {
      state.isLoggedin = action.payload;
    },
    logout(state) {
      state.isLoggedin = false;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // login
      .addCase(login.pending, (state) => {
        state.isLoggingin = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoggingin = false;
        state.user = action.payload;
        state.isLoggedin = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoggingin = false;
        state.error = (action.payload as string) ?? "Login failed";
      })
      // checkAuthStatus
      .addCase(checkAuthStatus.pending, (state) => {
        state.isInitializing = true;
      })
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedin = true;
        state.isInitializing = false;
      })
      .addCase(checkAuthStatus.rejected, (state) => {
        state.user = null;
        state.isLoggedin = false;
        state.isInitializing = false;
      })
      // logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isLoggedin = false;
      });
  },
});

export const { logout, setLoggedIn } = authSlice.actions;
export default authSlice.reducer;
