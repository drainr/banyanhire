import React from 'react';
import BrownButton from '../buttons/BrownButton.jsx';

const FindJob = ({ onHireNowClick, onFindJobClick }) => {
	return (
		<div className="mt-8 flex justify-center gap-4 flex-wrap">
			<BrownButton text="Hire Now" onClick={onHireNowClick} />
		</div>
	);
};

export default FindJob;
