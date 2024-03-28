import Navbar from "@/components/Navbar";
import { Socket } from "socket.io-client";
import Leftpart from "./Leftpart";
import Rightpart from "./Rightpart";

const ChatPage = () => {
  return (
    <div className=" h-screen overflow-hidden">
      <div className="flex h-full">
        <div className="md:ml-20 pt-5 px-5 hidden sm:block w-[35%] overflow-y-auto mb-2">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl"></h1>
          <div className="relative h-full">
            <Leftpart />
          </div>
        </div>

        <div className="h-full w-full sm:w-[65%] mt-4 mr-5 overflow-hidden">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl"></h1>
          <div className="relative  h-full mb-5">
            <Rightpart />
          </div>
        </div>
      </div>
      <Navbar />
    </div>
  );
};

export default ChatPage;
