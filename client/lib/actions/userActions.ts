import axios from "axios";

import { userSlice } from "@/lib/features/userSlice";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { makeAuthenticatedGETRequest } from "../utils";
const {
  loadReq,
  loadSuccess,
  loadFail
} = userSlice.actions;

export const loadUser = ({ userId }: { userId: string }) => async (dispatch: any) => {
  try {
    dispatch(loadReq());
    console.log("Loading user...");
    console.log("userid from useeractions",userId);
    const response = await makeAuthenticatedGETRequest(`/user/${userId}`);
    console.log("Response received:", response);
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const json = await response.json();
    console.log("JSON data from user action:", json);
    dispatch(loadSuccess(json));
  } catch (error) {
    console.error("Error loading user:", error);
    dispatch(loadFail(error.response));
  }
};


// export const loadUser = ({userId: string}) => async (dispatch) => {
//   try {
    
    

//     dispatch(loadReq());
//     console.log("fromn func",userId)
//     console.log("hello");
    
//     const response = await makeAuthenticatedGETRequest(`/user/${userId}`);
//     console.log("hello 2");
    
//     const json = await response.json();
//     console.log("json from useractions", );
//     dispatch(loadSuccess(response.json()));
//   } catch (error:any) {
//     dispatch(loadFail(error.response));
//   }
// };

// Register User
export const registerUser = (userData) => async (dispatch) => {
  try {
    dispatch(REGISTER_USER_REQUEST());

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      `${import.meta.env.VITE_API_ENDPOINT}/user/register`,
      JSON.stringify(userData),
      config,
    );

    dispatch(REGISTER_USER_SUCCESS(data.user1));
  } catch (error) {
    dispatch(REGISTER_USER_FAIL(error.response.data));
  }
};

// Login User
export const loginUser = (email, password) => async (dispatch) => {
  try {
    dispatch(LOGIN_USER_REQUEST());

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      `${import.meta.env.VITE_API_ENDPOINT}/user/login`,
      JSON.stringify({
        email: email,
        password: password,
      }),
      config,
    );

    dispatch(LOGIN_USER_SUCCESS(data.user1));
  } catch (error) {
    dispatch(LOGIN_USER_FAIL(error.response.data));
  }
};


// Logout User
export const logoutUser = () => async (dispatch) => {
  try {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_ENDPOINT}/user/logout`,
    );

    dispatch(LOGOUT_USER_SUCCESS());
  } catch (error) {
    dispatch(LOGOUT_USER_FAIL(error.response.data));
  }
};
