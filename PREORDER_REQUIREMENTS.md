# Preorder System Requirements

## Project Overview
Replace STOQ app with custom preorder system for "drop" based inventory model. The brand operates from Thailand with fulfillment in US and Japan, taking orders in advance of production/shipment.

## Core Concept: "Drops"
- **Drops** = Collections with specific fulfillment dates
- **Drop Types**: US and JP (different fulfillment locations)
- **Timeline**: order_cutoff_date → order_by_date → ship_by_date
- **Business Model**: No inventory risk - orders placed before production

---

## 1. Customer-Facing Features

### 1.1 Preorder Prompt System
**When**: Customer clicks "Add to Cart" on any product in a drop collection
**What Displays**:
- "This is a preorder item"
- Ship date from collection's `ship_by_date` metafield
- Expected delivery timeframe (5-7 days after ship date)
- Drop type (US/JP) if relevant
- "How It Works" link/modal

**User Flow**:
1. Customer clicks "Add to Cart"
2. Prompt appears (modal/inline)
3. Customer reviews info and confirms
4. Item added to cart with appropriate tags

### 1.2 Drop Shopping Mode
**Purpose**: Let customers choose a drop and shop without repeated prompts

**Features**:
- Drop selector (location TBD - header/product page)
- Session persistence of selected drop
- Visual indicators for drop-specific products
- Easy switching between drops

**Options Format**: "US Drop - Ships March 15" style

### 1.3 "How It Works" Page/Modal
**Content Needed**:
- Drop concept explanation
- Timeline from order to delivery
- Preorder terms and conditions
- Shipping information
- No cancellation policy (if applicable)

---

## 2. Technical Implementation

### 2.1 Collection-Based Drops
**Structure**: Each drop = one Shopify collection
**Collection Metafields**:
- `ship_by_date` (date)
- `order_by_date` (date) 
- `order_cutoff_date` (date)
- `drop_type` (US/JP)

### 2.2 Variant Inventory Control
**Simple Approach**: 
- `sold_out` (boolean) metafield on variants
- Manual management initially
- No real-time inventory limits

### 2.3 Order Management
**Order Tags**: Auto-tag orders with collection handle
**Currency**: Accept both USD and JPY
**Routing**: Use tags to generate Purchase Orders

---

## 3. Backend/Reporting Features

### 3.1 Inventory Tracking (Future)
**Time-Based Batches**:
- Track inventory availability by date
- LIFO allocation for reporting
- Variant metafield: `inventory_batches` (JSON)

**Not Customer-Facing**: Pure reporting/planning tool

### 3.2 Purchase Order Generation
- Group orders by collection/drop
- Generate POs to Thai supplier
- Managed within Shopify

---

## 4. User Experience Requirements

### 4.1 Non-Obtrusive Design
- Prompt should feel informative, not blocking
- Quick confirmation flow
- Clear preorder messaging throughout

### 4.2 Drop Browsing
- Collections as browseable drops
- Clear indication of drop dates
- Seamless shopping experience

### 4.3 Cart/Checkout
- Clear preorder labeling in cart
- No complex validation needed
- Support mixed currency if needed

---

## 5. Open Questions / Future Considerations

### 5.1 Technical Unknowns
- Best location for drop selector UI
- Session storage approach
- Modal vs inline prompt design
- Cart validation for mixed drops

### 5.2 Business Rules TBD
- Handling of mixed US/JP orders
- Customer communication timing
- Return/cancellation policies
- Shipping cost calculations

### 5.3 Scalability
- Admin interface for batch management
- Automated inventory tracking
- Integration with external fulfillment
- Advanced reporting needs

---

## 6. Success Criteria

### 6.1 MVP Goals
- [ ] Replace STOQ app functionality
- [ ] Clear preorder messaging
- [ ] Seamless drop-based shopping
- [ ] Proper order tagging for fulfillment

### 6.2 Business Impact
- [ ] Reduce app costs
- [ ] Increase operational flexibility  
- [ ] Improve customer understanding
- [ ] Enable complex drop planning

---

## 7. Out of Scope (Initially)
- Real-time inventory limits
- Complex cart validation
- Automated PO generation
- Advanced analytics
- Customer account integration
- Waitlist functionality