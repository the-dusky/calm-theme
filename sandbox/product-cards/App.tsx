import React from 'react';
import { ProductCard } from './components/ProductCard';
import { DropBadge } from './components/DropBadge';

export default function App() {
  const products = [
    {
      id: 1,
      name: "M's Baggies™ Shorts - 5\"",
      price: "$69",
      images: [
        "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop",
      ],
      colorSwatches: [
        { color: "#BCA949", name: "Bundle Green", image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop" },
        { color: "#C44227", name: "Pollinator Orange", image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=400&h=400&fit=crop" },
        { color: "#3C6F7B", name: "Wetland Blue", image: "https://images.unsplash.com/photo-1506629905607-603e23496e4d?w=400&h=400&fit=crop" },
        { color: "#191718", name: "Black", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop" },
        { color: "#AACCB8", name: "Rinsed Green", image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=400&fit=crop" },
        { color: "#58646D", name: "Plume Grey", image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=400&h=400&fit=crop" },
        { color: "#46647E", name: "Still Blue", image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=400&fit=crop" },
        { color: "#E7996E", name: "Heirloom Peach", image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400&h=400&fit=crop" },
      ],
      dropDates: ["2024-12-20", "2025-01-15"],
      badge: "Best Seller",
      rating: 4.4,
      reviewCount: 494,
      tags: ["quick-drying"]
    },
    {
      id: 2,
      name: "W's Better Sweater™ Fleece Jacket",
      price: "$99",
      images: [
        "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=400&h=400&fit=crop",
      ],
      colorSwatches: [
        { color: "#2F4F4F", name: "Dark Slate Grey", image: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=400&h=400&fit=crop" },
        { color: "#8B4513", name: "Saddle Brown", image: "https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?w=400&h=400&fit=crop" },
        { color: "#000080", name: "Navy Blue", image: "https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?w=400&h=400&fit=crop" },
        { color: "#228B22", name: "Forest Green", image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop" },
      ],
      dropDates: ["2024-12-25"],
      rating: 4.2,
      reviewCount: 267,
      tags: ["recycled materials", "fair trade"]
    },
    {
      id: 3,
      name: "M's P-6 Logo Responsibili-Tee®",
      price: "$35",
      images: [
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
      ],
      colorSwatches: [
        { color: "#2F4F4F", name: "Gravel Heather", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop" },
        { color: "#FFFFFF", name: "White", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop" },
        { color: "#000000", name: "Black", image: "https://images.unsplash.com/photo-1503341960582-b45751874cf0?w=400&h=400&fit=crop" },
        { color: "#8B4513", name: "Nest Brown", image: "https://images.unsplash.com/photo-1503341960582-b45751874cf0?w=400&h=400&fit=crop" },
        { color: "#228B22", name: "Buffalo Green", image: "https://images.unsplash.com/photo-1503341960582-b45751874cf0?w=400&h=400&fit=crop" },
      ],
      dropDates: ["2024-12-18", "2024-12-25", "2025-01-01", "2025-01-15", "2025-02-14"],
      rating: 4.6,
      reviewCount: 1829,
      tags: ["organic cotton", "fair trade"]
    },
    {
      id: 4,
      name: "M's Torrentshell 3L Jacket",
      price: "$149",
      images: [
        "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400&h=400&fit=crop",
      ],
      colorSwatches: [
        { color: "#2F4F4F", name: "Forge Grey", image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400&h=400&fit=crop" },
        { color: "#C44227", name: "Fire Red", image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop" },
        { color: "#000080", name: "Navy Blue", image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop" },
        { color: "#228B22", name: "Forest Green", image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop" },
        { color: "#000000", name: "Black", image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop" },
      ],
      dropDates: ["2025-01-01"],
      badge: "New",
      rating: 4.3,
      reviewCount: 623,
      tags: ["waterproof", "recycled nylon"]
    },
    {
      id: 5,
      name: "W's Houdini® Jacket",
      price: "$119",
      images: [
        "https://images.unsplash.com/photo-1589320559239-86114c934d4d?w=400&h=400&fit=crop",
      ],
      colorSwatches: [
        { color: "#E7996E", name: "Peach", image: "https://images.unsplash.com/photo-1589320559239-86114c934d4d?w=400&h=400&fit=crop" },
        { color: "#87CEEB", name: "Sky Blue", image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=400&fit=crop" },
        { color: "#2F4F4F", name: "Plume Grey", image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=400&fit=crop" },
        { color: "#000000", name: "Black", image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=400&fit=crop" },
      ],
      dropDates: [],
      rating: 4.5,
      reviewCount: 892,
      tags: ["windproof", "packable"]
    },
    {
      id: 6,
      name: "M's Synchilla® Snap-T® Pullover",
      price: "$149",
      images: [
        "https://images.unsplash.com/photo-1593030668609-2b5beace2734?w=400&h=400&fit=crop",
      ],
      colorSwatches: [
        { color: "#2F4F4F", name: "Nickel", image: "https://images.unsplash.com/photo-1593030668609-2b5beace2734?w=400&h=400&fit=crop" },
        { color: "#8B4513", name: "Owl Brown", image: "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?w=400&h=400&fit=crop" },
        { color: "#000080", name: "Classic Navy", image: "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?w=400&h=400&fit=crop" },
        { color: "#228B22", name: "Industrial Green", image: "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?w=400&h=400&fit=crop" },
        { color: "#654321", name: "Logwood Brown", image: "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?w=400&h=400&fit=crop" },
        { color: "#C44227", name: "Hot Ember", image: "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?w=400&h=400&fit=crop" },
      ],
      dropDates: ["2025-01-10"],
      badge: "Classic",
      rating: 4.7,
      reviewCount: 1456,
      tags: ["recycled fleece", "heritage style"]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl mb-8 text-center text-gray-900">Patagonia-Style Product Cards</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-12 auto-rows-fr">
          {products.map((product) => (
            <div key={product.id} className="h-full">
              <ProductCard 
                name={product.name}
                price={product.price}
                images={product.images}
                colorSwatches={product.colorSwatches}
                dropDates={product.dropDates}
                badge={product.badge}
                rating={product.rating}
                reviewCount={product.reviewCount}
                tags={product.tags}
              />
            </div>
          ))}
        </div>

        <div className="bg-white border rounded-lg p-6 max-w-2xl mx-auto">
          <h2 className="text-xl mb-4">Drop Badge Examples</h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600 mb-2">Single drop date:</p>
              <DropBadge dates={["2024-12-25"]} />
            </div>
            
            <div>
              <p className="text-sm text-gray-600 mb-2">Two drop dates:</p>
              <DropBadge dates={["2024-12-20", "2025-01-15"]} />
            </div>
            
            <div>
              <p className="text-sm text-gray-600 mb-2">Multiple drop dates (click "+3 more"):</p>
              <DropBadge dates={["2024-12-18", "2024-12-25", "2025-01-01", "2025-01-15", "2025-02-14"]} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}