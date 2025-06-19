import { ShippingSteps } from "./components/ShippingSteps";
import { HowItWorksModal } from "./components/HowItWorksModal";
import { MessageCircle, ExternalLink, Monitor, Smartphone, Square } from "lucide-react";
import { useState } from "react";

export default function App() {
  const [layout, setLayout] = useState<'mobile' | 'desktop' | 'modal'>('mobile');

  return (
    <div className="min-h-screen bg-background p-4">
      <div className={`mx-auto ${layout === 'desktop' ? 'max-w-7xl' : 'max-w-lg'}`}>
        <div className="text-center mb-8 pt-8">
          <div className="flex items-center justify-center gap-4 mb-6">
            <h1 className="mb-2">Your Order Journey</h1>
            
            {/* Layout toggle */}
            <div className="flex items-center gap-2 p-1 bg-muted rounded-lg">
              <button
                onClick={() => setLayout('mobile')}
                className={`
                  flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors
                  ${layout === 'mobile' 
                    ? 'bg-background text-foreground shadow-sm' 
                    : 'text-muted-foreground hover:text-foreground'
                  }
                `}
              >
                <Smartphone className="w-4 h-4" />
                Mobile
              </button>
              <button
                onClick={() => setLayout('desktop')}
                className={`
                  flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors
                  ${layout === 'desktop' 
                    ? 'bg-background text-foreground shadow-sm' 
                    : 'text-muted-foreground hover:text-foreground'
                  }
                `}
              >
                <Monitor className="w-4 h-4" />
                Desktop
              </button>
              <button
                onClick={() => setLayout('modal')}
                className={`
                  flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors
                  ${layout === 'modal' 
                    ? 'bg-background text-foreground shadow-sm' 
                    : 'text-muted-foreground hover:text-foreground'
                  }
                `}
              >
                <Square className="w-4 h-4" />
                Modal
              </button>
            </div>
          </div>
          
          <p className="text-muted-foreground">
            Here's what to expect with your international shipment
          </p>
          <p className="text-sm text-primary/80 mt-2">
            We believe in radical transparency ✨
          </p>
          
          {layout === 'modal' && (
            <p className="text-xs text-muted-foreground mt-2">
              Compact version for product page modals
            </p>
          )}
        </div>
        
        <ShippingSteps layout={layout} />
        
        {/* Show modal demo only for modal layout */}
        {layout === 'modal' && (
          <div className="mt-8 text-center p-4 bg-accent/30 rounded-lg">
            <p className="text-sm text-muted-foreground mb-3">
              This is how it would appear in a modal triggered by "How it works" buttons:
            </p>
            <HowItWorksModal 
              trigger={
                <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
                  Try Modal Version
                </button>
              }
            />
          </div>
        )}
        
        {/* Community section - hide for modal layout */}
        {layout !== 'modal' && (
          <>
            <div className={`mt-8 p-6 bg-primary/5 rounded-lg border border-primary/20 ${layout === 'desktop' ? 'max-w-6xl mx-auto' : ''}`}>
              <div className="flex items-center gap-3 mb-4">
                <MessageCircle className="w-5 h-5 text-primary" />
                <h3 className="text-primary">Join Our Community</h3>
              </div>
              <div className={`${layout === 'desktop' ? 'flex items-center justify-between' : ''}`}>
                <p className="text-muted-foreground mb-4">
                  Help us shape the future of international commerce. We're building this together.
                </p>
                <button className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
                  <MessageCircle className="w-4 h-4" />
                  Join Discord
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className={`mt-6 text-center ${layout === 'desktop' ? 'max-w-6xl mx-auto' : ''}`}>
              <p className="text-muted-foreground mb-4">
                Questions about your shipment?
              </p>
              <button className="bg-secondary text-secondary-foreground px-6 py-2 rounded-lg hover:bg-secondary/90 transition-colors">
                Contact Support
              </button>
            </div>
          </>
        )}
        
        {/* Transparency statement */}
        <div className="mt-8 text-center">
          <p className="text-xs text-muted-foreground">
            Every business decision explained. Every constraint shared.<br />
            Because transparency builds trust, and trust builds community.
          </p>
        </div>
      </div>
    </div>
  );
}