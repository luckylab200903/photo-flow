import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const data = [
  {
    type: "like",
    title: "You got a like",
    by: "@username",
    time: "2 hours ago",
  },
  {
    type: "comment",
    title: "You got a comment",
    by: "@username",
    time: "2 hours ago",
  },
  {
    type: "follow",
    title: "You got a follow",
    by: "@username",
    time: "2 hours ago",
  },
];

const NotifyPage = () => {
  return (
    <div className="w-screen md:ml-20 pt-5 px-5 md:pr-24">
      <Navbar />
      <div className="mb-3">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Activity Updates
        </h1>
      </div>

      <Sheet>
        <SheetTrigger>
          <Button className="mb-5 rounded-full text-lg">
            Filter
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="ml-2 w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z"
              />
            </svg>
          </Button>
        </SheetTrigger>
        <SheetContent className="bg-light">
          <SheetHeader>
            <SheetTitle>Filters</SheetTitle>
            <SheetDescription>content</SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
      <div className="min-h-[75vh] p-5 w-full flex flex-col gap-5 rounded-2xl bg-overlay">
        {data.map((item, index) => {
          switch (item.type) {
            case "like":
              return (
                <LikeNotify
                  key={index}
                  title={item.title}
                  by={item.by}
                  time={item.time}
                />
              );
            case "comment":
              return (
                <CommentNotify
                  key={index}
                  title={item.title}
                  by={item.by}
                  time={item.time}
                />
              );
            case "follow":
              return (
                <FollowNotify
                  key={index}
                  title={item.title}
                  by={item.by}
                  time={item.time}
                />
              );
            default:
              return null;
          }
        })}
      </div>
    </div>
  );
};

const LikeNotify = ({ title, by, time }) => {
  return (
    <div className="flex items-center justify-between p-5 rounded-lg bg-light">
      <div>
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-sm text-surface">{by} liked your post</p>
      </div>
      <p className="text-sm text-surface">{time}</p>
    </div>
  );
};
const CommentNotify = ({ title, by, time }) => {
  return (
    <div className="flex items-center justify-between p-5 rounded-lg bg-light">
      <div>
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-sm text-surface">{by} commented on your post</p>
      </div>
      <p className="text-sm text-surface">{time}</p>
    </div>
  );
};
const FollowNotify = ({ title, by, time }) => {
  return (
    <div className="flex items-center justify-between p-5 rounded-lg bg-light">
      <div>
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-sm text-surface">{by} followed you</p>
      </div>
      <p className="text-sm text-surface">{time}</p>
    </div>
  );
};

export default NotifyPage;
