import axios from "axios";

import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { userSlice } from "@/lib/features/userSlice";
const { loadReq, loadSuccess, loadFail } = userSlice.actions;

// Load User
export const loadUser = () => async (dispatch) => {
  try {
    dispatch(loadReq());
    let userDetails = {};

    //  get userID
    let userId = "";
    const token = Cookies.get("token");
    if (token) {
      const decodedToken = jwtDecode(token);

      const { identifier } = decodedToken;
      userId = identifier;
    }

    // get access token
    const getToken = () => {
      const accessToken = document.cookie.replace(
        /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
        "$1",
      );
      return accessToken;
    };

    // make request
    const backendURl = "http://localhost:5001/api";
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
        const userData = await makeAuthenticatedGETRequest(`/user/${userId}`);
        userDetails = userData;
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    await fetchUserData();
    // const { data } = await axios.get();

    dispatch(loadSuccess(userDetails));
  } catch (error) {
    dispatch(loadFail(error));
  }
};

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
