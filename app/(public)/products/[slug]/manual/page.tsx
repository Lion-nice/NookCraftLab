import { ManualContent } from "./manual-client"

const manualPdfs: Record<string, string> = {
  "hx-40": "/manuals/HX-40.pdf",
}

const productNames: Record<string, string> = {
  "hx-40": "HX-40",
  "aroundight": "Aroundight 湖光剑",
  "rir-40": "R.I.R.40",
  "crt-pad": "CRT Pad",
  "nookpad": "NookPad",
  "yan": "Yan",
}

const productSlugs = ["hx-40", "aroundight", "rir-40", "crt-pad", "nookpad", "yan"]

export function generateStaticParams() {
  return productSlugs.map((slug) => ({ slug }))
}

export default async function ManualPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const pdfUrl = manualPdfs[slug]
  const name = productNames[slug] || slug
  return <ManualContent slug={slug} pdfUrl={pdfUrl} name={name} />
}
