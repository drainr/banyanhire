import React from 'react';
import CremeButton from '../buttons/CremeButton.jsx';

const HireNow = ({ onClick }) => {
	return (
		<div>
			<CremeButton text="Hire Now" onClick={onClick} />
		</div>
	);
};

export default HireNow;