import Navbar from "@/components/organisms/navbar"
import HeroSection from "@/components/organisms/hero-section"
import FeaturedProducts from "@/components/organisms/featured-products"
import CategoriesSection from "@/components/organisms/categories-section"
import NewsletterSignup from "@/components/organisms/newsletter-signup"
import Footer from "@/components/organisms/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <main>
        <HeroSection />
        <FeaturedProducts />
        <CategoriesSection />
        <NewsletterSignup />
      </main>
      <Footer />
    </div>
  )
}
