import { createSignal, onMount } from "solid-js"
import SignupForm from "./signupForm"

const PhoneFrame = (props) => {
  const [videoLoaded, setVideoLoaded] = createSignal(false)

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
          {props.videoSrc ? (
            <>
              <div class="absolute inset-0">
                <video
                  class={`w-full h-full object-cover transition-opacity duration-700 ease-in-out ${videoLoaded() ? 'opacity-100' : 'opacity-0'}`}
                  autoplay
                  loop
                  muted
                  playsInLine
                  onLoadedData={() => setVideoLoaded(true)}
                  src={props.videoSrc}
                />


                {/* Screen glare effect */}
                <div class="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none transition-opacity duration-500 ease-in-out"></div>
              </div>

              {/* Signup form overlay positioned at bottom of screen with consistent blur */}
              <div class="absolute bottom-0 left-0 right-0 p-4 z-20 transition-all duration-300 ease-in-out backdrop-blur-none">
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
      <div class="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-[70%] h-[10px] bg-black/20 blur-md rounded-full transition-all duration-300 ease-in-out"></div>
    </div>
  )
}

export default PhoneFrame