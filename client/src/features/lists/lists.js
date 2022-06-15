import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../lib/ApiClient";

const initialState = [];

export const fetchLists = createAsyncThunk("lists/fetchLists", async () => {
  const data = await apiClient.getBoards();
  return data;
});

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
    builder.addCase(fetchLists.fulfilled, (state, action) => {
      return action.payload.reduce((acc, comm) => {
        // eslint-disable-next-line
        const { lists, ...boardWithoutLists } = comm;
        return acc.concat(lists);
      }, []);
    })
  },
});

export default listSlice.reducer;
