import { ShippingSteps } from "./components/ShippingSteps";
import { MessageCircle, ExternalLink } from "lucide-react";

export default function App() {
  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-lg mx-auto">
        <div className="text-center mb-8 pt-8">
          <h1 className="mb-2">Your Order Journey</h1>
          <p className="text-muted-foreground">
            Here's what to expect with your international
            shipment
          </p>
          <p className="text-sm text-primary/80 mt-2">
            We believe in radical transparency ✨
          </p>
        </div>

        <ShippingSteps />

        {/* Community section */}
        <div className="mt-8 p-6 bg-primary/5 rounded-lg border border-primary/20">
          <div className="flex items-center gap-3 mb-4">
            <MessageCircle className="w-5 h-5 text-primary" />
            <h3 className="text-primary">Join Our Community</h3>
          </div>
          <p className="text-muted-foreground mb-4">
            Help us shape the future of international commerce.
            We're building this together.
          </p>
          <button className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
            <MessageCircle className="w-4 h-4" />
            Join Discord
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-muted-foreground mb-4">
            Questions about your shipment?
          </p>
          <button className="bg-secondary text-secondary-foreground px-6 py-2 rounded-lg hover:bg-secondary/90 transition-colors">
            Contact Support
          </button>
        </div>

        {/* Transparency statement */}
        <div className="mt-8 text-center">
          <p className="text-xs text-muted-foreground">
            Every business decision explained. Every constraint
            shared.
            <br />
            Because transparency builds trust, and trust builds
            community.
          </p>
        </div>
      </div>
    </div>
  );
}