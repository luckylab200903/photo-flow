"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const ConversationItem = ({ _id, image, time, name, message }) => {
  const pathname = usePathname();
  const userId = pathname.split("/").pop();

  const _class = userId === _id ? "bg-gray" : "bg-white";
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
