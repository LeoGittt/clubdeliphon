"use client";
import { motion, useInView, useScroll, useTransform, useMotionTemplate } from "framer-motion";
import { useRef } from "react";
import ProductCard from "@/components/product-card";
import { products } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export default function FeaturedProducts() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -50]);
  const opacity = useMotionTemplate`${useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0])}`;
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.98]);

  const featuredProducts = products
    .filter((product) => product.featured)
    .slice(0, 4);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
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
  };

  return (
    <section
      className="w-full py-16 md:py-24 lg:py-28 relative overflow-hidden"
      ref={ref}
      style={{ opacity: opacity as any }}
    >
      {/* Background elements */}
      <motion.div
        className="absolute inset-0 overflow-hidden -z-10"
        style={{ scale }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/80 to-background" />
        <motion.div
          className="absolute top-[10%] -right-[10%] w-[600px] h-[600px] rounded-full bg-gradient-to-br from-red-100 to-red-200 dark:from-red-900/20 dark:to-red-800/30 blur-[100px] opacity-30 dark:opacity-20"
          style={{ y }}
        />
        <motion.div
          className="absolute bottom-[10%] -left-[10%] w-[600px] h-[600px] rounded-full bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/20 dark:to-blue-800/30 blur-[100px] opacity-30 dark:opacity-20"
          style={{ y: useTransform(scrollYProgress, [0, 1], [-50, 100]) }}
        />
      </motion.div>

      <div className="container px-4 md:px-6 relative">
        <motion.div
          className="flex flex-col items-center justify-center space-y-4 text-center mb-12 md:mb-16"
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
            className="inline-flex items-center gap-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-sm font-medium px-4 py-1.5 rounded-full mb-3"
          >
            <Sparkles className="h-4 w-4" />
            <span>Productos Destacados</span>
          </motion.div>
          <motion.h2
            className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Nuestra{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-red-800 dark:from-red-500 dark:to-red-300">
              Selección Premium
            </span>
          </motion.h2>
          <motion.p
            className="mx-auto max-w-[700px] text-gray-500 md:text-lg lg:text-xl dark:text-gray-400"
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Descubre los productos más exclusivos diseñados para elevar tu
            experiencia con el iPhone
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              variants={itemVariants}
              whileHover={{
                y: -8,
                transition: {
                  type: "spring",
                  stiffness: 300,
                  damping: 10,
                },
              }}
              whileTap={{ scale: 0.98 }}
              className="transform-gpu"
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="flex justify-center mt-12 md:mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Link href="/productos" className="group">
            <Button
              className="relative overflow-hidden bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-lg shadow-red-500/20 hover:shadow-red-600/30 h-12 px-8"
              size="lg"
            >
              <span className="relative z-10 flex items-center font-medium">
                Ver todos los productos
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
