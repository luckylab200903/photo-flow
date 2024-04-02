import React, { useEffect, useState } from "react";
import ConversationItem from "./ConversationItem";
import { usePathname } from "next/navigation";
import { makeAuthenticatedGETRequest } from "@/lib/utils";

const data = [
  {
    _id: "34v37",
    name: "Rey Jhon",
    time: "just now",
    message: "Hey there! Are you finish creating the chat app?",
    avatar_src: "/img/profiles/lumine.png",
  },
  {
    _id: "34v35",
    name: "Cherry Ann",
    time: "12:00",
    message: "Hello? Are you available tonight?",
    avatar_src: "/img/profiles/aether.jpg",
  },
  {
    _id: "34v34",
    name: "Lalaine",
    time: "yesterday",
    message: "I'm thingking of resigning",
    avatar_src: "/img/profiles/collie.webp",
  },
  {
    _id: "34v33",
    name: "Princess",
    time: "1 day ago",
    message: "I found a job :)",
    avatar_src: "/img/profiles/goiuiata.webp",
  },
  {
    _id: "34v32",
    name: "Charm",
    time: "1 day ago",
    message: "Can you me some chocolates?",
    avatar_src: "/img/profiles/yaoyao.webp",
  },
  {
    _id: "34v31",
    name: "Garen",
    time: "1 day ago",
    message: "I'm the bravest of all kind",
    avatar_src: "/img/profiles/razor.avif",
  },
];

const Conversation = ({ chats }) => {
  // const latestMessageCreatedAt = chat.latestMessage.createdAt;
  // console.log(latestMessageCreatedAt);
  const [chati, setChati] = useState([]);
  const pathname = usePathname();
  console.log(pathname);

  const fetchChats = async () => {
    try {
      const chatsData = await makeAuthenticatedGETRequest("/getchat");
      console.log(chatsData);
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
      {chats && chats?.map((chat, index, key) => (
        <ConversationItem
          _id={chat._id}
          key={chat._id}
          message={chat.latestmessage}
          time={chat?.latestMessage?.createdAt}
          name={chat.users[1].name}
          image={chat.users[1].profilepicture}
        />
      ))}
    </div>
  );
};

export default Conversation;
