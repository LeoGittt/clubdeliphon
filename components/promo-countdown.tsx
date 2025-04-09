"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function PromoCountdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    // Set end date to 7 days from now
    const endDate = new Date()
    endDate.setDate(endDate.getDate() + 7)

    const calculateTimeLeft = () => {
      const difference = +endDate - +new Date()

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <section className="w-full py-8 bg-gradient-to-r from-red-600 to-red-800 dark:from-red-900 dark:to-red-700 text-white">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <h3 className="text-xl md:text-2xl font-bold">Oferta Especial por Tiempo Limitado</h3>
            <p className="text-white/80">Aprovecha hasta un 30% de descuento en accesorios seleccionados</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="grid grid-flow-col gap-2 text-center auto-cols-max">
              <div className="flex flex-col p-2 bg-white/10 rounded-lg backdrop-blur">
                <span className="font-mono text-2xl font-bold">{timeLeft.days.toString().padStart(2, "0")}</span>
                <span className="text-xs">Días</span>
              </div>
              <div className="flex flex-col p-2 bg-white/10 rounded-lg backdrop-blur">
                <span className="font-mono text-2xl font-bold">{timeLeft.hours.toString().padStart(2, "0")}</span>
                <span className="text-xs">Horas</span>
              </div>
              <div className="flex flex-col p-2 bg-white/10 rounded-lg backdrop-blur">
                <span className="font-mono text-2xl font-bold">{timeLeft.minutes.toString().padStart(2, "0")}</span>
                <span className="text-xs">Min</span>
              </div>
              <div className="flex flex-col p-2 bg-white/10 rounded-lg backdrop-blur">
                <span className="font-mono text-2xl font-bold">{timeLeft.seconds.toString().padStart(2, "0")}</span>
                <span className="text-xs">Seg</span>
              </div>
            </div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/productos?categoria=ofertas">
                <Button className="bg-white text-red-600 hover:bg-white/90 hover:text-red-700 group">
                  <span className="flex items-center">
                    Ver ofertas
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
