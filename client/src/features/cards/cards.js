import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../lib/ApiClient";
import { fetchBoard } from "../boards/boards";

const initialState = [];

const cardSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(fetchBoard.fulfilled, (state, action) => {
      const lists = action.payload[0].lists;

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
  }
})

export default cardSlice.reducer;