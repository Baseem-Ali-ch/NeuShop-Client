import { notFound } from "next/navigation";
import ProductDetail from "@/components/templates/product-detail";

interface ProductPageProps {
  params: {
    id: string;
  };
}

async function fetchProduct(id: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/products/${id}`,
      {
        cache: "no-store",
      }
    );
    if (!response.ok) {
      console.log(`Failed to fetch product ${id}: ${response.status} ${await response.text()}`);
      return null;
    }
    const { data } = await response.json();
    console.log("Fetched product:", data);
    return data;
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    return null;
  }
}

async function fetchRelatedProducts(categoryId: string, excludeId: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/products?categoryId=${categoryId}`,
      {
        cache: "no-store",
      }
    );
    if (!response.ok) {
      console.log(`Failed to fetch related products: ${response.status}`);
      return [];
    }
    const { products } = await response.json();
    return products
      .filter((p: any) => p._id !== excludeId)
      .slice(0, 4)
      .map((p: any) => ({
        id: p._id,
        name: p.name,
        image: p.images?.[0] || "/placeholder.svg",
        price: p.price,
        salePrice: p.salePrice,
        stock: p.stock,
        categoryId: p.categoryId,
        status: p.stock > 0 ? "active" : "out-of-stock",
      }));
  } catch (error) {
    console.error("Error fetching related products:", error);
    return [];
  }
}

export async function generateMetadata({ params }: ProductPageProps) {
  const product = await fetchProduct(params.id);

  if (!product) {
    return {
      title: "Product Not Found",
      description: "The requested product could not be found",
    };
  }

  return {
    title: `${product.name} | Luxe`,
    description: product.description || "No description available",
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await fetchProduct(params.id);

  if (!product) {
    notFound();
  }

  const relatedProducts = await fetchRelatedProducts(product.categoryId, product._id);

  const mappedProduct = {
    _id: { $oid: product._id },
    id: product._id,
    name: product.name,
    description: product.description,
    image: product.images?.[0] || "/placeholder.svg",
    images: product.images || [],
    price: product.price,
    salePrice: product.salePrice || null,
    stock: product.stock,
    categoryId: product.categoryId,
    brandId: product.brandId,
    variants: product.variants || [], // Include variants
    status: product.stock > 0 ? "active" : "out-of-stock",
    sku: product.sku || `SKU-${product._id.padStart(6, "0")}`,
  };

  return <ProductDetail product={mappedProduct} relatedProducts={relatedProducts} />;
}