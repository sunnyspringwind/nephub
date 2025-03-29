import { Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import LiveBgButtonDesign from "../utils/LiveBgButtonDesign";
import FilteredEntitiesPage from "./SortPage";
const RankingLibary = () => {

  return (
 
      <div className="min-h-screen bg-[#F6F1ED] ">
        <Header />
      <FilteredEntitiesPage/>
      <div className="relative w-full bottom-0 sm:fixed"><Footer/></div>
      </div>
  );
};

export default RankingLibary;