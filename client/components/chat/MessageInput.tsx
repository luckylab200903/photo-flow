import { useState } from "react";
import { messagesSlice } from "@/lib/features/chatSlice";
import { makeAuthenticatedPOSTRequest } from "@/lib/utils";
import { useAppDispatch } from "@/lib/hooks";

const { sendReq, sendSuccess, sendFail } = messagesSlice.actions;

const MessageInput = ({ msgId, userId }: { msgId: string; userId: string }) => {
  const dispatch = useAppDispatch();
  const [messageinput, setMessageinput] = useState("");

  const sendMessagePostRequest = async () => {
    try {
      dispatch(
        sendReq({
          _id: "",
          temp: true,
          content: messageinput,
          sender: {
            _id: userId,
          },
        }),
      );
      const response = await makeAuthenticatedPOSTRequest("/sendmessage", {
        chatId: msgId,
        content: messageinput,
      });

      dispatch(sendSuccess(response));

      setMessageinput("");
      // socket.emit("newMessage", response);
    } catch (error) {
      dispatch(sendFail("Error sending message"));
      console.error("Error sending message:", error);
    }
  };
  return (
    <div className="w-full bg-light fixed bottom-16 md:bottom-5">
      <div className="flex items-center">
        <div className="p-2 text-gray-600 dark:text-gray-200 ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <div className="search-chat flex flex-grow p-2">
          <input
            className="input text-gray-700 text-sm p-5 focus:outline-none bg-gray-100 w-full md:w-[70%] rounded-l-md"
            type="text"
            value={messageinput}
            onChange={(e) => {
              setMessageinput(e.target.value);
            }}
            placeholder="Type your message ..."
          />
          <div className="bg-gray-100 dark:bg-gray-800 dark:text-gray-200  flex justify-center items-center pr-3 text-gray-400 rounded-r-md hover:cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              onClick={sendMessagePostRequest}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MessageInput;
