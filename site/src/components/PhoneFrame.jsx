import { createSignal, createEffect, onMount, onCleanup } from "solid-js"
import SignupForm from "./signupForm"
import videojs from "video.js"
import "video.js/dist/video-js.css"

const PhoneFrame = (props) => {
  const [videoLoaded, setVideoLoaded] = createSignal(false)
  const [videoSrc, setVideoSrc] = createSignal(props.videoSrc)
  let videoElement;
  let player;

  // Initialize Video.js player on mount
  onMount(() => {
    if (videoElement) {
      player = videojs(videoElement, {
        autoplay: true,
        muted: true,
        loop: true,
        controls: false,
        fluid: false,
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
    <div class="phone-frame">
      {/* Phone Content */}
      <div class="phone-content">
        {/* Video */}
        <div class="video-container">
          <video
            ref={videoElement}
            class="video-js"
            data-setup="{}"
          ></video>
        </div>

        {/* Form Overlay */}
        <div class="form-overlay">
          <SignupForm />
        </div>

        {/* Next Video Button */}
        <div
          class="video-next-button"
          onClick={() => props.onNextVideo && props.onNextVideo()}
        ></div>
      </div>
    </div>
  )
}

export default PhoneFrame