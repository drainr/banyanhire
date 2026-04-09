import React from 'react';
import GreenButton from '../buttons/GreenButton.jsx';

const FindJob = ({ onClick }) => {
	return (
		<div>
			<GreenButton text="Find Job" onClick={onClick} />
		</div>
	);
};

export default FindJob;
