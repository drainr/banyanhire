import React, { useState } from "react";
import "../components/forms/styles.css";
import SignInForm from "./Login.jsx";
import SignUpForm from "./SignUp.jsx";
import NavbarAnimationButton from "../components/buttons/NavbarAnimationButton.jsx";

export default function AuthPage() {
    const [type, setType] = useState("signIn");
    const handleOnClick = text => {
        if (text !== type) {
            setType(text);
            return;
        }
    };
    const containerClass =
        "container " + (type === "signUp" ? "right-panel-active" : "");
    return (
        <div className="auth-page flex flex-row justify-center items-center ">
            <div className={containerClass} id="container">
                <SignUpForm />
                <SignInForm />
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1 className="league-gothic-font  text-4xl">WELCOME BACK!</h1>
                            <p>
                                To keep connected with us please login with your personal info
                            </p>
                            <button
                                className="border-white border-2 border-white rounded-3xl p-1 pr-3 pl-3 pb-2"
                                id="signIn"
                                onClick={() => handleOnClick("signIn")}
                            >
                                Sign In
                            </button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h1 className="league-gothic-font  text-4xl">HELLO, FRIEND!</h1>
                            <p>Enter your personal details and start journey with us</p>
                            <button
                                className="border-white border-2 border-white rounded-3xl p-1 pr-3 pl-3 pb-2"
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