import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axiosInstance from "../../utils/axios_instance";
import { User } from "../../interfaces/user";
import { collaboratorSlice } from "../../interfaces/user";

export const fetchAllUsers = createAsyncThunk("fetchAllUsers", async () => {
  const response = await axiosInstance.get(`/users`);
  return response.data;
});

export const revokeUser = createAsyncThunk("revokeUser", async (user: User) => {
  const response = await axiosInstance.patch(`/users/${user?.id}`, {
    isActiveCollaborate: !user?.isActiveCollaborate,
  });
  return response.data;
});

export const getUser = createAsyncThunk("getUser", async (userId: number) => {
  const response = await axiosInstance.get(`/users/${userId}`);
  return response.data;
});

const initialState: collaboratorSlice = {
  usersData: [],
  isLoading: true,
  userData: undefined,
};

const collaboratorsSlice = createSlice({
  name: "collaboratorsSlice",
  initialState,
  reducers: {},

  extraReducers: (build) => {
    build
      .addCase(fetchAllUsers.pending, (state) => {
        state.isLoading = true;
        state.usersData = [];
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.usersData = action.payload;
      })
      .addCase(fetchAllUsers.rejected, (state) => {
        state.isLoading = false;
        state.usersData = [];
      });
    build
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
        state.userData = undefined;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userData = action.payload;
      })
      .addCase(getUser.rejected, (state) => {
        state.isLoading = false;
        state.userData = undefined;
      });
  },
});

export default collaboratorsSlice.reducer;
