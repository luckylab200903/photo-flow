import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Icons } from "@/components/ui/icons";

const Arr = [
  {
    userImg: "https://github.com/shadcn.png",
    userName: "Jhon Doe",
    seen: false,
  },
  {
    userImg: "https://github.com/shadcn.png",
    userName: "Jhon Doe",
    seen: false,
  },
  {
    userImg: "https://github.com/shadcn.png",
    userName: "Jhon Doe",
    seen: false,
  },
  {
    userImg: "https://github.com/shadcn.png",
    userName: "Jhon Doe",
    seen: false,
  },
  {
    userImg: "https://github.com/shadcn.png",
    userName: "Jhon Doe",
    seen: false,
  },
  {
    userImg: "https://github.com/shadcn.png",
    userName: "Jhon Doe",
    seen: false,
  },
  {
    userImg: "https://github.com/shadcn.png",
    userName: "Jhon Doe",
    seen: false,
  },
  {
    userImg: "https://github.com/shadcn.png",
    userName: "Jhon Doe",
    seen: false,
  },
  {
    userImg: "https://github.com/shadcn.png",
    userName: "Jhon Doe",
    seen: false,
  },
];
const Story = ({ className }: { className: string }) => {
  return (
    <div className={cn(className, "w-full py-4")}>
      <ScrollArea className="whitespace-nowrap">
        <div className="flex gap-x-5">
          <div className="flex pl-5 flex-col items-center gap-1">
            <div className="rounded-full border-2 border-surface">
              <Avatar className="border-2 bg-slate-100 p-4 border-gray w-16 h-16">
                <Icons.add className="" />
              </Avatar>
            </div>
            <p className="text-xs font-bold text-center">Add Story</p>
          </div>
          {Arr.map((story, index) => (
            <div key={index} className="flex flex-col items-center gap-1">
              <div className="rounded-full border-2 border-surface">
                <Avatar className="border-2 border-gray w-16 h-16">
                  <AvatarImage src={story.userImg} alt={story.userName} />
                  <AvatarFallback>{story.userName[0]}</AvatarFallback>
                </Avatar>
              </div>
              <p className="text-xs font-bold text-center">{story.userName}</p>
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};
export default Story;
