"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { getTimeFormat } from "@/lib/utils";

const ConversationItem = ({ data }) => {
  const pathname = usePathname();
  const pathId = pathname.split("/").pop();
  const _id = data._id;
  const image = data.users[1].profilepicture;
  const name = data.users[1].username;
  const time = getTimeFormat(data.createdAt);
  const message = data.latestMessage?.content;
  const _class = pathId === _id ? "bg-gray" : "bg-white";

  return (
    <Link
      href={`/chat/${_id}`}
      className={`flex items-center p-2  cursor-pointer  ${_class} rounded-xl mb-2`}
    >
      <Avatar className="border-2 border-gray w-8 h-8 md:w-10 md:h-10">
        <AvatarImage className="object-cover" src={image} alt="" />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
      <div className="flex-grow p-2">
        <div className="flex justify-between text-md ">
          <div className="text-sm font-semibold text-gray-700 dark:text-gray-200">
            {name}
          </div>
          <div className="text-xs text-gray-400 dark:text-gray-300">{time}</div>
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400  w-40 truncate">
          {message}
        </div>
      </div>
    </Link>
  );
};

export default ConversationItem;
