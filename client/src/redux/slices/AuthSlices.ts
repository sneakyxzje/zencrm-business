import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import LoginRequest from "../../api/Auth";
import axios from "axios";

type AuthState = {
  isLoggedin: boolean;
  isLoggingin: boolean;
  isInitializing: boolean;
  error: string | null;
};

const initialState: AuthState = {
  isLoggedin: false,
  isLoggingin: false,
  isInitializing: true,
  error: null,
};

export const checkAuthStatus = createAsyncThunk(
  "auth/checkAuthStatus",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get("http://localhost:8080/api/auth/info", {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      return res.data;
    } catch (err) {
      const axiosErr = err as import("axios").AxiosError;
      if (axiosErr.response?.status === 401) {
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
      const res = await LoginRequest(email, password);
      return res;
    } catch (err) {
      const error = err as Error;
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.isLoggedin = false;
    },
    setLoggedIn(state, action) {
      state.isLoggedin = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login case
      .addCase(login.pending, (state) => {
        state.isLoggingin = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state) => {
        state.isLoggingin = false;
        state.isLoggedin = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoggingin = false;
        state.error = action.payload as string;
      })
      // Status case
      .addCase(checkAuthStatus.pending, (state) => {
        state.isInitializing = true;
      })
      .addCase(checkAuthStatus.fulfilled, (state) => {
        state.isInitializing = false;
        state.isLoggedin = true;
      })
      .addCase(checkAuthStatus.rejected, (state) => {
        state.isInitializing = false;
        state.isLoggedin = false;
      });
  },
});

export const { logout, setLoggedIn } = authSlice.actions;
export default authSlice.reducer;
