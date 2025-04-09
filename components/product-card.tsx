"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Heart, Eye } from "lucide-react"
import type { Product } from "@/lib/types"
import { cn } from "@/lib/utils"
import { useToast } from "@/components/ui/use-toast"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)
  const { toast } = useToast()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    toast({
      title: "Producto agregado",
      description: `${product.name} ha sido agregado al carrito`,
    })
  }

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsFavorite(!isFavorite)

    toast({
      title: isFavorite ? "Eliminado de favoritos" : "Agregado a favoritos",
      description: `${product.name} ha sido ${isFavorite ? "eliminado de" : "agregado a"} tus favoritos`,
    })
  }

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    toast({
      title: "Vista rápida",
      description: `Vista rápida de ${product.name}`,
    })
  }

  return (
    <Link href={`/productos/${product.id}`}>
      <motion.div
        whileHover={{ y: -5 }}
        transition={{ type: "spring", stiffness: 300 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className="h-full"
      >
        <Card className="overflow-hidden h-full border-2 hover:border-red-200 dark:hover:border-red-900 transition-all duration-300 group">
          <div className="relative aspect-square overflow-hidden bg-gray-100 dark:bg-gray-800">
            <Image
              src={product.image || "/placeholder.svg?height=300&width=300"}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-500"
              style={{ transform: isHovered ? "scale(1.05)" : "scale(1)" }}
            />

            {/* Overlay with action buttons */}
            <motion.div
              className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              initial={false}
              animate={{ opacity: isHovered ? 1 : 0 }}
            >
              <motion.div
                className="flex gap-2"
                initial={{ y: 20, opacity: 0 }}
                animate={{
                  y: isHovered ? 0 : 20,
                  opacity: isHovered ? 1 : 0,
                }}
                transition={{ duration: 0.2, delay: 0.1 }}
              >
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        size="icon"
                        variant="secondary"
                        className="h-10 w-10 rounded-full bg-white hover:bg-red-50 text-gray-700 hover:text-red-600 border-none shadow-md"
                        onClick={handleQuickView}
                      >
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">Vista rápida</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Vista rápida</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        size="icon"
                        variant="secondary"
                        className={cn(
                          "h-10 w-10 rounded-full bg-white hover:bg-red-50 border-none shadow-md",
                          isFavorite ? "text-red-600" : "text-gray-700 hover:text-red-600",
                        )}
                        onClick={handleToggleFavorite}
                      >
                        <Heart className={cn("h-4 w-4", isFavorite ? "fill-red-600" : "")} />
                        <span className="sr-only">Agregar a favoritos</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        size="icon"
                        variant="secondary"
                        className="h-10 w-10 rounded-full bg-white hover:bg-red-50 text-gray-700 hover:text-red-600 border-none shadow-md"
                        onClick={handleAddToCart}
                        disabled={product.stock === 0}
                      >
                        <ShoppingCart className="h-4 w-4" />
                        <span className="sr-only">Agregar al carrito</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Agregar al carrito</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </motion.div>
            </motion.div>

            {product.discount > 0 && (
              <Badge className="absolute top-2 left-2 bg-red-600 hover:bg-red-700">-{product.discount}%</Badge>
            )}
            {product.stock === 0 && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                <span className="text-white font-semibold text-lg">Agotado</span>
              </div>
            )}
          </div>
          <CardContent className="p-4">
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
              {product.category === "iphones"
                ? "iPhone"
                : product.category === "fundas"
                  ? "Funda"
                  : product.category === "cargadores"
                    ? "Cargador"
                    : product.category === "accesorios"
                      ? "Accesorio"
                      : "Oferta"}
            </div>
            <h3 className="font-semibold text-lg line-clamp-1 group-hover:text-red-600 transition-colors">
              {product.name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mt-1 h-10">{product.description}</p>
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center gap-2">
                {product.discount > 0 ? (
                  <>
                    <span className="text-lg font-bold text-red-600">
                      ${((product.price * (100 - product.discount)) / 100).toFixed(2)}
                    </span>
                    <span className="text-sm text-gray-500 line-through">${product.price.toFixed(2)}</span>
                  </>
                ) : (
                  <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
                )}
              </div>
            </div>
          </CardContent>
          <CardFooter className="p-4 pt-0">
            <Button
              className="w-full bg-gray-900 hover:bg-red-600 text-white dark:bg-gray-800 dark:hover:bg-red-600 transition-colors duration-300"
              disabled={product.stock === 0}
              onClick={handleAddToCart}
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              Agregar al carrito
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </Link>
  )
}
