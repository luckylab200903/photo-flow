/* Core */
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState: userSliceState = {
  loading: false,
  isAuth: false,
  error: null,
  data: {
    _id: "",
    email: "",
    firstname: "",
    lastname: "",
    password: "",
    profilepicture: "",
    username: "",
    posts: [],
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loadReq: (state) => {
      state.loading = true;
    },
    loadSuccess: (state, action: PayloadAction<object>) => {
      state.loading = false;
      state.isAuth = true;
      state.data = action.payload;
    },
    loadFail: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.isAuth = false;
      state.error = action.payload;
    },
    updateUserProfile: (state, action: PayloadAction<string>) => {
      state.data.profilepicture = action.payload;
    },
    updateUserPosts(state, action: PayloadAction<string>) {
      state.data.posts = action.payload;
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
