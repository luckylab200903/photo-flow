import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

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

interface Message {
  _id: string;
  temp: boolean;
  content: string;
  sender: {
    _id: string;
  };
}

interface MessagesState {
  loading: boolean;
  error: string | null;
  otherUser: null | string;
  data: Message[];
}

const initialMsgState: MessagesState = {
  loading: false,
  error: null,
  otherUser: null,
  data: [],
};
export const messagesSlice = createSlice({
  name: "messages",
  initialState: initialMsgState,
  reducers: {
    loadReq: (state) => {
      state.loading = true;
    },
    loadSuccess: (state, action: PayloadAction<Message[]>) => {
      state.loading = false;
      state.data = action.payload;
    },
    loadFail: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    sendReq: (state, action: PayloadAction<Message>) => {
      state.loading = true;
      state.data.push(action.payload);
    },
    sendSuccess: (state, action: PayloadAction<Message>) => {
      state.loading = false;
      state.data = state.data.filter((elem) => !elem.temp);
      state.data.push(action.payload);
    },
    sendFail: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.data = state.data.filter((elem) => !elem.temp);
      state.error = action.payload;
    },
  },
});
