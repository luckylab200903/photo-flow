import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { Icons } from "../ui/icons";
import { Separator } from "../ui/separator";

const posts = [
  {
    userImg: "https://github.com/shadcn.png",
    userName: "Jhon Doe",
    postedOn: "2h",
    postCaption:
      "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.",
    images: [
      "/img/sample/a.jpg",
      "/img/sample/d.jpg",
      "/img/sample/b.jpg",
      "/img/sample/c.jpg",
    ],
  },
  {
    userImg: "https://github.com/shadcn.png",
    userName: "Jhon Doe",
    postedOn: "2h",
    postCaption:
      "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.",
    images: [
      "/img/sample/a.jpg",
      "/img/sample/b.jpg",
      "/img/sample/c.jpg",
      "/img/sample/d.jpg",
    ],
  },
  {
    userImg: "https://github.com/shadcn.png",
    userName: "Jhon Doe",
    postedOn: "2h",
    postCaption:
      "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.",
    images: [
      "/img/sample/a.jpg",
      "/img/sample/b.jpg",
      "/img/sample/c.jpg",
      "/img/sample/d.jpg",
    ],
  },
  {
    userImg: "https://github.com/shadcn.png",
    userName: "Jhon Doe",
    postedOn: "2h",
    postCaption:
      "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.",
    images: [
      "/img/sample/a.jpg",
      "/img/sample/b.jpg",
      "/img/sample/c.jpg",
      "/img/sample/d.jpg",
    ],
  },
  {
    userImg: "https://github.com/shadcn.png",
    userName: "Jhon Doe",
    postedOn: "2h",
    postCaption:
      "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.",
    images: [
      "/img/sample/a.jpg",
      "/img/sample/b.jpg",
      "/img/sample/c.jpg",
      "/img/sample/d.jpg",
    ],
  },
];

const AllPost = ({ className }: { className: string }) => {
  return (
    <div className={cn(className, "py-4 flex flex-col gap-5")}>
      {posts.map((post, i) => (
        <Post key={i} post={post} />
      ))}
    </div>
  );
};

const Post = ({ post }: { post: (typeof posts)[0] }) => {
  return (
    <div className="w-full bg-light rounded-lg pb-3 px-2 md:p-5">
      <div className="md:px-6 pt-4 relative">
        <Carousel>
          <CarouselContent>
            {post.images.map((img, i) => (
              <CarouselItem key={i}>
                <Image
                  src={img}
                  alt="post"
                  width={960}
                  height={540}
                  className="w-full rounded-xl aspect-video object-cover"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <Icons.tag className="w-10 p-2 fill-none stroke-light absolute bottom-2 right-2" />
          <CarouselPrevious className="translate-x-12 md:translate-x-3" />
          <CarouselNext className="-translate-x-12 md:-translate-x-3" />
        </Carousel>
      </div>
      <p className="py-2 text-slate-700 md:px-6 leading-5">
        {post.postCaption}
      </p>
      <Separator className="bg-gray md:w-[90%] mx-auto my-3 md:h-[2px]" />
      <div className="flex justify-between md:px-5">
        <div className="flex items-center gap-2 md:gap-4">
          <Avatar className="border-2 border-gray w-10 h-10 md:w-12 md:h-12">
            <AvatarImage src={post.userImg} alt={post.userName} />
            <AvatarFallback>{post.userName[0]}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-bold text-sm">{post.userName}</p>
            <p className="text-gray-400 text-sm">{post.postedOn}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 justify-between">
          <h4 className="scroll-m-20 text-sm md:text-xl tracking-tight">
            3.5k
          </h4>
          <Icons.chat className="md:w-9 w-7 p-1 fill-none" />
          <h4 className="scroll-m-20 text-sm md:text-xl tracking-tight">
            19.8k
          </h4>
          <Icons.heart className="md:w-9 w-7 p-1" />
        </div>
      </div>
    </div>
  );
};
export default AllPost;
