"use client";

import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import PostCarousel from "@/components/user/PostCarousel";
import { useAppSelector } from "@/lib/hooks";
import Image from "next/image";

const UserPage = () => {
  const userData = useAppSelector((state) => state.user.data);
  const picSrc = userData.profilepicture;

  return (
    <div className="md:pl-28 pt-10 pb-20 md:pb-0 md:flex">
      <Navbar />
      <div className="md:w-[30vw] md:h-screen md:fixed md:flex flex-col justify-center items-center">
        <div className="relative h-64 w-40">
          <Image
            src={!picSrc || picSrc === "" ? "/img/no_profile.jpg" : picSrc}
            className="object-cover absolute h-full w-full rounded-full shadow-lg"
            width={500}
            height={500}
            alt="Auth Background"
          />
          <Button
            variant="ghost"
            className="aspect-square rounded-full p-0 absolute bottom-1 h-auto w-auto right-1 bg-surface"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="w-9 h-9 fill-overlay"
            >
              <path
                fillRule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z"
                clipRule="evenodd"
              />
            </svg>
          </Button>
        </div>
        <h1 className="scroll-m-20 text-4xl mt-3 font-extrabold text-center tracking-tight lg:text-5xl">
          {userData.fistname} {userData.lastname}
        </h1>
        <h3 className="scroll-m-20 text-xl text-center mb-5 text-surface font-semibold tracking-tight">
          {userData.username}
        </h3>
        <div className="flex justify-center h-5 items-center space-x-4 text-sm">
          <div className="flex items-center flex-col">
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
              102
            </h3>
            <small className="text-sm font-medium leading-none">Posts</small>
          </div>
          <Separator orientation="vertical" className="bg-dark h-8" />
          <div className="flex items-center flex-col">
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
              54,000
            </h3>
            <small className="text-sm font-medium leading-none">
              Followers
            </small>
          </div>
          <Separator orientation="vertical" className="bg-dark h-8" />
          <div className="flex items-center flex-col">
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
              1,002
            </h3>
            <small className="text-sm font-medium leading-none">
              Following
            </small>
          </div>
        </div>
      </div>
      <div className="md:w-[30vw] "></div>
      <PostCarousel />
    </div>
  );
};
export default UserPage;
