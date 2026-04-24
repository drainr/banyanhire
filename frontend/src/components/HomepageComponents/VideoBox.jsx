import React from "react";
import heroVideo from "./hero.mp4";
import OverlayHome from "./Homepageoverlay.jsx";

const VideoBox = ({ videoSrc = heroVideo, poster }) => {
    return (
        <section className="relative w-full max-w-6xl mx-auto overflow-hidden rounded-2xl p-4 md:p-6">
            <div className="relative h-[650px] md:h-[750px] shadow-lg rounded-2xl overflow-hidden">
                <video
                    className="absolute inset-0 w-full h-full object-cover rounded-xl pointer-events-none select-none"
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
                />

                <OverlayHome />
            </div>
        </section>
    );
};

export default VideoBox;