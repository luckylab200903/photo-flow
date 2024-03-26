"use client";

import Navbar from "@/components/Navbar";
import { Separator } from "@/components/ui/separator";
import PostCarousel from "@/components/user/PostCarousel";
import ProfilePic from "@/components/user/ProfilePic";
import { useAppSelector } from "@/lib/hooks";
import { useDispatch } from 'react-redux'; 

const UserPage = () => {
  const userData = useAppSelector((state) => state.user.data);
  console.log("userData", userData);
  const dispatch = useDispatch(); 
  return (
    <div className="md:pl-28 pt-10 pb-20 md:pb-0 md:flex">
      <Navbar />
      <div className="md:w-[30vw] md:h-screen md:fixed md:flex flex-col justify-center items-center">
        <ProfilePic picSrc={userData.profilepicture} />
        <h1 className="scroll-m-20 text-4xl mt-3 font-extrabold text-center tracking-tight lg:text-5xl">
          {userData.firstname} {userData.lastname}
        </h1>
        <h3 className="scroll-m-20 text-xl text-center mb-5 text-surface font-semibold tracking-tight">
          {userData.username}
        </h3>
        <div className="flex justify-center h-5 items-center space-x-4 text-sm">
          <div className="flex items-center flex-col">
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
              {userData.posts && userData.posts.length}
            </h3>
            <small className="text-sm font-medium leading-none">Posts</small>
          </div>
          <Separator orientation="vertical" className="bg-dark h-8" />
          <div className="flex items-center flex-col">
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
              {userData.followers && userData.followers.length}
            </h3>
            <small className="text-sm font-medium leading-none">
              Followers
            </small>
          </div>
          <Separator orientation="vertical" className="bg-dark h-8" />
          <div className="flex items-center flex-col">
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
              {userData.followings && userData.followings.length}
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
