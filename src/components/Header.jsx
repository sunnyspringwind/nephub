import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="bg-[#1B263B] w-full py-7">
      <ul className="flex justify-between px-10 text-[#F4C95D]">
        <Link to="/">
          <li>NepHub</li>
        </Link>
        {/* <Link to="/user-dashboard">
          <li className="flex border-2 border-red-800 bg-red-800 rounded-md hover:scale-105 duration-300">
            <span className="font-mono pt-1">Audrey</span>
            <img
              className="ml-1 w-[2rem] object-cover rounded-full"
              src="https://freshairarchive.org/sites/default/files/styles/square_800/public/2021-03/Audrey%20Hepburn.jpg?itok=-XXUZG3Z"
            />
          </li>
        </Link> */}
         <Link to="/login">
          <li className="flex border-2 border-red-800 bg-red-800 rounded-md hover:scale-105 duration-300">
            <span className="font-mono pt-1">Login</span>
            <img
              className="ml-1 w-[2rem] object-cover rounded-full"
              src="https://freshairarchive.org/sites/default/files/styles/square_800/public/2021-03/Audrey%20Hepburn.jpg?itok=-XXUZG3Z"
            />
          </li>
        </Link>
      </ul>
    </div>
  );
}
