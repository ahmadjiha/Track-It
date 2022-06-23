import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../../lib/ApiClient';
import { fetchCard } from '../cards/cards';

const initialState = [];

const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCard.fulfilled, (state, action) => {
      const fetchedCard =  action.payload;

      // eslint-disable-next-line
      const { comments, ...cardWithoutComments } = fetchedCard;

      if (comments.length === 0) {
        return state; 
      }

      const cardId = comments[0].cardId;

      const newState = state.filter(comment => {
        return comment.cardId !== cardId;
      });

      return comments.concat(newState);
    })
  }
})

export default commentSlice.reducer;