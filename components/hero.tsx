"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import {
  ArrowRight,
  ShoppingBag,
  Check,
  Sparkles,
  ChevronDown,
} from "lucide-react";

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        mass: 0.5,
      },
    },
  };

  return (
    <section
      ref={ref}
      className="w-full py-12 md:py-28 lg:py-36 xl:py-44 overflow-hidden relative isolate"
      style={{
        perspective: "1000px",
      }}
    >
      {/* Fondo con efecto de profundidad */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y, opacity, scale }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-950" />
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-[length:80px_80px] opacity-5 dark:opacity-[0.02]" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

        {/* Efectos de luz */}
        <div className="absolute left-1/4 top-1/4 -z-10 h-[300px] w-[300px] rounded-full bg-red-500/10 blur-[100px] dark:bg-red-600/10" />
        <div className="absolute right-1/4 bottom-1/4 -z-10 h-[300px] w-[300px] rounded-full bg-blue-500/10 blur-[100px] dark:bg-blue-600/10" />
      </motion.div>

      <div className="container px-4 md:px-6 relative z-10 h-full">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:gap-16 items-center h-full">
          {/* Contenido de texto */}
          <motion.div
            className="flex flex-col justify-center space-y-6 lg:space-y-8 text-center md:text-left"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="space-y-5">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-700 text-white text-sm font-medium px-4 py-2 rounded-full shadow-lg shadow-red-500/20 hover:shadow-red-600/30 transition-all duration-300 mx-auto md:mx-0"
              >
                <Sparkles className="h-4 w-4" />
                <span>Lanzamiento exclusivo</span>
                <ChevronDown className="h-4 w-4 ml-1 opacity-80" />
              </motion.div>

              <motion.h1
                className="text-4xl font-bold tracking-tight sm:text-5xl xl:text-[3.4rem]/[1.1]"
                variants={itemVariants}
              >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-red-800 dark:from-red-500 dark:to-red-300">
                  Experiencia iPhone
                </span>
                <br />
                <span className="text-gray-900 dark:text-white">
                  rediseñada
                </span>
              </motion.h1>

              <motion.p
                className="max-w-[500px] text-gray-600 md:text-lg dark:text-gray-300 leading-relaxed mx-auto md:mx-0"
                variants={itemVariants}
              >
                Descubrí la nueva generación de accesorios diseñados para
                potenciar tu iPhone al máximo.
              </motion.p>
            </motion.div>

            <motion.div
              className="flex flex-col gap-3 sm:flex-row sm:items-center justify-center md:justify-start"
              variants={itemVariants}
            >
              <Link href="/productos" className="w-full sm:w-auto">
                <Button
                  className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white group relative overflow-hidden shadow-lg shadow-red-500/30 hover:shadow-red-600/40 transition-all duration-300 h-12 px-6"
                  size="lg"
                >
                  <span className="relative z-10 flex items-center font-medium">
                    Explorar colección
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Button>
              </Link>

              <Link
                href="/productos?categoria=ofertas"
                className="w-full sm:w-auto"
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full h-12 px-6 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group"
                >
                  <ShoppingBag className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
                  <span className="font-medium">Ver ofertas</span>
                </Button>
              </Link>
            </motion.div>

            <motion.div
              className="grid gap-3 sm:grid-cols-2 mt-4 max-w-[500px] mx-auto md:mx-0"
              variants={itemVariants}
            >
              {[
                "Envío express 24/48h",
                "Garantía premium 2 años",
                "Soporte técnico incluido",
                "Pago seguro",
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="flex-shrink-0 bg-red-100 dark:bg-red-900/20 p-1.5 rounded-full">
                    <Check className="h-4 w-4 text-red-600 dark:text-red-400" />
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {feature}
                  </p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Imagen con efecto 3D mejorado - Oculto en móvil */}
          <motion.div
            className="relative h-[400px] md:h-[500px] lg:h-full flex items-center justify-center md:block"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.div
              className="relative w-full h-full"
              style={{
                transformStyle: "preserve-3d",
              }}
              initial={{
                rotateY: 15,
                rotateX: 5,
                scale: 0.95,
              }}
              animate={{
                rotateY: 0,
                rotateX: 0,
                scale: 1,
              }}
              transition={{
                duration: 1.2,
                delay: 0.6,
                type: "spring",
                stiffness: 60,
                damping: 15,
              }}
              whileHover={{
                rotateY: 5,
                rotateX: 2,
                transition: { duration: 0.5 },
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center rounded-xl">
                <div className="relative w-full h-full max-w-[80%] mx-auto">
                  <Image
                    src="/club.jpg"
                    alt="iPhone 15 Pro"
                    fill
                    className="object-contain drop-shadow-2xl"
                    priority
                    quality={100}
                    style={{
                      transform: "translateZ(50px)",
                    }}
                  />

                  {/* Reflejo y brillo */}
                  <div className="absolute inset-0 rounded-[40px] overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent opacity-20 dark:opacity-10" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent" />
                  </div>

                  {/* Sombra */}
                  <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 w-[70%] h-8 bg-black/20 dark:bg-black/30 blur-[20px] rounded-full" />
                </div>
              </div>

              {/* Efectos de partículas */}
              <motion.div
                className="absolute top-[20%] right-[10%] h-16 w-16 rounded-full bg-gradient-to-br from-yellow-400/30 to-yellow-300/30 blur-[20px] -z-10"
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.6, 0.3, 0.6],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />

              <motion.div
                className="absolute bottom-[25%] left-[10%] h-20 w-20 rounded-full bg-gradient-to-br from-blue-400/30 to-blue-300/30 blur-[25px] -z-10"
                animate={{
                  y: [0, 25, 0],
                  opacity: [0.5, 0.2, 0.5],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: 1,
                }}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Indicador de scroll - Oculto en móvil */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden md:block"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 0.6 }}
      >
        <motion.div
          className="w-8 h-12 rounded-full border border-gray-300 dark:border-gray-600 flex justify-center p-1.5 group cursor-pointer hover:border-red-400 dark:hover:border-red-500 transition-colors"
          animate={{ y: [0, 10, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <motion.div
            className="w-2 h-2 bg-red-600 dark:bg-red-500 rounded-full group-hover:bg-red-500 dark:group-hover:bg-red-400 transition-colors"
            animate={{
              y: [0, 20, 0],
              opacity: [1, 0.3, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
