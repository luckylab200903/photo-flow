import React, { useEffect, useState } from "react";
import ConversationItem from "./ConversationItem";
import { usePathname } from "next/navigation";
import { getTimeFormat, makeAuthenticatedGETRequest } from "@/lib/utils";
import { useAppSelector } from "@/lib/hooks";

const Conversation = () => {
  const [chati, setChati] = useState([]);
  const pathname = usePathname();
  const userData = useAppSelector((state) => state.user.data);

  const fetchChats = async () => {
    try {
      const chatsData = await makeAuthenticatedGETRequest("/getchat");
      setChati(chatsData);
    } catch (error) {
      console.error("Error fetching chats:", error);
    }
  };

  useEffect(() => {
    fetchChats();
  }, []);

  return (
    <div className="p-1">
      {chati.map((chat) => {
        const otherUser = chat.users.find(user => user._id !== userData._id);
        const name = otherUser ? otherUser.username : "Unknown";
        return (
          <ConversationItem
            key={chat._id}
            _id={chat._id}
            message={chat.latestMessage?.content}
            time={getTimeFormat(chat?.latestMessage?.createdAt)}
            name={name}
            image={otherUser?.profilepicture}
          />
        );
      })}
    </div>
  );
};

export default Conversation;
