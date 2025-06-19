# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Theme Development
- `shopify theme check` - Run theme linting and validation
- Git-based deployment - Theme auto-pulls from GitHub, no need for `shopify theme push`

### Package Management
- Use **pnpm** for all package management (not npm or yarn)

## Project Architecture

### Shopify Theme Structure (Tinker Theme Base)
This is a Shopify Online Store 2.0 theme built on the Tinker theme foundation with custom preorder functionality.

**Key Directories:**
- `/sections/` - Theme sections with proper schema and presets
- `/snippets/` - Reusable Liquid components  
- `/blocks/` - Theme blocks for sections
- `/templates/` - JSON page templates
- `/assets/` - CSS, JS, and media files
- `/config/` - Theme settings and configuration
- `/locales/` - Translation files
- `/sandbox/` - React prototypes and development components

### Core Systems

#### Preorder System
Multi-phase preorder implementation using metafields:

**Collection Metafields (namespace: `custom`):**
- `ship_by_date` (date) - When drop ships
- `order_by_date` (date) - Supplier order deadline  
- `order_cutoff_date` (date) - Customer order cutoff
- `drop_type` (text) - "US" or "JP" fulfillment location

**Variant Metafields:**
- `sold_out` (boolean) - Override inventory status

**Key Files:**
- `/snippets/preorder-prompt-modal.liquid` - Add to cart interception
- `/snippets/how-it-works-modal.liquid` - Preorder explanation
- `/snippets/drop-helpers.liquid` - Liquid helper functions
- `/docs/METAFIELD_SETUP.md` - Metafield configuration guide

#### Component Architecture
- Modular section/snippet system with proper block structure
- All sections require `presets` array to appear in theme editor
- Custom color variant display via `color_displayname_override` metafield
- Responsive design with mobile-first approach

## Development Rules

### Liquid Template Rules
- **Never escape with backslashes** in Liquid strings
- Use double quotes (") when string contains apostrophes (')
- Use single quotes (') when string contains double quotes (")

### Shopify Section Requirements
- All sections must have `presets` array in schema to appear in "Add Section" modal
- Each preset requires `name` attribute minimum
- Use category references like `"t:categories.storytelling"` for grouping
- Categories must exist in `/locales/en.default.schema.json`

### Task Management Workflow
When given a task, analyze and respond with:
1. "Here's the prompt I would execute:"
2. [Complete optimized prompt]
3. "This will use: [MCP servers/tools needed]"
4. "Should I proceed? (y/n)"

**MCP Server Usage:**
- Playwright MCP for UI changes and testing
- Shopify MCP for Shopify-specific development
- Always specify which servers will be used

**Auto-execution:** Add `-y` to prompt for immediate execution after confirmation

## Context Files
- Always read `CHANGELOG.md` for project context
- Check `tasks/todo.md` for current priorities and next steps
- Reference `.theme-check.yml` for linting configuration

## Deployment Process
1. Complete development work
2. Run `shopify theme check` for validation
3. Update CHANGELOG.md and mark todos complete
4. Commit with `git add . && git commit` and push
5. Theme auto-deploys from GitHub (no manual push needed)


## Shopify Theme Section Debugging (Based on Official Shopify Documentation)

### Issue: Section not appearing in "Add Section" modal

**Problem**: Created a section file but it doesn't appear in the theme editor's "Add Section" modal.

**Root Cause (Official Shopify Documentation)**:
> "Section files must define presets in their schema to support being added to JSON templates using the theme editor. Files without presets should be included in the JSON file manually, and can't be removed using the theme editor."

**Required for sections to appear in Add Section modal**:

1. **`presets` array is MANDATORY** - Without presets, sections won't appear in modal
   - ✅ Must have: `"presets": [...]` in schema
   - ✅ Each preset must have: `"name"` attribute
   - ✅ Optional but recommended: `"category"` for grouping

2. **Valid schema structure**
   - ✅ Section has `{% schema %}...{% endschema %}` block
   - ✅ Valid JSON in schema
   - ✅ File in `/sections/` directory with `.liquid` extension

3. **Category validation** (if used)
   - ✅ Category like `"t:categories.storytelling"` must exist in `locales/en.default.schema.json`
   - ✅ Available categories: banners, storytelling, products, collections, forms, layout

**Common troubleshooting steps**:
- [ ] Section has `presets` array with at least one preset
- [ ] Preset has required `"name"` attribute
- [ ] Category exists in locale files (if specified)
- [ ] Section name is unique across theme
- [ ] Try refreshing/hard refresh theme editor
- [ ] Check browser console for JavaScript errors

**Solution for `how-it-works.liquid`**: Section structure was correct with proper presets. Issue was likely theme editor cache - changing section name forced refresh.

### Minimum working section schema:
```liquid
{% schema %}
{
  "name": "My Section",
  "settings": [],
  "presets": [
    {
      "name": "My Section"
    }
  ]
}
{% endschema %}
```

### Advanced section with category:
```liquid
{% schema %}
{
  "name": "Section Name",
  "settings": [...],
  "blocks": [...],
  "presets": [
    {
      "name": "Section Name", 
      "category": "t:categories.storytelling",
      "settings": {...},
      "blocks": [...]
    }
  ]
}
{% endschema %}
```

**Reference**: [Shopify Sections Documentation](https://shopify.dev/storefronts/themes/architecture/sections)