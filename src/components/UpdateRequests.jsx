import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";

// Mock data with added upvotes and comments
const initialUpdateRequests = [
  {
    requestId: "1",
    requestTitle: "Add Dark Mode",
    userId: "user123",
    userAvatar: "https://i.pravatar.cc/150?u=user123",
    targetType: "feature",
    targetId: "darkMode",
    imageEvidence: "https://i.pinimg.com/564x/cb/21/8f/cb218feda8d13d2806c369d4a0a6dfb8.jpg",
    requestDescription: "Please add a dark mode to the website for better night-time usability.",
    requestDate: "2023-10-01",
    status: "Pending",
    upvotes: 24,
    comments: [
      { id: "c1", userId: "user456", userName: "Alex", content: "Strongly support this! My eyes hurt at night.", timestamp: "2023-10-02", userAvatar: "https://i.pravatar.cc/150?u=user456" },
      { id: "c2", userId: "user789", userName: "Sam", content: "Good idea, but what about accessibility concerns?", timestamp: "2023-10-03", userAvatar: "https://i.pravatar.cc/150?u=user789" }
    ]
  },
  {
    requestId: "2",
    requestTitle: "Fix Login Bug",
    userId: "user456",
    userAvatar: "https://i.pravatar.cc/150?u=user456",
    targetType: "bug",
    targetId: "loginBug",
    imageEvidence: "https://react-cn.github.io/react/img/blog/relay-components/sample-newsfeed.png",
    requestDescription: "The login button does not work on mobile devices.",
    requestDate: "2023-10-02",
    status: "In Progress",
    upvotes: 42,
    comments: [
      { id: "c3", userId: "user101", userName: "Taylor", content: "I've been experiencing this too. Very frustrating!", timestamp: "2023-10-03", userAvatar: "https://i.pravatar.cc/150?u=user101" }
    ]
  },
  {
    requestId: "3",
    requestTitle: "Update Profile Page",
    userId: "user789",
    userAvatar: "https://i.pravatar.cc/150?u=user789",
    targetType: "feature",
    targetId: "profilePage",
    imageEvidence: "https://i.redd.it/my-first-attempt-at-biblically-accurate-angels-using-v6-v0-3vlrtv60pa8c1.jpg?width=1792&format=pjpg&auto=webp&s=f0",
    requestDescription: "The profile page needs a modern redesign with more customization options.",
    requestDate: "2023-10-03",
    status: "Completed",
    upvotes: 37,
    comments: []
  },
  {
    requestId: "4",
    requestTitle: "Add Two-Factor Authentication",
    userId: "user101",
    userAvatar: "https://i.pravatar.cc/150?u=user101",
    targetType: "feature",
    targetId: "2FA",
    imageEvidence: "https://miro.medium.com/v2/resize:fit:1400/1*i-BM33SwsMm8zVd-3DrU-A.png",
    requestDescription: "Implement two-factor authentication for enhanced security.",
    requestDate: "2023-10-04",
    status: "Pending",
    upvotes: 56,
    comments: [
      { id: "c4", userId: "user202", userName: "Jordan", content: "This is critical for security. Hope it gets implemented soon.", timestamp: "2023-10-05", userAvatar: "https://i.pravatar.cc/150?u=user202" },
      { id: "c5", userId: "user123", userName: "Riley", content: "Agreed! Would prefer Google Authenticator integration.", timestamp: "2023-10-06", userAvatar: "https://i.pravatar.cc/150?u=user123" }
    ]
  },
  {
    requestId: "5",
    requestTitle: "Incorrect Data on Timeline Page",
    userId: "user202",
    userAvatar: "https://i.pravatar.cc/150?u=user202",
    targetType: "data",
    targetId: "timelinePage",
    imageEvidence: "https://cdn.dribbble.com/users/513906/screenshots/3338327/timeline_concept.gif",
    requestDescription: "The data displayed on the timeline page for the year 2020 is incorrect.",
    requestDate: "2023-10-05",
    status: "Pending",
    upvotes: 18,
    comments: []
  },
  {
    requestId: "6",
    requestTitle: "Wrong Rankings on Rankings Page",
    userId: "user303",
    userAvatar: "https://i.pravatar.cc/150?u=user303",
    targetType: "data",
    targetId: "rankingsPage",
    imageEvidence: "https://cdn.dribbble.com/users/970957/screenshots/16099537/media/5c055e7e67f829f794b22dbfa086f103.png",
    requestDescription: "The rankings for the top universities are outdated and incorrect.",
    requestDate: "2023-10-06",
    status: "In Progress",
    upvotes: 31,
    comments: [
      { id: "c6", userId: "user101", userName: "Taylor", content: "I noticed this too. Harvard should be #3 now.", timestamp: "2023-10-07", userAvatar: "https://i.pravatar.cc/150?u=user101" }
    ]
  }
];

