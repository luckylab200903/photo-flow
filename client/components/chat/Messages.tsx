import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

const messages_data = [
  {
    message: "Hello",
    time: "1:00 PM",
    type: "sent",
  },
  {
    message: "Hi",
    time: "1:00 PM",
    type: "received",
  },
  {
    message: "How are you?",
    time: "1:00 PM",
    type: "sent",
  },
  {
    message: "I'm fine",
    time: "1:00 PM",
    type: "received",
  },
  {
    message: "What are you doing?",
    time: "1:00 PM",
    type: "sent",
  },
  {
    message: "I'm working",
    time: "1:00 PM",
    type: "received",
  },
];

const Messages = () => {
  return (
    <div className="flex-grow h-full flex flex-col relative w-full">
      <div className="w-full h-15 p-1">
        <div className="flex p-2 align-middle items-center">
          <Link href="/chat" className="p-2 md:hidden rounded-full mr-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 stroke-dark"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
          </Link>
          <div className="border rounded-full border-white p-1/2">
            <Avatar className="border-2 border-gray w-12 h-12 md:w-10 md:h-10">
              <AvatarImage
                className="object-cover"
                src="/img/no_profile.jpg"
                alt=""
              />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
          <div className="flex-grow p-2">
            <div className="text-md text-gray-50 font-semibold">John Doe</div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-300 rounded-full"></div>
              <div className="text-xs text-gray-50 ml-1">Online</div>
            </div>
          </div>
          <div className="p-2 text-white cursor-pointer hover:bg-purple-500 rounded-full">
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
                d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className="">
        {messages_data.map((message, index) => {
          if (message.type === "sent") {
            return (
              <div key={index} className="flex justify-end p-2">
                <div className="bg-surface text-light p-2 rounded-md rounded-tr-none">
                  {message.message}
                </div>
              </div>
            );
          } else {
            return (
              <div key={index} className="flex p-2">
                <div className="bg-overlay text-surface p-2 rounded-md rounded-tl-none">
                  {message.message}
                </div>
              </div>
            );
          }
        })}
      </div>
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
              placeholder="Type your message ..."
            />
            <div className="bg-gray-100 dark:bg-gray-800 dark:text-gray-200  flex justify-center items-center pr-3 text-gray-400 rounded-r-md">
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
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
