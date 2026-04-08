// this wraps and render the hero mp4. it will loop the video

import React from 'react';
import heroVideo from './hero.mp4';

// video box config
const VideoBox = ({
	videoSrc = heroVideo,
	poster,
}) => {
	return (
		<section className="w-full max-w-4xl mx-auto p-4 md:p-6 rounded-2xl bg-base-200">
			<video
				className="w-full rounded-xl pointer-events-none select-none"
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
		</section>
	);
};

export default VideoBox;
