"use client"

import { useLocale } from "./locale-provider"
import { Globe } from "lucide-react"

export function LocaleToggle() {
  const { locale, setLocale } = useLocale()

  return (
    <button
      onClick={() => setLocale(locale === "en" ? "zh" : "en")}
      className="group relative flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-all duration-300 hover:text-primary hover:bg-primary/10"
      aria-label={locale === "en" ? "Switch to Chinese" : "切换到英文"}
      title={locale === "en" ? "中文" : "English"}
    >
      <Globe className="h-3.5 w-3.5 transition-transform duration-300 group-hover:scale-110" />
      <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-card border border-border px-2 py-1 text-[10px] text-muted-foreground opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:-bottom-8 pointer-events-none shadow-lg z-50">
        {locale === "en" ? "中文" : "EN"}
      </span>
    </button>
  )
}
