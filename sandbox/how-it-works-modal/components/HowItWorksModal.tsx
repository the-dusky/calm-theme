import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { ShippingSteps } from "./ShippingSteps";
import { HelpCircle } from "lucide-react";

interface HowItWorksModalProps {
  trigger?: React.ReactNode;
}

export function HowItWorksModal({ trigger }: HowItWorksModalProps) {
  const defaultTrigger = (
    <button className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
      <HelpCircle className="w-4 h-4" />
      How it works
    </button>
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || defaultTrigger}
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <ShippingSteps layout="modal" />
      </DialogContent>
    </Dialog>
  );
}