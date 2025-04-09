"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote, Sparkles } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  rating: number;
  image: string;
  featured?: boolean;
  highlight: string;
}

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  // Configuración de la API Random User
  const fetchRandomPhotos = async (count: number) => {
    const response = await fetch(
      `https://randomuser.me/api/?results=${count}&inc=picture,name`
    );
    const data = await response.json();
    return data.results.map((user: any) => user.picture.large);
  };

  useEffect(() => {
    const loadTestimonials = async () => {
      const photos = await fetchRandomPhotos(6);

      const testimonialData: Testimonial[] = [
        {
          id: 1,
          name: "Marío García",
          role: "Diseñadora UX",
          content:
            "Increíble calidad en todos los productos. Las fundas son resistentes y los accesorios funcionan perfectamente con mi iPhone. Definitivamente volveré a comprar.",
          rating: 5,
          image: photos[0],
          featured: true,
          highlight: "Calidad premium",
        },
        {
          id: 2,
          name: "Carlos Rodríguez",
          role: "Ingeniero de Software",
          content:
            "El servicio al cliente es excepcional. Tuve un problema con mi pedido y lo resolvieron inmediatamente. Los productos son de primera calidad.",
          rating: 5,
          image: photos[1],
          featured: true,
          highlight: "Servicio excepcional",
        },
        {
          id: 3,
          name: "Laura Martínez",
          role: "Fotógrafa Profesional",
          content:
            "Como fotógrafa, necesito accesorios confiables para mi iPhone. Los productos de El Club Del iPhone superaron mis expectativas. Excelente calidad y durabilidad.",
          rating: 4,
          image: photos[2],
          highlight: "Diseño profesional",
        },
        {
          id: 4,
          name: "Juan Pérez",
          role: "Estudiante Universitario",
          content:
            "Precios accesibles y productos de calidad. Mi funda ha sobrevivido a varias caídas y sigue como nueva. Recomiendo totalmente esta tienda.",
          rating: 5,
          image: photos[3],
          highlight: "Durabilidad comprobada",
        },
        {
          id: 5,
          name: "Ana López",
          role: "Ejecutiva de Marketing",
          content:
            "La entrega fue súper rápida y el producto llegó perfectamente empaquetado. La calidad es notablemente mejor que otras marcas que he probado.",
          rating: 5,
          image: photos[4],
          highlight: "Entrega rápida",
        },
        {
          id: 6,
          name: "Daniela Sánchez",
          role: "Empresaria",
          content:
            "Compro para todo mi equipo y siempre quedan impresionados con la calidad. El soporte postventa es de los mejores que he experimentado.",
          rating: 5,
          image: photos[5],
          featured: true,
          highlight: "Soporte premium",
        },
      ];

      setTestimonials(testimonialData);
    };

    loadTestimonials();
  }, []);

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

  const featuredTestimonials = testimonials.filter((t) => t.featured);
  const allTestimonials = testimonials;

  return (
    <section
      className="w-full py-20 md:py-28 lg:py-32 relative overflow-hidden bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950"
      ref={ref}
      style={{ opacity: opacity.get() }}
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
            className="inline-flex items-center gap-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-sm font-medium px-4 py-1.5 rounded-full mb-3"
          >
            <Sparkles className="h-4 w-4" />
            <span>Experiencias Reales</span>
          </motion.div>

          <motion.h2
            className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-red-800 dark:from-red-500 dark:to-red-300">
              Voces
            </span>{" "}
            de Nuestros Clientes
          </motion.h2>

          <motion.p
            className="mx-auto max-w-[700px] text-gray-500 md:text-lg lg:text-xl dark:text-gray-400"
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Descubre por qué miles de usuarios confían en nosotros para sus
            dispositivos Apple
          </motion.p>
        </motion.div>

        {/* Loading state */}
        {testimonials.length === 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {[...Array(2)].map((_, i) => (
              <Card
                key={i}
                className="h-96 animate-pulse bg-gray-100 dark:bg-gray-800"
              ></Card>
            ))}
          </div>
        )}

        {/* Featured Testimonials */}
        {testimonials.length > 0 && (
          <motion.div
            className="mb-16"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredTestimonials.map((testimonial) => (
                <motion.div
                  key={testimonial.id}
                  variants={itemVariants}
                  whileHover="hover"
                  whileTap={{ scale: 0.98 }}
                >
                  <Card className="h-full overflow-hidden border-2 border-red-100 dark:border-red-900/30 hover:border-red-200 dark:hover:border-red-800/40 transition-colors duration-300 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900/80">
                    <CardContent className="p-8 flex flex-col h-full">
                      <div className="flex items-start mb-6">
                        <div className="relative h-16 w-16 rounded-full overflow-hidden border-2 border-white dark:border-gray-700 shadow-md mr-6">
                          <Image
                            src={testimonial.image}
                            alt={testimonial.name}
                            fill
                            className="object-cover"
                            sizes="64px"
                          />
                        </div>
                        <div>
                          <h4 className="font-bold text-lg">
                            {testimonial.name}
                          </h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {testimonial.role}
                          </p>
                          <div className="flex mt-2">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`h-5 w-5 ${
                                  i < testimonial.rating
                                    ? "text-yellow-400 fill-yellow-400"
                                    : "text-gray-300 dark:text-gray-600"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="relative flex-grow pl-2">
                        <Quote className="absolute -top-2 -left-2 h-8 w-8 text-red-200 dark:text-red-900/30" />
                        <p className="text-gray-700 dark:text-gray-300 relative z-10 text-lg leading-relaxed">
                          {testimonial.content}
                        </p>
                        <div className="mt-4 inline-block bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-300 text-sm font-medium px-3 py-1 rounded-full">
                          {testimonial.highlight}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* All Testimonials */}
        {testimonials.length > 0 && (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {allTestimonials.map((testimonial) => (
              <motion.div
                key={testimonial.id}
                variants={itemVariants}
                whileHover="hover"
                className="transform-gpu"
              >
                <Card className="h-full overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700">
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="flex items-center mb-4">
                      <div className="relative h-12 w-12 rounded-full overflow-hidden border border-gray-200 dark:border-gray-600 mr-4">
                        <Image
                          src={testimonial.image}
                          alt={testimonial.name}
                          fill
                          className="object-cover"
                          sizes="48px"
                        />
                        {testimonial.featured && (
                          <div className="absolute -top-1 -right-1 bg-yellow-400 dark:bg-yellow-500 text-white rounded-full p-1">
                            <Star className="h-3 w-3" />
                          </div>
                        )}
                      </div>
                      <div>
                        <h4 className="font-semibold">{testimonial.name}</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                    <div className="flex mb-4">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < testimonial.rating
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300 dark:text-gray-600"
                          }`}
                        />
                      ))}
                    </div>
                    <div className="relative flex-grow">
                      <Quote className="absolute -top-1 -left-1 h-6 w-6 text-red-200 dark:text-red-900/30" />
                      <p className="text-gray-700 dark:text-gray-300 relative z-10 pl-4 text-sm">
                        {testimonial.content}
                      </p>
                    </div>
                    {testimonial.highlight && (
                      <div className="mt-4 inline-block bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs font-medium px-2 py-1 rounded-full">
                        {testimonial.highlight}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
