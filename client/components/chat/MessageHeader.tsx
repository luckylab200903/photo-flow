import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAppSelector } from "@/lib/hooks";

const MessageHeader = () => {
  const messages = useAppSelector((state) => state.messages.data[0]);
  return (
    <div className="w-full h-15 p-1">
      <div className="flex p-2 align-middle items-center">
        <Link href="/chat" className="p-2 md:hidden rounded-full mr-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 stroke-dark"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
        </Link>
        <div className="border rounded-full border-white p-1/2">
          <Avatar className="border-2 border-gray w-12 h-12 md:w-10 md:h-10">
            <AvatarImage
              className="object-cover"
              src="/img/no_profile.jpg"
              alt=""
            />
            <AvatarFallback>H</AvatarFallback>
          </Avatar>
        </div>
        <div className="flex-grow p-2">
          <div className="text-md text-gray-50 font-semibold">Hellow World</div>

          <div className="flex items-center">
            <div className="w-2 h-2 bg-green-300 rounded-full"></div>
            <div className="text-xs text-gray-50 ml-1">Online</div>
          </div>
        </div>
        <div className="p-2 text-white cursor-pointer hover:bg-purple-500 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};
export default MessageHeader;
