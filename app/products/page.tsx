import Footer from "@/components/organisms/footer";
import Navbar from "@/components/organisms/navbar";
import ProductListing from "@/components/templates/product-listing";

export const metadata = {
  title: "Products | Luxe",
  description: "Discover our curated collection of premium products",
};

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <main className="pt-20 pb-16">
        <ProductListing />
      </main>
      <Footer />
    </div>
  );
}
