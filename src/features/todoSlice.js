import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { serverUrl } from '../serverUrl.js';

// Начальный state
const initialState = {
  todos: [],
  error: null,
  loading: null,
};

// Санка GET
export const fetchTodos = createAsyncThunk(
  "get/todos/fetch",
  async (_, thunkAPI) => {
    try {
      const res = await fetch(`${serverUrl}/todos`, {
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

// Санка POST
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

// Санка DELETE
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

// CreateSlice
const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // GET

      .addCase(fetchTodos.rejected, (state, action) => {
        state.error = action.payload;
        state.userId = action.payload;
        state.loading = false;
      })
      .addCase(fetchTodos.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.error = null;
        state.todos = action.payload;
        state.loading = false;
      })

      // POST

      .addCase(addTodo.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(addTodo.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.error = null;
        state.todos.push(action.payload);
        state.loading = false;
      })

      // DELETE

      .addCase(removeTodo.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(removeTodo.pending, (state, action) => {
        state.error = null;
        state.todos = state.todos.map((todo) => {
          if (todo._id === action.meta.arg.id) {
            todo.loading = true;
          }
          return todo;
        });
      })
      .addCase(removeTodo.fulfilled, (state, action) => {
        state.error = null;
        state.todos = state.todos.filter((todo) => {
          return todo._id !== action.payload._id;
        });
        state.loading = false;
      });
  },
});

export default todosSlice.reducer;
