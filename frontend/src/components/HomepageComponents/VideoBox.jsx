// this wraps and render the hero mp4. it will loop the video

import React from 'react';
import heroVideo from './hero.mp4';
import Overlay from './overlay.jsx';

// video box config
const VideoBox = ({
	videoSrc = heroVideo,
	poster,
}) => {
	return (
		<section className="relative w-full max-w-4x2 mx-auto overflow-hidden rounded-2xl p-4 md:p-6">
			<div className="relative h-[290px] md:h-[400px] shadow-lg rounded-2xl">
				<video
					className="w-full h-full object-cover rounded-xl pointer-events-none select-none"
					src={videoSrc}
					poster={poster}
					controls={false}
					autoPlay
					loop
					muted
					playsInline
					tabIndex={-1}
					aria-hidden="true"
					disablePictureInPicture
					disableRemotePlayback
					controlsList="nofullscreen nodownload noremoteplayback"
					onContextMenu={(event) => event.preventDefault()}
					onKeyDown={(event) => event.preventDefault()}
					onPause={(event) => {
						const videoElement = event.currentTarget;
						videoElement.play();
					}}
				/>
				<Overlay />
			</div>
		</section>
	);
};

export default VideoBox;
