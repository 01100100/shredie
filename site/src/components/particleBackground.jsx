import { onMount, onCleanup } from "solid-js"

const ParticleBackground = (props) => {
  onMount(() => {
    // Canvas setup
    const canvas = createCanvas()
    const ctx = canvas.getContext("2d")
    const particles = []
    
    // Configuration
    const config = {
      maxParticles: 210,
      particleLifespan: 5000,
      particleSize: 2,
      colors: ["purple", "red", "blue", "orange", "gold", "plum"]
    }
    
    
    // Handle high-DPI displays
    const dpr = window.devicePixelRatio || 1
    let canvasWidth = window.innerWidth * dpr
    let canvasHeight = window.innerHeight * dpr
    
    setupCanvasSize(canvas, ctx, dpr)
    
    // Animation control
    let animationFrame
    
    // Start animation
    initializeParticles(particles, config.maxParticles)
    animate()
    
    // Event listeners
    window.addEventListener("resize", handleResize)
    
    // Cleanup
    onCleanup(() => {
      cancelAnimationFrame(animationFrame)
      window.removeEventListener("resize", handleResize)
      document.body.removeChild(canvas)
    })
    
    // Functions
    function createCanvas() {
      const canvas = document.createElement("canvas")
      canvas.style.position = "fixed"
      canvas.style.top = "0"
      canvas.style.left = "0"
      canvas.style.width = "100%"
      canvas.style.height = "100%"
      canvas.style.zIndex = "-1"
      document.body.appendChild(canvas)
      return canvas
    }
    
    function setupCanvasSize(canvas, ctx, dpr) {
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvasWidth = canvas.width
      canvasHeight = canvas.height
      ctx.scale(dpr, dpr)
    }
    
    function initializeParticles(particles, count) {
      while (particles.length < count) {
        particles.push(createParticle())
      }
    }
    
    function createParticle() {
      const x = (Math.random() * canvasWidth) / dpr
      const y = (Math.random() * canvasHeight) / dpr
      const color = config.colors[Math.floor(Math.random() * config.colors.length)]
      const vx = (Math.random() - 0.5) // Velocity in x direction
      const vy = (Math.random() - 0.5) // Velocity in y direction
      return { x, y, color, age: 0, vx, vy }
    }
    
    function updateParticles() {
      // Use a backward loop to safely remove elements
      for (let i = particles.length - 1; i >= 0; i--) {
        const particle = particles[i]
        particle.age++
        particle.x += particle.vx
        particle.y += particle.vy
        
        // Remove particles that are too old or outside the canvas
        if (particle.age > config.particleLifespan || 
            particle.x < 0 || particle.x > canvasWidth / dpr || 
            particle.y < 0 || particle.y > canvasHeight / dpr) {
          particles.splice(i, 1)
        }
      }
      
      // Add new particles as needed
      initializeParticles(particles, config.maxParticles)
    }
    
    function drawParticles() {
      ctx.clearRect(0, 0, canvasWidth, canvasHeight)
      
      particles.forEach(particle => {
        ctx.fillStyle = particle.color
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, config.particleSize, 0, Math.PI * 2)
        ctx.fill()
      })
    }
    
    function animate() {
      updateParticles()
      drawParticles()
      animationFrame = requestAnimationFrame(animate)
    }
    
    function handleResize() {
      // Store the relative positions of particles (as percentages of viewport)
      const oldWidth = canvasWidth / dpr
      const oldHeight = canvasHeight / dpr
      
      // Update canvas size
      setupCanvasSize(canvas, ctx, dpr)
      
      // Adjust existing particle positions to maintain relative positions
      particles.forEach(particle => {
        // Convert from absolute position to percentage of viewport
        const relativeX = particle.x / oldWidth
        const relativeY = particle.y / oldHeight
        
        // Apply percentage to new viewport size
        particle.x = relativeX * (canvasWidth / dpr)
        particle.y = relativeY * (canvasHeight / dpr)
      })
    }
  })

  return <>{props.children}</>
}

export default ParticleBackground