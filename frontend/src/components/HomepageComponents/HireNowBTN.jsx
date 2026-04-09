import React from 'react';
import GreenButton from '../buttons/GreenButton.jsx';

const HireNow = ({ onClick }) => {
	return (
		<div>
			<GreenButton text="Hire Now" onClick={onClick} />
		</div>
	);
};

export default HireNow;