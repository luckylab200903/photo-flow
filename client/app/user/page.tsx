"use client";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import { useState } from "react";
import { Icons } from "../../components/ui/icons.tsx";

import Cookies from "js-cookie";

import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { makeAuthenticatedGETRequest } from "@/lib/utils.js";

const UserPage = () => {
  const [imageFile, setImageFile] = useState<File[]>([]);
  const [imagePreview, setImagePreview] = useState<string[]>([]);
  const [lockBtn, setLockBtn] = useState<boolean>(false);
  const [userId, setUserId] = useState("");
  const [user, setUser] = useState({
    id: "",
    username: "",
    firstname: "",
    lastname: "",
    profilepicture: "",
  });

  const getToken = () => {
    const accessToken = document.cookie.replace(
      /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    return accessToken;
  }

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      console.log(decodedToken);

      const { identifier } = decodedToken;
      console.log("user id", identifier);
      setUserId(identifier);
    }
  }, []);

  const backendURl = "http://localhost:5001/api";

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
          console.log(userData);
          updateUserDetails(userData);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [userId]);

  const updateUserDetails = (userData) => {
    setUser({
      id: userData._id,
      username: userData.username,
      firstname: userData.firstname,
      lastname: userData.lastname,
      profilepicture: userData.profilepicture,
    });
  };
  
  const handlechange = async () => {
    console.log("entering change api");
    
    if (imageFile.length === 0) {
      alert("Please select an image.");
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
        }
      );
  
      const cloudinaryData = await cloudinaryResponse.json();
      const imageUrl = cloudinaryData.secure_url;
      const token = getToken();
      const response = await fetch(backendURl + "/updateprofilepicture", {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ profilePictureUrl: imageUrl }),
      });
  
      if (response.ok) {
        setUser((prevUser) => ({
          ...prevUser,
          profilepicture: imageUrl,
        }));
        
        alert("Profile picture updated successfully.");
      } else {
        throw new Error("Failed to update profile picture");
      }
    } catch (error) {
      console.error("Error updating profile picture:", error);
      alert("An error occurred while updating profile picture.");
    }
  };
  
  
  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray: File[] = Array.from(e.target.files);
      let MAX_FILE_SIZE = 4 * 1024 * 1024;
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
              src={user.profilepicture === "" ? "/img/no_profile.jpg" : user.profilepicture}
              className="object-cover absolute h-40 w-40 rounded-full"
              width={500}
              height={500}
              alt="Auth Background"
              onClick={handlechange}
            />
          </label>
        </div>
      </div>
      <Navbar />
    </div>
  );
};
export default UserPage;

