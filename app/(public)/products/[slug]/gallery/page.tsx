import { TimeMachine } from "@/components/time-machine"

const galleryImages: Record<string, string[]> = {
  "hx-40": [
    "/products/HX-40/HX-40-1.jpg",
    "/products/HX-40/HX-40-2.png",
    "/products/HX-40/HX-40-3.png",
    "/products/HX-40/HX-40-4.png",
  ],
  "aroundight": ["/products/Aroundight湖光剑/Aroundight湖光剑-1.jpg"],
  "rir-40": ["/products/R.I.R.40/R.I.R.40-1.jpg"],
  "crt-pad": ["/products/CRT-Pad/CRT-Pad-1.jpg"],
  "nookpad": ["/products/NookPad/NookPad-1.jpg"],
}

const productNames: Record<string, string> = {
  "hx-40": "HX-40",
  "aroundight": "Aroundight 湖光剑",
  "rir-40": "R.I.R.40",
  "crt-pad": "CRT Pad",
  "nookpad": "NookPad",
}

export function generateStaticParams() {
  return Object.keys(galleryImages).map((slug) => ({ slug }))
}

export default async function GalleryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const images = galleryImages[slug]
  const name = productNames[slug] || slug

  if (!images || images.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen bg-background">
        <p className="text-muted-foreground">No images available.</p>
      </div>
    )
  }

  return (
    <main className="w-full h-screen bg-background">
      <TimeMachine images={images} title={name} slug={slug} />
    </main>
  )
}
