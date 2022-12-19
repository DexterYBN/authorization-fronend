import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  error: null,
};

export const fetchUsers = createAsyncThunk(
  "get/users/fetch",
  async (_, thunkAPI) => {
    try {
      const res = await fetch("http://localhost:3030/users", {
        headers: {
          Authorization: `Bearer ${thunkAPI.getState().application.token}`,
        },
      });

      const users = await res.json();

      if (users.error) {
        return thunkAPI.rejectWithValue(users.error);
      }
      return thunkAPI.fulfillWithValue(users);
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(fetchUsers.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.error = null;
      });
  },
});

export default usersSlice.reducer;
