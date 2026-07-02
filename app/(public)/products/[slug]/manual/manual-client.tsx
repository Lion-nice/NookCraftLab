"use client"

import { useRouter } from "next/navigation"
import { ArrowLeft, FileText } from "lucide-react"
import { useLocale } from "@/components/locale-provider"
import { t } from "@/lib/i18n"

export function ManualContent({ slug, pdfUrl, name }: { slug: string; pdfUrl?: string; name: string }) {
  const router = useRouter()
  const { locale } = useLocale()

  return (
    <div className="w-full h-screen bg-background flex flex-col">
      <div className="flex items-center justify-between px-6 py-4 bg-background/50 backdrop-blur-sm border-b border-border/20">
        <button
          onClick={() => router.push(`/products#product-${slug}`)}
          className="flex items-center gap-2 text-foreground/60 hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="text-xs tracking-widest uppercase">{name}</span>
        </button>
        <div className="flex items-center gap-2">
          <button
            onClick={() => router.push(`/products/${slug}`)}
            className="flex items-center gap-1.5 text-xs text-foreground/50 hover:text-foreground transition-colors"
          >
            <FileText className="h-3.5 w-3.5" />
            <span>{t(locale, "gallery.details")}</span>
          </button>
        </div>
      </div>

      <div className="flex-1 w-full">
        {pdfUrl ? (
          <iframe src={pdfUrl} className="w-full h-full border-0" title={`${name} Manual`} />
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center space-y-3">
              <FileText className="h-12 w-12 text-muted-foreground/20 mx-auto" />
              <p className="text-sm text-muted-foreground">{t(locale, "manual.notAvailable")}</p>
              <p className="text-xs text-muted-foreground/40">{name}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
