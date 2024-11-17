import React from "react";
import { Link } from "react-router-dom";

export default function Header() {


    return (
        <div className="bg-[#1B263B] w-full py-7">
        <ul className='flex justify-between px-10 text-[#F4C95D]'>
        <Link to="/"> <li>NepHub</li></Link>   
        <Link to="/user"> <li>User</li></Link>
            </ul>
        </div>
    )
}