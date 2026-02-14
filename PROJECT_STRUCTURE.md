# BrandCraft Project Structure

```
BrandCraft/
│
├── README.md                    # Comprehensive project documentation
├── QUICKSTART.md               # Quick start guide for immediate usage
├── setup.sh                    # Automated setup script
├── demo.html                   # Standalone HTML demo (no setup needed)
├── brandcraft-app.jsx          # React component (main frontend)
│
├── backend/                    # FastAPI Backend
│   ├── main.py                 # Main FastAPI application
│   ├── requirements.txt        # Python dependencies
│   ├── .env.example            # Environment variables template
│   ├── .env                    # Environment variables (create from .env.example)
│   ├── test_api.py            # API test suite
│   └── venv/                   # Python virtual environment (created by setup)
│
├── frontend/                   # React Frontend (optional, created by setup)
│   ├── src/
│   │   ├── App.jsx            # Copy brandcraft-app.jsx here
│   │   └── ...
│   ├── package.json
│   └── ...
│
├── logs/                       # Application logs (created by setup)
└── data/                       # Data storage (created by setup)
```

## File Descriptions

### Root Level Files

**README.md**
- Complete project documentation
- Technology stack details
- API reference
- Installation instructions
- Usage examples
- Troubleshooting guide

**QUICKSTART.md**
- 5-minute setup guide
- Quick API usage examples
- Common issues and solutions
- Learning path for beginners to advanced

**setup.sh**
- Automated installation script
- Python environment setup
- Dependency installation
- Optional frontend setup
- Environment configuration

**demo.html**
- Standalone demo page
- No installation required
- Visual brand identity preview
- Works offline with sample data

**brandcraft-app.jsx**
- Complete React application
- AI-powered brand generation
- Interactive UI with Tailwind CSS
- Direct Claude API integration
- Multi-tab interface (Identity, Visuals, Content)

### Backend Directory

**main.py**
- FastAPI application entry point
- API endpoint definitions:
  - `/api/generate-brand` - Brand identity generation
  - `/api/generate-content` - Content creation
  - `/api/generate-visuals` - Visual asset specs
  - `/api/analyze-competitor` - Competitor analysis
  - `/api/brand-trends` - Industry trends
- Anthropic Claude API integration
- Request/response validation
- Error handling

**requirements.txt**
```
fastapi==0.109.0
uvicorn[standard]==0.27.0
anthropic==0.18.1
pydantic==2.5.3
python-multipart==0.0.6
```

**.env.example**
- Template for environment variables
- ANTHROPIC_API_KEY configuration
- Server settings
- CORS configuration

**test_api.py**
- Pytest test suite
- Unit tests for all endpoints
- Integration tests
- Performance tests
- Test coverage for error cases

### Frontend Directory (Optional)

Created when running setup script with frontend option.

**Structure:**
```
frontend/
├── src/
│   ├── App.jsx              # Main application (copy from brandcraft-app.jsx)
│   ├── main.jsx             # React entry point
│   └── index.css            # Global styles
├── public/                  # Static assets
├── package.json             # Node dependencies
└── vite.config.js          # Vite configuration
```

## Technology Stack by Layer

### Frontend Layer
- **React 18+**: Component-based UI
- **Tailwind CSS**: Utility-first styling
- **Lucide React**: Icon library
- **Vite**: Build tool (optional)

### Backend Layer
- **FastAPI**: Modern Python web framework
- **Uvicorn**: ASGI server
- **Pydantic**: Data validation
- **Anthropic SDK**: Claude AI integration

### AI Layer
- **Claude Sonnet 4**: Language model
- **Structured prompts**: Brand generation
- **JSON responses**: Consistent output format

## Data Flow Architecture

```
User Input (React Form)
         ↓
Frontend State Management
         ↓
API Request (POST /api/generate-brand)
         ↓
FastAPI Backend (main.py)
         ↓
Request Validation (Pydantic)
         ↓
Anthropic API Call
         ↓
Claude AI Processing
         ↓
JSON Response Parsing
         ↓
Response Validation
         ↓
Frontend Update
         ↓
UI Display (Brand Identity)
```

## API Endpoint Details

### 1. Generate Brand Identity
- **Endpoint**: `POST /api/generate-brand`
- **Input**: BrandInput model
- **Output**: BrandIdentity model
- **Processing Time**: ~5-10 seconds
- **Use Case**: Complete brand strategy creation

