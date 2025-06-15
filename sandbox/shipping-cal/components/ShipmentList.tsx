import React, { useState } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ChevronDown, ChevronUp, Calendar, Package, Star, Truck, Clock } from 'lucide-react';
import { ProductGrid } from './ProductGrid';
import { OrderSummaryGrid } from './OrderSummaryGrid';
import { ShipmentTimeline } from './ShipmentTimeline';
import { ImageWithFallback } from './figma/ImageWithFallback';

const shipmentDates = [
  {
    id: '1',
    date: '2025-06-10',
    title: 'Spring Collection',
    description: 'Handcrafted items from Northern Thailand including silk scarves, wooden crafts, and traditional ceramics',
    status: 'completed' as const,
    color: 'emerald',
    cutoffDate: '2025-06-05',
    totalOrders: 156,
    completedOrders: 156,
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop'
  },
  {
    id: '2',
    date: '2025-06-15',
    title: 'Summer Essentials',
    description: 'Traditional crafts and textiles perfect for the summer season, featuring breathable fabrics and natural materials',
    status: 'processing' as const,
    color: 'blue',
    cutoffDate: '2025-06-15',
    totalOrders: 159,
    completedOrders: 127,
    image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&h=400&fit=crop'
  },
  {
    id: '3',
    date: '2025-06-25',
    title: 'Artisan Special Edition',
    description: 'Limited edition handmade pieces crafted by master artisans using centuries-old techniques',
    status: 'active' as const,
    color: 'purple',
    cutoffDate: '2025-06-20',
    image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=600&h=400&fit=crop'
  },
  {
    id: '4',
    date: '2025-07-05',
    title: 'Festival Collection',
    description: 'Celebration-themed crafts and decor items perfect for festivals and special occasions',
    status: 'upcoming' as const,
    color: 'orange',
    cutoffDate: '2025-06-30',
    image: 'https://images.unsplash.com/photo-1586995985615-ad72e7e4c7ce?w=600&h=400&fit=crop'
  },
  {
    id: '5',
    date: '2025-07-15',
    title: 'Monsoon Collection',
    description: 'Weather-inspired traditional items designed to embrace the beauty of the rainy season',
    status: 'upcoming' as const,
    color: 'teal',
    cutoffDate: '2025-07-10',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop'
  },
  {
    id: '6',
    date: '2025-07-25',
    title: 'Heritage Pieces',
    description: 'Ancient craft techniques collection preserving traditional Thai artistry for future generations',
    status: 'upcoming' as const,
    color: 'rose',
    cutoffDate: '2025-07-20',
    image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&h=400&fit=crop'
  }
];

const colorThemes = {
  emerald: {
    primary: 'bg-emerald-500',
    secondary: 'bg-emerald-50',
    border: 'border-emerald-200',
    text: 'text-emerald-700',
    badge: 'bg-emerald-100 text-emerald-700',
    background: 'bg-emerald-50/30',
    gradient: 'from-emerald-400 to-emerald-600',
    ring: 'ring-emerald-500/20',
    shadow: 'shadow-emerald-500/10'
  },
  blue: {
    primary: 'bg-blue-500',
    secondary: 'bg-blue-50',
    border: 'border-blue-200',
    text: 'text-blue-700',
    badge: 'bg-blue-100 text-blue-700',
    background: 'bg-blue-50/30',
    gradient: 'from-blue-400 to-blue-600',
    ring: 'ring-blue-500/20',
    shadow: 'shadow-blue-500/10'
  },
  purple: {
    primary: 'bg-purple-500',
    secondary: 'bg-purple-50',
    border: 'border-purple-200',
    text: 'text-purple-700',
    badge: 'bg-purple-100 text-purple-700',
    background: 'bg-purple-50/30',
    gradient: 'from-purple-400 to-purple-600',
    ring: 'ring-purple-500/20',
    shadow: 'shadow-purple-500/10'
  },
  orange: {
    primary: 'bg-orange-500',
    secondary: 'bg-orange-50',
    border: 'border-orange-200',
    text: 'text-orange-700',
    badge: 'bg-orange-100 text-orange-700',
    background: 'bg-orange-50/30',
    gradient: 'from-orange-400 to-orange-600',
    ring: 'ring-orange-500/20',
    shadow: 'shadow-orange-500/10'
  },
  teal: {
    primary: 'bg-teal-500',
    secondary: 'bg-teal-50',
    border: 'border-teal-200',
    text: 'text-teal-700',
    badge: 'bg-teal-100 text-teal-700',
    background: 'bg-teal-50/30',
    gradient: 'from-teal-400 to-teal-600',
    ring: 'ring-teal-500/20',
    shadow: 'shadow-teal-500/10'
  },
  rose: {
    primary: 'bg-rose-500',
    secondary: 'bg-rose-50',
    border: 'border-rose-200',
    text: 'text-rose-700',
    badge: 'bg-rose-100 text-rose-700',
    background: 'bg-rose-50/30',
    gradient: 'from-rose-400 to-rose-600',
    ring: 'ring-rose-500/20',
    shadow: 'shadow-rose-500/10'
  }
};

