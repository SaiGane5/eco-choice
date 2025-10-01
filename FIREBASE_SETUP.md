# 🔥 Firebase Setup Guide for EcoChoice Game

## Step 1: Create a Firebase Project

1. **Go to Firebase Console**
   - Visit: https://console.firebase.google.com/
   - Sign in with your Google account

2. **Create New Project**
   - Click "Create a project"
   - Enter project name: `ecochoice-game` (or your preferred name)
   - Continue through the setup wizard
   - **Optional**: Enable Google Analytics (recommended for tracking usage)
   - Click "Create project"

## Step 2: Add Web App to Firebase Project

1. **Add Web App**
   - In your Firebase project dashboard, click the **web icon** `</>`
   - App nickname: `EcoChoice Game`
   - **Check**: "Also set up Firebase Hosting for this app" (optional but recommended)
   - Click "Register app"

2. **Copy Firebase Configuration**
   - You'll see a configuration object like this:
   ```javascript
   const firebaseConfig = {
     apiKey: "AIza...",
     authDomain: "your-project.firebaseapp.com",
     projectId: "your-project-id",
     storageBucket: "your-project.appspot.com",
     messagingSenderId: "123456789",
     appId: "1:123:web:abc123",
     measurementId: "G-XXXXXXXXXX"
   };
   ```
   - **SAVE THIS CONFIGURATION** - you'll need it in the next step

## Step 3: Configure Environment Variables

1. **Create .env file**
   ```bash
   cp .env.example .env
   ```

2. **Edit .env file** with your Firebase configuration:
   ```env
   # Replace these with your actual Firebase configuration values
   REACT_APP_FIREBASE_API_KEY=AIza...
   REACT_APP_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   REACT_APP_FIREBASE_PROJECT_ID=your-project-id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=123456789
   REACT_APP_FIREBASE_APP_ID=1:123:web:abc123
   REACT_APP_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX
   ```

## Step 4: Enable Authentication

1. **Go to Authentication**
   - In Firebase Console, click "Authentication" in the left sidebar
   - Click "Get started"

2. **Enable Google Sign-In**
   - Click "Sign-in method" tab
   - Click "Google" provider
   - Click the "Enable" toggle
   - **Project support email**: Use your Gmail address
   - Click "Save"

3. **Configure Authorized Domains** (for production)
   - In the "Sign-in method" tab, scroll down to "Authorized domains"
   - Add your production domain when you deploy (e.g., `ecochoice-game.web.app`)
   - `localhost` is already authorized for development

## Step 5: Set Up Firestore Database

1. **Create Firestore Database**
   - Click "Firestore Database" in the left sidebar
   - Click "Create database"

2. **Choose Security Rules**
   - **For Development**: Select "Start in test mode" (allows read/write for 30 days)
   - **For Production**: Select "Start in production mode" (we'll add custom rules)

3. **Select Location**
   - Choose a location closest to your users
   - **Recommended**: `us-central1` (Iowa) for global apps
   - Click "Done"

## Step 6: Configure Firestore Security Rules (Production)

1. **Go to Firestore Rules**
   - In Firestore Database, click "Rules" tab

2. **Add Production Rules**
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       // Users can read and write their own game results
       match /gameResults/{userId} {
         allow read, write: if request.auth != null && request.auth.uid == userId;
       }
       
       // Anyone authenticated can read the leaderboard
       match /gameResults/{document} {
         allow read: if request.auth != null;
       }
       
       // Users can read and write their own profile
       match /users/{userId} {
         allow read, write: if request.auth != null && request.auth.uid == userId;
       }
     }
   }
   ```

3. **Publish Rules**
   - Click "Publish"

## Step 7: Test Your Configuration

1. **Start the Development Server**
   ```bash
   npm start
   ```

2. **Test Authentication**
   - Go to http://localhost:3000
   - Click "Sign in with Google"
   - You should be able to authenticate successfully

3. **Test Game Flow**
   - Complete a game session
   - Check if scores are saved
   - View the leaderboard

## Step 8: Optional - Set Up Firebase Hosting (for deployment)

1. **Install Firebase CLI**
   ```bash
   npm install -g firebase-tools
   ```

2. **Login to Firebase**
   ```bash
   firebase login
   ```

3. **Initialize Hosting**
   ```bash
   firebase init hosting
   ```
   - Select your Firebase project
   - **Public directory**: `build`
   - **Single-page app**: `Yes`
   - **Overwrite index.html**: `No`

4. **Deploy**
   ```bash
   npm run build
   firebase deploy
   ```

## 🔍 Troubleshooting

### Common Issues:

1. **Authentication Error**: "Invalid API key"
   - Check that your `.env` file has the correct API key
   - Ensure the `.env` file is in the root directory

2. **Firestore Permission Denied**
   - Make sure you're signed in
   - Check Firestore security rules
   - Verify your project ID is correct

3. **App Not Loading**
   - Check browser console for errors
   - Verify all environment variables are set
   - Restart the development server after changing `.env`

## 📝 Next Steps

After completing this setup:

1. ✅ Test user authentication
2. ✅ Play through the game scenarios
3. ✅ Verify scores are saved to Firestore
4. ✅ Check leaderboard functionality
5. 🚀 Deploy to Firebase Hosting (optional)

## 🎯 Your Firebase Project Structure

After setup, your Firestore will have these collections:

```
📁 gameResults/
   📄 {userId}/
      - userAnswers: {...}
      - totalScore: number
      - displayName: string
      - email: string
      - photoURL: string
      - timestamp: timestamp

📁 users/ (optional)
   📄 {userId}/
      - profile data
```

---

**Need help?** Check the troubleshooting section in README.md or create an issue in the repository.