"use client";
import CarouselView from "@/components/stories/CarouselView";
import List from "@/components/stories/List";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { toast } from "sonner";

const Page = () => {
  const [stories, setStories] = useState([
    {
      userImg: "/img/profiles/aether.jpg",
      userName: "aether",
      images: [
        "/img/stories/1.jpg",
        "/img/stories/2.jpg",
        "/img/stories/3.jpg",
        "/img/stories/4.jpg",
        "/img/stories/5.jpg",
        "/img/stories/6.jpg",
      ],
      seen: false,
    },
    {
      userImg: "/img/profiles/lumine.png",
      userName: "lumine",
      images: [
        "/img/stories/2.jpg",
        "/img/stories/1.jpg",
        "/img/stories/3.jpg",
        "/img/stories/4.jpg",
        "/img/stories/5.jpg",
        "/img/stories/6.jpg",
      ],
      seen: false,
    },
    {
      userImg: "/img/profiles/xingqui.webp",
      userName: "xingqui",
      images: [
        "/img/stories/3.jpg",
        "/img/stories/1.jpg",
        "/img/stories/2.jpg",
        "/img/stories/4.jpg",
        "/img/stories/5.jpg",
        "/img/stories/6.jpg",
      ],
      seen: false,
    },
    {
      userImg: "/img/profiles/razor.avif",
      userName: "razor",
      images: [
        "/img/stories/4.jpg",
        "/img/stories/1.jpg",
        "/img/stories/2.jpg",
        "/img/stories/3.jpg",
        "/img/stories/5.jpg",
        "/img/stories/6.jpg",
      ],
      seen: false,
    },
    {
      userImg: "/img/profiles/yaoyao.webp",
      userName: "yaoyao",
      images: [
        "/img/stories/5.jpg",
        "/img/stories/1.jpg",
        "/img/stories/2.jpg",
        "/img/stories/3.jpg",
        "/img/stories/4.jpg",
        "/img/stories/6.jpg",
      ],
      seen: false,
    },
    {
      userImg: "/img/profiles/collie.webp",
      userName: "collie",
      images: [
        "/img/stories/6.jpg",
        "/img/stories/1.jpg",
        "/img/stories/2.jpg",
        "/img/stories/3.jpg",
        "/img/stories/4.jpg",
        "/img/stories/5.jpg",
      ],
      seen: false,
    },
  ]);
  const pathname = usePathname();
  const [currentStory, setCurrentStory] = useState(0);
  const userName = pathname.split("/")[2];
  useEffect(() => {
    const index = stories.findIndex((story) => story.userName === userName);
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
    </div>
  );
};
export default Page;
