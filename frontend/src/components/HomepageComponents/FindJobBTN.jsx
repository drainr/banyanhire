import React from 'react';
import GreenButton from '../buttons/GreenButton.jsx';
import { useNavigate } from "react-router-dom";

const FindJob = () => {
    const navigate = useNavigate();
	return (
		<div>
			<GreenButton text="Find Job" onClick={() => navigate("/auth")} />
		</div>
	);
};

export default FindJob;
