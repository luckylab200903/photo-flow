import React, { useEffect, useState } from "react";
import {
  makeAuthenticatedGETRequest,
  makeAuthenticatedPOSTRequest,
} from "@/lib/utils";
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

const Connections = () => {
  const [connectionsData, setConnectionsData] = useState([]);

  const fetchConnectionsDetails = async () => {
    try {
      const data = await makeAuthenticatedGETRequest("/getusersuggestions");
      setConnectionsData(data);
      console.log(connectionsData);
    } catch (error) {
      console.log("Internal server error", error.message);
    }
  };

  const handleAddFriend = async (friendId) => {
    try {
      const response = await makeAuthenticatedPOSTRequest("/addfriends", {
        friendId,
      });
      console.log(response);

      console.log("FriendId:", friendId);
      console.log("Response:", response);
      fetchConnectionsDetails();
    } catch (error) {
      console.error("Error adding friend:", error.message);
    }
  };

  useEffect(() => {
    fetchConnectionsDetails();
  }, []);

  return (
    <div className="max-h-screen">
      <div className="flex justify-between items-center">
        <p className="font-bold text-lg">Connections</p>
        <Button variant="ghost">
          <p className="whitespace-nowrap">See More</p>
          <Icons.chevronDoubleRight className="w-5 ml-3 fill-none" />
        </Button>
      </div>
      {connectionsData.map((item, index) => (
        <UserCard
          key={index}
          profilepicture={item.profilepicture}
          username={item.username}
          firstname={item.firstname}
          onClick={() => handleAddFriend(item._id)}
        />
      ))}
    </div>
  );
};

const UserCard = ({ profilepicture, username, firstname, onClick }) => {
  return (
    <Card className="flex items-center px-5 mt-5 border-none bg-gray">
      <Avatar className="border-2 border-gray w-16 h-16">
        <AvatarImage src={profilepicture} alt={username} />
        <AvatarFallback>{username}</AvatarFallback>
      </Avatar>
      <div>
        <CardHeader className="pb-2">
          <CardTitle>{username}</CardTitle>
          <CardDescription>{firstname}</CardDescription>
        </CardHeader>
        <CardFooter>
          <Button className="h-7" variant="outline" onClick={onClick}>
            <Icons.add className="w-5" />
            Follow
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
};

export default Connections;
