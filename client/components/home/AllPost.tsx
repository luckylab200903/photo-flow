import {
  cn,
  makeAuthenticatedGETRequest,
  makeAuthenticatedPOSTRequest,
} from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Cookies from "js-cookie";
import { io } from "socket.io-client";
import Image from "next/image";
import { Icons } from "../ui/icons";
import { useEffect, useState } from "react";
import { Separator } from "@radix-ui/react-separator";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { jwtDecode } from "jwt-decode";
import { backendURl } from "@/lib/backend";

const AllPost = ({ className, socket }: { className: string; socket: any }) => {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await makeAuthenticatedGETRequest("/all/getallposts");

        if (!response) {
          console.log("No response received");
          return;
        }

        console.log("Posts data:", response);

        setPosts(response);
      } catch (error) {
        console.error("Error in getting the posts:", error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={cn(className, "py-4 flex flex-col gap-5")}>
      {posts.map((post, i) => (
        <Post key={i} post={post} socket={socket} />
      ))}
    </div>
  );
};

const Post = ({ post, socket }: { post: any; socket: any }) => {
  const [liked, setLiked] = useState(false);
  const [showComment, setShowComment] = useState<boolean>(false);
  const [likecount, setLikecount] = useState(post.likes.length);
  const [commentcount, setCommentcount] = useState(0);
  const [userId, setuserId] = useState("");
  const [comments, setComments] = useState<any[]>([]);
  const timeDifference = (current, previous) => {
    const msPerMinute = 60 * 1000;
    const msPerHour = msPerMinute * 60;
    const msPerDay = msPerHour * 24;

    const elapsed = current - previous;

    if (elapsed < msPerMinute) {
      return Math.round(elapsed / 1000) + " seconds ago";
    } else if (elapsed < msPerHour) {
      return Math.round(elapsed / msPerMinute) + " minutes ago";
    } else if (elapsed < msPerDay) {
      return Math.round(elapsed / msPerHour) + " hours ago";
    } else {
      return Math.round(elapsed / msPerDay) + " days ago";
    }
  };
  const getToken = () => {
    const accessToken = document.cookie.replace(
      /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
      "$1",
    );
    return accessToken;
  };
  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      console.log(decodedToken);

      const { identifier } = decodedToken;
      setuserId(identifier);
      console.log("user id from image selector", identifier);
      setuserId(identifier);
    }
  }, []);
  useEffect(() => {
    const makeAuthenticatedGETRequest = async (route: string) => {
      const token = getToken();
      const response = await fetch(backendURl + route, {
        method: "GET",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${token}`,
        },
      });
      const formattedData = await response.json();
      return formattedData;
    };

    const fetchUserData = async () => {
      try {
        if (userId) {
          const userData = await makeAuthenticatedGETRequest(`/user/${userId}`);
          console.log("hello user", userData);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [userId]);
  useEffect(() => {
    socket.on("like", (data) => {
      const { postId, userId } = data;
      console.log(`User ${userId} liked post ${postId}`);
    });

    socket.on("comment", (data) => {
      const { postId, userId } = data;
      console.log(`User ${userId} commented on post ${postId}`);
    });

    socket.on("firstevent", (message) => {
      console.log("Received message:", message);
    });
  }, []);
  const handlelikeunlike = async () => {
    setLiked((prev) => !prev);
    try {
      if (liked) {
        const response = await makeAuthenticatedPOSTRequest("/addpostdislike", {
          postId: post._id,
          userId: userId,
        });

        if (response && response.success) {
          setLikecount((prev) => prev - 1);
        } else {
          console.error("Failed to remove like:", response.message);
        }
      } else {
        const endpoint = "/addlikepost";
        const response = await makeAuthenticatedPOSTRequest(endpoint, {
          postId: post._id,
          userId: userId,
        });

        if (response && response.success) {
          setLikecount((prev) => prev + 1); // Increment like count
        } else {
          console.error("Failed to add like:", response.message);
        }
      }
    } catch (error) {
      console.error("Error toggling like:", error.message);
    }
  };

  const currentTime = new Date();
  const updatedAt = new Date(post.updatedAt);
  const timeAgo = timeDifference(currentTime, updatedAt);
  const [textareaValue, setTextareaValue] = useState("");
  const handleTextareaChange = (event) => {
    setTextareaValue(event.target.value);
  };
  const handlecommentpost = async () => {
    console.log(textareaValue);

    const body = {
      comment: textareaValue,
      userId,
      postId: post._id,
    };

    try {
      const response = await makeAuthenticatedPOSTRequest("/addcomment", body);
      console.log("Comment added successfully:", response);
      setTextareaValue("");
      //setCommentcount((prev) => prev + 1);
      socket.emit("comment", {
        postId: post._id,
        userId,
        comment: textareaValue,
      });
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const endpoint = `/comment/${post._id}`;
  const fetchcomments = async () => {
    try {
      // Make the authenticated GET request to fetch comments for the specified post
      const response = await makeAuthenticatedGETRequest(endpoint);
      console.log("Comments for post:", response);
      setComments(response);
    } catch (error) {
      console.error("Error fetching comments:", error.message);
    }
  };
  useEffect(() => {
    if (showComment) {
      fetchcomments();
    }
  }, [showComment]);

  return (
    <div className="w-full bg-light rounded-lg pb-3 px-2 md:p-5">
      <div className="flex items-center gap-2 md:gap-4">
        <Avatar className="border-2 border-gray w-10 h-10 md:w-12 md:h-12">
          <AvatarImage
            src={post.user.profilepicture}
            alt={post.user.profilepicture}
          />
          <AvatarFallback>{post.user.username.substring(0, 2)}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-bold text-sm">{post.user.username}</p>
          <p className="text-gray-400 text-sm">
            {updatedAt.toLocaleTimeString()} - {timeAgo}
          </p>
        </div>
      </div>
      <div className="md:px-6 pt-4 relative">
        <Carousel>
          <CarouselContent>
            {post.images.map((img, i) => (
              <CarouselItem key={i}>
                <Image
                  src={img.url}
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
      <p className="py-2 text-slate-700 md:px-6 leading-5">{post.caption}</p>
      <Separator className="bg-gray md:w-[90%] mx-auto my-3 md:h-[2px]" />
      <div className="flex justify-end md:px-5">
        <div className="flex items-center gap-2 justify-between">
          <h4 className="scroll-m-20 text-sm md:text-xl tracking-tight">
            {commentcount}
          </h4>
          <Button
            variant="ghost"
            onClick={async () => {
              await setShowComment((prev) => !prev);
              if (!showComment) {
                await fetchcomments();
              }
            }}
          >
            <Icons.chat
              className="md:w-9 w-7 p-1 fill-none"
              onClick={handlecommentpost}
            />
          </Button>

          <h4 className="scroll-m-20 text-sm md:text-xl tracking-tight">
            {likecount}
          </h4>
          <Button variant="ghost" onClick={handlelikeunlike}>
            {liked ? (
              <Icons.heart className="md:w-9 w-7 p-1 fill-red-600 stroke-red-600" />
            ) : (
              <Icons.heart className="md:w-9 w-7 p-1 fill-none stroke-black" />
            )}
          </Button>
        </div>
      </div>
      {showComment && (
        <div className="flex flex-col gap-2 md:px-5">
          <div className="flex items-center gap-2">
            <Avatar className="border-2 border-gray w-8 h-8 md:w-10 md:h-10">
              <AvatarImage src="" alt="" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <Textarea
              value={textareaValue}
              onChange={handleTextareaChange}
              placeholder="Add a comment"
              className="w-full min-h-[35px] bg-light border-none rounded-lg p-2"
              rows={1}
            />
            <Button variant="ghost" onClick={handlecommentpost}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
              </svg>
            </Button>
          </div>
          <Separator className="bg-gray md:w-[90%] mx-auto my-3 md:h-[2px]" />
          <div className="flex flex-col gap-2">
            {comments &&
              comments.map((comment, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Avatar className="border-2 border-gray w-8 h-8 md:w-10 md:h-10">
                    <AvatarImage src={comment.user.profilepicture} alt="" />
                    <AvatarFallback>
                      {comment.user.username.substring(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <p className="text-sm">{comment.text}</p>
                  <p className="text-xs text-gray-400">{comment.createdAt}</p>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AllPost;
