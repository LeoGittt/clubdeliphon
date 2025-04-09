"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import {
  Phone,
  Smartphone,
  Battery,
  Headphones,
  Tag,
  Sparkles,
} from "lucide-react";

const categories = [
  {
    id: "iphones",
    name: "iPhones",
    icon: Phone,
    description: "Los últimos modelos con garantía oficial",
    color: "bg-blue-100 dark:bg-blue-900/30",
    textColor: "text-blue-600 dark:text-blue-300",
    hoverColor: "group-hover:bg-blue-200 dark:group-hover:bg-blue-800/40",
    iconHoverColor: "group-hover:text-blue-700 dark:group-hover:text-blue-200",
    borderColor: "border-blue-200 dark:border-blue-800/40",
    gradient:
      "from-blue-400/10 to-blue-600/10 dark:from-blue-800/20 dark:to-blue-900/20",
  },
  {
    id: "fundas",
    name: "Fundas",
    icon: Smartphone,
    description: "Protección premium con diseño exclusivo",
    color: "bg-green-100 dark:bg-green-900/30",
    textColor: "text-green-600 dark:text-green-300",
    hoverColor: "group-hover:bg-green-200 dark:group-hover:bg-green-800/40",
    iconHoverColor:
      "group-hover:text-green-700 dark:group-hover:text-green-200",
    borderColor: "border-green-200 dark:border-green-800/40",
    gradient:
      "from-green-400/10 to-green-600/10 dark:from-green-800/20 dark:to-green-900/20",
  },
  {
    id: "cargadores",
    name: "Cargadores",
    icon: Battery,
    description: "Carga rápida certificada por Apple",
    color: "bg-yellow-100 dark:bg-yellow-900/30",
    textColor: "text-yellow-600 dark:text-yellow-300",
    hoverColor: "group-hover:bg-yellow-200 dark:group-hover:bg-yellow-800/40",
    iconHoverColor:
      "group-hover:text-yellow-700 dark:group-hover:text-yellow-200",
    borderColor: "border-yellow-200 dark:border-yellow-800/40",
    gradient:
      "from-yellow-400/10 to-yellow-600/10 dark:from-yellow-800/20 dark:to-yellow-900/20",
  },
  {
    id: "accesorios",
    name: "Accesorios",
    icon: Headphones,
    description: "Complementos para tu ecosistema Apple",
    color: "bg-purple-100 dark:bg-purple-900/30",
    textColor: "text-purple-600 dark:text-purple-300",
    hoverColor: "group-hover:bg-purple-200 dark:group-hover:bg-purple-800/40",
    iconHoverColor:
      "group-hover:text-purple-700 dark:group-hover:text-purple-200",
    borderColor: "border-purple-200 dark:border-purple-800/40",
    gradient:
      "from-purple-400/10 to-purple-600/10 dark:from-purple-800/20 dark:to-purple-900/20",
  },
  {
    id: "ofertas",
    name: "Ofertas",
    icon: Tag,
    description: "Descuentos exclusivos por tiempo limitado",
    color: "bg-red-100 dark:bg-red-900/30",
    textColor: "text-red-600 dark:text-red-300",
    hoverColor: "group-hover:bg-red-200 dark:group-hover:bg-red-800/40",
    iconHoverColor: "group-hover:text-red-700 dark:group-hover:text-red-200",
    borderColor: "border-red-200 dark:border-red-800/40",
    gradient:
      "from-red-400/10 to-red-600/10 dark:from-red-800/20 dark:to-red-900/20",
  },
];

export default function Categories() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
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
    hover: {
      y: -8,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 10,
      },
    },
  };

  return (
    <motion.section
      className="w-full py-16 md:py-24 lg:py-28 relative overflow-hidden bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950"
      ref={ref}
      style={{ opacity }}
    >
      {/* Background elements */}
      <motion.div className="absolute inset-0 -z-10" style={{ scale }}>
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-[length:80px_80px] opacity-5 dark:opacity-[0.02]" />
        <motion.div
          className="absolute top-[20%] left-[10%] w-[400px] h-[400px] rounded-full bg-gradient-to-br from-red-100 to-red-200 dark:from-red-900/20 dark:to-red-800/30 blur-[100px] opacity-30 dark:opacity-20"
          style={{ y }}
        />
        <motion.div
          className="absolute bottom-[20%] right-[10%] w-[400px] h-[400px] rounded-full bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/20 dark:to-blue-800/30 blur-[100px] opacity-30 dark:opacity-20"
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
            <span>Explora por Categorías</span>
          </motion.div>

          <motion.h2
            className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-red-800 dark:from-red-500 dark:to-red-300">
              Descubre
            </span>{" "}
            Nuestras Categorías
          </motion.h2>

          <motion.p
            className="mx-auto max-w-[700px] text-gray-500 md:text-lg lg:text-xl dark:text-gray-400"
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Encuentra exactamente lo que necesitas para tu dispositivo Apple
            entre nuestras categorías premium
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              variants={itemVariants}
              whileHover="hover"
              whileTap={{ scale: 0.98 }}
            >
              <Link
                href={`/productos?categoria=${category.id}`}
                className="group block h-full"
              >
                <Card
                  className={`h-full overflow-hidden transition-all duration-300 border ${category.borderColor} hover:shadow-lg hover:shadow-${category.textColor}/10`}
                >
                  <CardContent className="p-6 flex flex-col items-center text-center h-full">
                    <div
                      className={`relative p-6 rounded-full ${category.color} ${category.hoverColor} transition-colors duration-300 mb-5 group-hover:scale-105`}
                    >
                      <div
                        className={`absolute inset-0 rounded-full bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                      />
                      <category.icon
                        className={`relative z-10 h-8 w-8 ${category.textColor} ${category.iconHoverColor} transition-colors duration-300`}
                      />
                    </div>
                    <h3 className="font-semibold text-lg group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors duration-300 mb-2">
                      {category.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 flex-grow">
                      {category.description}
                    </p>
                    <span className="mt-4 text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors duration-300">
                      Ver productos →
                    </span>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
