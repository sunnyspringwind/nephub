import React from "react";
import Header from "./Header";
import Footer from "./Footer";
const richList = [
  {
    name: "Binod Chaudhary",
    image:
      "https://sgp1.digitaloceanspaces.com/awe/publication-nepalaya/persons/binod_chaudhary.jpg",
    designation: "Chairman of Chaudhary Group",
    estimatedWealth: "1.4 Billion USD",
  },
  {
    name: "Shesh Ghale",
    image:
      "https://republicaimg.nagariknewscdn.com/shared/web/uploads/media/shesh-ghale.jpg",
    designation: "CEO of Melbourne Institute of Technology",
    estimatedWealth: "1.2 Billion USD",
  },
  {
    name: "Jamuna Gurung",
    image:
      "https://biographnepal.com/wp-content/uploads/2024/09/Jamuna-Gurung-e1727365992412.jpg",
    designation: "Co-founder of Melbourne Institute of Technology",
    estimatedWealth: "1.2 Billion USD",
  },
  {
    name: "Upendra Mahato",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1EPbM9h1gf96ua90iDDrOT5-txRPmcijHZg&s",
    designation: "Founder of Mahato Group",
    estimatedWealth: "1 Billion USD",
  },
  {
    name: "Ajay Sumargi",
    image:
      "https://old.bizshala.com/public/images/news/2017-05-27/original/original1495859403ajay-sumargi.jpg",
    designation: "Chairman of Muktishree Group",
    estimatedWealth: "800 Million USD",
  },
  {
    name: "Rajendra Khetan",
    image: "",
    designation: "Chairman of Khetan Group",
    estimatedWealth: "700 Million USD",
  },
  {
    name: "Pashupati Shamsher Rana",
    image: "",
    designation: "Politician and Businessman",
    estimatedWealth: "600 Million USD",
  },
  {
    name: "Aditya Jha",
    image: "",
    designation: "Entrepreneur and Philanthropist",
    estimatedWealth: "500 Million USD",
  },
  {
    name: "Balram Chainrai",
    image: "",
    designation: "Businessman",
    estimatedWealth: "400 Million USD",
  },
  {
    name: "Jiba Lamichhane",
    image: "",
    designation: "Managing Director of Techno Trust",
    estimatedWealth: "300 Million USD",
  },
];

export default function RichestPeople() {
  return (
    <>
      <Header />
      <div className="bg-[#f4f4f9] p-5 font-mono text-[#2c3e50]">
        <div className="text-3xl font-bold text-gray-800 text-center mb-6 tracking-wider uppercase border-b-4 border-blue-500 pb-2" >Richest Person List</div>
        {richList.map((figure, index) => (
      <div
        key={index}
        className="flex items-center mb-5 bg-[#fff] p-3 rounded-lg shadow-xl drop-shadow-md group"
        onClick={() => alert("open detail page")}
      >
        <img
          src={figure.image}
          alt={figure.name}
          className="w-16 h-16 rounded-lg mr-5"
        />
        <div className="cursor-pointer">
          <h2 className="text-[1.2rem] text-[#2980b9] group-hover:text-red-400">
            {figure.name}
          </h2>
          <p className="text-[0.9rem] text-[#7f8c8d]">{figure.designation}</p>
          <span className="group-hover:text-red-400">
            {figure.estimatedWealth}
          </span>
        </div>
      </div>
    ))}
      </div>
      <Footer />
    </>
  );
}
