import React from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  stock: number;
}

interface OrderItem {
  productId: string;
  quantity: number;
  product: Product;
}

interface Theme {
  primary: string;
  secondary: string;
  border: string;
  text: string;
  badge: string;
  background: string;
}

interface OrderSummaryGridProps {
  orders: OrderItem[];
  theme?: Theme;
}

export function OrderSummaryGrid({ orders, theme }: OrderSummaryGridProps) {
  const totalItems = orders.reduce((sum, order) => sum + order.quantity, 0);
  const totalValue = orders.reduce((sum, order) => sum + (order.quantity * order.product.price), 0);

  const cardClasses = theme ? `${theme.border}` : '';

  return (
    <div className="space-y-6">
      {/* Summary Header */}
      <Card className={`p-4 md:p-6 ${cardClasses}`}>
        <div className="grid grid-cols-3 md:grid-cols-3 gap-2 md:gap-4 text-center">
          <div>
            <h3 className="text-lg md:text-2xl">{orders.length}</h3>
            <p className="text-xs md:text-sm text-muted-foreground">Products</p>
          </div>
          <div>
            <h3 className="text-lg md:text-2xl">{totalItems}</h3>
            <p className="text-xs md:text-sm text-muted-foreground">Items</p>
          </div>
          <div>
            <h3 className="text-lg md:text-2xl">${totalValue.toLocaleString()}</h3>
            <p className="text-xs md:text-sm text-muted-foreground">Value</p>
          </div>
        </div>
      </Card>

      {/* Orders Grid */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
        {orders.map((order) => (
          <Card key={order.productId} className={`overflow-hidden relative ${cardClasses}`}>
            <div className="aspect-square relative">
              <ImageWithFallback
                src={order.product.image}
                alt={order.product.name}
                className="w-full h-full object-cover"
              />
              {/* Quantity Badge */}
              <Badge 
                className="absolute top-2 right-2 md:top-3 md:right-3 text-sm md:text-lg px-2 py-1 md:px-3 bg-primary text-primary-foreground"
              >
                {order.quantity}
              </Badge>
            </div>
            <div className="p-3 md:p-4 space-y-1 md:space-y-2">
              <h3 className="text-sm md:text-base truncate">{order.product.name}</h3>
              <div className="flex items-center justify-between text-xs md:text-sm text-muted-foreground">
                <span>${order.product.price}</span>
                <span>${(order.quantity * order.product.price).toLocaleString()}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}