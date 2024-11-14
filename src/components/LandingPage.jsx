import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import LiveBgButtonDesign from "../utils/LiveBgButtonDesign";
import Footer from "./Footer";
const LandingPage = () => {
  return (
 
      <div className="fixed w-full h-full bg-[#F6F1ED]">
      <Header />
        <ul className="flex justify-center mx-12 pt-10">
          <li>
            <Link to="/timeline">
              <LiveBgButtonDesign name="Timeline of Nepal" bgvideo="gCRNEJxDJKM" />
            </Link>
          </li>
          <li>
            <Link to="/rankings-nepal">
              <LiveBgButtonDesign name="Top Figures of Nepal" bgvideo="mHD-fS6TtoM" />
            </Link>
          </li>
          <li>
            <Link to="/quizzes">
            <LiveBgButtonDesign name="Quizzes" bgvideo="kfXy4W0aD40" />
            </Link>
          </li>
          <li>
            <LiveBgButtonDesign name="to-do" bgvideo="kfXy4W0aD40" />
          </li>
        </ul>
    <div className="absolute w-full bottom-0">    <Footer/></div>
      </div>
  );
};

export default LandingPage;

