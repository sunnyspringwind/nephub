import { Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import LiveBgButtonDesign from "../utils/LiveBgButtonDesign";
const RankingLibary = () => {

  return (
 
      <div className="min-h-screen bg-[#F6F1ED] ">
        <Header />
      <div>
        <ul className="mt-10 flex flex-wrap justify-center">
          <li className="mb-10">
            <Link to="/rankings-nepal/prime-ministers">
              <LiveBgButtonDesign name="Prime Ministers" bgvideo="gCRNEJxDJKM" />
            </Link>
          </li>
          <li className="mb-10">
            <Link to="/rankings-nepal/rich-list">
              <LiveBgButtonDesign name="Richest List" bgvideo="mHD-fS6TtoM" />
            </Link>
          </li>
          <li className="mb-10">
            <LiveBgButtonDesign name="to-do" bgvideo="kfXy4W0aD40" />
          </li>
        </ul>
      </div>
      <div className="relative w-full bottom-0 sm:fixed"><Footer/></div>
      </div>
  );
};

export default RankingLibary;