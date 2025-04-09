"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar, User } from "lucide-react"
import Link from "next/link"

const news = [
  {
    id: 1,
    title: "Lanzamiento del iPhone 15: Todo lo que necesitas saber",
    excerpt:
      "Descubre las nuevas características y mejoras del último iPhone de Apple y cómo sacarle el máximo provecho.",
    image: "/placeholder.svg?height=400&width=600",
    date: "15 Sep 2023",
    author: "María García",
    category: "Novedades",
  },
  {
    id: 2,
    title: "Los mejores accesorios para proteger tu iPhone",
    excerpt: "Guía completa de los accesorios esenciales para mantener tu dispositivo en perfectas condiciones.",
    image: "/placeholder.svg?height=400&width=600",
    date: "28 Ago 2023",
    author: "Carlos Rodríguez",
    category: "Guías",
  },
  {
    id: 3,
    title: "Cómo maximizar la duración de la batería de tu iPhone",
    excerpt: "Consejos y trucos para extender la vida útil de la batería de tu dispositivo Apple.",
    image: "/placeholder.svg?height=400&width=600",
    date: "10 Ago 2023",
    author: "Laura Martínez",
    category: "Consejos",
  },
]

export default function LatestNews() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  }

  return (
    <section className="w-full py-16 md:py-24" ref={ref}>
      <div className="container px-4 md:px-6">
        <motion.div
          className="flex flex-col items-center justify-center space-y-4 text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-block bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-sm font-medium px-3 py-1 rounded-full mb-2"
          >
            Blog
          </motion.div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Últimas Noticias y Consejos</h2>
          <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            Mantente al día con las últimas tendencias y consejos para tu iPhone
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {news.map((item) => (
            <motion.div key={item.id} variants={itemVariants} whileHover={{ y: -5, transition: { duration: 0.2 } }}>
              <Card className="h-full overflow-hidden hover:shadow-lg transition-all duration-300 border-2 hover:border-gray-300 dark:hover:border-gray-700">
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-medium px-2 py-1 rounded">
                    {item.category}
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span className="mr-4">{item.date}</span>
                    <User className="h-4 w-4 mr-1" />
                    <span>{item.author}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 line-clamp-2 hover:text-red-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">{item.excerpt}</p>
                  <Button
                    variant="link"
                    className="p-0 h-auto text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 group"
                  >
                    Leer más
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="flex justify-center mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Link href="#">
            <Button variant="outline" className="group">
              Ver todas las publicaciones
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
