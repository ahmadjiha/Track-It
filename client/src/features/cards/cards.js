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
      return lists.map(list => list.cards);
    })
  }
})

export default cardSlice.reducer;