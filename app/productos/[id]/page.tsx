import { Suspense } from "react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Home } from "lucide-react"
import ProductDetail from "@/components/product-detail"
import ProductDetailSkeleton from "@/components/product-detail-skeleton"
import { products } from "@/lib/data"

export function generateMetadata({ params }: { params: { id: string } }) {
  const product = products.find((p) => p.id === params.id)

  return {
    title: product ? `${product.name} | El Club Del Iphon` : "Producto | El Club Del Iphon",
    description: product ? product.description : "Detalle de producto en El Club Del Iphon",
  }
}

export default function ProductPage({ params }: { params: { id: string } }) {
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
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink>Detalle</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Suspense fallback={<ProductDetailSkeleton />}>
        <ProductDetail id={params.id} />
      </Suspense>
    </main>
  )
}
