<template>
  <canvas ref="canvasRef" class="particles-canvas" aria-hidden="true" />
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const canvasRef = ref<HTMLCanvasElement | null>(null)

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  alpha: number
  color: string
  twinkleSpeed: number
  twinklePhase: number
}

let animId: number
let ctx: CanvasRenderingContext2D | null = null
let particles: Particle[] = []
let mouseX = 0
let mouseY = 0
let width = 0
let height = 0

const COLORS = ['#00d4ff', '#7b2fff', '#00ff88', '#ffffff', '#4488ff']

function createParticle(): Particle {
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.3,
    vy: (Math.random() - 0.5) * 0.3,
    size: Math.random() * 1.5 + 0.5,
    alpha: Math.random() * 0.6 + 0.2,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    twinkleSpeed: Math.random() * 0.02 + 0.005,
    twinklePhase: Math.random() * Math.PI * 2,
  }
}

function initParticles() {
  const count = Math.floor((width * height) / 8000)
  particles = Array.from({ length: count }, createParticle)
}

function resize() {
  const canvas = canvasRef.value
  if (!canvas) return
  width = canvas.width = window.innerWidth
  height = canvas.height = window.innerHeight
  initParticles()
}

function drawLine(p1: Particle, p2: Particle, dist: number) {
  if (!ctx) return
  const maxDist = 120
  const opacity = (1 - dist / maxDist) * 0.15
  ctx.beginPath()
  ctx.moveTo(p1.x, p1.y)
  ctx.lineTo(p2.x, p2.y)
  ctx.strokeStyle = `rgba(0, 212, 255, ${opacity})`
  ctx.lineWidth = 0.5
  ctx.stroke()
}

function animate() {
  if (!ctx) return
  ctx.clearRect(0, 0, width, height)

  // Subtle background gradient
  const grad = ctx.createRadialGradient(width * 0.5, height * 0.5, 0, width * 0.5, height * 0.5, width * 0.8)
  grad.addColorStop(0, 'rgba(10, 20, 60, 0.15)')
  grad.addColorStop(1, 'rgba(0, 0, 0, 0)')
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, width, height)

  // Mouse glow
  const mouseGrad = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 200)
  mouseGrad.addColorStop(0, 'rgba(0, 212, 255, 0.06)')
  mouseGrad.addColorStop(1, 'rgba(0, 212, 255, 0)')
  ctx.fillStyle = mouseGrad
  ctx.fillRect(0, 0, width, height)

  const maxDist = 120

  for (let i = 0; i < particles.length; i++) {
    const p = particles[i]

    // Update
    p.x += p.vx
    p.y += p.vy
    p.twinklePhase += p.twinkleSpeed

    // Mouse repulsion (subtle)
    const dx = p.x - mouseX
    const dy = p.y - mouseY
    const d = Math.sqrt(dx * dx + dy * dy)
    if (d < 100) {
      p.vx += dx / d * 0.02
      p.vy += dy / d * 0.02
    }

    // Friction
    p.vx *= 0.995
    p.vy *= 0.995

    // Wrap
    if (p.x < 0) p.x = width
    if (p.x > width) p.x = 0
    if (p.y < 0) p.y = height
    if (p.y > height) p.y = 0

    const alpha = p.alpha * (0.7 + 0.3 * Math.sin(p.twinklePhase))

    // Draw particle
    ctx.beginPath()
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
    ctx.fillStyle = p.color.replace(')', `, ${alpha})`).replace('rgb', 'rgba').replace('#', 'rgba(').replace('rgba(', p.color.startsWith('#') ? '' : 'rgba(')

    // Simpler approach
    ctx.globalAlpha = alpha
    ctx.fillStyle = p.color
    ctx.fill()
    ctx.globalAlpha = 1

    // Connect nearby particles
    for (let j = i + 1; j < particles.length; j++) {
      const p2 = particles[j]
      const dx2 = p.x - p2.x
      const dy2 = p.y - p2.y
      const dist = Math.sqrt(dx2 * dx2 + dy2 * dy2)
      if (dist < maxDist) {
        drawLine(p, p2, dist)
      }
    }
  }

  animId = requestAnimationFrame(animate)
}

function onMouseMove(e: MouseEvent) {
  mouseX = e.clientX
  mouseY = e.clientY
}

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) return
  ctx = canvas.getContext('2d')
  resize()
  animate()
  window.addEventListener('resize', resize)
  window.addEventListener('mousemove', onMouseMove)
})

onBeforeUnmount(() => {
  cancelAnimationFrame(animId)
  window.removeEventListener('resize', resize)
  window.removeEventListener('mousemove', onMouseMove)
})
</script>

<style scoped>
.particles-canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
}
</style>
