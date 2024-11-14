import React from "react";
import { Link, useHref } from "react-router-dom";

export default function Footer() {


    return (
        <>
        <div className="bg-[#1B263B] w-full py-7">
        <ul className='flex justify-between px-10 text-[#F4C95D] font-mono'>
               <Link to="/"> <li>NepHub</li></Link>
                <li><button onClick={()=> window.scroll({top,behavior:"smooth"})}>To the top</button></li>
                <li><button><a href="mailto: johndoe@example.com">contact me</a></button></li>
            </ul>
        </div>
        
    </>
    )
}
