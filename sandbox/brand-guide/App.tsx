import BlueLogo from "./imports/BlueLogo";
import { Card } from "./components/ui/card";
import { Badge } from "./components/ui/badge";
import { Separator } from "./components/ui/separator";

export default function App() {
  const brandColors = [
    {
      name: "Primary Blue",
      hex: "#2B3B58",
      rgb: "43, 59, 88",
      usage: "Main brand color for backgrounds and primary elements"
    },
    {
      name: "Light Gray",
      hex: "#F1F1F1",
      rgb: "241, 241, 241",
      usage: "Text and logo elements, light backgrounds"
    },
    {
      name: "Pure White",
      hex: "#FFFFFF",
      rgb: "255, 255, 255",
      usage: "Clean backgrounds and high contrast text"
    },
    {
      name: "Charcoal",
      hex: "#333333",
      rgb: "51, 51, 51",
      usage: "Body text and secondary elements"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-[#2B3B58] text-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center gap-8">
            <div className="w-32 h-32">
              <BlueLogo />
            </div>
            <div>
              <h1 className="text-4xl mb-4">CALM Outdoors</h1>
              <p className="text-xl opacity-90">Brand Guidelines</p>
              <p className="text-lg opacity-75 mt-2">Version 1.0 • June 2025</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Introduction */}
        <section className="mb-16">
          <h2 className="text-3xl mb-6">Brand Overview</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-lg mb-4">
                CALM Outdoors represents adventure, tranquility, and the great outdoors. Our brand embodies the spirit of exploration while maintaining a sense of peace and mindfulness in nature.
              </p>
              <p className="text-lg">
                These guidelines ensure consistent application of our brand across all touchpoints, maintaining the integrity and recognition of the CALM Outdoors identity.
              </p>
            </div>
            <Card className="p-6 bg-gray-50">
              <h3 className="mb-4">Brand Values</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#2B3B58] rounded-full"></div>
                  Adventure & Exploration
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#2B3B58] rounded-full"></div>
                  Mindfulness & Calm
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#2B3B58] rounded-full"></div>
                  Quality & Reliability
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#2B3B58] rounded-full"></div>
                  Environmental Respect
                </li>
              </ul>
            </Card>
          </div>
        </section>

        {/* Logo Section */}
        <section className="mb-16">
          <h2 className="text-3xl mb-8">Logo</h2>
          
          {/* Primary Logo */}
          <div className="mb-12">
            <h3 className="text-xl mb-6">Primary Logo</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="p-8 bg-[#2B3B58] flex items-center justify-center min-h-[300px]">
                <div className="w-48 h-48">
                  <BlueLogo />
                </div>
              </Card>
              <Card className="p-8 bg-white border-2 flex items-center justify-center min-h-[300px]">
                <div className="w-48 h-48" style={{ filter: 'invert(0.2) sepia(1) saturate(2) hue-rotate(200deg)' }}>
                  <BlueLogo />
                </div>
              </Card>
            </div>
            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <p className="text-center text-sm text-gray-600">On dark backgrounds</p>
              <p className="text-center text-sm text-gray-600">On light backgrounds</p>
            </div>
          </div>

          {/* Logo Variations */}
          <div className="mb-8">
            <h3 className="text-xl mb-6">Logo Sizes</h3>
            <Card className="p-8 bg-gray-50">
              <div className="flex items-center gap-12 flex-wrap">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-16 h-16">
                    <BlueLogo />
                  </div>
                  <span className="text-sm text-gray-600">Small (64px)</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-24 h-24">
                    <BlueLogo />
                  </div>
                  <span className="text-sm text-gray-600">Medium (96px)</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-32 h-32">
                    <BlueLogo />
                  </div>
                  <span className="text-sm text-gray-600">Large (128px)</span>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Color Palette */}
        <section className="mb-16">
          <h2 className="text-3xl mb-8">Color Palette</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {brandColors.map((color, index) => (
              <Card key={index} className="overflow-hidden">
                <div 
                  className="h-32 w-full"
                  style={{ backgroundColor: color.hex }}
                ></div>
                <div className="p-4">
                  <h4 className="mb-2">{color.name}</h4>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p>HEX: {color.hex}</p>
                    <p>RGB: {color.rgb}</p>
                  </div>
                  <p className="text-sm mt-3">{color.usage}</p>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Typography */}
        <section className="mb-16">
          <h2 className="text-3xl mb-8">Typography</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-6">
              <h3 className="mb-4">Headings</h3>
              <div className="space-y-4">
                <div>
                  <h1 className="text-4xl">Heading 1</h1>
                  <p className="text-sm text-gray-600 mt-1">36px • Medium Weight</p>
                </div>
                <div>
                  <h2 className="text-3xl">Heading 2</h2>
                  <p className="text-sm text-gray-600 mt-1">30px • Medium Weight</p>
                </div>
                <div>
                  <h3 className="text-2xl">Heading 3</h3>
                  <p className="text-sm text-gray-600 mt-1">24px • Medium Weight</p>
                </div>
                <div>
                  <h4 className="text-xl">Heading 4</h4>
                  <p className="text-sm text-gray-600 mt-1">20px • Medium Weight</p>
                </div>
              </div>
            </Card>
            <Card className="p-6">
              <h3 className="mb-4">Body Text</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-lg">Large Body Text</p>
                  <p className="text-sm text-gray-600 mt-1">18px • Regular Weight</p>
                </div>
                <div>
                  <p>Regular Body Text</p>
                  <p className="text-sm text-gray-600 mt-1">16px • Regular Weight</p>
                </div>
                <div>
                  <p className="text-sm">Small Text</p>
                  <p className="text-sm text-gray-600 mt-1">14px • Regular Weight</p>
                </div>
                <div>
                  <p className="text-xs">Extra Small Text</p>
                  <p className="text-sm text-gray-600 mt-1">12px • Regular Weight</p>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Spacing & Layout */}
        <section className="mb-16">
          <h2 className="text-3xl mb-8">Spacing &amp; Layout</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-6">
              <h3 className="mb-4">Logo Clear Space</h3>
              <div className="bg-gray-100 p-8 rounded">
                <div className="relative">
                  <div className="w-24 h-24 mx-auto">
                    <BlueLogo />
                  </div>
                  {/* Clear space indicators */}
                  <div className="absolute inset-0 border-2 border-dashed border-red-400 opacity-50"></div>
                  <div className="absolute -top-4 -left-4 -right-4 -bottom-4 border-2 border-dashed border-blue-400 opacity-50"></div>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-4">
                Maintain clear space equal to the height of the logo on all sides
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="mb-4">Minimum Size</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8">
                    <BlueLogo />
                  </div>
                  <div>
                    <p>Digital: 32px minimum</p>
                    <p className="text-sm text-gray-600">For web and digital applications</p>
                  </div>
                </div>
                <Separator />
                <div className="flex items-center gap-4">
                  <div className="w-6 h-6">
                    <BlueLogo />
                  </div>
                  <div>
                    <p>Print: 0.5 inches minimum</p>
                    <p className="text-sm text-gray-600">For printed materials</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Usage Guidelines */}
        <section className="mb-16">
          <h2 className="text-3xl mb-8">Usage Guidelines</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-6 border-green-200 bg-green-50">
              <h3 className="mb-4 text-green-800">Do's</h3>
              <ul className="space-y-3 text-green-700">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  Use the logo at appropriate sizes with clear space
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  Maintain the original proportions and colors
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  Use on appropriate backgrounds for contrast
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  Keep the logo legible and unobstructed
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  Use approved color variations only
                </li>
              </ul>
            </Card>
            <Card className="p-6 border-red-200 bg-red-50">
              <h3 className="mb-4 text-red-800">Don'ts</h3>
              <ul className="space-y-3 text-red-700">
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-1">✗</span>
                  Don't stretch, skew, or alter the logo proportions
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-1">✗</span>
                  Don't change colors or add effects
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-1">✗</span>
                  Don't place on busy or low-contrast backgrounds
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-1">✗</span>
                  Don't use below minimum size requirements
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-1">✗</span>
                  Don't recreate or modify the logo elements
                </li>
              </ul>
            </Card>
          </div>
        </section>

        {/* Applications */}
        <section className="mb-16">
          <h2 className="text-3xl mb-8">Brand Applications</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 text-center">
              <div className="w-16 h-16 bg-[#2B3B58] rounded-lg mx-auto mb-4 flex items-center justify-center">
                <div className="w-10 h-10">
                  <BlueLogo />
                </div>
              </div>
              <h4 className="mb-2">Digital Media</h4>
              <p className="text-sm text-gray-600">Websites, social media, digital advertising</p>
            </Card>
            <Card className="p-6 text-center">
              <div className="w-16 h-16 bg-gray-100 border-2 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <div className="w-10 h-10">
                  <BlueLogo />
                </div>
              </div>
              <h4 className="mb-2">Print Materials</h4>
              <p className="text-sm text-gray-600">Brochures, business cards, merchandise</p>
            </Card>
            <Card className="p-6 text-center">
              <div className="w-16 h-16 bg-[#2B3B58] rounded-lg mx-auto mb-4 flex items-center justify-center">
                <div className="w-10 h-10">
                  <BlueLogo />
                </div>
              </div>
              <h4 className="mb-2">Signage</h4>
              <p className="text-sm text-gray-600">Storefront signs, vehicle wraps, banners</p>
            </Card>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t pt-8 mt-16">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-600">
                CALM Outdoors Brand Guidelines • Version 1.0
              </p>
              <p className="text-sm text-gray-600">
                For questions about brand usage, contact: brand@calmoutdoors.com
              </p>
            </div>
            <Badge variant="outline" className="bg-[#2B3B58] text-white">
              June 2025
            </Badge>
          </div>
        </footer>
      </div>
    </div>
  );
}