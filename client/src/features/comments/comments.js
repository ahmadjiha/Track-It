import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../../lib/ApiClient';
import { fetchCard } from '../cards/cards';

const initialState = [];

export const createComment = createAsyncThunk(
  "comments/createComment",
  async (args) => {
    const { cardId, comment, callback} = args;

    const data = await apiClient.createComment(cardId, comment);

    if (callback) {
      callback();
    }

    return data;
  }
);

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
    builder.addCase(createComment.fulfilled, (state, action) => {
      const newComment = action.payload;
      return state.concat(newComment);
    })
  }
})

export default commentSlice.reducer;