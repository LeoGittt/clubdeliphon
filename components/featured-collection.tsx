"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Check, Sparkles } from "lucide-react";

export default function FeaturedCollection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.98]);

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
    <motion.section
      className="w-full py-16 md:py-24 lg:py-28 relative overflow-hidden"
      ref={ref}
      style={{ opacity }}
    >
      {/* Background elements */}
      <motion.div className="absolute inset-0 -z-10" style={{ scale }}>
        <div className="absolute inset-0 bg-gradient-to-r from-red-50/50 via-gray-50/50 to-gray-100/50 dark:from-gray-900/90 dark:via-gray-800/90 dark:to-gray-950/90" />
        <motion.div
          className="absolute top-[20%] left-[10%] w-[300px] h-[300px] rounded-full bg-red-100/50 dark:bg-red-900/20 blur-[100px]"
          style={{ y: y1 }}
        />
        <motion.div
          className="absolute bottom-[20%] right-[10%] w-[300px] h-[300px] rounded-full bg-blue-100/50 dark:bg-blue-900/20 blur-[100px]"
          style={{ y: y2 }}
        />
      </motion.div>

      <div className="container px-4 md:px-6 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Image section */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-2xl">
              <Image
                src="/colecc.jpg?height=600&width=800"
                alt="Colección iPhone 15"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 md:p-8 text-white">
                <motion.h3
                  className="text-2xl md:text-3xl font-bold mb-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={
                    isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                  }
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  Colección iPhone 15 Pro
                </motion.h3>
                <motion.p
                  className="text-gray-200 md:text-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={
                    isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                  }
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  Diseño premium para tu nuevo iPhone
                </motion.p>
              </div>
            </div>

            <motion.div
              className="absolute -bottom-8 -right-8 w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-xl z-10"
              style={{ y: y1 }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={
                isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
              }
              transition={{ duration: 0.5, delay: 0.6 }}
              whileHover={{ scale: 1.05 }}
            >
              <Image
                src="/club.jpg?height=240&width=240"
                alt="Accesorios premium"
                fill
                className="object-cover"
              />
            </motion.div>
          </motion.div>

          {/* Content section */}
          <motion.div
            className="flex flex-col space-y-6 md:space-y-8"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="inline-flex items-center gap-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-sm font-medium px-4 py-1.5 rounded-full self-start"
            >
              <Sparkles className="h-4 w-4" />
              <span>Colección Destacada</span>
            </motion.div>

            <motion.h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-red-800 dark:from-red-500 dark:to-red-300">
                Descubre
              </span>{" "}
              la Nueva Colección
            </motion.h2>

            <motion.p
              className="text-gray-600 dark:text-gray-300 text-lg md:text-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              Explora nuestra selección exclusiva de accesorios diseñados
              específicamente para el iPhone 15. Combina estilo, protección y
              funcionalidad con nuestros productos premium.
            </motion.p>

            <motion.ul
              className="space-y-3 md:space-y-4"
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              {[
                "Fundas de diseño exclusivo",
                "Protectores de pantalla resistentes",
                "Cargadores rápidos certificados",
                "Accesorios MagSafe compatibles",
                "Materiales premium ecológicos",
                "Garantía extendida de 2 años",
              ].map((item, index) => (
                <motion.li
                  key={index}
                  className="flex items-center"
                  variants={itemVariants}
                  whileHover={{ x: 5 }}
                >
                  <div className="flex-shrink-0 bg-red-100 dark:bg-red-900/20 p-1 rounded-full mr-3">
                    <Check className="h-4 w-4 text-red-600 dark:text-red-400" />
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">
                    {item}
                  </span>
                </motion.li>
              ))}
            </motion.ul>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 1.2 }}
              className="pt-2"
            >
              <Link href="/productos?categoria=iphones" className="group">
                <Button
                  className="relative overflow-hidden bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-lg shadow-red-500/20 hover:shadow-red-600/30 h-12 px-8"
                  size="lg"
                >
                  <span className="relative z-10 flex items-center font-medium">
                    Ver colección completa
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
