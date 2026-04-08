import React from 'react';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import VideoBox from '../components/HomepageComponents/VideoBox.jsx';
import FindJob from '../components/HomepageComponents/FindJobBtn.jsx';

const Homepage = () => {
	return (
		<div className="bg-base-100">
            {/* navbar */}
			<Navbar />


            {/* main body */}
            {/* control the static size of the home screen */}
			<main className="h-[1000px] py-6 px-4">
                {/* movie box */}
				<VideoBox />
				<FindJob />
			</main>


            {/* footer */}
			<Footer />
		</div>
	);
};

export default Homepage;
