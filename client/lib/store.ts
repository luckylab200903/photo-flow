"use client";
import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./features/userSlice";
import { conversationSlice, messagesSlice } from "./features/chatSlice";
import { currStorySlice, storyThumbnailsSlice } from "./features/storySlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      user: userSlice.reducer,
      conversation: conversationSlice.reducer,
      messages: messagesSlice.reducer,
      storyThumbnail: storyThumbnailsSlice.reducer,
      currStory: currStorySlice.reducer,
    },
  });
};

const store = makeStore();
export default store;
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
