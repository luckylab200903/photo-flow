import React from "react";
import Conversation from "@/components/chat/Conversation";
import Navbar from "@/components/Navbar";
import { Socket } from "socket.io-client";
import Leftpart from "./Leftpart";
import Rightpart from "./Rightpart";

const Chat = () => {
  return (
<<<<<<< HEAD
    <div className=" h-screen overflow-hidden">
      <div className="flex h-full">
        <div className="md:ml-20 pt-5 px-5 hidden sm:block w-[35%] overflow-y-auto mb-2">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl"></h1>
          <div className="relative h-full">
            <Leftpart />
          </div>
        </div>

        <div className="h-full w-full sm:w-[65%] mt-4 mr-5 overflow-hidden">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl"></h1>
          <div className="relative  h-full mb-5">
            <Rightpart />
          </div>
        </div>
      </div>
      <Navbar />
=======
    <div className="md:pl-20">
      <Navbar />
      <div className="flex bg-white dark:bg-gray-900">
        <div className="w-screen md:w-80 h-screen dark:bg-gray-800 bg-gray-100 p-2">
          <div className="h-full overflow-y-auto">
            <div className="text-xl text-gray-600 dark:text-gray-200 p-3">
              Messages
            </div>
            <div className="search-chat flex mx-3 mt-6 mb-3 rounded-md bg-overlay">
              <input
                className="input text-surface text-sm p-3 focus:outline-none bg-overlay dark:bg-gray-700  w-full rounded-l-md placeholder:text-surface"
                type="text"
                placeholder="Search Messages"
              />
              <div className="bg-gray-200 dark:bg-gray-700 flex justify-center items-center pr-3 text-gray-400 rounded-r-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-5 stroke-surface"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
            <Conversation />
          </div>
        </div>
        <div className="flex-grow hidden md:block h-screen p-2 rounded-md">
          <BlankMessageArea />
        </div>
      </div>
>>>>>>> 278b3ccb23889b875d0d04345899166a7829bb7e
    </div>
  );
};

<<<<<<< HEAD
export default ChatPage;
=======
export default Chat;

const BlankMessageArea = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="text-4xl text-gray-400 dark:text-gray-300">
        No messages
      </div>
      <div className="text-gray-500 dark:text-gray-400">
        Start a conversation
      </div>
    </div>
  );
};
>>>>>>> 278b3ccb23889b875d0d04345899166a7829bb7e
