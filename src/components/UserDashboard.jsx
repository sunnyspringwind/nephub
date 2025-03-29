import axios from "axios";
import Header from "./Header";
import { useRef, useState, useEffect } from "react";
import { deleteData, fetchData, postData, putData } from "../utils/api";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function UserDashboard() {
  const [isUpdatingImage, setIsUpdatingImage] = useState(false);
  const [isUpdatingInfo, setIsUpdatingInfo] = useState(false);
  const [isUpdatingHallProfile, setIsUpdatingHallProfile] = useState(false);
  const [hallProfileExist, setHallProfileExist] = useState(false);
  const isFirstRender = useRef(true);

  const [data, setData] = useState({
    username: "",
    email: "",
    imageUrl: "",
    bio: "",
  });
  const [updatedData, setUpdatedData] = useState({
    username: "",
    email: "",
    imageUrl: "",
    bio: "",
  });

  const [hallProfile, setHallProfile] = useState({
    name: "",
    image: "",
    description: "",
    position: "",
    attributes: []
  });
  
  const getCredentialsFromLocalStorage = () => {
    const storedData = localStorage.getItem("userCredentials");
    if (storedData) {
      const data = JSON.parse(storedData);
      setData(data);
    }
  };

  //update profile
const MySwal = withReactContent(Swal);

const updateProfile = async () => {
  try {
    const response = await putData(
      "/api/auth/update-profile",
      updatedData,
      true
    );

    if (response.status === 200) {
      MySwal.fire({
        title: "Profile Updated! 🎉",
        text: "Your profile has been successfully updated.",
        icon: "success",
        background: "#FDF6E3",  // Soft warm background
        color: "#4A4A4A",  // Cozy dark gray text
        confirmButtonColor: "#FFB347",  // Soft orange button
        confirmButtonText: "Awesome! ✨",
        customClass: {
          popup: "rounded-xl shadow-md", // Rounded & cozy
          title: "text-lg font-semibold",
          confirmButton: "px-6 py-2 rounded-md",
        },
      });

      setData((prevData) => ({ ...prevData, ...updatedData }));
    }
  } catch (error) {
    console.error("Error occurred during update", error);

    MySwal.fire({
      title: "Update Failed 😢",
      text: "Something went wrong. Please try again later.",
      icon: "error",
      background: "#FDEDEC",  // Soft pinkish-red for error
      color: "#4A4A4A",
      confirmButtonColor: "#FF6B6B",  // Warm red button
      confirmButtonText: "Okay...",
      customClass: {
        popup: "rounded-xl shadow-md",
        title: "text-lg font-semibold",
        confirmButton: "px-6 py-2 rounded-md",
      },
    });
  }
};


  //uddate Hall of fame profile
  const handleProfileSubmit = async () => {
  
    try {
      if (hallProfileExist){
        const response = await putData(
          `/api/Entity/${hallProfile.id}`, hallProfile, true
          );
      }
      else {
      const response = await postData(
      "/api/Entity", hallProfile, true
      );
      if (response.status === 200) {
        alert("hall of fame profile added!");
      }}
    } catch (error) {
      console.error("Error occured during update", error);
    }
  };

  const handleHallProfileDelete = async () => {
    try {
      if (!hallProfileExist) {
        Swal.fire("Oops!", "No Hall of Fame Profile!", "info");
        return;
      }
  
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "This action cannot be undone!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
      });
  
      if (result.isConfirmed) {
        await deleteData(`/api/Entity/${hallProfile.id}`, true);
        Swal.fire("Deleted!", "Hall Profile has been removed.", "success");
      }
    } catch (error) {
      console.error("Error occurred during deletion", error);
      Swal.fire("Error!", "Something went wrong.", "error");
    }
  };
  
  

  const updateChange = (changeValue) => {
    if (typeof changeValue === "object") {
      setUpdatedData(changeValue);
      setIsUpdatingInfo(false);
    } else if (typeof changeValue === "string") {
      setUpdatedData((prevData) => ({ ...data, imageUrl: changeValue }));
      setIsUpdatingImage(false);
    } else if (typeof changeValue === "boolean") {
      setIsUpdatingImage(changeValue);
      setIsUpdatingInfo(changeValue);
    }
  };

  useEffect(  ()  => {
    getCredentialsFromLocalStorage();
    const fetchHallProfile = async () => {
      try {
        let response = await fetchData("/api/Entity/user-hall-of-fame", true);
          if(response.data[0]) {
          console.log(response.data[0]);
          setHallProfile((prevData) => ({ ...prevData, ...response.data[0] }));
          setHallProfileExist(true);
          }
      } catch (error) {
        console.error("Error fetching hall profile:", error);
      }
    };
  
    fetchHallProfile();
  }, []);

  useEffect(  () => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const hasUpdatedData = Object.values(updatedData).some((value) => value);
    const hasHallProfile = Object.entries(hallProfile).some(
      ([key, value]) => key === "attributes" ? value.length > 0 : value
    );
  
    if (hasUpdatedData) {
       updateProfile();
    } else if (hasHallProfile) {
       handleProfileSubmit();
    }
  }, [updatedData, hallProfile]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      <Header />
      <div
        className={`container mx-auto px-4 py-8 relative ${
          isUpdatingInfo || isUpdatingImage ? "blur-sm" : ""
        }`}
      >
        <h1 className="text-3xl font-bold text-white mb-8 border-b border-red-500 pb-2 inline-block">
          My Dashboard
        </h1>

        <div className="bg-slate-800 rounded-xl shadow-xl overflow-hidden">
          <div className="md:flex">
            {/* Profile Section */}
            <div className="md:w-1/3 p-6 bg-gradient-to-br from-slate-800 to-slate-900 border-r border-red-500/30">
              <div className="flex flex-col items-center">
                <div className="relative group">
                  <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-red-500 to-orange-500 opacity-75 blur group-hover:opacity-100 transition duration-300"></div>
                  <img
                    src={
                      data.imageUrl ||
                      "https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0="
                    }
                    alt="Profile"
                    className="relative h-56 w-56 object-cover rounded-lg"
                  />
                </div>

                <div className="mt-8 space-y-3 w-full">
                  <button
                    className="w-full py-2 bg-gradient-to-r from-red-500 to-red-700 text-white rounded-md hover:from-red-600 hover:to-red-800 transition duration-300 shadow-lg font-medium"
                    onClick={() => setIsUpdatingImage(true)}
                  >
                    Update Photo
                  </button>
                  <button
                    className="w-full py-2 bg-gradient-to-r from-indigo-500 to-indigo-700 text-white rounded-md hover:from-indigo-600 hover:to-indigo-800 transition duration-300 shadow-lg font-medium"
                    onClick={() => setIsUpdatingInfo(true)}
                  >
                    Update Profile
                  </button>
                  <button
                    className="w-full py-2 bg-gradient-to-r from-yellow-500 via-red-600 to-purple-700 
             text-white rounded-md hover:from-yellow-400 hover:via-red-500 hover:to-purple-800 
             transition duration-300 shadow-lg font-semibold 
             border border-yellow-300 hover:shadow-2xl 
             uppercase tracking-widest"
                    onClick={() => setIsUpdatingHallProfile(true)}
                  >
                    Enter Hall of Fame
                  </button>
                  <button
  className="w-full py-2 bg-gradient-to-r from-cyan-500 via-blue-600 to-teal-700 
  text-white rounded-md hover:from-cyan-400 hover:via-blue-500 hover:to-teal-800 
  transition duration-300 shadow-lg font-semibold 
  border border-cyan-300 hover:shadow-2xl 
  uppercase tracking-widest"
  onClick={() => handleHallProfileDelete(true)}