// Sample products for each shipment
const getProductsForShipment = (shipmentId: string) => {
  const productSets = {
    '1': [
      { id: '1', name: 'Thai Silk Scarf', price: 45, image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=400&fit=crop', stock: 50 },
      { id: '2', name: 'Handwoven Basket', price: 32, image: 'https://images.unsplash.com/photo-1586995985615-ad72e7e4c7ce?w=400&h=400&fit=crop', stock: 30 },
      { id: '3', name: 'Ceramic Bowl Set', price: 78, image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop', stock: 25 },
      { id: '4', name: 'Wooden Wind Chimes', price: 28, image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop', stock: 40 },
      { id: '5', name: 'Traditional Mask', price: 42, image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=400&fit=crop', stock: 18 }
    ],
    '2': [
      { id: '6', name: 'Cotton Wrap Dress', price: 89, image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=400&fit=crop', stock: 20 },
      { id: '7', name: 'Bamboo Serving Tray', price: 35, image: 'https://images.unsplash.com/photo-1586995985615-ad72e7e4c7ce?w=400&h=400&fit=crop', stock: 35 },
      { id: '8', name: 'Hand-painted Vase', price: 65, image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop', stock: 22 },
      { id: '9', name: 'Silver Bracelet', price: 95, image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=400&fit=crop', stock: 15 }
    ],
    '3': [
      { id: '10', name: 'Silver Elephant Pendant', price: 120, image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=400&fit=crop', stock: 15 },
      { id: '11', name: 'Limited Edition Vase', price: 165, image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop', stock: 8 },
      { id: '12', name: 'Master Craftsman Bowl', price: 95, image: 'https://images.unsplash.com/photo-1586995985615-ad72e7e4c7ce?w=400&h=400&fit=crop', stock: 12 }
    ],
    '4': [
      { id: '13', name: 'Festival Lanterns Set', price: 55, image: 'https://images.unsplash.com/photo-1586995985615-ad72e7e4c7ce?w=400&h=400&fit=crop', stock: 30 },
      { id: '14', name: 'Celebration Masks', price: 42, image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=400&fit=crop', stock: 18 },
      { id: '15', name: 'Decorative Streamers', price: 25, image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop', stock: 45 }
    ],
    '5': [
      { id: '16', name: 'Rain Protection Cloak', price: 95, image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=400&fit=crop', stock: 12 },
      { id: '17', name: 'Water Lily Candles', price: 24, image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop', stock: 45 },
      { id: '18', name: 'Monsoon Incense Set', price: 18, image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=400&fit=crop', stock: 60 }
    ],
    '6': [
      { id: '19', name: 'Antique Bronze Mirror', price: 180, image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=400&fit=crop', stock: 8 },
      { id: '20', name: 'Heritage Tapestry', price: 220, image: 'https://images.unsplash.com/photo-1586995985615-ad72e7e4c7ce?w=400&h=400&fit=crop', stock: 6 },
      { id: '21', name: 'Traditional Scroll', price: 150, image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop', stock: 10 }
    ]
  };
  
  return productSets[shipmentId as keyof typeof productSets] || [];
};

export function ShipmentList() {
  const [expandedShipment, setExpandedShipment] = useState<string | null>(null);

  const toggleExpanded = (shipmentId: string) => {
    setExpandedShipment(expandedShipment === shipmentId ? null : shipmentId);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="w-full max-w-7xl mx-auto p-4 md:p-6">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl mb-4">Thailand Shipment Tracker</h1>
          <p className="text-lg text-muted-foreground">
            Track your orders across multiple shipment dates
          </p>
        </div>

        {/* Shipment Grid */}
        <div className="space-y-6">
          {shipmentDates.map((shipment) => {
            const theme = colorThemes[shipment.color as keyof typeof colorThemes];
            const isExpanded = expandedShipment === shipment.id;
            const shipmentDate = new Date(shipment.date);
            const isPastCutoff = new Date() > new Date(shipment.cutoffDate);
            
            return (
              <div key={shipment.id} className="space-y-4">
                {/* Main Card */}
                <Card 
                  className={`overflow-hidden transition-all duration-300 cursor-pointer ${
                    isExpanded 
                      ? `ring-4 ${theme.ring} ${theme.shadow} shadow-2xl transform scale-[1.02]` 
                      : 'hover:shadow-lg hover:scale-[1.01]'
                  }`}
                  onClick={() => toggleExpanded(shipment.id)}
                >
                  <div className="grid md:grid-cols-3 gap-0">
                    {/* Image Section */}
                    <div className="relative h-48 md:h-full">
                      <ImageWithFallback 
                        src={shipment.image}
                        alt={shipment.title}
                        className="w-full h-full object-cover"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-br ${theme.gradient} opacity-20`} />
                      
                      {/* Status Badge */}
                      <div className="absolute top-4 left-4">
                        <Badge className={`${theme.badge} shadow-sm text-xs px-3 py-1`}>
                          {shipment.status.charAt(0).toUpperCase() + shipment.status.slice(1)}
                        </Badge>
                      </div>
                      
                      {/* Expand Button */}
                      <div className="absolute bottom-4 right-4">
                        <Button
                          variant="secondary"
                          size="sm"
                          className="bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleExpanded(shipment.id);
                          }}
                        >
                          {isExpanded ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                    
                    {/* Content Section */}
                    <div className="md:col-span-2 p-6">
                      <div className="flex flex-col h-full">
                        <div className="flex-1">
                          <h2 className="text-2xl mb-2">{shipment.title}</h2>
                          
                          {/* Key Stats */}
                          <div className="flex flex-wrap gap-4 mb-4">
                            <div className="flex items-center gap-2 text-sm">
                              <Calendar className="w-4 h-4 text-muted-foreground" />
                              <span>Ships: {shipmentDate.toLocaleDateString()}</span>
                            </div>
                            
                            <div className="flex items-center gap-2 text-sm">
                              <Clock className="w-4 h-4 text-muted-foreground" />
                              <span>Cutoff: {new Date(shipment.cutoffDate).toLocaleDateString()}</span>
                            </div>
                            
                            {shipment.totalOrders && (
                              <div className="flex items-center gap-2 text-sm">
                                <Package className="w-4 h-4 text-muted-foreground" />
                                <span>{shipment.completedOrders || 0} / {shipment.totalOrders} orders</span>
                              </div>
                            )}
                          </div>
                          
                          {/* Rating */}
                          <div className="flex items-center gap-2 mb-4">
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              ))}
                            </div>
                            <span className="text-sm text-muted-foreground">
                              4.8 ({Math.floor(Math.random() * 200) + 50} reviews)
                            </span>
                          </div>
                        </div>
                        
                        {/* Bottom Actions */}
                        <div className="flex items-center justify-between pt-4 border-t">
                          <div className="text-sm text-muted-foreground">
                            {getProductsForShipment(shipment.id).length} products available
                          </div>
                          
                          <Button
                            variant="outline"
                            size="sm"
                            className={`${theme.text} ${theme.border} hover:${theme.secondary}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleExpanded(shipment.id);
                            }}
                          >
                            {isExpanded ? 'Show Less' : 'View Products'}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Expanded Content */}
                {isExpanded && (
                  <div className="animate-in slide-in-from-top-4 duration-300">
                    <Card className={`p-6 ${theme.secondary} ${theme.border}`}>
                      {/* Description */}
                      <div className="mb-6">
                        <p className="text-muted-foreground">{shipment.description}</p>
                      </div>
                      
                      {/* Status and Timeline for processing/completed shipments */}
                      {(shipment.status === 'processing' || shipment.status === 'completed') && shipment.totalOrders && (
                        <div className="mb-8">
                          <h3 className="text-xl mb-4">Order Progress</h3>
                          
                          {/* Desktop: Side by side */}
                          <div className="hidden md:grid md:grid-cols-2 gap-8">
                            <div>
                              <h4 className="mb-3">Order Summary</h4>
                              <OrderSummaryGrid 
                                orders={[
                                  { id: '1', product: 'Various Items', quantity: shipment.totalOrders, status: 'completed' }
                                ]}
                                theme={theme}
                              />
                            </div>
                            
                            <div>
                              <h4 className="mb-3">Shipment Timeline</h4>
                              <ShipmentTimeline 
                                shipmentData={shipment}
                                theme={theme}
                              />
                            </div>
                          </div>
                          
                          {/* Mobile: Stacked */}
                          <div className="md:hidden space-y-6">
                            <div>
                              <h4 className="mb-3">Order Summary</h4>
                              <OrderSummaryGrid 
                                orders={[
                                  { id: '1', product: 'Various Items', quantity: shipment.totalOrders, status: 'completed' }
                                ]}
                                theme={theme}
                              />
                            </div>
                            
                            <div>
                              <h4 className="mb-3">Shipment Timeline</h4>
                              <ShipmentTimeline 
                                shipmentData={shipment}
                                theme={theme}
                              />
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {/* Products Section */}
                      <div>
                        <h3 className="text-xl mb-4">Available Products</h3>
                        
                        {/* Mobile: Single column scrollable */}
                        <div className="md:hidden">
                          <div className="space-y-4 max-h-96 overflow-y-auto">
                            {getProductsForShipment(shipment.id).map((product) => (
                              <Card key={product.id} className="p-4 flex gap-4">
                                <ImageWithFallback 
                                  src={product.image}
                                  alt={product.name}
                                  className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                                />
                                <div className="flex-1">
                                  <h5 className="mb-1">{product.name}</h5>
                                  <p className="text-sm text-muted-foreground mb-2">Stock: {product.stock}</p>
                                  <div className="flex items-center justify-between">
                                    <span className={`${theme.text}`}>${product.price}</span>
                                    <Button size="sm" className={`${theme.primary} text-white`}>
                                      Add to Cart
                                    </Button>
                                  </div>
                                </div>
                              </Card>
                            ))}
                          </div>
                        </div>
                        
                        {/* Desktop: Full width grid */}
                        <div className="hidden md:block">
                          <ProductGrid 
                            products={getProductsForShipment(shipment.id)}
                            theme={theme}
                          />
                        </div>
                      </div>
                    </Card>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}