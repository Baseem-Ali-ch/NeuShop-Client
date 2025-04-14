import { notFound } from "next/navigation"
import ProductDetail from "@/components/templates/product-detail"
import { products } from "@/data/products"

interface ProductPageProps {
  params: {
    id: string
  }
}

export function generateStaticParams() {
  return products.map((product) => ({
    id: product.id.toString(),
  }))
}

export function generateMetadata({ params }: ProductPageProps) {
  const product = products.find((p) => p.id.toString() === params.id)

  if (!product) {
    return {
      title: "Product Not Found",
      description: "The requested product could not be found",
    }
  }

  return {
    title: `${product.name} | Luxe`,
    description: product.description,
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = products.find((p) => p.id.toString() === params.id)

  if (!product) {
    notFound()
  }

  return <ProductDetail product={product} />
}
