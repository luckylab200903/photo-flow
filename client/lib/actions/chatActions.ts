import { AppDispatch } from "@/lib/store";
import { conversationSlice, messagesSlice } from "@/lib/features/chatSlice";
import { makeAuthenticatedGETRequest } from "@/lib/utils";

export const FetchAllConversation = () => async (dispatch: AppDispatch) => {
  const { loadReq, loadSuccess, loadFail } = conversationSlice.actions;
  try {
    dispatch(loadReq());
    const chatsData = await makeAuthenticatedGETRequest("/getchat");
    dispatch(loadSuccess(chatsData));
  } catch (error) {
    dispatch(loadFail(error.message));
  }
};

export const FetchMessages =
  (msgId: string) => async (dispatch: AppDispatch) => {
    const { loadReq, loadSuccess, loadFail } = messagesSlice.actions;
    try {
      dispatch(loadReq());
      const chatsData = await makeAuthenticatedGETRequest(
        `/allmessages/${msgId}`,
      );
      dispatch(loadSuccess(chatsData));
    } catch (error) {
      dispatch(loadFail(error.message));
    }
  };
