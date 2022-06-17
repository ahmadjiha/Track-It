import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../lib/ApiClient";

const initialState = [];

export const fetchBoards = createAsyncThunk("boards/fetchBoards", async () => {
  const data = await apiClient.getBoards();
  return data;
});

export const fetchBoard = createAsyncThunk("boards/fetchBoard", async (id) => {
  const data = await apiClient.getBoard(id);
  return data;
});

export const createBoard = createAsyncThunk(
  "boards/createBoard",
  async (newBoard, callback) => {
    const data = await apiClient.createBoard(newBoard);
    if (callback) {
      callback;
    }
    return data;
  }
);

const boardSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBoards.fulfilled, (state, action) => {
      return action.payload;
    }),
    builder.addCase(createBoard.fulfilled, (state, action) => {
      state.push(action.payload);
    }),
    builder.addCase(fetchBoard.fulfilled, (state, action) => {
      // eslint-disable-next-line
      const {lists, ...fetchedBoard} = action.payload[0];

      if (state.some(board => board._id === fetchedBoard._id)) {
        return state.map(board => {
          if (board._id === fetchedBoard._id) {
            return fetchedBoard;
          }

          return board;
        })
      } else {
        return state.concat(fetchedBoard);
      }
    })

  },
});

export default boardSlice.reducer;
