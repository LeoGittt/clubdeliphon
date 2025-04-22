import Hero from "@/components/hero"
import FeaturedProducts from "@/components/featured-products"
import Categories from "@/components/categories"
import Newsletter from "@/components/newsletter"
import BackToTop from "@/components/back-to-top"
import Testimonials from "@/components/testimonials"
import FeaturedCollection from "@/components/featured-collection"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <Hero />
      <FeaturedProducts />
      <FeaturedCollection />
      <Categories />
      <Testimonials />
      <Newsletter />
      <BackToTop />
    </main>
  )
}
