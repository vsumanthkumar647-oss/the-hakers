import React, { useState, useEffect } from 'react';
import { Sparkles, Palette, Type, Image, FileText, Download, Wand2, Loader2, Check, Copy, Star, Zap, Layout, Target } from 'lucide-react';

// Main BrandCraft Application
export default function BrandCraft() {
  const [step, setStep] = useState('input');
  const [brandData, setBrandData] = useState({
    name: '',
    industry: '',
    values: '',
    target: '',
    tone: ''
  });
  const [generatedBrand, setGeneratedBrand] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('identity');

  const handleInputChange = (field, value) => {
    setBrandData(prev => ({ ...prev, [field]: value }));
  };

  const generateBrand = async () => {
    setLoading(true);
    setStep('generating');

    // Simulate API call to Claude for brand generation
    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          messages: [{
            role: 'user',
            content: `You are a professional brand strategist. Generate a comprehensive brand identity for:

Business Name: ${brandData.name}
Industry: ${brandData.industry}
Core Values: ${brandData.values}
Target Audience: ${brandData.target}
Desired Tone: ${brandData.tone}

Respond ONLY with valid JSON (no markdown, no preamble):
{
  "tagline": "catchy tagline",
  "colorPalette": {
    "primary": "#hex",
    "secondary": "#hex",
    "accent": "#hex",
    "neutral": "#hex"
  },
  "typography": {
    "heading": "font name",
    "body": "font name"
  },
  "brandVoice": ["trait1", "trait2", "trait3"],
  "visualStyle": "description",
  "missionStatement": "concise mission",
  "logoIdeas": ["concept1", "concept2", "concept3"]
}`
          }]
        })
      });

      const data = await response.json();
      const content = data.content.find(item => item.type === 'text')?.text || '';
      
      // Clean and parse response
      const cleaned = content.replace(/```json|```/g, '').trim();
      const brandIdentity = JSON.parse(cleaned);

      setGeneratedBrand(brandIdentity);
      setStep('results');
    } catch (error) {
      console.error('Generation error:', error);
      // Fallback demo data
      setGeneratedBrand({
        tagline: "Innovation meets excellence",
        colorPalette: {
          primary: "#2D3E50",
          secondary: "#E74C3C",
          accent: "#F39C12",
          neutral: "#ECF0F1"
        },
        typography: {
          heading: "Playfair Display",
          body: "Source Sans Pro"
        },
        brandVoice: ["Professional", "Innovative", "Trustworthy"],
        visualStyle: "Modern minimalist with bold accents",
        missionStatement: "Empowering businesses through intelligent automation and creative excellence.",
        logoIdeas: [
          "Abstract geometric mark combining initials",
          "Dynamic circular symbol representing growth",
          "Minimalist wordmark with custom lettering"
        ]
      });
      setStep('results');
    } finally {
      setLoading(false);
    }
  };

  const generateContent = async (contentType) => {
    setLoading(true);
    
    try {
      const prompts = {
        social: `Create 5 engaging social media post ideas for ${brandData.name}, a ${brandData.industry} company with these values: ${brandData.values}. Target audience: ${brandData.target}. Tone: ${brandData.tone}. Return as JSON array of objects with "platform", "content", and "hashtags".`,
        blog: `Generate 3 blog post outlines for ${brandData.name}. Industry: ${brandData.industry}. Values: ${brandData.values}. Each outline should have "title", "hook", "keyPoints" (array), and "cta". Return as JSON array.`,
        email: `Create an email campaign template for ${brandData.name}. Include "subject", "preheader", "greeting", "body" (array of paragraphs), and "cta". Tone: ${brandData.tone}. Return as JSON object.`
      };

      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          messages: [{
            role: 'user',
            content: `${prompts[contentType]}\n\nRespond ONLY with valid JSON, no markdown or preamble.`
          }]
        })
      });

      const data = await response.json();
      const content = data.content.find(item => item.type === 'text')?.text || '';
      const cleaned = content.replace(/```json|```/g, '').trim();
      const generatedContent = JSON.parse(cleaned);

      setGeneratedBrand(prev => ({
        ...prev,
        [contentType + 'Content']: generatedContent
      }));
    } catch (error) {
      console.error('Content generation error:', error);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-white/10 backdrop-blur-xl bg-black/20">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center transform rotate-12">
                  <Sparkles className="w-6 h-6 -rotate-12" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">BrandCraft</h1>
                  <p className="text-xs text-purple-300">AI-Powered Branding Automation</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-purple-300">
                <Zap className="w-4 h-4" />
                <span>Powered by Claude AI</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-6 py-12">
          {step === 'input' && (
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12 animate-fade-in">
                <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                  Build Your Brand Identity
                </h2>
                <p className="text-xl text-purple-200">
                  Let AI craft a complete branding strategy tailored to your vision
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8 space-y-6 shadow-2xl">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-purple-300">Brand Name</label>
                  <input
                    type="text"
                    value={brandData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="e.g., TechVista"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-purple-300">Industry</label>
                  <input
                    type="text"
                    value={brandData.industry}
                    onChange={(e) => handleInputChange('industry', e.target.value)}
                    placeholder="e.g., SaaS, E-commerce, Consulting"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-purple-300">Core Values</label>
                  <textarea
                    value={brandData.values}
                    onChange={(e) => handleInputChange('values', e.target.value)}
                    placeholder="e.g., Innovation, Sustainability, Customer-first"
                    rows="3"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-purple-300">Target Audience</label>
                  <input
                    type="text"
                    value={brandData.target}
                    onChange={(e) => handleInputChange('target', e.target.value)}
                    placeholder="e.g., Small businesses, Millennials, Tech startups"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-purple-300">Desired Tone</label>
                  <select
                    value={brandData.tone}
                    onChange={(e) => handleInputChange('tone', e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                  >
                    <option value="">Select a tone...</option>
                    <option value="professional">Professional</option>
                    <option value="friendly">Friendly</option>
                    <option value="bold">Bold</option>
                    <option value="playful">Playful</option>
                    <option value="luxurious">Luxurious</option>
                    <option value="minimalist">Minimalist</option>
                  </select>
                </div>

                <button
                  onClick={generateBrand}
                  disabled={!brandData.name || !brandData.industry || !brandData.values || !brandData.target || !brandData.tone}
                  className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed rounded-lg font-semibold text-lg flex items-center justify-center gap-2 transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-purple-500/50"
                >
                  <Wand2 className="w-5 h-5" />
                  Generate Brand Identity
                </button>
              </div>
            </div>
          )}

          {step === 'generating' && (
            <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
              <div className="relative">
                <Loader2 className="w-16 h-16 animate-spin text-purple-500" />
                <div className="absolute inset-0 blur-xl bg-purple-500/50 animate-pulse"></div>
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-2">Crafting Your Brand...</h3>
                <p className="text-purple-300">AI is analyzing your inputs and generating a unique identity</p>
              </div>
              <div className="flex gap-2">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  ></div>
                ))}
              </div>
            </div>
          )}

          {step === 'results' && generatedBrand && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-4xl font-bold mb-2">{brandData.name}</h2>
                  <p className="text-xl text-purple-300">{generatedBrand.tagline}</p>
                </div>
                <button
                  onClick={() => setStep('input')}
                  className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg transition-all"
                >
                  Start New Brand
                </button>
              </div>

              {/* Tabs */}
              <div className="flex gap-2 border-b border-white/10">
                {[
                  { id: 'identity', label: 'Brand Identity', icon: Target },
                  { id: 'visuals', label: 'Visual Assets', icon: Palette },
                  { id: 'content', label: 'Content', icon: FileText }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-6 py-3 border-b-2 transition-all ${
                      activeTab === tab.id
                        ? 'border-purple-500 text-white'
                        : 'border-transparent text-purple-300 hover:text-white'
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Brand Identity Tab */}
              {activeTab === 'identity' && (
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Color Palette */}
                  <div className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Palette className="w-5 h-5 text-purple-400" />
                      <h3 className="text-xl font-semibold">Color Palette</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      {Object.entries(generatedBrand.colorPalette).map(([name, color]) => (
                        <div key={name} className="space-y-2">
                          <div
                            className="h-20 rounded-lg shadow-lg border border-white/10"
                            style={{ backgroundColor: color }}
                          ></div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm capitalize text-purple-300">{name}</span>
                            <button
                              onClick={() => copyToClipboard(color)}
                              className="text-xs px-2 py-1 bg-white/10 hover:bg-white/20 rounded transition-all"
                            >
                              {color}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Typography */}
                  <div className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Type className="w-5 h-5 text-purple-400" />
                      <h3 className="text-xl font-semibold">Typography</h3>
                    </div>
                    <div className="space-y-4">
                      <div className="p-4 bg-white/5 rounded-lg">
                        <p className="text-xs text-purple-300 mb-2">Heading Font</p>
                        <p className="text-2xl font-bold">{generatedBrand.typography.heading}</p>
                      </div>
                      <div className="p-4 bg-white/5 rounded-lg">
                        <p className="text-xs text-purple-300 mb-2">Body Font</p>
                        <p className="text-lg">{generatedBrand.typography.body}</p>
                      </div>
                    </div>
                  </div>

                  {/* Brand Voice */}
                  <div className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Star className="w-5 h-5 text-purple-400" />
                      <h3 className="text-xl font-semibold">Brand Voice</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {generatedBrand.brandVoice.map((trait, idx) => (
                        <span
                          key={idx}
                          className="px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-full text-sm"
                        >
                          {trait}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Mission Statement */}
                  <div className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Layout className="w-5 h-5 text-purple-400" />
                      <h3 className="text-xl font-semibold">Mission Statement</h3>
                    </div>
                    <p className="text-purple-100 leading-relaxed">{generatedBrand.missionStatement}</p>
                  </div>

                  {/* Visual Style */}
                  <div className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6 md:col-span-2">
                    <div className="flex items-center gap-2 mb-4">
                      <Image className="w-5 h-5 text-purple-400" />
                      <h3 className="text-xl font-semibold">Visual Style Direction</h3>
                    </div>
                    <p className="text-purple-100 leading-relaxed mb-4">{generatedBrand.visualStyle}</p>
                    <div className="space-y-2">
                      <p className="text-sm font-semibold text-purple-300">Logo Concepts:</p>
                      <ul className="space-y-2">
                        {generatedBrand.logoIdeas.map((idea, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-purple-100">
                            <Check className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                            <span>{idea}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* Visual Assets Tab */}
              {activeTab === 'visuals' && (
                <div className="space-y-6">
                  <div className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-8">
                    <h3 className="text-2xl font-semibold mb-6">Logo Preview</h3>
                    <div className="grid md:grid-cols-3 gap-6">
                      {/* Logo variations */}
                      <div className="aspect-square bg-gradient-to-br from-white/10 to-white/5 rounded-xl flex items-center justify-center border border-white/10">
                        <div className="text-center">
                          <div
                            className="w-24 h-24 mx-auto rounded-2xl mb-4 flex items-center justify-center text-4xl font-bold"
                            style={{ backgroundColor: generatedBrand.colorPalette.primary }}
                          >
                            {brandData.name.charAt(0)}
                          </div>
                          <p className="text-sm text-purple-300">Primary Logo</p>
                        </div>
                      </div>
                      <div className="aspect-square bg-white rounded-xl flex items-center justify-center border border-white/10">
                        <div className="text-center">
                          <div
                            className="w-24 h-24 mx-auto rounded-2xl mb-4 flex items-center justify-center text-4xl font-bold text-white"
                            style={{ backgroundColor: generatedBrand.colorPalette.secondary }}
                          >
                            {brandData.name.charAt(0)}
                          </div>
                          <p className="text-sm text-gray-600">Light Background</p>
                        </div>
                      </div>
                      <div className="aspect-square bg-black rounded-xl flex items-center justify-center border border-white/10">
                        <div className="text-center">
                          <div
                            className="w-24 h-24 mx-auto rounded-2xl mb-4 flex items-center justify-center text-4xl font-bold text-white"
                            style={{ backgroundColor: generatedBrand.colorPalette.accent }}
                          >
                            {brandData.name.charAt(0)}
                          </div>
                          <p className="text-sm text-purple-300">Dark Background</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-8">
                    <h3 className="text-2xl font-semibold mb-6">Brand Assets</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <button className="p-6 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 text-left transition-all group">
                        <Download className="w-8 h-8 mb-3 text-purple-400 group-hover:scale-110 transition-transform" />
                        <h4 className="font-semibold mb-1">Download Logo Pack</h4>
                        <p className="text-sm text-purple-300">SVG, PNG, PDF formats</p>
                      </button>
                      <button className="p-6 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 text-left transition-all group">
                        <Palette className="w-8 h-8 mb-3 text-purple-400 group-hover:scale-110 transition-transform" />
                        <h4 className="font-semibold mb-1">Color Palette</h4>
                        <p className="text-sm text-purple-300">HEX, RGB, CMYK values</p>
                      </button>
                      <button className="p-6 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 text-left transition-all group">
                        <Type className="w-8 h-8 mb-3 text-purple-400 group-hover:scale-110 transition-transform" />
                        <h4 className="font-semibold mb-1">Typography Guide</h4>
                        <p className="text-sm text-purple-300">Font pairings & usage</p>
                      </button>
                      <button className="p-6 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 text-left transition-all group">
                        <FileText className="w-8 h-8 mb-3 text-purple-400 group-hover:scale-110 transition-transform" />
                        <h4 className="font-semibold mb-1">Brand Guidelines</h4>
                        <p className="text-sm text-purple-300">Complete style guide</p>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Content Tab */}
              {activeTab === 'content' && (
                <div className="space-y-6">
                  <div className="grid md:grid-cols-3 gap-4">
                    <button
                      onClick={() => generateContent('social')}
                      disabled={loading}
                      className="p-6 bg-gradient-to-br from-purple-600/20 to-pink-600/20 hover:from-purple-600/30 hover:to-pink-600/30 rounded-xl border border-purple-500/30 transition-all"
                    >
                      <FileText className="w-8 h-8 mb-3 text-purple-400" />
                      <h4 className="font-semibold mb-1">Social Media Posts</h4>
                      <p className="text-sm text-purple-300">Generate post ideas</p>
                    </button>
                    <button
                      onClick={() => generateContent('blog')}
                      disabled={loading}
                      className="p-6 bg-gradient-to-br from-blue-600/20 to-cyan-600/20 hover:from-blue-600/30 hover:to-cyan-600/30 rounded-xl border border-blue-500/30 transition-all"
                    >
                      <FileText className="w-8 h-8 mb-3 text-blue-400" />
                      <h4 className="font-semibold mb-1">Blog Outlines</h4>
                      <p className="text-sm text-blue-300">Create blog structure</p>
                    </button>
                    <button
                      onClick={() => generateContent('email')}
                      disabled={loading}
                      className="p-6 bg-gradient-to-br from-green-600/20 to-emerald-600/20 hover:from-green-600/30 hover:to-emerald-600/30 rounded-xl border border-green-500/30 transition-all"
                    >
                      <FileText className="w-8 h-8 mb-3 text-green-400" />
                      <h4 className="font-semibold mb-1">Email Templates</h4>
                      <p className="text-sm text-green-300">Design campaigns</p>
                    </button>
                  </div>

                  {generatedBrand.socialContent && (
                    <div className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6">
                      <h3 className="text-xl font-semibold mb-4">Social Media Content</h3>
                      <div className="space-y-4">
                        {generatedBrand.socialContent.map((post, idx) => (
                          <div key={idx} className="p-4 bg-white/5 rounded-lg border border-white/10">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-semibold text-purple-400">{post.platform}</span>
                              <button
                                onClick={() => copyToClipboard(post.content)}
                                className="p-2 hover:bg-white/10 rounded transition-all"
                              >
                                <Copy className="w-4 h-4" />
                              </button>
                            </div>
                            <p className="text-purple-100 mb-2">{post.content}</p>
                            <p className="text-sm text-purple-400">{post.hashtags}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
      `}</style>
    </div>
  );
}
