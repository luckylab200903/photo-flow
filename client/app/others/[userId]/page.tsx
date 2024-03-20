"use client";

import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import PostCarousel from "@/components/user/PostCarousel";
import { useAppSelector } from "@/lib/hooks";
import Image from "next/image";
import { usePathname } from "next/navigation";

const UserPage = () => {
  const pathname = usePathname();
  const userData = useAppSelector((state) => state.user.data);
  const picSrc = userData.profilepicture;

  const userId = pathname.split("/")[2];
  console.log("userId", userId);

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
            className="aspect-square rounded-full p-1 absolute top-1 h-auto w-auto left-1 bg-overlay"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-7 h-7 scale-90 fill-surface"
            >
              <path d="M4.913 2.658c2.075-.27 4.19-.408 6.337-.408 2.147 0 4.262.139 6.337.408 1.922.25 3.291 1.861 3.405 3.727a4.403 4.403 0 0 0-1.032-.211 50.89 50.89 0 0 0-8.42 0c-2.358.196-4.04 2.19-4.04 4.434v4.286a4.47 4.47 0 0 0 2.433 3.984L7.28 21.53A.75.75 0 0 1 6 21v-4.03a48.527 48.527 0 0 1-1.087-.128C2.905 16.58 1.5 14.833 1.5 12.862V6.638c0-1.97 1.405-3.718 3.413-3.979Z" />
              <path d="M15.75 7.5c-1.376 0-2.739.057-4.086.169C10.124 7.797 9 9.103 9 10.609v4.285c0 1.507 1.128 2.814 2.67 2.94 1.243.102 2.5.157 3.768.165l2.782 2.781a.75.75 0 0 0 1.28-.53v-2.39l.33-.026c1.542-.125 2.67-1.433 2.67-2.94v-4.286c0-1.505-1.125-2.811-2.664-2.94A49.392 49.392 0 0 0 15.75 7.5Z" />
            </svg>
          </Button>
          <Button
            variant="ghost"
            className="aspect-square rounded-full p-0 absolute bottom-0 h-auto w-auto right-0 bg-surface"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="w-12 h-12 fill-overlay"
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
