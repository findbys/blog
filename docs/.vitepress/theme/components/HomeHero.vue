<template>
  <section class="home-hero">
    <!-- Three.js Canvas -->
    <canvas ref="threeCanvas" class="three-canvas" />

    <div class="hero-content">
      <!-- Avatar -->
      <div class="hero-avatar animate-float">
        <div class="avatar-ring" />
        <div class="avatar-inner">
          <svg width="60" height="60" viewBox="0 0 24 24" fill="none">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="url(#ag1)" stroke-width="1.5" stroke-linecap="round"/>
            <circle cx="12" cy="7" r="4" stroke="url(#ag1)" stroke-width="1.5"/>
            <defs>
              <linearGradient id="ag1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#00d4ff"/>
                <stop offset="100%" stop-color="#7b2fff"/>
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      <!-- Greeting -->
      <div class="hero-greeting">
        <span class="greeting-badge">
          <span class="dot" />
          <!-- Available for opportunities -->
          Demonstrating the Value of Visual Interaction
        </span>
      </div>

      <!-- Name & Title -->
      <h1 class="hero-name">
        <span class="name-zh">肖青林</span>
        <span class="name-separator"> · </span>
        <span class="name-en">XiaoQingLin</span>
      </h1>

      <div class="hero-title">
        <span class="title-prefix">Senior </span>
        <span class="typing-text" ref="typingRef">{{ displayText }}</span>
        <span class="cursor" :class="{ blink: !isTyping }">|</span>
      </div>

      <p class="hero-desc">
        注重效率与团队协作 · 思维严谨 · 持续学习新技术
      </p>

      <!-- Tech Icons -->
      <div class="hero-tech-stack">
        <span v-for="tech in techStack" :key="tech.name" class="tech-pill" :style="{ '--pill-color': tech.color }">
          <span class="tech-icon" v-html="tech.icon" />
          {{ tech.name }}
        </span>
      </div>

      <!-- CTA Buttons -->
      <div class="hero-ctas">
        <a href="/skills/" class="btn-primary">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
          </svg>
          查看技能
        </a>
        <a href="/blog/" class="btn-secondary">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
          </svg>
          技术博客
        </a>
        <!-- <a href="/about" class="btn-ghost">关于我 →</a> -->
      </div>

      <!-- Stats -->
      <div class="hero-stats">
        <div class="stat-item" v-for="s in stats" :key="s.label">
          <div class="stat-num">{{ s.value }}</div>
          <div class="stat-label">{{ s.label }}</div>
        </div>
      </div>
    </div>

    <!-- Scroll Hint -->
    <div class="scroll-hint">
      <div class="scroll-line" />
      <span>Scroll</span>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const threeCanvas = ref<HTMLCanvasElement | null>(null)
const typingRef = ref<HTMLSpanElement | null>(null)
const displayText = ref('')
const isTyping = ref(true)

const titles = [
  'Full Stack Engineer',
  'Vue3 / React Developer',
  'Flutter Expert',
  'Frontend Architect',
]

let titleIdx = 0
let charIdx = 0
let isDeleting = false
let typingTimer: ReturnType<typeof setTimeout>

function typeEffect() {
  const current = titles[titleIdx]
  if (!isDeleting) {
    displayText.value = current.slice(0, ++charIdx)
    if (charIdx === current.length) {
      isDeleting = true
      isTyping.value = false
      typingTimer = setTimeout(typeEffect, 2000)
      return
    }
  } else {
    displayText.value = current.slice(0, --charIdx)
    if (charIdx === 0) {
      isDeleting = false
      titleIdx = (titleIdx + 1) % titles.length
    }
  }
  isTyping.value = true
  typingTimer = setTimeout(typeEffect, isDeleting ? 60 : 100)
}

// Three.js inspired geometric animation using Canvas 2D
let animId: number
let ctx2: CanvasRenderingContext2D | null = null

interface GeoPt { x: number; y: number; vx: number; vy: number }
let geoPts: GeoPt[] = []

