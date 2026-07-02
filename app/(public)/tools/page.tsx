"use client"

import { useLocale } from "@/components/locale-provider"
import { t } from "@/lib/i18n"
import { ArrowUpRight } from "lucide-react"

const tools = [
  { titleKey: "tools.tester.title", subtitleKey: "tools.tester.subtitle", url: "https://www.zfrontier.com/lab/keyboardTester" },
  { titleKey: "tools.via.title", subtitleKey: "tools.via.subtitle", url: "https://usevia.app/" },
  { titleKey: "tools.vial.title", subtitleKey: "tools.vial.subtitle", url: "https://vial.rocks/" },
  { titleKey: "tools.zmk.title", subtitleKey: "tools.zmk.subtitle", url: "https://zmk.studio/" },
]

export default function ToolsPage() {
  const { locale } = useLocale()

  return (
    <div className="px-4 sm:px-6 py-16 sm:py-20">
      <div className="mx-auto max-w-4xl">
        {/* Page header */}
        <div className="mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
            {t(locale, "tools.pageTitle")}
          </h1>
          <p className="mt-2 text-sm sm:text-base text-muted-foreground">
            {t(locale, "tools.subtitle")}
          </p>
        </div>

        {/* Tool cards */}
        <div className="grid gap-4">
          {tools.map((tool) => (
            <a
              key={tool.titleKey}
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between rounded-xl border border-border/50 bg-card/30 px-6 py-5 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
            >
              <div>
                <h3 className="text-base sm:text-lg font-semibold tracking-wide transition-colors group-hover:text-primary">
                  {t(locale, tool.titleKey)}
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-muted-foreground/60">
                  {t(locale, tool.subtitleKey)}
                </p>
              </div>
              <span className="shrink-0 text-muted-foreground/30 transition-all duration-300 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <ArrowUpRight className="h-5 w-5" />
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
