# Thai Translation Metafields Setup

This document explains how to set up metafields for storing Thai translation data in Shopify.

## Required Metafields

### 1. Shop-level Metafields (Global Translations)

**Namespace:** `thai_translations`

Create these metafields in your Shopify admin under Settings > Metafields > Shop:

#### `thai_words` (JSON)
- **Type:** JSON
- **Description:** Store global Thai word translations
- **Structure:**
```json
{
  "hello": {
    "thai": "สวัสดี",
    "phonetic": "sà-wàt-dii",
    "syllables": ["สวัส", "ดี"],
    "meaning": "Hello/Goodbye",
    "exampleSentence": {
      "thai": "สวัสดีครับ ผมชื่อจอห์น",
      "english": "Hello, my name is John",
      "phonetic": "sà-wàt-dii kráp, pǒm chɯ̂ɯ jɔɔn"
    }
  }
}
```

### 2. Product-level Metafields (Product-specific Translations)

**Namespace:** `thai_translations`

#### `product_translations` (JSON)
- **Type:** JSON
- **Description:** Product-specific Thai translations
- **Usage:** Store translations specific to individual products

### 3. Collection-level Metafields (Collection-specific Translations)

**Namespace:** `thai_translations`

#### `collection_translations` (JSON)
- **Type:** JSON
- **Description:** Collection-specific Thai translations

## Setup Instructions

### Step 1: Create Shop Metafields
1. Go to Shopify Admin > Settings > Metafields
2. Select "Shop" as the resource
3. Click "Add definition"
4. Fill in:
   - Namespace: `thai_translations`
   - Key: `thai_words`
   - Name: `Thai Word Translations`
   - Type: JSON
   - Description: `Global Thai word translations for the translation system`

### Step 2: Add Initial Data
Add this JSON structure to your shop metafield:

```json
{
  "hello": {
    "thai": "สวัสดี",
    "phonetic": "sà-wàt-dii",
    "syllables": ["สวัส", "ดี"],
    "meaning": "Hello/Goodbye",
    "exampleSentence": {
      "thai": "สวัสดีครับ ผมชื่อจอห์น",
      "english": "Hello, my name is John",
      "phonetic": "sà-wàt-dii kráp, pǒm chɯ̂ɯ jɔɔn"
    }
  },
  "thankyou": {
    "thai": "ขอบคุณ",
    "phonetic": "kɔ̀ɔp-kun",
    "syllables": ["ขอบ", "คุณ"],
    "meaning": "Thank you",
    "exampleSentence": {
      "thai": "ขอบคุณมากครับ",
      "english": "Thank you very much",
      "phonetic": "kɔ̀ɔp-kun mâak kráp"
    }
  },
  "water": {
    "thai": "น้ำ",
    "phonetic": "náam",
    "syllables": ["น้ำ"],
    "meaning": "Water",
    "exampleSentence": {
      "thai": "ขอน้ำหนึ่งแก้วครับ",
      "english": "I would like one glass of water, please",
      "phonetic": "kɔ̌ɔ náam nɯ̀ŋ gɛ̂ɛw kráp"
    }
  },
  "food": {
    "thai": "อาหาร",
    "phonetic": "aa-hǎan",
    "syllables": ["อา", "หาร"],
    "meaning": "Food",
    "exampleSentence": {
      "thai": "อาหารไทยอร่อยมาก",
      "english": "Thai food is very delicious",
      "phonetic": "aa-hǎan tai à-rɔ̀i mâak"
    }
  },
  "beautiful": {
    "thai": "สวย",
    "phonetic": "sǔai",
    "syllables": ["สวย"],
    "meaning": "Beautiful",
    "exampleSentence": {
      "thai": "ดอกไม้สวยมาก",
      "english": "The flowers are very beautiful",
      "phonetic": "dɔ̀ɔk-mái sǔai mâak"
    }
  },
  "outdoor": {
    "thai": "กิจกรรมกลางแจ้ง",
    "phonetic": "gìt-jà-gam-glaang-jɛ́ɛŋ",
    "syllables": ["กิจ", "กรรม", "กลาง", "แจ้ง"],
    "meaning": "Outdoor activities",
    "exampleSentence": {
      "thai": "เราชอบกิจกรรมกลางแจ้ง",
      "english": "We like outdoor activities",
      "phonetic": "rao chɔ̂ɔp gìt-jà-gam-glaang-jɛ́ɛŋ"
    }
  }
}
```

## Usage in Theme

### Access Shop Metafields
```liquid
{% assign thai_translations = shop.metafields.thai_translations.thai_words %}
```

### Access Product Metafields
```liquid
{% assign product_translations = product.metafields.thai_translations.product_translations %}
```

### Dynamic Translation Loading
```liquid
{% if thai_translations[word_key] %}
  {% assign translation = thai_translations[word_key] %}
  {% render 'thai-translation',
    english_text: word_key | capitalize,
    thai_text: translation.thai,
    phonetic: translation.phonetic,
    syllables: translation.syllables | join: ',',
    meaning: translation.meaning,
    example_thai: translation.exampleSentence.thai,
    example_english: translation.exampleSentence.english,
    example_phonetic: translation.exampleSentence.phonetic
  %}
{% endif %}
```

## Benefits

1. **Centralized Management**: All translations stored in Shopify metafields
2. **Easy Updates**: Admin can update translations without code changes
3. **Scalable**: Can add unlimited translations
4. **Context-aware**: Different translations for products/collections
5. **Version Control**: Metafield history tracking in Shopify

## Future Enhancements

1. **GraphQL API**: Access metafields via Storefront API
2. **Bulk Import**: CSV/JSON import for large translation sets
3. **Translation App**: Custom Shopify app for translation management
4. **Audio Files**: Store audio URLs in metafields for pronunciation
5. **Analytics**: Track which translations are used most frequently