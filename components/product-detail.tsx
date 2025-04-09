"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  ShoppingCart,
  Heart,
  Share2,
  Truck,
  ShieldCheck,
  RotateCcw,
  Star,
  StarHalf,
  ChevronRight,
} from "lucide-react";
import { products } from "@/lib/data";
import { useToast } from "@/components/ui/use-toast";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface ProductDetailProps {
  id: string;
}

export default function ProductDetail({ id }: ProductDetailProps) {
  const { toast } = useToast();
  const product = products.find((p) => p.id === id);

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState("description");

  if (!product) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold">Producto no encontrado</h2>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          El producto que estás buscando no existe o ha sido eliminado.
        </p>
        <Button
          className="mt-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white"
          asChild
        >
          <a href="/productos">Ver todos los productos</a>
        </Button>
      </div>
    );
  }

  const productImages = [
    product.image || "/placeholder.svg?height=600&width=600",
    "/placeholder.svg?height=600&width=600",
    "/placeholder.svg?height=600&width=600",
    "/placeholder.svg?height=600&width=600",
  ];

  const handleAddToCart = () => {
    toast({
      title: "✅ Producto agregado",
      description: `${product.name} ha sido agregado al carrito`,
      className:
        "bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-800",
    });
  };

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast({
      title: isFavorite
        ? "❤️ Eliminado de favoritos"
        : "❤️ Agregado a favoritos",
      description: `${product.name} ha sido ${
        isFavorite ? "eliminado de" : "agregado a"
      } tus favoritos`,
      className: isFavorite
        ? ""
        : "bg-pink-50 dark:bg-pink-900/30 border-pink-200 dark:border-pink-800",
    });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "🔗 Enlace copiado",
      description: "Puedes compartir este producto ahora",
      className:
        "bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800",
    });
  };

  const categoryMap = {
    iphones: "iPhone",
    fundas: "Funda Premium",
    cargadores: "Cargador",
    accesorios: "Accesorio",
    ofertas: "Oferta Especial",
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Gallery Section */}
        <div className="space-y-4">
          <motion.div
            className="relative aspect-square overflow-hidden rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.01 }}
          >
            <Image
              src={productImages[selectedImage]}
              alt={product.name}
              fill
              className="object-contain p-4"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {product.discount > 0 && (
              <Badge className="absolute top-4 left-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 shadow-lg">
                -{product.discount}%
              </Badge>
            )}
            {product.stock === 0 && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                <span className="text-white font-semibold text-lg bg-red-600 px-4 py-2 rounded-lg">
                  AGOTADO
                </span>
              </div>
            )}
          </motion.div>

          <div className="grid grid-cols-4 gap-3">
            {productImages.map((image, index) => (
              <motion.button
                key={index}
                className={`relative aspect-square overflow-hidden rounded-lg border-2 ${
                  selectedImage === index
                    ? "border-red-600 dark:border-red-500 ring-2 ring-red-500/20"
                    : "border-gray-200 dark:border-gray-700"
                } bg-gray-50 dark:bg-gray-800`}
                onClick={() => setSelectedImage(index)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.15 }}
              >
                <Image
                  src={image}
                  alt={`${product.name} - Vista ${index + 1}`}
                  fill
                  className="object-contain p-2"
                />
              </motion.button>
            ))}
          </div>
        </div>

        {/* Product Info Section */}
        <div className="space-y-6">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <Badge variant="outline" className="text-sm font-medium">
                {categoryMap[product.category as keyof typeof categoryMap] || "Producto"}
              </Badge>
              <Badge
                variant="outline"
                className={`text-sm font-medium ${
                  product.stock > 0
                    ? "bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800"
                    : "bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800"
                }`}
              >
                {product.stock > 0 ? "EN STOCK" : "AGOTADO"}
              </Badge>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              {product.name}
            </h1>

            <div className="flex items-center gap-3 mt-3">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-5 w-5 ${
                      star <= 4.5
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300 dark:text-gray-600"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                4.5 (121 reseñas)
              </span>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                •
              </span>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                +50 vendidos
              </span>
            </div>

            <div className="mt-5">
              {product.discount > 0 ? (
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl md:text-4xl font-bold text-red-600">
                    $
                    {((product.price * (100 - product.discount)) / 100).toFixed(
                      2
                    )}
                  </span>
                  <span className="text-xl text-gray-500 line-through dark:text-gray-400">
                    ${product.price.toFixed(2)}
                  </span>
                  <span className="text-sm bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 px-2 py-1 rounded-full">
                    Ahorras $
                    {(
                      product.price -
                      (product.price * (100 - product.discount)) / 100
                    ).toFixed(2)}
                  </span>
                </div>
              ) : (
                <span className="text-3xl md:text-4xl font-bold">
                  ${product.price.toFixed(2)}
                </span>
              )}
            </div>
          </div>

          <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
            {product.description} Diseño premium con materiales de alta calidad
            que ofrecen durabilidad y estilo.
          </p>

          {/* Quantity and Actions */}
          <div className="space-y-5">
            <div className="flex items-center gap-5">
              <div className="flex items-center border rounded-lg overflow-hidden">
                <Button
                  variant="ghost"
                  size="lg"
                  className="h-12 w-12 rounded-none border-r"
                  onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                  disabled={quantity <= 1}
                >
                  -
                </Button>
                <div className="h-12 w-16 flex items-center justify-center text-lg font-medium">
                  {quantity}
                </div>
                <Button
                  variant="ghost"
                  size="lg"
                  className="h-12 w-12 rounded-none border-l"
                  onClick={() => setQuantity(quantity + 1)}
                  disabled={product.stock === 0}
                >
                  +
                </Button>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {product.stock > 0
                  ? `📦 ${product.stock} unidades disponibles`
                  : "⚠️ No disponible temporalmente"}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                className="flex-1 h-14 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-lg hover:shadow-red-500/30"
                size="lg"
                onClick={handleAddToCart}
                disabled={product.stock === 0}
              >
                <ShoppingCart className="mr-3 h-5 w-5" />
                Añadir al carrito
              </Button>

              <Button
                variant={isFavorite ? "default" : "outline"}
                size="lg"
                className={`h-14 ${
                  isFavorite ? "bg-red-600 hover:bg-red-700 text-white" : ""
                }`}
                onClick={handleToggleFavorite}
              >
                <Heart
                  className={`mr-3 h-5 w-5 ${isFavorite ? "fill-white" : ""}`}
                />
                {isFavorite ? "Guardado" : "Favorito"}
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="h-14 aspect-square p-0"
                onClick={handleShare}
              >
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4">
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="bg-blue-100 dark:bg-blue-900/20 p-2 rounded-full text-blue-600 dark:text-blue-400">
                  <Truck className="h-5 w-5" />
                </div>
                <div className="text-sm">
                  <p className="font-medium">Envío Express</p>
                  <p className="text-gray-500 dark:text-gray-400">
                    Entrega en 24-48h
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="bg-green-100 dark:bg-green-900/20 p-2 rounded-full text-green-600 dark:text-green-400">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div className="text-sm">
                  <p className="font-medium">Garantía</p>
                  <p className="text-gray-500 dark:text-gray-400">24 meses</p>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="bg-purple-100 dark:bg-purple-900/20 p-2 rounded-full text-purple-600 dark:text-purple-400">
                  <RotateCcw className="h-5 w-5" />
                </div>
                <div className="text-sm">
                  <p className="font-medium">Devoluciones</p>
                  <p className="text-gray-500 dark:text-gray-400">
                    30 días sin preguntas
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Product Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="pt-6">
            <TabsList className="grid w-full grid-cols-3 bg-gray-100 dark:bg-gray-800">
              <TabsTrigger
                value="description"
                className="data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:dark:bg-gray-700"
              >
                Descripción
              </TabsTrigger>
              <TabsTrigger
                value="specifications"
                className="data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:dark:bg-gray-700"
              >
                Especificaciones
              </TabsTrigger>
              <TabsTrigger
                value="reviews"
                className="data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:dark:bg-gray-700"
              >
                Reseñas (121)
              </TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="pt-6">
              <div className="prose dark:prose-invert max-w-none">
                <h3 className="text-xl font-semibold mb-4">
                  Detalles del producto
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  {product.description} Este producto ha sido diseñado para
                  ofrecer la máxima calidad y durabilidad. Fabricado con
                  materiales premium que garantizan un rendimiento excepcional.
                </p>
                <ul className="mt-4 space-y-2">
                  <li>✔ Materiales de alta calidad</li>
                  <li>✔ Diseño ergonómico y moderno</li>
                  <li>✔ Compatibilidad garantizada</li>
                  <li>✔ Incluye accesorios originales</li>
                  <li>✔ Empaquetado ecológico</li>
                </ul>
              </div>
            </TabsContent>

            <TabsContent value="specifications" className="pt-6">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">
                  Especificaciones técnicas
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-gray-600 dark:text-gray-400">
                        Modelo
                      </span>
                      <span className="font-medium">iPhone 15 Pro</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-gray-600 dark:text-gray-400">
                        Color
                      </span>
                      <span className="font-medium">Negro Titanio</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-gray-600 dark:text-gray-400">
                        Material
                      </span>
                      <span className="font-medium">Acero inoxidable</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-gray-600 dark:text-gray-400">
                        Peso
                      </span>
                      <span className="font-medium">187 gramos</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-gray-600 dark:text-gray-400">
                        Dimensiones
                      </span>
                      <span className="font-medium">146.7 x 71.5 x 7.8 mm</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-gray-600 dark:text-gray-400">
                        Garantía
                      </span>
                      <span className="font-medium">24 meses</span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="pt-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-semibold">
                      Opiniones de clientes
                    </h3>
                    <div className="flex items-center mt-1">
                      <span className="text-2xl font-bold mr-2">4.5</span>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-5 w-5 ${
                              star <= 4.5
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300 dark:text-gray-600"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-gray-600 dark:text-gray-400 ml-2">
                        (121 reseñas)
                      </span>
                    </div>
                  </div>
                  <Button variant="outline">Escribir reseña</Button>
                </div>

                <div className="space-y-5">
                  {/* Review 1 */}
                  <div className="border-b pb-5">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                          <span className="font-medium">JP</span>
                        </div>
                        <div>
                          <p className="font-medium">Juan Pérez</p>
                          <div className="flex items-center">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`h-4 w-4 ${
                                  star <= 5
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-300 dark:text-gray-600"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">Hace 2 días</span>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">
                      Excelente producto, superó mis expectativas. La calidad es
                      premium y el envío fue muy rápido. Definitivamente
                      recomiendo esta tienda.
                    </p>
                  </div>

                  {/* Review 2 */}
                  <div className="border-b pb-5">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                          <span className="font-medium">MG</span>
                        </div>
                        <div>
                          <p className="font-medium">María González</p>
                          <div className="flex items-center">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`h-4 w-4 ${
                                  star <= 4
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-300 dark:text-gray-600"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">
                        Hace 1 semana
                      </span>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">
                      Muy buen producto en general, aunque el envío tardó un
                      poco más de lo esperado. La calidad es excelente y cumple
                      con lo prometido.
                    </p>
                  </div>
                </div>

                <Button variant="outline" className="w-full">
                  Ver todas las reseñas
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
