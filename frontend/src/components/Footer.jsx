import React from 'react';
import logoDark from "../assets/Logo-dark.png";

const Footer = ({ compact = false }) => {
    const paddingClass = compact ? 'p-6' : 'p-10';
    const logoSize = compact ? 40 : 50;
    const titleSizeClass = compact ? 'text-lg' : 'text-xl';
    const textSizeClass = compact ? 'text-sm' : '';

    return (
        <>
        <footer className={`footer sm:footer-horizontal bg-[#FAF3E8] text-base-content ${paddingClass}`}>
            <div className="footer sm:footer-horizontal">
            <aside>
                <p className={`text-[#583927] ${textSizeClass}`}>
                    AITA Industries Ltd.
                    <br/>
                    Providing reliable WebApp's since 2026
                </p>
            </aside>
            <nav>
                <h6 className={`footer-title text-[#583927] league-gothic-font ${titleSizeClass}`}>Services</h6>
                <a className={`link link-hover text-[#583927] ${textSizeClass}`}>Branding</a>
                <a className={`link link-hover text-[#583927] ${textSizeClass}`}>Design</a>
                <a className={`link link-hover text-[#583927] ${textSizeClass}`}>Marketing</a>
                <a className={`link link-hover text-[#583927] ${textSizeClass}`}>Advertisement</a>
            </nav>
            <nav>
                <h6 className={`footer-title text-[#583927] league-gothic-font ${titleSizeClass}`}>Company</h6>
                <a className={`link link-hover text-[#583927] ${textSizeClass}`}>About us</a>
                <a className={`link link-hover text-[#583927] ${textSizeClass}`}>Contact</a>
                <a className={`link link-hover text-[#583927] ${textSizeClass}`}>Jobs</a>
                <a className={`link link-hover text-[#583927] ${textSizeClass}`}>Press kit</a>
            </nav>
            <nav>
                <h6 className={`footer-title text-[#583927] league-gothic-font ${titleSizeClass}`}>Legal</h6>
                <a className={`link link-hover text-[#583927] ${textSizeClass}`}>Terms of use</a>
                <a className={`link link-hover text-[#583927] ${textSizeClass}`}>Privacy policy</a>
                <a className={`link link-hover text-[#583927] ${textSizeClass}`}>Cookie policy</a>
            </nav>
            </div>

        </footer>
    <div className="bg-[#FAF3E8] p-0">
        <img src={logoDark} alt="Dark logo banyan hire" className="h-60 object-contain"/>
    </div>
</>
    );
};

export default Footer;