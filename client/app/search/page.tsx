"use client";
import Navbar from "@/components/Navbar";
import SearchBar from "@/components/SearchBar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";

const SettingPage = () => {
  return (
    <div className="flex-col">
      <div className="md:ml-20 pt-5 px-5">
        <div className="flex justify-between">
          <div className="md:w-1/2 lg:w-1/4 md:mt-5 md:ml-10 p-4 rounded-lg w-full md:p-0 md:m-0">
            <SearchBar />
          </div>
          <div className="hidden md:block">
            <Avatar className="mt-[20px] ml-[-100px] h-[100px] w-[100px]">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
      <div className="md:ml-[140px] mt-14 ml-10 overflow-x-auto">
        <div className="flex md:flex-row flex-col">
          <AvatarSet />
        </div>
      </div>

      <Navbar />
      <div>
        <p className="ml-[140px] py-[30px] font-bold text-surface">Explore</p>
      </div>
    </div>
  );
};

const AvatarSet = () => {
  const [avatarData, setAvatarData] = useState([
    {
      src: "https://github.com/shadcn.png",
      name: "Shadcn1",
      description: "This is Shadcn's avatar",
    },
    {
      src: "https://github.com/shadcn.png",
      name: "Shadcn2",
      description: "This is Shadcn's avatar",
    },
    {
      src: "https://github.com/shadcn.png",
      name: "Shadcn3",
      description: "This is Shadcn's avatar",
    },
    {
      src: "https://github.com/shadcn.png",
      name: "Shadcn4",
      description: "This is Shadcn's avatar",
    },
    {
      src: "https://github.com/shadcn.png",
      name: "Shadcn5",
      description: "This is Shadcn's avatar",
    },
    {
      src: "https://github.com/shadcn.png",
      name: "Shadcn6",
      description: "This is Shadcn's avatar",
    },
    {
      src: "https://github.com/shadcn.png",
      name: "Shadcn67",
      description: "This is Shadcn's avatar",
    },
    {
      src: "https://github.com/shadcn.png",
      name: "Shadcn9",
      description: "This is Shadcn's avatar",
    },
    {
      src: "https://github.com/shadcn.png",
      name: "Shadcn20",
      description: "This is Shadcn's avatar",
    },
    {
      src: "https://github.com/shadcn.png",
      name: "Shadcn11",
      description: "This is Shadcn's avatar",
    },
    {
      src: "https://github.com/shadcn.png",
      name: "Shadcn12",
      description: "This is Shadcn's avatar",
    },
    // Add more avatar data as needed
  ]);

  const removeAvatar = (indexToRemove) => {
    setAvatarData((prevAvatarData) =>
      prevAvatarData.filter((_, index) => index !== indexToRemove)
    );
  };

  return (
    <>
      {avatarData.map((data, index) => (
        <div key={index} className="flex items-center mt-4 md:mt-0">
          <Avatar
            className="mr-4 md:mr-8"
            style={{ width: "100px", height: "100px" }}
          >
            <AvatarImage src={data.src} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="md:p-8">
            {data.name.length > 10 ? (
              <p className="font-semibold text-lg">{data.name}</p>
            ) : (
              <p className="font-semibold">{data.name}</p>
            )}
            {data.description.length > 50 ? (
              <p className="text-sm text-gray-500">{data.description}</p>
            ) : (
              <p className="text-sm text-gray-500">{data.description}</p>
            )}
          </div>
          <button
            onClick={() => removeAvatar(index)}
            className="ml-2 text-gray-500 focus:outline-none"
          >
            <span className="text-2xl p-4">×</span>
          </button>
        </div>
      ))}
    </>
  );
};

export default SettingPage;
