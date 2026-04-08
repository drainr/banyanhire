import React from 'react';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import VideoBox from '../components/HomepageComponents/VideoBox.jsx';

const Homepage = () => {
	return (
		<div className="bg-base-100">
            {/* navbar */}
			<Navbar />


            {/* main body */}
			<main className="h-[1200px] py-16 px-4">
                {/* movie box */}
				<VideoBox />
			</main>


            {/* footer */}
			<Footer />
		</div>
	);
};

export default Homepage;
