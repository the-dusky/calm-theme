# Claude Notes

## Task Analysis Workflow

  When I describe a task, first analyze what I'm
   asking for and respond with:

  1. "Here's the prompt I would execute:"
  2. [Show the complete, optimized prompt]
  3. "This will use: [list of MCP servers/tools
  needed]"
  4. "Should I proceed with this approach?
  (y/n)"

  Always include MCP server usage when
  appropriate:
  - Use Playwright MCP for any UI changes,
  visual verification, or frontend testing
  - Use Shopify MCP for any Shopify-related
  development
  - Always tell me what servers you are using so
   I know if you are not using any too

  For UI tasks, always include:
  - Before/after screenshots
  - Functional testing of interactions
  - Specific page URLs to test

  Wait for my confirmation before executing unless I add a -y to the end of my prompt, if I do that show me the updated prompt and auto execute

## Context

Always read the CHANGELOG.md for context
Always look at tasks/todo.md for next steps

use PNPM - always

## Tasks

Use the tasks/todo.md file as the source of truth. Work on it in order, asking if we are ready to move on.

## Sync / Deploy

Commit after finishing task sections
- shopify theme check

Theme's are set to auto pull from github, we don't want to use "shopify theme push", we just want to commit and push to git

Once we build is succesful
- update the changelog and cross of todos
- Then `git add` . and `git commit` and push


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