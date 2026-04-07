import React from 'react';
import '../App.css'

const Navbar = () => {
    return (
        <div className="navbar shadow-sm bg-[#583927]">
            <div className="navbar-start">
                <p className="text-4xl league-gothic-font text-[#B5CD88] text-shadow-md">Banyan <span className="text-[#BB616D]">Hire</span></p>

            </div>
            <div className="navbar-center">
               <a className="navbar-item mr-4 text-xl  text-[#FAF3E8] league-gothic-font" href="/">Hire now</a>
                <a className="navbar-item text-xl text-[#FAF3E8] league-gothic-font" href="/">Find a job</a>

            </div>
            <div className="navbar-end">
                <button className="btn rounded-3xl bg-transparent text-[#FAF3E8] border-[#FAF3E8]"> LogIn</button>
                <button className="btn rounded-3xl m-2 bg-[#FAF3E8] border-[#FAF3E8]">
                SignUp
            </button>
            </div>
        </div>
    );
};

export default Navbar;