function initGeo(canvas: HTMLCanvasElement) {
  ctx2 = canvas.getContext('2d')
  canvas.width = canvas.offsetWidth
  canvas.height = canvas.offsetHeight
  geoPts = Array.from({ length: 18 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 0.4,
    vy: (Math.random() - 0.5) * 0.4,
  }))
}

function drawGeo() {
  if (!ctx2 || !threeCanvas.value) return
  const { width, height } = threeCanvas.value
  ctx2.clearRect(0, 0, width, height)

  geoPts.forEach(p => {
    p.x += p.vx; p.y += p.vy
    if (p.x < 0 || p.x > width) p.vx *= -1
    if (p.y < 0 || p.y > height) p.vy *= -1
  })

  // Draw icosahedron-style wireframe connections
  for (let i = 0; i < geoPts.length; i++) {
    for (let j = i + 1; j < geoPts.length; j++) {
      const dx = geoPts[i].x - geoPts[j].x
      const dy = geoPts[i].y - geoPts[j].y
      const d = Math.sqrt(dx * dx + dy * dy)
      if (d < 160) {
        const alpha = (1 - d / 160) * 0.35
        ctx2.beginPath()
        ctx2.moveTo(geoPts[i].x, geoPts[i].y)
        ctx2.lineTo(geoPts[j].x, geoPts[j].y)
        const grad = ctx2.createLinearGradient(geoPts[i].x, geoPts[i].y, geoPts[j].x, geoPts[j].y)
        grad.addColorStop(0, `rgba(0, 212, 255, ${alpha})`)
        grad.addColorStop(1, `rgba(123, 47, 255, ${alpha})`)
        ctx2.strokeStyle = grad
        ctx2.lineWidth = 0.8
        ctx2.stroke()
      }
    }
    // Node dots
    ctx2.beginPath()
    ctx2.arc(geoPts[i].x, geoPts[i].y, 2, 0, Math.PI * 2)
    ctx2.fillStyle = 'rgba(0, 212, 255, 0.6)'
    ctx2.fill()
  }

  animId = requestAnimationFrame(drawGeo)
}

function onResize() {
  if (threeCanvas.value) {
    threeCanvas.value.width = threeCanvas.value.offsetWidth
    threeCanvas.value.height = threeCanvas.value.offsetHeight
  }
}

