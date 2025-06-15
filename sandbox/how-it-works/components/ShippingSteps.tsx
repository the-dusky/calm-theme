import { Clock, Truck, Package, Calendar, ChevronDown, ChevronRight, MessageCircle, RotateCcw, Heart } from 'lucide-react';
import { useState } from 'react';

interface Step {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
  isActive?: boolean;
  transparency?: {
    title: string;
    content: string;
    icon: React.ReactNode;
  };
}

interface ShippingStepsProps {
  layout?: 'mobile' | 'desktop';
}

export function ShippingSteps({ layout = 'mobile' }: ShippingStepsProps) {
  const [expandedSteps, setExpandedSteps] = useState<Set<number>>(new Set());

  const toggleStep = (stepId: number) => {
    const newExpanded = new Set(expandedSteps);
    if (newExpanded.has(stepId)) {
      newExpanded.delete(stepId);
    } else {
      newExpanded.add(stepId);
    }
    setExpandedSteps(newExpanded);
  };

  const steps: Step[] = [
    {
      id: 1,
      icon: <Clock className="w-5 h-5" />,
      title: "Place Order by Cutoff",
      description: "Submit your order before daily cutoff time",
      isActive: true,
      transparency: {
        title: "Why we're starting slow",
        content: "We are starting slow and trying to learn as much as possible from our customers. Join our Discord community to help shape the vision. We'd rather get it right than get it fast.",
        icon: <MessageCircle className="w-4 h-4" />
      }
    },
    {
      id: 2,
      icon: <Truck className="w-5 h-5" />,
      title: "Shipping from Thailand",
      description: "7-10 business days processing & transit",
      isActive: false,
      transparency: {
        title: "Our Thai connection",
        content: "Calm is a brand based in Thailand. We are friends with them and decided they need to be in the US and Japan. Why the US and Japan? One of us lives in the US and the other in Japan. Sometimes business is that simple.",
        icon: <Heart className="w-4 h-4" />
      }
    },
    {
      id: 3,
      icon: <Package className="w-5 h-5" />,
      title: "Receipt in Jersey City",
      description: "Package arrives at our US facility",
      isActive: false,
      transparency: {
        title: "About returns (for now)",
        content: "Currently we are unable to accept returns. We suggest buying one item to see how it fits and then expand. This will change in the future as we build out our logistics. We know it's not ideal, but we're being honest about our current constraints.",
        icon: <RotateCcw className="w-4 h-4" />
      }
    },
    {
      id: 4,
      icon: <Calendar className="w-5 h-5" />,
      title: "Ship by Date",
      description: "Final delivery to your address",
      isActive: false
    }
  ];

  if (layout === 'desktop') {
    return (
      <div className="w-full max-w-6xl mx-auto bg-card rounded-lg p-8 shadow-sm border">
        <div className="mb-8">
          <h2 className="mb-2">Shipping Timeline</h2>
          <p className="text-muted-foreground">Track your order journey</p>
          <p className="text-xs text-muted-foreground mt-1">
            💡 Click steps below for radical transparency
          </p>
        </div>
        
        {/* Desktop horizontal timeline */}
        <div className="relative mb-8">
          {/* Connecting line */}
          <div className="absolute top-6 left-6 right-6 h-0.5 bg-border"></div>
          
          <div className="grid grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={step.id} className="relative">
                {/* Step circle with icon */}
                <div className={`
                  relative z-10 flex items-center justify-center w-12 h-12 rounded-full border-2 mx-auto mb-4
                  ${step.isActive 
                    ? 'bg-primary border-primary text-primary-foreground' 
                    : 'bg-background border-border text-muted-foreground'
                  }
                `}>
                  {step.icon}
                </div>
                
                {/* Step content */}
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span className={`
                      px-2 py-1 rounded-full text-xs
                      ${step.isActive 
                        ? 'bg-primary/10 text-primary' 
                        : 'bg-muted text-muted-foreground'
                      }
                    `}>
                      Step {step.id}
                    </span>
                  </div>
                  <h3 className={`mb-2 ${step.isActive ? 'text-foreground' : 'text-muted-foreground'}`}>
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop transparency sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {steps.filter(step => step.transparency).map((step) => (
            <div key={`transparency-${step.id}`} className="p-6 bg-accent/50 rounded-lg border-l-4 border-primary/30">
              <div className="flex items-center gap-2 mb-3">
                {step.transparency!.icon}
                <span className="text-sm text-foreground">
                  {step.transparency!.title}
                </span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {step.transparency!.content}
              </p>
            </div>
          ))}
        </div>
        
        {/* Footer sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="p-4 bg-muted/50 rounded-lg">
            <p className="text-muted-foreground">
              <strong>Note:</strong> Actual delivery times may vary based on customs processing and local shipping conditions.
            </p>
          </div>
          
          <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
            <p className="text-sm text-muted-foreground">
              <strong>Our commitment:</strong> We believe in radical transparency. Every constraint, every decision, every "why" - we share it all because we think you deserve to know how your order really works.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Mobile layout (original)
  return (
    <div className="w-full max-w-md mx-auto bg-card rounded-lg p-6 shadow-sm border">
      <div className="mb-6">
        <h2 className="mb-2">Shipping Timeline</h2>
        <p className="text-muted-foreground">Track your order journey</p>
        <p className="text-xs text-muted-foreground mt-1">
          💡 Tap steps below for radical transparency
        </p>
      </div>
      
      <div className="relative">
        {steps.map((step, index) => (
          <div key={step.id} className="relative pb-8 last:pb-0">
            {/* Connecting line */}
            {index < steps.length - 1 && (
              <div className="absolute left-6 top-12 w-0.5 h-16 bg-border"></div>
            )}
            
            <div className="flex items-start">
              {/* Step circle with icon */}
              <div className={`
                relative z-10 flex items-center justify-center w-12 h-12 rounded-full border-2 mr-4
                ${step.isActive 
                  ? 'bg-primary border-primary text-primary-foreground' 
                  : 'bg-background border-border text-muted-foreground'
                }
              `}>
                {step.icon}
              </div>
              
              {/* Step content */}
              <div className="flex-1 min-w-0 pt-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`
                    px-2 py-1 rounded-full text-xs
                    ${step.isActive 
                      ? 'bg-primary/10 text-primary' 
                      : 'bg-muted text-muted-foreground'
                    }
                  `}>
                    Step {step.id}
                  </span>
                </div>
                <h3 className={`mb-1 ${step.isActive ? 'text-foreground' : 'text-muted-foreground'}`}>
                  {step.title}
                </h3>
                <p className="text-muted-foreground mb-3">
                  {step.description}
                </p>

                {/* Transparency toggle */}
                {step.transparency && (
                  <div className="mb-3">
                    <button
                      onClick={() => toggleStep(step.id)}
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors p-2 -ml-2 rounded-lg hover:bg-muted/50"
                    >
                      {expandedSteps.has(step.id) ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      )}
                      <span>Behind the scenes</span>
                    </button>
                    
                    {/* Expanded transparency content */}
                    {expandedSteps.has(step.id) && (
                      <div className="mt-3 p-4 bg-accent/50 rounded-lg border-l-4 border-primary/30">
                        <div className="flex items-center gap-2 mb-2">
                          {step.transparency.icon}
                          <span className="text-sm text-foreground">
                            {step.transparency.title}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {step.transparency.content}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Footer note */}
      <div className="mt-6 p-4 bg-muted/50 rounded-lg">
        <p className="text-muted-foreground">
          <strong>Note:</strong> Actual delivery times may vary based on customs processing and local shipping conditions.
        </p>
      </div>
      
      {/* Transparency footer */}
      <div className="mt-4 p-4 bg-primary/5 rounded-lg border border-primary/20">
        <p className="text-sm text-muted-foreground">
          <strong>Our commitment:</strong> We believe in radical transparency. Every constraint, every decision, every "why" - we share it all because we think you deserve to know how your order really works.
        </p>
      </div>
    </div>
  );
}