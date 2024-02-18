/* Core */
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState: userSliceState = {
  loading: false,
  isAuth: false,
  error: null,
  data: null,
};

export const userSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    loadReq: (state) => {
      loading: true;
    },
    loadSuccess: (state, action: PayloadAction<object>) => {
      loading: false;
      data: action.payload;
    },
    loadFail: (state, action: PayloadAction<string>) => {
      loading: false;
      error: action.payload;
    },
  },
});

/* Types */
export interface userSliceState {
  loading: boolean;
  isAuth: boolean;
  error: null | string;
  data: null | object;
}
