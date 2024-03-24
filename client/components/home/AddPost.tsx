import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { type CarouselApi } from "@/components/ui/carousel";
import { v2 as cloudinary } from "cloudinary";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

import { toast } from "sonner";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Textarea } from "../ui/textarea";
import { Icons } from "../ui/icons";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import Image from "next/image";
import {
  makeAuthenticatedPOSTRequest,
  makeUnauthenticatedPOSTRequest,
} from "@/lib/utils";

// cloudinary.config({
//   cloud_name: process.env.cloud_name,
//   api_key: process.env.api_key,
//   api_secret: process.env.api_secret,
// });
// cloudinary.uploader.upload(
//   "",
//   { public_id: "olympic_flag" },
//   function (error, result) {
//     console.log(result);
//   }
// );
const MAX_FILE_SIZE = 10 * 1024 * 1024;

const AddPost = () => {
  const [token, setToken] = useState("");
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreview, setImagePreview] = useState<string[]>([]);
  const [lockBtn, setLockBtn] = useState<boolean>(false);
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
      setImageFiles(filesArray);
      const previews: string[] = filesArray.map((file) =>
        URL.createObjectURL(file),
      );
      setImagePreview(previews);
    }
  };

  const getToken = () => {
    const accessToken = document.cookie.replace(
      /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
      "$1",
    );
    return accessToken;
  };

  const handleapirequest = async (pics: File[]) => {
    setLockBtn(true);
    if (!pics || pics.length === 0) {
      toast("Select Images...");
      setLockBtn(false);
      return;
    }

    const uploadedImageUrls = [];

    try {
      for (let i = 0; i < pics.length; i++) {
        const formData = new FormData();
        formData.append("file", pics[i]);
        formData.append("upload_preset", "fotoflow");

        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dtekkvnmz/image/upload",
          {
            method: "POST",
            body: formData,
          },
        );

        if (!response.ok) {
          const errorText = await response.text(); // Get the error message as plain text
          throw new Error(
            `Failed to upload image to Cloudinary. Status: ${response.status}. Error: ${errorText}`,
          );
        }

        const imageData = await response.json();
        console.log(imageData);

        uploadedImageUrls.push(imageData.secure_url);
      }
      const data = {
        caption: "hello",
        imageurls: uploadedImageUrls,
      };
      const apiResponse = await makeAuthenticatedPOSTRequest(
        "/createpost",
        data,
      );
      toast("post uploaded succesfully");
      setLockBtn(false);
      setImageFiles([]);
      setImagePreview([]);
      console.log("API response:", apiResponse);
    } catch (error) {
      console.error("Error uploading images:", error);
      toast(error.message);
      setLockBtn(false);
    }
  };

  return (
    <div className="bg-light rounded-lg mx-5 p-5">
      <div className="flex">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Textarea
          className="ml-5 h-5 min-h-[80px]"
          placeholder="Whats on your mind..."
        />
      </div>
      {imagePreview.length > 0 && (
        <PreviewArea
          lockBtn={lockBtn}
          imagePreview={imagePreview}
          setImagePreview={setImagePreview}
          imageFiles={imageFiles}
          setImageFiles={setImageFiles}
        />
      )}
      <div className="flex mt-2 justify-between">
        <div className="flex gap-3">
          <input
            id="add-post-input"
            type="file"
            className="hidden"
            onChange={handleImageSelect}
            accept="image/*"
            disabled={lockBtn || imageFiles.length > 0}
            multiple
          />
          <label htmlFor="add-post-input" className="">
            <Icons.cameraFilled className="w-10 bg-overlay rounded-full p-2" />
          </label>
          <Icons.videoCameraFilled className="w-10 bg-overlay rounded-full p-2" />
          <Icons.add className="w-10 bg-overlay rounded-full p-2" />
        </div>
        <Button onClick={() => handleapirequest(imageFiles)} disabled={lockBtn}>
          {lockBtn && (
            <Icons.spinner className="mr-2 fill-none h-4 w-4 animate-spin" />
          )}
          Share
        </Button>
      </div>
    </div>
  );
};

const PreviewArea = ({
  lockBtn,
  imagePreview,
  setImagePreview,
  imageFiles,
  setImageFiles,
}: {
  lockBtn: boolean;
  imageArr: string[];
}) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

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
    <div className="md:px-12 pt-4 my-5">
      <Carousel setApi={api}>
        <CarouselContent className="relative">
          {imagePreview.map((img, i) => (
            <CarouselItem key={i} className="pl-1 md:basis-1/2 lg:basis-1/3">
              <div className="relative">
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
                  className="absolute bottom-2 -right-2"
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
                  className="w-full aspect-video object-cover"
                />
              </div>
            </CarouselItem>
          ))}
          <div className="min-w-0 shrink-0 grow-0 basis-full pl-1 md:basis-1/2 lg:basis-1/3">
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
              className={`flex h-full cursor-pointer items-center justify-center rounded-md border-2 border-dashed border-gray-400 ${lockBtn && "opacity-50"
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
        <CarouselPrevious className="translate-x-12 md:transform-none" />
        <CarouselNext className="-translate-x-12 md:transform-none" />
      </Carousel>
    </div>
  );
};
export default AddPost;
