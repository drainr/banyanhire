import React from 'react';

const ButtonGrid = ({ children }) => {
	return (
		<div className="mt-8 mx-auto grid w-full max-w-2xl grid-cols-1 gap-4 sm:grid-cols-2 place-items-center">
			{children}
		</div>
	);
};

export default ButtonGrid;
