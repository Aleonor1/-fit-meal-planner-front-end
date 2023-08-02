import React from "react";
import profilePicture from "../assets/profile-picture.jpeg";

const UserCard = () => {
  const handlePictureChange = () => {
    // Handle picture change functionality
  };

  return (
    <div className="bg-gray-900 rounded-lg shadow-md p-4 flex w-550 h-175">
      <div className="flex-shrink-0">
        <img
          className="w-20 h-20 rounded-full object-cover"
          src={profilePicture}
          alt="Profile Picture"
        />
      </div>
      <div className="ml-4">
        <h2 className="text-xl font-bold text-white">John Doe</h2>
        <button
          className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md mt-2 flex items-center"
          onClick={handlePictureChange}
        >
          <svg
            className="w-4 h-4 mr-2 fill-current text-white"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M5 13V7a5 5 0 1110 0v6a5 5 0 11-10 0zm10 2v2H5v-2H4a2 2 0 01-2-2V7a7 7 0 1114 0v6a2 2 0 01-2 2h-1zm-2-9a3 3 0 11-6 0 3 3 0 016 0z"
              clipRule="evenodd"
            />
          </svg>
          Change Picture
        </button>
      </div>
    </div>
  );
};

export default UserCard;
