import { Suspense } from "react"
import ProductCatalog from "@/components/product-catalog"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Home } from "lucide-react"
import BackToTop from "@/components/back-to-top"
import ProductCatalogSkeleton from "@/components/product-catalog-skeleton"

export const metadata = {
  title: "Catálogo de Productos | El Club Del Iphon",
  description:
    "Explora nuestra amplia selección de productos y accesorios para iPhone. Encuentra fundas, cargadores, auriculares y más.",
}

export default function ProductsPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">
              <Home className="h-4 w-4 mr-1" />
              Inicio
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/productos">Productos</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <h1 className="text-3xl font-bold mb-8">Nuestros Productos</h1>

      <Suspense fallback={<ProductCatalogSkeleton />}>
        <ProductCatalog />
      </Suspense>

      <BackToTop />
    </main>
  )
}
