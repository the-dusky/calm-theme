# Shopify Theme Development Guidelines

## Theme Development Rules

1. **Build to Latest Shopify Theme Specs (Tinker Theme)**
   - Follow Shopify's Online Store 2.0 architecture
   - Implement proper section and block structure
   - Use JSON templates for customization
   - Ensure all blocks have proper IDs, settings, and presets
   - Maintain compatibility with the Shopify Theme Editor

2. **Block Implementation Best Practices**
   - Each block must have a unique ID
   - Use appropriate block types (section, block, setting)
   - Include proper schema definitions with descriptive labels
   - Implement blocks with appropriate nesting
   - Use block.settings for customization options
   - Ensure blocks are properly scoped with unique CSS classes
   - Follow Shopify's naming conventions for blocks

3. **Calendar Component Requirements**
   - Support multiple collections on different dates
   - Use metafields for shipping dates
   - Ensure responsive design across all devices
   - Optimize for performance and accessibility
   - Follow Shopify's liquid best practices

## Current Tasks

### Preorder System Implementation (Priority)

#### Phase 1: Core Infrastructure (Current)
- [x] Create collection metafields for drop management
  - [x] `ship_by_date` (date)
  - [x] `order_by_date` (date) 
  - [x] `drop_location` (text: US/JP/EU)
- [x] Create variant `is_sold_out` boolean metafield
- [x] Create liquid helper functions for drop detection
- [x] Test metafield functionality

#### Phase 2: Add to Cart Prompt System
- [x] Identify and modify add to cart implementation
- [x] Create preorder prompt modal component
- [x] Implement prompt trigger logic
- [x] Add "How It Works" content and modal
- [x] Test prompt flow

#### Phase 3: Drop Shopping Mode
- [ ] Create drop selector UI component
- [ ] Implement session storage for drop selection
- [ ] Add drop context to product pages
- [ ] Test drop browsing experience

#### Phase 4: Order Management
- [ ] Implement automatic order tagging with collection handles
- [ ] Update cart to show preorder information
- [ ] Test order processing flow

### Calendar Component (Existing)
- [ ] Review calendar component implementation
- [ ] Update calendar component to handle multiple collections per date
- [ ] Ensure proper block structure in all theme components
- [ ] Test calendar component in Theme Editor
- [ ] Document calendar component usage for merchants

## Completed Tasks

- [x] Initial calendar component implementation

## Resources

- [Shopify Theme Development Documentation](https://shopify.dev/themes)
- [Online Store 2.0 Documentation](https://shopify.dev/themes/architecture)
- [Tinker Theme Reference](https://shopify.dev/themes/tools/dawn)
