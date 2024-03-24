import { makeAuthenticatedGETRequest } from "@/lib/utils";
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
import { useEffect, useState } from "react";


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
  const [connectionsdata,setconnectionsdata]=useState([])
  const fetchconnectionsDetails = async () => {
    try {
      const data = await makeAuthenticatedGETRequest(
        "/getusersuggestions"
      );
      setconnectionsdata(data)
      console.log(connectionsdata);
    } catch (error) {
      console.log("internal server error", error.message);
    }
  };
  
  useEffect(()=>{
    fetchconnectionsDetails()
  },[])
  return (
    <div className="max-h-screen">
      <div className="flex justify-between items-center">
        <p className="font-bold text-lg">Connections</p>
        <Button variant="ghost">
          <p className="whitespace-nowrap">See More</p>
          <Icons.chevronDoubleRight className="w-5 ml-3 fill-none" />
        </Button>
      </div>
      {connectionsdata && connectionsdata.map((item, index) => (
        <UserCard {...item} key={index} />
      ))}
    </div>
  );
};
const UserCard = (props: (typeof data)[0]) => {
  return (
    <Card className="flex items-center px-5 mt-5 border-none bg-gray">
      <Avatar className="border-2 border-gray w-16 h-16">
        <AvatarImage src={props.profilepicture} alt={props.userName} />
        <AvatarFallback>{props.username}</AvatarFallback>
      </Avatar>
      <div>
        <CardHeader className="pb-2">
          <CardTitle>{props.username}</CardTitle>
          <CardDescription>{props.firstname}</CardDescription>
        </CardHeader>
        <CardFooter>
          <Button className="h-7" variant="outline">
            <Icons.add className="w-5" />
            Follow
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
};
export default Connections;
