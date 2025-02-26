import axios from "axios";
import Header from "./Header";
import { useRef, useState, useEffect } from "react";
import { fetchData } from "../utils/api";

export default function UserDashboard() {
  //state variables to store api data, loading and err status
  const [isUpdatingImage, setIsUpdatingImage] = useState(false);
  const [isUpdatingInfo, setIsUpdatingInfo] = useState(false);
  const [data, setData] = useState({
    username: "audrey",
    email: "tothemoon@gone.com",
    profilePicture:
      "https://cdn.pixabay.com/photo/2023/10/21/00/23/girl-8330439_1280.jpg",
    bio: "daydreaming...",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [postData, setPostData] = useState({
    username: "audrey",
    email: "tothemoon.gone",
    profilePicture:
      "https://cdn.pixabay.com/photo/2023/10/21/00/23/girl-8330439_1280.jpg",
    bio: "daydreaming...",
  });
  const [response, setResponse] = useState(null);

  //api call to fetch user data
  // useEffect(() => {
  //   const getData = async () =>{ try {
  //     const result = fetchData("/users");
  //     if (result) setLoading(false);
  //     setData(result);
  //   }
  //   catch (err) {
  //     setError(err.message);
  //   }
  // };
  //   getData();
  //   }, []);

  useEffect(() => {
    console.log("Data:", data);
  }, [data]);

  // Function to update the state in parent
  const updateChange = (changeValue) => {
    //user info change
    if (typeof changeValue === "object") setData(changeValue);
    //user image change
    else if (typeof changeValue === "string")
     {setData((prevData) => ({ ...prevData, profilePicture: changeValue }));
      setIsUpdatingImage(false);}
    //incase user press the cancel button
    else if (typeof changeValue === "boolean"){ setIsUpdatingImage(changeValue);
    setIsUpdatingInfo(changeValue);}
  };

  // if (loading) return <div>Loading...</div>;
  // if (error) return <div>Error: {error.message}</div>
  return (
    <div
      className={`${
        isUpdatingInfo || isUpdatingImage
          ? "relative h-screen inset-0 bg-black bg-opacity-50 mix-blend-overlay"
          : ""
      }`}
    >
      <Header />
      <div className="grid grid-cols-1 sm:grid-cols-2 bg-[#161e2e] border-2 border-red-700 p-4 gap-4">
        {/* image and user info, settings */}
        <div className="grid grid-flow-col sm:flex sm:flex-row gap-4">
          <div className="flex flex-col items-center gap-3">
            <img
              src={data.profilePicture}
              alt={"user image"}
              className="object-cover w-[450px] h-[350px] p-1 rounded-md border-2 border-red-700"
            />
            <button
              className="w-[70%] py-2 mt-3 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition duration-300"
              onClick={() => setIsUpdatingImage(true)}
            >
              Update Photo
            </button>
            <button
              className="w-[70%] py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition duration-300"
              onClick={() => setIsUpdatingInfo(true)}
            >
              Update Info
            </button>
          </div>
          {/* Details Display Fields */}
          <div className="flex text-center text-emerald-200 justify-center text-xl font-poppins py-6 flex-col w-full border-x-2 border-red-700">
            <ul>
              {Object.entries(data).map(([key, value]) => {
                if (key === "userId" || key === "profilePicture") return null;
                return (
                  <li key={key} className="py-1">
                    {value}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        {/* UpdatRequests */}
        <div className="bg-gray-500 text-center p-4 rounded-md">
          <h2 className="text-white text-lg font-bold">Quiz Scores</h2>
        </div>
      </div>
      <div className="bg-emerald-500 p-4 rounded-md mt-4">
        <h2 className="text-white text-lg font-bold">My Update Requests</h2>
      </div>
      {isUpdatingInfo && (
        <UpdateInfoForm oldData={data} updateFn={updateChange} />
      )}
      {isUpdatingImage && (
        <UpdateProfilePictureForm
          oldImage={data.profilePicture}
          updateFn={updateChange}
        />
      )}
    </div>
  );
}

//form component for user details update
const UpdateInfoForm = ({ oldData, updateFn }) => {
  const [formData, setFormData] = useState(oldData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCancel = () => {
    updateFn(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // lifting state up
    updateFn(formData);
  };

  useEffect(() => {
    console.log("Updated formData:", formData);
  }, [formData]);

  return (
    <form
      onSubmit={handleSubmit}
      className="absolute inset-0 flex flex-col font-poppins items-center justify-center max-w-screen-sm mx-auto bg-white my-10 rounded-md shadow-lg p-6 transform transition-all duration-500 ease-in-out hover:scale-105"
    >
      <button 
        className="absolute p-3 right-0 top-0 bg-red-500 text-white rounded-full hover:bg-red-600 transition duration-300 ease-in-out transform hover:scale-110"
        onClick={handleCancel}
      >
        ✕
      </button>
      <h2 className="block text-lg text-gray-800 font-extrabold mb-4">
        Edit Details
      </h2>
      <div className="mb-4 w-1/2">
        <label htmlFor="username" className="block text-lg text-gray-700">
          Username
        </label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4 w-1/2">
        <label htmlFor="email" className="block text-lg text-gray-700">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4 w-1/2">
        <label htmlFor="bio" className="block text-lg text-gray-700">
          Bio
        </label>
        <textarea
          id="bio"
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          rows="4"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="grid grid-cols-2 gap-6 w-1/2">
        <button
          id="submitBtn"
          type="submit"
          className="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105"
        >
          Update
        </button>
        <button
          id="cancelBtn"
          type="button"
          className="w-full p-3 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition duration-300 ease-in-out transform hover:scale-105"
          onClick={handleCancel}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

//update profile photo form
const UpdateProfilePictureForm = ({ oldImage, updateFn }) => {
  //image source flag and url variable
  const [imageSource, setImageSource] = useState(null);
  const [imageUrl, setImageUrl] = useState(oldImage);

  useEffect(() => {
    const updateImage = () => {
      if (imageSource === "url" && imageUrl !== null) updateFn(imageUrl);
      else if (imageSource === "pc") alert("pc select photo");
      else if (imageSource === "cancel") updateFn(false);
    };
    updateImage();
  }, [imageSource]);

  //handle form chang
  const handleChange = (e) => {
    
  }

  return (
    <form className="absolute inset-0 flex flex-col font-poppins items-center justify-center max-w-[400px] max-h-[300px] bg-white rounded-md m-auto p-6 shadow-lg transform transition-all duration-500 ease-in-out hover:scale-105">
      <button 
        className="absolute p-3 right-0 top-0 bg-red-500 text-white rounded-full hover:bg-red-600 transition duration-300 ease-in-out transform hover:scale-110"
        onClick={() => setImageSource("cancel")}
      >
        ✕
      </button>
      <h2 className="text-lg font-bold mb-4 text-gray-800">Update Profile Picture</h2>
      <div className="mb-4 w-full">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Image URL:
        </label>
        <input
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="flex gap-4 w-full">
        <button
          type="button"
          onClick={() => setImageSource("url")}
          className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105"
        >
          Update Image
        </button>
        <button
          type="button"
          onClick={() => setImageSource("pc")}
          className="w-full p-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition duration-300 ease-in-out transform hover:scale-105"
        >
          From PC
        </button>
      </div>
    </form>
  );
};
