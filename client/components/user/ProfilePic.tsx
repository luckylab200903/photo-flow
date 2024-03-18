import Image from "next/image";
import { useState } from "react";
import { useMediaQuery } from "@uidotdev/usehooks";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Icons } from "../ui/icons";
import { useAppDispatch } from "@/lib/hooks";
import { userSlice } from "@/lib/features/userSlice";
import { toast } from "sonner";
const { updateUserProfile } = userSlice.actions;

const ProfilePic = ({ picSrc }) => {
  const dispatch = useAppDispatch();
  //Image Input
  const [imageFile, setImageFile] = useState<File[]>([]);
  const [imagePreview, setImagePreview] = useState<string>();

  // confirm component
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  // mutex
  const [lock, setLock] = useState(false);

  const handleSubmit = async () => {
    setLock(true);

    if (imageFile.length === 0) {
      return;
    }

    const formData = new FormData();
    formData.append("file", imageFile[0]);
    formData.append("upload_preset", "fotoflow");

    try {
      const cloudinaryResponse = await fetch(
        "https://api.cloudinary.com/v1_1/dtekkvnmz/image/upload",
        {
          method: "POST",
          body: formData,
        },
      );

      // get access token
      const getToken = () => {
        const accessToken = document.cookie.replace(
          /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
          "$1",
        );
        return accessToken;
      };
      const cloudinaryData = await cloudinaryResponse.json();
      const imageUrl = cloudinaryData.secure_url;
      const token = getToken();
      const backendURl = "http://localhost:5001/api";
      const response = await fetch(backendURl + "/updateprofilepicture", {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ profilePictureUrl: imageUrl }),
      });
      toast(response.message);

      dispatch(updateUserProfile(imageUrl));
      setLock(false);
      setOpen(false);
    } catch (error) {
      console.error("Error updating profile picture:", error);
      alert("An error occurred while updating profile picture.");

      setLock(false);
      setOpen(false);
    }
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      // convert to array
      const filesArray: File[] = Array.from(e.target.files);

      //check if size is too big
      let MAX_FILE_SIZE = 4 * 1024 * 1024;
      for (let i = 0; i < filesArray.length; i++) {
        if (imageFile[i] && imageFile[i].size > MAX_FILE_SIZE) {
          alert(`${imageFile[i].name} is too big!`);
          return;
        }
      }

      setImageFile(filesArray);

      //extract img src
      const previews: string[] = filesArray.map((file) =>
        URL.createObjectURL(file),
      );

      setImagePreview(previews[0]);
      setOpen(true);
    }
  };

  return (
    <div className="flex justify-center md:block">
      <div className="relative h-64 w-40">
        <input
          id="profile-input"
          type="file"
          className="hidden"
          onChange={handleImageSelect}
          accept="image/*"
        />
        <Image
          src={!picSrc || picSrc === "" ? "/img/no_profile.jpg" : picSrc}
          className="object-cover absolute h-full w-full rounded-full shadow-lg"
          width={500}
          height={500}
          alt="Auth Background"
        />
        <label
          htmlFor="profile-input"
          className="aspect-square absolute bottom-2 right-2 bg-overlay rounded-full p-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6 fill-surface"
          >
            <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
            <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
          </svg>
        </label>
        {isDesktop ? (
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[425px] bg-light">
              <DialogHeader className="font-bold">
                Set Profile Picture
              </DialogHeader>
              <div className="flex justify-center py-5">
                {imagePreview && (
                  <Image
                    src={imagePreview}
                    className="object-cover h-40 w-40 rounded-full shadow-lg"
                    width={500}
                    height={500}
                    alt="Auth Background"
                  />
                )}
              </div>
              <DialogFooter className="flex">
                <Button onClick={handleSubmit} disabled={lock}>
                  {lock && (
                    <Icons.spinner className="mr-2 fill-none h-4 w-4 animate-spin" />
                  )}
                  Confirm
                </Button>
                <Button
                  onClick={() => {
                    setImageFile([]);
                    setImagePreview("");
                    setOpen(false);
                  }}
                  variant="outline"
                  type="button"
                >
                  Cancel
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        ) : (
          <Drawer open={open} onOpenChange={setOpen}>
            <DrawerContent className="bg-light">
              <DrawerHeader className="text-left">
                <DrawerTitle>Set Profile Picture</DrawerTitle>
              </DrawerHeader>
              <div className="flex justify-center py-5">
                {imagePreview && (
                  <Image
                    src={imagePreview}
                    className="object-cover h-40 w-40 rounded-full shadow-lg"
                    width={500}
                    height={500}
                    alt="Auth Background"
                  />
                )}
              </div>
              <DrawerFooter className="pt-2">
                <Button onClick={handleSubmit} disabled={lock}>
                  {lock && (
                    <Icons.spinner className="mr-2 fill-none h-4 w-4 animate-spin" />
                  )}
                  Confirm
                </Button>
                <DrawerClose asChild>
                  <Button
                    onClick={() => {
                      setImageFile([]);
                      setImagePreview("");
                      setOpen(false);
                    }}
                    variant="outline"
                    type="button"
                  >
                    Cancel
                  </Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        )}
      </div>
    </div>
  );
};
export default ProfilePic;
