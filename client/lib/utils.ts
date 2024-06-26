import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
import { backendURl } from "../lib/backend";
export const makeUnauthenticatedPOSTRequest = async (route: string, body: any) => {
  const response = await fetch(backendURl + route, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      //"authorization":`Bearer ${user.token}`
    },
    body: JSON.stringify(body),
  });

  const formattedData = await response.json();
  //console.log(formattedData);
  return formattedData;
};

export const makeAuthenticatedPOSTRequest = async (route: string, body: any) => {
  const token = getToken();
  const response = await fetch(backendURl + route, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });
  const formattedData = await response.json();
  //console.log(formattedData);
  return formattedData;
};

export const makeAuthenticatedGETRequest = async (route: string) => {
  const token = getToken();
  const response = await fetch(backendURl + route, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorMessage = `Failed to fetch ${backendURl + route}: ${response.status} ${response.statusText}`;
    throw new Error(errorMessage);
  }

  try {
    const formattedData = await response.json();
    return formattedData;
  } catch (error) {
    const parseError = `Failed to parse JSON response: ${error.message}`;
    throw new Error(parseError);
  }
};



const getToken = () => {
  const accessToken = document.cookie.replace(
    /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
    "$1"
  );
  return accessToken;
};

export const getTimeFormat = (timestamp: string) => {
  function timeAgo(timestamp) {
    const seconds = Math.floor((Date.now() - new Date(timestamp)) / 1000);

    let interval = Math.floor(seconds / 31536000);

    if (interval > 1) {
      return interval + " years ago";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
      return interval + " months ago";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
      return interval + " days ago";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
      return interval + " hours ago";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
      return interval + " minutes ago";
    }
    return Math.floor(seconds) + " seconds ago";
  }
  return timeAgo(timestamp)

}