"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import ProductCard from "@/components/product-card"
import { products } from "@/lib/data"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Search, SlidersHorizontal } from "lucide-react"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { useSearchParams } from "next/navigation"

export default function ProductCatalog() {
  const searchParams = useSearchParams()
  const initialCategory = searchParams.get("categoria") || "todos"

  const [category, setCategory] = useState(initialCategory)
  const [priceRange, setPriceRange] = useState([0, 2000])
  const [sortBy, setSortBy] = useState("featured")
  const [inStock, setInStock] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")

  // Filter products based on selected filters
  const filteredProducts = products.filter((product) => {
    // Filter by category
    if (category !== "todos" && product.category !== category) return false

    // Filter by price range
    if (product.price < priceRange[0] || product.price > priceRange[1]) return false

    // Filter by stock
    if (inStock && product.stock === 0) return false

    // Filter by search query
    if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) return false

    return true
  })

  // Sort products based on selected sort option
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-asc":
        return a.price - b.price
      case "price-desc":
        return b.price - a.price
      case "name-asc":
        return a.name.localeCompare(b.name)
      case "name-desc":
        return b.name.localeCompare(a.name)
      default:
        return a.featured ? -1 : 1
    }
  })

  return (
    <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-6">
      {/* Mobile filters */}
      <div className="md:hidden flex items-center justify-between mb-4">
        <div className="relative w-full mr-2">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar productos..."
            className="pl-8 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <SlidersHorizontal className="h-4 w-4" />
              <span className="sr-only">Filtros</span>
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Filtros</SheetTitle>
              <SheetDescription>Ajusta los filtros para encontrar lo que buscas</SheetDescription>
            </SheetHeader>
            <div className="grid gap-6 py-4">
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Categoría</h3>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos los productos</SelectItem>
                    <SelectItem value="iphones">iPhones</SelectItem>
                    <SelectItem value="fundas">Fundas</SelectItem>
                    <SelectItem value="cargadores">Cargadores</SelectItem>
                    <SelectItem value="accesorios">Accesorios</SelectItem>
                    <SelectItem value="ofertas">Ofertas</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Precio</h3>
                <div className="pt-4">
                  <Slider defaultValue={priceRange} max={2000} step={10} onValueChange={setPriceRange} />
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-sm">${priceRange[0]}</span>
                    <span className="text-sm">${priceRange[1]}</span>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Ordenar por</h3>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue placeholder="Ordenar por" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Destacados</SelectItem>
                    <SelectItem value="price-asc">Precio: menor a mayor</SelectItem>
                    <SelectItem value="price-desc">Precio: mayor a menor</SelectItem>
                    <SelectItem value="name-asc">Nombre: A-Z</SelectItem>
                    <SelectItem value="name-desc">Nombre: Z-A</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="stock-mobile"
                  checked={inStock}
                  onCheckedChange={(checked) => setInStock(checked as boolean)}
                />
                <Label htmlFor="stock-mobile">Solo productos en stock</Label>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop filters */}
      <div className="hidden md:block space-y-6">
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Buscar</h3>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar productos..."
              className="pl-8 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Categoría</h3>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar categoría" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos los productos</SelectItem>
              <SelectItem value="iphones">iPhones</SelectItem>
              <SelectItem value="fundas">Fundas</SelectItem>
              <SelectItem value="cargadores">Cargadores</SelectItem>
              <SelectItem value="accesorios">Accesorios</SelectItem>
              <SelectItem value="ofertas">Ofertas</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Precio</h3>
          <div className="pt-4">
            <Slider defaultValue={priceRange} max={2000} step={10} onValueChange={setPriceRange} />
            <div className="flex items-center justify-between mt-2">
              <span className="text-sm">${priceRange[0]}</span>
              <span className="text-sm">${priceRange[1]}</span>
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Ordenar por</h3>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger>
              <SelectValue placeholder="Ordenar por" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Destacados</SelectItem>
              <SelectItem value="price-asc">Precio: menor a mayor</SelectItem>
              <SelectItem value="price-desc">Precio: mayor a menor</SelectItem>
              <SelectItem value="name-asc">Nombre: A-Z</SelectItem>
              <SelectItem value="name-desc">Nombre: Z-A</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="stock" checked={inStock} onCheckedChange={(checked) => setInStock(checked as boolean)} />
          <Label htmlFor="stock">Solo productos en stock</Label>
        </div>
      </div>

      {/* Product grid */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">
            {sortedProducts.length} {sortedProducts.length === 1 ? "producto" : "productos"}
          </h2>
        </div>
        {sortedProducts.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium">No se encontraron productos</h3>
            <p className="text-gray-500 dark:text-gray-400 mt-2">Intenta cambiar los filtros o buscar otro término.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.05 * index }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
