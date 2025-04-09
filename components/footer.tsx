"use client";

import Link from "next/link";
import { Instagram, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-800">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col items-center justify-between md:flex-row gap-4">
          {/* Logo y copyright */}
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="text-lg font-medium text-gray-900 dark:text-white hover:text-red-600 dark:hover:text-red-400 transition-colors"
            >
              El Club del iPhone
            </Link>
            <span className="text-xs text-gray-400">
              © {new Date().getFullYear()}
            </span>
          </div>

          {/* Enlaces mínimos */}
          <div className="flex gap-6">
            <Link
              href="/terminos"
              className="text-xs text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Términos
            </Link>
            <Link
              href="/privacidad"
              className="text-xs text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Privacidad
            </Link>
          </div>

          {/* Redes sociales */}
          <div className="flex gap-4">
            <a
              href="https://instagram.com"
              target="_blank"
              className="text-gray-400 hover:text-red-600 transition-colors"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href="mailto:hola@elclubdeliphone.com"
              className="text-gray-400 hover:text-red-600 transition-colors"
            >
              <Mail className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
