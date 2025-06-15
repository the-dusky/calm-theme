import React from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { CheckCircle, Circle, Package, Plane, Truck, Home, Clock } from 'lucide-react';

interface Theme {
  primary: string;
  secondary: string;
  border: string;
  text: string;
  badge: string;
  background: string;
}

interface ShipmentTimelineProps {
  currentStep: number;
  theme?: Theme;
}

const timelineSteps = [
  {
    id: 1,
    title: 'Calm Thailand Working on Order',
    description: 'Preparing and packaging your items',
    icon: Package,
    estimatedDays: '1-3 days'
  },
  {
    id: 2,
    title: 'Order in Transit to US',
    description: 'Shipping from Thailand to United States',
    icon: Plane,
    estimatedDays: '7-10 days'
  },
  {
    id: 3,
    title: 'Order Fulfillment in Progress',
    description: 'Processing at US fulfillment center',
    icon: Clock,
    estimatedDays: '3-5 days'
  },
  {
    id: 4,
    title: 'Orders Shipped to Customers',
    description: 'Individual orders dispatched for delivery',
    icon: Truck,
    estimatedDays: '2-5 days'
  },
  {
    id: 5,
    title: 'Orders Received',
    description: 'Delivered to customers',
    icon: Home,
    estimatedDays: 'Complete'
  }
];

export function ShipmentTimeline({ currentStep, theme }: ShipmentTimelineProps) {
  const getStepStatus = (stepId: number) => {
    if (stepId < currentStep) return 'completed';
    if (stepId === currentStep) return 'current';
    return 'pending';
  };

  const getProgressPercentage = () => {
    return Math.max(0, Math.min(100, ((currentStep - 1) / (timelineSteps.length - 1)) * 100));
  };

  const cardClasses = theme ? `${theme.border}` : '';

  return (
    <Card className={`p-6 ${cardClasses}`}>
      <h3 className="mb-6">Shipment Progress</h3>
      
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">Overall Progress</span>
          <span className="text-sm">{Math.round(getProgressPercentage())}%</span>
        </div>
        <Progress value={getProgressPercentage()} className="h-2" />
      </div>

      {/* Timeline Steps */}
      <div className="space-y-6">
        {timelineSteps.map((step, index) => {
          const status = getStepStatus(step.id);
          const Icon = step.icon;
          
          return (
            <div key={step.id} className="flex items-start gap-4">
              {/* Icon */}
              <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                status === 'completed' 
                  ? 'bg-primary border-primary text-primary-foreground' 
                  : status === 'current'
                  ? 'bg-accent border-primary text-primary'
                  : 'bg-background border-muted-foreground text-muted-foreground'
              }`}>
                {status === 'completed' ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  <Icon className="w-5 h-5" />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-3">
                  <h4 className={status === 'pending' ? 'text-muted-foreground' : ''}>{step.title}</h4>
                  <Badge variant={
                    status === 'completed' ? 'default' : 
                    status === 'current' ? 'secondary' : 
                    'outline'
                  }>
                    {status === 'completed' ? 'Completed' : 
                     status === 'current' ? 'In Progress' : 
                     step.estimatedDays}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>

              {/* Connector Line */}
              {index < timelineSteps.length - 1 && (
                <div className={`absolute left-[2.5rem] mt-10 w-0.5 h-6 ${
                  status === 'completed' ? 'bg-primary' : 'bg-border'
                }`} />
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
}