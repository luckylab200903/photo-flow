import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Icons } from "@/components/ui/icons";
import { useEffect, useState } from "react";
import Link from "next/Link";
import StoryImageSelector from "./StoryImageSelector";
import {
  makeAuthenticatedGETRequest,
  makeAuthenticatedPOSTRequest,
} from "@/lib/utils";

const Story = () => {
  const [stories, setStories] = useState([]);
  const fetchstories = async () => {
    try {
      const response = await makeAuthenticatedGETRequest("/getallstories");
      console.log(response);
      setStories(response);
    } catch (err) {
      console.log("error in fetching stories", error.message);
    }
  };

  useEffect(() => {
    fetchstories();
    console.log("stories from useeffect", stories);
  }, []);

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
          {stories &&
            stories.map((story, index) => (
              <Link key={story._id} href={`/stories/${story.user.username}`}>
                <div className="flex ml-5 flex-col items-center gap-1">
                  <div className="rounded-full bg-white border-2 border-surface">
                    <Avatar className="border-2 border-gray w-16 h-16">
                      <AvatarImage
                        src={story.user.profilepicture}
                        alt={story.user.username}
                      />
                      <AvatarFallback>{story.user.username}</AvatarFallback>
                    </Avatar>
                  </div>
                  <p className="text-xs font-bold text-center">
                    {story.user.username}
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
