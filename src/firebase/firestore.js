import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  query, 
  orderBy, 
  limit 
} from 'firebase/firestore';
import { db } from './config';

// Save user game result
export const saveGameResult = async (userId, userData) => {
  try {
    const userRef = doc(db, 'gameResults', userId);
    await setDoc(userRef, {
      ...userData,
      timestamp: new Date(),
    }, { merge: true });
  } catch (error) {
    console.error('Error saving game result:', error);
    throw error;
  }
};

// Get user game result
export const getUserGameResult = async (userId) => {
  try {
    const userRef = doc(db, 'gameResults', userId);
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
      return userSnap.data();
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error getting user game result:', error);
    throw error;
  }
};

// Get leaderboard (top 10 scores)
export const getLeaderboard = async () => {
  try {
    const q = query(
      collection(db, 'gameResults'), 
      orderBy('totalScore', 'desc'), 
      limit(10)
    );
    const querySnapshot = await getDocs(q);
    
    const leaderboard = [];
    querySnapshot.forEach((doc) => {
      leaderboard.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return leaderboard;
  } catch (error) {
    console.error('Error getting leaderboard:', error);
    throw error;
  }
};

// Update user profile
export const updateUserProfile = async (userId, profileData) => {
  try {
    const userRef = doc(db, 'users', userId);
    await setDoc(userRef, {
      ...profileData,
      lastUpdated: new Date(),
    }, { merge: true });
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};