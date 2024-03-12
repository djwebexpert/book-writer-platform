import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axiosInstance from "../../utils/axios_instance";
import { ContextSlice } from "../../interfaces/contextSlice";
import { Role } from "../../constants";

const initialState: ContextSlice = {
  isLoading: true,
  addBookDialogVisible: false,
  updateBookDialogVisible: false,
  previewDialogVisible: false,
  selectedBook: null,
  books: null,
  loginDetails: {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    role: Role.AUTHOR,
    id: 0,
  },
  tableOfContent: [],
  subChapterInput: {
    chapterName: "",
    pageNumber: 0,
  },
};

export const fetchAllBookData = createAsyncThunk(
  "fetchAllBookData",
  async () => {
    const response = await axiosInstance.get(`/books`);
    return response.data;
  }
);

export const fetchBookData = createAsyncThunk(
  "fetchBookData",
  async (id: string) => {
    const response = await axiosInstance.get(`/books/${id}`);
    return response.data;
  }
);

const homeSlice = createSlice({
  name: "homeSlice",
  initialState,
  reducers: {
    setAddBookDialogVisible: (state, action) => {
      state.addBookDialogVisible = action.payload;
    },
    setUpdateBookDialogVisible: (state, action) => {
      state.updateBookDialogVisible = action.payload;
    },
    setSelectedBookData: (state, action) => {
      state.selectedBook = action.payload;
    },
    resetSelectedBookData: (state) => {
      state.selectedBook = null;
    },
    setPreviewDialog: (state, action) => {
      state.previewDialogVisible = action.payload;
    },
    addTableOfContent: (state, action) => {
      state.tableOfContent.push(action.payload);
    },
    setSubChapterInput: (state, action) => {
      state.subChapterInput = { ...state.subChapterInput, ...action.payload };
    },
    setTableOfContentWhole: (state, action) => {
      state.tableOfContent = action.payload;
    },
    resetTableOfContentWhole: (state) => {
      state.tableOfContent = [];
    },
    setLoginDetails: (state, action) => {
      state.loginDetails = action.payload;
    },
  },
  extraReducers: (build) => {
    build
      .addCase(fetchBookData.pending, (state) => {
        state.isLoading = true;
        state.selectedBook = null;
      })
      .addCase(fetchBookData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedBook = action.payload;
        state.tableOfContent = action.payload.tableOfContent ?? [];
      })
      .addCase(fetchBookData.rejected, (state) => {
        state.isLoading = false;
        state.selectedBook = null;
      });
    build
      .addCase(fetchAllBookData.pending, (state) => {
        state.isLoading = true;
        state.books = [];
      })
      .addCase(fetchAllBookData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.books = action.payload;
      })
      .addCase(fetchAllBookData.rejected, (state) => {
        state.isLoading = false;
        state.books = [];
      });
  },
});

export const {
  setAddBookDialogVisible,
  setUpdateBookDialogVisible,
  resetSelectedBookData,
  setPreviewDialog,
  setSelectedBookData,
  setLoginDetails,
  addTableOfContent,
  setSubChapterInput,
  setTableOfContentWhole,
  resetTableOfContentWhole,
} = homeSlice.actions;

export default homeSlice.reducer;
