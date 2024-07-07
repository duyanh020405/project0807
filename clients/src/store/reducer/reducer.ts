import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { newUser } from "./interface";
import { addNewUser, blockUser, deleteUser, getAllUser } from "../../service/user.service";


const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    filteredUsers: [],
    searchTerm: '',
  },
  reducers: {
    setSearchTerm: (state: any, action) => {
      state.searchTerm = action.payload;
    },
    filterUsers: (state: any) => {
      state.filteredUsers = state.users.filter((user: any) =>
        user.name.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
        user.id.toString().toLowerCase().includes(state.searchTerm.toLowerCase())
      );
    },
    resetSearch: (state: any) => {
      state.searchTerm = '';
      state.filteredUsers = state.users;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addNewUser.pending, (state) => {})
      .addCase(addNewUser.fulfilled, (state: any, action) => {
        state.status = "succeeded";
        state.users.push(action.payload);
      })
      .addCase(addNewUser.rejected, (state, action) => {})
      .addCase(getAllUser.pending, (state) => {})
      .addCase(getAllUser.fulfilled, (state, action) => {
        state.users = action.payload;
        state.filteredUsers = action.payload; // cập nhật filteredUsers khi lấy tất cả người dùng
      })
      .addCase(getAllUser.rejected, (state, action) => {})
      .addCase(blockUser.fulfilled, (state: any, action) => {
        state.users = action.payload;
        state.filteredUsers = action.payload; // cập nhật filteredUsers sau khi chặn người dùng
      })
      .addCase(deleteUser.fulfilled, (state:any, action) => {
        state.users= state.usres.filter((item:any) => item.id !== action.payload);
      });
  },
});

export default userSlice.reducer;
export const { setSearchTerm, filterUsers, resetSearch } = userSlice.actions;
