"use client"

import type React from "react"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { CheckCircle2, Send } from "lucide-react"

export default function Newsletter() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const { toast } = useToast()
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) return

    setIsSubmitted(true)

    toast({
      title: "¡Suscripción exitosa!",
      description: "Gracias por suscribirte a nuestro newsletter.",
    })

    // Reset after animation completes
    setTimeout(() => {
      setEmail("")
      setIsSubmitted(false)
    }, 2000)
  }

  return (
    <section className="w-full py-16 md:py-24 relative overflow-hidden" ref={ref}>
      {/* Background with gradient and pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMjIiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djZoNnYtNmgtNnptNiA2djZoNnYtNmgtNnptLTEyIDBoNnY2aC02di02em0xMiAwaDZ2NmgtNnYtNnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30 dark:opacity-10" />
      </div>

      <div className="container px-4 md:px-6 relative">
        <div className="max-w-3xl mx-auto">
          <motion.div
            className="flex flex-col items-center justify-center space-y-4 text-center"
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
              Newsletter
            </motion.div>

            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Mantente Informado</h2>

            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Suscríbete a nuestro newsletter y recibe las últimas novedades, ofertas exclusivas y consejos para tu
              iPhone.
            </p>

            <motion.div
              className="w-full max-w-md space-y-2 mt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <form className="relative" onSubmit={handleSubmit}>
                <Input
                  className="pl-4 pr-32 py-6 rounded-full bg-white dark:bg-gray-950 border-2 focus-visible:ring-red-500"
                  placeholder="Ingresa tu email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <div className="absolute right-1.5 top-1.5">
                  <Button
                    type="submit"
                    className={`rounded-full bg-red-600 hover:bg-red-700 text-white transition-all duration-300 ${
                      isSubmitted ? "w-10" : "w-auto"
                    }`}
                  >
                    {isSubmitted ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 500, damping: 15 }}
                      >
                        <CheckCircle2 className="h-5 w-5" />
                      </motion.div>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Suscribirse
                      </>
                    )}
                  </Button>
                </div>
              </form>

              <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                Al suscribirte, aceptas nuestra{" "}
                <a href="#" className="underline hover:text-red-600 transition-colors">
                  política de privacidad
                </a>
                .
              </p>
            </motion.div>

            <motion.div
              className="flex items-center justify-center gap-8 pt-8"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600 dark:text-red-500">15k+</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Suscriptores</div>
              </div>
              <div className="h-10 border-l border-gray-300 dark:border-gray-700"></div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600 dark:text-red-500">3+</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Newsletters al mes</div>
              </div>
              <div className="h-10 border-l border-gray-300 dark:border-gray-700"></div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600 dark:text-red-500">10%</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Descuento exclusivo</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
