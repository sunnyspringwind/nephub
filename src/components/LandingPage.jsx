import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import LiveBgButtonDesign from "../utils/LiveBgButtonDesign";
import Footer from "./Footer";
const LandingPage = () => {
  return (
 
      <div className="min-h-screen bg-[#F6F1ED]">
      <Header />
        <ul className=" flex mt-10 flex-wrap justify-center items-center sm:justify-evenly">
          <li className="mb-10">
            <Link to="/timeline">
              <LiveBgButtonDesign name="Timeline of Nepal" bgvideo="gCRNEJxDJKM" />
            </Link>
          </li>
          <li className="mb-10">
            <Link to="/rankings-nepal">
              <LiveBgButtonDesign name="Top Figures of Nepal" bgvideo="mHD-fS6TtoM" />
            </Link>
          </li>
          <li className="mb-10">
            <Link to="/quizzes">
            <LiveBgButtonDesign name="Quizzes" bgvideo="kfXy4W0aD40" />
            </Link>
          </li>
          <li className="mb-10">
          <Link to="/update-requests">
            <LiveBgButtonDesign name="Update Requests" bgvideo="kfXy4W0aD40" />
            </Link>
          </li>
          <li className="mb-10">
            <LiveBgButtonDesign name="to-do" bgvideo="kfXy4W0aD40" />
          </li>
        </ul>
    <div className="w-full bottom-0 lg:fixed">    <Footer/></div>
      </div>
  );
};

export default LandingPage;

