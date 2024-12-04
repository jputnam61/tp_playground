import { useState } from 'react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { LiveDemo } from './LiveDemo';
import { Implementation } from './Implementation';

export function PageObjectModelPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const form = e.target;
    const formData = new FormData(form);
    const newProduct = {
      name: formData.get('name'),
      quantity: Number(formData.get('quantity')),
      color: formData.get('color'),
    };
    setProducts([...products, newProduct]);
    form.reset();
    setIsLoading(false);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Tabs defaultValue="demo" className="space-y-8">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="demo">Live Demo</TabsTrigger>
        <TabsTrigger value="implementation">Implementation</TabsTrigger>
      </TabsList>

      <TabsContent value="demo">
        <LiveDemo
          isLoading={isLoading}
          products={filteredProducts}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onSubmit={handleSubmit}
        />
      </TabsContent>

      <TabsContent value="implementation">
        <Implementation />
      </TabsContent>
    </Tabs>
  );
}