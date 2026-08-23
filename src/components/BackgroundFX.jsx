import { useEffect, useRef } from 'react'
import './BackgroundFX.css'

const NOTE_GLYPHS = ['♪', '♫', '♬', '♩']
const FOLLOWER_COUNT = 5
const STAR_COUNT = 140
const GLITTER_COUNT = 30

function rand(min, max) {
  return Math.random() * (max - min) + min
}

function BackgroundFX() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    let width = 0
    let height = 0

    const resize = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    const stars = Array.from({ length: STAR_COUNT }, () => ({
      x: rand(0, width),
      y: rand(0, height),
      r: rand(0.8, 2.4),
      baseAlpha: rand(0.5, 1),
      phase: rand(0, Math.PI * 2),
      speed: rand(0.5, 1.2),
      driftX: rand(-0.04, 0.04),
      driftY: rand(0.015, 0.08),
      gold: Math.random() < 0.3,
    }))

    const glitter = Array.from({ length: GLITTER_COUNT }, () => ({
      x: rand(0, width),
      y: rand(-height, height),
      r: rand(2.2, 4),
      fallSpeed: rand(0.35, 1.1),
      sway: rand(0.3, 1),
      swayAmt: rand(6, 22),
      swayPhase: rand(0, Math.PI * 2),
      twinkleSpeed: rand(0.8, 1.8),
      twinklePhase: rand(0, Math.PI * 2),
      baseAlpha: rand(0.55, 0.9),
    }))

    const notes = []
    const spawnNote = () => {
      notes.push({
        x: rand(0, width),
        y: height + 20,
        size: rand(16, 30),
        glyph: NOTE_GLYPHS[Math.floor(rand(0, NOTE_GLYPHS.length))],
        speed: rand(0.35, 0.8),
        sway: rand(0.4, 1.2),
        swayPhase: rand(0, Math.PI * 2),
        rotation: rand(-0.3, 0.3),
        alpha: 0,
        maxAlpha: rand(0.4, 0.65),
        life: 0,
      })
    }

    const shootingStars = []
    let nextShootIn = rand(2500, 5000)

    const mouse = { x: width / 2, y: height / 2, active: false }
    const followers = Array.from({ length: FOLLOWER_COUNT }, () => ({
      x: mouse.x,
      y: mouse.y,
      glyph: NOTE_GLYPHS[Math.floor(rand(0, NOTE_GLYPHS.length))],
    }))

    const sparkles = []
    let lastSparkleX = mouse.x
    let lastSparkleY = mouse.y

    const handleMouseMove = (e) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
      mouse.active = true
      const dx = mouse.x - lastSparkleX
      const dy = mouse.y - lastSparkleY
      if (Math.hypot(dx, dy) > 18) {
        lastSparkleX = mouse.x
        lastSparkleY = mouse.y
        sparkles.push({
          x: mouse.x + rand(-6, 6),
          y: mouse.y + rand(-6, 6),
          r: rand(1.4, 2.8),
          vx: rand(-0.3, 0.3),
          vy: rand(-0.6, -0.1),
          life: 0,
          maxLife: rand(500, 900),
          alpha: rand(0.6, 0.9),
        })
      }
    }
    const handleMouseLeave = () => {
      mouse.active = false
    }
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseout', handleMouseLeave)

    let lastTime = performance.now()
    let rafId

    const tick = (now) => {
      const dt = Math.min(now - lastTime, 48)
      lastTime = now
      ctx.clearRect(0, 0, width, height)

      for (const s of stars) {
        s.x += s.driftX
        s.y += s.driftY
        if (s.y > height + 4) { s.y = -4; s.x = rand(0, width) }
        if (s.x < -4) s.x = width + 4
        if (s.x > width + 4) s.x = -4
        const twinkle = 0.5 + 0.5 * Math.sin(now * 0.001 * s.speed + s.phase)
        const alpha = s.baseAlpha * twinkle
        ctx.beginPath()
        ctx.fillStyle = s.gold
          ? `rgba(255, 214, 74, ${alpha.toFixed(3)})`
          : `rgba(255, 255, 255, ${alpha.toFixed(3)})`
        ctx.shadowColor = s.gold ? 'rgba(255, 183, 3, 0.9)' : 'rgba(255, 255, 255, 0.9)'
        ctx.shadowBlur = s.r * 3.5
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.shadowBlur = 0

      for (const g of glitter) {
        g.y += g.fallSpeed * (dt / 16)
        g.x += Math.sin(g.y * 0.01 * g.sway + g.swayPhase) * (g.swayAmt * 0.01)
        if (g.y > height + 4) { g.y = -4; g.x = rand(0, width) }
        const twinkle = 0.5 + 0.5 * Math.sin(now * 0.001 * g.twinkleSpeed + g.twinklePhase)
        const alpha = g.baseAlpha * twinkle
        ctx.beginPath()
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha.toFixed(3)})`
        ctx.shadowColor = 'rgba(255, 255, 255, 0.8)'
        ctx.shadowBlur = g.r * 2
        ctx.arc(g.x, g.y, g.r, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.shadowBlur = 0

      nextShootIn -= dt
      if (nextShootIn <= 0) {
        nextShootIn = rand(3000, 6500)
        shootingStars.push({
          x: rand(width * 0.1, width * 0.9),
          y: rand(0, height * 0.3),
          vx: rand(4, 7),
          vy: rand(2, 3.5),
          life: 0,
          maxLife: rand(500, 800),
        })
      }
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const sh = shootingStars[i]
        sh.life += dt
        sh.x += sh.vx * (dt / 16)
        sh.y += sh.vy * (dt / 16)
        const t = sh.life / sh.maxLife
        if (t >= 1) { shootingStars.splice(i, 1); continue }
        const alpha = 1 - t
        ctx.beginPath()
        ctx.strokeStyle = `rgba(255, 255, 255, ${(alpha * 0.85).toFixed(3)})`
        ctx.lineWidth = 2
        ctx.moveTo(sh.x, sh.y)
        ctx.lineTo(sh.x - sh.vx * 6, sh.y - sh.vy * 6)
        ctx.stroke()
      }

      if (Math.random() < 0.02) spawnNote()
      ctx.textBaseline = 'middle'
      ctx.textAlign = 'center'
      for (let i = notes.length - 1; i >= 0; i--) {
        const n = notes[i]
        n.life += dt
        n.y -= n.speed * (dt / 16)
        n.x += Math.sin(n.life * 0.001 * n.sway + n.swayPhase) * 0.4
        n.alpha += (n.maxAlpha - n.alpha) * 0.02
        if (n.y < -40) { notes.splice(i, 1); continue }
        ctx.save()
        ctx.translate(n.x, n.y)
        ctx.rotate(n.rotation)
        ctx.font = `${n.size}px sans-serif`
        ctx.fillStyle = `rgba(29, 53, 87, ${n.alpha.toFixed(3)})`
        ctx.fillText(n.glyph, 0, 0)
        ctx.restore()
      }

      if (mouse.active) {
        let targetX = mouse.x
        let targetY = mouse.y
        for (const f of followers) {
          f.x += (targetX - f.x) * 0.28
          f.y += (targetY - f.y) * 0.28
          targetX = f.x
          targetY = f.y
        }
        for (let i = followers.length - 1; i >= 0; i--) {
          const f = followers[i]
          const t = i / followers.length
          const size = 22 - t * 12
          const alpha = 0.85 - t * 0.55
          ctx.save()
          ctx.translate(f.x, f.y)
          ctx.shadowColor = 'rgba(255, 183, 3, 0.9)'
          ctx.shadowBlur = 8
          ctx.font = `${size}px sans-serif`
          ctx.fillStyle = `rgba(255, 183, 3, ${alpha.toFixed(3)})`
          ctx.fillText(f.glyph, 0, 0)
          ctx.restore()
        }
        ctx.shadowBlur = 0
      }

      for (let i = sparkles.length - 1; i >= 0; i--) {
        const p = sparkles[i]
        p.life += dt
        if (p.life >= p.maxLife) { sparkles.splice(i, 1); continue }
        p.x += p.vx * (dt / 16)
        p.y += p.vy * (dt / 16)
        const t = p.life / p.maxLife
        const alpha = p.alpha * (1 - t)
        ctx.beginPath()
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha.toFixed(3)})`
        ctx.shadowColor = 'rgba(255, 255, 255, 0.85)'
        ctx.shadowBlur = 6
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.shadowBlur = 0

      rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseout', handleMouseLeave)
    }
  }, [])

  return <canvas ref={canvasRef} className="bgfx-canvas" aria-hidden="true" />
}

export default BackgroundFX
