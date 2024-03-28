import React from "react";
import ConversationItem from "./ConversationItem";

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

const Conversation = () => {
  return (
    <div className="p-1">
      {data.map((item, index) => (
        <ConversationItem
          _id={item._id}
          message={item.message}
          time={item.time}
          name={item.name}
          image={item.avatar_src}
        />
      ))}
    </div>
  );
};

export default Conversation;
