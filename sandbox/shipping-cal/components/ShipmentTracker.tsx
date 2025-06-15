import React, { useState } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { ProductGrid } from './ProductGrid';
import { OrderSummaryGrid } from './OrderSummaryGrid';
import { ShipmentTimeline } from './ShipmentTimeline';

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

interface ShipmentData {
  id: string;
  date: string;
  title: string;
  description: string;
  status: string;
  color: string;
  cutoffDate: string;
  totalOrders?: number;
  completedOrders?: number;
}

interface Theme {
  primary: string;
  secondary: string;
  border: string;
  text: string;
  badge: string;
  background: string;
}

interface ShipmentTrackerProps {
  shipmentData?: ShipmentData;
  theme?: Theme;
}

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Thai Silk Scarf',
    price: 45,
    image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=400&fit=crop',
    stock: 50
  },
  {
    id: '2',
    name: 'Handwoven Basket',
    price: 32,
    image: 'https://images.unsplash.com/photo-1586995985615-ad72e7e4c7ce?w=400&h=400&fit=crop',
    stock: 30
  },
  {
    id: '3',
    name: 'Ceramic Bowl Set',
    price: 78,
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop',
    stock: 25
  },
  {
    id: '4',
    name: 'Thai Tea Leaves',
    price: 24,
    image: 'https://images.unsplash.com/photo-1564890292439-665d4d3d5f2e?w=400&h=400&fit=crop',
    stock: 100
  },
  {
    id: '5',
    name: 'Wooden Elephant Carving',
    price: 65,
    image: 'https://images.unsplash.com/photo-1582201957043-24c85ac9ac4c?w=400&h=400&fit=crop',
    stock: 15
  },
  {
    id: '6',
    name: 'Traditional Lantern',
    price: 42,
    image: 'https://images.unsplash.com/photo-1558618666-e5a6d1fcf3b9?w=400&h=400&fit=crop',
    stock: 40
  }
];

const mockOrders: OrderItem[] = [
  { productId: '1', quantity: 23, product: mockProducts[0] },
  { productId: '2', quantity: 18, product: mockProducts[1] },
  { productId: '3', quantity: 12, product: mockProducts[2] },
  { productId: '4', quantity: 67, product: mockProducts[3] },
  { productId: '5', quantity: 8, product: mockProducts[4] },
  { productId: '6', quantity: 31, product: mockProducts[5] }
];

export function ShipmentTracker({ shipmentData, theme }: ShipmentTrackerProps) {
  // Fallback to default values if no shipmentData provided (for backward compatibility)
  const [selectedDate, setSelectedDate] = useState<string>(
    shipmentData?.date || '2025-06-20'
  );
  
  const cutoffDate = shipmentData?.cutoffDate || '2025-06-15';
  const totalOrders = shipmentData?.totalOrders || mockOrders.reduce((sum, order) => sum + order.quantity, 0);
  const receivedOrders = shipmentData?.completedOrders || 127;
  
  const isAfterCutoff = new Date(selectedDate) > new Date(cutoffDate);
  const currentStep = getCurrentShipmentStep(selectedDate, cutoffDate);

  // Use theme colors if provided
  const cardClasses = theme ? `${theme.border}` : '';
  const headerClasses = theme ? `${theme.secondary}` : '';

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 space-y-6 md:space-y-8">
      {/* Shipment Header */}
      {shipmentData && (
        <Card className={`p-4 md:p-6 ${cardClasses}`}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-xl md:text-2xl mb-2">{shipmentData.title}</h1>
              <p className="text-muted-foreground">{shipmentData.description}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Badge variant="outline">
                Shipment: {new Date(shipmentData.date).toLocaleDateString()}
              </Badge>
              <Badge variant={isAfterCutoff ? "destructive" : "default"}>
                {isAfterCutoff ? "After Cutoff" : "Before Cutoff"}
              </Badge>
            </div>
          </div>
        </Card>
      )}

      {/* Date Selector - only show if no shipmentData provided */}
      {!shipmentData && (
        <Card className="p-4 md:p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
            <h2 className="text-lg md:text-xl">Thailand Shipment Tracker</h2>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
              <label htmlFor="date-select" className="text-sm md:text-base">Select Date:</label>
              <div className="flex items-center gap-2">
                <input
                  id="date-select"
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="px-2 md:px-3 py-1 md:py-2 border rounded-md bg-input-background text-sm md:text-base"
                />
                <Badge variant={isAfterCutoff ? "destructive" : "default"} className="text-xs">
                  {isAfterCutoff ? "After Cutoff" : "Before Cutoff"}
                </Badge>
              </div>
            </div>
          </div>
          <p className="text-sm md:text-base text-muted-foreground">
            Cutoff Date: {new Date(cutoffDate).toLocaleDateString()} - 
            {isAfterCutoff ? " Orders are being processed" : " Products available for purchase"}
          </p>
        </Card>
      )}

      {/* Main Content */}
      {!isAfterCutoff ? (
        <ProductGrid products={mockProducts} theme={theme} />
      ) : (
        <>
          <OrderSummaryGrid orders={mockOrders} theme={theme} />
          
          {/* Timeline */}
          <ShipmentTimeline currentStep={currentStep} theme={theme} />
          
          {/* Orders Received Summary */}
          <Card className={`p-4 md:p-6 ${cardClasses}`}>
            <h3 className="mb-4 text-base md:text-lg">Order Delivery Status</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm md:text-base">Orders Received</span>
                <span className="text-lg md:text-2xl font-semibold">{receivedOrders} / {totalOrders}</span>
              </div>
              <Progress value={(receivedOrders / totalOrders) * 100} className="h-2 md:h-3" />
              <p className="text-xs md:text-sm text-muted-foreground">
                {Math.round((receivedOrders / totalOrders) * 100)}% of orders have been delivered to customers
              </p>
            </div>
          </Card>
        </>
      )}
    </div>
  );
}

function getCurrentShipmentStep(date: string, cutoffDate: string): number {
  const selectedDate = new Date(date);
  const cutoff = new Date(cutoffDate);
  const daysSinceCutoff = Math.floor((selectedDate.getTime() - cutoff.getTime()) / (1000 * 60 * 60 * 24));
  
  if (daysSinceCutoff <= 0) return 0;
  if (daysSinceCutoff <= 3) return 1; // Working on order
  if (daysSinceCutoff <= 10) return 2; // In transit to US
  if (daysSinceCutoff <= 15) return 3; // Fulfillment in progress
  if (daysSinceCutoff <= 25) return 4; // Orders shipped
  return 5; // Orders received
}