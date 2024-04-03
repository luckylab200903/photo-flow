"use client";
import React, { useEffect, useState } from "react";
import Conversation from "@/components/chat/Conversation";
import Messages from "@/components/chat/Messages";
import Navbar from "@/components/Navbar";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { FetchAllConversation } from "@/lib/actions/chatActions";

import { usePathname } from "next/navigation";
const Chat = () => {
  const dispatch = useAppDispatch();
  const pathname = usePathname();

  const conversation = useAppSelector((state) => state.conversation);

  useEffect(() => {
    dispatch(FetchAllConversation());
  }, [dispatch]);

  return (
    <div className="md:pl-20">
      <Navbar />
      <div className="flex bg-white dark:bg-gray-900">
        <div className="w-80 h-screen dark:bg-gray-800 bg-gray-100 p-2 hidden md:block">
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
            <Conversation chats={conversation.data} />
          </div>
        </div>
        <div className="flex-grow  h-screen p-2 rounded-md">
          <Messages />
        </div>
      </div>
    </div>
  );
};

export default Chat;
