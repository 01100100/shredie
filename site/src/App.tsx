import ParticleBackground from "./components/ParticleBackground"
import PhoneFrame from "./components/PhoneFrame"

function App() {
  return (
    <ParticleBackground>
      <div class="font-mono min-h-screen flex flex-col items-center justify-center p-2">
        <h1 class="text-5xl md:text-7xl font-extrabold text-white mb-4">
          <span class="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">Shredie</span>
        </h1>
        <p class="text-xl text-black/80 max-w-2xl mb-8 text-center">
          Plan, Navigate, and enjoy life
        </p>

        <PhoneFrame videoSrc="https://vz-ecd0008c-2d0.b-cdn.net/1b9b45fe-bbc6-4764-b727-7b84955441d9/play_720p.mp4" />

        <footer class="mt-16 text-white/60 text-sm">
          © {new Date().getFullYear()} Shredie. Built for riders, by riders.
        </footer>
      </div>
    </ParticleBackground>
  )
}

export default App