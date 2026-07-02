"use client"

import { useEffect, useState } from "react"

export default function FullscreenLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const header = document.querySelector("header")
    const footer = document.querySelector("footer")
    const cursorGlow = document.querySelector("[class*=cursor-glow]")

    if (header) (header as HTMLElement).style.display = "none"
    if (footer) (footer as HTMLElement).style.display = "none"
    if (cursorGlow) (cursorGlow as HTMLElement).style.display = "none"

    setReady(true)

    return () => {
      if (header) (header as HTMLElement).style.display = ""
      if (footer) (footer as HTMLElement).style.display = ""
      if (cursorGlow) (cursorGlow as HTMLElement).style.display = ""
    }
  }, [])

  if (!ready) return null

  return <>{children}</>
}
