"use client"

import React, { useEffect, useCallback } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { ArrowLeft, FileText, Download } from "lucide-react"
import { useLocale } from "@/components/locale-provider"
import { t } from "@/lib/i18n"

const FRAME_OFFSET = -30
const FRAMES_VISIBLE_LENGTH = 3
const SCROLL_THRESHOLD = 40
const BUFFER_SIZE = 8

function clamp(value: number, [min, max]: [number, number]): number {
  return Math.min(Math.max(value, min), max)
}

interface TimeMachineProps {
  images: string[]
  title: string
  slug: string
}

export function TimeMachine({ images, title, slug }: TimeMachineProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [downloading, setDownloading] = React.useState(false)
  const containerRef = React.useRef<HTMLDivElement>(null)
  const scrollAccumulator = React.useRef(0)
  const lastUpdateTime = React.useRef(Date.now())
  const touchStartY = React.useRef(0)
  const router = useRouter()
  const { locale } = useLocale()

  const getVisibleCards = useCallback(() => {
    const start = currentIndex - BUFFER_SIZE
    const end = currentIndex + FRAMES_VISIBLE_LENGTH + BUFFER_SIZE
    const cards = []
    for (let i = start; i <= end; i++) {
      cards.push({
        index: i,
        imageIndex: ((i % images.length) + images.length) % images.length,
      })
    }
    return cards
  }, [currentIndex, images.length])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault()
        setCurrentIndex((prev) => prev + 1)
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault()
        setCurrentIndex((prev) => prev - 1)
      } else if (e.key === "Escape" || e.key === "Backspace") {
        e.preventDefault()
        router.push(`/products#product-${slug}`)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [router, slug])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    const MIN_UPDATE_INTERVAL = 75

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      scrollAccumulator.current += e.deltaY
      const now = Date.now()
      if (Math.abs(scrollAccumulator.current) >= SCROLL_THRESHOLD && now - lastUpdateTime.current >= MIN_UPDATE_INTERVAL) {
        setCurrentIndex((prev) => prev + (scrollAccumulator.current > 0 ? 1 : -1))
        scrollAccumulator.current = 0
        lastUpdateTime.current = now
      }
    }

    const handleTouchStart = (e: TouchEvent) => { touchStartY.current = e.touches[0].clientY }
    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault()
      const deltaY = touchStartY.current - e.touches[0].clientY
      touchStartY.current = e.touches[0].clientY
      scrollAccumulator.current += deltaY
      const now = Date.now()
      if (Math.abs(scrollAccumulator.current) >= SCROLL_THRESHOLD && now - lastUpdateTime.current >= MIN_UPDATE_INTERVAL) {
        setCurrentIndex((prev) => prev + (scrollAccumulator.current > 0 ? 1 : -1))
        scrollAccumulator.current = 0
        lastUpdateTime.current = now
      }
    }

    container.addEventListener("wheel", handleWheel, { passive: false })
    container.addEventListener("touchstart", handleTouchStart, { passive: false })
    container.addEventListener("touchmove", handleTouchMove, { passive: false })
    return () => {
      container.removeEventListener("wheel", handleWheel)
      container.removeEventListener("touchstart", handleTouchStart)
      container.removeEventListener("touchmove", handleTouchMove)
    }
  }, [])

  const visibleCards = getVisibleCards()
  const currentImageIndex = ((currentIndex % images.length) + images.length) % images.length
  const currentImageUrl = images[currentImageIndex]

  const handleDownload = async () => {
    setDownloading(true)
    try {
      const response = await fetch(currentImageUrl)
      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = currentImageUrl.split("/").pop() || "image.jpg"
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch {
      window.open(currentImageUrl, "_blank")
    }
    setTimeout(() => setDownloading(false), 1000)
  }

  return (
    <div className="relative w-full h-full flex flex-col">
      <div className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-background/50 backdrop-blur-sm border-b border-border/20">
        <button
          onClick={() => router.push(`/products#product-${slug}`)}
          className="flex items-center gap-2 text-foreground/60 hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="text-xs tracking-widest uppercase">{title}</span>
        </button>
        <div className="flex items-center gap-2">
          <button onClick={handleDownload} disabled={downloading} className="flex items-center gap-1.5 text-xs text-foreground/50 hover:text-foreground transition-colors disabled:opacity-50">
            <Download className="h-3.5 w-3.5" />
            <span>{t(locale, "gallery.download")}</span>
          </button>
          <span className="text-foreground/10 mx-1">|</span>
          <button onClick={() => router.push(`/products/${slug}`)} className="flex items-center gap-1.5 text-xs text-foreground/50 hover:text-foreground transition-colors">
            <FileText className="h-3.5 w-3.5" />
            <span>{t(locale, "gallery.details")}</span>
          </button>
          <span className="text-foreground/10 mx-1">|</span>
          <span className="text-[10px] text-foreground/30">{currentImageIndex + 1} / {images.length}</span>
        </div>
      </div>

      <div ref={containerRef} className="relative flex-1 flex items-center justify-center overflow-hidden">
        <div className="relative w-full h-full flex items-center justify-center">
          {visibleCards.map((card) => {
            const offsetIndex = card.index - currentIndex
            const isCurrent = offsetIndex === 0
            const isPast = currentIndex > card.index
            const blur = isCurrent ? 0 : isPast ? 4 : 8
            const opacity = isCurrent ? 1 : isPast ? 0 : 0.6
            const brightness = isCurrent ? 1 : isPast ? 1 : 0.7
            const scale = clamp(1 - offsetIndex * 0.08, [0.08, 2])
            const y = clamp(offsetIndex * FRAME_OFFSET, [FRAME_OFFSET * FRAMES_VISIBLE_LENGTH, Number.POSITIVE_INFINITY])
            return (
              <motion.div
                key={card.index}
                className="absolute w-[85%] max-w-[800px] aspect-[16/9] bg-card rounded-xl overflow-hidden shadow-2xl"
                initial={false}
                animate={{ y, scale, opacity }}
                style={{
                  willChange: "opacity, filter, transform",
                  zIndex: 1000 - card.index,
                  filter: `blur(${blur}px) brightness(${brightness})`,
                  transition: "filter 0.4s ease-in-out, opacity 0.4s ease-in-out",
                }}
                transition={{ type: "spring", stiffness: 250, damping: 20, mass: 0.5 }}
              >
                <Image src={images[card.imageIndex]} alt={`${title} - ${card.imageIndex + 1}`} fill className="object-cover" sizes="(max-width: 800px) 85vw, 800px" priority={offsetIndex === 0} />
              </motion.div>
            )
          })}
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-1">
        <div className="flex gap-1">
          {images.map((_, i) => (
            <span key={i} className={`h-1 rounded-full transition-all duration-300 ${currentImageIndex === i ? "w-3 bg-primary" : "w-1 bg-foreground/15"}`} />
          ))}
        </div>
      </div>
    </div>
  )
}
