"use client"

import { Keyboard, Palette, Users } from "lucide-react"
import { useLocale } from "@/components/locale-provider"
import { t } from "@/lib/i18n"

export default function AboutPage() {
  const { locale } = useLocale()

  const services = [
    {
      icon: Keyboard,
      title: t(locale, "about.services.s1.title"),
      desc: t(locale, "about.services.s1.desc"),
    },
    {
      icon: Palette,
      title: t(locale, "about.services.s2.title"),
      desc: t(locale, "about.services.s2.desc"),
    },
    {
      icon: Users,
      title: t(locale, "about.services.s3.title"),
      desc: t(locale, "about.services.s3.desc"),
    },
  ]

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6">
      {/* Hero */}
      <section className="relative pt-28 sm:pt-32 pb-16 sm:pb-20 pl-2 sm:pl-2">
        <div className="space-y-6 sm:space-y-8">
          <div className="space-y-2 animate-fade-in-up">
            <p className="text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] text-primary">
              {t(locale, "about.hero.label")}
            </p>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tighter leading-none">
              <span className="block text-foreground">
                Nook
              </span>
              <span className="block bg-gradient-to-l from-primary/60 to-accent text-transparent bg-clip-text mt-1">
                CraftLab
              </span>
            </h1>
          </div>
          <div className="space-y-4 text-base sm:text-lg leading-relaxed text-muted-foreground animate-fade-in-up stagger-2">
            {t(locale, "about.hero.desc").split("||").map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="relative py-16 sm:py-20 border-t border-border/30 pl-2 sm:pl-2">
        <div className="space-y-8 animate-fade-in-up">
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] text-primary">
              {t(locale, "about.story.label")}
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {t(locale, "about.story.title")}
            </h2>
          </div>
          <div className="space-y-6 text-base sm:text-lg leading-relaxed text-muted-foreground">
            {["about.story.p1", "about.story.p2"].flatMap((key) =>
              t(locale, key as any).split("||").map((segment, i) => {
                const isWeak = segment.startsWith("|weak|")
                const text = isWeak ? segment.slice(6) : segment
                return (
                  <p key={`${key}-${i}`} className={isWeak ? "text-sm text-foreground/40 italic my-8 sm:my-10" : ""}>
                    {text}
                  </p>
                )
              })
            )}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="relative py-16 sm:py-20 border-t border-border/30 pb-20 sm:pb-28">
        <div className="mb-12 space-y-4 pl-2 sm:pl-2 animate-fade-in-up">
          <p className="text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] text-primary">
            {t(locale, "about.services.label")}
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {t(locale, "about.services.title")}
          </h2>
          <p className="text-base text-muted-foreground max-w-2xl">
            {t(locale, "about.services.subtitle")}
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <div
              key={index}
              className="group rounded-xl border border-border/50 bg-card/50 glass p-6 sm:p-8 transition-all duration-300 hover:border-primary/50 hover:bg-card/80 hover-lift animate-fade-in-up"
              style={{ animationDelay: `${(index + 1) * 100 + 200}ms` }}
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg border border-primary/30 bg-primary/10 text-primary transition-all duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
                <service.icon className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-sm font-semibold tracking-wide text-foreground">
                {service.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {service.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
