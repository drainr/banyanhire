import React from 'react';
import CremeButton from '../buttons/CremeButton.jsx';

const FindJob = ({ onClick }) => {
	return (
		<div>
			<CremeButton text="Find Job" onClick={onClick} />
		</div>
	);
};

export default FindJob;
