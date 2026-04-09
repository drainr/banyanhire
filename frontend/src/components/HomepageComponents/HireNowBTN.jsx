import React from 'react';
import BrownButton from '../buttons/BrownButton.jsx';

const HireNow = ({ onClick }) => {
	return (
		<div>
			<BrownButton text="Hire Now" onClick={onClick} />
		</div>
	);
};

export default HireNow;