// Status badge component
const StatusBadge = ({ status }) => {
  const statusStyles = {
    Pending: "bg-yellow-500",
    "In Progress": "bg-blue-500",
    Completed: "bg-green-500",
  };

  return (
    <span className={`${statusStyles[status]} text-white text-xs px-2 py-1 rounded-full`}>
      {status}
    </span>
  );
};

// Type badge component
const TypeBadge = ({ type }) => {
  const typeStyles = {
    feature: "bg-purple-600",
    bug: "bg-red-600",
    data: "bg-blue-600",
  };

  return (
    <span className={`${typeStyles[type]} text-white text-xs px-2 py-1 rounded-full`}>
      {type}
    </span>
  );
};

export default function UpdateRequests() {
  const [activeTab, setActiveTab] = useState("feed");
  const [requests, setRequests] = useState(initialUpdateRequests);
  const [expandedComments, setExpandedComments] = useState({});
  const [commentInputs, setCommentInputs] = useState({});

  // Handle tab change
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // Handle upvote
  const handleUpvote = (requestId) => {
    setRequests(prevRequests =>
      prevRequests.map(request => 
        request.requestId === requestId 
          ? { ...request, upvotes: request.upvotes + 1 } 
          : request
      )
    );
  };

  // Toggle comments visibility
  const toggleComments = (requestId) => {
    setExpandedComments(prev => ({
      ...prev,
      [requestId]: !prev[requestId]
    }));
  };

  // Handle comment input change
  const handleCommentChange = (requestId, value) => {
    setCommentInputs(prev => ({
      ...prev,
      [requestId]: value
    }));
  };

  // Add a new comment
  const addComment = (requestId) => {
    if (!commentInputs[requestId]?.trim()) return;
    
    const newComment = {
      id: `c${Date.now()}`,
      userId: "currentUser", // This would come from authentication in a real app
      userName: "You",
      content: commentInputs[requestId],
      timestamp: new Date().toISOString().split('T')[0],
      userAvatar: "https://i.pravatar.cc/150?u=currentUser"
    };

    setRequests(prevRequests =>
      prevRequests.map(request => 
        request.requestId === requestId 
          ? { ...request, comments: [...request.comments, newComment] } 
          : request
      )
    );

    // Clear the input
    setCommentInputs(prev => ({
      ...prev,
      [requestId]: ""
    }));
  };

  // Filter requests based on active tab
  const filteredRequests = activeTab === "mine" 
    ? requests.filter(request => request.userId === "currentUser") // This would be the actual user ID in a real app
    : requests;

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />
      
      {/* Tabs navigation */}
      <div className="bg-white shadow">
        <div className="container mx-auto max-w-5xl">
          <div className="flex space-x-1 p-2">
            <button 
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors ${
                activeTab === "feed" 
                  ? "bg-indigo-600 text-white" 
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => handleTabChange("feed")}
            >
              Update Requests Feed
            </button>
            <button 
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors ${
                activeTab === "mine" 
                  ? "bg-indigo-600 text-white" 
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => handleTabChange("mine")}
            >
              My Contributions
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto max-w-5xl py-6 px-4">
        {/* Sort and filter options */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">
            {activeTab === "feed" ? "Update Requests Feed" : "My Contributions"}
          </h1>
          <div className="flex space-x-2">
            <select className="bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm">
              <option>Sort by Latest</option>
              <option>Sort by Most Upvoted</option>
              <option>Sort by Status</option>
            </select>
            <select className="bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm">
              <option>All Types</option>
              <option>Features</option>
              <option>Bugs</option>
              <option>Data</option>
            </select>
          </div>
        </div>

        {/* Request cards */}
        {filteredRequests.map((request) => (
          <div key={request.requestId} className="bg-white rounded-xl shadow-sm mb-6 overflow-hidden transition-all duration-200 hover:shadow-md">
            {/* Card header */}
            <div className="p-6 pb-4">
              <div className="flex justify-between items-start">
                <div className="flex space-x-3">
                  <img 
                    src={request.userAvatar} 
                    alt={request.userId} 
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">{request.requestTitle}</h2>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-gray-500 text-sm">{request.userId}</span>
                      <span className="text-gray-400">•</span>
                      <span className="text-gray-500 text-sm">{request.requestDate}</span>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <TypeBadge type={request.targetType} />
                  <StatusBadge status={request.status} />
                </div>
              </div>
              
              {/* Description */}
              {request.requestDescription && (
                <p className="mt-4 text-gray-700">{request.requestDescription}</p>
              )}
            </div>
            
            {/* Evidence image */}
            {request.imageEvidence && (
              <div className="px-6">
                <img 
                  src={request.imageEvidence} 
                  alt={`Evidence for ${request.requestTitle}`} 
                  className="w-full h-auto rounded-lg object-cover"
                />
              </div>
            )}
            
            {/* Actions bar */}
            <div className="px-6 py-4 border-t border-gray-100 flex justify-between">
              <button 
                className="flex items-center space-x-1 text-gray-600 hover:text-indigo-600 transition-colors"
                onClick={() => handleUpvote(request.requestId)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                </svg>
                <span>{request.upvotes} Upvotes</span>
              </button>
              
              <button 
                className="flex items-center space-x-1 text-gray-600 hover:text-indigo-600 transition-colors"
                onClick={() => toggleComments(request.requestId)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clipRule="evenodd" />
                </svg>
                <span>{request.comments.length} Comments</span>
              </button>
            </div>
            
            {/* Comments section */}
            {expandedComments[request.requestId] && (
              <div className="bg-gray-50 px-6 py-4 border-t border-gray-100">
                {/* Comment list */}
                {request.comments.length > 0 ? (
                  <div className="space-y-4 mb-4">
                    {request.comments.map(comment => (
                      <div key={comment.id} className="flex space-x-3">
                        <img 
                          src={comment.userAvatar} 
                          alt={comment.userName} 
                          className="w-8 h-8 rounded-full mt-1"
                        />
                        <div className="flex-1">
                          <div className="bg-white p-3 rounded-lg shadow-sm">
                            <div className="flex items-center justify-between">
                              <span className="font-medium text-gray-900">{comment.userName}</span>
                              <span className="text-xs text-gray-500">{comment.timestamp}</span>
                            </div>
                            <p className="text-gray-700 mt-1">{comment.content}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 italic text-sm mb-4">No comments yet. Be the first to comment!</p>
                )}
                
                {/* Add comment */}
                <div className="flex space-x-3">
                  <img 
                    src="https://i.pravatar.cc/150?u=currentUser" 
                    alt="Your avatar" 
                    className="w-8 h-8 rounded-full"
                  />
                  <div className="flex-1 flex">
                    <input
                      type="text"
                      placeholder="Add a comment..."
                      className="flex-1 border border-gray-300 rounded-l-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      value={commentInputs[request.requestId] || ""}
                      onChange={(e) => handleCommentChange(request.requestId, e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addComment(request.requestId)}
                    />
                    <button 
                      className="bg-indigo-600 text-white px-4 py-2 rounded-r-lg hover:bg-indigo-700 transition-colors"
                      onClick={() => addComment(request.requestId)}
                    >
                      Send
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
        
        {/* Empty state */}
        {filteredRequests.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="mt-4 text-xl font-medium text-gray-900">No requests found</h3>
            <p className="mt-2 text-gray-500">
              {activeTab === "mine" ? "You haven't created any update requests yet." : "No update requests available."}
            </p>
            {activeTab === "mine" && (
              <button className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                Create a request
              </button>
            )}
          </div>
        )}
        
        {/* Floating action button for mobile */}
        <button className="md:hidden fixed right-6 bottom-6 bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </button>
      </div>
      
      <Footer />
    </div>
  );
}