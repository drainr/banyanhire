import React from 'react';
import '../App.css'
import logo from '../assets/logo-banyanhire.png';
import NavbarAnimationButton from "./buttons/NavbarAnimationButton.jsx";

const Navbar = () => {
    return (
        <div className="navbar bg-[#583927]">
            <div className="navbar-start">
                <img src={logo} alt="BanyanHire logo" className="h-12 w-auto" />

            </div>
            <div className="navbar-center">
                <NavbarAnimationButton text="test"/>
               <a className="hover-underline-animation navbar-item  mr-4 text-xl  text-[#FAF3E8] league-gothic-font" href="/">Hire now</a>
                <a className="hover-underline-animation navbar-item text-xl text-[#FAF3E8] league-gothic-font" href="/">Find a job</a>

            </div>
            <div className="navbar-end">
                <button className="btn rounded-3xl bg-transparent text-[#FAF3E8] border-[#FAF3E8]"> LogIn</button>
                <button className="btn rounded-3xl m-2 text-[#583927] bg-[#FAF3E8] border-[#FAF3E8]">
                SignUp
            </button>
            </div>
        </div>
    );
};

export default Navbar;