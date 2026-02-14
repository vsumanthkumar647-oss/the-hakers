# BrandCraft API Usage Examples

## Table of Contents
- [Setup](#setup)
- [Basic Examples](#basic-examples)
- [Advanced Examples](#advanced-examples)
- [Response Formats](#response-formats)
- [Error Handling](#error-handling)
- [Integration Examples](#integration-examples)

---

## Setup

### Start the Server
```bash
cd backend
source venv/bin/activate
python main.py
```

Server will be available at: `http://localhost:8000`

### Test Connection
```bash
curl http://localhost:8000
```

Expected response:
```json
{
  "status": "active",
  "service": "BrandCraft API",
  "version": "1.0.0",
  "ai_model": "Claude Sonnet 4"
}
```

---

## Basic Examples

### 1. Generate Tech Startup Brand

**Request:**
```bash
curl -X POST http://localhost:8000/api/generate-brand \
  -H "Content-Type: application/json" \
  -d '{
    "name": "CodeFlow",
    "industry": "Developer Tools",
    "values": "Efficiency, Innovation, Developer-first",
    "target": "Software developers and engineering teams",
    "tone": "professional"
  }'
```

**Response:**
```json
{
  "tagline": "Code smarter, ship faster",
  "colorPalette": {
    "primary": "#0EA5E9",
    "secondary": "#8B5CF6",
    "accent": "#10B981",
    "neutral": "#F1F5F9"
  },
  "typography": {
    "heading": "JetBrains Mono",
    "body": "Inter"
  },
  "brandVoice": ["Technical", "Efficient", "Developer-focused", "Innovative"],
  "visualStyle": "Clean, modern interface with code-inspired aesthetics. Monospace accents and grid-based layouts.",
  "missionStatement": "Empowering developers to build better software faster through intelligent automation and seamless workflows.",
  "logoIdeas": [
    "Flowing brackets symbol representing smooth code flow",
    "Abstract chevron pattern suggesting forward progress",
    "Minimalist wordmark with monospace typography"
  ]
}
```

### 2. Generate E-commerce Fashion Brand

**Request:**
```bash
curl -X POST http://localhost:8000/api/generate-brand \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Luxe & Co",
    "industry": "Fashion E-commerce",
    "values": "Quality, Sustainability, Timeless style",
    "target": "Fashion-conscious millennials aged 25-40",
    "tone": "luxurious"
  }'
```

**Response:**
```json
{
  "tagline": "Timeless elegance, consciously crafted",
  "colorPalette": {
    "primary": "#1A1A1A",
    "secondary": "#C9A96E",
    "accent": "#E8DCC4",
    "neutral": "#F5F5F5"
  },
  "typography": {
    "heading": "Cormorant Garamond",
    "body": "Montserrat"
  },
  "brandVoice": ["Sophisticated", "Sustainable", "Refined", "Authentic"],
  "visualStyle": "Luxury minimalism with rich textures, elegant serif typography, and curated photography. Gold accents and clean white space.",
  "missionStatement": "Redefining luxury fashion through sustainable practices and timeless design.",
  "logoIdeas": [
    "Elegant monogram combining L and C",
    "Minimalist serif wordmark with refined proportions",
    "Geometric emblem suggesting premium quality"
  ]
}
```

### 3. Generate Social Media Content

**Request:**
```bash
curl -X POST http://localhost:8000/api/generate-content \
  -H "Content-Type: application/json" \
  -d '{
    "brandName": "GreenLife Organics",
    "industry": "Organic Food & Wellness",
    "values": "Health, Sustainability, Community",
    "target": "Health-conscious consumers",
    "tone": "friendly",
    "contentType": "social"
  }'
```

**Response:**
```json
{
  "contentType": "social",
  "data": [
    {
      "platform": "Instagram",
      "content": "🌱 Start your day the green way! Our new morning blend combines organic superfoods to fuel your best self. What's your favorite healthy morning ritual?",
      "hashtags": "#OrganicLiving #HealthyLifestyle #GreenLife #WellnessJourney #SuperfoodSunday"
    },
    {
      "platform": "LinkedIn",
      "content": "Sustainability isn't just a buzzword for us—it's our foundation. Here's how we're reducing our carbon footprint while delivering premium organic products to your door. Read our latest impact report.",
      "hashtags": "#Sustainability #OrganicBusiness #B2B #CorporateResponsibility"
    },
    {
      "platform": "Twitter",
      "content": "Did you know? Organic farming uses 45% less energy than conventional farming. Every choice matters. 🌍💚",
      "hashtags": "#OrganicFacts #SustainableLiving #EcoFriendly"
    }
  ]
}
```

### 4. Generate Blog Post Outlines

**Request:**
```bash
curl -X POST http://localhost:8000/api/generate-content \
  -H "Content-Type: application/json" \
  -d '{
    "brandName": "CloudScale",
    "industry": "Cloud Infrastructure",
    "values": "Reliability, Performance, Scalability",
    "target": "DevOps engineers and CTOs",
    "tone": "professional",
    "contentType": "blog"
  }'
```

**Response:**
```json
{
  "contentType": "blog",
  "data": [
    {
      "title": "5 Critical Mistakes That Are Costing Your Cloud Infrastructure Team Time and Money",
      "hook": "If your cloud bills are rising faster than your user growth, you're not alone. Here's what's really happening behind the scenes.",
      "keyPoints": [
        "Over-provisioning resources without auto-scaling",
        "Ignoring cost monitoring and alerts",
        "Using the wrong storage tiers for your workload",
        "Lack of automated resource cleanup",
        "Missing out on reserved instance savings"
      ],
      "cta": "Download our free Cloud Cost Optimization Checklist"
    },
    {
      "title": "From Zero to Production: A Complete Guide to Kubernetes Migration",
      "hook": "Kubernetes adoption is at an all-time high, but the migration journey is filled with pitfalls. Here's your roadmap to success.",
      "keyPoints": [
        "Assessing your current infrastructure readiness",
        "Choosing the right Kubernetes distribution",
        "Planning your containerization strategy",
        "Implementing monitoring and observability",
        "Ensuring zero-downtime deployment"
      ],
      "cta": "Schedule a free infrastructure assessment with our team"
    }
  ]
}
```

---

## Advanced Examples

### 5. Generate Email Campaign Template

**Request:**
```bash
curl -X POST http://localhost:8000/api/generate-content \
  -H "Content-Type: application/json" \
  -d '{
    "brandName": "FitTech Pro",
    "industry": "Fitness Technology",
    "values": "Results, Community, Innovation",
    "target": "Fitness enthusiasts and personal trainers",
    "tone": "bold",
    "contentType": "email"
  }'
```

**Response:**
```json
{
  "contentType": "email",
  "data": {
    "subject": "Your Fitness Journey Just Got Smarter 💪",
    "preheader": "Introducing AI-powered workout plans that adapt to YOU",
    "greeting": "Hey [First Name],",
    "body": [
      "Remember that frustrating feeling when your workout routine just... stops working? We've been there. That's exactly why we built something different.",
      "Today, we're excited to introduce FitTech Pro's AI Coach—your personal trainer that learns from every rep, every set, every workout. It doesn't just give you generic plans. It understands YOUR body, YOUR goals, YOUR progress.",
      "Here's what makes it game-changing: Real-time form analysis, Progressive overload optimization, Recovery recommendations based on your data, and Nutrition sync with your training phases.",
      "Join 10,000+ athletes who are already crushing their goals with smarter training."
    ],
    "cta": "Start Your Free 14-Day Trial"
  }
}
```

### 6. Generate Visual Asset Specifications

**Request:**
```bash
curl -X POST http://localhost:8000/api/generate-visuals \
  -H "Content-Type: application/json" \
  -d '{
    "name": "EcoTravel",
    "industry": "Sustainable Tourism",
    "values": "Adventure, Conservation, Authentic experiences",
    "target": "Eco-conscious travelers aged 30-50",
    "tone": "playful"
  }'
```

**Response:**
```json
{
  "logoDescription": "The logo features a stylized compass rose integrated with organic leaf elements. The compass points are formed by elongated leaves, symbolizing both exploration and environmental consciousness. Color: Deep forest green (#2D5F3F) with earth tone accents. Style: Modern organic with hand-drawn qualities that feel authentic and approachable.",
  "socialTemplates": [
    "Instagram Story Template: Vertical format with torn paper edge effects revealing destination photos. Overlaid with handwritten-style text and small botanical illustrations. Color palette: Warm earth tones with pops of adventure orange.",
    "Facebook Post Template: Square format featuring destination imagery with a subtle topographic map overlay. Quote section with eco-friendly travel tips. Clean layout with generous white space and rounded corners."
  ],
  "businessCard": "Front: Minimalist design with embossed logo on recycled card stock. Natural texture background in cream with forest green accent stripe. Back: Key contact info with small icons representing travel specialties (hiking, wildlife, cultural immersion). Printed on seed paper that recipients can plant.",
  "websiteHero": "Full-width parallax hero featuring immersive nature photography with subtle overlay. Large, inspiring headline in modern serif. Secondary messaging highlights eco-commitment. Integrated booking CTA with organic rounded button. Bottom fade reveals sustainable travel statistics.",
  "brandPattern": "Repeating pattern of hand-illustrated topographic contour lines mixed with botanical elements (ferns, leaves, flowers). Can be used as backgrounds, dividers, or texture overlays. Available in both subtle neutral tones and vibrant adventure colors."
}
```

### 7. Analyze Competitor Brand

**Request:**
```bash
curl -X POST http://localhost:8000/api/analyze-competitor \
  -H "Content-Type: application/json" \
  -d '{
    "competitorName": "Slack",
    "yourBrand": "TeamConnect",
    "industry": "Team Collaboration Software"
  }'
```

**Response:**
```json
{
  "positioning": "Slack positions itself as the 'digital headquarters' for work, emphasizing real-time communication and integration ecosystem. They lead with simplicity and workplace culture transformation.",
  "targetAudience": "Remote and hybrid teams across all company sizes, with particular strength in tech companies and creative agencies. Focus on teams seeking to reduce email and centralize communication.",
  "visualStrengths": [
    "Highly recognizable colorful hashtag logo and playful brand personality",
    "Consistent use of vibrant, optimistic color palette that stands out in enterprise software",
    "Clean, intuitive UI design that reduces friction for new users",
    "Strong visual content marketing with engaging illustrations and graphics"
  ],
  "visualWeaknesses": [
    "Brand can feel overly casual for traditional enterprise clients",
    "Visual identity has become so recognizable it's harder to differentiate",
    "Color scheme may appear too playful for serious business contexts"
  ],
  "opportunities": [
    "Position as the more professional, enterprise-focused alternative with sophisticated design",
    "Emphasize security and compliance with visual trust indicators",
    "Create a calmer, less overwhelming visual experience for focus-oriented teams",
    "Develop industry-specific visual themes that Slack's one-size-fits-all approach misses"
  ],
  "recommendations": [
    "Develop a distinctive visual identity that balances professionalism with approachability—think 'business sophisticated' rather than 'startup playful'",
    "Focus messaging on deep work and productivity rather than just communication",
    "Create detailed visual case studies for enterprise clients to build trust",
    "Invest in premium, calming color palette that differentiates from Slack's vibrant scheme"
  ]
}
```

### 8. Get Industry Brand Trends

**Request:**
```bash
curl "http://localhost:8000/api/brand-trends?industry=FinTech"
```

**Response:**
```json
{
  "colorTrends": [
    "Deep navy and dark blues replacing traditional bank blues for trust with modernity",
    "Electric greens and teals suggesting financial growth and innovation",
    "Monochromatic palettes with strategic accent colors for sophistication"
  ],
  "typographyTrends": [
    "Modern geometric sans-serifs (like Aeonik, Suisse) for clean digital interfaces",
    "Variable fonts for responsive design across mobile and desktop",
    "Hybrid fonts combining traditional serif stability with modern sans features"
  ],
  "logoTrends": [
    "Abstract geometric shapes representing connectivity and networks",
    "Minimalist wordmarks with subtle financial symbolism (arrows, growth indicators)",
    "Dynamic logos with animated versions for digital platforms"
  ],
  "visualTrends": [
    "Gradient meshes and fluid shapes suggesting flow of money and data",
    "3D illustrations and isometric graphics for complex financial concepts",
    "Dark mode first design with high-contrast accessibility",
    "Micro-interactions and animated data visualizations"
  ],
  "messagingTrends": [
    "Transparency and honesty about fees and processes",
    "Demystifying finance with clear, jargon-free language",
    "Emphasizing security and trust without fear-mongering",
    "Personal finance empowerment and financial wellness themes"
  ],
  "summary": "FinTech branding in 2025-2026 is moving toward sophisticated minimalism that balances innovation with trust. The trend is away from aggressive disruption messaging toward stability, transparency, and user empowerment. Visual design emphasizes clarity and accessibility while maintaining a premium, modern feel."
}
```

---

## Response Formats

### Standard Success Response
```json
{
  "field1": "value",
  "field2": { "nested": "data" },
  "field3": ["array", "of", "items"]
}
```

### Error Response
```json
{
  "detail": "Error description here"
}
```

### Validation Error (422)
```json
{
  "detail": [
    {
      "loc": ["body", "fieldName"],
      "msg": "field required",
      "type": "value_error.missing"
    }
  ]
}
```

---

## Error Handling

### Common HTTP Status Codes

**200 OK** - Request successful
```bash
curl -s -o /dev/null -w "%{http_code}" http://localhost:8000/api/generate-brand -X POST -d '{...}'
# Returns: 200
```

**400 Bad Request** - Invalid request data
```bash
# Missing required field
curl -X POST http://localhost:8000/api/analyze-competitor \
  -H "Content-Type: application/json" \
  -d '{"competitorName": "Only One Field"}'
# Returns: 400
```

**422 Unprocessable Entity** - Validation error
```bash
# Invalid tone value
curl -X POST http://localhost:8000/api/generate-brand \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Brand",
    "industry": "Tech",
    "values": "Innovation",
    "target": "Users",
    "tone": "invalid_tone"
  }'
# Returns: 422
```

**500 Internal Server Error** - Server error
```bash
# AI generation failure (rare)
# Returns: 500 with error message
```

---

## Integration Examples

### Python Integration

```python
import requests
import json

# Configuration
API_BASE = "http://localhost:8000"

def generate_brand(name, industry, values, target, tone):
    """Generate brand identity"""
    url = f"{API_BASE}/api/generate-brand"
    
    payload = {
        "name": name,
        "industry": industry,
        "values": values,
        "target": target,
        "tone": tone
    }
    
    response = requests.post(url, json=payload)
    
    if response.status_code == 200:
        return response.json()
    else:
        raise Exception(f"API Error: {response.status_code} - {response.text}")

# Usage
brand = generate_brand(
    name="TechStart",
    industry="SaaS",
    values="Innovation, Speed, Reliability",
    target="Startups",
    tone="professional"
)

print(f"Tagline: {brand['tagline']}")
print(f"Colors: {brand['colorPalette']}")
```

### JavaScript/Node.js Integration

```javascript
const axios = require('axios');

const API_BASE = 'http://localhost:8000';

async function generateBrand(brandData) {
  try {
    const response = await axios.post(
      `${API_BASE}/api/generate-brand`,
      brandData
    );
    return response.data;
  } catch (error) {
    console.error('API Error:', error.response?.data || error.message);
    throw error;
  }
}

// Usage
const brand = await generateBrand({
  name: 'TechStart',
  industry: 'SaaS',
  values: 'Innovation, Speed, Reliability',
  target: 'Startups',
  tone: 'professional'
});

console.log('Tagline:', brand.tagline);
console.log('Colors:', brand.colorPalette);
```

### React Integration

```javascript
import { useState } from 'react';

function BrandGenerator() {
  const [brand, setBrand] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateBrand = async (formData) => {
    setLoading(true);
    
    try {
      const response = await fetch('http://localhost:8000/api/generate-brand', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      setBrand(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading && <p>Generating brand...</p>}
      {brand && (
        <div>
          <h2>{brand.tagline}</h2>
          <div>
            {Object.entries(brand.colorPalette).map(([name, color]) => (
              <div key={name} style={{ backgroundColor: color }}>
                {name}: {color}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
```

---

## Best Practices

### 1. Rate Limiting
```python
import time

def generate_with_retry(func, max_retries=3, delay=1):
    """Retry API calls with exponential backoff"""
    for attempt in range(max_retries):
        try:
            return func()
        except Exception as e:
            if attempt == max_retries - 1:
                raise
            time.sleep(delay * (2 ** attempt))
```

### 2. Error Handling
```python
def safe_api_call(endpoint, payload):
    """Make API call with proper error handling"""
    try:
        response = requests.post(endpoint, json=payload, timeout=30)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.Timeout:
        print("Request timed out")
    except requests.exceptions.HTTPError as e:
        print(f"HTTP error: {e.response.status_code}")
    except Exception as e:
        print(f"Unexpected error: {e}")
    return None
```

### 3. Caching Results
```python
from functools import lru_cache
import hashlib
import json

@lru_cache(maxsize=100)
def cached_brand_generation(brand_json):
    """Cache brand generation results"""
    brand_data = json.loads(brand_json)
    return generate_brand(**brand_data)

# Usage with cache
brand_json = json.dumps(brand_dict, sort_keys=True)
result = cached_brand_generation(brand_json)
```

---

## Testing with cURL

### Test All Endpoints

```bash
# Health check
curl http://localhost:8000

# Generate brand
curl -X POST http://localhost:8000/api/generate-brand \
  -H "Content-Type: application/json" \
  -d @brand_data.json

# Generate content
curl -X POST http://localhost:8000/api/generate-content \
  -H "Content-Type: application/json" \
  -d @content_data.json

# Get trends
curl "http://localhost:8000/api/brand-trends?industry=Tech"
```

### Using JSON Files

**brand_data.json:**
```json
{
  "name": "TestBrand",
  "industry": "Technology",
  "values": "Innovation, Quality",
  "target": "Developers",
  "tone": "professional"
}
```

**Command:**
```bash
curl -X POST http://localhost:8000/api/generate-brand \
  -H "Content-Type: application/json" \
  -d @brand_data.json \
  | jq '.'
```

---

**Happy branding! 🎨**
