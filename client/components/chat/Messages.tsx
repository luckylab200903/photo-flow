import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { FetchMessages } from "@/lib/actions/chatActions";
import { usePathname } from "next/navigation";
import { io } from "socket.io-client";
import MessageInput from "./MessageInput";
import MessageHeader from "./MessageHeader";
const endpoint = "http://localhost:5001";
var socket;

const Messages = ({ }) => {
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const msgId = pathname.split("/")[2];
  const messages = useAppSelector((state) => state.messages.data);
  const userId = useAppSelector((state) => state.user.data?._id);
  const userData = useAppSelector((state) => state.user.data);
  const messageContainer = useRef<HTMLDivElement>(null);

  const [socketconnected, setsocketconnected] = useState(false);
  useEffect(() => {
    socket = io(endpoint);
    socket.emit("setup", userData);
    socket.on("connection", () => {
      setsocketconnected(true);
    });
    // socket.on("connect", () => {
    //   socket.emit("joinRoom", msgId);
    //   setSocketConnected(true);
    // })
  }, []);
  useEffect(() => {
    dispatch(FetchMessages(msgId));
    socket = io(endpoint);
    socket.on("connect", () => {
      socket.emit("join chat", msgId);
      setsocketconnected(true);
    });
  }, [dispatch, msgId]);

  useEffect(() => {
    const domNode = messageContainer.current;
    if (domNode) {
      domNode.scrollTop = domNode.scrollHeight;
    }
  });

  // useEffect(() => {
  //   socket.on("message recieved", (newMessageRecieved) => {
  //     if (msgId !== newMessageRecieved.chat._id) {

  //     }
  //     else{

  //     }
  //   });
  // });

  return (
    <div className="flex-grow flex flex-col relative w-full h-screen overflow-hidden">
      <MessageHeader />
      <div
        className="flex-grow w-full bg-light p-2 overflow-scroll mb-24"
        ref={messageContainer}
      >
        {messages.map((message, index) => {
          if (message.sender._id === userId) {
            return (
              <div key={index} className="flex justify-end p-2 relative">
                {message.temp == true && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    className="w-6 h-6 stroke-surface bg-light rounded-full border border-light absolute -bottom-1 -right-1"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                )}
                <div className="bg-surface text-light p-2 rounded-md rounded-tr-none">
                  {message.content}
                </div>
              </div>
            );
          } else {
            return (
              <div key={index} className="flex p-2">
                <div className="bg-overlay text-surface p-2 rounded-md rounded-tl-none">
                  {message.content}
                </div>
              </div>
            );
          }
        })}
      </div>
      <MessageInput msgId={msgId} userId={userId} />
    </div>
  );
};

export default Messages;
