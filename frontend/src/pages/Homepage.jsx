import React from 'react';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import VideoBox from '../components/HomepageComponents/VideoBoxHome.jsx';
import FindJob from '../components/HomepageComponents/FindJobBTN.jsx';
import HireNow from '../components/HomepageComponents/HireNowBTN.jsx';

const Homepage = () => {
	return (
		<div className="bg-[#583927]">
            {/* navbar */}
			<Navbar />


            {/* main body */}
            {/* control the static size of the home screen */}
			<main className="h-[800px] py-6 px-4">
                {/* movie box */}
				<VideoBox />
				<div className="mt-8 flex items-center justify-center gap-4 flex-wrap">
					<FindJob />
					<HireNow />
				</div>
			</main>


            {/* footer */}
			<Footer />
		</div>
	);
};

export default Homepage;
