'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Edit, Trash, Package, Tag, BarChart, Users, DollarSign, ShoppingCart, Settings, Bell, LogOut, ChevronDown, Search, Filter } from "lucide-react";
import { ProductForm } from './components/ProductForm';
import { CategoryForm } from './components/CategoryForm';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Product {
  id?: string;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  image: string;
  color: string;
  storage: string;
  condition: string;
  createdAt?: string;
}

interface Category {
  id?: string;
  name: string;
  description: string;
  image: string;
  productCount?: number;
}

// Datos de ejemplo mejorados
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'iPhone 15 Pro Max',
    description: 'El iPhone más potente con cámara de 48MP y Dynamic Island',
    price: 1299.99,
    category: 'Pro',
    stock: 25,
    image: 'https://example.com/iphone15promax.jpg',
    color: 'Titanio Negro',
    storage: '256GB',
    condition: 'Nuevo',
    createdAt: '2023-10-15'
  },
  {
    id: '2',
    name: 'iPhone 15',
    description: 'Diseño elegante con Dynamic Island y cámara de 48MP',
    price: 899.99,
    category: 'Standard',
    stock: 50,
    image: 'https://example.com/iphone15.jpg',
    color: 'Rosa',
    storage: '128GB',
    condition: 'Nuevo',
    createdAt: '2023-09-28'
  },
  {
    id: '3',
    name: 'iPhone 14 Pro',
    description: 'Pantalla Super Retina XDR con ProMotion',
    price: 999.99,
    category: 'Pro',
    stock: 18,
    image: 'https://example.com/iphone14pro.jpg',
    color: 'Oro',
    storage: '512GB',
    condition: 'Reacondicionado',
    createdAt: '2023-08-10'
  },
];

