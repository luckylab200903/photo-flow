import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Icons } from "@/components/ui/icons";
import { useState } from "react";
import Link from "next/Link";
import StoryImageSelector from "./StoryImageSelector";

const Story = () => {
  const [stories, setStorie] = useState([
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
  return (
    <div className="w-full py-4">
      <ScrollArea className="whitespace-nowrap">
        <div className="flex">
          <StoryImageSelector>
            <div className="h-auto p-0 rounded-full ml-5 border-2 border-surface">
              <Avatar className="border-2 bg-slate-100 p-4 border-gray w-16 h-16">
                <Icons.add />
              </Avatar>
            </div>
            <p className="text-xs font-bold text-center ml-5">Add Story</p>
          </StoryImageSelector>
          {stories.map((story, index) => (
            <Link key={index} href={`/stories/${story.userName}`}>
              <div className="flex ml-5 flex-col items-center gap-1">
                <div className="rounded-full bg-white border-2 border-surface">
                  <Avatar className="border-2 border-gray w-16 h-16">
                    <AvatarImage src={story.userImg} alt={story.userName} />
                    <AvatarFallback>{story.userName[0]}</AvatarFallback>
                  </Avatar>
                </div>
                <p className="text-xs font-bold text-center">
                  {story.userName}
                </p>
              </div>
            </Link>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};
export default Story;
