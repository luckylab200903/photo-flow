"use client";
import type { Metadata } from "next";
import "./globals.css";
import StoreProvider from "./StoreProvider";
import { Toaster } from "@/components/ui/sonner";
import { useCookies } from "react-cookie";
import { redirect } from "next/navigation";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { counterSlice } from "@/lib/features/countSlice";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [userId, setUserId] = useState("");

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
  };
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

    const updateUserDetails = (userData) => {
      setUser({
        id: userData._id,
        username: userData.username,
        firstname: userData.firstname,
        lastname: userData.lastname,
        profilepicture: userData.profilepicture,
      });
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
  return (
    <StoreProvider>
      <html lang="en">
        <DataFetch />
        <body>
          {children}
          <Toaster />
        </body>
      </html>
    </StoreProvider>
  );
}
const DataFetch = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(counterSlice.actions.increment());
    console.log("holdfsj");
  }, [dispatch]);
};
