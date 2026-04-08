import React from 'react';
import BrownButton from '../buttons/BrownButton.jsx';

const FindJob = ({ onClick }) => {
	return (
		<div className="flex justify-center mt-8">
			<BrownButton text="Find Job" onClick={onClick} />
		</div>
	);
};

export default FindJob;