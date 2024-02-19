import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "../ui/textarea";
import { Icons } from "../ui/icons";
import { Button } from "../ui/button";

const AddPost = () => {
  return (
    <div className="bg-light rounded-lg mx-5 p-5">
      <div className="flex">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Textarea
          className="ml-5 border-none h-5"
          placeholder="Whats on your mind..."
        />
      </div>
      <div className="flex mt-2 justify-between">
        <div className="flex gap-3">
          <Icons.cameraFilled className="w-10 bg-overlay rounded-full p-2"/>
          <Icons.videoCameraFilled className="w-10 bg-overlay rounded-full p-2"/>
          <Icons.add 
          className="w-10 bg-overlay rounded-full p-2"/>
        </div>
        <Button>Share</Button>
      </div>
    </div>
  );
};
export default AddPost;
