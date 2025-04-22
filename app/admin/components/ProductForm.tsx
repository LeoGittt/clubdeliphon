'use client';

import { useState, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ProductFormProps {
  initialData?: {
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
  };
  onSubmit: (data: any) => void;
}

const CATEGORY_OPTIONS = ['Pro', 'Standard', 'SE'];
const COLOR_OPTIONS = ['Titanio Negro', 'Titanio Blanco', 'Titanio Azul', 'Titanio Natural', 'Negro', 'Blanco', 'Rosa', 'Amarillo', 'Verde', 'Azul'];
const STORAGE_OPTIONS = ['128GB', '256GB', '512GB', '1TB'];
const CONDITION_OPTIONS = ['Nuevo', 'Reacondicionado', 'Usado'];

export function ProductForm({ initialData, onSubmit }: ProductFormProps) {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    description: initialData?.description || '',
    price: initialData?.price || 0,
    category: initialData?.category || '',
    stock: initialData?.stock || 0,
    image: initialData?.image || '',
    color: initialData?.color || '',
    storage: initialData?.storage || '',
    condition: initialData?.condition || '',
  });

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { id, value } = e.target;
      setFormData((prev) => ({ ...prev, [id]: value }));
    },
    []
  );

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: id === 'price' ? parseFloat(value) : parseInt(value),
    }));
  };

  const handleSelectChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const renderSelect = (label: string, field: string, options: string[], placeholder: string) => (
    <div className="space-y-2">
      <Label htmlFor={field}>{label}</Label>
      <Select value={String(formData[field as keyof typeof formData])} onValueChange={(value) => handleSelectChange(field, value)}>
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Nombre del iPhone</Label>
        <Input id="name" value={formData.name} onChange={handleChange} required placeholder="Ej: iPhone 15 Pro Max" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Descripción</Label>
        <Textarea id="description" value={formData.description} onChange={handleChange} required placeholder="Describe las características principales del iPhone" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="price">Precio</Label>
          <Input id="price" type="number" value={formData.price} onChange={handleNumberChange} required placeholder="Ej: 1299.99" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="stock">Stock</Label>
          <Input id="stock" type="number" value={formData.stock} onChange={handleNumberChange} required placeholder="Ej: 50" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {renderSelect('Categoría', 'category', CATEGORY_OPTIONS, 'Selecciona una categoría')}
        {renderSelect('Color', 'color', COLOR_OPTIONS, 'Selecciona un color')}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {renderSelect('Almacenamiento', 'storage', STORAGE_OPTIONS, 'Selecciona el almacenamiento')}
        {renderSelect('Condición', 'condition', CONDITION_OPTIONS, 'Selecciona la condición')}
      </div>

      <div className="space-y-2">
        <Label htmlFor="image">URL de la Imagen</Label>
        <Input id="image" type="url" value={formData.image} onChange={handleChange} required placeholder="https://example.com/iphone-image.jpg" />
      </div>

      <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600">
        {initialData ? 'Actualizar Producto' : 'Crear Producto'}
      </Button>
    </form>
  );
}