### 2. Generate Content
- **Endpoint**: `POST /api/generate-content`
- **Input**: ContentRequest model
- **Output**: Content data (varies by type)
- **Types**: social, blog, email
- **Processing Time**: ~3-7 seconds

### 3. Generate Visuals
- **Endpoint**: `POST /api/generate-visuals`
- **Input**: BrandInput model
- **Output**: Visual specifications
- **Processing Time**: ~4-8 seconds

### 4. Analyze Competitor
- **Endpoint**: `POST /api/analyze-competitor`
- **Input**: Competitor data
- **Output**: Analysis insights
- **Processing Time**: ~5-10 seconds

### 5. Brand Trends
- **Endpoint**: `GET /api/brand-trends`
- **Input**: Optional industry parameter
- **Output**: Current branding trends
- **Processing Time**: ~3-5 seconds

## Development Workflow

### 1. Local Development
```bash
# Terminal 1: Backend
cd backend
source venv/bin/activate
python main.py

# Terminal 2: Frontend (optional)
cd frontend
npm run dev

# Terminal 3: Testing
cd backend
pytest test_api.py -v
```

### 2. Making Changes

**Backend Changes:**
1. Edit `backend/main.py`
2. Server auto-reloads (uvicorn --reload)
3. Test with curl or `/docs`
4. Run tests: `pytest`

**Frontend Changes:**
1. Edit `brandcraft-app.jsx`
2. Hot reload updates UI
3. Test in browser

### 3. Adding Features

**New Content Type:**
1. Add to `ContentRequest.contentType` enum
2. Add prompt to `generate_content()` prompts dict
3. Update frontend UI
4. Add tests

**New Endpoint:**
1. Define route in `main.py`
2. Create Pydantic models
3. Implement handler function
4. Add to API tests
5. Update documentation

## Deployment Considerations

### Backend Deployment
- Use production ASGI server (Gunicorn + Uvicorn)
- Set environment variables securely
- Configure CORS for production domain
- Implement rate limiting
- Add caching layer (Redis)
- Set up logging
- Monitor API usage

### Frontend Deployment
- Build production bundle: `npm run build`
- Deploy to: Vercel, Netlify, or static hosting
- Update API endpoint URLs
- Configure environment variables

### Database (Future Enhancement)
- Store generated brands
- User authentication
- Brand history
- Analytics tracking

## Performance Optimization

### Backend
- Response caching for common requests
- Rate limiting per user/IP
- Async request handling
- Connection pooling
- Request batching

### Frontend
- Code splitting
- Lazy loading components
- Image optimization
- Debounced API calls
- Local state caching

## Security Best Practices

1. **API Keys**: Never commit to version control
2. **Environment Variables**: Use .env files
3. **Input Validation**: Pydantic models
4. **CORS**: Restrict allowed origins
5. **Rate Limiting**: Prevent abuse
6. **HTTPS**: Use in production
7. **Error Messages**: Don't expose internals

## Monitoring and Logging

### Recommended Setup
- **Application Logs**: Python logging module
- **Error Tracking**: Sentry
- **API Monitoring**: Datadog or New Relic
- **Usage Analytics**: Custom dashboard
- **Cost Tracking**: Anthropic API usage

## Extending the Project

### Potential Enhancements
1. **User Accounts**: Authentication & saved brands
2. **Templates**: Pre-built industry templates
3. **Export**: PDF brand guidelines
4. **Collaboration**: Team workspaces
5. **Integrations**: Figma, Canva plugins
6. **Analytics**: Brand performance tracking
7. **A/B Testing**: Multiple brand variations
8. **Image Generation**: Logo creation with DALL-E
9. **Voice**: Brand voice examples
10. **Localization**: Multi-language support

## Maintenance

### Regular Tasks
- Update dependencies monthly
- Review API usage and costs
- Monitor error logs
- Backup user data
- Performance profiling
- Security audits

### Version Updates
- Python packages: `pip list --outdated`
- Node packages: `npm outdated`
- API versions: Check Anthropic updates

---

**This structure is designed for:**
- Easy setup and deployment
- Clear separation of concerns
- Scalable architecture
- Maintainable codebase
- Extensible functionality
