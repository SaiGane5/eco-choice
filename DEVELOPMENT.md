# 🛠️ Development Guide

## Quick Development Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**
   - Copy `.env.example` to `.env`
   - Add your Firebase configuration
   
3. **Start development server**
   ```bash
   npm start
   ```

## 🔥 Firebase Configuration Required

Before running the app, you need to:

1. Create a Firebase project at https://console.firebase.google.com/
2. Enable Google Authentication
3. Set up Firestore Database
4. Get your web app configuration
5. Add the configuration to your `.env` file

See the main README.md for detailed Firebase setup instructions.

## 🎮 Testing the Game

### Manual Testing Flow

1. **Authentication**
   - Sign in with Google should work
   - User info should display correctly

2. **Game Flow**
   - Start game from home screen
   - Navigate through 5 scenarios
   - Timer should count down (2 minutes each)
   - Select answers and proceed
   - View final results

3. **Leaderboard**
   - Results should save to Firebase
   - Leaderboard should display rankings
   - User's rank should be highlighted

### Sample Test Data

The game includes 5 pre-defined scenarios:
- End of Semester Room Cleanup
- Weekly Grocery Shopping
- Old Electronics Disposal
- Food Waste at Home
- Clothing Closet Cleanup

Each scenario has 4 options with different scores for Environment, Society, and Time/Money categories.

## 🔧 Development Commands

```bash
# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test

# Preview production build locally
npm run preview

# Deploy to Firebase (requires Firebase CLI)
npm run deploy:firebase
```

## 📁 Key Files to Know

- `src/data/gameData.js` - All scenarios and scoring logic
- `src/contexts/GameContext.js` - Game state management
- `src/contexts/AuthContext.js` - Authentication state
- `src/firebase/config.js` - Firebase configuration
- `src/components/game/QuestionCard.js` - Main game interface

## 🎨 Styling

Uses Tailwind CSS for styling. Key classes:
- `primary-*` - Green theme colors
- `secondary-*` - Pink accent colors
- Responsive design with `sm:`, `md:`, `lg:` prefixes

## 🐛 Common Issues

1. **Firebase not connecting**: Check .env file configuration
2. **Styles not loading**: Tailwind CSS should be properly configured
3. **Timer not working**: Check browser console for JavaScript errors
4. **Authentication failing**: Verify Google OAuth setup in Firebase

## 📊 Game Scoring Logic

```javascript
// Weighted scoring
totalScore = (environmentScore * 0.4) + (societyScore * 0.35) + (timeMoneyScore * 0.25)

// Final score is average across all scenarios
finalScore = totalWeightedScore / numberOfScenarios
```

Scores range from 0-50 for each category, final score typically 15-45.

---

Happy coding! 🌱