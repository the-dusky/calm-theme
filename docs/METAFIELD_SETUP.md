# Metafield Setup Guide for Preorder System

## Required Metafields

### Collection Metafields (for Drop Management)

**Namespace**: `custom`

1. **ship_by_date**
   - **Type**: Date
   - **Description**: Date when the drop will ship out
   - **Key**: `ship_by_date`

2. **order_by_date**
   - **Type**: Date  
   - **Description**: Date when order must be placed with supplier
   - **Key**: `order_by_date`

3. **order_cutoff_date**
   - **Type**: Date
   - **Description**: Last date customers can place orders for this drop
   - **Key**: `order_cutoff_date`

4. **drop_type**
   - **Type**: Single line text
   - **Description**: Drop fulfillment location (US or JP)
   - **Key**: `drop_type`
   - **Validation**: Should be "US" or "JP"

### Variant Metafields (for Inventory Control)

**Namespace**: `custom`

1. **sold_out**
   - **Type**: True or False
   - **Description**: Whether this variant is sold out for all drops
   - **Key**: `sold_out`
   - **Default**: false

## Setup Instructions

### Option 1: Shopify Admin
1. Go to Settings > Metafields
2. Select "Collections" 
3. Add each collection metafield listed above
4. Select "Products" > "Variants"
5. Add the variant metafield listed above

### Option 2: GraphQL Admin API
```graphql
mutation CreateCollectionMetafieldDefinition($definition: MetafieldDefinitionInput!) {
  metafieldDefinitionCreate(definition: $definition) {
    createdDefinition {
      id
      name
      namespace
      key
    }
    userErrors {
      field
      message
    }
  }
}
```

### Option 3: Shopify CLI (if available)
```bash
shopify app generate schema
```

## Testing Setup

Once metafields are created, test with a sample collection:

1. Create a test collection called "Test US Drop"
2. Set metafields:
   - `ship_by_date`: 2024-03-15
   - `order_by_date`: 2024-02-15  
   - `order_cutoff_date`: 2024-03-01
   - `drop_type`: US
3. Add a product to this collection
4. Test the drop helper functions

## Verification

Use liquid to verify metafields are working:

```liquid
{% for collection in collections %}
  {% if collection.metafields.custom.ship_by_date %}
    <p>{{ collection.title }}: Ships {{ collection.metafields.custom.ship_by_date | date: '%B %d, %Y' }}</p>
  {% endif %}
{% endfor %}
```