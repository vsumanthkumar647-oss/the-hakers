#!/bin/bash

# BrandCraft Setup Script
# This script sets up the complete BrandCraft development environment

set -e  # Exit on error

echo "🚀 BrandCraft Setup Script"
echo "=========================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check Python version
echo "📋 Checking Python version..."
if ! command -v python3 &> /dev/null; then
    echo -e "${RED}❌ Python 3 is not installed. Please install Python 3.9 or higher.${NC}"
    exit 1
fi

PYTHON_VERSION=$(python3 --version | cut -d " " -f 2 | cut -d "." -f 1,2)
echo -e "${GREEN}✓ Python $PYTHON_VERSION found${NC}"

# Check if we're in the right directory
if [ ! -f "README.md" ]; then
    echo -e "${RED}❌ Please run this script from the BrandCraft root directory${NC}"
    exit 1
fi

# Backend Setup
echo ""
echo "🔧 Setting up Backend..."
echo "------------------------"

cd backend

# Create virtual environment
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
    echo -e "${GREEN}✓ Virtual environment created${NC}"
else
    echo -e "${YELLOW}⚠ Virtual environment already exists${NC}"
fi

# Activate virtual environment
source venv/bin/activate

# Upgrade pip
echo "Upgrading pip..."
pip install --upgrade pip > /dev/null 2>&1
echo -e "${GREEN}✓ pip upgraded${NC}"

# Install dependencies
echo "Installing Python dependencies..."
pip install -r requirements.txt
echo -e "${GREEN}✓ Dependencies installed${NC}"

# Install additional development dependencies
echo "Installing development dependencies..."
pip install pytest pytest-cov black flake8
echo -e "${GREEN}✓ Development tools installed${NC}"

# Setup environment variables
if [ ! -f ".env" ]; then
    echo "Setting up environment variables..."
    cp .env.example .env
    echo -e "${YELLOW}⚠ Please edit backend/.env and add your ANTHROPIC_API_KEY${NC}"
else
    echo -e "${YELLOW}⚠ .env file already exists${NC}"
fi

cd ..

# Check Node.js (optional, for frontend development)
echo ""
echo "📋 Checking Node.js (optional for frontend)..."
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    echo -e "${GREEN}✓ Node.js $NODE_VERSION found${NC}"
    
    # Frontend setup (optional)
    read -p "Would you like to set up a React frontend? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo ""
        echo "🎨 Setting up Frontend..."
        echo "-------------------------"
        
        if [ ! -d "frontend" ]; then
            npm create vite@latest frontend -- --template react
            cd frontend
            npm install
            npm install lucide-react
            echo -e "${GREEN}✓ Frontend setup complete${NC}"
            echo -e "${YELLOW}⚠ Copy brandcraft-app.jsx content to frontend/src/App.jsx${NC}"
            cd ..
        else
            echo -e "${YELLOW}⚠ Frontend directory already exists${NC}"
        fi
    fi
else
    echo -e "${YELLOW}⚠ Node.js not found. Frontend setup skipped.${NC}"
    echo "  To install Node.js, visit: https://nodejs.org/"
fi

# Create necessary directories
echo ""
echo "📁 Creating project directories..."
mkdir -p logs
mkdir -p data
echo -e "${GREEN}✓ Directories created${NC}"

# Run tests
echo ""
echo "🧪 Running tests..."
cd backend
source venv/bin/activate
python -m pytest test_api.py -v --tb=short || echo -e "${YELLOW}⚠ Some tests failed (this is expected without API key)${NC}"
cd ..

# Print setup summary
echo ""
echo "================================================================"
echo -e "${GREEN}✅ BrandCraft Setup Complete!${NC}"
echo "================================================================"
echo ""
echo "📝 Next Steps:"
echo ""
echo "1. Add your Anthropic API key:"
echo "   Edit: backend/.env"
echo "   Set: ANTHROPIC_API_KEY=your_api_key_here"
echo ""
echo "2. Start the backend server:"
echo "   cd backend"
echo "   source venv/bin/activate"
echo "   python main.py"
echo ""
echo "3. Access the API:"
echo "   API: http://localhost:8000"
echo "   Docs: http://localhost:8000/docs"
echo ""
echo "4. Open the demo:"
echo "   Open demo.html in your browser"
echo ""
echo "5. (Optional) For React development:"
echo "   cd frontend"
echo "   npm run dev"
echo ""
echo "📚 Documentation: See README.md for detailed usage"
echo "🐛 Issues? Check the troubleshooting section in README.md"
echo ""
echo "Happy branding! 🎨✨"
