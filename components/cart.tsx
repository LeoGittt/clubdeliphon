"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { ShoppingBag, X, Plus, Minus, Trash2 } from "lucide-react";
import { products } from "@/lib/data";

interface CartProps {
  onClose: () => void;
}

export default function Cart({ onClose }: CartProps) {
  const [cartItems, setCartItems] = useState([
    { productId: "1", quantity: 1 },
    { productId: "3", quantity: 2 },
  ]);

  const cartProducts = cartItems
    .map((item) => {
      const product = products.find((p) => p.id === item.productId);
      return {
        ...product,
        quantity: item.quantity,
      };
    })
    .filter(Boolean);

  const subtotal = cartProducts.reduce((total, item) => {
    const price = item?.discount
      ? ((item.price ?? 0) * (100 - item.discount)) / 100
      : item?.price ?? 0;
    return total + price * (item?.quantity || 0);
  }, 0);

  const handleRemoveItem = (productId: string) => {
    setCartItems(cartItems.filter((item) => item.productId !== productId));
  };

  const handleUpdateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems(
      cartItems.map((item) =>
        item.productId === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  return (
    <div className="flex h-full flex-col bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Encabezado con efecto de vidrio */}
      <div className="flex items-center justify-between border-b border-gray-200 bg-white/80 backdrop-blur-sm px-6 py-4 dark:border-gray-700 dark:bg-gray-800/80">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">
          Tu Carrito <span className="text-red-500">•</span>
        </h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          
          <span className="sr-only">Cerrar</span>
        </Button>
      </div>

      {cartItems.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center space-y-6 p-8 text-center">
          <div className="relative">
            <div className="absolute -inset-4 rounded-full bg-red-100 opacity-60 blur-md dark:bg-red-900/30"></div>
            <div className="relative rounded-full bg-red-50 p-6 dark:bg-red-900/20">
              <ShoppingBag className="h-10 w-10 text-red-500 dark:text-red-400" />
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
              Carrito vacío
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Explora nuestros productos y encuentra algo especial
            </p>
          </div>
          <Button
            onClick={onClose}
            className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg shadow-red-200 dark:shadow-red-900/30"
          >
            Comenzar a comprar
          </Button>
        </div>
      ) : (
        <>
          <ScrollArea className="flex-1 px-4">
            <AnimatePresence initial={false}>
              {cartProducts.map((item) => (
                <motion.div
                  key={item?.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <div className="flex gap-4 py-4">
                    <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700">
                      <Image
                        src={item?.image || "/placeholder.svg"}
                        alt={item?.name || "Producto"}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      {item?.discount && (
                        <div className="absolute left-2 top-2 rounded-full bg-red-500 px-2 py-1 text-xs font-bold text-white shadow-sm">
                          -{item.discount}%
                        </div>
                      )}
                    </div>
                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <h3 className="font-medium text-gray-800 dark:text-white">
                          {item?.name}
                        </h3>
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-red-500">
                            $
                            {item?.discount
                              ? (
                                  ((item.price || 0) * (100 - item.discount)) /
                                  100
                                ).toFixed(2)
                              : (item?.price || 0).toFixed(2)}
                          </p>
                          {(item?.discount ?? 0) > 0 &&
                            item?.price !== undefined && (
                              <span className="text-xs text-gray-400 line-through">
                                ${item.price.toFixed(2)}
                              </span>
                            )}
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 w-8 rounded-full p-0"
                            onClick={() =>
                              handleUpdateQuantity(
                                item?.id || "",
                                (item?.quantity || 0) - 1
                              )
                            }
                          >
                            <Minus className="h-3 w-3" />
                            <span className="sr-only">Disminuir cantidad</span>
                          </Button>
                          <span className="w-6 text-center font-medium text-gray-800 dark:text-white">
                            {item?.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 w-8 rounded-full p-0"
                            onClick={() =>
                              handleUpdateQuantity(
                                item?.id || "",
                                (item?.quantity || 0) + 1
                              )
                            }
                          >
                            <Plus className="h-3 w-3" />
                            <span className="sr-only">Aumentar cantidad</span>
                          </Button>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 rounded-full p-0 text-gray-500 hover:text-red-500"
                          onClick={() => handleRemoveItem(item?.id || "")}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Eliminar</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                  <Separator className="bg-gray-200 dark:bg-gray-700" />
                </motion.div>
              ))}
            </AnimatePresence>
          </ScrollArea>

          {/* Resumen de compra */}
          <div className="border-t border-gray-200 bg-white/80 p-6 backdrop-blur-sm dark:border-gray-700 dark:bg-gray-800/80">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  Subtotal
                </span>
                <span className="font-medium text-gray-800 dark:text-white">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  Envío
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  Calculado al finalizar
                </span>
              </div>
              <Separator className="bg-gray-200 dark:bg-gray-700" />
              <div className="flex items-center justify-between">
                <span className="font-semibold text-gray-800 dark:text-white">
                  Total
                </span>
                <span className="text-lg font-bold text-red-500">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <Button className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg shadow-red-200 dark:shadow-red-900/30 py-3 text-base">
                Finalizar compra
              </Button>
              <Button
                variant="outline"
                className="w-full border-gray-300 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700 py-3 text-base"
                onClick={onClose}
              >
                Seguir comprando
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
