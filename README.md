# 🌱 EcoChoice Game - Waste Reduction Through Gamification

A React-based educational game that engages users in environmental decision-making through real-life scenarios. Players make choices about waste management, recycling, and sustainability while competing on a global leaderboard.

## 📋 Features

- **🎯 Interactive Scenarios**: 5 real-life waste management scenarios
- **⏱️ Time-based Challenges**: 2-minute time limit per question
- **📊 Multi-dimensional Scoring**: Environment (40%), Society (35%), Time/Money (25%)
- **🔐 Google Authentication**: Secure login with Firebase Auth
- **🏆 Global Leaderboard**: Compete with players worldwide
- **📱 Responsive Design**: Works on desktop, tablet, and mobile
- **🎨 Modern UI**: Built with Tailwind CSS

## 🚀 Quick Start

### Prerequisites

- Node.js 14.0 or higher
- npm 6.0 or higher
- Firebase project (for authentication and database)
- Google account (for OAuth setup)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd waste-game
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your Firebase configuration:
   ```env
   REACT_APP_FIREBASE_API_KEY=your-api-key-here
   REACT_APP_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
   REACT_APP_FIREBASE_PROJECT_ID=your-project-id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=123456789
   REACT_APP_FIREBASE_APP_ID=your-app-id
   REACT_APP_FIREBASE_MEASUREMENT_ID=your-measurement-id
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

   The app will open at [http://localhost:3000](http://localhost:3000)

## 🔧 Firebase Setup

### 1. Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Enter project name (e.g., "waste-game")
4. Enable Google Analytics (optional)
5. Click "Create project"

### 2. Enable Authentication

1. In Firebase Console, go to "Authentication"
2. Click "Get started"
3. Go to "Sign-in method" tab
4. Enable "Google" provider
5. Add your domain to authorized domains (for production)

### 3. Set up Firestore Database

1. Go to "Firestore Database"
2. Click "Create database"
3. Choose "Start in test mode" (or production mode with security rules)
4. Select a location for your database

### 4. Get Firebase Configuration

1. Go to Project Settings (gear icon)
2. Scroll down to "Your apps"
3. Click "Web" icon to add a web app
4. Register your app with a nickname
5. Copy the configuration object and add to your `.env` file

### 5. Set up Security Rules (Optional)

For production, add these Firestore security rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read and write their own game results
    match /gameResults/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Anyone can read the leaderboard
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

## 🏗️ Project Structure

```
src/
├── components/
│   ├── auth/
│   │   └── Login.js                 # Google authentication
│   ├── common/
│   │   ├── Button.js               # Reusable button component
│   │   ├── Card.js                 # Card container component
│   │   ├── ProgressBar.js          # Game progress indicator
│   │   └── Timer.js                # Countdown timer
│   ├── game/
│   │   ├── GameHome.js             # Landing page after login
│   │   ├── QuestionCard.js         # Individual scenario questions
│   │   └── GameResults.js          # Final results and breakdown
│   └── leaderboard/
│       └── Leaderboard.js          # Global rankings
├── contexts/
│   ├── AuthContext.js              # Authentication state management
│   └── GameContext.js              # Game state management
├── data/
│   └── gameData.js                 # Scenarios, options, and scoring
├── firebase/
│   ├── auth.js                     # Authentication functions
│   ├── config.js                   # Firebase configuration
│   └── firestore.js                # Database operations
├── App.js                          # Main app component with routing
└── index.js                        # App entry point
```

## 🎮 Game Flow

1. **Authentication**: Users sign in with Google
2. **Home Screen**: Game introduction and rules
3. **Scenarios**: 5 timed questions about waste management
4. **Results**: Score breakdown and detailed analysis
5. **Leaderboard**: Global rankings and personal stats

## 📊 Scoring System

### Score Categories

- **🌍 Environment (40% weight)**: Impact on environmental sustainability
- **👥 Society (35% weight)**: Social responsibility and community impact
- **⏰ Time/Money (25% weight)**: Resource efficiency and practicality

### Score Calculation

```javascript
totalScore = (environmentScore * 0.4) + (societyScore * 0.35) + (timeMoneyScore * 0.25)
```

Final score is the weighted average across all scenarios.

## 🎨 Customization

### Adding New Scenarios

Edit `src/data/gameData.js`:

```javascript
{
  id: 6,
  title: "Your Scenario Title",
  description: "Detailed scenario description...",
  image: "/api/placeholder/400/300",
  timeLimit: 120,
  options: [
    {
      id: 'a',
      text: "Option text",
      scores: {
        environment: 30,
        society: 25,
        timeMoney: 35
      }
    }
    // ... more options
  ]
}
```

### Styling

The app uses Tailwind CSS. Customize colors in `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // Your primary color palette
      }
    }
  }
}
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy automatically on push

### Netlify

1. Build the project: `npm run build`
2. Upload `build` folder to [Netlify](https://netlify.com)
3. Configure environment variables
4. Set up continuous deployment

### Firebase Hosting

1. Install Firebase CLI: `npm install -g firebase-tools`
2. Login: `firebase login`
3. Initialize: `firebase init hosting`
4. Build: `npm run build`
5. Deploy: `firebase deploy`

## 🛠️ Development

### Environment Variables

Create a `.env` file in the root directory:

```env
# Firebase Configuration
REACT_APP_FIREBASE_API_KEY=your-api-key
REACT_APP_FIREBASE_AUTH_DOMAIN=your-domain
REACT_APP_FIREBASE_PROJECT_ID=your-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-storage-bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
REACT_APP_FIREBASE_APP_ID=your-app-id
REACT_APP_FIREBASE_MEASUREMENT_ID=your-measurement-id
```

## 🧪 Testing

### Manual Testing Checklist

- [ ] Google authentication works
- [ ] Timer counts down correctly
- [ ] Questions navigate properly
- [ ] Scores calculate accurately
- [ ] Results save to Firebase
- [ ] Leaderboard displays correctly
- [ ] Responsive design works on mobile

## 🔍 Troubleshooting

### Common Issues

1. **Firebase errors**: Check your `.env` file and Firebase configuration
2. **Authentication fails**: Verify Google OAuth setup in Firebase Console
3. **Styles not loading**: Ensure Tailwind CSS is properly configured
4. **Timer issues**: Check browser console for JavaScript errors

### Debug Mode

Add this to your `.env` for additional logging:

```env
REACT_APP_ENV=development
```

## 📝 License

This project is created for educational purposes as part of a course project on public engagement in waste reduction and reuse through gamification.

## 🎯 Project Goals

This application aims to:

- Educate users about sustainable waste management
- Demonstrate the impact of individual choices
- Encourage environmental responsibility through gamification
- Provide data insights into decision-making patterns

---

**Made with 💚 for a sustainable future**

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
