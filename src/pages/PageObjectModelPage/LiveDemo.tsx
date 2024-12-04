import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Loader2 } from 'lucide-react';

interface LiveDemoProps {
  isLoading: boolean;
  products: any[];
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function LiveDemo({
  isLoading,
  products,
  searchTerm,
  onSearchChange,
  onSubmit,
}: LiveDemoProps) {
  return (
    <div className="space-y-6">
      {/* Login Section */}
      <Card className="border-2 border-blue-500/20">
        <CardHeader className="border-b border-blue-500/20 bg-blue-500/5">
          <CardTitle className="text-blue-500">Login Page</CardTitle>
          <CardDescription>
            Authentication form with validation
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <form className="space-y-4" data-testid="login-form">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                data-testid="username-input"
                defaultValue="test"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                data-testid="password-input"
                defaultValue="test"
              />
            </div>
            <Button data-testid="login-button">Login</Button>
          </form>
        </CardContent>
      </Card>

      {/* Product Form Section */}
      <Card className="border-2 border-green-500/20">
        <CardHeader className="border-b border-green-500/20 bg-green-500/5">
          <CardTitle className="text-green-500">Product Management Page</CardTitle>
          <CardDescription>
            Add and manage products in the system
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={onSubmit} className="space-y-4" data-testid="product-form">
            <div className="space-y-2">
              <Label htmlFor="name">Product Name</Label>
              <Input
                id="name"
                name="name"
                required
                data-testid="product-name-input"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                name="quantity"
                type="number"
                required
                min="1"
                data-testid="product-quantity-input"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="color">Color</Label>
              <Select name="color" required>
                <SelectTrigger data-testid="product-color-select">
                  <SelectValue placeholder="Select color" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="red">Red</SelectItem>
                  <SelectItem value="green">Green</SelectItem>
                  <SelectItem value="blue">Blue</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" disabled={isLoading} data-testid="submit-product-button">
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Add Product
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Product List Section */}
      <Card className="border-2 border-purple-500/20">
        <CardHeader className="border-b border-purple-500/20 bg-purple-500/5">
          <CardTitle className="text-purple-500">Product List Page</CardTitle>
          <CardDescription>
            View and search product inventory
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              data-testid="product-search-input"
            />
            <div className="border rounded-lg divide-y">
              {products.length === 0 ? (
                <div className="p-4 text-center text-muted-foreground">
                  No products found
                </div>
              ) : (
                products.map((product, index) => (
                  <div
                    key={index}
                    className="p-4 flex justify-between items-center"
                    data-testid={`product-item-${index}`}
                  >
                    <div>
                      <h4 className="font-medium">{product.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        Quantity: {product.quantity}
                      </p>
                    </div>
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: product.color }}
                    />
                  </div>
                ))
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}