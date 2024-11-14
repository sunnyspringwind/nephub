import { Link } from "react-router-dom";
import Header from "./Header";
import LiveBgButtonDesign from "../utils/LiveBgButtonDesign";
const RankingLibary = () => {

  return (
    <>
      <div>
        <Header />
      </div>

      <div className="w-full h-full bg-[#F6F1ED]">
        <ul className="flex justify-center mx-12 pt-10">
          <li>
            <Link to="/rankings-nepal/prime-ministers">
              <LiveBgButtonDesign name="Prime Ministers" bgvideo="gCRNEJxDJKM" />
            </Link>
          </li>
          <li>
            <Link to="/rankings-nepal/rich-list">
              <LiveBgButtonDesign name="Richest List" bgvideo="mHD-fS6TtoM" />
            </Link>
          </li>
          <li>
            <LiveBgButtonDesign name="to-do" bgvideo="kfXy4W0aD40" />
          </li>
        </ul>
      </div>
    </>
  );
};

export default RankingLibary;