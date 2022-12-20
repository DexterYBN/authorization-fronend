import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Начальный state
const initialState = {
  users: [],
  error: null,
  loading: false,
};

// Санка GET
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

// CreateSlice
const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

    // GET

      .addCase(fetchUsers.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(fetchUsers.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.error = null;
        state.loading = false;
      });
  },
});

export default usersSlice.reducer;
