# Thai Translation System Usage Guide

## Overview

The Thai Translation system allows you to add clickable Thai word indicators throughout your Shopify theme. When customers click these indicators, they see a modal with pronunciation guides, syllable breakdowns, and example sentences.

## Quick Start

### 1. Basic Usage
Add Thai translations anywhere in your theme:

```liquid
{% render 'thai-word', word: 'hello' %}
{% render 'thai-word', word: 'thankyou' %}
{% render 'thai-word', word: 'water' %}
```

### 2. Custom Translations
For words not in the predefined list:

```liquid
{% render 'thai-word', 
  english: 'Mountain',
  thai: 'ภูเขา',
  phonetic: 'puu-kǎo',
  meaning: 'Mountain'
%}
```

### 3. Full Custom Translation
With complete pronunciation guide:

```liquid
{% render 'thai-translation',
  english_text: 'Adventure',
  thai_text: 'การผจญภัย',
  phonetic: 'gaan-pà-jɔn-pai',
  syllables: 'การ,ผจญ,ภัย',
  meaning: 'Adventure/Quest',
  example_thai: 'เราชอบการผจญภัยในป่า',
  example_english: 'We love adventures in the forest',
  example_phonetic: 'rao chɔ̂ɔp gaan-pà-jɔn-pai nai bpàa'
%}
```

## Integration Examples

### In Product Descriptions
```liquid
<p>
  Our premium {% render 'thai-word', word: 'water' %} bottles 
  are perfect for all your {% render 'thai-word', word: 'outdoor' %} adventures.
</p>
```

### In Collection Descriptions
```liquid
<h2>
  {% render 'thai-word', word: 'beautiful' %} Hiking Gear
</h2>
<p>
  Discover {% render 'thai-word', word: 'beautiful' %} trails with our equipment.
</p>
```

### In Theme Sections
Add the translation sections to your theme:

1. **Thai Translations Manager** - For admin configuration
2. **Thai Content Demo** - For content display with translations

## Available Predefined Words

- `hello` - สวัสดี (Hello/Goodbye)
- `thankyou` - ขอบคุณ (Thank you)
- `water` - น้ำ (Water)
- `food` - อาหาร (Food)
- `beautiful` - สวย (Beautiful)
- `outdoor` - กิจกรรมกลางแจ้ง (Outdoor activities)

## Advanced Features

### Using Metafields
Set up metafields to manage translations dynamically (see THAI_METAFIELD_SETUP.md):

```liquid
<!-- Automatically uses shop metafields -->
{% render 'thai-word', word: 'hello' %}

<!-- Use product-specific translations -->
{% render 'thai-word', word: 'hello', context: product %}

<!-- Use collection-specific translations -->
{% render 'thai-word', word: 'hello', context: collection %}
```

### Section Blocks
Use the Thai Translations Manager section to create translation content through the theme customizer.

## Styling

The translation indicators use these CSS classes:
- `.thai-translation-wrapper` - Container for the English text + indicator
- `.thai-indicator` - The clickable Thai indicator button
- `.thai-modal` - The modal overlay and content

Customize the appearance by adding CSS to your theme:

```css
.thai-indicator {
  background: your-brand-color;
  border: 1px solid your-border-color;
}

.thai-indicator:hover {
  background: your-hover-color;
}
```

## Modal Features

Each translation modal includes:
- Large Thai text display
- Phonetic pronunciation guide
- Syllable breakdown
- Audio playback button (ready for future implementation)
- Example sentences in both languages
- Pronunciation tips

## Performance Notes

- Modals are rendered inline but hidden by default
- JavaScript handles modal open/close functionality
- No external dependencies required
- Works with existing theme JavaScript

## Troubleshooting

### Translation Not Showing
1. Check if the word is in the predefined list
2. Verify metafield setup if using custom translations
3. Ensure the snippet is properly included

### Modal Not Opening
1. Check browser console for JavaScript errors
2. Verify unique IDs for multiple translations on same page
3. Ensure modal JavaScript is loaded

### Styling Issues
1. Check for CSS conflicts with existing theme styles
2. Verify z-index values for modal overlay
3. Test responsive behavior on different screen sizes

## Future Enhancements

- Audio pronunciation files
- Bulk translation management
- Translation analytics
- Multi-language support
- Keyboard navigation
- Screen reader accessibility improvements