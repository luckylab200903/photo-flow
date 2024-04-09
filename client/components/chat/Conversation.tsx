import React, { useEffect, useState } from "react";
import ConversationItem from "./ConversationItem";
import { usePathname } from "next/navigation";
import { getTimeFormat, makeAuthenticatedGETRequest } from "@/lib/utils";
import { useAppSelector } from "@/lib/hooks";

const Conversation = () => {
  const [chati, setChati] = useState([]);
  const userData = useAppSelector((state) => state.user.data);
  const conversationData = useAppSelector((state) => state.conversation.data);

  // const fetchChats = async () => {
  //   try {
  //     const chatsData = await makeAuthenticatedGETRequest("/getchat");
  //     setChati(chatsData);
  //   } catch (error) {
  //     console.error("Error fetching chats:", error);
  //   }
  // };

  // useEffect(() => {
  //   fetchChats();
  // }, []);

  return (
    <div className="p-1">
      {conversationData.map((conversation) => {
        return <ConversationItem key={conversation._id} data={conversation} />;
      })}
    </div>
  );
};

export default Conversation;
