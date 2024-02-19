"use client";
import AllPost from "@/components/home/AllPost";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/home/Sidebar";
import Story from "@/components/home/Story";
import { counterSlice } from "@/lib/features/countSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import AddPost from "@/components/home/AddPost";
import { ScrollArea } from "@radix-ui/react-scroll-area";

export default function Home() {
  const dispatch = useAppDispatch();
  const { value, status } = useAppSelector((state) => state.counter);

  return (
    <div className="relative rounded-lg md:flex md:justify-between md:pl-24 bg-gray min-h-screen w-screen">
        <div className="w-full h-screen overflow-scroll md:pr-5">
          <Story className="" />
          <AddPost />
          <AllPost className="px-5 w-full" />
        </div>
      <Sidebar />
      <Navbar className="fixed left-0 bottom-0 md:top-0" />
    </div>
  );
}
