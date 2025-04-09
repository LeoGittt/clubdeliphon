"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronRight, Star } from "lucide-react";

const brands = [
  {
    id: 1,
    name: "Apple",
    logo: "/apple-logo.svg",
    featured: true,
    description: "Tecnología innovadora y diseño premium",
  },
  {
    id: 2,
    name: "Belkin",
    logo: "/belkin-logo.svg",
    featured: true,
    description: "Soluciones de carga y conectividad",
  },
  {
    id: 3,
    name: "Spigen",
    logo: "/spigen-logo.svg",
    featured: false,
    description: "Protección duradera para tus dispositivos",
  },
  {
    id: 4,
    name: "Anker",
    logo: "/anker-logo.svg",
    featured: false,
    description: "Tecnología de carga líder en el mercado",
  },
  {
    id: 5,
    name: "Mophie",
    logo: "/mophie-logo.svg",
    featured: true,
    description: "Baterías y accesorios certificados",
  },
  {
    id: 6,
    name: "OtterBox",
    logo: "/otterbox-logo.svg",
    featured: false,
    description: "Protección a prueba de todo",
  },
  {
    id: 7,
    name: "Logitech",
    logo: "/logitech-logo.svg",
    featured: false,
    description: "Accesorios para productividad",
  },
  {
    id: 8,
    name: "Samsung",
    logo: "/samsung-logo.svg",
    featured: true,
    description: "Innovación y calidad comprobada",
  },
];

export default function BrandsShowcase() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.98]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
    hover: {
      y: -8,
      scale: 1.03,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 10,
      },
    },
  };

  const featuredBrands = brands.filter((brand) => brand.featured);
  const otherBrands = brands.filter((brand) => !brand.featured);

  return (
    <motion.section
      className="w-full py-20 md:py-28 lg:py-32 relative overflow-hidden bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950"
      ref={ref}
      style={{ opacity }}
    >
      {/* Background elements */}
      <motion.div className="absolute inset-0 -z-10" style={{ scale }}>
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-[length:80px_80px] opacity-5 dark:opacity-[0.02]" />
        <motion.div
          className="absolute top-[20%] left-[10%] w-[400px] h-[400px] rounded-full bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/20 dark:to-blue-800/30 blur-[100px] opacity-30 dark:opacity-20"
          style={{ y }}
        />
        <motion.div
          className="absolute bottom-[20%] right-[10%] w-[400px] h-[400px] rounded-full bg-gradient-to-br from-red-100 to-red-200 dark:from-red-900/20 dark:to-red-800/30 blur-[100px] opacity-30 dark:opacity-20"
          style={{ y: useTransform(scrollYProgress, [0, 1], [-50, 100]) }}
        />
      </motion.div>

      <div className="container px-4 md:px-6 relative">
        <motion.div
          className="flex flex-col items-center justify-center space-y-4 text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={
              isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
            }
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium px-4 py-1.5 rounded-full mb-3"
          >
            <Star className="h-4 w-4" />
            <span>Marcas Premium</span>
          </motion.div>

          <motion.h2
            className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-500 dark:to-blue-300">
              Colaboramos
            </span>{" "}
            con los Mejores
          </motion.h2>

          <motion.p
            className="mx-auto max-w-[700px] text-gray-500 md:text-lg lg:text-xl dark:text-gray-400"
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Ofrecemos solo productos de marcas líderes con garantía oficial y
            calidad certificada
          </motion.p>
        </motion.div>

        {/* Featured Brands */}
        <motion.div
          className="mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <h3 className="text-xl font-semibold mb-6 text-center">
            Marcas Destacadas
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
            {featuredBrands.map((brand) => (
              <motion.div
                key={brand.id}
                variants={itemVariants}
                whileHover="hover"
                whileTap={{ scale: 0.98 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="relative h-20 w-20 mb-4">
                    <Image
                      src={brand.logo}
                      alt={brand.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <h4 className="font-bold text-lg mb-1">{brand.name}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {brand.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* All Brands */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <h3 className="text-xl font-semibold mb-6 text-center">
            Nuestras Marcas
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {brands.map((brand) => (
              <motion.div
                key={brand.id}
                variants={itemVariants}
                whileHover="hover"
                className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-xs hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-gray-700"
              >
                <div className="flex flex-col items-center">
                  <div className="relative h-16 w-16 mb-3">
                    <Image
                      src={brand.logo}
                      alt={brand.name}
                      fill
                      className="object-contain"
                    />
                    {brand.featured && (
                      <div className="absolute -top-2 -right-2 bg-yellow-400 dark:bg-yellow-500 text-white rounded-full p-1">
                        <Star className="h-3 w-3" />
                      </div>
                    )}
                  </div>
                  <h4 className="font-medium text-sm">{brand.name}</h4>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="flex justify-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <Link href="/marcas" className="group">
            <Button
              variant="outline"
              className="border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 h-12 px-8 group"
            >
              <span className="flex items-center font-medium">
                Ver todas las marcas
                <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Button>
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
}
