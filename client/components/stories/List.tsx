import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Icons } from "@/components/ui/icons";
import Link from "next/Link";

const Story = ({ stories, currentStory }) => {
  return (
    <div className="w-full py-2 drop-shadow-lg">
      <ScrollArea className="whitespace-nowrap w-screen">
        <div className="flex justify-center items-center">
          {stories.map((story, index) => (
            <Link key={index} href={`/stories/${story.userName}`}>
              <div className="flex ml-5 flex-col gap-1">
                <div className="rounded-full border-2 border-surface">
                  <Avatar
                    className={`border-2 border-gray bg-light ${index === currentStory ? "w-16 h-16" : "w-12 h-12"}`}
                  >
                    <AvatarImage src={story.userImg} alt={story.userName} />
                    <AvatarFallback>{story.userName[0]}</AvatarFallback>
                  </Avatar>
                </div>
                {index === currentStory && (
                  <p className="text-xs font-bold text-center text-light mix-blend-color-overlay">
                    {story.userName}
                  </p>
                )}
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
