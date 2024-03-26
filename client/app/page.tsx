"use client";
import AllPost from "@/components/home/AllPost";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/home/Sidebar";
import Story from "@/components/home/Story";
import { counterSlice } from "@/lib/features/countSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import AddPost from "@/components/home/AddPost";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import SearchBar from "@/components/SearchBar";
import { redirect, usePathname } from "next/navigation";
import { useEffect } from "react";

import Cookies from "js-cookie";
export default function Home() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token || token === "undefined") {
      redirect("/signin");
    }
  }, []);
  // const userData = useAppSelector((state) => state.user.data);
  // console.log("userData from home page", userData);
  return (
    <div className="relative rounded-lg md:flex md:justify-between md:pl-24 bg-gray min-h-screen w-screen">
      <div className="w-full h-screen overflow-scroll md:pr-5">
        <Story />
        <div className="md:hidden px-5">
          <SearchBar />
        </div>
        <AddPost />
        <AllPost className="px-5 w-full"/>
      </div>
      <Sidebar />
      <Navbar />
    </div>
  );
}
