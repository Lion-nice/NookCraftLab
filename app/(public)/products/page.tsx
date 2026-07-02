"use client"

import { useState, useEffect, useRef, useMemo } from "react"
import { cn } from "@/lib/utils"
import { Search, X, ChevronDown } from "lucide-react"
import { useLocale } from "@/components/locale-provider"
import { t } from "@/lib/i18n"
import { ImageCarousel } from "@/components/image-carousel"

// Product image mappings
const productImages: Record<string, string[]> = {
  "product.nook65": [
    "/products/HX-40/HX-40-1.jpg",
    "/products/HX-40/HX-40-2.png",
    "/products/HX-40/HX-40-3.png",
    "/products/HX-40/HX-40-4.png",
  ],
  "product.horizon": [
    "/products/Aroundight湖光剑/Aroundight湖光剑-1.jpg",
  ],
  "product.companion": [
    "/products/R.I.R.40/R.I.R.40-1.jpg",
  ],
  "product.phantom": [
    "/products/CRT-Pad/CRT-Pad-1.jpg",
  ],
  "product.nebula": [
    "/products/NookPad/NookPad-1.jpg",
  ],
}

const productKeys = [
  "product.nook65",
  "product.horizon",
  "product.companion",
  "product.phantom",
  "product.nebula",
] as const

