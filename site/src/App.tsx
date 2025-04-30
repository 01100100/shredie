import ParticleBackground from "./components/ParticleBackground"
import PhoneFrame from "./components/PhoneFrame"
import { createSignal } from "solid-js"

function App() {
  const videoIds = [
    "4dbbe5b1-be87-4ac5-988d-9397a7d1fd2f",
    "c6d181e3-ae4a-4471-bf2e-22a9825197b6",
    "1b9b45fe-bbc6-4764-b727-7b84955441d9"
  ]

  const [currentVideoIndex, setCurrentVideoIndex] = createSignal(0)

  const getNextVideoIndex = () => {
    return (currentVideoIndex() + 1) % videoIds.length
  }

  const handleNextVideo = () => {
    setCurrentVideoIndex(getNextVideoIndex())
  }

  const videoUrl = () => `https://vz-ecd0008c-2d0.b-cdn.net/${videoIds[currentVideoIndex()]}/play_720p.mp4`

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