import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const primeMinistersList = [
    {
        name: "Bishweshwar Prasad Koirala",
        image: "https://upload.wikimedia.org/wikipedia/commons/b/b9/BP_Koirala.jpg",
        term: "1959–1960",
        party: "Nepali Congress",
    },
    {
        name: "Man Mohan Adhikari",
        image: "https://www.opmcm.gov.np/en/wp-content/uploads/2017/01/manamohan-adhikari-1018x1024.jpg",
        term: "1994–1995",
        party: "Communist Party of Nepal (Unified Marxist–Leninist)",
    },
    {
        name: "Sher Bahadur Deuba",
        image: "https://mofa.gov.np/wp-content/uploads/2021/07/Rt.-Hon.-Prime-Minister-Sher-Bahadur-Deuba-12x15-1-scaled.jpg",
        term: "1995–1997, 2001–2002, 2004–2005, 2017–2018, 2021–2022",
        party: "Nepali Congress",
    },
    {
        name: "Pushpa Kamal Dahal",
        image: "https://english.corporatekhabar.com/wp-content/uploads/2024/06/Capture-46.jpg",
        term: "2008–2009, 2016–2017, 2022–present",
        party: "Communist Party of Nepal (Maoist Centre)",
    },
    {
        name: "Khadga Prasad Sharma Oli",
        image: "https://english.pardafas.com/wp-content/uploads/2024/07/PM-KP-SHARMA-OLI-AT-HOR-2024.jpg",
        term: "2015–2016, 2018–2021",
        party: "Communist Party of Nepal (Unified Marxist–Leninist)",
    },
    {
        name: "Madhav Kumar Nepal",
        image: "https://upload.wikimedia.org/wikipedia/commons/4/45/Madhav_Kumar_Nepal_2.jpg",
        term: "2009–2011",
        party: "Communist Party of Nepal (Unified Marxist–Leninist)",
    },
    {
        name: "Baburam Bhattarai",
        image: "https://upload.wikimedia.org/wikipedia/commons/3/3d/Baburam_Bhattarai.jpg",
        term: "2011–2013",
        party: "Communist Party of Nepal (Maoist Centre)",
    },
    {
        name: "Lokendra Bahadur Chand",
        image: "https://upload.wikimedia.org/wikipedia/commons/4/4b/Lokendra_Bahadur_Chand.jpg",
        term: "1983–1986, 1990, 1997, 2002–2003",
        party: "Rastriya Prajatantra Party",
    },
    {
        name: "Surya Bahadur Thapa",
        image: "https://upload.wikimedia.org/wikipedia/commons/3/3d/Surya_Bahadur_Thapa.jpg",
        term: "1963–1964, 1965–1969, 1979–1983, 1997–1998, 2003–2004",
        party: "Rastriya Prajatantra Party",
    },
    {
        name: "Krishna Prasad Bhattarai",
        image: "https://upload.wikimedia.org/wikipedia/commons/3/3d/Krishna_Prasad_Bhattarai.jpg",
        term: "1990–1991, 1999–2000",
        party: "Nepali Congress",
    },
];
const updatedPrimeMinistersList = primeMinistersList.map(({ designation, ...rest }) => ({
    ...rest,
    additionalProperty: "value" // Add any additional properties if needed
}));
export default function PrimeMinisters() {
  return (
    <>
      <Header />
      <div className="bg-[#f4f4f9] p-5 font-mono text-[#2c3e50]">
        <div className="text-3xl font-bold text-gray-800 text-center mb-6 tracking-wider uppercase border-b-4 border-blue-500 pb-2" >Prime Ministers of Nepal</div>
        {primeMinistersList.map((figure, index) => (
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
          <p className="text-[0.9rem] text-[#7f8c8d]">{figure.term}</p>
          <span className="group-hover:text-red-400">
            {figure.party}
          </span>
        </div>
      </div>
    ))}
      </div>
      <Footer />
    </>
  );
}