>
  Delete Hall Profile
</button>


                </div>
              </div>
            </div>

            {/* User Info Section */}
            <div className="md:w-2/3">
              <div className="p-6 bg-slate-800">
                <h2 className="text-2xl font-bold text-white border-b border-red-500/30 pb-2 mb-6">
                  Profile Information
                </h2>

                <div className="space-y-4 text-gray-200">
                  {Object.entries(data).map(([key, value]) => {
                    if (key === "imageUrl" || key === "token") return null;

                    const labels = {
                      username: "Username",
                      email: "Email",
                      bio: "Bio",
                    };

                    return (
                      <div key={key} className="flex flex-col">
                        <span className="text-sm text-gray-400">
                          {labels[key] || key}
                        </span>
                        <span className="text-lg font-medium">
                          {value || "Not provided"}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Activity Section */}
              <div className="bg-slate-900 p-6">
                <h2 className="text-2xl font-bold text-white border-b border-red-500/30 pb-2 mb-6">
                  Activity
                </h2>

                <div className="bg-slate-800 rounded-lg shadow-inner p-4">
                  <h3 className="text-lg font-semibold text-white mb-4">
                    Quiz Scores
                  </h3>
                  <div className="text-gray-300 text-center">
                    <p>No quiz scores available yet</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Update Requests Section */}
        <div className="mt-8 bg-slate-800 rounded-xl shadow-xl p-6">
          <h2 className="text-2xl font-bold text-white border-b border-red-500/30 pb-2 mb-6">
            My Update Requests
          </h2>
          <div className="bg-slate-900 rounded-lg shadow-inner p-4 text-center text-gray-300">
            <p>No pending update requests</p>
          </div>
        </div>
      </div>

      {/* Modal Forms */}
      {isUpdatingInfo && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <UpdateInfoForm oldData={data} updateFn={updateChange} />
        </div>
      )}

      {isUpdatingImage && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <UpdateProfilePictureForm
            oldImage={data.profilePicture}
            updateFn={updateChange}
          />
        </div>
      )}
       {isUpdatingHallProfile && (
  <UpdateHallOfFameProfileForm 
    oldData={hallProfile} 
    updateFn={(updatedProfile) => {
      setHallProfile(updatedProfile);
      setIsUpdatingHallProfile(false);
    }}
    onCancel={() => setIsUpdatingHallProfile(false)}
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
    updateFn(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-slate-800 rounded-xl shadow-2xl p-8 max-w-md w-full relative animate-fadeIn"
    >
      <button
        type="button"
        className="absolute right-4 top-4 text-gray-400 hover:text-white"
        onClick={handleCancel}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      <h2 className="text-2xl font-bold text-white mb-6 border-b border-red-500/30 pb-2">
        Edit Profile
      </h2>

      <div className="space-y-6">
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full p-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        <div>
          <label
            htmlFor="bio"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            Bio
          </label>
          <textarea
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            rows="4"
            className="w-full p-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            className="p-3 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition duration-300"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="p-3 bg-gradient-to-r from-red-500 to-red-700 text-white rounded-lg hover:from-red-600 hover:to-red-800 transition duration-300"
          >
            Save Changes
          </button>
        </div>
      </div>
    </form>
  );
};

//update profile photo form
const UpdateProfilePictureForm = ({ oldImage, updateFn }) => {
  const [imageSource, setImageSource] = useState("");
  const [imageUrl, setImageUrl] = useState(oldImage);

  useEffect(() => {
    const updateImage = () => {
      if (imageSource === "url" && imageUrl !== null) {
        updateFn(imageUrl);
      } else if (imageSource === "pc") alert("pc select photo");
      else if (imageSource === "cancel") updateFn(false);
    };
    updateImage();
  }, [imageSource, imageUrl, updateFn]);

  return (
    <form className="bg-slate-800 rounded-xl shadow-2xl p-8 max-w-md w-full relative animate-fadeIn">
      <button
        type="button"
        className="absolute right-4 top-4 text-gray-400 hover:text-white"
        onClick={() => setImageSource("cancel")}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      <h2 className="text-2xl font-bold text-white mb-6 border-b border-red-500/30 pb-2">
        Update Profile Picture
      </h2>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Image URL
          </label>
          <input
            type="text"
            value={imageUrl || ""}
            onChange={(e) => setImageUrl(e.target.value)}
            className="w-full p-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="https://example.com/image.jpg"
          />
        </div>

        {imageUrl && (
          <div className="flex justify-center">
            <div className="relative group w-40 h-40">
              <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-red-500 to-orange-500 opacity-75 blur group-hover:opacity-100 transition duration-300"></div>
              <img
                src={imageUrl || ""}
                alt="Preview"
                className="relative object-cover w-full h-full rounded-lg"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/150";
                  e.target.alt = "Invalid URL";
                }}
              />
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            className="p-3 bg-gradient-to-r from-indigo-500 to-indigo-700 text-white rounded-lg hover:from-indigo-600 hover:to-indigo-800 transition duration-300 font-medium"
            onClick={() => setImageSource("pc")}
          >
            Upload from Device
          </button>
          <button
            type="button"
            className="p-3 bg-gradient-to-r from-red-500 to-red-700 text-white rounded-lg hover:from-red-600 hover:to-red-800 transition duration-300 font-medium"
            onClick={() => setImageSource("url")}
          >
            Use URL
          </button>
        </div>
      </div>
    </form>
  );
};


const UpdateHallOfFameProfileForm = ({ oldData, updateFn, onCancel }) => {
  const [formData, setFormData] = useState(oldData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAttributeChange = (index, e) => {
    const { name, value } = e.target;
    const newAttributes = [...formData.attributes];
    newAttributes[index] = {
      ...newAttributes[index],
      [name]: value
    };
    
    setFormData((prevData) => ({
      ...prevData,
      attributes: newAttributes,
    }));
  };

  const addAttribute = () => {
    setFormData((prevData) => ({
      ...prevData,
      attributes: [...prevData.attributes, { key: '', value: '' }]
    }));
  };

  const removeAttribute = (index) => {
    const newAttributes = formData.attributes.filter((_, i) => i !== index);
    setFormData((prevData) => ({
      ...prevData,
      attributes: newAttributes,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateFn(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-xl shadow-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto relative animate-fadeIn">
        <div className="sticky top-0 bg-slate-800 z-10 border-b border-slate-600">
          <button
            type="button"
            className="absolute right-4 top-4 text-gray-400 hover:text-white"
            onClick={onCancel}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <h2 className="text-2xl font-bold text-white p-6 pb-4">
            Edit Hall of Fame Profile
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div>
              <label
                htmlFor="position"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Position
              </label>
              <input
                type="text"
                id="position"
                name="position"
                value={formData.position}
                onChange={handleChange}
                className="w-full p-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Image URL
            </label>
            <input
              type="text"
              id="image"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="w-full p-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="w-full p-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-3">
              <label className="block text-sm font-medium text-gray-300">
                Attributes
              </label>
              <button
                type="button"
                onClick={addAttribute}
                className="text-sm bg-slate-700 text-white px-3 py-1 rounded-lg hover:bg-slate-600 transition duration-300"
              >
                Add Attribute
              </button>
            </div>
            {formData.attributes.map((attr, index) => (
              <div key={index} className="grid grid-cols-3 gap-2 mb-2">
                <input
                  type="text"
                  name="key"
                  value={attr.key}
                  onChange={(e) => handleAttributeChange(index, e)}
                  placeholder="Key (e.g., Term)"
                  className="p-2 bg-slate-700 text-white rounded-lg border border-slate-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <input
                  type="text"
                  name="value"
                  value={attr.value}
                  onChange={(e) => handleAttributeChange(index, e)}
                  placeholder="Value (e.g., 2015–2016)"
                  className="col-span-2 p-2 bg-slate-700 text-white rounded-lg border border-slate-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <button
                  type="button"
                  onClick={() => removeAttribute(index)}
                  className="col-start-3 bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition duration-300"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4">
            <button
              type="button"
              className="p-3 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition duration-300"
              onClick={onCancel}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="p-3 bg-gradient-to-r from-red-500 to-red-700 text-white rounded-lg hover:from-red-600 hover:to-red-800 transition duration-300"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
