import { ProductDetailClient } from "./detail-client"

// Product detail definitions - content stored in i18n, only structural data here
interface ProductDetail {
  nameKey: string
  gbUrl: string
  gbAuthor: string
  specKeys: string[]
  contentKeys: { headingKey: string; bodyKey: string; image?: string }[]
}

const productDetails: Record<string, ProductDetail> = {
  "hx-40": {
    nameKey: "product.hx40.name",
    gbUrl: "https://www.zfrontier.com/app/flow/KXPMx5vQBM6d",
    gbAuthor: "牛牛开车",
    specKeys: [
      "product.hx40.spec.layout",
      "product.hx40.spec.structure",
      "product.hx40.spec.material",
      "product.hx40.spec.angle",
      "product.hx40.spec.frontHeight",
      "product.hx40.spec.weight",
      "product.hx40.spec.pcb",
      "product.hx40.spec.splitKeys",
      "product.hx40.spec.firmware",
      "product.hx40.spec.connectivity",
    ],
    contentKeys: [
      { headingKey: "product.hx40.section.design.heading", bodyKey: "product.hx40.section.design.body", image: "https://aka.doubaocdn.com/s/EyIx1whlu8" },
      { headingKey: "product.hx40.section.structure.heading", bodyKey: "product.hx40.section.structure.body", image: "https://aka.doubaocdn.com/s/wr6P1whlu8" },
      { headingKey: "product.hx40.section.magnetic.heading", bodyKey: "product.hx40.section.magnetic.body", image: "https://aka.doubaocdn.com/s/rV5R1whlu8" },
      { headingKey: "product.hx40.section.ec.heading", bodyKey: "product.hx40.section.ec.body", image: "https://aka.doubaocdn.com/s/5fpk1whlu8" },
      { headingKey: "product.hx40.section.color.heading", bodyKey: "product.hx40.section.color.body", image: "https://aka.doubaocdn.com/s/9Uby1whlu8" },
      { headingKey: "product.hx40.section.config.heading", bodyKey: "product.hx40.section.config.body" },
    ],
  },
}

const productSlugs = ["hx-40"]

export function generateStaticParams() {
  return productSlugs.map((slug) => ({ slug }))
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const detail = productDetails[slug]

  if (!detail) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-muted-foreground">产品详情暂未更新。</p>
      </div>
    )
  }

  return <ProductDetailClient slug={slug} detail={detail} />
}
