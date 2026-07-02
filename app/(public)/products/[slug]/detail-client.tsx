"use client"

import { useRouter } from "next/navigation"
import { ArrowLeft, ExternalLink, FileText, Images } from "lucide-react"
import { useLocale } from "@/components/locale-provider"
import { t } from "@/lib/i18n"

export interface ProductDetail {
  nameKey: string
  gbUrl: string
  gbAuthor: string
  specKeys: string[]
  contentKeys: { headingKey: string; bodyKey: string; image?: string }[]
}

export function ProductDetailClient({ slug, detail }: { slug: string; detail: ProductDetail }) {
  const router = useRouter()
  const { locale } = useLocale()

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 pt-20 sm:pt-24 pb-12 sm:pb-16">
      {/* Navigation bar */}
      <div className="flex items-center justify-between mb-8 -mx-4 sm:-mx-6 px-4 sm:px-6 py-3 bg-background/50 backdrop-blur-sm border-b border-border/20">
        <button
          onClick={() => router.push(`/products#product-${slug}`)}
          className="flex items-center gap-2 text-xs text-foreground/60 hover:text-foreground transition-colors tracking-widest uppercase"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>{t(locale, detail.nameKey)}</span>
        </button>

        <div className="flex items-center gap-2">
          <a
            href={`/products/${slug}/gallery`}
            className="flex items-center gap-1.5 text-xs text-foreground/50 hover:text-foreground transition-colors"
          >
            <Images className="h-3.5 w-3.5" />
            <span>{t(locale, "product.link.gallery")}</span>
          </a>
          <span className="text-foreground/10 mx-1">|</span>
          <a
            href={`/products/${slug}/manual`}
            className="flex items-center gap-1.5 text-xs text-foreground/50 hover:text-foreground transition-colors"
          >
            <FileText className="h-3.5 w-3.5" />
            <span>{t(locale, "product.link.manual")}</span>
          </a>
        </div>
      </div>

      {/* Product name */}
      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">{t(locale, detail.nameKey)}</h1>

      {/* Source attribution */}
      <div className="mt-4 p-4 rounded-lg border border-border/50 bg-card/30 text-xs sm:text-sm text-muted-foreground leading-relaxed">
        <p>
          {t(locale, "product.detail.source")}
          <a href={detail.gbUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center gap-1 ml-1">
            {t(locale, "product.detail.gbLink")}
            <ExternalLink className="h-3 w-3" />
          </a>
        </p>
        <p className="mt-1 text-muted-foreground/50">{t(locale, "product.detail.author")}: {detail.gbAuthor}</p>
      </div>

      {/* Specs table */}
      <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-3">
        {detail.specKeys.map((key) => (
          <div key={key} className="flex items-baseline justify-between gap-2 py-2 border-b border-border/20">
            <span className="text-xs sm:text-sm text-muted-foreground/60 shrink-0">{t(locale, key)}</span>
            <span className="text-xs sm:text-sm font-medium text-right">{t(locale, key + ".value")}</span>
          </div>
        ))}
      </div>

      {/* Content sections */}
      <div className="mt-12 space-y-10">
        {detail.contentKeys.map((section, index) => (
          <section key={index}>
            <h2 className="text-lg sm:text-xl font-semibold tracking-tight mb-3">{t(locale, section.headingKey)}</h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed whitespace-pre-line">{t(locale, section.bodyKey)}</p>
            {section.image && (
              <div className="mt-4 rounded-lg overflow-hidden border border-border/30">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={section.image} alt={t(locale, section.headingKey)} className="w-full h-auto" loading="lazy" />
              </div>
            )}
          </section>
        ))}
      </div>
    </div>
  )
}
