import React, { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { DropBadge } from './DropBadge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Badge } from './ui/badge';
import { Star } from 'lucide-react';

interface ColorSwatch {
  color: string;
  name: string;
  image: string;
}

interface ProductCardProps {
  name: string;
  price: string;
  images: string[];
  colorSwatches: ColorSwatch[];
  dropDates: string[];
  badge?: string;
  rating?: number;
  reviewCount?: number;
  tags?: string[];
}

export function ProductCard({ 
  name, 
  price, 
  images, 
  colorSwatches, 
  dropDates, 
  badge,
  rating = 0,
  reviewCount = 0,
  tags = []
}: ProductCardProps) {
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const visibleSwatches = colorSwatches.slice(0, 5);
  const remainingSwatches = colorSwatches.length - 5;

  const currentImage = colorSwatches[selectedColorIndex]?.image || images[0];

  const renderStars = () => {
    const stars = [];
    const filledStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < filledStars) {
        stars.push(
          <Star key={i} className="w-3 h-3 fill-foreground text-foreground" />
        );
      } else if (i === filledStars && hasHalfStar) {
        stars.push(
          <div key={i} className="relative w-3 h-3">
            <Star className="w-3 h-3 text-muted-foreground absolute" />
            <div className="overflow-hidden w-1/2">
              <Star className="w-3 h-3 fill-foreground text-foreground" />
            </div>
          </div>
        );
      } else {
        stars.push(
          <Star key={i} className="w-3 h-3 text-muted-foreground" />
        );
      }
    }
    return stars;
  };

  return (
    <Card 
      className="w-full max-w-sm bg-white overflow-hidden hover:shadow-md transition-shadow duration-200 border-0 h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-0 h-full flex flex-col">
        <div className="relative bg-gray-50">
          {/* Top Badge Only */}
          {badge && (
            <div className="absolute top-3 left-3 z-10">
              <Badge className="bg-white text-black text-xs px-2 py-1 rounded-sm shadow-sm">
                {badge}
              </Badge>
            </div>
          )}

          {/* Product Image */}
          <div className="aspect-square relative overflow-hidden">
            <ImageWithFallback
              src={currentImage}
              alt={name}
              className="w-full h-full object-cover transition-transform duration-300"
              style={{ transform: isHovered ? 'scale(1.05)' : 'scale(1)' }}
            />
          </div>
        </div>

        {/* Color Swatches */}
        {colorSwatches.length > 0 && (
          <div className="px-3 py-3">
            <div className="flex items-center gap-2">
              {visibleSwatches.map((swatch, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedColorIndex(index)}
                  className={`w-5 h-5 rounded-full border-2 transition-all duration-200 ${
                    selectedColorIndex === index 
                      ? 'border-black scale-110' 
                      : 'border-gray-300 hover:border-gray-500'
                  }`}
                  style={{ backgroundColor: swatch.color }}
                  title={swatch.name}
                />
              ))}
              {remainingSwatches > 0 && (
                <span className="text-xs text-muted-foreground ml-1">
                  +{remainingSwatches}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Product Info - Flex grow to push drop badge down */}
        <div className="px-3 pb-3 flex-grow flex flex-col">
          <div className="flex-grow">
            <h3 className="text-sm mb-1 leading-tight">{name}</h3>
            
            <div className="mb-2">
              <span className="text-sm">{price}</span>
            </div>

            {/* Rating */}
            {rating > 0 && (
              <div className="flex items-center gap-1 mb-2">
                <div className="flex items-center gap-0.5">
                  {renderStars()}
                </div>
                {reviewCount > 0 && (
                  <span className="text-xs text-muted-foreground">
                    ({reviewCount})
                  </span>
                )}
              </div>
            )}

            {/* Tags */}
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-2">
                {tags.map((tag, index) => (
                  <Badge 
                    key={index} 
                    variant="secondary" 
                    className="text-xs px-2 py-0.5 bg-gray-100 text-gray-700 rounded-sm"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Drop Dates - Always at bottom */}
          {dropDates.length > 0 && (
            <div className="mt-auto">
              <DropBadge dates={dropDates} />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}