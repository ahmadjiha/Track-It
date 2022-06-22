import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../lib/ApiClient";
import { fetchBoard } from "../boards/boards";

const initialState = [];

export const createCard = createAsyncThunk(
  "cards/createCard",
  async (args) => {
    const { listId, card, callback} = args;

    const data = await apiClient.createCard(listId, card);

    if (callback) {
      callback();
    }

    return data;
  }
);

export const fetchCard = createAsyncThunk(
  "cards/fetchCard",
  async (args) => {
    const { id, callback } = args;
    const data = await apiClient.fetchCard(id);

    if (callback) {
      callback();
    }

    return data;
  }
)

const cardSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(fetchBoard.fulfilled, (state, action) => {
      const lists = action.payload.lists;

      if (lists.length === 0) {
        return state
      }
      
      const cardsWithoutList = lists.map(list => {
        // eslint-disable-next-line
        const { cards, ...listWithoutCards} = list;
        return cards;
      }).flat();

      if (cardsWithoutList.length === 0) {
        return state;
      }

      const boardId = cardsWithoutList[0].boardId;

      const newState = state.filter(card => {
        return card.boardId !== boardId;
      });

      return cardsWithoutList.concat(newState);
    })
    builder.addCase(createCard.fulfilled, (state, action) => {
      const card = action.payload;
      return state.concat(card);
    })
    builder.addCase(fetchCard.fulfilled, (state, action) => {
      const fetchedCard = action.payload;

      const newState = state.filter(card => card._id !== fetchedCard._id);
      return newState.concat(fetchedCard);
    })
  }
})

export default cardSlice.reducer;