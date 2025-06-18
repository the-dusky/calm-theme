# Changelog

All notable changes to this Shopify theme will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Preorder system Phase 1 complete
- Collection metafields schema for drop management (ship_by_date, order_by_date, order_cutoff_date, drop_type)
- Variant metafields schema for inventory control (sold_out)
- Drop helper functions for liquid templates
- Metafield setup documentation
- Drop functionality test snippet

### Changed
- Variant picker now supports custom color display names via `color_displayname_override` metafield

### Fixed
- Color display names now show consistently across all variant pickers
- Cart items display custom color names when available
- Swatch accessibility labels updated with custom names

## Previous Work

### Calendar Component
- Initial calendar component implementation
- Multiple collections per date support
- Responsive design implementation