import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { useAppSelector } from "../hooks";

export const conversationSlice = createSlice({
  name: "conversation",
  initialState: {
    loading: false,
    error: null,
    data: [],
  },
  reducers: {
    loadReq: (state) => {
      state.loading = true;
    },
    loadSuccess: (state, action: PayloadAction<object>) => {
      state.loading = false;
      state.data = action.payload;
    },
    loadFail: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const messagesSlice = createSlice({
  name: "messages",
  initialState: {
    loading: false,
    error: null,
    otherUser: null,
    data: [],
  },
  reducers: {
    loadReq: (state) => {
      state.loading = true;
    },
    loadSuccess: (state, action: PayloadAction<object>) => {
      state.loading = false;
      state.data = action.payload;
    },
    loadFail: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