const techStack = [
  { name: 'Vue3', color: '#42b883', icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="#42b883"><path d="M2 3h3.5L12 15l6.5-12H22L12 21z"/></svg>' },
  { name: 'React', color: '#61dafb', icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="#61dafb"><circle cx="12" cy="12" r="2.5"/><ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61dafb" stroke-width="1.5" fill="none"/><ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61dafb" stroke-width="1.5" fill="none" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61dafb" stroke-width="1.5" fill="none" transform="rotate(120 12 12)"/></svg>' },
  { name: 'TypeScript', color: '#3178c6', icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="#3178c6"><rect width="24" height="24" rx="3"/><path d="M13.5 15.5v1.4c.3.16.67.3 1.1.38.44.1.9.14 1.4.14.48 0 .94-.05 1.37-.16.43-.1.8-.27 1.12-.5.31-.22.56-.52.74-.88.18-.36.27-.8.27-1.33 0-.38-.06-.72-.17-1-.12-.29-.28-.55-.5-.77-.22-.22-.48-.43-.8-.6-.32-.19-.67-.36-1.07-.52-.29-.12-.54-.23-.75-.34a2.7 2.7 0 0 1-.53-.34c-.14-.12-.25-.25-.32-.4a1.1 1.1 0 0 1-.1-.5c0-.17.03-.33.1-.47.07-.13.17-.25.3-.34.12-.1.28-.17.45-.22.18-.05.37-.08.59-.08.15 0 .31.01.47.04.17.03.33.07.48.13.16.06.3.14.44.23.13.1.25.2.34.32V11c-.27-.1-.56-.18-.87-.23-.31-.05-.65-.08-1-.08-.47 0-.92.05-1.34.16-.42.1-.79.27-1.1.5-.31.22-.55.5-.73.85-.18.35-.27.76-.27 1.24 0 .62.18 1.14.53 1.57.35.43.9.8 1.63 1.1.32.13.6.25.85.37.25.12.46.25.63.38.17.14.3.29.4.46.08.17.13.36.13.58 0 .18-.03.35-.1.5a1.1 1.1 0 0 1-.3.38c-.13.1-.3.18-.5.24-.2.06-.43.08-.68.08-.45 0-.88-.08-1.29-.25-.4-.17-.76-.42-1.06-.74zm-3.5-4H8V10H4v1.5h2V20h2v-8.5h2V10z" fill="white"/></svg>' },
  { name: 'Flutter', color: '#54c5f8', icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="#54c5f8"><path d="M14.31 0L4 10.31l3.19 3.19L20.69 0zm0 11.38l-3.19 3.19 3.19 3.19 3.19-3.19zm-3.19 6.37l3.19 3.19-3.19 3.19L7.94 21l3.18-3.25z"/></svg>' },
  { name: 'Node.js', color: '#68a063', icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="#68a063"><path d="M12 1.85c-.27 0-.55.07-.78.2L3.78 6.35c-.48.28-.78.8-.78 1.36v9.58c0 .56.3 1.08.78 1.36l7.44 4.3c.23.13.5.2.78.2s.55-.07.78-.2l7.44-4.3c.48-.28.78-.8.78-1.36V7.71c0-.56-.3-1.08-.78-1.36L12.78 2.05c-.23-.13-.5-.2-.78-.2z"/></svg>' },
  { name: 'Vite', color: '#bd34fe', icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M21 3L13.7 20.3l-2.2-9.3L3 9.3z" fill="#bd34fe"/><path d="M13.7 20.3L11.5 11 3 9.3z" fill="#ffbd44"/></svg>' },
]

const stats = [
  { value: '5+', label: '年经验' },
  { value: '15+', label: '技术栈' },
  { value: '50+', label: '项目经验' },
  { value: '3', label: '端开发' },
]

onMounted(() => {
  typeEffect()
  if (threeCanvas.value) {
    initGeo(threeCanvas.value)
    drawGeo()
  }
  window.addEventListener('resize', onResize)
})

onBeforeUnmount(() => {
  clearTimeout(typingTimer)
  cancelAnimationFrame(animId)
  window.removeEventListener('resize', onResize)
})
</script>

<style scoped>
.home-hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6rem 2rem 4rem;
  overflow: hidden;
  z-index: 1;
}

.three-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  opacity: 0.5;
  pointer-events: none;
}

.hero-content {
  position: relative;
  z-index: 2;
  text-align: center;
  max-width: 760px;
  animation: fadeInUp 0.8s ease both;
}

/* Avatar */
.hero-avatar {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.avatar-ring {
  position: absolute;
  inset: -8px;
  border-radius: 50%;
  background: conic-gradient(from 0deg, #00d4ff, #7b2fff, #00ff88, #00d4ff);
  animation: spin 4s linear infinite;
  opacity: 0.7;
}

.avatar-inner {
  position: relative;
  width: 90px;
  height: 90px;
  background: var(--c-bg-elevated);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid rgba(0, 212, 255, 0.3);
  z-index: 1;
}

/* Badge */
.hero-greeting {
  margin-bottom: 1rem;
}
.greeting-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: rgba(0, 255, 136, 0.1);
  border: 1px solid rgba(0, 255, 136, 0.25);
  color: #00ff88;
  padding: 4px 14px;
  border-radius: 99px;
  font-size: 0.8rem;
  font-weight: 500;
}
.dot {
  width: 7px;
  height: 7px;
  background: #00ff88;
  border-radius: 50%;
  animation: glowPulse 2s ease infinite;
  box-shadow: 0 0 8px #00ff88;
}

/* Name */
.hero-name {
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 800;
  margin: 0.5rem 0;
  line-height: 1.15;
}
.name-zh {
  background: linear-gradient(135deg, #00d4ff 0%, #7b2fff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.name-separator { color: rgba(255,255,255,0.2); -webkit-text-fill-color: rgba(255,255,255,0.2); }
.name-en {
  color: var(--c-text-secondary);
  -webkit-text-fill-color: var(--c-text-secondary);
  font-size: 0.65em;
  font-weight: 600;
  letter-spacing: 0.05em;
}

/* Typing */
.hero-title {
  font-size: clamp(1.1rem, 2.5vw, 1.5rem);
  color: var(--c-text-secondary);
  margin: 0.5rem 0 1rem;
  font-weight: 500;
  height: 2em;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
}
.title-prefix { color: var(--c-text-muted); }
.typing-text {
  color: var(--c-brand-primary);
  font-weight: 700;
}
.cursor {
  color: var(--c-brand-primary);
  font-weight: 300;
}
.cursor.blink { animation: blink 1s step-end infinite; }

/* Desc */
.hero-desc {
  color: var(--c-text-muted);
  font-size: 0.9rem;
  margin-bottom: 1.75rem;
  letter-spacing: 0.05em;
}

/* Tech pills */
.hero-tech-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
  margin-bottom: 2rem;
}
.tech-pill {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  color: var(--c-text-secondary);
  padding: 4px 12px;
  border-radius: 99px;
  font-size: 0.8rem;
  transition: all 0.2s ease;
  cursor: default;
}
.tech-pill:hover {
  background: rgba(var(--pill-color), 0.1);
  border-color: var(--pill-color);
  color: var(--pill-color);
  box-shadow: 0 0 12px color-mix(in srgb, var(--pill-color) 30%, transparent);
}
.tech-icon {
  display: flex;
  align-items: center;
}

/* CTAs */
.hero-ctas {
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 2.5rem;
}

.btn-primary, .btn-secondary, .btn-ghost {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 10px 24px;
  border-radius: 99px;
  font-size: 0.9rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.25s ease;
  cursor: pointer;
  border: none;
}
.btn-primary {
  background: linear-gradient(135deg, #00d4ff, #7b2fff);
  color: #fff;
  box-shadow: 0 4px 20px rgba(0, 212, 255, 0.35);
}
.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(0, 212, 255, 0.5);
}
.btn-secondary {
  background: rgba(0, 212, 255, 0.08);
  border: 1px solid rgba(0, 212, 255, 0.3);
  color: var(--c-brand-primary);
}
.btn-secondary:hover {
  background: rgba(0, 212, 255, 0.15);
  transform: translateY(-2px);
  box-shadow: 0 4px 20px rgba(0, 212, 255, 0.2);
}
.btn-ghost {
  color: var(--c-text-muted);
  background: transparent;
  font-size: 0.85rem;
}
.btn-ghost:hover { color: var(--c-text-primary); }

/* Stats */
.hero-stats {
  display: flex;
  gap: 2rem;
  justify-content: center;
  flex-wrap: wrap;
}
.stat-item {
  text-align: center;
  padding: 0 1rem;
  position: relative;
}
.stat-item:not(:last-child)::after {
  content: '';
  position: absolute;
  right: 0;
  top: 20%;
  height: 60%;
  width: 1px;
  background: var(--c-border-subtle);
}
.stat-num {
  font-size: 1.75rem;
  font-weight: 800;
  background: var(--g-brand);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.stat-label {
  font-size: 0.78rem;
  color: var(--c-text-muted);
  margin-top: 2px;
}

/* Scroll hint */
.scroll-hint {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  color: var(--c-text-muted);
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  animation: fadeInUp 1s 1s ease both;
}
.scroll-line {
  width: 1px;
  height: 40px;
  background: linear-gradient(to bottom, var(--c-brand-primary), transparent);
  animation: float 2s ease-in-out infinite;
}

/* Animations */
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}
@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
@keyframes glowPulse {
  0%, 100% { box-shadow: 0 0 5px #00ff88; }
  50% { box-shadow: 0 0 15px #00ff88, 0 0 25px rgba(0,255,136,0.3); }
}
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@media (max-width: 640px) {
  .home-hero { padding: 5rem 1.25rem 4rem; }
  .hero-stats { gap: 1rem; }
  .stat-item { padding: 0 0.5rem; }
  .stat-item::after { display: none; }
}
</style>
