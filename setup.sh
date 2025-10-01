#!/bin/bash

# EcoChoice Game Setup Script
echo "🌱 Setting up EcoChoice Game..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 14+ and try again."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node --version | cut -d'v' -f2)
REQUIRED_VERSION="14.0.0"

if [ "$(printf '%s\n' "$REQUIRED_VERSION" "$NODE_VERSION" | sort -V | head -n1)" != "$REQUIRED_VERSION" ]; then
    echo "❌ Node.js version $NODE_VERSION is too old. Please upgrade to Node.js 14+ and try again."
    exit 1
fi

echo "✅ Node.js version $NODE_VERSION detected"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✅ Dependencies installed successfully"

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file from template..."
    cp .env.example .env
    echo "⚠️  Please edit .env file with your Firebase configuration before starting the app"
else
    echo "✅ .env file already exists"
fi

# Check if Firebase config is set up
if grep -q "your-api-key-here" .env 2>/dev/null; then
    echo "⚠️  Firebase configuration not complete in .env file"
    echo "📖 Please follow the Firebase setup instructions in README.md"
else
    echo "✅ Firebase configuration appears to be set up"
fi

echo ""
echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "1. Edit .env file with your Firebase configuration (if not done already)"
echo "2. Run 'npm start' to start the development server"
echo "3. Open http://localhost:3000 in your browser"
echo ""
echo "📖 For detailed instructions, see README.md"