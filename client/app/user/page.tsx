"use client";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import { useState } from "react";
import { Icons } from "../../components/ui/icons.tsx";

const UserPage = () => {
  const [imageFile, setImageFile] = useState<File[]>([]);
  const [imagePreview, setImagePreview] = useState<string[]>([]);
  const [lockBtn, setLockBtn] = useState<boolean>(false);
  const [user, setUser] = useState({
    profile: "",
  });

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray: File[] = Array.from(e.target.files);

      for (let i = 0; i < filesArray.length; i++) {
        if (imageFile[i] && imageFile[i].size > MAX_FILE_SIZE) {
          alert(`${imageFile[i].name} is too big!`);
          return;
        }
      }
      setImageFile(filesArray);
      const previews: string[] = filesArray.map((file) =>
        URL.createObjectURL(file)
      );
      setUser((prev) => {
        const newState = {
          ...prev,
          profile: previews[0],
        };
        return newState;
      });
    }
  };

  return (
    <div>
      <div className="md:ml-20 pt-5 px-5">
        <div>
          <input
            id="hidden-input"
            type="file"
            className="hidden"
            onChange={handleImageSelect}
            accept="image/*"
          />
          <label htmlFor="hidden-input" className="aspect-square">
            <Image
              src={user.profile === "" ? "/img/no_profile.jpg" : user.profile}
              className="object-cover absolute h-40 w-40 rounded-full"
              width={500}
              height={500}
              alt="Auth Background"
            />
          </label>
        </div>
      </div>
      <Navbar />
    </div>
  );
};
export default UserPage;
