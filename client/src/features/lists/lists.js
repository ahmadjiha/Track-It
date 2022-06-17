import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../lib/ApiClient";

import { fetchBoard } from "../boards/boards";

const initialState = [];

export const createList = createAsyncThunk(
  "lists/createList",
  async (newList, callback) => {
    try {
      const data = await apiClient.createList(newList);
      console.log(data);
      return data;

    } catch (e) {
      console.log(e);
    }

    if (callback) {
      callback;
    }

    console.log("Did we make it here?")
  }
);

const listSlice = createSlice({
  name: "lists",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBoard.fulfilled, (state, action) => {
      const lists = action.payload[0].lists;

      if (lists.length === 0) {
        return state
      }
      
      const listWithoutCards = lists.map(list => {
        // eslint-disable-next-line
        const { cards, ...listWithoutCards} = list;
        return listWithoutCards;
      })

      const boardId = lists[0].boardId;

      const newState = state.filter(list => {
        return list.boardId !== boardId;
      });

      return listWithoutCards.concat(newState);
    })
    builder.addCase(createList.fulfilled, (state, action) => {
      if (!action.payload) {
        return state
      }

      return state.concat(action.payload);
    })
  },

});

export default listSlice.reducer;
