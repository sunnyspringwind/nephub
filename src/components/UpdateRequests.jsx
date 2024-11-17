import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const updateRequests = [
  {
    requestId: "1",
    requestTitle: "Add Dark Mode",
    userId: "user123",
    targetType: "feature",
    targetId: "darkMode",
    imageEvidence: "https://i.pinimg.com/564x/cb/21/8f/cb218feda8d13d2806c369d4a0a6dfb8.jpg",
    requestDescription: "Please add a dark mode to the website for better night-time usability.",
    requestDate: "2023-10-01",
    status: "Pending",
  },
  {
    requestId: "2",
    requestTitle: "Fix Login Bug",
    userId: "user456",
    targetType: "bug",
    targetId: "loginBug",
    imageEvidence: "https://react-cn.github.io/react/img/blog/relay-components/sample-newsfeed.png",
    requestDescription: "The login button does not work on mobile devices.",
    requestDate: "2023-10-02",
    status: "In Progress",
  },
  {
    requestId: "3",
    requestTitle: "Update Profile Page",
    userId: "user789",
    targetType: "feature",
    targetId: "profilePage",
    imageEvidence: "https://static.wikia.nocookie.net/the-demonic-paradise/images/d/d5/Angels-according-to-biblical-figure-ezekiel-v0-bHo4d2tkeGxubGFjMZuByF0FxITD77UVX30bIGORd2nKGohi9V8KTk44pgJc.webp/revision/latest/scale-to-width-down/640?cb=20240225021719https://encrypted-tbn0.gstatic.com/imageshttps://i.redd.it/my-first-attempt-at-biblically-accurate-angels-using-v6-v0-3vlrtv60pa8c1.jpg?width=1792&format=pjpg&auto=webp&s=f0",
    requestDescription: "",
    requestDate: "2023-10-03",
    status: "Completed",
  },
  {
    requestId: "4",
    requestTitle: "Add Two-Factor Authentication",
    userId: "user101",
    targetType: "feature",
    targetId: "2FA",
    imageEvidence: "https://example.com/2fa.png",
    requestDescription: "Implement two-factor authentication for enhanced security.",
    requestDate: "2023-10-04",
    status: "Pending",
  },
  {
    requestId: "5",
    requestTitle: "Incorrect Data on Timeline Page",
    userId: "user202",
    targetType: "data",
    targetId: "timelinePage",
    imageEvidence: "https://example.com/timelineerror.png",
    requestDescription: "The data displayed on the timeline page for the year 2020 is incorrect.",
    requestDate: "2023-10-05",
    status: "Pending",
  },
  {
    requestId: "6",
    requestTitle: "Wrong Rankings on Rankings Page",
    userId: "user303",
    targetType: "data",
    targetId: "rankingsPage",
    imageEvidence: "https://example.com/rankingserror.png",
    requestDescription: "The rankings for the top universities are outdated and incorrect.",
    requestDate: "2023-10-06",
    status: "In Progress",
  }
];

export default function UpdateRequests() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <Header />
      {/* tabs list */}
      <div className="bg-purple-800">
        <ul className="flex justify-center space-x-7 py-4 text-white">
          <li>
            <button className="hover:bg-purple-900 px-4 py-2 rounded transition-colors duration-300 font-semibold">Update Requests Feed</button>
          </li>
          <li>
            <button className="hover:bg-purple-900 px-4 py-2 rounded transition-colors duration-300 font-semibold">My Contributions</button>
          </li>
        </ul>
      </div>

      {/* main contents */}
      <div className="container mx-auto p-6 ">
        {updateRequests.map((request, index) => (
          <div key={index} className="bg-gray-800 shadow-lg rounded-lg mb-8 p-6">
            <h2 className="font-mono bg-purple-700 flex justify-between text-xl p-4 rounded-t-lg font-bold">
              {request.requestTitle}
              <span className="text-gray-300 font-medium">{request.status}</span>
            </h2>
            <div className="bg-gray-700 p-4 flex justify-between rounded-b-lg">
              <span className="text-gray-400 font-medium">{request.userId}</span>
              <span className="text-gray-400 font-medium">{request.requestDate}</span>
            </div>
            <p className="mt-4 text-gray-300 leading-relaxed">{request.requestDescription}</p>
            <div className="mt-4">
              <img src={request.imageEvidence} alt={request.requestTitle} className="w-full rounded-lg" />
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}
