import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  error: null,
  signingUp: false,
  signingIn: false,
  token: localStorage.getItem("token"),
  id: localStorage.getItem("id"),
};

export const authSignUp = createAsyncThunk(
  "auth/signUp",
  async ({ login, password }, thunkAPI) => {
    try {
      const res = await fetch("http://localhost:3030/auth", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ login, password }),
      });

      const token = await res.json();

      if (token.error) {
        return thunkAPI.rejectWithValue(token.error);
      }

      return token;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const authSignIn = createAsyncThunk(
  "login/signIn",
  async ({ login, password }, thunkAPI) => {
    try {
      const res = await fetch("http://localhost:3030/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ login, password }),
      });

      const { token, id } = await res.json();
      if (token.error) {
        return thunkAPI.rejectWithValue(token.error);
      }
      // console.log("action");
      localStorage.setItem("token", token);
      localStorage.setItem("id", id);

      return token;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const applicationSlice = createSlice({
  name: "application",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(authSignUp.rejected, (state, action) => {
        state.signingUp = false;
        state.error = action.payload;
      })
      .addCase(authSignUp.pending, (state) => {
        state.signingUp = true;
        state.error = null;
      })
      .addCase(authSignUp.fulfilled, (state, action) => {
        state.signingUp = false;
        state.error = null;
      })
      .addCase(authSignIn.rejected, (state, action) => {
        state.signingIn = false;
        state.error = action.payload;
      })
      .addCase(authSignIn.pending, (state) => {
        state.signingIn = true;
        state.error = null;
      })
      .addCase(authSignIn.fulfilled, (state, action) => {
        state.signingIn = false;
        state.error = null;
        state.token = action.payload;
      });
  },
});

export default applicationSlice.reducer;
