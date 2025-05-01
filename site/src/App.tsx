import ParticleBackground from "./components/ParticleBackground"
import PhoneFrame from "./components/PhoneFrame"
import { createSignal } from "solid-js"

function App() {
  // Using multiple HLS video sources instead of MP4 videos
  const videoUrls = [
    "https://vz-ecd0008c-2d0.b-cdn.net/918d58b5-4deb-452a-bec2-7062d8b51b7d/playlist.m3u8",
    "https://vz-ecd0008c-2d0.b-cdn.net/11840840-106c-4e4f-9e2d-9b757876f1df/playlist.m3u8",
  ]

  const [currentVideoIndex, setCurrentVideoIndex] = createSignal(0)

  const getNextVideoIndex = () => {
    return (currentVideoIndex() + 1) % videoUrls.length
  }

  const handleNextVideo = () => {
    setCurrentVideoIndex(getNextVideoIndex())
  }

  const videoUrl = () => videoUrls[currentVideoIndex()]

  return (
    <ParticleBackground>
      <div class="font-mono min-h-screen flex flex-col items-center justify-center p-2 sm:p-4 md:p-8">
        <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold text-white mb-2 sm:mb-4">
          <span class="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">Shredie</span>
        </h1>
        <p class="text-sm sm:text-base md:text-lg lg:text-xl text-black/80 max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-2xl mb-4 sm:mb-6 md:mb-8 text-center">
          Plan, Navigate, and enjoy life
        </p>

        <div class="w-full max-w-[300px] mx-auto">
          <PhoneFrame videoSrc={videoUrl()} onNextVideo={handleNextVideo} />
        </div>

        <footer class="mt-8 sm:mt-12 md:mt-16 text-white/60 text-xs sm:text-sm">
          © {new Date().getFullYear()} Shredie. Built for riders, by riders.
        </footer>
      </div>
    </ParticleBackground>
  )
}

export default App