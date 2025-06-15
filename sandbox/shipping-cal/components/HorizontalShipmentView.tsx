import React, { useState, useRef, useEffect } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ArrowLeft, ChevronUp, ChevronDown, Calendar, Package, Star } from 'lucide-react';
import { ProductGrid } from './ProductGrid';
import { OrderSummaryGrid } from './OrderSummaryGrid';
import { ShipmentTimeline } from './ShipmentTimeline';
import exampleImage from 'figma:asset/3760ed0382b9776882ec6f945cd6106e537a6013.png';

interface ShipmentDate {
  id: string;
  date: string;
  title: string;
  description: string;
  status: 'upcoming' | 'active' | 'processing' | 'completed';
  color: string;
  cutoffDate: string;
  totalOrders?: number;
  completedOrders?: number;
}

interface HorizontalShipmentViewProps {
  shipmentDates: ShipmentDate[];
  onBack: () => void;
}

const colorThemes = {
  emerald: {
    primary: 'bg-emerald-500',
    secondary: 'bg-emerald-50',
    border: 'border-emerald-200',
    text: 'text-emerald-700',
    badge: 'bg-emerald-100 text-emerald-700',
    background: 'bg-emerald-50/30',
    gradient: 'from-emerald-400 to-emerald-600'
  },
  blue: {
    primary: 'bg-blue-500',
    secondary: 'bg-blue-50',
    border: 'border-blue-200',
    text: 'text-blue-700',
    badge: 'bg-blue-100 text-blue-700',
    background: 'bg-blue-50/30',
    gradient: 'from-blue-400 to-blue-600'
  },
  purple: {
    primary: 'bg-purple-500',
    secondary: 'bg-purple-50',
    border: 'border-purple-200',
    text: 'text-purple-700',
    badge: 'bg-purple-100 text-purple-700',
    background: 'bg-purple-50/30',
    gradient: 'from-purple-400 to-purple-600'
  },
  orange: {
    primary: 'bg-orange-500',
    secondary: 'bg-orange-50',
    border: 'border-orange-200',
    text: 'text-orange-700',
    badge: 'bg-orange-100 text-orange-700',
    background: 'bg-orange-50/30',
    gradient: 'from-orange-400 to-orange-600'
  },
  teal: {
    primary: 'bg-teal-500',
    secondary: 'bg-teal-50',
    border: 'border-teal-200',
    text: 'text-teal-700',
    badge: 'bg-teal-100 text-teal-700',
    background: 'bg-teal-50/30',
    gradient: 'from-teal-400 to-teal-600'
  },
  rose: {
    primary: 'bg-rose-500',
    secondary: 'bg-rose-50',
    border: 'border-rose-200',
    text: 'text-rose-700',
    badge: 'bg-rose-100 text-rose-700',
    background: 'bg-rose-50/30',
    gradient: 'from-rose-400 to-rose-600'
  }
};

