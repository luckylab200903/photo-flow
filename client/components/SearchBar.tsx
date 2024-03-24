import React, { useState } from "react";
import { Input } from "./ui/input";
import { makeAuthenticatedGETRequest } from "@/lib/utils";
import Link from "next/link";

const SearchBar = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [focusedUser, setFocusedUser] = useState(null);

  const handleInput = (e) => {
    setSearch(e.target.value);
  };

  const SearchUser = async () => {
    try {
      const { users } = await makeAuthenticatedGETRequest("/search/" + search);
      setUsers(users);
      setError(null);
    } catch (error) {
      console.error("Error in SearchUser:", error);
      setError("An error occurred while searching. Please try again.");
    }
  };

  const handleUserFocus = (user) => {
    setFocusedUser(user);
  };

  const handleUserBlur = () => {
    setFocusedUser(null);
  };

  const handleUserClick = (e) => {
    // Handle user click action here, for example, navigate to user profile

    console.log("Clicked user:", user);
  };

  const SearchSongEnter = (e) => {
    if (e.key === "Enter") {
      SearchUser();
    }
  };

  return (
    <div className="relative mt-2 w-full pb-4 md:py-2">
      <Input
        className="text-surface placeholder-muted pr-12"
        placeholder="Search for people, groups, and messages"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        value={search}
        //onClick={handleInput}
        onChange={handleInput}
        onKeyDown={SearchSongEnter}
      />

      {search && (
        <div className="absolute top-full left-0 mt-1 bg-slate-900 rounded-lg p-4 w-full z-20 shadow-lg max-h-screen overflow-y-auto">
          {error ? (
            <div className="text-white">{error}</div>
          ) : users && users.length > 0 ? (
            <div
              className="space-y-4"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              {users.map((user, index) => (
                <Link
                  href={`/others/${user._id}`}
                  key={index}
                  className={`flex items-center text-white cursor-pointer ${focusedUser === user ? "bg-gray-500" : ""
                    }`}
                  onClick={() => handleUserClick(user)} // Add onClick event handler
                  onMouseEnter={() => handleUserFocus(user)}
                  onMouseLeave={handleUserBlur}
                >
                  {/* Online indicator */}
                  <div className="w-3 h-3 bg-green-500 border border-white rounded-full"></div>
                  {/* User profile picture */}
                  <div
                    className="bg-cover bg-center rounded-full mr-4"
                    style={{
                      backgroundImage: `url(${user.profilepicture})`,
                      width: "40px",
                      height: "40px",
                    }}
                  ></div>
                  {/* User information */}
                  <div>
                    <div className="font-sm">{user.username}</div>
                    <div className="text-sm mt-1">{user.firstname}</div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-white">No users found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
