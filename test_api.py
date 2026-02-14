"""
Test suite for BrandCraft API
Run with: pytest test_api.py -v
"""

import pytest
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_root_endpoint():
    """Test the root health check endpoint"""
    response = client.get("/")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "active"
    assert "BrandCraft" in data["service"]

def test_generate_brand_success():
    """Test successful brand generation"""
    brand_data = {
        "name": "TestBrand",
        "industry": "Technology",
        "values": "Innovation, Quality, Trust",
        "target": "Tech-savvy millennials",
        "tone": "professional"
    }
    
    response = client.post("/api/generate-brand", json=brand_data)
    assert response.status_code == 200
    
    data = response.json()
    assert "tagline" in data
    assert "colorPalette" in data
    assert "typography" in data
    assert "brandVoice" in data
    assert "missionStatement" in data
    assert "logoIdeas" in data

def test_generate_brand_missing_fields():
    """Test brand generation with missing fields"""
    incomplete_data = {
        "name": "TestBrand",
        "industry": "Technology"
        # Missing required fields
    }
    
    response = client.post("/api/generate-brand", json=incomplete_data)
    assert response.status_code == 422  # Validation error

def test_generate_brand_invalid_tone():
    """Test brand generation with invalid tone"""
    brand_data = {
        "name": "TestBrand",
        "industry": "Technology",
        "values": "Innovation",
        "target": "Millennials",
        "tone": "invalid_tone"
    }
    
    response = client.post("/api/generate-brand", json=brand_data)
    assert response.status_code == 422

def test_generate_content_social():
    """Test social media content generation"""
    content_data = {
        "brandName": "TestBrand",
        "industry": "Technology",
        "values": "Innovation",
        "target": "Millennials",
        "tone": "professional",
        "contentType": "social"
    }
    
    response = client.post("/api/generate-content", json=content_data)
    assert response.status_code == 200
    
    data = response.json()
    assert data["contentType"] == "social"
    assert "data" in data

def test_generate_content_blog():
    """Test blog content generation"""
    content_data = {
        "brandName": "TestBrand",
        "industry": "Technology",
        "values": "Innovation",
        "target": "Millennials",
        "tone": "professional",
        "contentType": "blog"
    }
    
    response = client.post("/api/generate-content", json=content_data)
    assert response.status_code == 200

def test_generate_content_email():
    """Test email content generation"""
    content_data = {
        "brandName": "TestBrand",
        "industry": "Technology",
        "values": "Innovation",
        "target": "Millennials",
        "tone": "professional",
        "contentType": "email"
    }
    
    response = client.post("/api/generate-content", json=content_data)
    assert response.status_code == 200

def test_generate_content_invalid_type():
    """Test content generation with invalid type"""
    content_data = {
        "brandName": "TestBrand",
        "industry": "Technology",
        "values": "Innovation",
        "target": "Millennials",
        "tone": "professional",
        "contentType": "invalid_type"
    }
    
    response = client.post("/api/generate-content", json=content_data)
    assert response.status_code == 400

def test_generate_visuals():
    """Test visual asset generation"""
    brand_data = {
        "name": "TestBrand",
        "industry": "Technology",
        "values": "Innovation",
        "target": "Millennials",
        "tone": "professional"
    }
    
    response = client.post("/api/generate-visuals", json=brand_data)
    assert response.status_code == 200
    
    data = response.json()
    assert "logoDescription" in data
    assert "socialTemplates" in data
    assert "businessCard" in data

def test_analyze_competitor():
    """Test competitor analysis"""
    analysis_data = {
        "competitorName": "Competitor Inc",
        "yourBrand": "TestBrand",
        "industry": "Technology"
    }
    
    response = client.post("/api/analyze-competitor", json=analysis_data)
    assert response.status_code == 200
    
    data = response.json()
    assert "positioning" in data
    assert "targetAudience" in data
    assert "opportunities" in data

def test_analyze_competitor_missing_fields():
    """Test competitor analysis with missing fields"""
    incomplete_data = {
        "competitorName": "Competitor Inc"
        # Missing required fields
    }
    
    response = client.post("/api/analyze-competitor", json=incomplete_data)
    assert response.status_code == 400

def test_get_brand_trends():
    """Test brand trends endpoint"""
    response = client.get("/api/brand-trends")
    assert response.status_code == 200
    
    data = response.json()
    assert "colorTrends" in data
    assert "typographyTrends" in data
    assert "logoTrends" in data

def test_get_brand_trends_with_industry():
    """Test brand trends with industry filter"""
    response = client.get("/api/brand-trends?industry=Technology")
    assert response.status_code == 200
    
    data = response.json()
    assert isinstance(data["colorTrends"], list)

# Integration tests
def test_full_brand_generation_workflow():
    """Test complete brand generation workflow"""
    # Step 1: Generate brand identity
    brand_data = {
        "name": "FlowSync",
        "industry": "SaaS",
        "values": "Efficiency, Collaboration, Innovation",
        "target": "Remote teams",
        "tone": "professional"
    }
    
    brand_response = client.post("/api/generate-brand", json=brand_data)
    assert brand_response.status_code == 200
    brand_identity = brand_response.json()
    
    # Step 2: Generate content
    content_data = {
        "brandName": brand_data["name"],
        "industry": brand_data["industry"],
        "values": brand_data["values"],
        "target": brand_data["target"],
        "tone": brand_data["tone"],
        "contentType": "social"
    }
    
    content_response = client.post("/api/generate-content", json=content_data)
    assert content_response.status_code == 200
    
    # Step 3: Generate visuals
    visual_response = client.post("/api/generate-visuals", json=brand_data)
    assert visual_response.status_code == 200
    
    # All steps successful
    assert brand_identity is not None
    assert content_response.json() is not None
    assert visual_response.json() is not None

# Performance tests
@pytest.mark.slow
def test_response_time():
    """Test that API responds within acceptable time"""
    import time
    
    brand_data = {
        "name": "SpeedTest",
        "industry": "Tech",
        "values": "Fast",
        "target": "Users",
        "tone": "professional"
    }
    
    start_time = time.time()
    response = client.post("/api/generate-brand", json=brand_data)
    end_time = time.time()
    
    assert response.status_code == 200
    # Should respond within 10 seconds
    assert (end_time - start_time) < 10

if __name__ == "__main__":
    pytest.main([__file__, "-v"])
