import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import AquaButton from "../components/buttons/AquaButton.jsx";
import { AuthContext } from "../context/AuthContext";

function Login() {
    const [state, setState] = useState({
        email: "",
        password: ""
    });
    const [error, setError] = useState("");
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = evt => {
        const value = evt.target.value;
        setState({
            ...state,
            [evt.target.name]: value
        });
    };

    const handleOnSubmit = async evt => {
        evt.preventDefault();
        setError("");

        const { email, password } = state;
        const result = await login({ email, password });

        if (result.token) {
            const userRole = result.user?.role;
            if (userRole === "recruiter" && !result.user.isApproved) {
                navigate("/recruiter-onboard");
            } else if (userRole === "recruiter" && result.user.isApproved) {
                navigate("/Recruiter");
            } else if (userRole === "seeker") {
                navigate("/SeekerDashboard");
            } else if (userRole === "admin") {
                navigate("/admin");
            } else {
                navigate("/profile");
            }
            return;
        }

        setError(result.message || "Login failed");
    };

    return (
        <div className="form-container sign-in-container">
            <form onSubmit={handleOnSubmit}>
                <h1 className="league-gothic-font  text-4xl">SIGN IN</h1>
                <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={state.email}
                    onChange={handleChange}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={state.password}
                    onChange={handleChange}
                />
                <a className="p-3" href="#">Forgot your password?</a>
                {error && <p className="text-red-600">{error}</p>}
                <AquaButton text="Sign In" />
            </form>
        </div>
    );
}

export default Login;
