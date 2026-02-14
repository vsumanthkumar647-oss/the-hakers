"""
BrandCraft FastAPI Backend
AI-Powered Branding Automation System
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional, Dict
import anthropic
import os
from enum import Enum

app = FastAPI(
    title="BrandCraft API",
    description="Generative AI-Powered Branding Automation System",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Models
class ToneEnum(str, Enum):
    PROFESSIONAL = "professional"
    FRIENDLY = "friendly"
    BOLD = "bold"
    PLAYFUL = "playful"
    LUXURIOUS = "luxurious"
    MINIMALIST = "minimalist"

class BrandInput(BaseModel):
    name: str
    industry: str
    values: str
    target: str
    tone: ToneEnum

class ColorPalette(BaseModel):
    primary: str
    secondary: str
    accent: str
    neutral: str

class Typography(BaseModel):
    heading: str
    body: str

class BrandIdentity(BaseModel):
    tagline: str
    colorPalette: ColorPalette
    typography: Typography
    brandVoice: List[str]
    visualStyle: str
    missionStatement: str
    logoIdeas: List[str]

class ContentRequest(BaseModel):
    brandName: str
    industry: str
    values: str
    target: str
    tone: str
    contentType: str  # 'social', 'blog', 'email'

class SocialPost(BaseModel):
    platform: str
    content: str
    hashtags: str

class BlogOutline(BaseModel):
    title: str
    hook: str
    keyPoints: List[str]
    cta: str

class EmailCampaign(BaseModel):
    subject: str
    preheader: str
    greeting: str
    body: List[str]
    cta: str

# Initialize Anthropic client (API key handled by environment)
client = anthropic.Anthropic()

@app.get("/")
async def root():
    """Health check endpoint"""
    return {
        "status": "active",
        "service": "BrandCraft API",
        "version": "1.0.0",
        "ai_model": "Claude Sonnet 4"
    }

@app.post("/api/generate-brand", response_model=BrandIdentity)
async def generate_brand(brand_input: BrandInput):
    """
    Generate comprehensive brand identity using AI
    """
    try:
        prompt = f"""You are a professional brand strategist with expertise in creating distinctive, memorable brand identities.

Generate a comprehensive brand identity for:

Business Name: {brand_input.name}
Industry: {brand_input.industry}
Core Values: {brand_input.values}
Target Audience: {brand_input.target}
Desired Tone: {brand_input.tone}

Requirements:
1. Create a catchy, memorable tagline
2. Design a cohesive color palette with psychological reasoning
3. Select typography that reflects the brand personality
4. Define 3-4 brand voice characteristics
5. Describe the visual style direction
6. Write a concise mission statement
7. Suggest 3 unique logo concepts

Respond ONLY with valid JSON in this exact structure (no markdown, no preamble):
{{
  "tagline": "catchy tagline here",
  "colorPalette": {{
    "primary": "#hexcode",
    "secondary": "#hexcode",
    "accent": "#hexcode",
    "neutral": "#hexcode"
  }},
  "typography": {{
    "heading": "font name",
    "body": "font name"
  }},
  "brandVoice": ["trait1", "trait2", "trait3"],
  "visualStyle": "detailed description of visual approach",
  "missionStatement": "compelling mission statement",
  "logoIdeas": ["concept 1", "concept 2", "concept 3"]
}}"""

        message = client.messages.create(
            model="claude-sonnet-4-20250514",
            max_tokens=2000,
            messages=[{
                "role": "user",
                "content": prompt
            }]
        )
        
        # Extract and parse response
        response_text = message.content[0].text
        
        # Clean any markdown formatting
        import json
        cleaned = response_text.replace("```json", "").replace("```", "").strip()
        brand_data = json.loads(cleaned)
        
        return BrandIdentity(**brand_data)
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Brand generation failed: {str(e)}")

@app.post("/api/generate-content")
async def generate_content(content_req: ContentRequest):
    """
    Generate marketing content based on brand and content type
    """
    try:
        prompts = {
            "social": f"""Create 5 engaging social media post ideas for {content_req.brandName}, a {content_req.industry} company.

Brand Values: {content_req.values}
Target Audience: {content_req.target}
Tone: {content_req.tone}

Generate diverse posts for different platforms (LinkedIn, Instagram, Twitter, Facebook).
Each post should be platform-appropriate and include relevant hashtags.

Respond ONLY with valid JSON array (no markdown):
[
  {{
    "platform": "platform name",
    "content": "post content here",
    "hashtags": "#hashtag1 #hashtag2 #hashtag3"
  }}
]""",

            "blog": f"""Generate 3 blog post outlines for {content_req.brandName} ({content_req.industry}).

Values: {content_req.values}
Audience: {content_req.target}
Tone: {content_req.tone}

Create compelling, SEO-friendly topics that provide value to the target audience.

Respond ONLY with valid JSON array (no markdown):
[
  {{
    "title": "blog post title",
    "hook": "compelling opening hook",
    "keyPoints": ["point 1", "point 2", "point 3", "point 4"],
    "cta": "call to action"
  }}
]""",

            "email": f"""Create an email campaign template for {content_req.brandName}.

