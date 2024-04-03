import { AppDispatch } from "@/lib/store";
import { makeAuthenticatedGETRequest } from "@/lib/utils";
import { currStorySlice, storyThumbnailsSlice } from "../features/storySlice";

export const FetchAllStatusThumbnails = () => async (dispatch: AppDispatch) => {
  const { loadReq, loadSuccess, loadFail } = storyThumbnailsSlice.actions;
  try {
    dispatch(loadReq());
    const response = await makeAuthenticatedGETRequest("/getallstories");
    dispatch(loadSuccess(response));
  } catch (error) {
    dispatch(loadFail(error.message));
  }
};

export const FetchCurrStatus = () => async (dispatch: AppDispatch) => {
  const { loadReq, loadSuccess, loadFail } = currStorySlice.actions;
  try {
    dispatch(loadReq());
    //const chatsData = await makeAuthenticatedGETRequest("/getchat");
    dispatch(loadSuccess(chatsData));
  } catch (error) {
    dispatch(loadFail(error.message));
  }
};
