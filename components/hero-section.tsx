"use client"

import { useEffect, useState, useRef, useMemo } from "react"
import { cn } from "@/lib/utils"
import { useLocale } from "./locale-provider"
import { t } from "@/lib/i18n"

export function HeroSection() {
  const { locale } = useLocale()
  const [currentPhrase, setCurrentPhrase] = useState(0)
  const [displayText, setDisplayText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [mounted, setMounted] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const phrases = useMemo(() => [
    t(locale, "hero.slogan1"),
    t(locale, "hero.slogan2"),
  ], [locale])

  // Reset typing when locale changes
  useEffect(() => {
    setCurrentPhrase(0)
    setDisplayText("")
    setIsDeleting(false)
  }, [locale])

  // Typing effect for slogan
  useEffect(() => {
    const targetText = phrases[currentPhrase]
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (displayText.length < targetText.length) {
            setDisplayText(targetText.slice(0, displayText.length + 1))
          } else {
            setTimeout(() => setIsDeleting(true), 2500)
          }
        } else {
          if (displayText.length > 0) {
            setDisplayText(displayText.slice(0, -1))
          } else {
            setIsDeleting(false)
            setCurrentPhrase((prev) => (prev + 1) % phrases.length)
          }
        }
      },
      isDeleting ? 40 : 80,
    )
    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, currentPhrase, phrases])

  // Floating particles animation
  useEffect(() => {
    setMounted(true)
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId: number
    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
      opacity: number
      life: number
      maxLife: number
    }> = []

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = canvas.offsetWidth * dpr
      canvas.height = canvas.offsetHeight * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const createParticle = () => {
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 0.5,
        opacity: 0,
        life: 0,
        maxLife: Math.random() * 200 + 100,
      }
    }

    for (let i = 0; i < 40; i++) {
      const p = createParticle()
      p.life = Math.random() * p.maxLife
      p.opacity = Math.random() * 0.5
      particles.push(p)
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)

      const style = getComputedStyle(document.documentElement)
      const primaryColor = style.getPropertyValue("--primary").trim()

      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        p.life++

        const lifeRatio = p.life / p.maxLife
        if (lifeRatio < 0.1) {
          p.opacity = lifeRatio / 0.1 * 0.4
        } else if (lifeRatio > 0.9) {
          p.opacity = (1 - lifeRatio) / 0.1 * 0.4
        } else {
          p.opacity = 0.4
        }

        if (p.life >= p.maxLife) {
          Object.assign(p, createParticle())
        }

        if (p.x < 0) p.x = canvas.offsetWidth
        if (p.x > canvas.offsetWidth) p.x = 0
        if (p.y < 0) p.y = canvas.offsetHeight
        if (p.y > canvas.offsetHeight) p.y = 0

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = primaryColor
        ctx.globalAlpha = p.opacity
        ctx.fill()
      }

      ctx.globalAlpha = 0.06
      ctx.strokeStyle = primaryColor
      ctx.lineWidth = 0.5
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 120) {
            ctx.globalAlpha = 0.06 * (1 - dist / 120)
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }

      ctx.globalAlpha = 1
      animationId = requestAnimationFrame(animate)
    }

    resize()
    animate()
    window.addEventListener("resize", resize)

    return () => {
      window.removeEventListener("resize", resize)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--glow-color)_0%,_transparent_70%)]" />

      <div className={cn(
        "relative z-10 text-center px-4 transition-all duration-1000",
        mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
      )}>
        <div className="space-y-6 sm:space-y-8 animate-fade-in-up">
          <h1 className="text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tighter leading-none">
            <span className="block text-foreground">
              Nook
            </span>
            <span className="block bg-gradient-to-l from-primary/60 to-accent text-transparent bg-clip-text mt-1 sm:mt-2">
              CraftLab
            </span>
          </h1>

          <div className="h-8 sm:h-10 flex items-center justify-center">
            <p className="text-sm sm:text-base lg:text-lg tracking-[0.2em] sm:tracking-[0.3em] uppercase text-muted-foreground">
              {displayText}
              <span className="typing-cursor" />
            </p>
          </div>

          <p className="text-xs sm:text-sm text-muted-foreground/60 tracking-wider max-w-md mx-auto animate-fade-in stagger-3">
            {t(locale, "hero.subtitle")}
          </p>
        </div>
      </div>

      <div className="absolute top-6 left-6 text-[10px] text-muted-foreground/30 tracking-widest uppercase animate-fade-in stagger-4">
        {t(locale, "misc.est")}
      </div>
      <div className="absolute top-6 right-6 text-[10px] text-muted-foreground/30 tracking-widest uppercase animate-fade-in stagger-5">
        {t(locale, "misc.version")}
      </div>
    </section>
  )
}
