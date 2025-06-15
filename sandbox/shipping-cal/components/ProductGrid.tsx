import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  stock: number;
}

interface Theme {
  primary: string;
  secondary: string;
  border: string;
  text: string;
  badge: string;
  background: string;
}

interface ProductGridProps {
  products: Product[];
  theme?: Theme;
}

export function ProductGrid({ products, theme }: ProductGridProps) {
  const [cart, setCart] = useState<{[key: string]: number}>({});

  const addToCart = (productId: string) => {
    setCart(prev => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1
    }));
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => ({
      ...prev,
      [productId]: Math.max(0, (prev[productId] || 0) - 1)
    }));
  };

  const getTotalItems = () => {
    return Object.values(cart).reduce((sum, count) => sum + count, 0);
  };

  const getTotalPrice = () => {
    return Object.entries(cart).reduce((sum, [productId, count]) => {
      const product = products.find(p => p.id === productId);
      return sum + (product ? product.price * count : 0);
    }, 0);
  };

  const cardClasses = theme ? `${theme.border}` : '';
  const cartClasses = theme ? `${theme.secondary}` : 'bg-accent';

  return (
    <div className="space-y-6">
      {/* Cart Summary */}
      {getTotalItems() > 0 && (
        <Card className={`p-3 md:p-4 ${cartClasses} ${cardClasses}`}>
          <div className="flex items-center justify-between">
            <span className="text-sm md:text-base">{getTotalItems()} items in cart</span>
            <span className="text-lg md:text-xl">${getTotalPrice()}</span>
          </div>
        </Card>
      )}

      {/* Products Grid */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
        {products.map((product) => (
          <Card key={product.id} className={`overflow-hidden ${cardClasses}`}>
            <div className="aspect-square relative">
              <ImageWithFallback
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-3 md:p-4 space-y-2 md:space-y-3">
              <div className="flex items-start justify-between">
                <h3 className="text-sm md:text-lg truncate pr-2">{product.name}</h3>
                <Badge variant="secondary" className="text-xs shrink-0">{product.stock}</Badge>
              </div>
              <p className="text-lg md:text-2xl">${product.price}</p>
              
              <div className="flex items-center gap-1 md:gap-2">
                {cart[product.id] > 0 && (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeFromCart(product.id)}
                      className="h-8 w-8 p-0"
                    >
                      -
                    </Button>
                    <span className="w-6 md:w-8 text-center text-sm">{cart[product.id]}</span>
                  </>
                )}
                <Button
                  onClick={() => addToCart(product.id)}
                  disabled={cart[product.id] >= product.stock}
                  className="flex-1 h-8 md:h-10 text-xs md:text-sm"
                  size="sm"
                >
                  {cart[product.id] > 0 ? '+' : 'Add'}
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Checkout Button */}
      {getTotalItems() > 0 && (
        <Card className={`p-4 md:p-6 text-center ${cardClasses}`}>
          <Button size="lg" className="w-full max-w-md text-sm md:text-base">
            Proceed to Checkout - ${getTotalPrice()}
          </Button>
        </Card>
      )}
    </div>
  );
}