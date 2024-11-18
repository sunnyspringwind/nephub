import Header from "./Header";

const userSample = {
  userId: 12,
  username: "leesa",
  email: "leesaaleesaprija@bitches.gone",
  profilePicture:
    "https://cdn.pixabay.com/photo/2023/10/21/00/23/girl-8330439_1280.jpg",
  bio: "do not give into meloncholy, get away from here.",
};
export default function User() {
  return (
    <div className="">
      <Header />
      <div className="grid grid-cols-2 ">
        <form className="flex">
          <div className=" w-[250px] h-[250px] rounded-lg">
            <img
              src={userSample.profilePicture}
              alt={userSample.username}
              className="object-cover rounded-lg"
            />
          </div>
          <div className="bg-red-300 flex flex-col justify-start p-4 w-full">
            <div className="mb-4">
              <label>Name:</label>
              <input
                className="w-[300px]"
                type="text"
                name="name"
                value={userSample.username}
                required
              />
            </div>
            <div className="mb-4">

              <label>Email:</label>
              <input
                            className="w-[300px]"

                type="text"
                name="email"
                value={userSample.email}
                required
              />
            </div>
            <div className="mb-4">

              <label>Bio:</label>
              <input   className="w-[300px]" type="textarea" name="bio" value={userSample.bio} required />
            </div>
          </div>
          {/* <div className="bg-black opacity-50 z-10 min-w-full "></div> */}
        </form>
        <div className="bg-gray-500">
          <h2>My Update Requests</h2>
        </div>
      </div>
      <div className="bg-emerald-500">
        <h2>Quiz Badges</h2>
      </div>
    </div>
  );
}