// Sample products for each shipment
const getProductsForShipment = (shipmentId: string) => {
  const productSets = {
    '1': [
      { id: '1', name: 'Thai Silk Scarf', price: 45, image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=400&fit=crop', stock: 50 },
      { id: '2', name: 'Handwoven Basket', price: 32, image: 'https://images.unsplash.com/photo-1586995985615-ad72e7e4c7ce?w=400&h=400&fit=crop', stock: 30 },
      { id: '3', name: 'Ceramic Bowl Set', price: 78, image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop', stock: 25 }
    ],
    '2': [
      { id: '4', name: 'Cotton Wrap Dress', price: 89, image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=400&fit=crop', stock: 20 },
      { id: '5', name: 'Wooden Wind Chimes', price: 28, image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop', stock: 40 },
      { id: '6', name: 'Bamboo Serving Tray', price: 35, image: 'https://images.unsplash.com/photo-1586995985615-ad72e7e4c7ce?w=400&h=400&fit=crop', stock: 35 }
    ],
    '3': [
      { id: '7', name: 'Silver Elephant Pendant', price: 120, image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=400&fit=crop', stock: 15 },
      { id: '8', name: 'Hand-painted Vase', price: 65, image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop', stock: 22 }
    ],
    '4': [
      { id: '9', name: 'Festival Lanterns Set', price: 55, image: 'https://images.unsplash.com/photo-1586995985615-ad72e7e4c7ce?w=400&h=400&fit=crop', stock: 30 },
      { id: '10', name: 'Traditional Mask', price: 42, image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=400&fit=crop', stock: 18 }
    ],
    '5': [
      { id: '11', name: 'Rain Protection Cloak', price: 95, image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=400&fit=crop', stock: 12 },
      { id: '12', name: 'Water Lily Candles', price: 24, image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop', stock: 45 }
    ],
    '6': [
      { id: '13', name: 'Antique Bronze Mirror', price: 180, image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=400&fit=crop', stock: 8 },
      { id: '14', name: 'Heritage Tapestry', price: 220, image: 'https://images.unsplash.com/photo-1586995985615-ad72e7e4c7ce?w=400&h=400&fit=crop', stock: 6 }
    ]
  };
  
  return productSets[shipmentId as keyof typeof productSets] || [];
};

export function HorizontalShipmentView({ shipmentDates, onBack }: HorizontalShipmentViewProps) {
  const [centeredShipment, setCenteredShipment] = useState<ShipmentDate | null>(shipmentDates[2] || shipmentDates[0]);
  const [expandedShipment, setExpandedShipment] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Generate extended timeline
  const generateTimeline = () => {
    const startDate = new Date('2025-05-01');
    const endDate = new Date('2025-08-31');
    
    const timeline = [];
    const current = new Date(startDate);
    
    while (current <= endDate) {
      const monthData = {
        month: current.toLocaleString('default', { month: 'long' }),
        year: current.getFullYear(),
        date: new Date(current),
        days: []
      };

      const daysInMonth = new Date(current.getFullYear(), current.getMonth() + 1, 0).getDate();
      for (let day = 1; day <= daysInMonth; day++) {
        const dayDate = new Date(current.getFullYear(), current.getMonth(), day);
        monthData.days.push({
          day,
          date: dayDate,
          hasShipment: shipmentDates.some(shipment => {
            const shipmentDate = new Date(shipment.date);
            return shipmentDate.toDateString() === dayDate.toDateString();
          }),
          shipment: shipmentDates.find(shipment => {
            const shipmentDate = new Date(shipment.date);
            return shipmentDate.toDateString() === dayDate.toDateString();
          })
        });
      }

      timeline.push(monthData);
      current.setMonth(current.getMonth() + 1);
    }
    
    return timeline;
  };

  const timeline = generateTimeline();

  // Smooth scroll handling
  const handleScroll = () => {
    if (!scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const containerRect = container.getBoundingClientRect();
    const containerCenter = containerRect.width / 2;

    const cards = container.querySelectorAll('[data-shipment-card]');
    let closestShipment = null;
    let closestDistance = Infinity;

    cards.forEach((card) => {
      const cardRect = card.getBoundingClientRect();
      const containerCardRect = container.getBoundingClientRect();
      const cardCenter = cardRect.left - containerCardRect.left + cardRect.width / 2;
      const distance = Math.abs(containerCenter - cardCenter);

      if (distance < closestDistance && distance < 200) {
        closestDistance = distance;
        const shipmentId = card.getAttribute('data-shipment-id');
        closestShipment = shipmentDates.find(s => s.id === shipmentId);
      }
    });

    if (closestShipment && (!centeredShipment || closestShipment.id !== centeredShipment.id)) {
      setCenteredShipment(closestShipment);
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let timeoutId: NodeJS.Timeout;
    const debouncedHandleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleScroll, 50);
    };

    container.addEventListener('scroll', debouncedHandleScroll, { passive: true });
    setTimeout(handleScroll, 100);
    
    return () => {
      container.removeEventListener('scroll', debouncedHandleScroll);
      clearTimeout(timeoutId);
    };
  }, [shipmentDates, centeredShipment]);

  const centeredTheme = centeredShipment ? colorThemes[centeredShipment.color as keyof typeof colorThemes] : null;

  return (
    <div className={`min-h-screen transition-colors duration-700 ease-out ${centeredTheme?.background || 'bg-background'}`}>
      <div className="w-full">
        {/* Header */}
        <div className="p-6 border-b bg-background/80 backdrop-blur-sm">
          <div className="flex items-center gap-4 mb-4">
            <Button variant="outline" onClick={onBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
            <h1 className="text-2xl">Thailand Shipment Timeline</h1>
          </div>
        </div>

        {/* Main Timeline Container */}
        <div className="relative">
          {/* Center indicator line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-primary/30 pointer-events-none z-20 transform -translate-x-px" />
          
          <div 
            ref={scrollContainerRef}
            className="overflow-x-auto scrollbar-hide"
            style={{ scrollBehavior: 'auto' }}
          >
            <div className="inline-flex flex-col min-w-full">
              {/* Timeline Header */}
              <div className="flex items-start border-b bg-background/80 backdrop-blur-sm sticky top-0 z-10">
                <div className="w-96 flex-shrink-0"></div>
                
                {timeline.map((month) => (
                  <div key={`${month.year}-${month.month}`} className="flex-shrink-0 px-4 py-4">
                    <div className="text-center mb-3">
                      <div className="text-sm font-medium text-muted-foreground">
                        {month.month} {month.year}
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      {month.days.map((day) => {
                        const hasShipment = day.hasShipment;
                        const shipment = day.shipment;
                        const theme = shipment ? colorThemes[shipment.color as keyof typeof colorThemes] : null;
                        
                        return (
                          <div key={day.day} className="relative flex flex-col items-center mx-1">
                            <div className={`w-1 h-8 ${hasShipment ? 'bg-primary' : 'bg-border'} relative`}>
                              {hasShipment && theme && (
                                <div 
                                  className={`absolute -top-1 -left-1 w-3 h-3 rounded-full ${theme.primary} border-2 border-background shadow-sm`}
                                  title={`${shipment?.title} - ${day.date.toLocaleDateString()}`}
                                />
                              )}
                            </div>
                            
                            {(day.day === 1 || day.day === 15 || hasShipment) && (
                              <div className="text-xs text-muted-foreground mt-1">
                                {day.day}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
                
                <div className="w-96 flex-shrink-0"></div>
              </div>

              {/* Shipment Cards */}
              <div className="flex items-start py-8 relative">
                <div className="w-96 flex-shrink-0"></div>
                
                {shipmentDates.map((shipment, index) => {
                  const theme = colorThemes[shipment.color as keyof typeof colorThemes];
                  const isCentered = centeredShipment?.id === shipment.id;
                  const isExpanded = expandedShipment === shipment.id;
                  const shipmentDate = new Date(shipment.date);
                  
                  const startOfYear = new Date('2025-05-01');
                  const daysDiff = Math.floor((shipmentDate.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24));
                  const leftOffset = daysDiff * 6;
                  
                  return (
                    <div
                      key={shipment.id}
                      data-shipment-card="true"
                      data-shipment-id={shipment.id}
                      className={`absolute transition-all duration-500 ease-out ${
                        isCentered ? 'transform scale-105 z-10' : 'z-0'
                      }`}
                      style={{ 
                        left: `${leftOffset}px`,
                        marginLeft: index * 15
                      }}
                    >
                      <Card 
                        className={`overflow-hidden transition-all duration-500 w-72 ${
                          isCentered 
                            ? 'shadow-2xl ring-2 ring-primary/20' 
                            : 'shadow-lg hover:shadow-xl'
                        } ${theme.border}`}
                      >
                        {/* Hero Image */}
                        <div className="relative h-48 overflow-hidden">
                          <img 
                            src={exampleImage} 
                            alt={shipment.title}
                            className="w-full h-full object-cover"
                          />
                          <div className={`absolute inset-0 bg-gradient-to-t ${theme.gradient} opacity-20`} />
                          
                          {/* Status Badge */}
                          <div className="absolute top-3 left-3">
                            <Badge variant="secondary" className={`${theme.badge} text-xs backdrop-blur-sm`}>
                              {shipment.status}
                            </Badge>
                          </div>
                        </div>
                        
                        {/* Card Content */}
                        <div className="p-4">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="line-clamp-2 pr-2">
                              {shipment.title}
                            </h3>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="flex-shrink-0 h-8 w-8 p-0"
                              onClick={(e) => {
                                e.stopPropagation();
                                setExpandedShipment(isExpanded ? null : shipment.id);
                              }}
                            >
                              {isExpanded ? (
                                <ChevronUp className="w-4 h-4" />
                              ) : (
                                <ChevronDown className="w-4 h-4" />
                              )}
                            </Button>
                          </div>
                          
                          {/* Rating Stars */}
                          <div className="flex items-center gap-1 mb-3">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star key={star} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            ))}
                            <span className="text-sm text-muted-foreground ml-1">
                              4.5 ({Math.floor(Math.random() * 100) + 50})
                            </span>
                          </div>

                          {/* Date Info */}
                          <div className="text-sm text-muted-foreground">
                            <div className="flex items-center gap-1 mb-1">
                              <Calendar className="w-3 h-3" />
                              <span>Ships: {shipmentDate.toLocaleDateString()}</span>
                            </div>
                            {shipment.totalOrders && (
                              <div className="flex items-center gap-1">
                                <Package className="w-3 h-3" />
                                <span>{shipment.completedOrders || 0} / {shipment.totalOrders} orders</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </Card>
                      
                      {/* Expanded Content */}
                      {isExpanded && (
                        <div className="mt-4 w-full max-w-4xl">
                          <Card className={`p-6 ${theme.secondary} ${theme.border}`}>
                            <div className="mb-6">
                              <h3 className="text-xl mb-2">{shipment.title}</h3>
                              <p className="text-muted-foreground mb-4">{shipment.description}</p>
                              
                              {/* Status and Timeline for processing/completed shipments */}
                              {(shipment.status === 'processing' || shipment.status === 'completed') && shipment.totalOrders && (
                                <div className="mb-6">
                                  <h4 className="mb-4">Order Progress</h4>
                                  <OrderSummaryGrid 
                                    orders={[
                                      { id: '1', product: 'Various Items', quantity: shipment.totalOrders, status: 'completed' }
                                    ]}
                                    theme={theme}
                                  />
                                  
                                  <div className="mt-6">
                                    <ShipmentTimeline 
                                      shipmentData={shipment}
                                      theme={theme}
                                    />
                                  </div>
                                </div>
                              )}
                            </div>
                            
                            {/* Products Grid */}
                            <div>
                              <h4 className="mb-4">Available Products</h4>
                              <ProductGrid 
                                products={getProductsForShipment(shipment.id)}
                                theme={theme}
                              />
                            </div>
                          </Card>
                        </div>
                      )}
                    </div>
                  );
                })}
                
                <div className="w-96 flex-shrink-0"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}