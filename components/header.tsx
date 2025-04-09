"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Search,
  ShoppingCart,
  User,
  Menu,
  Sun,
  Moon,
  Phone,
  Smartphone,
  Battery,
  Headphones,
  Tag,
  X,
  ChevronDown,
  ChevronUp,
  Home,
  ShoppingBag,
  Gift,
  HelpCircle,
} from "lucide-react";
import Cart from "@/components/cart";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuPortal,
} from "@/components/ui/dropdown-menu";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function Header() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [cartItemCount, setCartItemCount] = useState(3);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDropdown = (dropdown: string) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  const categories = [
    {
      name: "iPhones",
      icon: <Phone className="h-4 w-4 mr-2" />,
      href: "/productos?categoria=iphones",
      subcategories: [
        { name: "iPhone 15 Series", href: "/productos?subcategoria=iphone-15" },
        { name: "iPhone 14 Series", href: "/productos?subcategoria=iphone-14" },
        { name: "iPhone 13 Series", href: "/productos?subcategoria=iphone-13" },
        { name: "iPhone SE", href: "/productos?subcategoria=iphone-se" },
      ],
    },
    {
      name: "Fundas",
      icon: <Smartphone className="h-4 w-4 mr-2" />,
      href: "/productos?categoria=fundas",
      subcategories: [
        {
          name: "Fundas Premium",
          href: "/productos?subcategoria=fundas-premium",
        },
        {
          name: "Fundas Transparentes",
          href: "/productos?subcategoria=fundas-transparentes",
        },
        {
          name: "Fundas Personalizadas",
          href: "/productos?subcategoria=fundas-personalizadas",
        },
      ],
    },
    {
      name: "Cargadores",
      icon: <Battery className="h-4 w-4 mr-2" />,
      href: "/productos?categoria=cargadores",
      subcategories: [
        {
          name: "Cargadores Magsafe",
          href: "/productos?subcategoria=cargadores-magsafe",
        },
        {
          name: "Cargadores Inalámbricos",
          href: "/productos?subcategoria=cargadores-inalambricos",
        },
        { name: "Power Banks", href: "/productos?subcategoria=power-banks" },
      ],
    },
    {
      name: "Accesorios",
      icon: <Headphones className="h-4 w-4 mr-2" />,
      href: "/productos?categoria=accesorios",
      subcategories: [
        { name: "Auriculares", href: "/productos?subcategoria=auriculares" },
        { name: "Soportes", href: "/productos?subcategoria=soportes" },
        { name: "Protectores", href: "/productos?subcategoria=protectores" },
      ],
    },
    
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-white/90 dark:bg-gray-950/90 backdrop-blur-lg shadow-sm"
          : "bg-transparent"
      }`}
    >
      

      <div className="container flex h-16 items-center justify-between">
        {/* Mobile Menu */}
        <div className="flex items-center gap-2 md:gap-6">
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <nav className="grid gap-6 text-lg font-medium">
                <Link
                  href="/"
                  className="flex items-center gap-2 text-lg font-semibold mb-6"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <AppleLogo />
                  <span className="font-bold">El Club Del iPhone</span>
                </Link>

                <Link
                  href="/"
                  className="flex items-center gap-2 hover:text-red-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Home className="h-5 w-5" />
                  <span>Inicio</span>
                </Link>

                {categories.map((category) => (
                  <div key={category.name}>
                    {category.subcategories ? (
                      <div className="space-y-2">
                        <button
                          className="flex items-center gap-2 w-full hover:text-red-600 transition-colors"
                          onClick={() => toggleDropdown(category.name)}
                        >
                          {category.icon}
                          <span>{category.name}</span>
                          {openDropdown === category.name ? (
                            <ChevronUp className="h-4 w-4 ml-auto" />
                          ) : (
                            <ChevronDown className="h-4 w-4 ml-auto" />
                          )}
                        </button>
                        <AnimatePresence>
                          {openDropdown === category.name && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                              className="pl-6 space-y-2 overflow-hidden"
                            >
                              {category.subcategories.map((sub) => (
                                <Link
                                  key={sub.name}
                                  href={sub.href}
                                  className="block text-sm py-1 hover:text-red-600 transition-colors"
                                  onClick={() => setIsMenuOpen(false)}
                                >
                                  {sub.name}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        href={category.href}
                        className="flex items-center gap-2 hover:text-red-600 transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {category.icon}
                        <span>{category.name}</span>
                      </Link>
                    )}
                  </div>
                ))}

                <div className="border-t pt-4 mt-2">
                  <Link
                    href="/contacto"
                    className="flex items-center gap-2 hover:text-red-600 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <HelpCircle className="h-5 w-5" />
                    <span>Contacto</span>
                  </Link>
                </div>
              </nav>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <AppleLogo />
            <span className="hidden text-sm font-bold md:inline-block">
              El Club Del iPhone
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            <Link
              href="/"
              className={`px-3 py-2 text-sm font-medium hover:text-red-600 transition-colors relative ${
                pathname === "/" ? "text-red-600" : ""
              }`}
            >
              Inicio
              {pathname === "/" && (
                <motion.div
                  className="absolute -bottom-1 left-3 right-3 h-0.5 bg-red-600"
                  layoutId="navbar-indicator"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </Link>

            {categories.map((category) => (
              <DropdownMenu key={category.name}>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className={`px-3 py-2 text-sm font-medium hover:text-red-600 data-[state=open]:text-red-600 ${
                      pathname.includes(category.href) ? "text-red-600" : ""
                    }`}
                  >
                    <div className="flex items-center">
                      {category.name}
                      <ChevronDown className="h-4 w-4 ml-1 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                    </div>
                    {pathname.includes(category.href) && (
                      <motion.div
                        className="absolute -bottom-1 left-3 right-3 h-0.5 bg-red-600"
                        layoutId="navbar-indicator"
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                        }}
                      />
                    )}
                  </Button>
                </DropdownMenuTrigger>
                {category.subcategories && (
                  <DropdownMenuContent
                    className="w-48"
                    align="start"
                    sideOffset={10}
                  >
                    <DropdownMenuLabel className="flex items-center">
                      {category.icon}
                      <span className="ml-2">{category.name}</span>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {category.subcategories.map((sub) => (
                      <DropdownMenuItem key={sub.name} asChild>
                        <Link href={sub.href} className="cursor-pointer">
                          {sub.name}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link
                        href={category.href}
                        className="font-semibold text-red-600 cursor-pointer"
                      >
                        Ver todos
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                )}
              </DropdownMenu>
            ))}
          </nav>
        </div>

        {/* Search Bar - Animated */}
        <AnimatePresence>
          {isSearchOpen ? (
            <motion.div
              className="absolute inset-x-0 top-0 bg-white dark:bg-gray-950 z-20 flex items-center h-16 px-4 shadow-sm"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="container flex items-center">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Buscar productos, marcas, categorías..."
                    className="pl-10 w-full focus-visible:ring-red-500"
                    autoFocus
                  />
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="ml-2 hover:bg-red-100 dark:hover:bg-red-900/30"
                  onClick={() => setIsSearchOpen(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </motion.div>
          ) : (
            <div className="hidden md:flex items-center relative w-full max-w-sm mx-4">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar productos..."
                className="pl-8 w-full focus-visible:ring-red-500"
                onFocus={() => setIsSearchOpen(true)}
              />
            </div>
          )}
        </AnimatePresence>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label="Buscar"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          >
            <Search className="h-5 w-5" />
          </Button>

          {/* User Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Cuenta"
                className="relative overflow-hidden group"
              >
                <User className="h-5 w-5 z-10" />
                <span className="absolute inset-0 bg-red-100 dark:bg-red-900/30 scale-0 rounded-full group-hover:scale-100 transition-transform duration-300" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel className="flex items-center">
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarImage src="/avatar-placeholder.jpg" />
                  <AvatarFallback className="bg-red-100 dark:bg-red-900/30">
                    US
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">Usuario</p>
                  <p className="text-xs text-muted-foreground">
                    usuario@ejemplo.com
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem asChild>
                  <Link href="/cuenta" className="w-full cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    Mi cuenta
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/pedidos" className="w-full cursor-pointer">
                    <ShoppingBag className="mr-2 h-4 w-4" />
                    Mis pedidos
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/favoritos" className="w-full cursor-pointer">
                    <Heart className="mr-2 h-4 w-4" />
                    Favoritos
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    <Gift className="mr-2 h-4 w-4" />
                    <span>Mis beneficios</span>
                  </DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                      <DropdownMenuItem>Cupones</DropdownMenuItem>
                      <DropdownMenuItem>Puntos</DropdownMenuItem>
                      <DropdownMenuItem>Recompensas</DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600 focus:text-red-600">
                Cerrar sesión
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Cart */}
          <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative group"
                aria-label="Carrito"
              >
                <ShoppingCart className="h-5 w-5 z-10" />
                <span className="absolute inset-0 bg-red-100 dark:bg-red-900/30 scale-0 rounded-full group-hover:scale-100 transition-transform duration-300" />
                {cartItemCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-600">
                    {cartItemCount}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-md">
              <Cart onClose={() => setIsCartOpen(false)} />
            </SheetContent>
          </Sheet>

          
        </div>
      </div>
    </header>
  );
}

function AppleLogo() {
  return (
    <motion.svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      whileHover={{ scale: 1.1 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <path
        d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09998 22C7.78998 22.05 6.79998 20.68 5.95998 19.47C4.24998 17 2.93998 12.45 4.69998 9.39C5.56998 7.87 7.12998 6.91 8.81998 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.09 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z"
        fill="#E11D48"
      />
    </motion.svg>
  );
}

function Heart({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("h-4 w-4", className)}
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
}
