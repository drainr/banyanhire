import React from 'react';
import GreenButton from '../buttons/GreenButton.jsx';
import { useNavigate } from "react-router-dom";

const HireNow = () => {
    const navigate = useNavigate();
	return (
		<div>
			<GreenButton text="Hire Now" onClick={() => navigate("/auth")} />
		</div>
	);
};

export default HireNow;