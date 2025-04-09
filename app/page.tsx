import Hero from "@/components/hero"
import FeaturedProducts from "@/components/featured-products"
import Categories from "@/components/categories"
import Newsletter from "@/components/newsletter"
import BackToTop from "@/components/back-to-top"
import Testimonials from "@/components/testimonials"
// import LatestNews from "@/components/latest-news"
import FeaturedCollection from "@/components/featured-collection"
// import BrandsShowcase from "@/components/brands-showcase"


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <Hero />
      <FeaturedProducts />
      <FeaturedCollection />
      <Categories />
      {/* <BrandsShowcase /> */}
      <Testimonials />
      {/* <LatestNews /> */}
      <Newsletter />
      <BackToTop />
    </main>
  )
}
