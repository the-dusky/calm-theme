# Enhanced Product Cards - Responsive Grid Usage

## Overview
Enhanced product cards now have a minimum width of 280px to ensure proper swatch display. The grid system automatically adjusts to show 2 columns when space is limited rather than cramming cards into narrow spaces.

## Grid Utility Classes

### Basic Grid (Auto-fit)
```liquid
<div class="enhanced-cards-grid">
  {% for product in collection.products %}
    {% render 'enhanced-product-card', product: product %}
  {% endfor %}
</div>
```

### Specific Column Layouts

#### 2-Column Maximum
```liquid
<div class="enhanced-cards-grid enhanced-cards-grid--2-col">
  <!-- Cards will be max 2 columns -->
</div>
```

#### 3-Column Maximum
```liquid
<div class="enhanced-cards-grid enhanced-cards-grid--3-col">
  <!-- Cards will be max 3 columns -->
</div>
```

#### 4-Column Layout
```liquid
<div class="enhanced-cards-grid enhanced-cards-grid--4-col">
  <!-- Cards will be up to 4 columns on wide screens -->
</div>
```

## Responsive Behavior

- **Desktop (1200px+)**: Up to 4 columns based on grid class
- **Tablet (768px-1199px)**: 2-3 columns, cards maintain 260px min-width
- **Mobile (580px and below)**: Single column, cards expand to container width (max 400px)

## Card Width Specifications

- **Desktop minimum**: 280px
- **Tablet minimum**: 260px  
- **Mobile**: 100% width (max 400px, centered)

## Color Swatches

With the wider minimum width:
- Shows up to 8 color swatches comfortably
- Displays "+X more" indicator when more than 8 colors
- No cramped layouts or hidden swatches due to narrow cards

## Migration from Default Cards

Replace default product card grids:
```liquid
<!-- Old -->
<div class="product-grid">
  {% render 'product-card', product: product %}
</div>

<!-- New -->
<div class="enhanced-cards-grid">
  {% render 'enhanced-product-card', product: product %}
</div>
```