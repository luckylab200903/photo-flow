"use client";
import CarouselView from "@/components/stories/CarouselView";
import List from "@/components/stories/List";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import { makeAuthenticatedGETRequest } from "@/lib/utils";

const Page = () => {
  // const [stories, setStories] = useState([
  //   {
  //     userImg: "/img/profiles/aether.jpg",
  //     userName: "aether",
  //     images: [
  //       "/img/no_profile.jpg",
  //       "/img/stories/1.jpg",
  //       "/img/stories/2.jpg",
  //       "/img/stories/3.jpg",
  //       "/img/stories/4.jpg",
  //       "/img/stories/5.jpg",
  //       "/img/stories/6.jpg",
  //     ],
  //     seen: false,
  //   },
  //   {
  //     userImg: "/img/profiles/lumine.png",
  //     userName: "lumine",
  //     images: [
  //       "/img/stories/2.jpg",
  //       "/img/stories/1.jpg",
  //       "/img/stories/3.jpg",
  //       "/img/stories/4.jpg",
  //       "/img/stories/5.jpg",
  //       "/img/stories/6.jpg",
  //     ],
  //     seen: false,
  //   },
  //   {
  //     userImg: "/img/profiles/xingqui.webp",
  //     userName: "xingqui",
  //     images: [
  //       "/img/stories/3.jpg",
  //       "/img/stories/1.jpg",
  //       "/img/stories/2.jpg",
  //       "/img/stories/4.jpg",
  //       "/img/stories/5.jpg",
  //       "/img/stories/6.jpg",
  //     ],
  //     seen: false,
  //   },
  //   {
  //     userImg: "/img/profiles/razor.avif",
  //     userName: "razor",
  //     images: [
  //       "/img/stories/4.jpg",
  //       "/img/stories/1.jpg",
  //       "/img/stories/2.jpg",
  //       "/img/stories/3.jpg",
  //       "/img/stories/5.jpg",
  //       "/img/stories/6.jpg",
  //     ],
  //     seen: false,
  //   },
  //   {
  //     userImg: "/img/profiles/yaoyao.webp",
  //     userName: "yaoyao",
  //     images: [
  //       "/img/stories/5.jpg",
  //       "/img/stories/1.jpg",
  //       "/img/stories/2.jpg",
  //       "/img/stories/3.jpg",
  //       "/img/stories/4.jpg",
  //       "/img/stories/6.jpg",
  //     ],
  //     seen: false,
  //   },
  //   {
  //     userImg: "/img/profiles/collie.webp",
  //     userName: "collie",
  //     images: [
  //       "/img/stories/6.jpg",
  //       "/img/stories/1.jpg",
  //       "/img/stories/2.jpg",
  //       "/img/stories/3.jpg",
  //       "/img/stories/4.jpg",
  //       "/img/stories/5.jpg",
  //     ],
  //     seen: false,
  //   },
  // ]);
  const [stories,setStories]=useState([])
  const fetchstories = async () => {
    try {
      const response = await makeAuthenticatedGETRequest("/getallstories");
      console.log(response);
      setStories(response);
    } catch (err) {
      console.log("error in fetching stories", error.message);
    }
  };
  const pathname = usePathname();
  const [currentStory, setCurrentStory] = useState(0);
  const userName = pathname.split("/")[2];
  useEffect(() => {
    const index = stories.findIndex((story) => story.user.userName === userName);
    if (index !== -1) {
      setCurrentStory(index);
    } else {
      toast("User's story not found");
    }
  }, [pathname]);
  return (
    <div className="h-screen">
      <div className="absolute z-10 md:relative">
        <List stories={stories} currentStory={currentStory} />
      </div>
      <CarouselView
        stories={stories}
        currentStory={currentStory}
        setStories={setStories}
      />
      <Link
        href="/"
        className="fixed bottom-4 right-4 z-10 border-2 border-surface flex justify-center items-center h-12 w-12 rounded-full bg-overlay shadow-lg"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="w-6 h-6 fill-surface"
        >
          <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
          <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
        </svg>
      </Link>
    </div>
  );
};
export default Page;