export default function ProductsPage() {
  const { locale } = useLocale()
  const [searchQuery, setSearchQuery] = useState("")
  const [scrollProgress, setScrollProgress] = useState(0)
  const [searchExpanded, setSearchExpanded] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)

  const handleScroll = () => {
    if (!heroRef.current) return
    const heroHeight = heroRef.current.offsetHeight
    const scrolled = window.scrollY
    const progress = Math.min(scrolled / heroHeight, 1)
    setScrollProgress(progress)
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (searchExpanded && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [searchExpanded])

  const brandScale = 1 + scrollProgress * 1.5
  const brandOpacity = Math.max(0, 1 - scrollProgress * 2)
  const isCompact = scrollProgress > 0.3

  const categories = useMemo(() => [
    ...productKeys.map(key => ({
      key,
      title: t(locale, `${key}.title` as any),
      desc: t(locale, `${key}.desc` as any),
      brand: t(locale, `${key}.brand` as any),
      images: productImages[key],
      slug: `/products/${key === "product.nook65" ? "hx-40" : key === "product.horizon" ? "aroundight" : key === "product.companion" ? "rir-40" : key === "product.phantom" ? "crt-pad" : key === "product.nebula" ? "nookpad" : key.replace("product.", "")}`,
    })),
  ], [locale])

  const filteredCategories = searchQuery
    ? categories.filter(c => c.title.toLowerCase().includes(searchQuery.toLowerCase()))
    : categories

  return (
    <div className="min-h-screen">
      {/* Hero section with brand + search */}
      <div ref={heroRef} className="relative min-h-screen flex items-center justify-center">
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none transition-none"
          style={{
            transform: `scale(${brandScale})`,
            opacity: brandOpacity,
          }}
        >
          <h1 className="text-6xl sm:text-8xl lg:text-9xl xl:text-[10rem] font-black tracking-tighter leading-none text-center">
            <span className="block text-foreground">Nook</span>
            <span className="block bg-gradient-to-l from-primary/60 to-accent text-transparent bg-clip-text mt-1 sm:mt-2">
              CraftLab
            </span>
          </h1>
        </div>

        <div
          className={cn(
            "z-10 transition-all duration-500 ease-out w-full px-4 sm:px-6",
            isCompact ? "opacity-0 pointer-events-none" : "opacity-100 relative mt-[50vh]"
          )}
        >
          <div className="mx-auto max-w-xl">
            <div className="flex items-center gap-3 rounded-xl border border-border bg-card/50 glass backdrop-blur-sm py-4 px-5">
              <Search className="shrink-0 h-5 w-5 text-primary" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t(locale, "products.searchPlaceholder")}
                className="bg-transparent outline-none placeholder:text-foreground/30 w-full text-base"
              />
            </div>
          </div>

          <div
            className="mt-8 flex flex-col items-center gap-2"
            style={{
              opacity: Math.max(0, 1 - scrollProgress * 4),
              transform: `translateY(${scrollProgress * -30}px)`,
              transition: "opacity 0.3s, transform 0.3s",
            }}
          >
            <span className="text-[10px] sm:text-xs text-foreground/30 tracking-widest uppercase">
              {t(locale, "misc.scroll")}
            </span>
            <ChevronDown className="h-4 w-4 text-foreground/30 animate-bounce" />
          </div>
        </div>
      </div>

      {/* Compact search icon */}
      <div
        className={cn(
          "fixed z-40 transition-all duration-500 ease-out left-1/2 top-[76px]",
          isCompact
            ? "opacity-100 -translate-x-1/2"
            : "opacity-0 -translate-x-1/2 pointer-events-none"
        )}
      >
        <div className={cn(
          "flex items-center gap-2 rounded-xl border transition-all duration-300 overflow-hidden",
          searchExpanded
            ? "border-border bg-background/95 backdrop-blur-xl shadow-lg py-2.5 px-4 w-64 sm:w-80"
            : "border-transparent bg-transparent"
        )}>
          <button
            onClick={() => setSearchExpanded(!searchExpanded)}
            className={cn(
              "flex items-center justify-center transition-all duration-300",
              searchExpanded ? "shrink-0" : "h-10 w-10 rounded-lg border border-border bg-background/95 backdrop-blur-xl hover:bg-secondary/50"
            )}
          >
            {searchExpanded ? (
              <X className="h-4 w-4 text-muted-foreground" />
            ) : (
              <Search className="h-4 w-4 text-muted-foreground" />
            )}
          </button>
          {searchExpanded && (
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t(locale, "products.searchPlaceholder")}
              className="bg-transparent outline-none placeholder:text-muted-foreground/50 w-full text-sm"
            />
          )}
        </div>
      </div>

      {/* Product list */}
      <section className="px-4 sm:px-6 py-16 sm:py-20 border-t border-border/30">
        <div className="mx-auto max-w-4xl">
          <div className="flex flex-col divide-y divide-border/30">
            {filteredCategories.map((cat, index) => (
              <div
                key={cat.key}
                id={`product-${cat.slug.replace("/products/", "")}`}
                className="group py-6 first:pt-0 last:pb-0 animate-fade-in-up scroll-mt-20"
                style={{ animationDelay: `${(index + 1) * 100 + 200}ms` }}
              >
                {/* Main row: image + text */}
                <div className="flex items-start gap-6 sm:gap-8">
                  {/* Image carousel or placeholder */}
                  <div className="shrink-0 w-32 sm:w-44">
                    {cat.images.length > 0 ? (
                      <ImageCarousel
                        images={cat.images}
                        alt={cat.title}
                        className="w-32 h-32 sm:w-44 sm:h-44"
                      />
                    ) : (
                      <div className="w-32 h-32 sm:w-44 sm:h-44 rounded-xl border border-border/50 bg-card/50 flex items-center justify-center text-muted-foreground/20">
                        <span className="text-[10px] text-muted-foreground/30 tracking-wider">NO IMG</span>
                      </div>
                    )}
                  </div>

                  {/* Text content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base sm:text-lg font-semibold tracking-wide">
                      {cat.title}
                    </h3>
                    <p className="text-[11px] sm:text-xs text-muted-foreground/60 mt-0.5 tracking-wide">
                      {cat.brand}
                    </p>
                    <p className="mt-1.5 text-xs sm:text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                      {cat.desc}
                    </p>
                  </div>
                </div>

                {/* Action buttons - aligned with bottom of image */}
                <div className="flex items-center gap-3 mt-2 pl-[160px] sm:pl-[224px]">
                  <a
                    href={`/products/${cat.slug.replace("/products/", "")}/gallery`}
                    className="text-[11px] sm:text-xs text-muted-foreground/60 dark:text-foreground/40 transition-colors hover:text-primary hover:underline underline-offset-2"
                  >
                    {t(locale, "product.link.gallery")}
                  </a>
                  <span className="text-muted-foreground/30 dark:text-foreground/20">|</span>
                  <a
                    href={cat.slug}
                    className="text-[11px] sm:text-xs text-muted-foreground/60 dark:text-foreground/40 transition-colors hover:text-primary hover:underline underline-offset-2"
                  >
                    {t(locale, "product.link.details")}
                  </a>
                  <span className="text-muted-foreground/30 dark:text-foreground/20">|</span>
                  <a
                    href={`${cat.slug}/manual`}
                    className="text-[11px] sm:text-xs text-muted-foreground/60 dark:text-foreground/40 transition-colors hover:text-primary hover:underline underline-offset-2"
                  >
                    {t(locale, "product.link.manual")}
                  </a>
                </div>
              </div>
            ))}
          </div>

          {filteredCategories.length === 0 && (
            <div className="text-center py-16 text-muted-foreground">
              <p className="text-sm">{t(locale, "products.noResults")}</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
