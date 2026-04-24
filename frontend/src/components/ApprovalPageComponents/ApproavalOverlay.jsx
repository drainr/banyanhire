import React from 'react';

const OverlayApproval = ({
	title = 'Grow Your Career',
	className = '',
}) => {
	return (
		<div className={`absolute inset-0 z-10 flex items-center justify-center rounded-xl bg-black/15 px-4 text-center ${className}`}>
			<div className="mx-auto max-w-md uppercase text-[#B5CD88] font-bold tracking-tight text-[56px] leading-[0.8] md:text-[90px] lg:text-[120px]">
				<p><span className="inline-block league-gothic-font text-8xl ">Application Pending</span>{' '}</p>
				<span className="inline-block league-gothic-font text-8xl">You will receive an email shortly</span>{' '}
			</div>
		</div>
	);
};

export default OverlayApproval;
