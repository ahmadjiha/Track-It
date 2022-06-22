import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../lib/ApiClient";

import { fetchBoard } from "../boards/boards";

const initialState = [];

export const createList = createAsyncThunk(
  "lists/createList",
  async (args) => {
    const { newList, callback } = args;
    const data = await apiClient.createList(newList.boardId, newList);

    if (callback) {
      callback();
    }

    return data;
  }
);

export const editListTitle = createAsyncThunk(
  "lists/editListTitle",
  async (args) => {
    const { updatedList, callback } = args;
    const data = await apiClient.editListTitle(updatedList._id, updatedList);

    if (callback) {
      callback();
    }

    console.log(data);
    return data;
  }
);

const listSlice = createSlice({
  name: "lists",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBoard.fulfilled, (state, action) => {
      const lists = action.payload.lists;

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
    }),
    builder.addCase(createList.fulfilled, (state, action) => {
      if (!action.payload) {
        return state
      }

      return state.concat(action.payload);
    }),
    builder.addCase(editListTitle.fulfilled, (state, action) => {
      return state.map(list => {
        if (list._id === action.payload._id) {
          return action.payload;
        }

        return list;
      })
    })
  },

});

export default listSlice.reducer;
