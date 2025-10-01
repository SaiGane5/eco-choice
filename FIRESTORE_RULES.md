# 🔐 Firebase Security Rules Guide

## Quick Setup - Development Rules (Recommended for testing)

For initial development and testing, use these simplified rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow authenticated users to read and write their own game results
    match /gameResults/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Allow all authenticated users to read game results (for leaderboard)
    match /gameResults/{document} {
      allow read: if request.auth != null;
    }
    
    // Allow authenticated users to manage their own profile
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## Production Rules (Enhanced Security)

For production deployment, use the rules in `firestore.rules` file which includes:

- ✅ **Data validation** - Ensures proper data structure
- ✅ **Score validation** - Prevents invalid scores
- ✅ **User isolation** - Users can only access their own data
- ✅ **Public leaderboard** - Everyone can read scores for rankings
- ✅ **Admin access** - Reserved for future admin features
- ✅ **Type checking** - Validates data types

## How to Apply Rules

### Method 1: Firebase Console (Recommended)

1. **Go to Firebase Console**
   - Open your project at https://console.firebase.google.com/

2. **Navigate to Firestore**
   - Click "Firestore Database" in the left sidebar

3. **Open Rules Tab**
   - Click the "Rules" tab at the top

4. **Copy and Paste Rules**
   - Delete existing rules
   - Copy rules from above (development or production)
   - Paste into the editor

5. **Publish Rules**
   - Click "Publish" button
   - Wait for confirmation

### Method 2: Firebase CLI (Advanced)

1. **Install Firebase CLI**
   ```bash
   npm install -g firebase-tools
   ```

2. **Login and Initialize**
   ```bash
   firebase login
   firebase init firestore
   ```

3. **Use the firestore.rules File**
   - The CLI will use the `firestore.rules` file in your project
   - Deploy with: `firebase deploy --only firestore:rules`

## Rule Explanations

### Game Results Collection (`/gameResults/{userId}`)
- **Purpose**: Store individual game session results
- **Structure**:
  ```javascript
  {
    userAnswers: { "1": "a", "2": "c", ... }, // User's choices per scenario
    totalScore: 34.5,                          // Calculated final score
    displayName: "John Doe",                   // User's display name
    email: "john@example.com",                 // User's email
    photoURL: "https://...",                   // User's profile photo
    timestamp: Timestamp,                      // When game was completed
    completedAt: Timestamp                     // Completion timestamp
  }
  ```

### User Profiles Collection (`/users/{userId}`)
- **Purpose**: Store additional user profile data
- **Structure**:
  ```javascript
  {
    lastUpdated: Timestamp,
    preferences: {...},          // Optional: user preferences
    stats: {...}                // Optional: aggregated statistics
  }
  ```

## Security Features

### 🔒 **User Data Isolation**
- Users can only read/write their own game results
- User ID in document path must match authenticated user ID

### 👥 **Public Leaderboard Access**
- All authenticated users can read game results for leaderboard
- No ability to modify other users' data

### ✅ **Data Validation**
- Score must be between 0 and 50
- Required fields must be present
- Proper data types enforced

### 🚫 **Prevented Actions**
- Unauthenticated access blocked
- Users cannot modify others' scores
- Invalid data structure rejected
- Score manipulation prevented

## Testing Your Rules

### Test Authentication
```javascript
// This should work (user accessing own data)
firestore.collection('gameResults').doc(currentUser.uid).set({...});

// This should fail (user accessing other's data)
firestore.collection('gameResults').doc('other-user-id').set({...});
```

### Test Leaderboard Access
```javascript
// This should work (reading leaderboard)
firestore.collection('gameResults').orderBy('totalScore', 'desc').limit(10).get();
```

## Troubleshooting

### Common Error: "Missing or insufficient permissions"
- **Check**: User is authenticated
- **Check**: Document ID matches user ID for personal data
- **Check**: Rules are published correctly

### Common Error: "Document validation failed"
- **Check**: All required fields are included
- **Check**: Data types match rule requirements
- **Check**: Score is within valid range (0-50)

## Development vs Production

### Development Rules (Simpler)
- Less strict validation
- Easier debugging
- Good for testing features

### Production Rules (Stricter)
- Data validation included
- Enhanced security
- Type checking
- Score validation

## Migration Path

1. **Start with development rules** for initial testing
2. **Test all app functionality** (auth, game flow, leaderboard)
3. **Switch to production rules** before deployment
4. **Test again** to ensure everything still works
5. **Deploy** with confidence

---

**💡 Tip**: Always test your rules in Firebase Console's Rules Playground before publishing!