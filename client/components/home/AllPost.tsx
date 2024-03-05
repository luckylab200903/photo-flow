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

const posts = [
  {
    userImg: "https://github.com/shadcn.png",
    userName: "Jhon Doe",
    postedOn: "2h",
    postCaption:
      "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.",
    images: [
      "/img/sample/d.jpg",
      "/img/sample/a.jpg",
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
    <div className="w-full bg-light rounded-lg p-5">
      <div className="flex md:px-10 items-center gap-4">
        <Avatar className="border-2 border-gray w-12 h-12">
          <AvatarImage src={post.userImg} alt={post.userName} />
          <AvatarFallback>{post.userName[0]}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-bold">{post.userName}</p>
          <p className="text-gray-400">{post.postedOn}</p>
        </div>
      </div>
      <div className="md:px-12 pt-4">
        <Carousel>
          <CarouselContent>
            {post.images.map((img, i) => (
              <CarouselItem key={i}>
                <Image
                  src={img}
                  alt="post"
                  width={960}
                  height={540}
                  className="w-full aspect-video object-cover"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="translate-x-12 md:transform-none" />
          <CarouselNext className="-translate-x-12 md:transform-none" />
        </Carousel>
      </div>
      <div className="flex justify-between mt-2 md:px-12">
        <div className="flex gap-3">
          <Icons.heart className="w-9 p-1" />
          <Icons.chat className="w-9 p-1 fill-none" />
          <Icons.share className="w-10 p-2 fill-none" />
        </div>
        <Icons.tag className="w-10 p-2 fill-none" />
      </div>
      <p className="py-2 text-slate-700 text-sm md:px-12">{post.postCaption}</p>
    </div>
  );
};
export default AllPost;
