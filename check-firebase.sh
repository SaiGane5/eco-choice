#!/bin/bash

# Firebase Configuration Checker for EcoChoice Game
echo "🔥 Firebase Configuration Checker"
echo "=================================="

# Check if .env file exists
if [ ! -f .env ]; then
    echo "❌ .env file not found!"
    echo "📝 Please copy .env.example to .env and add your Firebase configuration"
    echo ""
    echo "Run: cp .env.example .env"
    echo "Then edit .env with your Firebase project details"
    exit 1
fi

echo "✅ .env file found"

# Check if required environment variables are set
required_vars=(
    "REACT_APP_FIREBASE_API_KEY"
    "REACT_APP_FIREBASE_AUTH_DOMAIN"
    "REACT_APP_FIREBASE_PROJECT_ID"
    "REACT_APP_FIREBASE_STORAGE_BUCKET"
    "REACT_APP_FIREBASE_MESSAGING_SENDER_ID"
    "REACT_APP_FIREBASE_APP_ID"
)

missing_vars=()

for var in "${required_vars[@]}"; do
    if ! grep -q "^$var=" .env || grep -q "^$var=your-" .env; then
        missing_vars+=("$var")
    fi
done

if [ ${#missing_vars[@]} -gt 0 ]; then
    echo "❌ Missing or incomplete Firebase configuration:"
    for var in "${missing_vars[@]}"; do
        echo "   - $var"
    done
    echo ""
    echo "📖 Please follow the Firebase setup guide in FIREBASE_SETUP.md"
    echo "🔗 Or visit: https://console.firebase.google.com/"
    exit 1
fi

echo "✅ All required Firebase environment variables are set"

# Check if Firebase dependencies are installed
if ! npm list firebase &>/dev/null; then
    echo "❌ Firebase package not found"
    echo "📦 Installing Firebase..."
    npm install firebase
else
    echo "✅ Firebase package installed"
fi

echo ""
echo "🎉 Firebase configuration looks good!"
echo ""
echo "Next steps:"
echo "1. Make sure you've enabled Google Authentication in Firebase Console"
echo "2. Set up Firestore Database with appropriate security rules"
echo "3. Run 'npm start' to test your configuration"
echo ""
echo "📖 For detailed setup instructions, see FIREBASE_SETUP.md"