import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export const storyThumbnailsSlice = createSlice({
  name: "storyThumbnails",
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

export const currStorySlice = createSlice({
  name: "currStory",
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
