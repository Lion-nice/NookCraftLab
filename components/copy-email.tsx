"use client"

import { useState } from "react"
import { Mail, Check } from "lucide-react"

const EMAIL = "utopang@foxmail.com"

async function copyEmail() {
  try {
    await navigator.clipboard.writeText(EMAIL)
  } catch {
    const textarea = document.createElement("textarea")
    textarea.value = EMAIL
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand("copy")
    document.body.removeChild(textarea)
  }
}

export function CopyEmailButton({
  className,
  iconSize = "h-4 w-4",
}: {
  className?: string
  iconSize?: string
}) {
  const [copied, setCopied] = useState(false)
  const [hovered, setHovered] = useState(false)
  const showTooltip = copied || hovered

  const handleClick = async () => {
    await copyEmail()
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={copied ? "Copied!" : "Copy email"}
      className={`group relative ${className}`}
    >
      {copied ? (
        <Check className={`${iconSize} text-primary transition-all duration-300 scale-110`} />
      ) : (
        <Mail className={`${iconSize} transition-transform duration-300 group-hover:scale-110`} />
      )}
      <span className={`absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-card border border-border px-2.5 py-1 text-[10px] transition-all duration-200 pointer-events-none shadow-lg z-50 ${showTooltip ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"}`}>
        {copied ? (
          <span className="text-primary">Copied!</span>
        ) : (
          <span className="text-muted-foreground">Email</span>
        )}
      </span>
    </button>
  )
}

export function CopyEmailRow({ className }: { className?: string }) {
  const [copied, setCopied] = useState(false)

  const handleClick = async () => {
    await copyEmail()
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={handleClick}
      className={`group flex items-center gap-2 rounded-xl border border-transparent p-4 transition-all duration-300 hover:border-border/50 hover:bg-card/50 ${className || ""}`}
    >
      {copied ? (
        <Check className="h-4 w-4 text-primary scale-110 transition-all duration-300" />
      ) : (
        <Mail className="h-4 w-4 text-muted-foreground transition-all duration-300 group-hover:text-primary group-hover:scale-110" />
      )}
      <span className={`text-sm font-medium transition-colors ${copied ? "text-primary" : "text-muted-foreground group-hover:text-foreground"}`}>
        {copied ? "Copied!" : "Email"}
      </span>
      <span className="text-xs text-muted-foreground ml-auto">{EMAIL}</span>
    </button>
  )
}
