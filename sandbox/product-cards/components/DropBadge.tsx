import React, { useState } from 'react';
import { Badge } from './ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Calendar } from 'lucide-react';

interface DropBadgeProps {
  dates: string[];
  className?: string;
}

export function DropBadge({ dates, className = '' }: DropBadgeProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (dates.length === 0) {
    return null;
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric'
    });
  };

  const visibleDates = dates.slice(0, 2);
  const remainingCount = dates.length - 2;

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {visibleDates.map((date, index) => (
        <Badge 
          key={index} 
          className="px-2 py-1 text-xs bg-black text-white hover:bg-gray-800 transition-colors"
        >
          <Calendar className="w-3 h-3 mr-1" />
          {formatDate(date)}
        </Badge>
      ))}
      
      {remainingCount > 0 && (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <Badge 
              className="px-2 py-1 text-xs bg-black text-white hover:bg-gray-800 cursor-pointer transition-colors"
            >
              +{remainingCount}
            </Badge>
          </PopoverTrigger>
          <PopoverContent className="w-48 p-2" align="start">
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground mb-2">All Drop Dates:</p>
              {dates.map((date, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-accent/50 transition-colors"
                >
                  <Calendar className="w-3 h-3 text-muted-foreground" />
                  <span className="text-xs">{formatDate(date)}</span>
                </div>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
}