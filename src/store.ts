import {configureStore} from '@reduxjs/toolkit';
import todosReducer from './features/todos/todosSlice';
import myAPISlice from './features/fakeAPI';

export const store = configureStore({
  reducer: {
    todos: todosReducer,
    myAPI: myAPISlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
