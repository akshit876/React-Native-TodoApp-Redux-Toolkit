import {createSlice} from '@reduxjs/toolkit';
import {Todo} from '../../interfaces/interface';
import {fetchApiData} from '../fakeAPI';

//* Initial State
/* const initialState: Todo[] = [
  {
    id: '1',
    name: 'Learn React',
    isComplete: false,
  },
  {
    id: '2',
    name: 'Learn Redux',
    isComplete: false,
  },
]; */

//* Todos Slice
export const todosSlice = createSlice({
  name: 'todos',
  initialState: [] as Todo[],
  reducers: {
    //* Add Todo
    addTodo: (state, action) => {
      const newTodo: Todo = {
        id: action.payload.id,
        name: action.payload.name,
        isComplete: false,
      };
      state.push(newTodo);
    },
    //* Delete Todo
    deleteTodo: (state, action) => {
      return state.filter(todo => todo.id !== action.payload);
    },
    //* Toggle Todo
    toggleTodo: (state, action) => {
      const todo = state.find(todo => todo.id === action.payload);
      if (todo) {
        todo.isComplete = !todo.isComplete;
      }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchApiData.pending, state => {})
      .addCase(fetchApiData.fulfilled, (state, action) => {
        console.log({state});
        state.push(
          ...action.payload.map(d => {
            return {
              id: d.id,
              name: d.title,
              isComplete: false,
            };
          }),
        );
      })
      .addCase(fetchApiData.rejected, (state, action) => {
        state = [];
        // state.error = action.error.message;
      });
  },
});

//* Export Actions
export const {addTodo, deleteTodo, toggleTodo} = todosSlice.actions;

//* Export Reducer
export default todosSlice.reducer;
