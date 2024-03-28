"use client"
import React, { useEffect } from "react";
import io from "socket.io-client";
import Cookies from "js-cookie";
import { redirect } from "next/navigation";
import AllPost from "@/components/home/AllPost";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/home/Sidebar";
import Story from "@/components/home/Story";
import AddPost from "@/components/home/AddPost";
import SearchBar from "@/components/SearchBar";

export default function Home() {
  useEffect(() => {
    const token = Cookies.get("token");
    if (!token || token === "undefined") {
      redirect("/signin");
    }
  }, []);

  // Create Socket.io client instance
  const socket = io("http://localhost:5001");

  return (
    <div className="relative rounded-lg md:flex md:justify-between md:pl-24 bg-gray min-h-screen w-screen">
      <div className="w-full h-screen overflow-scroll md:pr-5">
        <Story />
        <div className="md:hidden px-5">
          <SearchBar />
        </div>
        <AddPost />
        <AllPost className="px-5 w-full" socket={socket} />
      </div>
      <Sidebar />
      <Navbar socket={socket} />
    </div>
  );
}
