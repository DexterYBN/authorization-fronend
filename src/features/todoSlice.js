import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: [],
  error: null,
};

export const fetchTodos = createAsyncThunk(
  "get/todos/fetch",
  async (_, thunkAPI) => {
    try {
      const res = await fetch("http://localhost:3030/todos", {
        headers: {
          Authorization: `Bearer ${thunkAPI.getState().application.token}`,
        },
      });

      const todos = await res.json();

      if (todos.error) {
        return thunkAPI.rejectWithValue(todos.error);
      }
      return thunkAPI.fulfillWithValue(todos);
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const addTodo = createAsyncThunk(
  "post/addtodo/fetch",
  async (data, thunkAPI) => {
    try {
      const res = await fetch("http://localhost:3030/todos", {
        method: "POST",
        body: JSON.stringify({ text: data.text }),
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${thunkAPI.getState().application.token}`,
        },
      });

      const todos = await res.json();

      if (todos.error) {
        return thunkAPI.rejectWithValue(todos.error);
      }
      return thunkAPI.fulfillWithValue(todos);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const removeTodo = createAsyncThunk(
  "delete/deleteTodo/fetch",
  async (data, thunkAPI) => {
    try {
      const res = await fetch(`http://localhost:3030/todos/${data.id}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${thunkAPI.getState().application.token}`,
        },
      });

      const todos = await res.json();

      if (todos.error) {
        return thunkAPI.rejectWithValue(todos.error);
      }
      return thunkAPI.fulfillWithValue(todos);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.rejected, (state, action) => {
        state.error = action.payload;
        state.userId = action.payload;
      })
      .addCase(fetchTodos.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.error = null;
        state.todos = action.payload;
      })
      .addCase(addTodo.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(addTodo.pending, (state) => {
        state.error = null;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.error = null;
        state.todos.push(action.payload);
      })
      .addCase(removeTodo.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(removeTodo.pending, (state) => {
        state.error = null;
      })
      .addCase(removeTodo.fulfilled, (state, action) => {
        state.error = null;
        state.todos = state.todos.filter((todo) => {
          return todo._id !== action.payload._id;
        });
      });
  },
});

export default todosSlice.reducer;
