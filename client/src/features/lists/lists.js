import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../lib/ApiClient";

import { fetchBoard } from "../boards/boards";

const initialState = [];

// export const createList = createAsyncThunk(
//   "lists/createList",
//   async (newList, callback) => {
//     const data = await apiClient.createList(newList);
//     if (callback) {
//       callback;
//     }
//     return data;
//   }
// );

const listSlice = createSlice({
  name: "lists",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBoard.fulfilled, (state, action) => {
      const lists = action.payload[0].lists;
      const listWithoutCards = lists.map(list => {
        // eslint-disable-next-line
        const { cards, ...listWithoutCards} = list;
        return listWithoutCards;
      })
      
      return listWithoutCards;

      // if (state.some(board => board._id === ._id)) {
      //   return state.map(board => {
      //     if (board._id === fetchedBoard._id) {
      //       return fetchedBoard;
      //     }

      //     return board;
      //   })
      // } else {
      //   return state.concat(fetchedBoard);
      // }
    })
  },
});

export default listSlice.reducer;
