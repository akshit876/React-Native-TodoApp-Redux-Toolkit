import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchApiData = createAsyncThunk('myApi/fetchData', async () => {
  try {
    const response = await axios.get(
      'https://jsonplaceholder.typicode.com/posts',
    );
    console.log({response});
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch data');
  }
});

const myApiSlice = createSlice({
  name: 'myApi',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchApiData.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchApiData.fulfilled, (state, action) => {
        console.log({state});
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchApiData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default myApiSlice.reducer;
