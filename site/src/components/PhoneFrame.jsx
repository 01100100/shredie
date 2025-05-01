import { createSignal, createEffect, onMount, onCleanup } from "solid-js"
import SignupForm from "./signupForm"
import videojs from "video.js"
import "video.js/dist/video-js.css"

const PhoneFrame = (props) => {
  const [videoLoaded, setVideoLoaded] = createSignal(false)
  const [isTransitioning, setIsTransitioning] = createSignal(false)
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
        preload: "auto",
        fluid: true,
        html5: {
          hls: {
            overrideNative: true
          },
          nativeVideoTracks: false,
          nativeAudioTracks: false,
          nativeTextTracks: false
        },
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

      // Update video source if player exists
      if (player) {
        player.src({
          src: props.videoSrc,
          type: "application/x-mpegURL"
        });
        player.load();
      }
    }
  });

  const handleVideoChange = () => {
    if (isTransitioning()) return; // Prevent multiple clicks during transition
    setIsTransitioning(true);
    setTimeout(() => {
      props.onNextVideo && props.onNextVideo();
      setTimeout(() => {
        setIsTransitioning(false);
      }, 500);
    }, 500);
  }

  return (
    <div class="relative mx-auto float transform transition-all duration-500 ease-in-out hover:scale-[1.02]">
      {/* Phone frame */}
      <div class="relative mx-auto border-[14px] border-black rounded-[2.5rem] h-[600px] w-[300px] shadow-2xl overflow-hidden phone-shadow transition-all duration-300 ease-in-out">
        {/* Notch */}
        <div class="absolute top-0 inset-x-0 z-10">
          <div class="mx-auto h-6 w-20 bg-black rounded-b-3xl"></div>
        </div>

        {/* Screen content with video and sign up form overlay */}
        <div class="w-full h-full bg-gray-800 overflow-hidden relative screen-glow transition-all duration-300 ease-in-out">
          {videoSrc() ? (
            <>
              <div
                class="absolute inset-0 cursor-pointer"
                onClick={handleVideoChange}
                onTouchEnd={handleVideoChange}
              >
                <div
                  class={`w-full h-full transition-all duration-300 ease-in-out
                    ${videoLoaded() ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}
                    ${isTransitioning() ? 'opacity-0 scale-95' : ''}`}
                >
                  <video
                    ref={videoElement}
                    class="video-js vjs-tech w-full h-full object-cover"
                    data-setup="{}"
                  ></video>
                </div>

                {/* Screen glare effect */}
                <div class="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none"></div>
              </div>

              {/* Signup form overlay positioned at bottom of screen with consistent blur */}
              <div class="absolute bottom-0 left-0 right-0 p-4 z-20">
                <div class="w-full">
                  <SignupForm />
                </div>
              </div>
            </>
          ) : (
            <div class="flex items-center justify-center h-full text-white font-mono">
              <p>No video provided</p>
            </div>
          )}
        </div>
      </div>

      {/* Phone reflection/shadow effect */}
      <div class="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-[70%] h-[10px] bg-black/20 blur-md rounded-full"></div>
    </div>
  )
}

export default PhoneFrame