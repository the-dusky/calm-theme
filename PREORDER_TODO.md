# Preorder System Implementation TODO

## Phase 1: Core Infrastructure (2-3 days)

### 1.1 Collection Metafields Setup
- [ ] Define collection metafield schema
  - [ ] `ship_by_date` (date)
  - [ ] `order_by_date` (date) 
  - [ ] `order_cutoff_date` (date)
  - [ ] `drop_type` (text: US/JP)
- [ ] Create metafield definitions in Shopify admin
- [ ] Test with sample collection

### 1.2 Variant Sold Out Field
- [ ] Create `sold_out` boolean metafield for variants
- [ ] Add to variant metafield definitions
- [ ] Test manual toggle functionality

### 1.3 Drop Detection Logic
- [ ] Create liquid helper to detect if product is in drop collection
- [ ] Function to get collection metafield data
- [ ] Logic to determine current drop context

**Estimated Time**: 1 day

---

## Phase 2: Preorder Prompt System (3-4 days)

### 2.1 Add to Cart Interception
- [ ] Identify current add to cart implementation
- [ ] Modify add to cart JavaScript to check for drops
- [ ] Create prompt trigger logic
- [ ] Ensure non-drop products work normally

### 2.2 Prompt UI Component
- [ ] Design prompt modal/inline component
- [ ] Create liquid template for prompt content
- [ ] Style to match theme design
- [ ] Add accessibility features (ARIA, focus management)

### 2.3 Prompt Content Logic
- [ ] Display ship date from collection metafields
- [ ] Calculate expected delivery timeframe
- [ ] Show drop type (US/JP)
- [ ] Add "How It Works" link

### 2.4 Confirmation Flow
- [ ] Handle user confirmation
- [ ] Add item to cart with proper tags
- [ ] Show success feedback
- [ ] Handle cancellation/dismiss

**Estimated Time**: 2-3 days

---

## Phase 3: Drop Shopping Mode (2-3 days)

### 3.1 Drop Selector UI
- [ ] Decide on selector location (header/product page)
- [ ] Create drop selector component
- [ ] List available drop collections
- [ ] Format display names ("US Drop - Ships March 15")

### 3.2 Session Management
- [ ] Store selected drop in sessionStorage/localStorage
- [ ] Persist across page navigation
- [ ] Clear on browser close/new session

### 3.3 Drop Context Integration
- [ ] Modify product pages to show drop context
- [ ] Filter/highlight products available in selected drop
- [ ] Suppress prompts when in drop mode
- [ ] Easy drop switching mechanism

**Estimated Time**: 2 days

---

## Phase 4: How It Works Content (1 day)

### 4.1 Content Creation
- [ ] Write "How It Works" content
- [ ] Design modal/page layout
- [ ] Add illustrations or diagrams if needed

### 4.2 Modal Implementation
- [ ] Create modal component
- [ ] Link from preorder prompt
- [ ] Standalone page option
- [ ] Mobile-responsive design

**Estimated Time**: 1 day

---

## Phase 5: Order Management Integration (1-2 days)

### 5.1 Order Tagging
- [ ] Auto-tag orders with collection handle
- [ ] Include drop type in tags
- [ ] Test tag application on checkout

### 5.2 Cart Enhancements
- [ ] Show preorder items clearly in cart
- [ ] Display expected ship dates
- [ ] Indicate drop type if relevant

**Estimated Time**: 1 day

---

## Phase 6: Admin & Testing (2-3 days)

### 6.1 Admin Interface (Optional)
- [ ] Simple form to set collection metafields
- [ ] Bulk variant sold_out toggle
- [ ] Drop overview dashboard

### 6.2 Testing & QA
- [ ] Test all user flows
- [ ] Cross-browser compatibility
- [ ] Mobile responsiveness
- [ ] Performance testing
- [ ] Edge case handling

### 6.3 Documentation
- [ ] Usage instructions for admins
- [ ] Update theme documentation
- [ ] Customer-facing help content

**Estimated Time**: 2 days

---

## Future Phases (Post-MVP)

### Phase 7: Advanced Inventory (Future)
- [ ] Time-based inventory batch system
- [ ] LIFO allocation logic
- [ ] Reporting dashboard
- [ ] Automated sold_out updates

### Phase 8: Enhanced UX (Future)
- [ ] Cart validation for mixed drops
- [ ] Waitlist functionality
- [ ] Advanced drop filtering
- [ ] Customer notification system

### Phase 9: Backend API (Future)
- [ ] Custom app for inventory management
- [ ] Automated PO generation
- [ ] External API integrations
- [ ] Advanced analytics

---

## Total Estimated Timeline

**MVP (Phases 1-6)**: 10-15 development days
**With Future Phases**: 20-30 development days

## Dependencies & Risks

### Technical Dependencies
- [ ] Understanding current cart implementation
- [ ] Theme customization capabilities
- [ ] Shopify metafield limitations
- [ ] JavaScript framework compatibility

### Business Dependencies  
- [ ] Final "How It Works" content
- [ ] Drop naming conventions
- [ ] Preorder terms and policies
- [ ] Currency handling decisions

### Risk Mitigation
- [ ] Start with simple modal approach
- [ ] Phase rollout to test with customers
- [ ] Keep STOQ as backup initially
- [ ] Build with extensibility in mind

---

## Decision Points Needed

### Technical Decisions
- [ ] Modal vs inline prompt design?
- [ ] Header vs product page drop selector?
- [ ] Session vs localStorage for drop selection?
- [ ] Custom app vs pure theme implementation?

### Business Decisions
- [ ] Mixed drop cart handling?
- [ ] Default drop selection behavior?
- [ ] Customer communication templates?
- [ ] Return/cancellation policies?

### Go/No-Go Criteria
- [ ] Development effort vs STOQ cost savings
- [ ] Maintenance overhead assessment
- [ ] Feature completeness comparison
- [ ] Customer experience improvement validation