import React from "react";
import "../App.css";
import AquaButton from "../components/buttons/AquaButton.jsx";

function Login() {
    const [state, setState] = React.useState({
        email: "",
        password: ""
    });
    const handleChange = evt => {
        const value = evt.target.value;
        setState({
            ...state,
            [evt.target.name]: value
        });
    };

    const handleOnSubmit = evt => {
        evt.preventDefault();

        const { email, password } = state;
        alert(`You are login with email: ${email} and password: ${password}`);

        for (const key in state) {
            setState({
                ...state,
                [key]: ""
            });
        }
    };

    return (
        <div className="form-container sign-in-container">
            <form onSubmit={handleOnSubmit}>
                <h1 className="league-gothic-font  text-4xl">SIGN IN</h1>
                <div className="social-container">
                    <a href="#" className="social">
                        <i className="fab fa-facebook-f" />
                    </a>
                    <a href="#" className="social">
                        <i className="fab fa-google-plus-g" />
                    </a>
                    <a href="#" className="social">
                        <i className="fab fa-linkedin-in" />
                    </a>
                </div>
                <span>or use your account</span>
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
                <AquaButton text="Sign In"/>

            </form>
        </div>
    );
}

export default Login;
