import { Button } from "../ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Icons } from "../ui/icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const data = [
  {
    userImg: "https://github.com/shadcn.png",
    userName: "Jhon Doe",
    title: "Doctor",
  },
  {
    userImg: "https://github.com/shadcn.png",
    userName: "Jhon Doe",
    title: "Doctor",
  },
  {
    userImg: "https://github.com/shadcn.png",
    userName: "Jhon Doe",
    title: "Doctor",
  },
  {
    userImg: "https://github.com/shadcn.png",
    userName: "Jhon Doe",
    title: "Doctor",
  },
  {
    userImg: "https://github.com/shadcn.png",
    userName: "Jhon Doe",
    title: "Doctor",
  },
  {
    userImg: "https://github.com/shadcn.png",
    userName: "Jhon Doe",
    title: "Doctor",
  },
  {
    userImg: "https://github.com/shadcn.png",
    userName: "Jhon Doe",
    title: "Doctor",
  },
  {
    userImg: "https://github.com/shadcn.png",
    userName: "Jhon Doe",
    title: "Doctor",
  },
  {
    userImg: "https://github.com/shadcn.png",
    userName: "Jhon Doe",
    title: "Doctor",
  },
  {
    userImg: "https://github.com/shadcn.png",
    userName: "Jhon Doe",
    title: "Doctor",
  },
  {
    userImg: "https://github.com/shadcn.png",
    userName: "Jhon Doe",
    title: "Doctor",
  },
];

const Connections = () => {
  return (
    <div className="max-h-screen">
      <div className="flex justify-between items-center">
        <p className="font-bold text-lg">Connections</p>
        <Button variant="ghost">
          <p className="whitespace-nowrap">See More</p>
          <Icons.chevronDoubleRight className="w-5 ml-3 fill-none" />
        </Button>
      </div>
      {data.map((item, index) => (
        <UserCard {...item} key={index} />
      ))}
    </div>
  );
};
const UserCard = (props: (typeof data)[0]) => {
  return (
    <Card className="flex items-center px-5 mt-5 border-none bg-gray">
      <Avatar className="border-2 border-gray w-16 h-16">
        <AvatarImage src={props.userImg} alt={props.userName} />
        <AvatarFallback>{props.userName[0]}</AvatarFallback>
      </Avatar>
      <div>
      <CardHeader className="pb-2">
        <CardTitle>{props.userName}</CardTitle>
        <CardDescription>{props.title}</CardDescription>
      </CardHeader>
      <CardFooter>
        <Button 
        className="h-7"
        variant="outline">
          <Icons.add className="w-5" />
          Follow
        </Button>
      </CardFooter>
      </div>
    </Card>
  );
};
export default Connections;
