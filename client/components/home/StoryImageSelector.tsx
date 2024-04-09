import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import {
  makeAuthenticatedGETRequest,
  makeAuthenticatedPOSTRequest,
} from "@/lib/utils";
import { toast } from "sonner";
import { backendURl } from "@/lib/backend";
import { jwtDecode } from "jwt-decode";

const StoryImageSelector = ({ children }: { children: React.ReactNode }) => {
  //carousel states
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [userId, setUserId] = useState("");
  //image states
  const MAX_FILE_SIZE = 1024 * 1024 * 55; //5MB
  const [lockBtn, setLockBtn] = useState<boolean>(false);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreview, setImagePreview] = useState<string[]>([]);
  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles: FileList = e.target.files;
      const filesArray: File[] = Array.from(selectedFiles);

      for (let i = 0; i < filesArray.length; i++) {
        if (imageFiles[i] && imageFiles[i].size > MAX_FILE_SIZE) {
          alert(`${imageFiles[i].name} is too big!`);
          return;
        }
      }

      setImageFiles((prev: string[]) => [...prev, ...filesArray]);

      // Display image previews
      const previews: string[] = filesArray.map((file) =>
        URL.createObjectURL(file),
      );
      setImagePreview((prev: string[]) => [...prev, ...previews]);
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

      const { identifier } = decodedToken;
      setUserId(identifier);
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
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [userId]);

  const uploadedstoryUrls: string[] = [];
  const handleClick = async () => {
    try {
      console.log("ENTERING POST");
      console.log(userId);
      for (let i = 0; i < imageFiles.length; i++) {
        const formData = new FormData();
        formData.append("file", imageFiles[i]);
        formData.append("upload_preset", "fotoflow");

        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dtekkvnmz/image/upload",
          {
            method: "POST",
            body: formData,
          },
        );
        console.log(response);

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(
            `Failed to upload image to Cloudinary. Status: ${response.status}. Error: ${errorText}`,
          );
        }

        console.log("yha nhi hai error");

        const imageData = await response.json();
        uploadedstoryUrls.push(imageData.secure_url);
      }

      console.log(ImageData);
      console.log("yha  hai error");
      const data = {
        userId,
        imagesUrl: uploadedstoryUrls,
        viewedBy: [],
      };
      const apiResponse = await makeAuthenticatedPOSTRequest(
        "/uploadstory",
        data,
      );
      toast("story uploaded succesfully");
      console.log("API response:", apiResponse);
    } catch (error) {
      console.error("Error uploading images:", error);
      toast(error.message);
    }
  };

  // carousel control
  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div>
      <Drawer>
        <DrawerTrigger>
          <label htmlFor="add-story-input" className="cursor-pointer">
            {children}
          </label>
        </DrawerTrigger>
        <DrawerContent className="bg-light px-5">
          <DrawerHeader>
            <DrawerTitle>Select Media for your story...</DrawerTitle>
          </DrawerHeader>

          <Carousel setApi={setApi}>
            <CarouselContent className="relative px-5">
              {imagePreview.map((img, i) => (
                <CarouselItem key={i} className="md:basis-1/3">
                  <div className="relative flex justify-center">
                    <Button
                      onClick={() => {
                        setImagePreview((prev) =>
                          prev.filter((str, id) => i != id),
                        );
                        setImageFiles((prev) =>
                          prev.filter((files, id) => i != id),
                        );
                      }}
                      variant="ghost"
                      className="absolute bottom-2 left-1/2 -translate-x-10"
                      disabled={lockBtn}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-10 h-10 bg-light hover:bg-surface stroke-surface hover:stroke-light rounded-full p-2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
                      </svg>
                    </Button>

                    <Image
                      src={img}
                      alt="preview"
                      width={960}
                      height={540}
                      className="h-80 w-auto object-cover rounded-md"
                    />
                  </div>
                </CarouselItem>
              ))}
              <div className="pl-1 md:basis-1/3 basis-full flex justify-center">
                <input
                  id="hidden-input"
                  type="file"
                  className="hidden"
                  onChange={handleImageSelect}
                  accept="image/*"
                  multiple
                  disabled={lockBtn}
                />
                <label
                  htmlFor="hidden-input"
                  className={`flex h-80 w-48 cursor-pointer items-center justify-center rounded-md border-2 border-dashed border-gray-400 ${
                    lockBtn && "opacity-50"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="gray"
                    className="h-6 w-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </label>
              </div>
            </CarouselContent>
            <CarouselPrevious className="translate-x-12" />
            <CarouselNext className="-translate-x-12" />
          </Carousel>

          <DrawerFooter className="flex flex-row justify-end">
            <Button onClick={handleClick}>Post</Button>
            <DrawerClose>
              <Button
                variant="outline"
                onClick={() => {
                  setImageFiles([]);
                  setImagePreview([]);
                }}
              >
                Cancel
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};
export default StoryImageSelector;
