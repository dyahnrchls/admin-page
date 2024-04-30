import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../index";
import { User, userListState } from "../../types/users";

export const fetchUserLists = createAsyncThunk("users/fetchUserLists", () => {
  const res = fetch("https://jsonplaceholder.typicode.com/users").then((data) =>
    data.json()
  );
  return res;
});

const userListSlice = createSlice({
  name: "userList",
  initialState: userListState,
  extraReducers: (builder) => {
    builder.addCase(fetchUserLists.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchUserLists.fulfilled,
      (
        state,
        action: PayloadAction<Array<User>>
      ) => {
        state.loading = false;
        state.list = action.payload;
      }
    );
    builder.addCase(fetchUserLists.rejected, (state, action) => {
      state.loading = false;
      state.list = [];
      state.error = action.error.message;
    });
  },
  reducers: {},
});

export const userListSelector = (state: RootState) => state.listReducer;
export default userListSlice.reducer;
