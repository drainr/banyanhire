import React, { useState } from "react";
import "../styles.css";
import SignInForm from "./Login.jsx";
import SignUpForm from "./SignUp.jsx";
import { useNavigate, Navigate } from "react-router-dom";
import { IoHomeOutline } from "react-icons/io5";
import { useAuth } from "../hooks/useAuth.js";

export default function AuthPage() {
    const [type, setType] = useState("signIn");
    const navigate = useNavigate();
    const { user } = useAuth();

if (user) {
        if (user.role === "seeker") return <Navigate to="/seeker" />;
        if (user.role === "recruiter") return <Navigate to={user.isApproved ? "/recruiter" : "/pending-approval"} />;
        if (user.role === "admin") return <Navigate to="/admin" />;
        return <Navigate to="/" />;
    }

    const handleOnClick = text => {
        if (text !== type) {
            setType(text);
        }
    };

    const containerClass =
        "container " + (type === "signUp" ? "right-panel-active" : "");

    return (
        <div className="auth-page flex flex-col justify-center items-center">
            <button
                onClick={() => navigate("/")}
                className="absolute top-6 left-6 flex items-center gap-2 text-[#583927] font-semibold hover:text-[#91D8D4] transition-colors"
            >
                <IoHomeOutline size={20} />
                <span>Home</span>
            </button>

            <div className={containerClass} id="container">
                <SignUpForm />
                <SignInForm />
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1 className="league-gothic-font text-4xl">WELCOME BACK!</h1>
                            <p>To keep connected with us please login with your personal info</p>
                            <button
                                className="border-white border-2 rounded-3xl p-1 pr-3 pl-3 pb-2"
                                id="signIn"
                                onClick={() => handleOnClick("signIn")}
                            >
                                Sign In
                            </button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h1 className="league-gothic-font text-4xl">HELLO, FRIEND!</h1>
                            <p>Enter your personal details and start journey with us</p>
                            <button
                                className="border-white border-2 rounded-3xl p-1 pr-3 pl-3 pb-2"
                                id="signUp"
                                onClick={() => handleOnClick("signUp")}
                            >
                                Sign Up
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}