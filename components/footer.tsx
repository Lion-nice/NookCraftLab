"use client"

import { Mail, Heart } from "lucide-react"
import { useLocale } from "./locale-provider"
import { t } from "@/lib/i18n"
import { CopyEmailRow, CopyEmailButton } from "./copy-email"

export function Footer() {
  const { locale } = useLocale()

  return (
    <footer id="connect" className="border-t border-border/30 px-4 sm:px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-4xl pl-0 sm:pl-2">
        <div className="space-y-10 sm:space-y-12 animate-fade-in-up">
          <div className="space-y-6">
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-[0.25em] sm:tracking-[0.35em] text-primary">{t(locale, "footer.getInTouch")}</p>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-balance">
                {t(locale, "footer.heading")}
                <span className="bg-gradient-to-l from-primary/50 to-accent text-transparent bg-clip-text ">{t(locale, "footer.headingHighlight")}</span>
              </h2>
            </div>
            <p className="max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed">
              {t(locale, "footer.description")}
            </p>
          </div>

          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.25em] sm:tracking-[0.35em] text-muted-foreground">
              {t(locale, "footer.contact")}
            </p>
            <CopyEmailRow />

            <div className="pt-2 space-y-2">
              <p className="text-xs text-muted-foreground">{t(locale, "footer.service1")}</p>
              <p className="text-xs text-muted-foreground">{t(locale, "footer.service2")}</p>
              <p className="text-xs text-muted-foreground">{t(locale, "footer.service3")}</p>
            </div>
          </div>
        </div>

        <div className="mt-12 sm:mt-16 flex flex-col items-center justify-between gap-4 border-t border-border/30 pt-8 sm:pt-10 sm:flex-row animate-fade-in stagger-4">
          <div className="flex items-center gap-2.5 text-xs text-muted-foreground">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            <span>{t(locale, "footer.crafted")}</span>
            <Heart className="h-3.5 w-3.5 text-destructive animate-pulse" />
            <span>{t(locale, "footer.precision")}</span>
          </div>

          <CopyEmailButton className="text-muted-foreground/50 transition-all duration-300 hover:text-primary hover:scale-110" iconSize="h-5 w-5" />

          <p className="text-xs text-muted-foreground text-center sm:text-right">
            &copy; {new Date().getFullYear()} NookCraftLab — {t(locale, "footer.copyright")}
          </p>
        </div>
      </div>
    </footer>
  )
}