Industry: {content_req.industry}
Values: {content_req.values}
Audience: {content_req.target}
Tone: {content_req.tone}

Design a professional, conversion-focused email template.

Respond ONLY with valid JSON object (no markdown):
{{
  "subject": "compelling subject line",
  "preheader": "preview text",
  "greeting": "personalized greeting",
  "body": ["paragraph 1", "paragraph 2", "paragraph 3"],
  "cta": "clear call to action"
}}"""
        }
        
        if content_req.contentType not in prompts:
            raise HTTPException(status_code=400, detail="Invalid content type")
        
        message = client.messages.create(
            model="claude-sonnet-4-20250514",
            max_tokens=2000,
            messages=[{
                "role": "user",
                "content": prompts[content_req.contentType]
            }]
        )
        
        response_text = message.content[0].text
        
        # Clean and parse
        import json
        cleaned = response_text.replace("```json", "").replace("```", "").strip()
        content_data = json.loads(cleaned)
        
        return {
            "contentType": content_req.contentType,
            "data": content_data
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Content generation failed: {str(e)}")

@app.post("/api/generate-visuals")
async def generate_visual_descriptions(brand_input: BrandInput):
    """
    Generate detailed visual asset descriptions for designers
    """
    try:
        prompt = f"""As a creative director, provide detailed visual asset specifications for {brand_input.name}.

Industry: {brand_input.industry}
Values: {brand_input.values}
Tone: {brand_input.tone}

Generate specifications for:
1. Logo design (detailed visual description)
2. Social media templates
3. Business card design
4. Website hero section
5. Brand pattern/texture

Respond ONLY with valid JSON (no markdown):
{{
  "logoDescription": "detailed logo design description",
  "socialTemplates": ["template 1 description", "template 2 description"],
  "businessCard": "business card design details",
  "websiteHero": "hero section design concept",
  "brandPattern": "pattern/texture description"
}}"""

        message = client.messages.create(
            model="claude-sonnet-4-20250514",
            max_tokens=1500,
            messages=[{
                "role": "user",
                "content": prompt
            }]
        )
        
        response_text = message.content[0].text
        
        import json
        cleaned = response_text.replace("```json", "").replace("```", "").strip()
        visual_data = json.loads(cleaned)
        
        return visual_data
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Visual generation failed: {str(e)}")

@app.post("/api/analyze-competitor")
async def analyze_competitor(data: Dict[str, str]):
    """
    Analyze competitor branding and provide insights
    """
    try:
        competitor_name = data.get("competitorName")
        your_brand = data.get("yourBrand")
        industry = data.get("industry")
        
        if not all([competitor_name, your_brand, industry]):
            raise HTTPException(status_code=400, detail="Missing required fields")
        
        prompt = f"""Analyze the branding strategy of {competitor_name} in the {industry} industry.
Compare with {your_brand} and provide actionable insights.

Provide:
1. Competitor's brand positioning
2. Their target audience
3. Visual identity strengths/weaknesses
4. Differentiation opportunities for {your_brand}
5. Recommended strategies

Respond ONLY with valid JSON (no markdown):
{{
  "positioning": "competitor positioning analysis",
  "targetAudience": "their audience description",
  "visualStrengths": ["strength 1", "strength 2"],
  "visualWeaknesses": ["weakness 1", "weakness 2"],
  "opportunities": ["opportunity 1", "opportunity 2", "opportunity 3"],
  "recommendations": ["recommendation 1", "recommendation 2", "recommendation 3"]
}}"""

        message = client.messages.create(
            model="claude-sonnet-4-20250514",
            max_tokens=1500,
            messages=[{
                "role": "user",
                "content": prompt
            }]
        )
        
        response_text = message.content[0].text
        
        import json
        cleaned = response_text.replace("```json", "").replace("```", "").strip()
        analysis_data = json.loads(cleaned)
        
        return analysis_data
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Competitor analysis failed: {str(e)}")

@app.get("/api/brand-trends")
async def get_brand_trends(industry: Optional[str] = None):
    """
    Get current branding trends for an industry
    """
    try:
        industry_filter = f"in the {industry} industry" if industry else "across all industries"
        
        prompt = f"""Provide current branding and design trends {industry_filter} for 2025-2026.

Focus on:
1. Color trends
2. Typography trends
3. Logo design trends
4. Visual style trends
5. Messaging trends

Respond ONLY with valid JSON (no markdown):
{{
  "colorTrends": ["trend 1", "trend 2", "trend 3"],
  "typographyTrends": ["trend 1", "trend 2", "trend 3"],
  "logoTrends": ["trend 1", "trend 2", "trend 3"],
  "visualTrends": ["trend 1", "trend 2", "trend 3"],
  "messagingTrends": ["trend 1", "trend 2", "trend 3"],
  "summary": "overall trend summary"
}}"""

        message = client.messages.create(
            model="claude-sonnet-4-20250514",
            max_tokens=1200,
            messages=[{
                "role": "user",
                "content": prompt
            }]
        )
        
        response_text = message.content[0].text
        
        import json
        cleaned = response_text.replace("```json", "").replace("```", "").strip()
        trends_data = json.loads(cleaned)
        
        return trends_data
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Trend analysis failed: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
