import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function RecruiterOnboard() {
    const [state, setState] = useState({
        companyName: "",
        companyBio: ""
    });
    const [error, setError] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const { user, token } = useContext(AuthContext);
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

        const { companyName, companyBio } = state;
        if (!companyName || !companyBio) {
            setError("Please fill in all fields");
            return;
        }

        try {
            const response = await fetch("http://localhost:3005/api/auth/update-company", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    companyName,
                    companyBio
                })
            });

            const data = await response.json();
            if (response.ok) {
                setSubmitted(true);
                setTimeout(() => {
                    navigate("/pending-approval");
                }, 3000);
            } else {
                setError(data.message || "Failed to update company info");
            }
        } catch (err) {
            setError("Error updating company info");
        }
    };

    if (submitted) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
                    <h2 className="text-2xl font-bold mb-4">Thank You!</h2>
                    <p className="text-gray-700 mb-4">
                        We've received your company information. Your account is now pending admin approval.
                    </p>
                    <p className="text-gray-600">
                        You'll receive an email once your account has been approved. Redirecting you to pending approval page...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
            <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
                <h1 className="text-3xl font-bold mb-6 text-[#583927]">Complete Your Company Profile</h1>
                <p className="text-gray-600 mb-6">
                    Please provide your company details to get started as a recruiter.
                </p>
                
                <form onSubmit={handleOnSubmit}>
                    <input
                        type="text"
                        name="companyName"
                        value={state.companyName}
                        onChange={handleChange}
                        placeholder="Company Name"
                        className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#91D8D4]"
                    />
                    
                    <textarea
                        name="companyBio"
                        value={state.companyBio}
                        onChange={handleChange}
                        placeholder="Company Bio (e.g., what does your company do?)"
                        rows="5"
                        className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#91D8D4]"
                    />
                    
                    {error && <p className="text-red-600 mb-4">{error}</p>}
                    
                    <button
                        type="submit"
                        className="w-full bg-[#B5CD88] hover:bg-[#a0b875] text-white font-bold py-2 px-4 rounded-lg transition"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}

export default RecruiterOnboard;
