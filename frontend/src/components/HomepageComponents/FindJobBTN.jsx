import React from 'react';
import YellowButton from '../buttons/YellowButton.jsx';
import { useNavigate } from "react-router-dom";

const FindJob = () => {
    const navigate = useNavigate();
	return (
		<div>
			<YellowButton text="Find Job" onClick={() => navigate("/auth")} />
		</div>
	);
};

export default FindJob;
