import { createSignal, createEffect, onMount, onCleanup } from "solid-js"
import SignupForm from "./signupForm"
import videojs from "video.js"
import "video.js/dist/video-js.css"

const PhoneFrame = (props) => {
  const [videoLoaded, setVideoLoaded] = createSignal(false)
  const [videoSrc, setVideoSrc] = createSignal(props.videoSrc)
  let videoElement;
  let player;

  onMount(() => {
    if (videoElement) {
      player = videojs(videoElement, {
        autoplay: true,
        muted: true,
        loop: true,
        controls: false,
        fluid: true,
        aspectRatio: "9:16",
        sources: [{
          src: videoSrc(),
          type: "application/x-mpegURL"
        }]
      });

      player.on("loadeddata", () => {
        setVideoLoaded(true);
      });
    }
  });

  // Clean up player on unmount
  onCleanup(() => {
    if (player) {
      player.dispose();
    }
  });

  createEffect(() => {
    if (props.videoSrc !== videoSrc()) {
      setVideoLoaded(false);
      setVideoSrc(props.videoSrc);

      if (player) {
        player.src({
          src: props.videoSrc,
          type: "application/x-mpegURL"
        });
        player.load();
      }
    }
  });

  return (
    <div className="relative mx-auto w-[280px] h-[560px] rounded-[2rem] border-[10px] border-black shadow-lg overflow-hidden">
      {/* Phone Content */}
      <div className="relative w-full h-full bg-black overflow-hidden">
        {/* Video container for fluid mode */}
        <div className="video-js-container absolute inset-0">
          <video
            ref={videoElement}
            className="video-js vjs-fluid"
            data-setup='{"fluid": true}'
          ></video>
        </div>

        {/* Form Overlay */}
        <div className="absolute bottom-0 left-0 w-full p-4 z-10">
          <SignupForm />
        </div>

        {/* Next Video Button */}
        <div
          className="absolute inset-0 z-5 cursor-pointer"
          onClick={() => props.onNextVideo && props.onNextVideo()}
        ></div>
      </div>
    </div>
  )
}

export default PhoneFrame