const mockCategories: Category[] = [
  {
    id: '1',
    name: 'iPhone Pro',
    description: 'Modelos Pro con las mejores características',
    image: 'https://example.com/pro.jpg',
    productCount: 42
  },
  {
    id: '2',
    name: 'iPhone Standard',
    description: 'Modelos estándar con excelente relación calidad-precio',
    image: 'https://example.com/standard.jpg',
    productCount: 36
  },
  {
    id: '3',
    name: 'Reacondicionados',
    description: 'Productos certificados como nuevos',
    image: 'https://example.com/refurbished.jpg',
    productCount: 15
  },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showProductForm, setShowProductForm] = useState(false);
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | undefined>(undefined);
  const [editingCategory, setEditingCategory] = useState<Category | undefined>(undefined);
  const [searchTerm, setSearchTerm] = useState("");

  const handleProductSubmit = (data: Product) => {
    console.log('Producto guardado:', data);
    setShowProductForm(false);
    setEditingProduct(undefined);
  };

  const handleCategorySubmit = (data: Category) => {
    console.log('Categoría guardada:', data);
    setShowCategoryForm(false);
    setEditingCategory(undefined);
  };

  const filteredProducts = mockProducts.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredCategories = mockCategories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flex">
        {/* Sidebar mejorado */}
        <div className="w-64 bg-card h-screen shadow-lg p-4 border-r border-border sticky top-0">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Package className="h-6 w-6 text-primary-foreground" />
            </div>
            <h2 className="text-2xl font-bold">iPhone Admin</h2>
          </div>
          <nav className="space-y-1">
            <Button
              variant={activeTab === "dashboard" ? "secondary" : "ghost"}
              className="w-full justify-start gap-2"
              onClick={() => setActiveTab("dashboard")}
            >
              <BarChart className="h-4 w-4" />
              Dashboard
            </Button>
            <Button
              variant={activeTab === "productos" ? "secondary" : "ghost"}
              className="w-full justify-start gap-2"
              onClick={() => setActiveTab("productos")}
            >
              <Package className="h-4 w-4" />
              Productos
              <Badge variant="outline" className="ml-auto bg-primary/10 text-primary">
                {mockProducts.length}
              </Badge>
            </Button>
            <Button
              variant={activeTab === "categorias" ? "secondary" : "ghost"}
              className="w-full justify-start gap-2"
              onClick={() => setActiveTab("categorias")}
            >
              <Tag className="h-4 w-4" />
              Categorías
              <Badge variant="outline" className="ml-auto bg-primary/10 text-primary">
                {mockCategories.length}
              </Badge>
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start gap-2"
            >
              <Users className="h-4 w-4" />
              Clientes
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start gap-2"
            >
              <ShoppingCart className="h-4 w-4" />
              Pedidos
              <Badge variant="outline" className="ml-auto bg-red-500/10 text-red-500">
                5 nuevos
              </Badge>
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start gap-2"
            >
              <Settings className="h-4 w-4" />
              Configuración
            </Button>
          </nav>
          <div className="mt-auto pt-4 border-t border-border">
            <Button variant="ghost" className="w-full justify-start gap-2">
              <LogOut className="h-4 w-4" />
              Cerrar Sesión
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">
              {activeTab === "dashboard" && "Resumen del Negocio"}
              {activeTab === "productos" && "Gestión de Productos"}
              {activeTab === "categorias" && "Gestión de Categorías"}
            </h1>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 bg-primary text-primary-foreground">3</Badge>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>A</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">Admin</span>
                    <ChevronDown className="h-4 w-4 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    Configuración
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    Cerrar Sesión
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsContent value="dashboard" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Productos
                    </CardTitle>
                    <Package className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">150</div>
                    <p className="text-xs text-muted-foreground">+12% desde el mes pasado</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Ventas Totales
                    </CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$15,231.89</div>
                    <p className="text-xs text-muted-foreground">+8% desde el mes pasado</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Clientes Activos
                    </CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">235</div>
                    <p className="text-xs text-muted-foreground">+5% desde el mes pasado</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Pedidos Pendientes
                    </CardTitle>
                    <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">12</div>
                    <p className="text-xs text-muted-foreground">3 nuevos hoy</p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Ventas por Modelo</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm">iPhone 15 Pro Max</span>
                          <span className="text-sm font-medium">45%</span>
                        </div>
                        <Progress value={45} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm">iPhone 15 Pro</span>
                          <span className="text-sm font-medium">30%</span>
                        </div>
                        <Progress value={30} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm">iPhone 15</span>
                          <span className="text-sm font-medium">25%</span>
                        </div>
                        <Progress value={25} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Últimos Pedidos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Pedido</TableHead>
                          <TableHead>Producto</TableHead>
                          <TableHead>Estado</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {[1, 2, 3].map((order) => (
                          <TableRow key={order}>
                            <TableCell className="font-medium">#ORD-{order}23</TableCell>
                            <TableCell>iPhone 15 Pro Max - 256GB</TableCell>
                            <TableCell>
                              <Badge variant="outline" className="bg-green-500/10 text-green-500">
                                Completado
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                  <CardFooter className="border-t px-6 py-3">
                    <Button variant="ghost" className="text-primary">
                      Ver todos los pedidos
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="productos" className="space-y-4">
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center gap-4 flex-wrap">
                  <h2 className="text-2xl font-bold">Productos</h2>
                  <div className="flex gap-2 w-full md:w-auto">
                    <div className="relative w-full md:w-64">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Buscar productos..."
                        className="pl-9"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <Button variant="outline">
                      <Filter className="mr-2 h-4 w-4" />
                      Filtros
                    </Button>
                    <Dialog open={showProductForm} onOpenChange={setShowProductForm}>
                      <DialogTrigger asChild>
                        <Button>
                          <Plus className="mr-2 h-4 w-4" />
                          Nuevo Producto
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[800px]">
                        <DialogHeader>
                          <DialogTitle>
                            {editingProduct ? 'Editar Producto' : 'Nuevo Producto'}
                          </DialogTitle>
                        </DialogHeader>
                        <ProductForm
                          initialData={editingProduct}
                          onSubmit={handleProductSubmit}
                        />
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>

                <Card>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Producto</TableHead>
                        <TableHead>Categoría</TableHead>
                        <TableHead>Precio</TableHead>
                        <TableHead>Stock</TableHead>
                        <TableHead>Fecha</TableHead>
                        <TableHead className="text-right">Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredProducts.map((product) => (
                        <TableRow key={product.id}>
                          <TableCell>
                            <div className="flex items-center gap-4">
                              <Avatar className="h-10 w-10 border">
                                <AvatarImage src={product.image} />
                                <AvatarFallback>{product.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">{product.name}</div>
                                <div className="text-sm text-muted-foreground">{product.storage} • {product.color}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{product.category}</Badge>
                          </TableCell>
                          <TableCell>${product.price.toFixed(2)}</TableCell>
                          <TableCell>
                            <Badge variant={product.stock > 10 ? "default" : "destructive"}>
                              {product.stock} unidades
                            </Badge>
                          </TableCell>
                          <TableCell>{product.createdAt}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => {
                                  setEditingProduct(product);
                                  setShowProductForm(true);
                                }}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="icon" className="text-destructive hover:text-destructive">
                                <Trash className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="categorias" className="space-y-4">
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center gap-4 flex-wrap">
                  <h2 className="text-2xl font-bold">Categorías</h2>
                  <div className="flex gap-2 w-full md:w-auto">
                    <div className="relative w-full md:w-64">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Buscar categorías..."
                        className="pl-9"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <Dialog open={showCategoryForm} onOpenChange={setShowCategoryForm}>
                      <DialogTrigger asChild>
                        <Button>
                          <Plus className="mr-2 h-4 w-4" />
                          Nueva Categoría
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>
                            {editingCategory ? 'Editar Categoría' : 'Nueva Categoría'}
                          </DialogTitle>
                        </DialogHeader>
                        <CategoryForm
                          initialData={editingCategory}
                          onSubmit={handleCategorySubmit}
                        />
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {filteredCategories.map((category) => (
                    <Card key={category.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start gap-4">
                          <div className="space-y-2">
                            <div className="flex items-center gap-3">
                              <Avatar className="h-10 w-10 border">
                                <AvatarImage src={category.image} />
                                <AvatarFallback>{category.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <h3 className="font-semibold">{category.name}</h3>
                            </div>
                            <p className="text-sm text-muted-foreground">{category.description}</p>
                            <Badge variant="outline" className="bg-primary/10 text-primary">
                              {category.productCount} productos
                            </Badge>
                          </div>
                          <div className="flex gap-1">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => {
                                setEditingCategory(category);
                                setShowCategoryForm(true);
                              }}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="icon" className="text-destructive hover:text-destructive">
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}