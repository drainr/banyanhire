import React from 'react';
import BrownButton from '../buttons/BrownButton.jsx';

const FindJob = ({ onClick }) => {
	return (
		<div>
			<BrownButton text="Find Job" onClick={onClick} />
		</div>
	);
};

export default FindJob;
