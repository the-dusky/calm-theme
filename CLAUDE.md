# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the **Horizon theme** - a modern Shopify theme built with native ES6 modules and a component-based architecture. No traditional build tools (webpack, gulp, etc.) are used.

## Development Commands

This theme uses **Shopify CLI** for development. Common commands:

```bash
# Start development server
shopify theme dev

# Deploy to theme
shopify theme push

# Pull latest from store
shopify theme pull
```

## Architecture

### Component System
All interactive JavaScript follows a component pattern based on `assets/component.js`:
- Extends `DeclarativeShadowElement` for custom elements
- Uses centralized event system (`assets/events.js`) with events like `variant:update`, `cart:update`
- Import paths use `@theme/` namespace defined in import maps

### File Organization
- **blocks/**: Reusable block components (prefixed with `_`)
- **sections/**: Main sections with `_blocks.liquid` providing universal block support
- **snippets/**: Smaller reusable components
- **assets/**: JavaScript modules, CSS, and SVG icons
- **templates/**: Page templates (mostly JSON for section groups)

### Key Files
- `assets/component.js`: Base class for all custom elements
- `snippets/scripts.liquid`: Module loading and import map configuration
- `sections/_blocks.liquid`: Universal section wrapper enabling blocks on any section
- `assets/utilities.js`: Core utility functions and view transitions
- `config/settings_schema.json`: Theme configuration schema

### JavaScript Patterns
- ES6 modules with no bundling
- Event-driven architecture using `ThemeEvents`
- Performance optimizations with modulepreload and morphing updates
- TypeScript support via `jsconfig.json` and `global.d.ts`

### Styling
- Single `assets/base.css` file with CSS custom properties
- No preprocessors - uses modern CSS features
- Extensive use of CSS custom properties for theming

## Working with This Theme

### Adding New Features
1. Extend the base `Component` class for interactive elements
2. Use `ThemeEvents` for cross-component communication
3. Follow import map patterns with `@theme/` namespace
4. Add configuration to section schemas for customization

### File Naming Conventions
- Block files: prefix with `_` (e.g., `_product-card.liquid`)
- JavaScript modules: kebab-case (e.g., `variant-picker.js`)
- Sections: use descriptive names matching their purpose

### Localization
Theme supports 25+ languages with separate schema translation files. Use `{{ 'key' | t }}` for translations in Liquid templates.