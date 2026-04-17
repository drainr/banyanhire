import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import GreenButton from "../components/buttons/GreenButton.jsx";
import { AuthContext } from "../context/AuthContext";

function SignUp() {
    const [state, setState] = useState({
        name: "",
        email: "",
        password: "",
        role: ""
    });
    const [error, setError] = useState("");
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = evt => {
        const value = evt.target.value;
        setState({
            ...state,
            [evt.target.name]: value
        });
    };

    const handleRoleSelect = (role) => {
        setState({
            ...state,
            role: role.toLowerCase()
        });
    };

    const handleOnSubmit = async evt => {
        evt.preventDefault();
        setError("");

        const { name, email, password, role } = state;
        if (!role) {
            setError("Please select a role");
            return;
        }
        const result = await register({ name, email, password, role });

        if (result.token) {
            navigate("/profile");
            return;
        }

        setError(result.message || "Registration failed");
    };

    return (
        <div className="form-container sign-up-container">
            <form onSubmit={handleOnSubmit}>
                <h1 className="league-gothic-font text-[#583927] text-4xl">SIGN UP</h1>
                <div className="mb-4 display-flex gap-10">
                <button 
                    type="button"
                    className={`btn border-none shadow-none mr-2 ${state.role === 'seeker' ? 'bg-[#B5CD88] text-white' : 'bg-[#eee]'}`} 
                    onClick={() => handleRoleSelect("seeker")}
                >
                    Seeker
                </button>
                <button 
                    type="button"
                    className={`btn border-none shadow-none ${state.role === 'recruiter' ? 'bg-[#B5CD88] text-white' : 'bg-[#eee]'}`} 
                    onClick={() => handleRoleSelect("recruiter")}
                >
                    Recruiter
                </button>
                </div>
                <input
                    type="text"
                    name="name"
                    value={state.name}
                    onChange={handleChange}
                    placeholder="Name"
                />
                <input
                    type="email"
                    name="email"
                    value={state.email}
                    onChange={handleChange}
                    placeholder="Email"
                />
                <input
                    className="pb-2"
                    type="password"
                    name="password"
                    value={state.password}
                    onChange={handleChange}
                    placeholder="Password"
                />
                {error && <p className="text-red-600">{error}</p>}
                <GreenButton text="Sign Up" />
            </form>
        </div>
    );
}

export default SignUp;
