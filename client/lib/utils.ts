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
  const formattedData = await response.json();
  //console.log(formattedData);
  return formattedData;
};

const getToken = () => {
  const accessToken = document.cookie.replace(
    /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
    "$1"
  );
  return accessToken;
};
