"use client"

import { useState, useCallback } from "react"
import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

interface ImageCarouselProps {
  images: string[]
  alt: string
  className?: string
}

export function ImageCarousel({ images, alt, className }: ImageCarouselProps) {
  const [current, setCurrent] = useState(0)
  const [hovered, setHovered] = useState(false)

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % images.length)
  }, [images.length])

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length)
  }, [images.length])

  if (images.length === 0) return null

  return (
    <div
      className={cn("relative overflow-hidden rounded-xl border border-border/50 bg-card/50", className)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Images */}
      <div className="relative h-full w-full">
        {images.map((src, index) => (
          <div
            key={src}
            className={cn(
              "absolute inset-0 transition-opacity duration-500",
              index === current ? "opacity-100" : "opacity-0 pointer-events-none"
            )}
          >
            <Image
              src={src}
              alt={`${alt} - ${index + 1}`}
              fill
              className="object-cover"
              sizes="144px"
            />
          </div>
        ))}
      </div>

      {/* Navigation arrows - only show on hover */}
      {images.length > 1 && (
        <>
          <button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); prev() }}
            className={cn(
              "absolute left-1 top-1/2 -translate-y-1/2 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-background/80 border border-border/50 text-muted-foreground backdrop-blur-sm transition-all duration-200 hover:text-foreground hover:bg-background",
              hovered ? "opacity-100" : "opacity-0 pointer-events-none"
            )}
            aria-label="Previous image"
          >
            <ChevronLeft className="h-3 w-3" />
          </button>
          <button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); next() }}
            className={cn(
              "absolute right-1 top-1/2 -translate-y-1/2 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-background/80 border border-border/50 text-muted-foreground backdrop-blur-sm transition-all duration-200 hover:text-foreground hover:bg-background",
              hovered ? "opacity-100" : "opacity-0 pointer-events-none"
            )}
            aria-label="Next image"
          >
            <ChevronRight className="h-3 w-3" />
          </button>

          {/* Dots indicator - always visible */}
          <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1">
            {images.map((_, index) => (
              <span
                key={index}
                className={cn(
                  "h-1 rounded-full transition-all duration-300",
                  index === current ? "w-3 bg-primary" : "w-1 bg-foreground/20"
                )}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
